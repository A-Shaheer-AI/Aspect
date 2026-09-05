const fs = require('fs');

const targetDirs = [
    'app/services/commercial-window-cleaning/page.tsx',
    'app/services/residential-window-cleaning/page.tsx',
    'app/services/pressure-washing/page.tsx',
    'app/services/solar-panel-washing/page.tsx',
    'app/services/gutter-cleaning/page.tsx'
];

targetDirs.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add import if missing
    if (!content.includes('ClickableBadge')) {
        content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport ClickableBadge from "@/components/ClickableBadge";');
    }

    // Replace Badge 1
    // From: <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
    // To: <ClickableBadge type="insured" className="...">
    // Note: Have to match the closing </div> of Badge 1 and Badge 2. 
    // Since there are 4 badges, it's safer to just replace the opening tags and manually replace the closing tags.
    // Wait, regex might be tricky if we just replace the opening tags because of nested divs.
    
    // Let's do string replacement for the exact opening tags.
    const openingTag = '<div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">';
    
    // We can do this: 
    const badge1Regex = /\{\/\* Badge 1 \*\/\}\s*<div (className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">)/g;
    content = content.replace(badge1Regex, '{/* Badge 1 */}\n<ClickableBadge type="insured" $1');

    const badge2Regex = /\{\/\* Badge 2 \*\/\}\s*<div (className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">)/g;
    content = content.replace(badge2Regex, '{/* Badge 2 */}\n<ClickableBadge type="police" $1');

    const badge3Regex = /\{\/\* Badge 3 \*\/\}\s*<div (className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">)/g;
    content = content.replace(badge3Regex, '{/* Badge 3 */}\n<ClickableBadge $1');

    const badge4Regex = /\{\/\* Badge 4 \*\/\}\s*<div (className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">)/g;
    content = content.replace(badge4Regex, '{/* Badge 4 */}\n<ClickableBadge $1');

    // Replace the specific closing tags for these badges.
    // Right now, each badge ends with:
    //      </div>
    //      <div className="text-xs text-brand-slate">...</div>
    //   </div>
    // </div>
    // Wait, let's look at the structure exactly:
    // <div className="...">
    //   <div className="w-9 h-9..."><Icon /></div>
    //   <div className="min-w-0">
    //      <div className="font-semibold...
    //      </div>
    //      <div className="text-xs...
    //      </div>
    //   </div>
    // </div>
    //
    // So the badge closing tag is just `</div>`. And it is followed by `{/* Badge 2 */}` or `</div>\n </div>\n </section>`.
    // Let's just use `ClickableBadge` for all 4, and replace `</div>` with `</ClickableBadge>` before `{/* Badge 2 */}` etc.
    
    // Instead of regex, I'll do a simple split and replace logic.
    let parts = content.split('className="text-xs text-brand-slate">Fully protected</div>\n                              </div>\n                          </div>');
    if (parts.length > 1) content = parts.join('className="text-xs text-brand-slate">Fully protected</div>\n                              </div>\n                          </ClickableBadge>');

    parts = content.split('className="text-xs text-brand-slate">Background checked</div>\n                              </div>\n                          </div>');
    if (parts.length > 1) content = parts.join('className="text-xs text-brand-slate">Background checked</div>\n                              </div>\n                          </ClickableBadge>');

    parts = content.split('className="text-xs text-brand-slate">Reliable service</div>\n                              </div>\n                          </div>');
    if (parts.length > 1) content = parts.join('className="text-xs text-brand-slate">Reliable service</div>\n                              </div>\n                          </ClickableBadge>');

    parts = content.split('className="text-xs text-brand-slate">Trusted locally</div>\n                              </div>\n                          </div>');
    if (parts.length > 1) content = parts.join('className="text-xs text-brand-slate">Trusted locally</div>\n                              </div>\n                          </ClickableBadge>');

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Updated service pages to use ClickableBadge");