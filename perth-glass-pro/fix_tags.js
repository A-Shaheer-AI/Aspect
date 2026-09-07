const fs = require('fs');
const targetDirs = [
    'app/services/commercial-window-cleaning/page.tsx',
    'app/services/residential-window-cleaning/page.tsx',
    'app/services/pressure-washing/page.tsx',
    'app/services/solar-panel-washing/page.tsx',
    'app/services/gutter-cleaning/page.tsx'
];

targetDirs.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add the missing '>' to the start tags!
    content = content.replace(/<ClickableBadge type="insured" className="([^"]+)">?/g, '<ClickableBadge type="insured" className="$1">');
    content = content.replace(/<ClickableBadge type="police" className="([^"]+)">?/g, '<ClickableBadge type="police" className="$1">');
    content = content.replace(/<ClickableBadge className="([^"]+)">?/g, '<ClickableBadge className="$1">');
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed missing closing bracket");