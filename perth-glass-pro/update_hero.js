const fs = require('fs');

const file = 'components/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('openCertificateModal')) {
    content = content.replace('import { Phone } from "lucide-react";', 'import { Phone } from "lucide-react";\nimport { openCertificateModal } from "@/components/CertificateModalWrapper";');
}

const insuredRegex = /<div className="flex items-center gap-2 text-white\/70 text-xs sm:text-sm">\s*<Shield className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" \/>\s*<span>\$20M Insured<\/span>\s*<\/div>/g;
content = content.replace(insuredRegex, `<button onClick={() => openCertificateModal('insured')} className="flex items-center gap-2 text-white/70 text-xs sm:text-sm hover:text-white transition-colors cursor-pointer">\n<Shield className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />\n<span className="border-b border-dashed border-white/30">$20M Insured</span>\n</button>`);

const policeRegex = /<div className="flex items-center gap-2 text-white\/70 text-xs sm:text-sm">\s*<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" \/>\s*<span>Police Cleared<\/span>\s*<\/div>/g;
content = content.replace(policeRegex, `<button onClick={() => openCertificateModal('police')} className="flex items-center gap-2 text-white/70 text-xs sm:text-sm hover:text-white transition-colors cursor-pointer">\n<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />\n<span className="border-b border-dashed border-white/30">Police Cleared</span>\n</button>`);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated Hero component trust badges");