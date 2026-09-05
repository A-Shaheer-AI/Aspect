const fs = require('fs');

const targetDirs = [
    'app/services/commercial-window-cleaning/page.tsx',
    'app/services/residential-window-cleaning/page.tsx',
    'app/services/pressure-washing/page.tsx',
    'app/services/solar-panel-washing/page.tsx',
    'app/services/gutter-cleaning/page.tsx'
];

const openDiv = '<div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">';

targetDirs.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('ClickableBadge')) {
        content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport ClickableBadge from "@/components/ClickableBadge";');
    }

    // We will find `{/* Badge 1 */}` and replace the immediate `openDiv` and the final `</div>` before `{/* Badge 2 */}`
    content = content.replace(
        /\{\/\* Badge 1 \*\/\}\s*<div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">([\s\S]*?)<\/div>\s*\{\/\* Badge 2 \*\/\}/g,
        `{/* Badge 1 */}\n<ClickableBadge type="insured" className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">$1</ClickableBadge>\n                        {/* Badge 2 */}`
    );

    content = content.replace(
        /\{\/\* Badge 2 \*\/\}\s*<div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">([\s\S]*?)<\/div>\s*\{\/\* Badge 3 \*\/\}/g,
        `{/* Badge 2 */}\n<ClickableBadge type="police" className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">$1</ClickableBadge>\n                        {/* Badge 3 */}`
    );

    content = content.replace(
        /\{\/\* Badge 3 \*\/\}\s*<div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">([\s\S]*?)<\/div>\s*\{\/\* Badge 4 \*\/\}/g,
        `{/* Badge 3 */}\n<ClickableBadge className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">$1</ClickableBadge>\n                        {/* Badge 4 */}`
    );

    content = content.replace(
        /\{\/\* Badge 4 \*\/\}\s*<div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold\/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/g,
        `{/* Badge 4 */}\n<ClickableBadge className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">$1</ClickableBadge>\n                    </div>\n                </div>\n            </section>`
    );

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Updated trust badges with absolute precision");