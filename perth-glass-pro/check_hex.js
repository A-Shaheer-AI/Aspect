const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const lockMatch = content.match(/.{0,20}We never share your details/);
console.log('Lock snippet:', lockMatch ? lockMatch[0] : 'not found');
console.log('Hex:', lockMatch ? Buffer.from(lockMatch[0]).toString('hex') : '');

const policeMatch = content.match(/.{0,20}Police Cleared/);
console.log('Police snippet:', policeMatch ? policeMatch[0] : 'not found');