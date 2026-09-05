const fs = require('fs');

const file = 'app/landing/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `                          <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
                            <Shield className="w-8 h-8 text-action-gold mb-4" />
                            <h3 className="font-bold text-xl mb-2 text-white">Fully Insured & Checked</h3>
                            <p className="text-sm text-brand-water">Our entire team is police-cleared and backed by $20,000,000 Public Liability Insurance for your complete peace of mind.</p>
                        </div>`;

const replaceStr = `                          <button onClick={() => openCertificateModal('insured')} className="text-left bg-white/10 border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all cursor-pointer">
                            <Shield className="w-8 h-8 text-action-gold mb-4" />
                            <h3 className="font-bold text-xl mb-2 text-white">Fully Insured & Checked</h3>
                            <p className="text-sm text-brand-water mb-3">Our entire team is police-cleared and backed by $20,000,000 Public Liability Insurance for your complete peace of mind.</p>
                            <span className="text-action-gold text-sm font-bold flex items-center gap-1 hover:underline">View Certificates &rarr;</span>
                        </button>`;

// The indentation in the file might be different. Let's do it via regex.
const regex = /<div className="bg-white\/10 border border-white\/20 p-6 rounded-2xl">\s*<Shield className="w-8 h-8 text-action-gold mb-4" \/>\s*<h3 className="font-bold text-xl mb-2 text-white">Fully Insured & Checked<\/h3>\s*<p className="text-sm text-brand-water">Our entire team is police-cleared and backed by \$20,000,000 Public Liability Insurance for your complete peace of mind\.<\/p>\s*<\/div>/g;

content = content.replace(regex, replaceStr);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated landing page trust card");