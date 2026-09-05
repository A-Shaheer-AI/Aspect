const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// Add Camera to imports
content = content.replace('Building2, X, Tag, ChevronLeft, ChevronRight } from "lucide-react";', 'Building2, X, Tag, ChevronLeft, ChevronRight, Camera } from "lucide-react";');

// The new section HTML
const newSection = `
            {/* REAL ESTATE / PRE-SALE SNIPPET */}
            <section className="py-16 px-5 bg-brand-navy text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-action-gold opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="shrink-0 bg-white/10 p-5 rounded-2xl border border-white/20 shadow-lg hidden md:block">
                        <Camera className="w-12 h-12 text-action-gold" />
                    </div>
                    <div className="text-center md:text-left">
                        <div className="md:hidden flex justify-center mb-4">
                            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                                <Camera className="w-10 h-10 text-action-gold" />
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Pre-Sale & Real Estate Photography Cleaning</h2>
                        <p className="text-brand-water leading-relaxed mb-4 text-lg">
                            Getting ready to list your property on the market? First impressions are everything. We offer specialized pre-sale and pre-photography cleaning packages designed to maximize your home's curb appeal.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Unlike standard exterior washes, our pre-sale team performs an in-depth, top-to-bottom clean. We detail the inside and outside of the glass, scrub the tracks, wash the flyscreens, and clear out all cobwebs. Let us help you get your property picture-perfect and ready for home opens.
                        </p>
                    </div>
                </div>
            </section>
`;

// Find where to insert it: exactly before {/* COMPARISON / DON'T BE LIKE THESE PEOPLE */}
const splitPoint = content.indexOf('{/* COMPARISON / DON\'T BE LIKE THESE PEOPLE */}');
if (splitPoint === -1) {
    console.error("Could not find the split point.");
    process.exit(1);
}

content = content.substring(0, splitPoint) + newSection + '\n            ' + content.substring(splitPoint);

fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
console.log("Successfully inserted Pre-Sale Snippet");