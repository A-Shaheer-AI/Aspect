const fs = require('fs');
const content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const regex = /<h[1-6][^>]*>.*?<\/h[1-6]>/gs;
let match;
while ((match = regex.exec(content)) !== null) {
    const clean = match[0].replace(/<h([1-6])[^>]*>/, 'h$1: ').replace(/<\/h[1-6]>/, '').replace(/<[^>]+>/g, '').replace(/\n|\r/g, ' ').trim();
    console.log(clean);
}