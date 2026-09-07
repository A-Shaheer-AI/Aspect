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
    
    // Add lucide-react imports if missing
    ['Shield', 'BadgeCheck', 'Clock', 'Star', 'CheckCircle'].forEach(icon => {
        const regex = new RegExp(`\\b${icon}\\b`);
        if (!regex.test(content) && content.includes('lucide-react')) {
            content = content.replace('} from "lucide-react";', `, ${icon} } from "lucide-react";`);
        }
    });

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed lucide-react imports");