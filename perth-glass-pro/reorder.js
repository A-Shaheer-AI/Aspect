const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// 1. Fix Mojibake
content = content.replace(/âž”/g, '➔');
content = content.replace(/ÃƒÆ’[^<]*/g, '');

// Fix pricing text
content = content.replace(/From \$159/g, 'Standard Homes Starting From $159');
content = content.replace(/From \$279/g, 'Standard Homes Starting From $279');
content = content.replace(/From \$479/g, 'Standard Homes Starting From $479');

// Replace the Technology & Safety section completely to merge the Bento Box.
const newTechSection = `
            {/* TECHNOLOGY & WHY US */}
            <section id="technology" className="py-20 px-5 bg-brand-navy text-white text-center">
                <div className="max-w-5xl mx-auto">
                    <Zap className="w-12 h-12 text-action-gold mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Aspect? The Technology Behind the Clean</h2>
                    <div className="text-brand-water text-lg leading-relaxed max-w-3xl mx-auto mb-12">
                        <p>We don't just use a squeegee and soapy water. We use advanced <strong>Carbon Fibre Poles</strong> and a <strong>Commercial RO/DI Pure Water System</strong>. Why does this matter? Because filtering out all minerals and chemicals means the water evaporates perfectly clear, leaving your windows streak-free and cleaner for much longer. It's safer, faster, and delivers a superior result.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
                            <Shield className="w-8 h-8 text-action-gold mb-4" />
                            <h3 className="font-bold text-xl mb-2 text-white">Fully Insured & Checked</h3>
                            <p className="text-sm text-brand-water">Our entire team is police-cleared and backed by $20,000,000 Public Liability Insurance for your complete peace of mind.</p>
                        </div>
                        <div className="bg-action-gold border border-yellow-400 p-6 rounded-2xl text-brand-navy transform md:-translate-y-4">
                            <CheckCircle2 className="w-8 h-8 text-brand-navy mb-4" />
                            <h3 className="font-bold text-xl mb-2">100% Satisfaction</h3>
                            <p className="text-sm">We guarantee our work. If anything falls short, we return and fix it at no extra cost. No questions asked.</p>
                        </div>
                        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl">
                            <Zap className="w-8 h-8 text-action-gold mb-4" />
                            <h3 className="font-bold text-xl mb-2 text-white">Urgent & Flexible</h3>
                            <p className="text-sm text-brand-water">Next-day emergency cleans are available. Whether it's an end-of-lease or a rental inspection, we've got you covered.</p>
                        </div>
                    </div>
                </div>
            </section>
`;

// To reorder, let's extract sections. We will use a function to pull out strings between markers.
function extractSection(startMarker, endMarker) {
    let start = content.indexOf(startMarker);
    if (start === -1) return '';
    let end = endMarker ? content.indexOf(endMarker, start) : content.length;
    if (end === -1) end = content.length;
    
    let extracted = content.substring(start, end);
    content = content.substring(0, start) + content.substring(end);
    return extracted;
}

// Markers (exact strings from file)
const MARKERS = {
    heroStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 1: HERO  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    statsStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 2: STATS STRIP  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    reviewsOldStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 3: REVIEWS  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    pricingStart: '{/* PRICING SNIPPET */}',
    comparisonStart: "{/* COMPARISON / DON'T BE LIKE THESE PEOPLE */}",
    reviewsStart: '<section id="reviews"',
    trustedStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 4: TRUSTED BY  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    promosStart: '{/* PROMOS */}',
    techStart: '{/* TECHNOLOGY & SAFETY */}',
    freeTrialStart: '{/* FREE TRIAL */}',
    commercialStart: '<section id="commercial"',
    bentoStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 5: BENTO WHY US  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    beforeAfterStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 6: BEFORE / AFTER  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    includedStart: "{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 6.5: WHAT'S INCLUDED  ðŸ”¹ðŸ”¹ðŸ”¹ */}",
    howItWorksStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 7: HOW IT WORKS  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    footerStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ SECTION 9: FOOTER CTA  ðŸ”¹ðŸ”¹ðŸ”¹ */}',
    stickyStart: '{/* ðŸ”¹ðŸ”¹ðŸ”¹ STICKY BAR ðŸ”¹ðŸ”¹ðŸ”¹ */}',
};

// We will extract in reverse order of how they appear to avoid index shifting problems, 
// OR just extract everything out of the `return (<> ... </>)` block.

let returnStart = content.indexOf('return (');
let returnEnd = content.lastIndexOf(');');
let beforeReturn = content.substring(0, returnStart);
let afterReturn = content.substring(returnEnd);
let jsxContent = content.substring(returnStart, returnEnd);

// Replace content with jsxContent to use the extractor
content = jsxContent;

let footer = extractSection(MARKERS.footerStart, MARKERS.stickyStart);
let sticky = extractSection(MARKERS.stickyStart, null); // goes to end of jsxContent
let howItWorks = extractSection(MARKERS.howItWorksStart, MARKERS.footerStart);
let included = extractSection(MARKERS.includedStart, MARKERS.howItWorksStart);
let beforeAfter = extractSection(MARKERS.beforeAfterStart, MARKERS.includedStart);
let bento = extractSection(MARKERS.bentoStart, MARKERS.beforeAfterStart);
let commercial = extractSection(MARKERS.commercialStart, MARKERS.bentoStart);
let freeTrial = extractSection(MARKERS.freeTrialStart, MARKERS.commercialStart);
let tech = extractSection(MARKERS.techStart, MARKERS.freeTrialStart);
let promos = extractSection(MARKERS.promosStart, MARKERS.techStart);
let trusted = extractSection(MARKERS.trustedStart, MARKERS.promosStart);
let reviews = extractSection(MARKERS.reviewsStart, MARKERS.trustedStart);
let comparison = extractSection(MARKERS.comparisonStart, MARKERS.reviewsStart);
let pricing = extractSection(MARKERS.pricingStart, MARKERS.comparisonStart);
let reviewsOld = extractSection(MARKERS.reviewsOldStart, MARKERS.pricingStart);
let stats = extractSection(MARKERS.statsStart, MARKERS.reviewsOldStart);
let hero = extractSection(MARKERS.heroStart, MARKERS.statsStart);

let prefix = content; // Whatever is left before the first section (modal, etc.)

// Desired Order:
// 1. Hero
// 2. Stats
// 3. Trusted By
// 4. Before & After
// 5. What's Included
// 6. Pricing
// 7. Comparison (Us vs Them)
// 8. Technology (New merged)
// 9. How It Works (optional, maybe keep it here)
// 10. Reviews (reviewsOld + reviews)
// 11. Promos
// 12. Free Trial
// 13. Commercial
// 14. Footer

let reassembled = 
    prefix + '\n' +
    hero + '\n' +
    stats + '\n' +
    trusted + '\n' +
    beforeAfter + '\n' +
    included + '\n' +
    pricing + '\n' +
    comparison + '\n' +
    newTechSection + '\n' +
    howItWorks + '\n' +
    reviewsOld + '\n' + reviews + '\n' +
    promos + '\n' +
    freeTrial + '\n' +
    commercial + '\n' +
    footer + '\n' +
    sticky;

// Put it all back together
let finalFile = beforeReturn + reassembled + afterReturn;
fs.writeFileSync('app/landing/page.tsx', finalFile, 'utf8');
console.log('Done reordering');