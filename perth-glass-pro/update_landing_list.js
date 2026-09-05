const fs = require('fs');

const file = 'app/landing/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex2 = /<li className="flex items-start gap-4">\s*<Shield className="w-8 h-8 text-action-gold shrink-0 mt-1" \/>\s*<span className="text-lg">Fully insured and professionally trained team<\/span>\s*<\/li>/g;
const replace2 = `<li className="flex items-start gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => openCertificateModal('insured')} title="View Insurance Certificate">\n<Shield className="w-8 h-8 text-action-gold shrink-0 mt-1" />\n<span className="text-lg">Fully insured and professionally trained team <span className="text-action-gold text-sm font-bold block mt-1">View Certificate &rarr;</span></span>\n</li>`;

content = content.replace(regex2, replace2);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated landing page trust list item");