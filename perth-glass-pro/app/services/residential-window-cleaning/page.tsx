import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ClickableBadge from "@/components/ClickableBadge";
import { 
    ChevronsRight, 
    Shield, 
    BadgeCheck, 
    Clock, 
    Star, 
    CheckCircle2, 
    Home, 
    Droplets, 
    ArrowRight, 
    Phone 
} from "lucide-react";

import FAQ from "@/components/FAQ";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import { BUSINESS } from "@/lib/config";

type FaqsType = {
    question: string;
    answer: React.ReactNode;
}

export const metadata: Metadata = {
    title: { absolute: "Residential Window Cleaning Perth | Aspect Window Cleaning" },
    description: "Perth's trusted residential window cleaners. 100% pure water streak-free finish, frames, sills, tracks & flyscreens included. Police-cleared & $20M insured. Get a free quote!",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/services/residential-window-cleaning" }
};

const residentialFeatures = [
    "100% Purified Deionised Water (0ppm) leaves zero mineral spots, streaks, or residue",
    "Complete window care — glass, frames, sills, tracks, and flyscreens thoroughly cleaned",
    "High-reach water-fed poles clean double-storey windows safely from the ground",
    "Directly employed, police-cleared local technicians — zero unvetted subcontractors",
    "Specialist bore water and salt spray mineral descaling for crystal-clear coastal glass",
    "Biodegradable, non-toxic solutions 100% safe for children, family pets, and gardens",
    "Strict WorkSafe WA compliance, insured equipment, and $20M public liability coverage",
    "100% Satisfaction Guarantee — if any pane isn't spotless, we re-clean it free of charge",
];

const homeTypes = [
    {
        title: "Single-Storey Family Homes",
        desc: "Complete interior and exterior window cleaning for single-level residences across all Perth metro suburbs.",
    },
    {
        title: "Double-Storey Residences",
        desc: "Safe ground-reach pole cleaning for second-storey glass, master bedroom balconies, high stairwell windows, and atriums.",
    },
    {
        title: "Coastal Suburbs",
        desc: "Targeted descaling for salt spray, sea air haze, and calcified mineral film from Cottesloe to Trigg and Mindarie.",
    },
    {
        title: "Leafy Hills & Bushland Homes",
        desc: "Removal of eucalyptus sap, tree pollen, bird droppings, and red inland dust from Kalamunda to Roleystone.",
    },
    {
        title: "Townhouses & Strata Villas",
        desc: "Courtyard sliders, patio doors, high bedroom glazing, and skylights cleaned with minimal footprint.",
    },
    {
        title: "Pre-Sale & Auction Preparation",
        desc: "Inspection-grade detailing to flood interiors with natural light and maximise kerb appeal for property appraisals.",
    },
    {
        title: "Pool Glass & Balustrades",
        desc: "Ultra-clear pool glass protection removing calcium water spots, chlorine film, sunscreen residue, and splash marks.",
    },
    {
        title: "Architectural Glass & Louvres",
        desc: "Precision hand-finished squeegee detailing for modern bifold doors, colonial multi-pane grids, and glass louvres.",
    },
];

const whatsInclude = [
    {
        icon: ChevronsRight,
        title: "Interior & Exterior Glass",
        description:
            "We clean every pane on both sides using pure water technology — removing Perth's salt, dust, and grime for glass so clear it practically disappears.",
    },
    {
        icon: ChevronsRight,
        title: "Frames, Sills & Tracks",
        description:
            "Salt, moisture, and organic matter trapped in frames and tracks breed mould and corrode seals. We remove all of it — protecting your window system, not just the glass.",
    },
    {
        icon: ChevronsRight,
        title: "Screen & Fly Screen Cleaning",
        description:
            "Dirty screens block up to 25% of natural airflow and cast a visible haze over your view. We remove, wash, and refit every screen — restoring your light and breeze.",
    },
    {
        icon: ChevronsRight,
        title: "Pure Water Cleaning Method",
        description:
            "Our purified, deionised water contains zero minerals — so when it evaporates, it leaves absolutely nothing behind. No residue, no spots, no streaks. Windows stay cleaner for longer.",
    },
    {
        icon: ChevronsRight,
        title: "Hard Water Stain Removal",
        description:
            "Perth's water is mineral-rich and relentless. We use specialist solutions to dissolve calcium and magnesium deposits before they permanently etch your glass — restoring full clarity.",
    },
    {
        icon: ChevronsRight,
        title: "Streak-Free Polish",
        description:
            "Every pane is hand-finished with a professional streak-free polish. Checked in multiple lighting angles until it's flawless — because streaks are only invisible until the sun hits.",
    },
];

const residentialBenefits = [
    {
        number: "01",
        title: "Maximise Natural Light & Comfort",
        description:
            "Every layer of grime on your windows blocks natural light from entering your home. Professional cleaning removes that barrier — making rooms measurably brighter and more comfortable without changing your electricity bill.",
    },
    {
        number: "02",
        title: "Protect Glass from Long-Term Damage",
        description:
            "Perth's mineral-rich water and salt air etch permanently into glass over time. Once bonded, these deposits can't be removed with standard cleaning — and glass replacement costs hundreds per pane. Regular professional cleaning stops the damage before it starts.",
    },
    {
        number: "03",
        title: "Improve Kerb Appeal & Property Value",
        description:
            "Sparkling windows transform how your home looks from the street — immediately. Whether you're selling, renting, or just taking pride in your property, clean windows are the fastest way to lift your home's appearance and perceived value.",
    },
    {
        number: "04",
        title: "Healthier Indoor Environment",
        description:
            "Mould, dust mites, and pollen accumulate in dirty tracks and sills and circulate through your home every time you open a window. A thorough clean removes these allergens at the source — something a quick wipe can't do.",
    },
];

const whyAspectPoints = [
    {
        title: "Pure Water Technology",
        description:
            "Our purified water system produces 0ppm deionised water — leaving zero mineral residue on glass. Your windows dry spotless every time and stay cleaner up to twice as long between services compared to traditional cleaning methods.",
    },
    {
        title: "Eco-Friendly Cleaning Solutions",
        description:
            "All our products are non-toxic, biodegradable, and safe for kids, pets, and Perth's sensitive garden environments. We deliver professional-grade results without a single drop of harsh chemical on your property.",
    },
    {
        title: "Trained & Police-Cleared Team",
        description:
            "Every Aspect technician is professionally trained, police-cleared, and covered by $20M public liability insurance. You're not just letting a cleaner in — you're letting in a verified professional.",
    },
    {
        title: "Flexible Scheduling & Reliable Service",
        description:
            "Same-week bookings across the Perth metro. We send a reminder the day before, arrive within the agreed window, and we don't pack up until the job meets our standard — which means it'll meet yours.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Get a Free Quote",
        description:
            "Tell us your home type and approximate window count — we'll provide a fast, transparent quote with zero hidden fees.",
    },
    {
        number: "02",
        title: "Choose Your Date",
        description:
            "Same-week availability across the Perth metro area. Pick a morning or afternoon window that suits your schedule.",
    },
    {
        number: "03",
        title: "We Clean Every Detail",
        description:
            "Our police-cleared technician cleans every pane, frame, sill, track, and flyscreen using pure water technology.",
    },
    {
        number: "04",
        title: "Inspect & Guarantee",
        description:
            "We inspect each window with you. If any spot or streak doesn't meet our standard, we re-clean it immediately.",
    },
];

const residentialFAQs: FaqsType[] = [
    {
        question: "How often should Perth homes have their windows cleaned?",
        answer:
            "For most Perth homes, twice a year is a solid baseline — but it depends on your location. Properties within 3km of the coast (such as Cottesloe, Scarborough, and City Beach) accumulate salt air deposits and benefit from cleaning every 6–8 weeks to prevent permanent mineral etching. Homes surrounded by eucalyptus trees or in dusty suburbs like Kalamunda or Ellenbrook typically need quarterly cleans.",
    },
    {
        question: "What is pure water window cleaning and why is it better for homes?",
        answer:
            "Pure water cleaning uses deionised water that has been filtered to 0 parts per million (0ppm) of dissolved minerals. Because the water contains zero impurities, it acts like a dirt magnet, lifting grime and evaporating completely spotless without streaks or spots. Unlike detergent sprays that leave a sticky residue which attracts dust, pure water leaves nothing behind, so your windows stay cleaner for much longer.",
    },
    {
        question: "Do you clean both the inside and outside of home windows?",
        answer:
            "Yes. Our standard residential service includes both interior and exterior glass, along with exterior frames, window sills, tracks, and flyscreens. If you only require exterior cleaning (for example, before a party or seasonal refresh), we can easily tailor the scope and price to your needs.",
    },
    {
        question: "What is included with frames, sills, tracks, and flyscreens?",
        answer:
            "We don't just splash the glass and leave. Our full residential clean includes vacuuming and wiping out accumulated dirt, spiderwebs, and dead bugs from sliding window tracks, washing exterior window sills, scrubbing frames, and removing, washing, and re-installing flyscreens.",
    },
    {
        question: "Can you safely clean windows on double-storey homes?",
        answer:
            "Yes, absolutely. We use lightweight carbon-fiber telescopic poles that reach up to 4 storeys safely from the ground. This eliminates the need for heavy ladders on your tile or Colorbond roof, protecting your roof from damage while keeping our technicians completely safe.",
    },
    {
        question: "Are your cleaning solutions safe for children, pets, and garden plants?",
        answer:
            "100% safe. We utilize purified deionised water and biodegradable, non-toxic, plant-based cleaning solutions. There are no harsh chemical odours inside your home and zero harmful runoff onto your lawn, flower beds, or pet play areas.",
    },
    {
        question: "Can you remove hard water bore stains and sprinkler spots?",
        answer:
            "Yes. Perth groundwater often contains high concentrations of iron and calcium that bake onto glass under the intense Western Australian sun. We carry specialist restorative mineral descaling treatments that safely dissolve calcified water stains without scratching the glass.",
    },
    {
        question: "Do I need to be home while you clean the windows?",
        answer:
            "If you have booked an exterior-only clean, you don't need to be home as long as we have unlocked side gate access, exterior power/water taps accessible, and pets secured indoors. For interior cleaning, an adult must be present to allow access to the rooms.",
    },
];

export default function ResidentialWindowCleaning() {
    return (
        <div className="min-h-screen bg-brand-snow text-brand-slate">
            {/* Structured Data Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Residential Window Cleaning Perth",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Aspect Window Cleaning",
                            "telephone": BUSINESS.phone,
                            "priceRange": "$$",
                            "url": "https://aspectwindowcleaning.com.au"
                        },
                        "areaServed": {
                            "@type": "State",
                            "name": "Western Australia"
                        },
                        "description": "Professional residential window cleaning in Perth using 0ppm pure water technology. Interior & exterior glass, frames, sills, tracks, and flyscreens included.",
                        "url": "https://aspectwindowcleaning.com.au/services/residential-window-cleaning"
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://aspectwindowcleaning.com.au"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Services",
                                "item": "https://aspectwindowcleaning.com.au/services"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "Residential Window Cleaning",
                                "item": "https://aspectwindowcleaning.com.au/services/residential-window-cleaning"
                            }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": residentialFAQs.map((f) => ({
                            "@type": "Question",
                            "name": f.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": String(f.answer)
                            }
                        }))
                    })
                }}
            />

            {/* HERO */}
            <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                        <Home className="w-5 h-5 text-action-gold" />
                        <span className="text-sm font-medium">Residential Services</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 leading-tight">
                        Sparkling Clean Windows
                        <br />
                        <span className="text-action-gold">For Your Home</span>
                    </h1>
                    <p className="text-base sm:text-xl text-brand-water/80 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                        Professional window cleaning using 0ppm Pure Water Technology.
                        Streak-free clarity for single and double-storey Perth homes — including exterior frames, tracks, sills, and washed flyscreens.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold text-base px-8 py-4 rounded-full hover:bg-action-gold/90 transition-colors min-h-[48px] shadow-md"
                        >
                            View Pricing & Packages
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white/20 transition-colors min-h-[48px]"
                        >
                            <Phone className="w-4 h-4" />
                            Call {BUSINESS.phone}
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST BADGES ROW */}
            <section className="bg-white py-8 sm:py-10 -mt-6 sm:-mt-8 relative z-10 border-b border-slate-100">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        <ClickableBadge type="insured" className="flex items-center gap-2.5 sm:gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
                                <Shield className="w-5 h-5 text-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    $20M Insured
                                </div>
                                <div className="text-xs text-brand-slate">Complete homeowner cover</div>
                            </div>
                        </ClickableBadge>

                        <ClickableBadge type="police" className="flex items-center gap-2.5 sm:gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
                                <BadgeCheck className="w-5 h-5 text-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    Police Cleared
                                </div>
                                <div className="text-xs text-brand-slate">Background checked</div>
                            </div>
                        </ClickableBadge>

                        <ClickableBadge className="flex items-center gap-2.5 sm:gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
                                <Droplets className="w-5 h-5 text-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    0ppm Pure Water
                                </div>
                                <div className="text-xs text-brand-slate">Spotless mineral-free dry</div>
                            </div>
                        </ClickableBadge>

                        <ClickableBadge className="flex items-center gap-2.5 sm:gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
                                <Star className="w-5 h-5 text-action-gold fill-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    5.0 Google Reviews
                                </div>
                                <div className="text-xs text-brand-slate">43+ Happy Perth homeowners</div>
                            </div>
                        </ClickableBadge>
                    </div>
                </div>
            </section>

            {/* SHOWCASE IMAGE SECTION (Mirroring Commercial Page) */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771873841/residential-window-cleaning_nhnoux.jpg"
                            alt="Professional Residential Window Cleaning in Perth"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 896px"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* FEATURES GRID (Mirroring Commercial Page) */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                        Why Pick Aspect for Residential Window Cleaning?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {residentialFeatures.map((feature) => (
                            <div key={feature} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100/80">
                                <CheckCircle2 className="w-6 h-6 text-action-gold flex-shrink-0 mt-0.5" />
                                <span className="text-brand-slate text-sm leading-relaxed">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Complete Home Package Advantage Banner (Mirroring Dual-Contract Advantage Banner) */}
                    <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-navy to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                        <div>
                            <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">Complete Home Care</span>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                                Interior & Exterior Glass + Sills, Tracks & Flyscreens Included
                            </h3>
                            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                                Don't settle for cleaners who just splash the outside panes. We clean the entire window system: wiping down sills, clearing dead insects from tracks, and washing screens so your home feels fresh and light.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                            <Link
                                href="/pricing"
                                className="inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold px-6 py-3 rounded-full text-sm hover:bg-action-gold/90 transition-all min-h-[44px]"
                            >
                                View Home Packages <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href={`tel:${BUSINESS.phoneRaw}`}
                                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-white/20 transition-all min-h-[44px]"
                            >
                                Call {BUSINESS.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOME & PROPERTY TYPES WE CLEAN (Mirroring Industries We Serve) */}
            <section className="py-16 bg-brand-snow">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-action-gold font-bold text-xs uppercase tracking-wider block mb-2">Tailored For Every Home</span>
                        <h2 className="text-3xl font-heading font-bold text-brand-navy">
                            Perth Home Types We Clean
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {homeTypes.map((home) => (
                            <div key={home.title} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-action-gold/30 transition-all">
                                <div>
                                    <h3 className="font-bold text-brand-navy mb-2 text-base">{home.title}</h3>
                                    <p className="text-brand-slate text-xs leading-relaxed">{home.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT'S INCLUDED IN EVERY CLEAN */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs text-action-gold font-bold uppercase tracking-wider block mb-2">EVERYTHING COVERED</span>
                        <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">
                            What's Included in Your Home Window Clean
                        </h2>
                        <p className="text-brand-slate text-sm sm:text-base">
                            We don't cut corners. Every residential booking includes a thorough clean of all accessible components — leaving your entire home brighter and clearer.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whatsInclude.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-action-gold/30 hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-action-gold/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-action-gold" />
                                    </div>
                                    <h3 className="font-bold text-lg text-brand-navy">{item.title}</h3>
                                    <p className="text-brand-slate text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* WHY IT MATTERS & RESIDENTIAL BEFORE/AFTER */}
            <section className="bg-brand-snow py-16 border-t border-slate-200/60">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-action-gold font-bold text-xs uppercase tracking-wider block mb-2">THE RESIDENTIAL DIFFERENCE</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-navy mb-4">
                            The Real Benefits of Professional Home Window Cleaning
                        </h2>
                        <p className="text-brand-slate text-sm sm:text-base">
                            Regular professional cleaning is more than cosmetic — it preserves your glass, prevents permanent mineral etching, and keeps indoor air allergen-free.
                        </p>
                    </div>

                    {/* Benefits 4-grid */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-12">
                        {residentialBenefits.map((benefit) => (
                            <div key={benefit.number} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition">
                                <div className="text-action-gold font-bold text-xl mb-2">{benefit.number}</div>
                                <h3 className="font-bold text-lg text-brand-navy mb-2">{benefit.title}</h3>
                                <p className="text-brand-slate text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Residential Before / After Slider */}
                    <div className="max-w-3xl mx-auto w-full">
                        <div className="text-center mb-4">
                            <span className="text-xs font-semibold text-brand-slate uppercase tracking-wider">Interactive Transformation</span>
                            <p className="text-sm text-brand-navy font-medium">Drag the slider to see Perth residential glass before & after our pure water clean</p>
                        </div>
                        <BeforeAfterSlider
                            initial={50}
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1772792155/aspect-before-window-cleaning_zfr8ae.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1772792157/after-window-cleaning_fs1hhz.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* WHY ASPECT POINTS */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-action-gold font-bold text-xs uppercase tracking-wider block mb-2">WHY HOMEOWNERS TRUST US</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-navy mb-4">
                            Why Perth Homeowners Choose Aspect
                        </h2>
                        <p className="text-brand-slate text-sm sm:text-base">
                            With a 5.0 Google rating across 43+ verified homeowner reviews, we are Perth's most recommended residential window cleaners.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {whyAspectPoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 hover:shadow-md transition"
                            >
                                <h3 className="text-action-gold font-bold text-xl mb-3">
                                    {point.title}
                                </h3>
                                <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4-STEP PROCESS */}
            <section className="py-16 bg-brand-snow border-y border-slate-200/60">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-action-gold font-bold text-xs uppercase tracking-wider block mb-2">SIMPLE & EASY</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-navy mb-4">
                            How Our Home Window Cleaning Works
                        </h2>
                        <p className="text-brand-slate text-sm sm:text-base">
                            A seamless, worry-free process from your quick online quote to crystal-clear windows.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step) => (
                            <div key={step.number} className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-action-gold text-brand-navy font-bold text-xl flex items-center justify-center mx-auto mb-4">
                                    {step.number}
                                </div>
                                <h3 className="font-bold text-brand-navy mb-2 text-base sm:text-lg">
                                    {step.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* REAL RESIDENTIAL CASE STUDIES */}
            <div className="bg-white border-b border-slate-200">
                <CaseStudiesSection
                    slugs={[
                        "mount-pleasant-pre-sale-window-cleaning",
                        "coastal-pre-sale-window-cleaning-eglinton",
                        "post-renovation-to-auction-window-cleaning-subiaco"
                    ]}
                    title="Real Perth Residential Transformations"
                    subtitle="Home Window Cleaning Portfolio"
                    limit={3}
                />
            </div>

            {/* FAQ SECTION */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <FAQ
                    title="Frequently Asked Questions About Home Window Cleaning"
                    faqs={residentialFAQs}
                />
            </section>

            {/* TRUST BADGES BAR (Mirroring Commercial Page) */}
            <section className="py-12 bg-white border-y border-slate-200">
                <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="flex items-center gap-3 text-brand-slate">
                        <Shield className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">$20M Public Liability</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-slate">
                        <CheckCircle2 className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">Police-Cleared Staff</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-slate">
                        <Home className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">100% Satisfaction Guarantee</span>
                    </div>
                </div>
            </section>

            {/* FINAL HIGH-CONVERTING CTA (Mirroring Commercial Page) */}
            <section className="py-16 bg-brand-navy text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-4">
                        Ready for Sparkling Clean Windows?
                    </h2>
                    <p className="text-brand-water/80 mb-8 max-w-xl mx-auto">
                        Get your transparent quote in under 2 minutes. No hidden fees, no obligation, just crystal-clear results.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/pricing"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-action-gold/90 transition-colors min-h-[48px]"
                        >
                            View Packages & Pricing
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-white/20 transition-colors min-h-[48px]"
                        >
                            <Phone className="w-5 h-5" />
                            {BUSINESS.phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
