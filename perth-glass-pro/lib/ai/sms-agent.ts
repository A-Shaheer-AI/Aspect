import { GoogleGenAI, Type } from "@google/genai";
import { ASPECT_KNOWLEDGE } from "./knowledge";
import { LeadProfile, LeadExtractedDetails, muteAiForLead, saveOrUpdateLead } from "@/lib/leads/store";
import { alertCallRequested, alertLeadOffTrack, alertQuoteCompleted } from "@/lib/telephony/sms-service";

export interface AgentDecision {
  can_answer: boolean;
  reason: string;
  reply_text: string;
  is_call_request?: boolean;
  is_completed?: boolean;
  extracted_details?: Partial<LeadExtractedDetails>;
}

/**
 * Builds the strict, context-aware system prompt for Fazal
 */
function buildSystemInstruction(profile: LeadProfile): string {
  const d = profile.extracted_details || {};
  const assistantMsgCount = profile.messages.filter(m => m.role === "assistant").length;
  const isFirstMessage = assistantMsgCount === 0;
  const isWebsiteLead = profile.lead_source === "website";

  return `
You are Fazal, the customer service coordinator for ${ASPECT_KNOWLEDGE.businessName} in Perth, Western Australia.
You are communicating via SMS with ${profile.name || "a customer"} (${profile.phone}).

CURRENT KNOWN PROPERTY DETAILS (DO NOT ASK FOR DETAILS ALREADY KNOWN):
- Lead Source: ${profile.lead_source || "SMS"}
- Suburb: ${d.suburb || profile.suburb || "Perth"}
- Property Type: ${d.property_type || "UNKNOWN"}
- Storeys: ${d.storeys || "UNKNOWN"}
- Address: ${d.address || "UNKNOWN"}
- Approx Window Count: ${d.window_count || "UNKNOWN"}
- Window Condition / Last Cleaned: ${d.condition || "UNKNOWN"}
- Chosen Package: ${d.chosen_plan || "UNKNOWN"}
- Contact Preference: ${d.contact_preference || "UNKNOWN"}

PACKAGES:
1. Detailed Clean: For people who want a 100% perfect finish. Intensive manual clean where we manually scrape every accessible bit of paint, construction residue, stickers, or mineral spots, along with a deep scrub of tracks, frames, and flyscreens.
2. Basic Wash: Focuses on washing away surface dirt, dust, and cobwebs to achieve an approx 85–90% clean finish. Includes external frames and a basic wipe of inside frames and tracks, but does not include manual razor scraping of paint or bonded residue.

STRICT CONVERSATIONAL PROTOCOL:
1. FIRST MESSAGE PROTOCOL (isFirstMessage = ${isFirstMessage}):
   - If this is the FIRST message you are sending:
     - If lead came from SMS: Greet with "Hi, thanks for your message! When would be a good time to have a chat? Would you prefer a quick phone call so we can grab all the necessary details and get back to you with a quote as soon as possible, or would you prefer to chat over text?"
     - If lead came from Website: Greet with "Hi, thanks for your query on our website! Could I grab a few more details so we can decide whether a site visit would be needed or if we can get you an instant quote? When would be a good time to have a chat — would you prefer a quick phone call so we can grab all the necessary details, or would you prefer to chat over text?"
     - Sign-off on FIRST message ONLY: You MUST end the first message with:
       "Regards, Aspect Window Cleaning, Fazal."
   - IF THIS IS NOT THE FIRST MESSAGE: You are STRICTLY FORBIDDEN from including any sign-off or signature. Do NOT say "Regards" or "Fazal".

2. BRANCH A - CUSTOMER WANTS A PHONE CALL:
   - If customer says "call me", "call now", "give me a ring", "call in 10 mins", "after 4pm", etc.:
     - Confirm warmly: "Sounds great! We'll give you a call shortly. Talk soon!"
     - Set is_call_request = true.
     - Extract any preferred call time.

3. BRANCH B - CHAT OVER TEXT:
   - Gather missing details ONE at a time in natural conversation.
   - NEVER ask for something listed above as KNOWN.
   - If Property Type is UNKNOWN: Ask if residential or commercial.
   - If Storeys is UNKNOWN: Ask if single or double storey.
   - If Address is UNKNOWN: Ask for street address in their suburb.
   - If Approx Window Count is UNKNOWN: Ask for a rough ballpark window count.
   - If Condition is UNKNOWN: Ask roughly when the windows were last cleaned.
   - Once all above are known, present the two packages (Detailed Clean vs Basic Wash) clearly explaining the difference (manual scraping for 100% perfect finish vs 85-90% wash) and ask which they prefer.
   - Once package is chosen: Say "Thank you so much for this information! We will review this and get back to you with a quote shortly." and set is_completed = true.

4. ULTRA-SENSITIVE GUARDRAIL (Zero tolerance for off-track):
   - If the customer asks to speak with a human, asks if you are an AI/bot, or asks for a real person: You MUST set can_answer = false, reply_text = "". The AI immediately stops.
   - If the customer says ANYTHING slightly off from standard window/solar/gutter qualification (complaints, negotiation, discounts, structural damage, broken glass, roofing, high-rise, rude remarks):
   - You MUST set can_answer = false, reply_text = "". DO NOT GUESS.
`;
}

/**
 * Comprehensive heuristic state machine evaluator
 */
export function evaluateWithLocalHeuristics(message: string, profile: LeadProfile): AgentDecision {
  const lower = message.toLowerCase().trim();
  const d: LeadExtractedDetails = { ...(profile.extracted_details || {}) };
  const assistantMsgCount = profile.messages.filter(m => m.role === "assistant").length;
  const isFirstMessage = assistantMsgCount === 0;
  const isWebsiteLead = profile.lead_source === "website";

  // 1. Ultra-sensitive off-topic & anomaly check
  const outOfScopePatterns = [
    /\b(human|real\s*person|talk\s*to\s*(someone|person|human|agent)|speak\s*to\s*(someone|person|human|agent)|are\s*you\s*(a\s*)?(bot|ai|robot|computer)|not\s*(a\s*)?bot|stop\s*bot)\b/i,
    /roof.*paint/i, /tile.*repair/i, /pressure.*driveway/i, /limestone.*seal/i,
    /discount/i, /cheaper/i, /too expensive/i, /price.*beat/i, /bargain/i,
    /complaint/i, /damaged/i, /broken.*glass/i, /cracked/i, /scratch/i,
    /commercial.*tower/i, /high.*rise/i, /abseil/i, /rope\s*access/i,
    /lawsuit/i, /legal/i, /fair\s*trading/i, /scam/i, /refund/i
  ];

  for (const pattern of outOfScopePatterns) {
    if (pattern.test(lower)) {
      return {
        can_answer: false,
        reason: `Triggered out-of-scope guardrail matching: ${pattern}`,
        reply_text: ""
      };
    }
  }

  // 2. Detect Call Request
  const isCall = /\b(call|phone|ring|talk\s*(on|over)\s*phone|speak|give\s*me\s*a\s*call|ring\s*me)\b/i.test(lower);
  if (isCall) {
    let callTime = "ASAP";
    const timeMatch = message.match(/\b(in\s*\d+\s*(?:mins?|minutes?|hours?)|after\s*\d+(?:\s*(?:am|pm))?|\d+:\d+|\bnow\b|\btomorrow\b)/i);
    if (timeMatch) callTime = timeMatch[0];

    d.contact_preference = "phone";
    d.preferred_call_time = callTime;
    d.stage = "call_scheduled";

    return {
      can_answer: true,
      reason: "Customer requested a phone call",
      reply_text: `Sounds great! We'll give you a call ${callTime === "ASAP" || callTime.toLowerCase() === "now" ? "shortly" : callTime}. Talk soon!`,
      is_call_request: true,
      extracted_details: d
    };
  }

  // 3. Extract any property details mentioned in this message
  // Suburb check
  if (!d.suburb && profile.suburb) {
    d.suburb = profile.suburb;
  }
  const perthSuburbs = ["scarborough", "dalkeith", "nedlands", "cottesloe", "subiaco", "claremont", "city beach", "sorrento", "joondalup", "fremantle", "karrinyup"];
  for (const sub of perthSuburbs) {
    if (lower.includes(sub)) {
      d.suburb = sub.charAt(0).toUpperCase() + sub.slice(1);
    }
  }

  // Property Type
  if (/\b(office|shop|store|commercial|business|warehouse|showroom|factory)\b/i.test(lower)) {
    d.property_type = "Commercial";
  } else if (/\b(house|home|residential|villa|townhouse|duplex|apartment|unit)\b/i.test(lower)) {
    d.property_type = "Residential";
  }

  // Storeys
  if (/\b(double|two|2)\s*(storey|story|stories|floor|floors|lvl|level)\b/i.test(lower) || /\bdouble\s*story\b/i.test(lower)) {
    d.storeys = "Double Storey";
  } else if (/\b(single|one|1)\s*(storey|story|floor|lvl|level)\b/i.test(lower) || /\bsingle\s*story\b/i.test(lower)) {
    d.storeys = "Single Storey";
  } else if (/\b(three|3|multi)\s*(storey|story|stories)\b/i.test(lower)) {
    d.storeys = "Multi Storey";
  }

  // Window Count (e.g., "50 windows", "about 50", "approx 30 windows")
  const windowCountMatch = message.match(/\b(?:about|around|approx|approximately)?\s*(\d+)\s*(?:windows?|panes?|glass)\b/i) || message.match(/\b(\d+)\s*windows?\b/i);
  if (windowCountMatch) {
    d.window_count = windowCountMatch[1] + " windows";
  }

  // Address
  const addrMatch = message.match(/\b\d+\s+[A-Za-z]+(?:\s+(?:st|street|rd|road|ave|avenue|dr|drive|cres|crescent|way|pde|parade|pl|place|lane|hwy|highway))\b/i);
  if (addrMatch) {
    d.address = addrMatch[0];
  }

  // Condition / Last Cleaned
  const condMatch = message.match(/\b(\d+\s*(?:weeks?|months?|years?)|never|post[\s-]reno|renovation|ages|recently|long\s*time)\b/i);
  if (condMatch && !windowCountMatch) {
    d.condition = condMatch[0];
  } else if (/\b(?:cleaned|done|washed|last)\s*(?:about|around)?\s*(\d+\s*(?:weeks?|months?|years?)|never|recently)\b/i.test(lower)) {
    const m = lower.match(/\b(?:cleaned|done|washed|last)\s*(?:about|around)?\s*([a-z0-9\s]+)/i);
    if (m) d.condition = m[1].trim();
  }

  // Chosen Plan
  if (/\b(detailed|detail|perfect|100%|deep|scrape|scraping|full)\b/i.test(lower)) {
    d.chosen_plan = "Detailed Clean";
  } else if (/\b(basic|standard|wash|just\s*wash|85%|90%|external\s*only)\b/i.test(lower)) {
    d.chosen_plan = "Basic Wash";
  }

  // 4. Formulate the response based on stage and missing details
  // FIRST MESSAGE
  if (isFirstMessage) {
    d.stage = "awaiting_preference";
    let firstMsg = "";
    if (isWebsiteLead) {
      firstMsg = `Hi, thanks for your query on our website! Could I grab a few more details so we can decide whether a site visit would be needed or if we can get you an instant quote? When would be a good time to have a chat — would you prefer a quick phone call so we can grab all the necessary details, or would you prefer to chat over text?\n\nRegards, Aspect Window Cleaning, Fazal.`;
    } else {
      firstMsg = `Hi, thanks for your message! When would be a good time to have a chat? Would you prefer a quick phone call so we can grab all the necessary details and get back to you with a quote as soon as possible, or would you prefer to chat over text?\n\nRegards, Aspect Window Cleaning, Fazal.`;
    }
    return {
      can_answer: true,
      reason: "Initial greeting and preference request",
      reply_text: firstMsg,
      extracted_details: d
    };
  }

  // SUBSEQUENT MESSAGES: NO SIGN-OFF!
  d.contact_preference = "text";

  // Check what is missing in sequential order:
  // 1) Property Type (Skip if already known)
  if (!d.property_type) {
    d.stage = "collecting_details";
    return {
      can_answer: true,
      reason: "Asking property type",
      reply_text: `Is the property residential or commercial?`,
      extracted_details: d
    };
  }

  // 2) Storeys (Skip if already known)
  if (!d.storeys) {
    d.stage = "collecting_details";
    return {
      can_answer: true,
      reason: "Asking storeys",
      reply_text: `Is the property single or double storey?`,
      extracted_details: d
    };
  }

  // 3) Address (Skip if already known)
  if (!d.address) {
    d.stage = "collecting_details";
    return {
      can_answer: true,
      reason: "Asking address",
      reply_text: `What's the street address in ${d.suburb || profile.suburb || "Perth"}? (Just so we can check accessibility and scheduling)`,
      extracted_details: d
    };
  }

  // 4) Ballpark Window Count (Skip if already known)
  if (!d.window_count) {
    d.stage = "collecting_details";
    return {
      can_answer: true,
      reason: "Asking ballpark window count",
      reply_text: `Roughly how many windows would you say there are? Just a quick ballpark figure is plenty!`,
      extracted_details: d
    };
  }

  // 5) Condition / Last Cleaned (Skip if already known)
  if (!d.condition) {
    d.stage = "collecting_details";
    return {
      can_answer: true,
      reason: "Asking window condition",
      reply_text: `And roughly when were the windows last cleaned?`,
      extracted_details: d
    };
  }

  // 6) Present Packages (Detailed Clean vs Basic Wash)
  if (!d.chosen_plan) {
    d.stage = "plan_selection";
    return {
      can_answer: true,
      reason: "Presenting packages",
      reply_text: `We have two main options:\n\nOur Detailed Clean is for people who want a perfect finish — it's an intensive manual clean where we manually scrape every accessible bit of paint, construction residue, or stubborn spots, along with a deep scrub of the tracks, frames, and flyscreens.\n\nOur Basic Wash focuses on removing everyday dirt, dust, and cobwebs to achieve an approx 85–90% clean finish. That includes external frames and a basic wipe of inside frames and tracks, but does not include manual scraping of paint or bonded residue.\n\nWhich of those sounds closer to what you'd like?`,
      extracted_details: d
    };
  }

  // 7) Completion Wrap-up
  d.stage = "completed";
  return {
    can_answer: true,
    reason: "Lead qualification completed",
    reply_text: `Thank you so much for all this information! We'll review everything and get back to you with your quote shortly.`,
    is_completed: true,
    extracted_details: d
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
    console.log("ℹ️ GEMINI_API_KEY not found in environment. Using Fazal heuristic state engine.");
    decision = evaluateWithLocalHeuristics(incomingMessage, profile);
  } else {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `
CONVERSATION HISTORY:
${profile.messages.map(m => `${m.role.toUpperCase()}: "${m.body}"`).join("\n")}

LATEST INCOMING CUSTOMER MESSAGE:
"${incomingMessage}"

Evaluate this incoming message and return your response JSON according to Fazal's protocol.
`;

      const candidateModels = [
        process.env.GEMINI_MODEL,
        "gemini-2.0-flash",
        "gemini-1.5-flash"
      ].filter(Boolean) as string[];

      let response: any = null;
      let lastErr: any = null;

      for (const modelCandidate of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model: modelCandidate,
            contents: prompt,
            config: {
              systemInstruction: buildSystemInstruction(profile),
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  can_answer: {
                    type: Type.BOOLEAN,
                    description: "True if within standard window qualification. False if off-topic, complaints, negotiations, or complex issues."
                  },
                  reason: {
                    type: Type.STRING,
                    description: "Internal reason for the evaluation."
                  },
                  reply_text: {
                    type: Type.STRING,
                    description: "The SMS reply to send to the customer. MUST be empty string if can_answer is false."
                  },
                  is_call_request: {
                    type: Type.BOOLEAN,
                    description: "True if customer asked for a phone call."
                  },
                  is_completed: {
                    type: Type.BOOLEAN,
                    description: "True if all details and package choice have been provided."
                  },
                  extracted_details: {
                    type: Type.OBJECT,
                    properties: {
                      property_type: { type: Type.STRING, nullable: true },
                      storeys: { type: Type.STRING, nullable: true },
                      address: { type: Type.STRING, nullable: true },
                      suburb: { type: Type.STRING, nullable: true },
                      window_count: { type: Type.STRING, nullable: true },
                      condition: { type: Type.STRING, nullable: true },
                      chosen_plan: { type: Type.STRING, nullable: true },
                      contact_preference: { type: Type.STRING, nullable: true },
                      preferred_call_time: { type: Type.STRING, nullable: true },
                      notes: { type: Type.STRING, nullable: true }
                    }
                  }
                },
                required: ["can_answer", "reason", "reply_text"]
              }
            }
          });
          if (response) break;
        } catch (mErr: any) {
          lastErr = mErr;
        }
      }

      if (!response) {
        throw lastErr || new Error("All candidate Gemini models failed");
      }

      const parsedText = response.text || "{}";
      decision = JSON.parse(parsedText) as AgentDecision;
    } catch (err: any) {
      console.error("Gemini API Error, falling back to Fazal heuristic state engine:", err.message || err);
      decision = evaluateWithLocalHeuristics(incomingMessage, profile);
    }
  }

  // Handle Out-of-Scope Execution (Ultra-Sensitive Guardrail)
  if (!decision.can_answer) {
    console.log(`\n🚨 [OUT OF SCOPE] Message from ${profile.phone}: "${incomingMessage}"`);
    console.log(`Reason: ${decision.reason}`);
    console.log(`Action: AI stays SILENT. Muting thread and alerting owner.`);

    // 1. Force reply to be empty string (Zero messages to customer)
    decision.reply_text = "";

    // 2. Mute AI for this lead thread
    muteAiForLead(profile.phone, decision.reason);

    // 3. Send urgent alert to owner's phone via SMS
    await alertLeadOffTrack(profile, incomingMessage, decision.reason);

    return decision;
  }

  // If in scope, persist any newly extracted details
  if (decision.extracted_details && Object.keys(decision.extracted_details).length > 0) {
    saveOrUpdateLead({
      phone: profile.phone,
      extracted_details: decision.extracted_details
    });
  }

  // Handle Call Request
  if (decision.is_call_request) {
    muteAiForLead(profile.phone, "Customer requested phone call");
    await alertCallRequested(profile, decision.extracted_details?.preferred_call_time || "ASAP");
  }

  // Handle Qualification Completion
  if (decision.is_completed) {
    await alertQuoteCompleted(profile);
  }

  return decision;
}
