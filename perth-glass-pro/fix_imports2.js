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
    
    // Just force inject the exact imports we need right at the top
    const forceImport = 'import { Shield, BadgeCheck, Clock, Star as LucideStar, CheckCircle } from "lucide-react";\n';
    
    // Remove them from any existing lucide-react imports to avoid dupes?
    // Let's just blindly add it at the top and rely on TypeScript?
    // Actually, duplicate imports are fine in ES6, but TS might complain if a name is imported twice.
    // Let's do it safely:
    
    let importsMatch = content.match(/import\s+{([^}]+)}\s+from\s+"lucide-react";/g);
    if (importsMatch && importsMatch.length > 0) {
        // Just append to the first one
        let firstMatch = importsMatch[0];
        let newImport = firstMatch.replace('}', ', Shield, BadgeCheck, Clock, CheckCircle }');
        content = content.replace(firstMatch, newImport);
    }

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed lucide-react imports properly");