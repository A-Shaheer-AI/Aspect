const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// 1. Fix Mojibake
content = content.replace(/ðŸ”’/g, '🔒');
content = content.replace(/ðŸ\x8F…/g, '🏅');
content = content.replace(/ðŸ’§/g, '💧');
content = content.replace(/ðŸ”¹/g, '🔹');

// 2. Add state variable
if (!content.includes('const [isDoubleStorey')) {
    content = content.replace('const [modalOpen, setModalOpen] = useState(false);', 
                              'const [modalOpen, setModalOpen] = useState(false);\n    const [isDoubleStorey, setIsDoubleStorey] = useState(false);');
}

// 3. Update Pricing Section
const oldPricing = `{/* PRICING SNIPPET */}
            <section id="pricing" className="py-16 bg-white px-5 border-y border-gray-100">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Clear, Transparent Pricing</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">We don't hide our rates. Here is our starting pricing for residential window cleaning packages. No hidden fees, just guaranteed results.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
                            <h3 className="font-bold text-xl text-brand-navy mb-2">Essential</h3>
                            <p className="text-gray-500 text-sm mb-4">External standard clean only</p>
                            <p className="text-3xl font-black text-brand-navy mb-4">Standard Homes Starting From $159</p>
                        </div>
                        <div className="p-6 border-2 border-action-gold rounded-xl shadow-md bg-brand-navy text-white relative transform md:-translate-y-4 mt-4 md:mt-0">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-gold text-brand-navy px-3 py-1 rounded-full text-xs font-bold tracking-wide w-max">MOST POPULAR</div>
                            <h3 className="font-bold text-xl mb-2 text-white">Standard</h3>
                            <p className="text-brand-water text-sm mb-4">Inside and out basic wash</p>
                            <p className="text-3xl font-black text-white mb-4">Standard Homes Starting From $279</p>
                        </div>
                        <div className="p-6 border rounded-xl shadow-sm bg-gray-50">
                            <h3 className="font-bold text-xl text-brand-navy mb-2">Supreme</h3>
                            <p className="text-gray-500 text-sm mb-4">Inside and out detailing (stuck-on paint, hard water)</p>
                            <p className="text-3xl font-black text-brand-navy mb-4">Standard Homes Starting From $479</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button onClick={() => { const form = document.getElementById("quote-form"); if(form) form.scrollIntoView({behavior: "smooth"}); else window.scrollTo(0,0); }} className="text-action-gold bg-brand-navy px-8 py-4 rounded-full font-bold hover:shadow-lg inline-block transition-shadow cursor-pointer">Contact us for full pricing and exact quote</button>
                    </div>
                </div>
            </section>`;

const newPricing = `{/* PRICING SNIPPET */}
            <section id="pricing" className="py-16 bg-white px-5 border-y border-gray-100">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Clear, Transparent Pricing</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">We don't hide our rates. Select your home type below for our starting residential packages. No hidden fees, just guaranteed results.</p>
                    
                    <div className="flex justify-center mb-10">
                        <div className="bg-gray-100 p-1 rounded-full flex gap-1">
                            <button 
                                onClick={() => setIsDoubleStorey(false)} 
                                className={"px-6 py-2 rounded-full font-bold text-sm transition-all " + (!isDoubleStorey ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-gray-700 cursor-pointer")}
                            >
                                Single Storey
                            </button>
                            <button 
                                onClick={() => setIsDoubleStorey(true)} 
                                className={"px-6 py-2 rounded-full font-bold text-sm transition-all " + (isDoubleStorey ? "bg-brand-navy text-white shadow-sm" : "text-gray-500 hover:text-gray-700 cursor-pointer")}
                            >
                                Double Storey
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 border rounded-xl shadow-sm bg-gray-50 flex flex-col justify-between transition-all duration-300">
                            <div>
                                <h3 className="font-bold text-xl text-brand-navy mb-2">Essential</h3>
                                <p className="text-gray-500 text-sm mb-4">External standard clean only</p>
                            </div>
                            <p className="text-3xl font-black text-brand-navy mb-4 transition-all duration-300">{isDoubleStorey ? 'Starting From $279' : 'Starting From $159'}</p>
                        </div>
                        <div className="p-6 border-2 border-action-gold rounded-xl shadow-md bg-brand-navy text-white relative transform md:-translate-y-4 mt-4 md:mt-0 flex flex-col justify-between transition-all duration-300">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-gold text-brand-navy px-3 py-1 rounded-full text-xs font-bold tracking-wide w-max">MOST POPULAR</div>
                            <div>
                                <h3 className="font-bold text-xl mb-2 text-white">Standard</h3>
                                <p className="text-brand-water text-sm mb-4">Inside and out basic wash</p>
                            </div>
                            <p className="text-3xl font-black text-white mb-4 transition-all duration-300">{isDoubleStorey ? 'Starting From $499' : 'Starting From $279'}</p>
                        </div>
                        <div className="p-6 border-2 rounded-xl bg-white relative flex flex-col justify-between transition-all duration-300" style={{ borderColor: "#ffd700", boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}>
                            <div>
                                <h3 className="font-bold text-xl text-brand-navy mb-2">Supreme</h3>
                                <p className="text-gray-500 text-sm mb-4">Inside and out detailing (stuck-on paint, hard water)</p>
                            </div>
                            <p className="text-3xl font-black text-brand-navy mb-4 transition-all duration-300">{isDoubleStorey ? 'Starting From $859' : 'Starting From $479'}</p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button onClick={() => { const form = document.getElementById("quote-form"); if(form) form.scrollIntoView({behavior: "smooth"}); else window.scrollTo(0,0); }} className="text-action-gold bg-brand-navy px-8 py-4 rounded-full font-bold hover:shadow-lg inline-block transition-shadow cursor-pointer">Contact us for full pricing and exact quote</button>
                    </div>
                </div>
            </section>`;

// Because spacing might be slightly off in `oldPricing`, we will extract using exact markers instead of simple string replacement.
const pricingStart = content.indexOf('{/* PRICING SNIPPET */}');
const pricingEnd = content.indexOf('</section>', pricingStart) + 10;
content = content.substring(0, pricingStart) + newPricing + content.substring(pricingEnd);

fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
console.log("Updated Pricing and Symbols successfully.");