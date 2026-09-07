const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const policeMatch = content.match(/.{0,20}Police Cleared/);
console.log('Police snippet:', policeMatch ? policeMatch[0] : 'not found');

const waterMatch = content.match(/.{0,20}Pure Water Tech/);
console.log('Water snippet:', waterMatch ? waterMatch[0] : 'not found');