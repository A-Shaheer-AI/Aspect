const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// Use robust regex to replace h3 to h2
content = content.replace(/<h3([^>]*>)\s*Ready for Spotless Windows\?\s*<\/h3>/g, '<h2$1\n                                Ready for Spotless Windows?\n                            </h2>');

// h3 to p for WHAT'S INCLUDED
content = content.replace(/<h3([^>]*>)\s*WHAT'S INCLUDED\s*<\/h3>/g, '<p$1\n                        WHAT\'S INCLUDED\n                    </p>');

content = content.replace(/<h3 className="text-xl md:text-2xl font-black/g, '<h2 className="text-xl md:text-2xl font-black');
content = content.replace(/Get a Fast Text Quote<\/h3>/g, 'Get a Fast Text Quote</h2>');
content = content.replace(/<h4([^>]*>)\s*\{item\.title\}\s*<\/h4>/g, '<h3$1{item.title}</h3>');
content = content.replace(/<h3 className="text-xl font-bold text-brand-navy mb-2">Looking for Commercial Services\?<\/h3>/g, '<h2 className="text-xl font-bold text-brand-navy mb-2">Looking for Commercial Services?</h2>');

// Color contrast fixes
content = content.replace(/color: "#aaa"/g, 'color: "#666"');
content = content.replace(/text-sm text-gray-400 italic/g, 'text-sm text-gray-500 italic');

fs.writeFileSync('app/landing/page.tsx', content, 'utf8');