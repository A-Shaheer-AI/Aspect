const fs = require('fs');

const file = 'app/landing/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the Link className and add style
const targetLink = `className="flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-sm transition-all hover:scale-105 sm:ml-auto"`;
const replacementLink = `className="flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-sm transition-all hover:scale-105 sm:ml-auto shiny-call-btn"`;

if (content.includes(targetLink)) {
    content = content.replace(targetLink, replacementLink);
    
    // Add the style block right after the closing </div> of STICKY BAR
    // Look for:
    //             </Link>
    //         </div>
    //         {/* spacer */}
    const insertionTarget = `                </Link>\n            </div>\n            {/* spacer */}`;
    
    const styleBlock = `
            <style dangerouslySetInnerHTML={{__html: \`
                @keyframes btn-shine {
                    0% { left: -100%; }
                    20% { left: 100%; }
                    100% { left: 100%; }
                }
                .shiny-call-btn {
                    position: relative;
                    overflow: hidden;
                }
                .shiny-call-btn::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
                    transform: skewX(-25deg);
                    animation: btn-shine 3s infinite;
                }
            \`}} />
`;
    
    content = content.replace(insertionTarget, `                </Link>\n            </div>\n${styleBlock}            {/* spacer */}`);
    
    fs.writeFileSync(file, content, 'utf8');
    console.log("Added shiny button animation");
} else {
    console.log("Target link not found.");
}
