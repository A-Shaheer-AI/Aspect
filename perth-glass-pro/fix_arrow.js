const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

content = content.replace(/Book Now ."/g, 'Book Now &rarr;"');
fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
console.log("Fixed arrow");