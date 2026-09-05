$content = Get-Content -LiteralPath "app/landing/page.tsx" -Raw

# 1. Replace the Reviews Array
$newReviews = @"
    const windowCleaningReviews = [
        {
            id: 1,
            name: "Peter & Jill Robinson",
            reviews: "1 review",
            rating: 5,
            date: "2 weeks ago",
            content: "Fazal and his team did a great job on our windows, initially keeping us informed as to arrival time, then cleaning high 2 story windows and some hard to get to windows. Very professional and friendly unit, would recommend them to anybody looking for a window cleaner."
        },
        {
            id: 2,
            name: "Chantal Parsons",
            reviews: "8 reviews",
            rating: 5,
            date: "3 weeks ago",
            content: "Brilliant work by this team. We were more than impressed and will continue to use them yearly for our new house. We used them for the sale of our house and it changes the whole look of your home when your windows are cleaned professionally. They also removed all marks, paint and tape that were super hard to get off - highly recommend this great team of cleaners!"
        },
        {
            id: 3,
            name: "J Buchanan",
            reviews: "5 reviews",
            rating: 5,
            date: "19 weeks ago",
            content: "Aspect cleaned out gutters very professionally and swiftly engaged the task. Job was well done and all parts agreed to were completed exactly as denoted. Highly recommended."
        },
        {
            id: 4,
            name: "Diane Bayliss",
            reviews: "5 reviews",
            rating: 5,
            date: "17 weeks ago",
            content: "Aspect Window Cleaning did a great job of cleaning out Solar Panels. After showing me photos of the state of the gutters I agreed to them being cleaned and they promptly carried out that cleaning also."
        },
        {
            id: 5,
            name: "Vicki Slate",
            reviews: "5 reviews",
            rating: 5,
            date: "22 weeks ago",
            content: "These guys did a fantastic job cleaning windows, jams, runners, pressure washing eaves, decks and side walks, removing mould from brickwork., that hadn't been done in probably 10 years. We thought the new owners would need to replace the windows so potentially this added `$20,000 value to the house. On time, friendly and professional. Highly recommend them."
        }
    ];
"@
$content = [regex]::Replace($content, '(?s)const windowCleaningReviews = \[.*?\];', $newReviews)

# 2. Add FreeTrialForm component
$freeTrialFormCode = @"
function FreeTrialForm() {
    const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.address) return;
        try {
            await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                email: "No Email Provided (Free Trial)",
                suburb: formData.address,
                service: "FREE TRIAL - 2 Windows",
                message: "User requested the 2-window free trial.",
            });
            setSubmitted(true);
            trackFormCompleted();
        } catch (error) {
            console.error(error);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="font-bold text-brand-navy">Request Received!</p>
                <p className="text-sm text-gray-500 mt-2">We'll text you shortly to arrange your free trial.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white border border-gray-200 text-gray-900 focus:border-brand-navy" />
            <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white border border-gray-200 text-gray-900 focus:border-brand-navy" />
            <input type="text" placeholder="Full Property Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white border border-gray-200 text-gray-900 focus:border-brand-navy" />
            <button onClick={handleSubmit} className="w-full bg-brand-navy text-white font-bold rounded-xl py-3.5 text-sm mt-2 hover:shadow-lg transition-all cursor-pointer">Claim 2 Free Windows</button>
        </div>
    );
}

export default function LandingPage
"@
$content = $content.Replace('export default function LandingPage', $freeTrialFormCode)

# 3. Replace Pricing snippet CTA
$content = $content.Replace('<Link href="/pricing" className="text-action-gold bg-brand-navy px-8 py-4 rounded-full font-bold hover:shadow-lg inline-block transition-shadow">See All Pricing & Packages</Link>', '<button onClick={() => { const form = document.getElementById("quote-form"); if(form) form.scrollIntoView({behavior: "smooth"}); else window.scrollTo(0,0); }} className="text-action-gold bg-brand-navy px-8 py-4 rounded-full font-bold hover:shadow-lg inline-block transition-shadow cursor-pointer">Contact us for full pricing and exact quote</button>')

# 4. Insert section IDs to Pricing, Comparison, Reviews
$content = $content.Replace('<section className="py-16 bg-white px-5 border-y border-gray-100">', '<section id="pricing" className="py-16 bg-white px-5 border-y border-gray-100">')
$content = $content.Replace('<section className="py-20 px-5 bg-gray-50 border-b border-gray-200">', '<section id="guarantee" className="py-20 px-5 bg-gray-50 border-b border-gray-200">')
$content = $content.Replace('<section className="max-w-7xl mx-auto px-5 py-16 bg-white">', '<section id="reviews" className="max-w-7xl mx-auto px-5 py-16 bg-white">')


# 5. Insert New Sections before section 4 (Trusted By)
$newSectionsHTML = @"
            {/* PROMOS */}
            <section id="promotions" className="py-16 px-5 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Current Promotions & Bundles</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Take advantage of our seasonal offers to keep your entire property sparkling from top to bottom.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl shadow-sm text-center">
                            <Tag className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-brand-navy mb-2">Bundle & Save 10%</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Group multiple services together—like window cleaning, gutter cleaning, solar panel washing, or pressure washing—and get a flat 10% off your entire package.</p>
                            <p className="text-xs text-gray-400 font-bold uppercase">No minimum value</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-2xl shadow-sm text-center transform md:-translate-y-4 mt-4 md:mt-0">
                            <div className="bg-action-gold text-brand-navy font-bold text-xs px-3 py-1 rounded-full w-max mx-auto mb-4 tracking-wider uppercase">Most Popular</div>
                            <h3 className="font-bold text-xl text-brand-navy mb-2">Refer a Friend: `$50 Off</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Love our service? Refer a neighbour or friend and get `$30-`$50 off your next clean when they book with us.</p>
                            <p className="text-xs text-gray-400 font-bold uppercase">Min. order value `$250</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm text-center">
                            <Droplets className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-brand-navy mb-2">`$50 Off Flyscreen Detail</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Add comprehensive flyscreen deep cleaning to any standard or supreme window cleaning package and save `$50 instantly.</p>
                            <p className="text-xs text-gray-400 font-bold uppercase">Min. order value `$300</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNOLOGY & SAFETY */}
            <section id="technology" className="py-20 px-5 bg-brand-navy text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <Zap className="w-12 h-12 text-action-gold mx-auto mb-6" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Advanced Carbon Fibre & Pure Water Technology</h2>
                    <div className="text-brand-water text-lg md:text-xl leading-relaxed space-y-6">
                        <p>We use advanced <strong>Carbon Fibre Poles</strong> for safe, ladder-free cleaning up to three storeys high (wherever accessible). This ensures zero risk of damage to your property's exterior, garden beds, or roof tiles while guaranteeing a perfect finish on high-reach and difficult-access windows.</p>
                        <p>Combined with our <strong>100% Eco-Friendly Pure Water System</strong>, we deliver a clean that is completely pet-friendly and child-safe. By filtering out all heavy metals, minerals, and chemicals, the water evaporates perfectly clear, leaving your glass cleaner for much longer.</p>
                        <p>For your complete peace of mind, our entire team is fully police-cleared and backed by a comprehensive <strong>`$20,000,000 Public Liability Insurance</strong> policy. We respect your property and protect it at every step.</p>
                    </div>
                </div>
            </section>

            {/* FREE TRIAL */}
            <section id="free-trial" className="py-20 px-5 bg-gray-50">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-brand-navy mb-4">Still Not Convinced?</h2>
                        <h3 className="text-xl text-action-gold font-bold mb-4">Try Us For Free</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">We are so confident in the quality of our work and the power of our Pure Water systems that we want to prove it to you. Ask us to come over and clean <strong>2 windows absolutely free of charge</strong>.</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">See the level of service, experience our professionalism, and witness the difference it makes to your home before you spend a single cent. Just drop your address below!</p>
                        <p className="text-sm text-gray-400 italic">* Offer valid for accessible residential ground-floor windows. Subject to availability.</p>
                    </div>
                    <div className="w-full md:w-96 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h4 className="font-bold text-brand-navy mb-4 text-center">Request Your Free Trial</h4>
                        <FreeTrialForm />
                    </div>
                </div>
            </section>

            {/* COMMERCIAL SNIPPET */}
            <section id="commercial" className="py-12 px-5 bg-white border-y border-gray-100 text-center">
                <div className="max-w-3xl mx-auto">
                    <Building2 className="w-8 h-8 text-brand-slate mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-brand-navy mb-2">Looking for Commercial Services?</h3>
                    <p className="text-gray-600 mb-6">We provide specialized cleaning for storefronts, strata complexes, and multi-story office buildings across Perth.</p>
                    <Link href="/services/commercial-window-cleaning" className="text-brand-navy font-bold underline hover:text-action-gold transition-colors">Head to our Commercial Window Cleaning page &rarr;</Link>
                </div>
            </section>
"@
$content = $content -replace '(?s)(<section className="px-6 py-10 text-center" style=\{\{ background: "#f4f6ff" \}\}>\s*<p className="mb-8 text-xs font-semibold uppercase tracking-widest")', "$newSectionsHTML`r`n`r`n`t`t`$1"

# Need to make sure the hero form container has id="quote-form"
$content = $content.Replace('<div className="relative w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"', '<div id="quote-form" className="relative w-full max-w-sm rounded-2xl shadow-xl overflow-hidden"')

[System.IO.File]::WriteAllText("app\landing\page.tsx", $content)