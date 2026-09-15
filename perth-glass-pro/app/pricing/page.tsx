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
                    Our standard routine cleaning procedure using 100% purified deionised water, professional applicator wands, and precision squeegees. It lifts and washes away general environmental dust, coastal salt film, pollen, spider webs, fingerprints, and everyday grime that accumulates over 2 to 6 months. Standard packages also include wiping exterior frames and sills, and dusting flyscreens. It leaves glass 100% streak-free, crystal-clear, and spot-free for normal conditions, but is not formulated to strip chemically bonded minerals or post-construction debris.
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                    <strong className="text-brand-navy block mb-1">2. Detailing / Premium (Supreme Package):</strong>
                    Our advanced, restorative cleaning process required when glass has stubborn, bonded debris that will not budge with standard washing. This includes hard water mineral stains (especially from Perth bore water reticulation), calcification, paint overspray, plaster, cement render splatter, construction silicone, rust marks, and heavy sticker residue. Detailing utilizes specialized safety glass scrapers, grade-0000 ultra-fine bronze wool, and commercial acid descaling solutions. The Supreme package also includes removing and deep-washing flyscreens and HEPA-vacuuming tracks and sliding channels. If only a few specific panes suffer from sprinkler mineral etching, we can quote a standard clean with detailing applied only to the affected panels.
                </div>
            </div>
        ),
        schemaAnswer: "Our Basic Wash (Essential and Standard packages) is our routine maintenance clean using 100% purified deionised water and squeegees to remove general environmental dust, road film, and everyday grime. Detailing (Supreme package) is our intensive restorative process for stubborn, bonded debris such as paint overspray, builder render, stickers, and hard water bore mineral etching, utilizing specialized scrapers, grade-0000 bronze wool, acid descaling agents, deep track vacuuming, and screen washing."
    },
    {
        question: "How is pricing calculated, and do you offer per-panel, hourly rates, or free on-site assessments?",
        answer: (
            <div className="space-y-3">
                <p>
                    We believe in transparent, upfront pricing tailored to your property type and commercial requirements:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                    <li><strong>Fixed-Price Packages:</strong> For standard residential properties, our fixed packages (Single Storey from $159, Double Storey from $279) provide the best value with guaranteed pricing and zero surprise charges. You can use our instant online estimator below to calculate your package price in under 60 seconds.</li>
                    <li><strong>Per-Panel Rates:</strong> Ideal for commercial shopfronts, solar panel arrays (from $1.80/panel for large arrays, or package rates for residential roofs), glass pool fencing ($10–$15 per panel), or when you only require a few specific glass panes detailed following renovations or localized bore water damage.</li>
                    <li><strong>Hourly Rates:</strong> Primarily utilized for post-construction builders cleans, complex architectural properties with non-standard access, or commercial properties requiring ongoing janitorial porter services.</li>
                    <li><strong>Free On-Site Assessments:</strong> For custom architectural homes, multi-storey commercial buildings, or strata complexes, an experienced technician visits in person to assess window accessibility, glass condition, and specific requirements, providing a fixed written quote with zero obligation.</li>
                </ul>
            </div>
        ),
        schemaAnswer: "We offer fixed-price residential packages (from $159 single storey, $279 double storey), per-panel pricing (for solar panels, glass pool fencing, shopfronts, or isolated pane restoration), per-hour pricing (for builders cleans and complex commercial jobs), and free on-site quote assessments for custom architectural homes, strata, and commercial facilities."
    },
    {
        question: "Do you offer combo discounts, multi-service packages, or referral rewards?",
        answer: (
            <div className="space-y-3">
                <p>
                    Yes! We provide multi-service package discounts and customer referral credits:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                    <li><strong>Window Cleaning + Solar Panel Washing:</strong> Save 15% on solar panel washing when combined with a residential window package.</li>
                    <li><strong>Window Cleaning + Gutter Clearing:</strong> Complete seasonal roof and glass protection with 15% to 20% bundle savings.</li>
                    <li><strong>The Full Exterior Refresh:</strong> Group windows, gutters, solar panels, and driveway pressure washing during the same visit for maximum savings and property curb appeal uplift.</li>
                    <li><strong>Refer-a-Friend Rewards:</strong> When a neighbour, friend, or business contact you refer books a service with Aspect, you receive a $30 to $50 credit toward your next cleaning service.</li>
                </ul>
            </div>
        ),
        schemaAnswer: "Yes. Bundling window cleaning with solar panel washing, gutter cleaning, or driveway pressure washing on the same visit unlocks multi-service bundle savings of 15% to 20%. Furthermore, our Refer-a-Friend program rewards you with $30 to $50 off your next service when your referred contact books with Aspect."
    },
    {
        question: "Are there any hidden fees, travel costs, or callout charges across Perth?",
        answer: (
            <div className="space-y-2">
                <p>
                    <strong>None whatsoever.</strong> Aspect Window Cleaning operates with complete pricing transparency. We service all 370+ suburbs across the Greater Perth metropolitan region — from Joondalup and Alkimos in the north to Rockingham and Mandurah in the south, coastal suburbs to the Perth Hills — with <strong>zero travel charges or callout fees</strong> on all confirmed bookings.
                </p>
                <p>
                    Every quote covers pure water filtration, professional labor, height safety equipment, eco-friendly supplies, and $20M public liability insurance. The price you are quoted is the price on your invoice.
                </p>
            </div>
        ),
        schemaAnswer: "There are no hidden fees, travel charges, or callout fees anywhere across the 370+ suburbs in Greater Perth. All quotes include pure water filtration, labor, equipment, and $20M public liability insurance."
    },
    {
        question: "How do you handle double-storey homes and high-reach glass, and how does it affect pricing?",
        answer: (
            <div className="space-y-2">
                <p>
                    Our double-storey pricing reflects the additional equipment and reach requirements needed for upper-level glass. However, because we utilize carbon-fibre water-fed telescopic poles operating with purified reverse osmosis water, we can clean up to 4 storeys safely from the ground.
                </p>
                <p>
                    This eliminates the need for expensive scaffolding or cherry pickers for most residential jobs, keeping our double-storey packages highly competitive (starting from $279 for Essential). For difficult-access interior glass (such as high stairwell voids), our technician performs an access check and quotes a fixed price upfront.
                </p>
                <p>
                    For commercial buildings, retail centres, and strata complexes requiring elevated access, our team includes licensed Elevated Work Platform (EWP) cherry picker and scissor lift operators compliant with WorkSafe WA height safety standards.
                </p>
            </div>
        ),
        schemaAnswer: "Double-storey residential pricing is kept affordable (from $279) because our carbon-fibre pure water reach poles allow us to clean up to 4 storeys safely from the ground without expensive scaffolding or scissor lifts. For commercial and strata high-reach projects, we provide licensed EWP cherry picker operators compliant with WorkSafe WA safety standards."
    },
    {
        question: "Do you offer recurring maintenance discounts for regular cleans?",
        answer: (
            <div className="space-y-2">
                <p>
                    Yes. Regular maintenance prevents hard water etching from bonding to your glass and takes less time to clean, which allows us to offer discounted recurring rates:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                    <li><strong>Every 6–8 Weeks:</strong> Recommended for coastal suburbs (Cottesloe, Scarborough, Trigg, City Beach, Alkimos) exposed to continuous ocean salt spray.</li>
                    <li><strong>Quarterly (Every 3 Months):</strong> Ideal for homes surrounded by eucalyptus trees, garden reticulation, or busy roads.</li>
                    <li><strong>Bi-Annual (Every 6 Months):</strong> The standard Perth residential schedule to keep glass spotless throughout summer and winter.</li>
                </ul>
            </div>
        ),
        schemaAnswer: "Yes, we offer locked-in discounted rates for recurring residential and commercial cleans on 6-8 week (coastal), quarterly (every 3 months), and bi-annual (every 6 months) schedules."
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
        question: "When is payment due, what payment methods do you accept, and is there a satisfaction guarantee?",
        answer: (
            <div className="space-y-3">
                <p>
                    For residential customers, payment is only due <strong>after the work is completed</strong> and you have inspected the windows to confirm complete satisfaction under our <strong>100% Streak-Free Guarantee</strong>.
                </p>
                <p>
                    If anything does not meet your expectations during the walkthrough, we reclean it immediately on the spot. If you notice any missed spot or streak after we leave, simply notify us within 48 hours and we will return to make it right at no additional cost.
                </p>
                <p>
                    We accept all major credit and debit cards (Visa, Mastercard, AMEX) via mobile EFTPOS, direct bank transfer (EFT), and cash. For commercial clients and strata managers, we provide flexible 14-day or 30-day net tax invoicing.
                </p>
            </div>
        ),
        schemaAnswer: "Residential payment is only due after completion and your walkthrough inspection. Backed by our 100% Streak-Free Guarantee: if you notice any issues within 48 hours, we return to make it right for free. We accept Visa, Mastercard, AMEX, EFTPOS, EFT, cash, and provide 14/30-day net invoicing for commercial clients."
    },
    {
        question: "How does 0 PPM pure water technology save me money and keep glass cleaner for longer?",
        answer: (
            <div className="space-y-2">
                <p>
                    Standard Perth tap water contains high concentrations of dissolved minerals (calcium, magnesium, and chlorides) measuring 200 to 400+ PPM (Parts Per Million). Washing windows with tap water or detergent leaves microscopic chemical residues that attract dirt and cause mineral etching over time.
                </p>
                <p>
                    Our onboard 4-stage reverse osmosis (RO) and deionisation (DI) filtration units strip all dissolved minerals to 0 PPM. In this ultra-pure state, water acts as a powerful natural solvent, lifting dirt and coastal salt without chemical detergents. Because the rinse water contains zero impurities, it evaporates naturally into a 100% spotless finish. With no sticky soap residue left on the glass, your windows stay clean up to twice as long, reducing your ongoing maintenance costs.
                </p>
            </div>
        ),
        schemaAnswer: "Perth tap water contains 200 to 400+ PPM of dissolved minerals that leave white spots. Our 4-stage filtration produces 0 PPM pure water that dries 100% spot-free with zero detergent residue. Because there is no sticky soap film to attract dirt, your windows stay clean up to twice as long, saving you money on cleaning frequency."
    },
    {
        question: "Are your technicians fully insured, police cleared, and safety certified?",
        answer: (
            <div className="space-y-2">
                <p>
                    Yes. Aspect Window Cleaning carries comprehensive <strong>$20,000,000 public liability insurance</strong> covering all residential and commercial operations across Greater Perth.
                </p>
                <p>
                    Every technician on our team has undergone thorough Australian police background vetting, holds valid police clearances, and carries Working at Heights certifications. Our team arrives on time in uniform with well-maintained, professional equipment and adheres to all WorkSafe WA safety standards.
                </p>
            </div>
        ),
        schemaAnswer: "Yes. Aspect Window Cleaning carries $20,000,000 public liability insurance. All technicians hold verified Australian police clearances, Working at Heights certifications, and arrive in uniform with commercial-grade equipment."
    },
    {
        question: "Do I need to be home while you clean, and can you accommodate urgent pre-sale deadlines?",
        answer: (
            <div className="space-y-2">
                <p>
                    You do not need to be home for exterior cleaning services. As long as our crew has safe perimeter access around your property (unlocked side gates and pets secured indoors), we can complete exterior windows, gutters, solar panels, or pressure washing while you are away. For interior glass cleaning, someone over 18 simply needs to provide access at the start of the appointment.
                </p>
                <p>
                    We also specialize in rapid turnaround deadlines for real estate photography, auction day, end-of-lease handovers, or urgent corporate events. We offer same-week bookings across Perth with rapid-response multi-person crews available when timing is critical.
                </p>
            </div>
        ),
        schemaAnswer: "You do not need to be home for exterior cleaning as long as side gates are unlocked and pets are secured. An adult must provide access for interior cleans. We also accommodate same-week and urgent pre-sale or photography deadlines with rapid-response crews."
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
            <ResultsAndReviews showFaq={false} />

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
