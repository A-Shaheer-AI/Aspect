const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

content = content.replace(/<h3([^>]*Get a Fast Text Quote[^>]*)<\/h3>/g, '<h2$1</h2>');
content = content.replace(/<h3([^>]*Ready for Spotless Windows\?[^>]*)<\/h3>/g, '<h2$1</h2>');
content = content.replace(/<h3([^>]*WHAT'S INCLUDED[^>]*)<\/h3>/g, '<p$1</p>');
content = content.replace(/<h4([^>]*>)\s*\{item\.title\}\s*<\/h4>/g, '<h3$1{item.title}</h3>');

// Color contrast fixes
// "Trusted by Perth businesses" has `color: "#aaa"` -> change to `#777`
content = content.replace(/color: "#aaa"/g, 'color: "#666"');
// "* Offer valid for accessible" has `text-gray-400` -> change to `text-gray-500`
content = content.replace(/text-sm text-gray-400 italic/g, 'text-sm text-gray-500 italic');

fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
console.log("Fixed headings and contrast");