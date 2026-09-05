const fs = require('fs');
const file = 'components/Footer.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure import is there
if (!content.includes('openCertificateModal')) {
    content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { openCertificateModal } from "@/components/CertificateModalWrapper";');
}

const pRegex = /<p className="text-xs text-gray-400">Fully insured[^<]+Police cleared[^<]+ABN Registered<\/p>/g;
content = content.replace(pRegex, `<p className="text-xs text-gray-400">
    <button onClick={() => openCertificateModal('insured')} className="hover:text-white transition-colors underline decoration-dashed underline-offset-2">Fully insured</button> &bull; 
    <button onClick={() => openCertificateModal('police')} className="hover:text-white transition-colors underline decoration-dashed underline-offset-2">Police cleared</button> &bull; 
    ABN Registered
</p>`);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated Footer");