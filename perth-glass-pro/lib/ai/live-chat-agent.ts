import { GoogleGenAI } from "@google/genai";
import { ASPECT_KNOWLEDGE } from "./knowledge";
import { LiveChatSession } from "@/lib/chat/store";

export const FIRST_MESSAGE_GREETING = "Hi, thanks for reaching out! We would be happy to provide more info. What did you need help with?";

/**
 * Builds the system instruction for the live chat agent
 */
function buildLiveChatSystemInstruction(): string {
  return `
You are the friendly, helpful online assistant for ${ASPECT_KNOWLEDGE.businessName} in Perth, Western Australia.
You are chatting with a website visitor via the live chat widget on our website.

WEBSITE KNOWLEDGE BASE:
- Services Offered:
  * Residential Window Cleaning: Single and double-storey homes, coastal estates, internal & external glass, flyscreens, frames, and sliding door tracks.
  * Commercial Window Cleaning: Low-to-mid rise offices, retail storefronts, strata complexes, and automotive showrooms up to 5 storeys.
  * Solar Panel Cleaning: Deionised pure water cleaning to maximize solar efficiency without abrasive detergents.
  * Gutter Cleaning: Clearing debris, downpipes, and leaves.
  * Pressure Washing: Exterior paving, patios, and walls.
- Technology & Methods:
  * 0 PPM Multi-stage Reverse Osmosis & Deionised (RO/DI) pure water reach poles (cleans up to 5 storeys safely from the ground).
  * 100% chemical-free, streak-free natural evaporation.
- Service Packages:
  * Basic Wash: 85–90% clean finish. Cleans glass and frames, basic wipe of tracks. Ideal for regular maintenance.
  * Detailed Clean: 100% perfect finish. Includes manual razor scraping of paint, mortar, stickers, or mineral spots, plus deep scrub of tracks, frames, and screens.
- Typical Ballpark Pricing:
  * Single Storey: Exterior from ~$159; Inside & Out from ~$279.
  * Double Storey: Exterior from ~$279; Inside & Out from ~$499.
- Service Locations:
  * All Perth metro suburbs (Cottesloe, Scarborough, City Beach, Nedlands, Dalkeith, Fremantle, Subiaco, Claremont, Hillarys, Joondalup, etc.).
- Credentials:
  * $20 Million Public Liability Insurance, Working at Heights certified, full police clearances.

STRICT CONVERSATIONAL RULES:
1. Tone: Friendly, concise, professional, Australian local. Keep responses to 1–3 short sentences.
2. If the visitor's question CAN be answered using the knowledge base above:
   - Provide a helpful, clear answer.
   - Example: "Yes, we specialize in both single and double-storey homes across Perth using pure water reach poles! Are you looking for exterior only, or inside and out as well?"
3. UNKNOWN INFORMATION RULE (Crucial):
   - If the customer asks about something NOT in our website knowledge (e.g., roof repairs, carpet cleaning, chemical limestone sealing, exact scheduling, discount requests, complex technical abseiling):
   - You MUST politely ask for their contact details so Ahmed and the team can get back to them immediately.
   - Use phrasing like:
     "I want to make sure you get the exact details on that! Could I grab your name and the best phone number or email so Ahmed and our team can review this and get back to you as soon as possible?"
`;
}

/**
 * Fallback local heuristic evaluator for live chat
 */
export function evaluateLiveChatWithHeuristics(message: string, session: LiveChatSession): string {
  const lower = message.toLowerCase().trim();

  // 1. Check for unknown / out of scope services
  const unknownPatterns = [
    /roof.*paint/i, /tile.*repair/i, /carpet/i, /pool.*liner/i, /abseil/i, /high.*rise.*tower/i,
    /discount/i, /cheap/i, /bargain/i, /price.*match/i, /complaint/i, /broken.*glass/i, /scratch/i
  ];

  for (const pattern of unknownPatterns) {
    if (pattern.test(lower)) {
      return "I want to make sure you get the exact details on that! Could I grab your name and the best phone number or email so Ahmed and our team can review this and get back to you as soon as possible?";
    }
  }

  // 2. Check if customer provided their contact details (phone or email)
  const phonePattern = /(?:\+61|0)4\d{8}/;
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  if (phonePattern.test(message) || emailPattern.test(message)) {
    return "Thank you so much! I have passed your details directly to Ahmed and our team. We'll be in touch with you shortly!";
  }

  // 3. Pricing questions
  if (/\b(price|pricing|cost|how\s*much|quote|rates)\b/i.test(lower)) {
    return "For residential homes in Perth, our exterior washes typically start from $159 for single storey and $279 for double storey. Inside & out detailing is also available. Is your home single or double storey?";
  }

  // 4. Storeys
  if (/\b(double|two|2)\s*(storey|story)\b/i.test(lower)) {
    return "Got it! Double storey homes are our specialty using carbon-fibre reach poles up to 5 storeys. Are you looking for exterior only, or inside and out with tracks and screens?";
  }
  if (/\b(single|one|1)\s*(storey|story)\b/i.test(lower)) {
    return "Great! For single-storey homes, we detail all exterior glass, frames, and sills to a streak-free finish. Would you like a quote for exterior only, or inside and out?";
  }

  // 5. Commercial / Office / Strata
  if (/\b(commercial|office|shop|store|strata|showroom)\b/i.test(lower)) {
    return "Yes! We manage commercial properties, retail showrooms, corporate offices, and strata complexes across Perth with full $20M insurance. What type of commercial property is it?";
  }

  // 6. Solar / Gutters / Pressure
  if (/\b(solar|panel)\b/i.test(lower)) {
    return "Yes, we clean solar panels using deionised pure water, which safely removes dust and bird droppings to restore peak solar efficiency. How many panels do you have roughly?";
  }
  if (/\b(gutter|gutters)\b/i.test(lower)) {
    return "Yes, we offer complete gutter and downpipe clearing to prevent winter blockages and water overflow. What suburb are you located in?";
  }
  if (/\b(pressure|paving|driveway)\b/i.test(lower)) {
    return "Yes, we do high-pressure washing for driveways, patios, and exterior pavers. What area needs cleaning?";
  }

  // 7. General inquiry fallback
  return "We'd love to help with that! We cover all Perth metro suburbs for residential and commercial window cleaning. Could you let us know your suburb and roughly how many windows or storeys you have?";
}

/**
 * Evaluates live chat message using Gemini with local heuristic fallback
 */
export async function evaluateLiveChatMessage(incomingMessage: string, session: LiveChatSession): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return evaluateLiveChatWithHeuristics(incomingMessage, session);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";

    // Build chat history for LLM context
    const chatContents = session.messages.slice(-8).map(m => ({
      role: m.role === "assistant" || m.role === "owner" ? "model" : "user",
      parts: [{ text: m.body }]
    }));

    chatContents.push({
      role: "user",
      parts: [{ text: incomingMessage }]
    });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: chatContents as any,
      config: {
        systemInstruction: buildLiveChatSystemInstruction(),
        temperature: 0.2,
      }
    });

    const text = response.text?.trim();
    if (text) {
      return text;
    }
    return evaluateLiveChatWithHeuristics(incomingMessage, session);
  } catch (err: any) {
    console.warn("⚠️ [LiveChat Gemini Error] Falling back to heuristics:", err.message);
    return evaluateLiveChatWithHeuristics(incomingMessage, session);
  }
}
