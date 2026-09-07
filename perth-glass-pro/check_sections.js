const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const regex = /\{\/\* 🔹🔹🔹.*?🔹🔹🔹 \*\/\}/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log(match[0], match.index);
}

// Also let's check for standard { /* SECTION ... */ } without emojis
const regex2 = /\{\/\*.*SECTION.*\*\/\}/g;
let match2;
while ((match2 = regex2.exec(content)) !== null) {
    console.log(match2[0], match2.index);
}