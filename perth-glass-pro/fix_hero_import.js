const fs = require('fs');
const file = 'components/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('@/components/CertificateModalWrapper')) {
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { openCertificateModal } from "@/components/CertificateModalWrapper";');
    fs.writeFileSync(file, content, 'utf8');
}
console.log("Fixed Hero import");