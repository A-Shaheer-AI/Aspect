const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// 1. Extract Commercial section
let commStart = content.indexOf('<section id="commercial"');
let commEnd = content.indexOf('</section>', commStart) + 10;
let commercialContent = content.substring(commStart, commEnd);
content = content.substring(0, commStart) + content.substring(commEnd);

// 2. Extract Trusted section
let trustedStart = content.indexOf('<section className="px-6 py-10 text-center" style={{ background: "#f4f6ff" }}>\n                <p className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "#aaa" }}>\n                    Trusted by Perth businesses');
if (trustedStart === -1) {
    // try a looser match
    trustedStart = content.indexOf('<section className="px-6 py-10 text-center" style={{ background: "#f4f6ff" }}>');
}
let trustedEnd = content.indexOf('</section>', trustedStart) + 10;
let trustedContent = content.substring(trustedStart, trustedEnd);
content = content.substring(0, trustedStart) + content.substring(trustedEnd);

// Combine them
let newCombined = commercialContent + '\n\n' + trustedContent + '\n\n';

// 3. Insert above PRICING SNIPPET
let pricingStart = content.indexOf('{/* PRICING SNIPPET */}');
content = content.substring(0, pricingStart) + newCombined + content.substring(pricingStart);

fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
console.log("Moved successfully.");