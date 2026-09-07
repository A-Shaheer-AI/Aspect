const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const regex = /<section[^>]*>|\{\/\*.*?\*\/\}/g;
let match;
let output = [];
while ((match = regex.exec(content)) !== null) {
    if (match[0].includes('SECTION') || match[0].includes('id="') || match[0].includes('PRICING') || match[0].includes('COMMERCIAL') || match[0].includes('PROMOS')) {
        output.push(match[0]);
    }
}
console.log(output.join('\n'));