export interface PackageItem {
    name: string;
    tier: string;
    badge: string;
    subtitle: string;
    priceSingle: string;
    priceDouble: string;
    popular?: boolean;
    premium?: boolean;
    includes: string[];
    excludes: string[];
}

export const packages: PackageItem[] = [
    {
        name: "Essential",
        tier: "Basic Wash",
        badge: "EXTERIOR ONLY",
        subtitle: "Quick exterior refresh to remove surface grime and restore street appeal.",
        priceSingle: "From $159",
        priceDouble: "From $279",
        popular: false,
        premium: false,
        includes: [
            "Exterior glass washed with 100% pure deionised water",
            "Streak-free spot-free finish (0ppm mineral-free water)",
            "Exterior window frames & sills wiped down",
            "Cobweb & spider web clearing around window frames",
            "Basic Wash lifts everyday dust, road film & pollen",
        ],
        excludes: [
            "No interior glass cleaning (exterior only)",
            "No flyscreen washing or deep scrub",
            "No window track or sliding channel vacuuming",
            "No heavy mineral stain, bore water or paint detailing",
        ],
    },
    {
        name: "Standard",
        tier: "Basic Wash",
        badge: "MOST POPULAR",
        subtitle: "Our signature full residential wash — inside and out for complete clarity.",
        priceSingle: "From $279",
        priceDouble: "From $499",
        popular: true,
        premium: false,
        includes: [
            "Both interior & exterior glass washed streak-free",
            "100% pure water exterior & hand squeegee interior",
            "External & internal frames and sills wiped clean",
            "Basic track wipe included (for maintained tracks)",
            "Flyscreens dusted and wiped down",
            "Cobweb removal around all window surrounds",
            "Basic Wash removes fingerprints, grime & grease",
            "90%+ finish standard ideal for routine maintenance",
        ],
        excludes: [
            "No hard water or Perth bore water mineral etching removal",
            "No paint overspray, plaster, render or tape scraping",
            "No heavy insect or compacted sand track extraction (available as add-on or in Supreme)",
        ],
    },
    {
        name: "Supreme",
        tier: "Full Detailing",
        badge: "PREMIUM RESTORATION",
        subtitle: "Intensive restorative detailing for windows with mineral deposits, paint, or neglect.",
        priceSingle: "From $479",
        priceDouble: "From $859",
        popular: false,
        premium: true,
        includes: [
            "Complete interior & exterior glass restorative detailing",
            "All flyscreens removed, deep washed & refitted",
            "Window tracks & sliding door channels vacuumed & detailed",
            "Perth bore water & hard water mineral stain descaling",
            "Paint overspray, plaster, render, silicone & sticker scraping",
            "Grade-0000 ultra-fine bronze/steel wool polishing",
            "Deep frame, sill & seal rejuvenation treatment",
            "Showroom 99%+ restorative finish for demanding properties",
        ],
        excludes: [],
    },
];

export interface ComparisonRow {
    feature: string;
    description: string;
    category: "Glass & Washing" | "Frames & Screens" | "Restoration & Detailing";
    essential: boolean | string;
    standard: boolean | string;
    supreme: boolean | string;
}

export const comparisonRows: ComparisonRow[] = [
    {
        feature: "Cleaning Tier Level",
        description: "Standard soap & pure water vs intensive restorative chemical detailing",
        category: "Glass & Washing",
        essential: "Basic Wash",
        standard: "Basic Wash",
        supreme: "Full Detailing",
    },
    {
        feature: "Exterior Glass Cleaning",
        description: "All external glass surfaces scrubbed and rinsed",
        category: "Glass & Washing",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "100% Pure Deionised Water",
        description: "Purified zero-mineral water guarantees zero water spots or streaks",
        category: "Glass & Washing",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "Exterior Frames & Sills Wiped",
        description: "Frame perimeter wiped clean of mud, dust, and spider webs",
        category: "Frames & Screens",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "Spider Web & Surround Clearing",
        description: "Cobwebs removed from all window surrounds and corners",
        category: "Frames & Screens",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "Interior Glass Cleaning",
        description: "Interior glass hand-washed with drop sheets and squeegeed spotless",
        category: "Glass & Washing",
        essential: false,
        standard: true,
        supreme: true,
    },
    {
        feature: "Interior Sills & Frames Wiped",
        description: "Internal ledges, sills, and frame borders wiped clean",
        category: "Frames & Screens",
        essential: false,
        standard: true,
        supreme: true,
    },
    {
        feature: "Flyscreens Dusted & Wiped",
        description: "Dust and airborne debris wiped down while screens remain in place",
        category: "Frames & Screens",
        essential: false,
        standard: true,
        supreme: true,
    },
    {
        feature: "Flyscreens Removed & Deep Washed",
        description: "Screens taken off, thoroughly washed with water/solution, dried & refitted",
        category: "Frames & Screens",
        essential: false,
        standard: false,
        supreme: true,
    },
    {
        feature: "Window Tracks & Channels Detailed",
        description: "Industrial HEPA vacuuming + detailing of accumulated grit, dead bugs & grime",
        category: "Restoration & Detailing",
        essential: false,
        standard: "Basic Wipe (Add-on for Deep)",
        supreme: true,
    },
    {
        feature: "Perth Bore Water & Mineral Descaling",
        description: "Specialist chemical treatment to dissolve hard water calcium & bore stain etching",
        category: "Restoration & Detailing",
        essential: false,
        standard: false,
        supreme: true,
    },
    {
        feature: "Paint, Plaster, Render & Silicone Scraping",
        description: "Professional glass razor scraping to eliminate post-renovation building debris",
        category: "Restoration & Detailing",
        essential: false,
        standard: false,
        supreme: true,
    },
    {
        feature: "Bronze/Steel Wool Glass Polish",
        description: "Ultra-fine Grade-0000 wool treatment restoring slick surface feel and light transmission",
        category: "Restoration & Detailing",
        essential: false,
        standard: false,
        supreme: true,
    },
];
