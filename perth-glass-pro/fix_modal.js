const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// The modal markup that was incorrectly added to the top
const modalMarkupStart = '{/* PACKAGE SELECTION MODAL */}';
const useClientPos = content.indexOf('"use client";');

if (useClientPos > 0) {
    const modalMarkup = content.substring(0, useClientPos).trim();
    content = content.substring(useClientPos); // starts with "use client"
    
    // find the end of the file
    const endPos = content.lastIndexOf('</>');
    content = content.substring(0, endPos) + modalMarkup + '\n        ' + content.substring(endPos);
    
    fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
    console.log("Fixed modal position");
} else {
    console.log("Could not find use client");
}