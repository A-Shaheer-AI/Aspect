const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const commercialStart = '<section id="commercial"';
const commercialEnd = '</section>';
const trustedStart = '{/* 🔹🔹🔹 SECTION 4: TRUSTED BY 🔹🔹🔹 */}';
const trustedEnd = '{/* 🔹🔹🔹 SECTION 6: BEFORE / AFTER 🔹🔹🔹 */}';

console.log("Commercial Index:", content.indexOf(commercialStart));
console.log("Trusted Index:", content.indexOf(trustedStart));
console.log("Pricing Index:", content.indexOf('{/* PRICING SNIPPET */}'));