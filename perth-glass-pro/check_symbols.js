const fs = require('fs');
const content = fs.readFileSync('app/commercial/page.tsx', 'utf8');
const match = content.match(/[^x00-x7F]+/g);
if (match) {
    const unique = [...new Set(match)];
    console.log(unique);
}