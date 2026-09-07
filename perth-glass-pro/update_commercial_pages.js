const fs = require('fs');

// 1. Update app/services/commercial-window-cleaning/page.tsx
const sFile = 'app/services/commercial-window-cleaning/page.tsx';
let sContent = fs.readFileSync(sFile, 'utf8');

// Replace the villa image with the new EWP image
sContent = sContent.replace(
    'https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960135/outside-villa-window-cleaning_yijb3b.jpg',
    'https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960129/commercial-sign-cleaning_jzafjr.jpg'
);
sContent = sContent.replace('alt="Commercial cleaning in Perth"', 'alt="Commercial EWP Cherry Picker Window Cleaning in Perth"');

fs.writeFileSync(sFile, sContent, 'utf8');

// 2. Update app/commercial/page.tsx
const cFile = 'app/commercial/page.tsx';
let cContent = fs.readFileSync(cFile, 'utf8');

cContent = cContent.replace(
    'href="/services/commercial-cleaning"',
    'href="/services/commercial-window-cleaning"'
);

// We should also make the $20M Public liability clickable there just in case
if (!cContent.includes('openCertificateModal')) {
    cContent = cContent.replace('import { ArrowRight', 'import { openCertificateModal } from "@/components/CertificateModalWrapper";\nimport { ArrowRight');
    cContent = cContent.replace(
        '<div className="flex items-center gap-3 text-brand-slate">\n                        <Shield className="w-8 h-8 text-action-gold" />\n                        <span className="font-medium">$20M Public Liability</span>\n                    </div>',
        '<button onClick={() => openCertificateModal(\'insured\')} className="flex items-center gap-3 text-brand-slate hover:text-brand-navy cursor-pointer transition-colors">\n                        <Shield className="w-8 h-8 text-action-gold" />\n                        <span className="font-medium underline decoration-dashed underline-offset-4">$20M Public Liability</span>\n                    </button>'
    );
}

// Add the EWP image section before the Features section
if (!cContent.includes('commercial-sign-cleaning_jzafjr.jpg')) {
    // Requires Image to be imported. Next Image is imported? 
    // Yes: import Image from "next/image"; might be needed
    if (!cContent.includes('import Image from "next/image";')) {
        cContent = cContent.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";');
    }

    const imageSection = `
            {/* EWP IMAGE SECTION */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960129/commercial-sign-cleaning_jzafjr.jpg"
                            alt="Commercial Window Cleaning with EWP Cherry Picker"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 896px"
                        />
                    </div>
                </div>
            </section>
`;
    cContent = cContent.replace('            {/* Features */}', imageSection + '\n            {/* Features */}');
}

fs.writeFileSync(cFile, cContent, 'utf8');

console.log("Updated both commercial pages with the EWP image");