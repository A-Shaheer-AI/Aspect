function sanitizePhoneInput(val) {
    if (!val) return "";
    let clean = val;
    const hasTrailingSpace = /\s+$/.test(val);

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

    if (clean.startsWith("+61") && clean.replace(/\D/g, "").length >= 3) {
        clean = "0" + clean.replace(/^\+61\s*/, "");
    } else if (clean.startsWith("614") && clean.replace(/\D/g, "").length === 11) {
        clean = "0" + clean.slice(2);
    }

    if (hasTrailingSpace && !clean.endsWith(" ")) {
        clean = clean + " ";
    }
    return clean;
}

console.log('0426 :', JSON.stringify(sanitizePhoneInput('0426 ')));
console.log('+61:', JSON.stringify(sanitizePhoneInput('+61')));
console.log('+61 4:', JSON.stringify(sanitizePhoneInput('+61 4')));
console.log('+61 426 996 192:', JSON.stringify(sanitizePhoneInput('+61 426 996 192')));
console.log('+44 426 996 192:', JSON.stringify(sanitizePhoneInput('+44 426 996 192')));

