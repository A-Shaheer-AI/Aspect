const fs = require('fs');

const file = 'app/landing/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import if not exists
if (!content.includes('openCertificateModal')) {
    content = content.replace('import { useState, useEffect, useRef } from "react";', 'import { useState, useEffect, useRef } from "react";\nimport { openCertificateModal } from "@/components/CertificateModalWrapper";');
}

// Fix the mapping logic for trust badges to make them clickable buttons if applicable
const oldMapBlock = `<span
                                    key={b.text}
                                    className="flex items-center justify-center gap-1 sm:gap-2 rounded-full px-1 sm:px-5 py-2.5 text-[11px] sm:text-sm md:text-base font-semibold text-center"
                                    style={{ background: "rgba(255,229,77,0.15)", border: "1px solid rgba(255,229,77,0.4)", color: YELLOW }}
                                >
                                    <span className="text-sm sm:text-lg">{b.icon}</span> <span className="whitespace-nowrap">{b.text}</span>
                                </span>`;
                                
const newMapBlock = `
                                (() => {
                                    const isInsured = b.text.includes("Insured");
                                    const isPolice = b.text.includes("Police");
                                    const Component = (isInsured || isPolice) ? "button" : "span";
                                    const clickHandler = isInsured ? () => openCertificateModal('insured') : (isPolice ? () => openCertificateModal('police') : undefined);
                                    
                                    return (
                                        <Component
                                            key={b.text}
                                            onClick={clickHandler}
                                            className={"flex items-center justify-center gap-1 sm:gap-2 rounded-full px-1 sm:px-5 py-2.5 text-[11px] sm:text-sm md:text-base font-semibold text-center " + ((isInsured || isPolice) ? "hover:scale-105 active:scale-95 transition-transform cursor-pointer hover:bg-yellow-400/20" : "")}
                                            style={{ background: "rgba(255,229,77,0.15)", border: "1px solid rgba(255,229,77,0.4)", color: YELLOW }}
                                        >
                                            <span className="text-sm sm:text-lg">{b.icon}</span> <span className="whitespace-nowrap">{b.text}</span>
                                        </Component>
                                    );
                                })()
`;

// wait, the actual code has indentation. Let's just use regex replacement carefully.
// Actually, it's safer to just replace everything between `.map((b) => (` and `))`
const oldMapRegex = /\.map\(\(b\) => \(\s*<span[\s\S]*?<\/span>\s*\)\)/g;
content = content.replace(oldMapRegex, `.map((b) => ${newMapBlock})`);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated landing page trust badges");