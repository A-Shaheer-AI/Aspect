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
    Building2, 
    Sparkles, 
    ShieldCheck, 
    Briefcase, 
    Store, 
    Warehouse, 
    Layers, 
    SprayCan,
    Droplets,
    HardHat,
    AlertCircle,
    ArrowRight,
    Phone
} from "lucide-react";

import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BUSINESS } from "@/lib/config";

type FaqsType = {
    question: string;
    answer: React.ReactNode;
}

export const metadata: Metadata = {
    title: { absolute: "Commercial Window Cleaning & High-Reach Glazing Perth | Aspect" },
    description: "Specialist commercial window cleaning in Perth. High-reach pure water fed poles up to 4 storeys, certified EWP cherry picker operators, office towers, retail shopfronts & strata glazing.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/services/commercial-window-cleaning" }
};

const accessMethods = [
    {
        icon: Droplets,
        title: "0ppm Pure Water Reach Poles",
        badge: "Up to 4 Storeys",
        description: "Ultra-lightweight carbon fiber telescopic reach poles fed with 100% deionised pure water. Cleans glass, frames, and sills safely from the ground without expensive scaffolding, boom permits, or disruption."
    },
    {
        icon: HardHat,
        title: "Certified EWP & Cherry Pickers",
        badge: "High-Rise & Facades",
        description: "Fully ticketed Elevated Work Platform (EWP) and boom lift operators. Ideal for multi-storey commercial complexes, architectural glass canopies, exterior signage, and difficult-to-access facade elevations."
    },
    {
        icon: Sparkles,
        title: "Interior Partitions & Atriums",
        badge: "Office Glass & Lobbies",
        description: "Hand-finished streak-free detailing for glass boardroom dividers, interior balustrades, double-height entrance atriums, and acoustic partitions using commercial squeegees and microfiber polishing."
    }
];

const whatsInclude = [
    {
        icon: Building2,
        title: "Multi-Storey Commercial Facades",
        description:
            "Curtain wall glass, exterior louvres, architectural spandrels, and high-rise commercial window panes cleaned streak-free using pure water reach systems and certified cherry pickers.",
    },
    {
        icon: Store,
        title: "Retail Shopfronts & Dealerships",
        description:
            "Crystal-clear display windows, showroom facades, and entrance vestibules that showcase merchandise and elevate brand prestige for Perth car dealerships and retail tenancies.",
    },
    {
        icon: Sparkles,
        title: "Internal Glass Partitions & Meeting Rooms",
        description:
            "Fingerprint-free, smudge-free interior office glazing, acoustic dividers, glass doors, and boardroom balustrades to maintain an open, immaculate corporate atmosphere.",
    },
    {
        icon: Layers,
        title: "Strata & Multi-Unit Residential Complexes",
        description:
            "Scheduled exterior window washing for strata companies, apartment buildings, and body corporates — including communal lobbies, stairwell glass, and private balcony balustrades.",
    },
    {
        icon: Droplets,
        title: "Hard Water Bore Stain & Mineral Removal",
        description:
            "Specialist chemical descaling to reverse Perth's harsh bore water etching and calcium mineral buildup on ground-floor glass and external shopfront windows.",
    },
    {
        icon: HardHat,
        title: "Builders Post-Construction Glass Detailing",
        description:
            "Careful razor-scraping and chemical removal of plaster splatter, render residue, paint overspray, and silicone adhesives from new commercial glass installations.",
    },
    {
        icon: Briefcase,
        title: "Commercial Signage & Canopy Washing",
        description:
            "High-reach washing of illuminated building pylons, exterior corporate signage, metal composite cladding, and entrance awnings to refresh your brand's street presence.",
    },
    {
        icon: ShieldCheck,
        title: "Scheduled Maintenance Contracts",
        description:
            "Tailored weekly, fortnightly, monthly, or quarterly cleaning schedules with consistent personnel, automated reminder notices, and zero disruption to your daily trade.",
    },
];

const commercialWindowFAQs: FaqsType[] = [
    {
        question: "How high can you clean windows without scaffolding?",
        answer:
            "Using our advanced carbon-fiber water-fed pole systems, we safely clean windows up to 4 storeys (approximately 15 metres) directly from the ground. For higher buildings, complex rooflines, or elevated signage, our certified operators deploy Elevated Work Platforms (cherry pickers and scissor lifts).",
    },
    {
        question: "Are your operators certified and insured for working at heights?",
        answer:
            "Yes. All Aspect commercial technicians hold nationally accredited Working at Heights and EWP (Elevated Work Platform) certifications. We carry comprehensive $20M public liability insurance, complete site-specific Safe Work Method Statements (SWMS), and Job Safety Analyses (JSA) before commencing work.",
    },
    {
        question: "Why is pure water technology superior for commercial glass?",
        answer:
            "Our multi-stage filtration system strips tap water of all dissolved solids (0ppm). Because the water is 100% pure, it acts as a natural solvent, lifting dirt, salt, and dust without detergents. When rinsed, it evaporates completely streak-free with zero chemical film — meaning windows stay cleaner significantly longer.",
    },
    {
        question: "Can you clean windows outside normal business hours?",
        answer:
            "Absolutely. We operate 24 hours a day, 7 days a week. Most retail showrooms, corporate offices, and car dealerships prefer early morning cleans (before 8:00 AM) or weekend appointments so access equipment never blocks customer parking, pedestrian footpaths, or office workflows.",
    },
    {
        question: "Can you remove heavy bore water and mineral etching from glass?",
        answer:
            "Yes. Perth's groundwater is heavily loaded with iron, calcium, and magnesium that bake onto glass in the summer sun. We utilize specialist acid-free restorative descaling compounds that safely dissolve mineral bonds without scratching or damaging the underlying glass.",
    },
    {
        question: "Do you also provide interior office janitorial and commercial cleaning?",
        answer:
            "Yes! In addition to commercial window cleaning, Aspect provides complete commercial office cleaning, workstation sanitisation, washroom hygiene, floor strip & seal, and carpet steam extraction. We offer dual-contract bundles saving businesses up to 20% by combining internal office janitorial with exterior high-reach glass cleaning.",
    },
];

const CommercialWindowCleaning = () => {
    return (
        <div className="bg-white text-brand-slate">
            {/* Structured Data Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Commercial Window Cleaning & High-Reach Glazing",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Aspect Window Cleaning",
                            "telephone": "0415 174 977",
                            "priceRange": "$$",
                            "openingHours": "Mo-Su 00:00-23:59"
                        },
                        "areaServed": {
                            "@type": "State",
                            "name": "Western Australia"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Commercial Window Cleaning Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "High-Reach Water-Fed Pole Window Cleaning"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Cherry Picker & EWP High-Rise Facade Glazing"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Retail Shopfront & Showroom Window Cleaning"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Strata Multi-Unit Glazing & Balustrades"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Hard Water Bore Stain Descaling"
                                    }
                                }
                            ]
                        },
                        "url": "https://aspectwindowcleaning.com.au/services/commercial-window-cleaning"
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
                                "name": "Commercial Window Cleaning & High-Reach Glazing",
                                "item": "https://aspectwindowcleaning.com.au/services/commercial-window-cleaning"
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
                        "mainEntity": commercialWindowFAQs.map((f) => ({
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
            <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-20 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <span className="inline-flex items-center gap-2 bg-action-gold/20 text-action-gold border border-action-gold/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        <Building2 className="w-3.5 h-3.5" /> Certified EWP & High-Reach Specialist
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
                        Commercial Window Cleaning & High-Reach Glazing Perth
                    </h1>
                    <p className="text-base md:text-xl text-slate-200 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Specialist exterior and interior commercial glass cleaning for office towers, retail shopfronts, car showrooms, and strata complexes. Certified EWP operators, 0ppm pure-water reach poles up to 4 storeys, and $20M insurance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="w-full sm:w-auto bg-action-gold text-brand-navy hover:bg-action-gold/90 px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all text-center min-h-[48px] inline-flex items-center justify-center">
                            Get Commercial Glass Quote
                        </Link>
                        <a href="tel:0415174977" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-base transition-all text-center min-h-[48px] inline-flex items-center justify-center">
                            Call 0415 174 977
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST BADGES */}
            <section className="bg-white py-8 sm:py-10 -mt-6 relative z-10">
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
                                <div className="text-xs text-brand-slate">Commercial cover</div>
                            </div>
                        </ClickableBadge>

                        <ClickableBadge className="flex items-center gap-2.5 sm:gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-3.5 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
                                <HardHat className="w-5 h-5 text-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    EWP Certified
                                </div>
                                <div className="text-xs text-brand-slate">Working at heights</div>
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
                                <div className="text-xs text-brand-slate">Zero spots or residue</div>
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
                                <div className="text-xs text-brand-slate">Perth businesses</div>
                            </div>
                        </ClickableBadge>
                    </div>
                </div>
            </section>

            {/* ACCESS METHODS */}
            <section className="py-12 max-w-5xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="text-action-gold font-semibold uppercase mb-2 block tracking-wider text-xs">ADVANCED ACCESS CAPABILITIES</span>
                    <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">
                        High-Reach Commercial Window Cleaning Solutions
                    </h2>
                    <p className="text-brand-slate text-sm sm:text-base">
                        From ground-level retail shopfronts to 4-storey reach poles and cherry picker boom lifts, we have the specialized access equipment to clean every commercial pane safely.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {accessMethods.map((m, index) => {
                        const Icon = m.icon;
                        return (
                            <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-action-gold/10 text-action-gold flex items-center justify-center">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold text-brand-navy bg-white px-3 py-1 rounded-full border border-slate-200">
                                            {m.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-brand-navy mb-2">{m.title}</h3>
                                    <p className="text-sm text-brand-slate leading-relaxed">{m.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SHOWCASE BANNER IMAGE - TOYOTA DEALERSHIP */}
            <section className="py-4">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative h-[440px] sm:h-[540px] md:h-[640px] w-full rounded-2xl overflow-hidden shadow-md">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960134/commercial-window-cleaning_gzkvaj.jpg"
                            alt="Commercial high-reach window cleaning at Toyota dealership in Perth"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent flex items-end p-6 sm:p-8">
                            <div className="text-white">
                                <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">Commercial Showcase</span>
                                <h3 className="text-xl md:text-2xl font-bold">Spotless High-Reach Commercial Glazing & Showroom Windows</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMERCIAL GLASS SCOPE */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <span className="text-sm text-action-gold font-semibold uppercase mb-2 block tracking-wider text-xs">WHAT WE CLEAN</span>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">
                    Commercial Window Cleaning Services
                </h2>
                <p className="mb-10 text-brand-slate max-w-3xl">
                    Every commercial glazing job is executed with commercial-grade safety compliance, zero-residue deionised water, and hand-finished glass detailing.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {whatsInclude.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-6 h-6 text-action-gold" />
                                </div>
                                <h3 className="font-semibold text-lg text-brand-navy">{item.title}</h3>
                                <p className="text-brand-slate text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* DUAL CONTRACT ADVANTAGE - LINK TO JANITORIAL */}
            <section className="py-8 max-w-5xl mx-auto px-4">
                <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
                    <div>
                        <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-2">COMPLETE WORKPLACE CARE</span>
                        <h3 className="text-2xl font-bold mb-2">Need Internal Office Janitorial Cleaning Too?</h3>
                        <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                            Consolidate your exterior window washing with our dedicated <Link href="/services/commercial-cleaning" className="text-action-gold underline font-semibold hover:text-white">Commercial Cleaning & Office Janitorial Services</Link>. Get one invoice, one dedicated account manager, and save up to 20% on combined facility contracts.
                        </p>
                    </div>
                    <Link
                        href="/services/commercial-cleaning"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold px-6 py-3.5 rounded-full text-sm hover:bg-action-gold/90 transition-all flex-shrink-0 min-h-[48px]"
                    >
                        View Office Janitorial <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* REAL VALUE & BEFORE-AFTER SLIDER */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <span className="text-action-gold font-bold text-lg text-center mb-2 block uppercase tracking-wider text-xs">RESULTS THAT SPEAK</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        The Commercial Window Cleaning Transformation
                    </h2>
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        See the difference pure-water reach cleaning makes on commercial shopfronts, solar arrays, and high-exposure glazing.
                    </p>

                    <div className="max-w-3xl mx-auto w-full">
                        <BeforeAfterSlider
                            initial={50}
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.08_PM_1_x4ymo2.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960136/shope-gates-cleaning_euctx1.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="pt-5 pb-10 max-w-5xl mx-auto px-4">
                <FAQ
                    title="Frequently Asked Questions: Commercial Window Cleaning"
                    faqs={commercialWindowFAQs}
                />
            </section>

            {/* CTA */}
            <CTA title="Ready for Spotless Commercial Windows" />
        </div>
    );
};

export default CommercialWindowCleaning;
