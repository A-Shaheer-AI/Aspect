const fs = require('fs');

function fixSlider(file) {
    let content = fs.readFileSync(file, 'utf8');
    // replace the broken mojibake with a clean SVG
    content = content.replace(/<span className="text-brand-navy text-xs font-bold">[^<]*<\/span>/, 
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy w-5 h-5"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>'
    );
    fs.writeFileSync(file, content, 'utf8');
}

fixSlider('components/BeforeAfterSlider.tsx');
fixSlider('components/BeforeAfterSection.tsx');
console.log("Fixed slider arrows");