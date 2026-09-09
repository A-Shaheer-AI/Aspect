import React from "react";
import Link from "next/link";
import { Info, Sparkles, Calculator, ArrowDown } from "lucide-react";
import { Suspense } from "react";
import ResidentialEstimator from "@/components/ResidentialEstimator";
import TrustGrid from "@/components/TrustGrid";
import ResultsAndReviews from "@/components/ResultsAndReviews";
import PricingPackages from "@/components/PricingPackages";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Window Cleaning Prices Perth | Aspect Window Cleaning" },
    description: "Transparent Perth window cleaning prices with zero hidden fees. Compare Basic Wash vs Detailing, view residential & commercial packages, or get an instant quote!",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/pricing" }
};

const pricingFaqs = [
    {
        question: "What is the difference between a Basic Wash and Detailing (Premium)?",
        answer: (
            <div className="space-y-4">
                <p>
                    We offer two distinct procedural levels of window cleaning so you get the exact finish your property requires without paying for unneeded labor:
                </p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-brand-navy block mb-1">1. Basic Wash (Essential & Standard Packages):</strong>
                    Our standard routine cleaning procedure using 100% purified deionised water, professional applicator wands, and precision squeegees. It is designed to lift and wash away general environmental dust, pollen, spider webs, road film, fingerprints, and everyday grime that accumulates over 2 to 6 months. It leaves glass 100% streak-free, crystal-clear, and spot-free for normal conditions, but is not designed to remove baked-on building debris or chemically bonded minerals.
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                    <strong className="text-brand-navy block mb-1">2. Detailing / Premium (Supreme Package):</strong>
                    Our advanced, restorative cleaning process required when glass has stubborn, bonded debris that will not budge with standard washing. This includes hard water mineral stains (especially from Perth bore water systems), calcification, paint overspray, plaster, cement render splatter, construction silicone, rust marks, and heavy sticker residue. Detailing requires specialized safety glass scrapers, grade-0000 ultra-fine bronze wool, and commercial acid descaling solutions. Because of the intensive manual labor, Detailing is priced starting at 40% higher than a Basic Wash. If only a few specific panes suffer from sprinkler mineral etching, we can quote a standard clean with detailing applied only to the affected panels.
                </div>
            </div>
        ),
        schemaAnswer: "Our Basic Wash (Essential and Standard packages) is our routine maintenance clean using 100% purified deionised water and squeegees to remove general environmental dust, road film, and everyday grime. Detailing (Supreme package) is our intensive restorative process for stubborn, bonded debris such as paint overspray, builder render, stickers, and hard water bore mineral etching, utilizing specialized scrapers, grade-0000 bronze wool, and acid descaling agents."
    },
    {
        question: "Do you offer per-panel and per-hour pricing as well?",
        answer: (
            <div className="space-y-3">
                <p>
                    Yes, we accommodate flexible pricing models depending on your project type and commercial requirements:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                    <li><strong>Per-Panel Pricing:</strong> Ideal for commercial shopfronts, solar panel arrays (from $1.80/panel for large solar farms, or package rates for residential roofs), glass pool fencing ($10–$15 per panel), or when you only require a few specific glass panes detailed following renovations or localized bore water damage.</li>
                    <li><strong>Hourly Rates:</strong> Primarily utilized for post-construction builders cleans, complex architectural properties with non-standard access, or commercial properties requiring ongoing janitorial porter services. Our hourly rates are quoted transparently with zero hidden surcharges.</li>
                    <li><strong>Fixed-Price Packages:</strong> For standard residential properties, our fixed packages (Single Storey from $159, Double Storey from $279) provide the best value with guaranteed pricing and zero surprise charges.</li>
                </ul>
            </div>
        ),
        schemaAnswer: "Yes, we offer per-panel pricing (for solar panels, glass pool fencing, shopfronts, or isolated pane restoration), per-hour pricing (for builders cleans and complex commercial porter jobs), and fixed-price packages for standard residential and commercial properties."
    },
    {
        question: "Do you offer separate after-hours or weekend commercial pricing?",
        answer: (
            <div className="space-y-3">
                <p>
                    We operate 24/7 commercial cleaning across Perth to service corporate offices, medical centres, retail showrooms, and hospitality venues that cannot accommodate cleaning personnel during regular trading hours.
                </p>
                <p>
                    For scheduled commercial contracts and pre-booked regular services, we deliver after-hours, early morning, and weekend cleaning at our <strong>standard commercial rates with zero after-hours penalty fees</strong>. For emergency one-off callouts or public holiday services, a modest after-hours rate is quoted and agreed upon prior to dispatch.
                </p>
            </div>
        ),
        schemaAnswer: "We operate 24/7 across Perth for commercial clients. Pre-scheduled after-hours, early morning, and weekend cleans are delivered at standard contracted rates with zero penalty fees. One-off emergency or public holiday callouts may incur a nominal after-hours fee that is quoted upfront."
    },
    {
        question: "Are there any hidden fees, travel costs, or callout charges across Perth?",
        answer: (
            <div className="space-y-2">
                <p>
                    <strong>None whatsoever.</strong> Aspect Window Cleaning operates with complete pricing transparency. We service all 370+ suburbs across the Greater Perth metropolitan region — from Joondalup and Alkimos in the north to Rockingham and Mandurah in the south, plus the Perth Hills — with <strong>zero travel charges or callout fees</strong> on all confirmed bookings.
                </p>
                <p>
                    Every quote covers pure water filtration, professional labor, height safety equipment, eco-friendly supplies, and $20M public liability insurance. The price you are quoted is the price on your invoice.
                </p>
            </div>
        ),
        schemaAnswer: "There are no hidden fees, travel charges, or callout fees anywhere across the 370+ suburbs in Greater Perth. All quotes include pure water filtration, labor, equipment, and $20M public liability insurance."
    },
    {
        question: "Can I bundle window cleaning with solar panels, gutters, or pressure washing for a discount?",
        answer: (
            <div className="space-y-3">
                <p>
                    Yes! We provide multi-service package discounts when you book two or more exterior cleaning services during the same visit:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                    <li><strong>Window Cleaning + Solar Panel Washing:</strong> Save 15% on solar washing when combined with a residential window package.</li>
                    <li><strong>Window Cleaning + Gutter Clearing:</strong> Complete seasonal roof and glass protection with 15% to 20% bundle savings.</li>
                    <li><strong>The Full Exterior Refresh:</strong> Windows + gutters + solar panels + driveway pressure washing bundled for maximum property value uplift.</li>
                </ul>
            </div>
        ),
        schemaAnswer: "Yes. Bundling window cleaning with solar panel washing, gutter cleaning, or driveway pressure washing on the same visit unlocks multi-service bundle savings of 15% to 20%."
    },
    {
        question: "How is pricing calculated for double-storey homes or difficult-to-reach windows?",
        answer: (
            <div className="space-y-2">
                <p>
                    Our double-storey pricing reflects the additional equipment and reach requirements needed for upper-level glass. However, because we utilize carbon-fibre water-fed telescopic poles operating with purified reverse osmosis water, we can clean up to 4 storeys safely from the ground.
                </p>
                <p>
                    This eliminates the need for expensive scaffolding or scissor lifts in most residential jobs, keeping our double-storey packages highly competitive (starting from $279 for Essential). For difficult-access interior glass (such as high stairwell voids), our technician performs an access check and quotes a fixed price before starting.
                </p>
            </div>
        ),
        schemaAnswer: "Double-storey pricing is kept affordable (from $279) because our carbon-fibre pure water reach poles allow us to clean up to 4 storeys safely from the ground without expensive scaffolding or scissor lifts. Difficult interior void windows are assessed and quoted upfront."
    },
    {
        question: "What payment methods do you accept, and when is payment due?",
        answer: (
            <div className="space-y-2">
                <p>
                    For residential customers, payment is only due <strong>after the work is completed</strong> and you have inspected the windows to confirm complete satisfaction under our 100% Streak-Free Guarantee.
                </p>
                <p>
                    We accept all major credit and debit cards (Visa, Mastercard, AMEX) via mobile EFTPOS, direct bank transfer (EFT), and cash. For commercial clients and strata managers, we provide flexible 14-day or 30-day net tax invoicing.
                </p>
            </div>
        ),
        schemaAnswer: "Residential payment is due upon completion after you inspect the work. We accept Visa, Mastercard, AMEX, EFTPOS, direct bank transfer, and cash. Commercial clients receive 14-day or 30-day net invoicing."
    },
    {
        question: "Do you offer recurring maintenance discounts for regular cleans?",
        answer: (
            <div className="space-y-2">
                <p>
                    Yes. Regular maintenance prevents hard water etching from bonding to your glass and takes less time to clean, which allows us to offer discounted recurring rates:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                    <li><strong>Every 6–8 Weeks:</strong> Recommended for coastal suburbs (Cottesloe, Scarborough, Trigg, City Beach) exposed to continuous ocean salt spray.</li>
                    <li><strong>Quarterly (Every 3 Months):</strong> Ideal for homes surrounded by eucalyptus trees, garden reticulation, or busy roads.</li>
                    <li><strong>Bi-Annual (Every 6 Months):</strong> The standard Perth residential schedule to keep glass spotless throughout summer and winter.</li>
                </ul>
            </div>
        ),
        schemaAnswer: "Yes, we offer locked-in discounted rates for recurring residential and commercial cleans on 6-8 week (coastal), quarterly (every 3 months), and bi-annual (every 6 months) schedules."
    }
];

export default function PricingPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pricingFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.schemaAnswer,
            },
        })),
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-16">
            {/* Structured Data: FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Header Section */}
            <section className="bg-brand-navy text-white pt-36 pb-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-action-gold text-xs sm:text-sm font-bold tracking-wider uppercase mb-6">
                        <Sparkles className="w-4 h-4" /> 100% Transparent Perth Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Clear, Upfront Window Cleaning Prices
                    </h1>
                    <p className="text-xl text-brand-water mb-8 max-w-2xl mx-auto leading-relaxed">
                        No hidden callout fees, no mystery quotes. Compare our core packages below, check included services with our comparison matrix, or scroll down for our residential estimator.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="#packages"
                            className="shimmer-btn bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                        >
                            <span>Explore Core Packages</span>
                            <ArrowDown className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-base sm:text-lg transition-colors border border-white/20 inline-flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4 text-action-gold" />
                            <span>Request Custom Quote</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Packages Section - FIRST THING VISIBLE BELOW HERO */}
            <section id="packages" className="bg-white py-16 border-b border-gray-200 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-2">
                            TRANSPARENT SERVICE TIERS
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-navy mb-4">
                            Our Core Cleaning Packages
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                            Choose the level of thoroughness that matches your property. Essential and Standard deliver our <strong>Basic Wash</strong> for routine dirt, while Supreme delivers <strong>Full Detailing</strong> for hard water, paint, and mineral restoration.
                        </p>
                    </div>

                    <PricingPackages />
                </div>
            </section>

            {/* Detailed Pricing Tables */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* Residential */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        <div>
                            <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">
                                RESIDENTIAL RATES
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">Residential Pricing</h2>
                        </div>
                        <Link href="/services/residential-window-cleaning" className="text-blue-600 hover:underline font-semibold hidden md:block">
                            Learn more about Residential Cleaning &rarr;
                        </Link>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Single Storey Home</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential (External only)</span><span className="font-bold text-brand-navy">From $159</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard (Inside & Out)</span><span className="font-bold text-brand-navy">From $279</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme (Full Detailing)</span><span className="font-bold text-brand-navy">From $479</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Double Storey Home</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential (External only)</span><span className="font-bold text-brand-navy">From $279</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard (Inside & Out)</span><span className="font-bold text-brand-navy">From $499</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme (Full Detailing)</span><span className="font-bold text-brand-navy">From $859</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Apartment</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential (External only)</span><span className="font-bold text-brand-navy">From $169</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard (Inside & Out)</span><span className="font-bold text-brand-navy">From $309</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme (Full Detailing)</span><span className="font-bold text-brand-navy">From $539</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                        <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-brand-navy mb-1">Residential Add-Ons (From $40)</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We offer highly specialized deep cleaning add-ons that can be integrated into any package. These include sliding door track deep scrubbing, interior mirrors, glass pool fencing, balustrades, and skylights.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Commercial */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        <div>
                            <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">
                                COMMERCIAL & CORPORATE
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">Commercial Pricing</h2>
                        </div>
                        <Link href="/commercial" className="text-blue-600 hover:underline font-semibold hidden md:block">
                            Learn more about Commercial Services &rarr;
                        </Link>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Shopfronts (Ground)</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and glass</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential (External only)</span><span className="font-bold text-brand-navy">From $90</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard (Inside & Out)</span><span className="font-bold text-brand-navy">From $99</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme (Detailing)</span><span className="font-bold text-brand-navy">From $179</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Offices & Buildings</h4>
                            <p className="text-sm text-gray-500 mb-4">High-reach pure water pole up to 4 storeys</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential (External only)</span><span className="font-bold text-brand-navy">From $219</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard (Inside & Out)</span><span className="font-bold text-brand-navy">From $389</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme (Detailing)</span><span className="font-bold text-brand-navy">From $669</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Office Partitions</h4>
                            <p className="text-sm text-gray-500 mb-4">Internal glass partitions & boardrooms</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Essential (One side)</span><span className="font-bold text-brand-navy">From $79</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Standard (Both sides)</span><span className="font-bold text-brand-navy">From $139</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Supreme (Detailed)</span><span className="font-bold text-brand-navy">From $229</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                        <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-brand-navy mb-1">Commercial Add-Ons & Janitorial Bundles (From $80)</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Bundle high-reach exterior glass with regular office janitorial cleaning, signage washing, architectural skylights, or high balustrades for substantial multi-service contract discounts.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Services */}
                <div className="mb-12">
                    <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">
                        EXTERIOR MAINTENANCE
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-8 border-b pb-4">Specialized Services</h2>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Solar */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-brand-navy text-white p-5">
                                <h3 className="text-xl font-bold">Solar Panel Cleaning</h3>
                                <p className="text-xs text-brand-water mt-1">Boost energy output by up to 30%</p>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    Maximize your energy output with professional solar panel washing. We use advanced pure water systems with soft brushes to deliver a 100% streak-free finish without scratching anti-reflective coatings. <Link href="/services/solar-panel-washing" className="text-blue-600 hover:underline font-semibold">Read more</Link>
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Single Storey Home</span><span className="font-bold text-brand-navy">From $290</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Double Storey Home</span><span className="font-bold text-brand-navy">From $380</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Commercial Rooftops</span><span className="font-bold text-brand-navy">POA</span></li>
                                    <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Solar Farms</span><span className="font-bold text-brand-navy">From $1.80/panel</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Gutters */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-brand-navy text-white p-5">
                                <h3 className="text-xl font-bold">Gutter Cleaning</h3>
                                <p className="text-xs text-brand-water mt-1">Prevent roof leaks & downpipe blockages</p>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    Protect your property from winter overflows and bushfire hazards. Our service includes manual removal of eucalyptus debris, full downpipe flushing, and complete ground cleanup. <Link href="/services/gutter-cleaning" className="text-blue-600 hover:underline font-semibold">Read more</Link>
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Single Storey Home</span><span className="font-bold text-brand-navy">From $290</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Double Storey Home</span><span className="font-bold text-brand-navy">From $450</span></li>
                                    <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Commercial Buildings</span><span className="font-bold text-brand-navy">POA</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Pressure Cleaning */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-brand-navy text-white p-5">
                                <h3 className="text-xl font-bold">Pressure Cleaning</h3>
                                <p className="text-xs text-brand-water mt-1">Deep restoration for driveways, brick & render</p>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    Restore the pristine curb appeal of paved surfaces, driveways, and concrete areas. We utilize rotary flat-surface cleaners and eco-friendly solutions to strip away oil, mould, and grime. <Link href="/services/pressure-washing" className="text-blue-600 hover:underline font-semibold">Read more</Link>
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Floors (Driveways/Bricks)</span><span className="font-bold text-brand-navy">From $190</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Walls (Concrete/Render)</span><span className="font-bold text-brand-navy">From $270</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Commercial Shopfronts</span><span className="font-bold text-brand-navy">From $290</span></li>
                                    <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Full Facility Washdown</span><span className="font-bold text-brand-navy">POA</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust and Reviews Section */}
            <TrustGrid />
            <ResultsAndReviews />

            {/* Pricing FAQ Section with Rich SEO Content */}
            <section className="py-8">
                <FAQ
                    faqs={pricingFaqs}
                    title="Clear answers to your questions about our pricing tiers, inclusions, access rates, and billing across Perth."
                />
            </section>

            {/* Final CTA / Estimator Section */}
            <section id="estimator" className="bg-brand-navy text-white py-20 px-4 mt-8 border-t-[16px] border-action-gold scroll-mt-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-2">
                            ONLINE PRICING CALCULATOR
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Instant Residential Quote</h2>
                        <p className="text-brand-water text-lg max-w-2xl mx-auto leading-relaxed">
                            Use our instant residential pricing calculator below for a custom quote based on your specific property. Lock in your price and preferred booking date in under 60 seconds.
                        </p>
                    </div>
                    
                    <Suspense fallback={
                        <div className="bg-white/10 p-8 rounded-2xl text-center">
                            <div className="animate-spin w-8 h-8 border-4 border-action-gold border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-white font-bold">Loading Pricing Calculator...</p>
                        </div>
                    }>
                        <ResidentialEstimator />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}
