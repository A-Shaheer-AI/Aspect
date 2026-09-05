const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const start = content.indexOf('{/* PRICING SNIPPET */}');
const end = content.indexOf('<section id="guarantee"');
console.log(content.substring(start, end));