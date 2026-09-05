const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

console.log("Commercial Index:", content.indexOf('<section id="commercial"'));
console.log("Trusted Index:", content.indexOf('Trusted by Perth businesses'));
console.log("Pricing Index:", content.indexOf('{/* PRICING SNIPPET */}'));