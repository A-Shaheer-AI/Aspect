import { CrmInvoice, InvoiceItem } from "./types";
import { DEFAULT_BANKING_DETAILS, DEFAULT_BUSINESS_DETAILS, DEFAULT_TERMS_AND_CONDITIONS } from "./store";

export interface ParsedInvoiceResult {
  type: "invoice" | "quote";
  clientName: string;
  clientAddress: string;
  subject: string;
  items: Array<{ description: string; qty: number; rate: number; amount: number }>;
  total: number;
}

/**
 * Natural language AI parser for instant quote/invoice generation
 */
export function parseInvoicePrompt(prompt: string): ParsedInvoiceResult {
  const text = prompt.trim();
  const lower = text.toLowerCase();

  const isQuote = lower.includes("quote") || lower.includes("quotation") || lower.includes("estimate");
  const docType: "invoice" | "quote" = isQuote ? "quote" : "invoice";

  let clientName = "Customer";
  let clientAddress = "Perth WA";
  let subject = "Window Cleaning & Property Detailing";

  // 1. Extract Client Name & Address
  // Common patterns: "Invoice for [Name] at [Address]: ..." or "Quote for [Name]: ..."
  const forMatch = text.match(/(?:invoice|quote|bill)\s+for\s+([A-Za-z0-9\s'-]+?)(?:\s+(?:at|in|,)\s+([A-Za-z0-9\s,./'-]+?))?:/i) ||
                   text.match(/(?:invoice|quote|bill)\s+for\s+([A-Za-z0-9\s'-]+)/i);

  if (forMatch) {
    clientName = forMatch[1]?.trim() || "Customer";
    if (forMatch[2]) {
      clientAddress = forMatch[2]?.trim();
    }
  }

  // 2. Extract Items and Prices
  const items: Array<{ description: string; qty: number; rate: number; amount: number }> = [];

  // Split content after the colon or after the name
  let itemsPart = text;
  if (text.includes(":")) {
    itemsPart = text.split(":")[1];
  } else if (forMatch) {
    itemsPart = text.slice(forMatch[0].length);
  }

  // Normalize "inside and out" to "inside & out" so "and" doesn't falsely segment
  let normalizedItemsPart = itemsPart.replace(/\b(inside|in)\s+and\s+out\b/gi, "$1 & out");

  // Segment by commas, plus signs, semicolons, newlines, or "and" followed by an item with a price
  const rawSegments = normalizedItemsPart.split(/[,;\+\n]|\band\b(?=\s+[^,;\+\n]+\$|\s+[^,;\+\n]+\b\d+)/i)
    .map(s => s.trim())
    .filter(Boolean);

  let calculatedTotal = 0;

  for (const seg of rawSegments) {
    // Look for price:
    // 1) Explicit dollar sign: $340 or $ 340
    // 2) Number with "dollars": 340 dollars
    // 3) Trailing number: 340 at the end of segment
    let price: number | null = null;
    let priceMatchStr = "";

    const dollarMatch = seg.match(/\$\s*(\d+(?:\.\d{1,2})?)/);
    const wordDollarMatch = seg.match(/(\d+(?:\.\d{1,2})?)\s*(?:dollars?|aud|bucks)/i);
    const trailingNumberMatch = seg.match(/\b(\d+(?:\.\d{1,2})?)$/);

    if (dollarMatch) {
      price = parseFloat(dollarMatch[1]);
      priceMatchStr = dollarMatch[0];
    } else if (wordDollarMatch) {
      price = parseFloat(wordDollarMatch[1]);
      priceMatchStr = wordDollarMatch[0];
    } else if (trailingNumberMatch) {
      price = parseFloat(trailingNumberMatch[1]);
      priceMatchStr = trailingNumberMatch[0];
    }

    if (price !== null && !isNaN(price)) {
      // Clean description by removing the exact matched price string and common filler words
      let desc = seg.replace(priceMatchStr, "").replace(/\b(?:dollars?|for|cost|clean|cleaning)\b/gi, "").trim();
      desc = desc.replace(/^[\s\-,:]+|[\s\-,:]+$/g, "");

      if (desc.length > 0) {
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
      } else {
        desc = "Window Cleaning Service";
      }

      items.push({
        description: desc,
        qty: 1,
        rate: price,
        amount: price
      });
      calculatedTotal += price;
    }
  }

  // Fallback if no items were parsed
  if (items.length === 0) {
    items.push({
      description: "Residential Window Cleaning (Inside & Out)",
      qty: 1,
      rate: 280.00,
      amount: 280.00
    });
    calculatedTotal = 280.00;
  }

  if (clientAddress !== "Perth WA") {
    subject = `Window Cleaning at ${clientAddress}`;
  } else {
    subject = `Window Cleaning Services for ${clientName}`;
  }

  return {
    type: docType,
    clientName,
    clientAddress,
    subject,
    items,
    total: calculatedTotal
  };
}

/**
 * Creates a fully formed CrmInvoice object from parsed result
 */
export function buildInvoiceFromParsed(
  parsed: ParsedInvoiceResult,
  existingCount: number = 243,
  includeGst: boolean = true
): CrmInvoice {
  const now = new Date();
  const issueDate = now.toISOString().split("T")[0];
  
  const due = new Date(now);
  due.setDate(due.getDate() + 14); // 14-day terms
  const dueDate = due.toISOString().split("T")[0];

  const prefix = parsed.type === "quote" ? "QUO" : "INV";
  const formattedId = `${prefix}-${String(existingCount).padStart(6, "0")}`;

  // If GST is enabled, prices include 10% GST. If disabled, subtotal = total and GST = 0.
  const subtotal = includeGst
    ? Math.round((parsed.total / 1.1) * 100) / 100
    : parsed.total;
  const gst = includeGst
    ? Math.round((parsed.total - subtotal) * 100) / 100
    : 0;

  const items: InvoiceItem[] = parsed.items.map((item, index) => {
    const itemSubtotal = includeGst
      ? Math.round((item.amount / 1.1) * 100) / 100
      : item.amount;
    return {
      id: `item_${Date.now()}_${index}`,
      heading: item.description,
      description: "0 PPM pure water wash, frames and sliding channels detailed.",
      qty: item.qty || 1,
      rate: itemSubtotal,
      amount: itemSubtotal
    };
  });

  return {
    id: formattedId,
    type: parsed.type,
    clientName: parsed.clientName,
    clientAddress: parsed.clientAddress,
    subject: parsed.subject,
    issueDate,
    dueDate,
    items,
    subtotal,
    gst,
    total: parsed.total,
    includeGst,
    status: "draft",
    businessDetails: DEFAULT_BUSINESS_DETAILS,
    showPaymentDetails: true,
    paymentDetails: DEFAULT_BANKING_DETAILS,
    termsAndConditions: DEFAULT_TERMS_AND_CONDITIONS,
    customerNote: "",
    customSections: [],
    notes: "Payment is strictly 14 days from invoice date. Direct EFT or PayID.",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
}
