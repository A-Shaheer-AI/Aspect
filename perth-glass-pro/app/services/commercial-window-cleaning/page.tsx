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
    Stethoscope, 
    Store, 
    Warehouse, 
    GraduationCap, 
    Layers, 
    Utensils, 
    Trash2, 
    SprayCan 
} from "lucide-react";

import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type FaqsType = {
    question: string;
    answer: React.ReactNode;
}

export const metadata: Metadata = {
    title: { absolute: "Commercial Cleaning & Office Janitorial Services Perth | Aspect" },
    description: "Reliable commercial office cleaning & janitorial services across Perth. Workstation hygiene, restroom sanitation, floor care, strata, and high-reach glass. 24/7 service, $20M insured.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/services/commercial-window-cleaning" }
};

const whatsInclude = [
    {
        icon: Briefcase,
        title: "Office Workstations & Open-Plan Desks",
        description:
            "Complete surface sanitisation of individual desks, conference tables, monitor bezels, keyboards, mice, and desk telephones. We carefully work around cables, personal equipment, and sensitive documents.",
    },
    {
        icon: SprayCan,
        title: "Commercial Restroom & Washroom Deep Care",
        description:
            "Comprehensive cleaning and hospital-grade disinfection of toilet bowls, urinals, sinks, mirrors, and tile splashbacks. Includes restocking of consumables including hand soap, toilet tissue, and paper towels.",
    },
    {
        icon: Utensils,
        title: "Kitchen, Canteen & Staff Breakrooms",
        description:
            "Degreasing and sanitisation of kitchen countertops, food preparation areas, sink descaling, splashbacks, microwave interiors and exteriors, kettle stations, and exterior wipe-down of refrigerators and cabinets.",
    },
    {
        icon: Layers,
        title: "Commercial Floor Care & HEPA Vacuuming",
        description:
            "Commercial HEPA-filter vacuuming of carpets and runners to trap airborne allergens and dust. Hard floors, vinyl, tiles, and polished concrete are washed and disinfected using pH-balanced commercial floor solutions.",
    },
    {
        icon: Trash2,
        title: "Waste Removal & Recycling Management",
        description:
            "Emptying and relining of all individual desk bins, central office waste, and kitchen recycling stations. Bins are wiped down and sanitized to eliminate odours and prevent pest attraction.",
    },
    {
        icon: ShieldCheck,
        title: "High-Touch Surface Disinfection",
        description:
            "Focused antimicrobial wipe-downs on high-frequency infection transmission points — door handles, push-plates, light switches, elevator call buttons, handrails, and shared boardroom equipment.",
    },
    {
        icon: Sparkles,
        title: "Interior Glass Partitions & Meeting Rooms",
        description:
            "Streak-free cleaning of internal office partitions, glass boardroom dividers, balustrades, entry vestibules, and privacy screens to maintain an open, immaculate, and professional corporate atmosphere.",
    },
    {
        icon: Building2,
        title: "Exterior Commercial Glass & High-Reach Glazing",
        description:
            "Specialist commercial window cleaning using pure deionised water-fed reach poles up to 4 storeys and EWP cherry picker access for multi-storey facades, signages, and exterior retail glazing.",
    },
];

const benefitsOfCommercialCleaning = [
    {
        number: "01",
        title: "Improved First Impressions & Corporate Reputation",
        description:
            "Your workspace is a direct physical reflection of your brand's operational standards. A spotless reception, gleaming meeting room glass, and fresh restrooms communicate credibility, precision, and respect to prospective clients, partners, and top talent.",
    },
    {
        number: "02",
        title: "Enhanced Employee Productivity & Reduced Sick Days",
        description:
            "Common office surfaces host thousands of bacteria and viruses per square centimetre. Regular professional disinfection and HEPA vacuuming significantly reduce pathogen transmission, cutting preventable employee sick leave and improving focus.",
    },
    {
        number: "03",
        title: "Healthier Indoor Air Quality & Allergen Reduction",
        description:
            "Commercial HEPA filtration and thorough dusting eliminate fine airborne dust, pollen, mould spores, and carpet-trapped particulates. This provides a cleaner breathing environment, reducing headaches, allergy flare-ups, and afternoon fatigue.",
    },
    {
        number: "04",
        title: "Prolonged Facility & Asset Lifespan",
        description:
            "Abrasive dirt, salt air, and foot traffic prematurely degrade commercial carpets, vinyl flooring, and architectural glass. Systematic janitorial maintenance preserves fixtures and finishes, avoiding premature replacements and expensive restorations.",
    },
];

const whyAspectPoints = [
    {
        title: "Trained & Police-Cleared Dedicated Personnel",
        description:
            "Every Aspect commercial cleaner is rigorously trained, background-checked, and police-cleared. We maintain a consistent roster so you get familiar, trustworthy cleaners who understand the specific layout and security protocols of your facility.",
    },
    {
        title: "24/7 Flexible Scheduling Around Your Business",
        description:
            "We operate 24 hours a day, 7 days a week. Whether you need pre-dawn cleaning before staff arrive, evening after-hours cleans, or weekend maintenance, we design a schedule that ensures zero disruption to your daily operations.",
    },
    {
        title: "$20M Public Liability Cover & Full Compliance",
        description:
            "Complete peace of mind. We hold comprehensive $20M public liability insurance, complete WorkSafe WA compliance, strict SWMS (Safe Work Method Statements), and robust health and safety documentation for commercial premises.",
    },
    {
        title: "100% Satisfaction Guarantee & Account Management",
        description:
            "We believe in proactive quality control. Regular supervisory audits and clear communication channels ensure cleaning standards never slip over time. If any aspect fails to meet expectations, we rectify it within 24 hours without charge.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Site Walkthrough",
        description:
            "We visit your facility to inspect square meterage, high-traffic zones, surface types, and specific security or access requirements.",
    },
    {
        number: "02",
        title: "Customised Cleaning Scope",
        description:
            "You receive a transparent, tailored proposal detailing daily, weekly, or periodic scopes with itemised task checklists and fixed transparent pricing.",
    },
    {
        number: "03",
        title: "Seamless Induction & Kickoff",
        description:
            "Our police-cleared team undergoes site induction, confirms alarm and key codes, and delivers your first thorough deep clean.",
    },
    {
        number: "04",
        title: "Ongoing Quality Assurance",
        description:
            "Scheduled periodic inspections, proactive restocking management, and direct communication ensure your facility stays immaculate year-round.",
    },
];

const commercialFAQs: FaqsType[] = [
    {
        question: "What does your Perth commercial office janitorial service include?",
        answer:
            "Our commercial janitorial service covers all aspects of workplace cleanliness: dusting and sanitising workstations and desks, deep cleaning and disinfecting restrooms, kitchen and breakroom hygiene, HEPA vacuuming of carpets, hard floor mopping, trash and recycling removal with fresh liners, high-touch point disinfection, and internal glass partition cleaning.",
    },
    {
        question: "Can we bundle office janitorial cleaning with commercial window cleaning?",
        answer:
            "Yes! In fact, most of our commercial clients choose our combined service. Combining routine office janitorial cleaning with regular commercial window cleaning (internal glass and external pure-water pole wash) streamlines your contractor management into a single point of contact and saves up to 15-20% compared to separate contracts.",
    },
    {
        question: "What are your operating hours? Can you clean after-hours or on weekends?",
        answer:
            "We operate 24 hours a day, 7 days a week. Most corporate offices prefer cleaning after 5:30 PM on weekdays or during weekends so our team never interrupts staff meetings, telephone calls, or client visits. Early morning cleans (before 8:00 AM) and daytime janitorial day-porters are also available.",
    },
    {
        question: "How do you handle security, keys, and alarm systems?",
        answer:
            "Security and confidentiality are paramount. All Aspect cleaners are police-cleared, insured, and trained in commercial alarm arming/disarming procedures. We utilise strict key register logs and lockup checklists to ensure your facility is locked, alarmed, and secure after every service.",
    },
    {
        question: "Do you supply restroom consumables and bin liners?",
        answer:
            "Yes. We can manage and supply all commercial washroom consumables at competitive wholesale rates — including multi-fold paper towels, luxury jumbo toilet rolls, antibacterial hand soap, urinal blocks, and heavy-duty bin liners. Alternatively, we are happy to replenish using client-supplied stock.",
    },
    {
        question: "What is your colour-coded cross-contamination policy?",
        answer:
            "We adhere strictly to the Australian Commercial Cleaning Standard colour-coding system: Red for high-risk sanitary areas (toilets and urinals), Yellow for general washroom surfaces (sinks, mirrors, tiles), Green for kitchen and food preparation breakrooms, and Blue for general office desks and workstations. Microfibres and mop heads are laundered separately and never cross-used.",
    },
    {
        question: "Are your cleaning chemicals safe and environmentally friendly?",
        answer:
            "We prioritise biodegradable, non-toxic, and low-VOC cleaning solutions that are tough on bacteria but safe for employees and individuals with asthma or chemical sensitivities. For healthcare and high-infection zones, we utilise TGA-listed hospital-grade disinfectants.",
    },
    {
        question: "What types of commercial facilities do you service in Perth?",
        answer:
            "We service corporate offices and professional suites, medical and dental clinics, strata complexes, retail stores and car dealerships, industrial offices and warehouses, childcare centres, and educational facilities across all Perth metropolitan suburbs.",
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
                        "name": "Commercial Cleaning & Janitorial Services",
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
                                "name": "Commercial Cleaning & Janitorial Services",
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
                        "mainEntity": commercialFAQs.map((f) => ({
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
            <section className="bg-brand-navy text-white pt-28 pb-20 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <span className="inline-flex items-center gap-2 bg-action-gold/20 text-action-gold border border-action-gold/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        <Clock className="w-3.5 h-3.5" /> 24/7 Availability Across Greater Perth
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
                        Commercial Office Cleaning & Janitorial Services Perth
                    </h1>
                    <p className="text-base md:text-xl text-slate-200 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Comprehensive office janitorial care, medical-grade hygiene, workstation sanitation, and specialist high-reach commercial glass cleaning. Tailored contracts designed around your operating hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/pricing#estimator" className="w-full sm:w-auto bg-action-gold text-brand-navy hover:bg-action-gold/90 px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all">
                            Get Free Commercial Quote
                        </Link>
                        <a href="tel:0415174977" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-base transition-all">
                            Call 0415 174 977
                        </a>
                    </div>
                </div>
            </section>

            {/* TRUST BADGES */}
            <section className="bg-white py-10 -mt-6 relative z-10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <ClickableBadge type="insured" className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
                                <Shield className="w-5 h-5 text-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    $20M Insured
                                </div>
                                <div className="text-xs text-brand-slate">Fully protected</div>
                            </div>
                        </ClickableBadge>

                        <ClickableBadge type="police" className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
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

                        <ClickableBadge className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
                                <Clock className="w-5 h-5 text-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    24/7 Operations
                                </div>
                                <div className="text-xs text-brand-slate">After-hours service</div>
                            </div>
                        </ClickableBadge>

                        <ClickableBadge className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
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

            {/* ABOUT */}
            <section className="mt-5 py-12 max-w-5xl mx-auto px-4">
                <span className="text-action-gold font-semibold mb-2 block uppercase tracking-wider text-xs">ABOUT OUR COMMERCIAL CLEANING</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-left mb-6">
                    A Cleaner, Healthier & More Productive Workplace in Perth
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-brand-slate leading-relaxed">
                    <div>
                        <p className="mb-4">
                            Maintaining an immaculate commercial environment is essential for team health, employee morale, and customer confidence. At Aspect Window Cleaning, we provide dependable, top-tier commercial office cleaning and janitorial maintenance tailored precisely to your company&apos;s routine and operational demands.
                        </p>
                        <p>
                            From daily vacuuming, workstation sanitisation, and washroom replenishments to periodic deep cleans, carpet extractions, and multi-storey window washing, our dedicated team handles every square metre with clinical attention to detail.
                        </p>
                    </div>
                    <div>
                        <p className="mb-4">
                            We pride ourselves on non-disruptive, after-hours flexibility. Our police-cleared personnel operate seamlessly around your staff, locking up and securing alarms with absolute diligence. Explore our <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline font-medium">residential window cleaning</Link>, <Link href="/services/pressure-washing" className="text-action-gold hover:underline font-medium">high-pressure washing</Link>, and <Link href="/services/solar-panel-washing" className="text-action-gold hover:underline font-medium">solar panel washing</Link> across all 370+ suburbs in <Link href="/locations" className="text-action-gold hover:underline font-medium">Perth</Link>.
                        </p>
                        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                            <strong className="text-brand-navy block mb-1">Dual-Contract Efficiency:</strong>
                            Bundle your routine office janitorial schedule with our specialist commercial high-reach glass cleaning for unified invoicing, a single dedicated account manager, and substantial bundle savings. See our commercial transformations in our <Link href="/case-studies" className="text-action-gold hover:underline font-semibold">case studies</Link> or request a site tender via our <Link href="/contact" className="text-action-gold hover:underline font-semibold">contact page</Link>.
                        </div>
                    </div>
                </div>
            </section>

            {/* IMAGE */}
            <section className="py-4">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="relative h-[440px] sm:h-[540px] md:h-[640px] w-full rounded-2xl overflow-hidden shadow-md">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960134/commercial-window-cleaning_gzkvaj.jpg"
                            alt="Commercial office and high-reach glass cleaning at Toyota dealership in Perth"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent flex items-end p-6 sm:p-8">
                            <div className="text-white">
                                <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">Corporate Presentation</span>
                                <h3 className="text-xl md:text-2xl font-bold">Flawless Interior Workspaces & Spotless Exterior Glazing</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT'S INCLUDED - JANITORIAL & COMMERCIAL SCOPE */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <span className="text-sm text-action-gold font-semibold uppercase mb-2 block tracking-wider text-xs">COMPREHENSIVE JANITORIAL SCOPE</span>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">
                    What Our Commercial Cleaning Service Covers
                </h2>
                <p className="mb-10 text-brand-slate max-w-3xl">
                    Every visit covers the critical touchpoints, sanitation hotspots, and communal zones that staff and clients engage with daily.
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

            {/* STRICT COLOR-CODED CROSS-CONTAMINATION PROTOCOL */}
            <section className="bg-slate-900 text-white py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <span className="text-action-gold font-semibold uppercase mb-2 block tracking-wider text-xs text-center">INFECTION CONTROL STANDARDS</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
                        Strict Colour-Coded Hygiene Protocol
                    </h2>
                    <p className="text-center text-slate-300 max-w-3xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
                        Cross-contamination is the number one hygiene risk in commercial cleaning. To guarantee that bacteria from washrooms is never transferred to office desks or staff lunchrooms, we strictly enforce the Australian standard 4-colour system across all equipment and microfibre cloths.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-800/80 border-t-4 border-red-500 p-6 rounded-2xl">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-lg mb-4">
                                RED
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-white">Toilets & Urinals</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Exclusively reserved for toilet bowls, urinals, sanitary bins, and high-pathogen bathroom plumbing. Never used on sinks or vanity areas.
                            </p>
                        </div>

                        <div className="bg-slate-800/80 border-t-4 border-yellow-400 p-6 rounded-2xl">
                            <div className="w-10 h-10 rounded-lg bg-yellow-400/20 text-yellow-300 flex items-center justify-center font-bold text-lg mb-4">
                                YELLOW
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-white">Washrooms & Basins</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Dedicated for restroom vanity tops, washroom mirrors, handbasins, splashback tiles, and soap dispensers.
                            </p>
                        </div>

                        <div className="bg-slate-800/80 border-t-4 border-green-500 p-6 rounded-2xl">
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-lg mb-4">
                                GREEN
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-white">Kitchens & Breakrooms</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Strictly allocated for staff lunchrooms, food preparation benchtops, canteens, drinking sinks, microwaves, and kettles.
                            </p>
                        </div>

                        <div className="bg-slate-800/80 border-t-4 border-blue-500 p-6 rounded-2xl">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg mb-4">
                                BLUE
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-white">General Office & Desks</h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Used for computer workstations, keyboards, monitors, boardroom tables, reception desks, and communal filing areas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMERCIAL INDUSTRIES SERVED */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <span className="text-action-gold font-semibold mb-2 block uppercase tracking-wider text-xs text-center">FACILITIES & SECTORS</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-4">
                    Industries & Commercial Properties We Serve
                </h2>
                <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                    Every commercial sector has unique security, hygiene, and compliance demands. We customise cleaning protocols for every site.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <Briefcase className="w-8 h-8 text-action-gold mb-3" />
                        <h3 className="text-lg font-bold text-brand-navy mb-2">Corporate Offices & CBD Suites</h3>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Daily or weekly maintenance for commercial offices, law firms, financial institutions, and co-working hubs throughout Perth CBD, West Perth, and Subiaco.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <Stethoscope className="w-8 h-8 text-action-gold mb-3" />
                        <h3 className="text-lg font-bold text-brand-navy mb-2">Medical & Dental Clinics</h3>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Rigorous terminal cleaning and hospital-grade sanitisation for GP practices, physiotherapy clinics, dental surgeries, and pathology waiting areas.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <Building2 className="w-8 h-8 text-action-gold mb-3" />
                        <h3 className="text-lg font-bold text-brand-navy mb-2">Strata & Commercial Facilities</h3>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Common area upkeep for strata companies, body corporates, and building managers — including entrance foyers, shared lifts, and stairwells.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <Store className="w-8 h-8 text-action-gold mb-3" />
                        <h3 className="text-lg font-bold text-brand-navy mb-2">Retail Showrooms & Dealerships</h3>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Polished hard floors, dust-free merchandising displays, and crystal-clear shopfront glass that entices passers-by and elevates consumer perception.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <Warehouse className="w-8 h-8 text-action-gold mb-3" />
                        <h3 className="text-lg font-bold text-brand-navy mb-2">Industrial & Logistics Offices</h3>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Heavy-duty cleaning for transport hubs, manufacturing annexes, site crib rooms, safety showers, and industrial administrative suites.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <GraduationCap className="w-8 h-8 text-action-gold mb-3" />
                        <h3 className="text-lg font-bold text-brand-navy mb-2">Childcare & Private Education</h3>
                        <p className="text-sm text-brand-slate leading-relaxed">
                            Non-toxic, hypoallergenic sanitisation designed for early learning centres, kindergartens, and tutoring academies with police-cleared personnel.
                        </p>
                    </div>
                </div>
            </section>

            {/* REAL BENEFITS */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <span className="text-action-gold font-bold text-lg text-center mb-2 block uppercase tracking-wider text-xs">WHY IT MATTERS</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        The Real Value of a Professionally Cleaned Workplace
                    </h2>
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Cleaning your workplace isn&apos;t just routine maintenance - it directly impacts your team&apos;s productivity, your clients&apos; confidence, and the long-term condition of your premises.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {benefitsOfCommercialCleaning.map((benefit) => (
                            <div key={benefit.number} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                                <div className="text-action-gold font-bold text-xl mb-2">{benefit.number}</div>
                                <h3 className="font-semibold text-lg text-brand-navy mb-2">{benefit.title}</h3>
                                <p className="text-brand-slate">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-3xl mx-auto w-full">
                        <BeforeAfterSlider
                            initial={50}
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.08_PM_1_x4ymo2.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960136/shope-gates-cleaning_euctx1.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* WHY ASPECT */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <span className="text-action-gold font-bold text-lg text-center mb-2 block uppercase tracking-wider text-xs">WHY ASPECT</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        Why Perth Businesses Choose Aspect
                    </h2>
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        With hundreds of 5-star reviews across Perth, Aspect Window Cleaning is the trusted name for professional, reliable commercial cleaning and office janitorial care that never cuts corners.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {whyAspectPoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                            >
                                <h3 className="text-action-gold font-bold text-xl mb-2">
                                    {point.title}
                                </h3>
                                <p className="text-brand-slate">
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR PROCESS */}
            <section className="py-16 bg-brand-snow">
                <div className="max-w-5xl mx-auto px-4">
                    <span className="text-action-gold font-semibold uppercase mb-2 text-center block uppercase tracking-wider text-xs">OUR PROCESS</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        How Our Commercial Cleaning Works
                    </h2>
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Simple, hassle-free, and built around your business schedule - from your initial walkthrough to a consistently pristine workplace.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.number} className="text-center">
                                <div className="w-12 h-12 rounded-full bg-action-gold text-brand-navy font-bold text-xl flex items-center justify-center mx-auto mb-4">
                                    {step.number}
                                </div>
                                <h3 className="font-bold text-brand-navy mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-brand-slate leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="pt-5 pb-10 max-w-5xl mx-auto px-4">
                <FAQ
                    title="Frequently Asked Questions: Commercial Office & Janitorial Cleaning"
                    faqs={commercialFAQs}
                />
            </section>

            {/* CTA */}
            <CTA title="Ready to Upgrade Your Commercial Cleaning" />
        </div>
    );
};

export default CommercialWindowCleaning;
