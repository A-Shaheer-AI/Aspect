const fs = require('fs');
const file = 'app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('CertificateModalWrapper')) {
    content = content.replace(
        'import StickyInterface from "@/components/ui/StickyInterface";',
        `import StickyInterface from "@/components/ui/StickyInterface";\nimport CertificateModalWrapper from "@/components/CertificateModalWrapper";`
    );
    content = content.replace(
        '<StickyInterface />',
        `<StickyInterface />\n                    <CertificateModalWrapper />`
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log("Added CertificateModalWrapper to layout");
}