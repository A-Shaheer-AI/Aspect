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

    // We will find `<ClickableBadge type="insured" ...` to the next `Badge 2`
    content = content.replace(/<ClickableBadge type="insured"([^>]*)>[\s\S]*?Fully protected<\/div>\s*<\/div>\s*<\/div>/g, 
`<ClickableBadge type="insured"$1>
    <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Shield className="w-5 h-5 text-action-gold" /></div>
    <div className="min-w-0">
        <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
            $20M Insured
        </div>
        <div className="text-xs text-brand-slate">Fully protected</div>
    </div>
</ClickableBadge>`);

    content = content.replace(/<ClickableBadge type="police"([^>]*)>[\s\S]*?Background checked<\/div>\s*<\/div>\s*<\/div>/g, 
`<ClickableBadge type="police"$1>
    <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><BadgeCheck className="w-5 h-5 text-action-gold" /></div>
    <div className="min-w-0">
        <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
            Police Cleared
        </div>
        <div className="text-xs text-brand-slate">Background checked</div>
    </div>
</ClickableBadge>`);

    content = content.replace(/<ClickableBadge className="([^"]+)">[\s\S]*?Fast service<\/div>\s*<\/div>\s*<\/div>/g, 
`<ClickableBadge className="$1">
    <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Clock className="w-5 h-5 text-action-gold" /></div>
    <div className="min-w-0">
        <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
            Same-Week Bookings
        </div>
        <div className="text-xs text-brand-slate">Fast service</div>
    </div>
</ClickableBadge>`);

    content = content.replace(/<ClickableBadge className="([^"]+)">[\s\S]*?Happy customers<\/div>\s*<\/div>\s*<\/div>/g, 
`<ClickableBadge className="$1">
    <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Star className="w-5 h-5 text-action-gold fill-action-gold" /></div>
    <div className="min-w-0">
        <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
            5.0 Google Reviews
        </div>
        <div className="text-xs text-brand-slate">Happy customers</div>
    </div>
</ClickableBadge>`);

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed ClickableBadge blocks entirely");