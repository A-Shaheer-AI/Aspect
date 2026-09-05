const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

// 1. Inject States
const stateAnchor = 'const [submitted, setSubmitted] = useState(false);';
const newStates = `
    const [selectedPkg, setSelectedPkg] = useState<{name: string, price: string} | null>(null);
    const [pkgForm, setPkgForm] = useState({ name: "", phone: "", suburb: "" });
    const [isPkgSubmitting, setIsPkgSubmitting] = useState(false);
    const [pkgSubmitted, setPkgSubmitted] = useState(false);
    const [pkgError, setPkgError] = useState("");

    const handlePkgSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPkgSubmitting(true);
        setPkgError("");
        try {
            const res = await sendLeadEmail({
                name: pkgForm.name,
                phone: pkgForm.phone,
                suburb: pkgForm.suburb,
                serviceType: "Residential Window Cleaning",
                storeys: isDoubleStorey ? "Double Storey" : "Single Storey",
                selectedTier: selectedPkg?.name,
                quoteType: "Landing Page Package Selection",
                message: \`Selected Price: \${selectedPkg?.price}\`
            });
            if (res.error) throw new Error(res.error);
            
            trackFormCompleted();
            setPkgSubmitted(true);
            setPkgForm({ name: "", phone: "", suburb: "" });
        } catch (err) {
            setPkgError("Something went wrong. Please try again or call us.");
        } finally {
            setIsPkgSubmitting(false);
        }
    };
`;
content = content.replace(stateAnchor, stateAnchor + '\n' + newStates);

// 2. Rewrite Pricing Snippet
const pricingStart = content.indexOf('{/* PRICING SNIPPET */}');
const pricingEnd = content.indexOf('</section>', pricingStart) + 10;

const newPricing = `{/* PRICING SNIPPET */}
            <section id="pricing" className="py-16 bg-white px-5 border-y border-gray-100">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Clear, Transparent Pricing</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">We don't hide our rates. Select your home type below for our starting residential packages. Click a package to book now.</p>
                    
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
                        <button onClick={() => setSelectedPkg({name: "Essential", price: isDoubleStorey ? 'Starting From $279' : 'Starting From $159'})} className="p-6 border rounded-xl shadow-sm bg-gray-50 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-brand-navy text-left cursor-pointer group">
                            <div>
                                <h3 className="font-bold text-xl text-brand-navy mb-2 group-hover:text-action-gold transition-colors">Essential</h3>
                                <p className="text-gray-500 text-sm mb-4">External standard clean only</p>
                            </div>
                            <p className="text-3xl font-black text-brand-navy mb-4 transition-all duration-300">{isDoubleStorey ? 'Starting From $279' : 'Starting From $159'}</p>
                            <div className="text-center w-full py-2 bg-gray-200 rounded-lg font-bold text-sm text-gray-700 group-hover:bg-brand-navy group-hover:text-white transition-colors">Select Package</div>
                        </button>

                        <button onClick={() => setSelectedPkg({name: "Standard", price: isDoubleStorey ? 'Starting From $499' : 'Starting From $279'})} className="p-6 border-2 border-action-gold rounded-xl shadow-md bg-brand-navy text-white relative transform md:-translate-y-4 mt-4 md:mt-0 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 text-left cursor-pointer group">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-gold text-brand-navy px-3 py-1 rounded-full text-xs font-bold tracking-wide w-max">MOST POPULAR</div>
                            <div>
                                <h3 className="font-bold text-xl mb-2 text-white group-hover:text-action-gold transition-colors">Standard</h3>
                                <p className="text-brand-water text-sm mb-4">Inside and out basic wash</p>
                            </div>
                            <p className="text-3xl font-black text-white mb-4 transition-all duration-300">{isDoubleStorey ? 'Starting From $499' : 'Starting From $279'}</p>
                            <div className="text-center w-full py-2 bg-action-gold rounded-lg font-bold text-sm text-brand-navy group-hover:bg-white transition-colors">Select Package</div>
                        </button>

                        <button onClick={() => setSelectedPkg({name: "Supreme", price: isDoubleStorey ? 'Starting From $859' : 'Starting From $479'})} className="p-6 border-2 rounded-xl bg-white relative flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 text-left cursor-pointer group" style={{ borderColor: "#ffd700", boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}>
                            <div>
                                <h3 className="font-bold text-xl text-brand-navy mb-2 group-hover:text-action-gold transition-colors">Supreme</h3>
                                <p className="text-gray-500 text-sm mb-4">Inside and out detailing (stuck-on paint, hard water)</p>
                            </div>
                            <p className="text-3xl font-black text-brand-navy mb-4 transition-all duration-300">{isDoubleStorey ? 'Starting From $859' : 'Starting From $479'}</p>
                            <div className="text-center w-full py-2 bg-gray-100 rounded-lg font-bold text-sm text-brand-navy group-hover:bg-action-gold transition-colors" style={{ border: "1px solid #ffd700" }}>Select Package</div>
                        </button>
                    </div>
                </div>
            </section>`;

content = content.substring(0, pricingStart) + newPricing + content.substring(pricingEnd);

// 3. Inject Modal at the bottom
const modalMarkup = `
            {/* PACKAGE SELECTION MODAL */}
            {selectedPkg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative">
                        <button onClick={() => { setSelectedPkg(null); setPkgSubmitted(false); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 cursor-pointer">
                            <X className="w-6 h-6" />
                        </button>
                        
                        {pkgSubmitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-brand-navy mb-2">Thank you!</h3>
                                <p className="text-gray-600">We will reach out soon to confirm your {selectedPkg.name} package.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-2">Book Your Package</h3>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                    You have selected the <strong className="text-brand-navy">{selectedPkg.name}</strong> package for a <strong>{isDoubleStorey ? "Double Storey" : "Single Storey"}</strong> home ({selectedPkg.price}). Please provide your details to lock this in.
                                </p>
                                
                                <form onSubmit={handlePkgSubmit} className="space-y-4 text-left">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
                                        <input required type="text" value={pkgForm.name} onChange={(e) => setPkgForm({...pkgForm, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-gold focus:border-transparent" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                        <input required type="tel" value={pkgForm.phone} onChange={(e) => setPkgForm({...pkgForm, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-gold focus:border-transparent" placeholder="0400 000 000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Suburb</label>
                                        <input required type="text" value={pkgForm.suburb} onChange={(e) => setPkgForm({...pkgForm, suburb: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-gold focus:border-transparent" placeholder="e.g. Subiaco" />
                                    </div>
                                    {pkgError && <p className="text-red-500 text-sm font-semibold">{pkgError}</p>}
                                    <button disabled={isPkgSubmitting} type="submit" className="w-full bg-action-gold text-brand-navy font-bold py-4 rounded-xl hover:shadow-lg transition-all cursor-pointer">
                                        {isPkgSubmitting ? "Booking..." : "Book Now \u2794"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
`;

const returnMatch = content.lastIndexOf('</main>');
content = content.substring(0, returnMatch) + modalMarkup + '\n' + content.substring(returnMatch);

fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
console.log("Updated Pricing Boxes and Modal successfully");