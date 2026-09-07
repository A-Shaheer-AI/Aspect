const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const pricingStart = content.indexOf('{/* PRICING SNIPPET */}');
const pricingEnd = content.indexOf('</section>', pricingStart) + 10;
console.log(content.substring(pricingStart, pricingEnd));