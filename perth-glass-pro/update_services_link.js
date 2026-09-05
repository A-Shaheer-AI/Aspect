const fs = require('fs');

const file = 'app/services/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the main div wrapper
content = content.replace(
    'className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-action-gold/30 transition-colors group"',
    'className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-action-gold/30 hover:shadow-xl transition-all cursor-pointer group"'
);

// We should replace the original Link tag with a span, because the whole card will be wrapped in a Link.
// Wait, wrapping a block-level element like div with a <Link> is completely valid HTML5 and Next.js!
// Let's just change the `<div key={service.id}` to `<Link href={service.link} key={service.id}`
// And change the bottom `<Link>` to a `<span>`.

// Actually, this is much simpler:
content = content.replace(
    /<div key={service\.id} className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-action-gold\/30 hover:shadow-xl transition-all cursor-pointer group">/g,
    '<Link href={service.link} key={service.id} className="relative block bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-action-gold/30 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">'
);

// If it hasn't been changed yet (it hasn't because I just changed the class above and it isn't saved):
content = content.replace(
    /<div key={service\.id} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-action-gold\/30 transition-colors group">/g,
    '<Link href={service.link} key={service.id} className="relative block bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-action-gold/30 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">'
);

// Change the closing tag of that block. The block ends with:
//                             <Link
//                                 href={service.link}
//                                 className="inline-flex items-center text-action-gold font-bold hover:gap-2 transition-all"
//                             >
//                                 Learn More <ArrowRight className="w-4 h-4 ml-1" />
//                             </Link>
//                         </div>

const targetEndBlock = `                            <Link
                                href={service.link}
                                className="inline-flex items-center text-action-gold font-bold hover:gap-2 transition-all"
                            >
                                Learn More <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>`;

const newEndBlock = `                            <span className="inline-flex items-center text-action-gold font-bold group-hover:gap-2 transition-all mt-auto">
                                Learn More <ArrowRight className="w-4 h-4 ml-1" />
                            </span>
                        </Link>`;

content = content.replace(targetEndBlock, newEndBlock);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated services index page card link");