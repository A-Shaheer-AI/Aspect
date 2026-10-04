/**
 * Utility for sanitizing phone numbers on Aspect Window Cleaning.
 * Rule: NEVER attach any international extensions (+44, +61, etc.) on our own.
 * Always preserve or return clean national format.
 */

export function sanitizePhoneInput(val: string): string {
    if (!val) return "";
    let trimmed = val.trim();

    // If browser autofill or paste mistakenly injected a UK extension (+44, 0044, or 44)
    if (trimmed.startsWith("+44") || trimmed.startsWith("0044")) {
        trimmed = trimmed.replace(/^(\+44|0044)\s*/, "");
        const digits = trimmed.replace(/\D/g, "");
        if (/^4\d{8}$/.test(digits)) {
            trimmed = "0" + trimmed;
        }
    } else if (trimmed.startsWith("44") && trimmed.replace(/\D/g, "").length === 11) {
        trimmed = trimmed.replace(/^44\s*/, "");
        const digits = trimmed.replace(/\D/g, "");
        if (/^4\d{8}$/.test(digits)) {
            trimmed = "0" + trimmed;
        }
    }

    // If an international +61 was passed, clean to standard national 04XX format
    if (trimmed.startsWith("+61")) {
        trimmed = "0" + trimmed.slice(3).trim();
    } else if (trimmed.startsWith("614") && trimmed.replace(/\D/g, "").length === 11) {
        trimmed = "0" + trimmed.slice(2);
    }

    return trimmed;
}
