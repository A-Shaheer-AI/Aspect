import React from "react";
import {
    Briefcase,
    SprayCan,
    Utensils,
    Layers,
    Trash2,
    ShieldCheck,
    Sparkles,
    Building2,
    Droplets,
    HardHat,
    PackageCheck,
    Dumbbell,
    AlertCircle,
    ClipboardCheck,
    Headphones,
    Lock,
    CheckCircle2,
    Stethoscope,
    Store,
    Warehouse,
    GraduationCap,
    Coffee,
} from "lucide-react";

export type FaqsType = {
    question: string;
    answer: React.ReactNode;
};

export const whatsInclude = [
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
        title: "Commercial Common Areas & Reception Foyers",
        description:
            "Immaculate presentation for entrance lobbies, waiting areas, guest seating, directory boards, and customer service counters to ensure an impressive first impression for every visitor.",
    },
];

export const specializedSolutions = [
    {
        icon: Layers,
        title: "Hard Floor Strip, Seal & Machine Buffing",
        badge: "Floor Restoration",
        description:
            "Deep stripping of old, discoloured wax and sealers on vinyl, terrazzo, linoleum, and commercial tiles. We apply multi-coat commercial-grade polymer sealers and high-speed buff for a durable, slip-resistant, mirror finish."
    },
    {
        icon: Droplets,
        title: "Commercial Carpet Hot Water Extraction",
        badge: "Steam Cleaning",
        description:
            "Industrial steam extraction penetrates deep into carpet fibers to remove ground-in Perth dust, coffee spills, and high-traffic discolouration. Extends commercial carpet lifespan and eliminates trapped odors and bacteria."
    },
    {
        icon: HardHat,
        title: "Builders & Fitout Handover Cleans",
        badge: "Post-Construction",
        description:
            "Specialist initial and final cleans for commercial fitouts, retail refurbishments, and office renovations. We remove plaster dust, silicone residue, paint splatter from glass, and polish all surfaces ready for immediate tenant handover."
    },
    {
        icon: PackageCheck,
        title: "Washroom Consumables & Hygiene Supply",
        badge: "Procurement & Restocking",
        description:
            "Turnkey washroom supply management. We deliver and restock premium jumbo toilet rolls, interfold hand towels, foaming antibacterial hand soaps, air freshener cartridges, and provide automated sanitary disposal units at competitive wholesale pricing."
    },
    {
        icon: Dumbbell,
        title: "Gym & Fitness Centre Deep Sanitisation",
        badge: "High-Hygiene Protocol",
        description:
            "Targeted antimicrobial sanitisation for fitness centers and wellness studios. Detailed disinfection of weight machines, dumbbells, spin bikes, rubber flooring, locker rooms, saunas, and shower tile grout descaling."
    },
    {
        icon: AlertCircle,
        title: "24/7 Rapid Emergency Response",
        badge: "Zero Callout Fee for Contract Clients",
        description:
            "Round-the-clock emergency deployment across Perth metro for unexpected commercial incidents — water leaks, plumbing back-ups, hazardous spills, or urgent sanitisation ahead of unannounced VIP inspections."
    }
];

export const qualityAssurancePillars = [
    {
        icon: ClipboardCheck,
        title: "Supervisory Audits & Digital Scoring",
        description: "Our dedicated area supervisors perform scheduled and surprise on-site quality inspections. Using digital audit checklists, we verify every workstation, restroom, and communal zone against your scope to guarantee cleaning standards never slip over time."
    },
    {
        icon: Headphones,
        title: "Dedicated Single Account Manager",
        description: "No call centers or runarounds. You are assigned a named, local Perth account manager who handles your roster, custom requests, consumable orders, and periodic reviews with direct phone and email contact."
    },
    {
        icon: Lock,
        title: "Strict Key Register & Security Protocol",
        description: "All staff sign confidentiality and non-disclosure agreements. We utilize coded key vaults, double-verified alarm arming procedures, and electronic sign-in/out logs so your premises remain completely secure."
    },
    {
        icon: CheckCircle2,
        title: "24-Hour Rectification Guarantee",
        description: "If any aspect of our service fails to meet your exact expectations, contact your account manager and an operative will return to rectify the area within 24 hours at zero additional charge."
    }
];

export const commercialTestimonials = [
    {
        quote: "Aspect transformed our West Perth corporate headquarters. Having our daily office cleaning, washroom hygiene, and high-reach external glass handled by a single dedicated team with one invoice has eliminated our contractor headaches.",
        author: "Marcus T.",
        role: "Head of Facilities",
        company: "West Perth Corporate Office",
        rating: 5
    },
    {
        quote: "Security and trustworthiness were our biggest concerns for after-hours cleaning. Aspect's cleaners are directly employed, police-cleared, and consistently arrive on schedule. Our showroom and customer lounges are spotless every morning.",
        author: "David R.",
        role: "Dealership Principal",
        company: "Automotive Showroom, Victoria Park",
        rating: 5
    },
    {
        quote: "We manage multiple strata apartment buildings across Subiaco and East Perth. Aspect handles our common lobbies, lifts, rubbish chutes, and exterior window washing with remarkable reliability. Their supervisor audits give us total peace of mind.",
        author: "Sarah L.",
        role: "Senior Strata Manager",
        company: "Strata Management Group WA",
        rating: 5
    }
];

export const industriesServed = [
    {
        icon: Briefcase,
        title: "Corporate Offices & CBD Suites",
        description: "Daily or weekly maintenance for commercial offices, law firms, financial institutions, and co-working hubs throughout Perth CBD, West Perth, and Subiaco."
    },
    {
        icon: Stethoscope,
        title: "Medical & Dental Clinics",
        description: "Rigorous terminal cleaning and hospital-grade sanitisation for GP practices, physiotherapy clinics, dental surgeries, and pathology waiting areas."
    },
    {
        icon: Building2,
        title: "Strata & Commercial Facilities",
        description: "Common area upkeep for strata companies, body corporates, and building managers — including entrance foyers, shared lifts, and stairwells."
    },
    {
        icon: Store,
        title: "Retail Showrooms & Dealerships",
        description: "Polished hard floors, dust-free merchandising displays, and crystal-clear shopfront glass that entices passers-by and elevates consumer perception."
    },
    {
        icon: Warehouse,
        title: "Industrial & Logistics Offices",
        description: "Heavy-duty cleaning for transport hubs, manufacturing annexes, site crib rooms, safety showers, and industrial administrative suites."
    },
    {
        icon: GraduationCap,
        title: "Childcare & Private Education",
        description: "Non-toxic, hypoallergenic sanitisation designed for early learning centres, kindergartens, and tutoring academies with police-cleared personnel."
    },
    {
        icon: Dumbbell,
        title: "Gyms & Fitness Centres",
        description: "High-frequency sweat sanitisation, rubber mat extraction, locker room steam disinfection, and anti-fungal treatment for commercial gyms."
    },
    {
        icon: Coffee,
        title: "Hospitality & Commercial Dining",
        description: "Front-of-house floor scrubbing, dining table sanitisation, bar wipe-downs, and degreasing for cafes, pubs, restaurants, and event venues."
    }
];

export const benefitsOfCommercialCleaning = [
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

export const whyAspectPoints = [
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

export const processSteps = [
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

export const commercialFAQs: FaqsType[] = [
    {
        question: "What does your Perth commercial office janitorial service include?",
        answer:
            "Our commercial janitorial service covers all aspects of workplace cleanliness: dusting and sanitising workstations and desks, deep cleaning and disinfecting restrooms, kitchen and breakroom hygiene, HEPA vacuuming of carpets, hard floor mopping, trash and recycling removal with fresh liners, high-touch point disinfection, and internal glass partition cleaning.",
    },
    {
        question: "Do you hire directly employed staff, or do you subcontract the cleaning out?",
        answer:
            "We directly employ, police-clear, and train our own cleaning personnel. We never broker, sell, or subcontract your cleaning contract to third-party operators. This guarantees consistent cleaners who become familiar with your security protocols, building quirks, and exact preferences.",
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
        question: "Do you supply restroom consumables, soap dispensers, and bin liners?",
        answer:
            "Yes. We can manage and supply all commercial washroom consumables at competitive wholesale rates — including multi-fold paper towels, luxury jumbo toilet rolls, antibacterial hand soap, urinal blocks, automatic sanitizer stations, and heavy-duty bin liners. Alternatively, we are happy to replenish using client-supplied stock.",
    },
    {
        question: "Do you offer floor strip and seal or commercial carpet steam cleaning?",
        answer:
            "Yes. In addition to daily and weekly janitorial cleaning, we provide specialized floor restoration services including hard floor machine stripping, multi-coat polymer sealing, high-speed buffing for vinyl and terrazzo, and commercial carpet hot water extraction (steam cleaning) to treat high-traffic pathways and stains.",
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
            "We service corporate offices and professional suites, medical and dental clinics, strata complexes, retail stores and car dealerships, industrial offices and warehouses, gyms, hospitality venues, childcare centres, and educational facilities across all Perth metropolitan suburbs.",
    },
];
