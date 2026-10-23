/**
 * Utility for sanitizing phone numbers on Aspect Window Cleaning.
 * Rule: NEVER attach any international extensions (+44, +61, etc.) on our own.
 * Always preserve or return clean national format.
 */

export function sanitizePhoneInput(val: string): string {
    if (!val) return "";
    let clean = val;
    const hasTrailingSpace = /\s+$/.test(val);

    // If browser autofill or paste mistakenly injected a UK extension (+44, 0044, or 44)
    if (clean.startsWith("+44") || clean.startsWith("0044")) {
        clean = clean.replace(/^(\+44|0044)\s*/, "");
        const digits = clean.replace(/\D/g, "");
        if (/^4\d{8}$/.test(digits)) {
            clean = "0" + clean;
        }
    } else if (clean.startsWith("44") && clean.replace(/\D/g, "").length === 11) {
        clean = clean.replace(/^44\s*/, "");
        const digits = clean.replace(/\D/g, "");
        if (/^4\d{8}$/.test(digits)) {
            clean = "0" + clean;
        }
    }

    // If an international +61 was passed with actual digits following, clean to 04XX
    if (clean.startsWith("+61") && clean.replace(/\D/g, "").length >= 3) {
        clean = "0" + clean.replace(/^\+61\s*/, "");
    } else if (clean.startsWith("614") && clean.replace(/\D/g, "").length === 11) {
        clean = "0" + clean.slice(2);
    }

    // Preserve trailing space if user is typing between digit blocks
    if (hasTrailingSpace && !clean.endsWith(" ")) {
        clean = clean + " ";
    }

    return clean;
}

export function normalizePhoneNumber(val: string): string {
    if (!val) return "";
    return sanitizePhoneInput(val).trim();
}

