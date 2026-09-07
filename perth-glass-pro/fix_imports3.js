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
    
    // Find all lucide-react imports
    let importsMatch = content.match(/import\s+{([^}]+)}\s+from\s+"lucide-react";/g);
    if (importsMatch) {
        let allNamedImports = new Set();
        
        importsMatch.forEach(match => {
            let names = match.match(/{([^}]+)}/)[1];
            names.split(',').forEach(name => {
                let cleanName = name.trim();
                if (cleanName) {
                    allNamedImports.add(cleanName);
                }
            });
            // Remove the import line completely
            content = content.replace(match, '');
        });
        
        // Add our required ones
        ['Shield', 'BadgeCheck', 'Clock', 'Star', 'CheckCircle', 'CheckCircle2'].forEach(n => allNamedImports.add(n));
        
        // Build one single clean import
        let newImport = `import { ${Array.from(allNamedImports).join(', ')} } from "lucide-react";\n`;
        
        // Insert it after 'import Link from "next/link";'
        content = content.replace(/import Link from "next\/link";/g, 'import Link from "next/link";\n' + newImport);
    }

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Cleaned up all lucide-react imports");