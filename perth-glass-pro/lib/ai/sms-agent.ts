import { GoogleGenAI, Type } from "@google/genai";
import { ASPECT_KNOWLEDGE, FEW_SHOT_EXAMPLES } from "./knowledge";
import { LeadProfile, muteAiForLead, saveOrUpdateLead } from "@/lib/leads/store";
import { sendUrgentAlertToAhmed } from "@/lib/telephony/twilio-client";

export interface AgentDecision {
  can_answer: boolean;
  reason: string;
  reply_text: string;
  extracted_details?: {
    storeys?: string;
    scope?: string;
    has_screens?: boolean;
    address?: string;
    notes?: string;
  };
}

/**
 * Builds the strict system prompt for the Gemini AI Agent
 */
function buildSystemInstruction(profile: LeadProfile): string {
  return `
You are the SMS customer coordinator for ${ASPECT_KNOWLEDGE.businessName}, owned by ${ASPECT_KNOWLEDGE.ownerName}.
You are communicating via SMS with ${profile.name || "a customer"} located in ${profile.suburb || "Perth"}.

BUSINESS FACTS:
- Minimum Callout: ${ASPECT_KNOWLEDGE.pricing.minimumCallout}
- Single Storey Window Cleaning: ${ASPECT_KNOWLEDGE.pricing.singleStoreyBallpark}
- Double Storey Window Cleaning: ${ASPECT_KNOWLEDGE.pricing.doubleStoreyBallpark}
- Inside & Out: ${ASPECT_KNOWLEDGE.pricing.insideAndOutNote}
- Tracks & Sills: ${ASPECT_KNOWLEDGE.pricing.tracksAndFrames}
- Flyscreens: ${ASPECT_KNOWLEDGE.pricing.flyscreens}
- Solar Panel Cleaning: ${ASPECT_KNOWLEDGE.pricing.solarPanels}
- Gutter Cleaning: ${ASPECT_KNOWLEDGE.pricing.gutters}
- Service Area: ${ASPECT_KNOWLEDGE.serviceLocation}

STRICT OUT-OF-SCOPE LIST (If ANY of these apply, you MUST set can_answer = false):
${ASPECT_KNOWLEDGE.strictOutOfScope.map(item => `- ${item}`).join("\n")}

YOUR BEHAVIOR RULES:
${ASPECT_KNOWLEDGE.toneGuidelines}

FEW-SHOT EXAMPLES OF PROPER SMS FORMATTING:
${FEW_SHOT_EXAMPLES.map(ex => `Customer: "${ex.customer}"\nAgent: "${ex.aiReply}"`).join("\n\n")}

CRITICAL INSTRUCTIONS:
1. If the customer asks something outside standard window cleaning, solar, or gutters, set can_answer = false and reply_text = "". DO NOT GUESS.
2. If customer is negotiating, demanding discounts, or reporting a past issue, set can_answer = false and reply_text = "".
3. If can_answer = true, write a short, friendly, natural SMS (1-3 sentences). Never sound like an AI bot.
4. Extract any property details mentioned (e.g. single/double storey, inside/out, address).
`;
}

/**
 * Fallback heuristic evaluator for local dev/testing before GEMINI_API_KEY is configured
 */
function evaluateWithLocalHeuristics(message: string, profile: LeadProfile): AgentDecision {
  const lower = message.toLowerCase();

  // Out of scope checks
  const outOfScopePatterns = [
    /roof.*paint/i, /tile.*repair/i, /pressure.*driveway/i, /limestone.*seal/i,
    /discount/i, /cheaper/i, /too expensive/i, /complaint/i, /damaged/i, /broken.*glass/i,
    /commercial.*tower/i, /4.*storey/i, /high.*rise/i
  ];

  for (const pattern of outOfScopePatterns) {
    if (pattern.test(lower)) {
      return {
        can_answer: false,
        reason: `Triggered out-of-scope filter matching: ${pattern}`,
        reply_text: ""
      };
    }
  }

  // Extract details
  const extracted: AgentDecision["extracted_details"] = {};
  if (/double|2\s*storey|two\s*storey/i.test(lower)) extracted.storeys = "Double Storey";
  if (/single|1\s*storey|one\s*storey/i.test(lower)) extracted.storeys = "Single Storey";
  if (/inside.*out|both|int.*ext/i.test(lower)) extracted.scope = "Inside & Out";
  if (/exterior.*only|outside.*only|just.*outside/i.test(lower)) extracted.scope = "Exterior Only";
  if (/screens?|flyscreens?/i.test(lower)) extracted.has_screens = true;

  // Address match (e.g. 14 Fraser St)
  const addrMatch = message.match(/\b\d+\s+[A-Za-z]+(?:\s+(?:st|street|rd|road|ave|avenue|dr|drive|cres|crescent|way|pde|parade))\b/i);
  if (addrMatch) extracted.address = addrMatch[0];

  // Natural replies
  let reply = "";
  if (extracted.storeys && !extracted.scope) {
    reply = `Got it! For ${extracted.storeys.toLowerCase()}, are you looking for exterior only, or inside and out as well?`;
  } else if (extracted.scope && !extracted.storeys) {
    reply = `No worries! Is the home single or double storey? That will give me the exact ballpark for you.`;
  } else if (extracted.storeys && extracted.scope) {
    reply = `Awesome, ${extracted.storeys.toLowerCase()} ${extracted.scope.toLowerCase()} is our most popular package. What's the street address in ${profile.suburb || "Perth"}? I'll check our schedule for this week.`;
  } else if (/photo|picture/i.test(lower)) {
    reply = `Feel free to text a couple of photos of the front and back here! I can check them and get back to you with a firm price right away.`;
  } else {
    reply = `Hey! Thanks for the message. To give you an accurate price, is your property single or double storey?`;
  }

  return {
    can_answer: true,
    reason: "Standard lead qualification within scope",
    reply_text: reply,
    extracted_details: extracted
  };
}

/**
 * Main evaluation function: processes inbound customer SMS
 */
export async function evaluateCustomerMessage(
  profile: LeadProfile,
  incomingMessage: string
): Promise<AgentDecision> {
  const apiKey = process.env.GEMINI_API_KEY;

  let decision: AgentDecision;

  if (!apiKey) {
    console.log("ℹ️ GEMINI_API_KEY not found in environment. Using local heuristic evaluation engine.");
    decision = evaluateWithLocalHeuristics(incomingMessage, profile);
  } else {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
CONVERSATION HISTORY:
${profile.messages.map(m => `${m.role.toUpperCase()}: "${m.body}"`).join("\n")}

LATEST INCOMING CUSTOMER MESSAGE:
"${incomingMessage}"

Evaluate this incoming message and return your response JSON.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: buildSystemInstruction(profile),
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              can_answer: {
                type: Type.BOOLEAN,
                description: "True if completely within scope and confidence is 100%. False if any doubt, out-of-scope, complaint, negotiation, or edge case."
              },
              reason: {
                type: Type.STRING,
                description: "Short internal reason for why this can or cannot be answered."
              },
              reply_text: {
                type: Type.STRING,
                description: "The casual, natural SMS reply to send to the customer. MUST be empty string if can_answer is false."
              },
              extracted_details: {
                type: Type.OBJECT,
                properties: {
                  storeys: { type: Type.STRING, nullable: true },
                  scope: { type: Type.STRING, nullable: true },
                  has_screens: { type: Type.BOOLEAN, nullable: true },
                  address: { type: Type.STRING, nullable: true },
                  notes: { type: Type.STRING, nullable: true }
                }
              }
            },
            required: ["can_answer", "reason", "reply_text"]
          }
        }
      });

      const parsedText = response.text || "{}";
      decision = JSON.parse(parsedText) as AgentDecision;
    } catch (err: any) {
      console.error("Gemini API Error, falling back to local evaluation:", err.message || err);
      decision = evaluateWithLocalHeuristics(incomingMessage, profile);
    }
  }

  // Handle Out-of-Scope Execution
  if (!decision.can_answer) {
    console.log(`\n🚨 [OUT OF SCOPE] Message from ${profile.phone}: "${incomingMessage}"`);
    console.log(`Reason: ${decision.reason}`);
    console.log(`Action: AI stays SILENT. Muting thread and alerting Ahmed.`);

    // 1. Force reply to be empty string (Zero messages to customer)
    decision.reply_text = "";

    // 2. Mute AI for this lead thread
    muteAiForLead(profile.phone, decision.reason);

    // 3. Send urgent alert to Ahmed's phone
    await sendUrgentAlertToAhmed(profile.name, profile.phone, incomingMessage, decision.reason);

    return decision;
  }

  // If in scope, persist any newly extracted details
  if (decision.extracted_details && Object.keys(decision.extracted_details).length > 0) {
    saveOrUpdateLead({
      phone: profile.phone,
      extracted_details: decision.extracted_details
    });
  }

  return decision;
}
