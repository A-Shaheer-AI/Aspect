"use client";

import { useState } from "react";
import { Check, X, ArrowRight, Sparkles, Shield, Info, HelpCircle, Layers, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import PackageSelectionModal from "@/components/PackageSelectionModal";

interface PackageItem {
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

const packages: PackageItem[] = [
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
            "Flyscreens dusted and wiped down",
            "Cobweb removal around all window surrounds",
            "Basic Wash removes fingerprints, grime & grease",
            "90%+ finish standard ideal for routine maintenance",
        ],
        excludes: [
            "No hard water or Perth bore water mineral etching removal",
            "No paint overspray, plaster, render or tape scraping",
            "No deep track grime extraction (surface wipe only)",
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

interface ComparisonRow {
    feature: string;
    description: string;
    category: "Glass & Washing" | "Frames & Screens" | "Restoration & Detailing";
    essential: boolean | string;
    standard: boolean | string;
    supreme: boolean | string;
}

const comparisonRows: ComparisonRow[] = [
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
        standard: false,
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

export default function PricingPackages() {
    const [selectedPkg, setSelectedPkg] = useState<{ name: string; price: string } | null>(null);
    const [mobileActiveTier, setMobileActiveTier] = useState<"standard" | "essential" | "supreme">("standard");
    const [mobileViewMode, setMobileViewMode] = useState<"package" | "compare">("package");

    const activePackageData = packages.find(
        (p) => p.name.toLowerCase() === mobileActiveTier
    ) || packages[1];

    return (
        <div className="w-full">
            {/* Package Selection Modal */}
            <PackageSelectionModal
                isOpen={!!selectedPkg}
                onClose={() => setSelectedPkg(null)}
                packageName={selectedPkg?.name || ""}
                packagePrice={selectedPkg?.price}
            />

            {/* Core Package Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
                {packages.map((pkg) => {
                    const isPopular = pkg.popular;
                    const isPremium = pkg.premium;

                    return (
                        <div
                            key={pkg.name}
                            className={`rounded-3xl p-6 sm:p-8 relative flex flex-col transition-all duration-300 ${
                                isPopular
                                    ? "bg-brand-navy text-white shadow-2xl lg:-translate-y-4 border-2 border-action-gold/70"
                                    : isPremium
                                    ? "bg-white text-gray-900 border-2 border-action-gold shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                                    : "bg-white text-gray-900 border border-slate-200 shadow-sm hover:shadow-xl"
                            }`}
                        >
                            {/* Badges */}
                            {isPopular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-gold text-brand-navy px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider whitespace-nowrap shadow-md uppercase">
                                    ★ MOST POPULAR CHOICE
                                </div>
                            )}
                            {isPremium && (
                                <div className="absolute top-0 right-6 sm:right-8 -translate-y-1/2 bg-action-gold text-brand-navy px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5" /> RESTORATIVE DETAILING
                                </div>
                            )}

                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                                            isPopular
                                                ? "bg-white/15 text-action-gold"
                                                : isPremium
                                                ? "bg-amber-100 text-amber-900"
                                                : "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        {pkg.tier} Tier
                                    </span>
                                    <span
                                        className={`text-xs font-semibold ${
                                            isPopular ? "text-slate-300" : "text-slate-500"
                                        }`}
                                    >
                                        {pkg.badge}
                                    </span>
                                </div>
                                <h3
                                    className={`text-2xl sm:text-3xl font-heading font-bold mb-2 ${
                                        isPopular ? "text-white" : "text-brand-navy"
                                    }`}
                                >
                                    {pkg.name}
                                </h3>
                                <p
                                    className={`text-sm leading-relaxed ${
                                        isPopular ? "text-slate-200" : "text-slate-600"
                                    }`}
                                >
                                    {pkg.subtitle}
                                </p>
                            </div>

                            {/* Pricing Reference Cue */}
                            <div
                                className={`p-4 rounded-2xl mb-6 border ${
                                    isPopular
                                        ? "bg-white/10 border-white/15 text-white"
                                        : isPremium
                                        ? "bg-amber-50/70 border-amber-200/80 text-brand-navy"
                                        : "bg-slate-50 border-slate-200 text-brand-navy"
                                }`}
                            >
                                <div className="flex items-center justify-between text-sm font-semibold mb-1">
                                    <span className={isPopular ? "text-slate-300" : "text-slate-500"}>Single Storey:</span>
                                    <span className="text-base font-bold text-action-gold">{pkg.priceSingle}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <span className={isPopular ? "text-slate-300" : "text-slate-500"}>Double Storey:</span>
                                    <span className="text-base font-bold text-action-gold">{pkg.priceDouble}</span>
                                </div>
                            </div>

                            {/* Inclusions List */}
                            <div className="flex-1 mb-8">
                                <div
                                    className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                                        isPopular ? "text-action-gold" : "text-slate-700"
                                    }`}
                                >
                                    What&apos;s Included:
                                </div>
                                <ul className="space-y-3 mb-6">
                                    {pkg.includes.map((inc, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm leading-snug">
                                            <div
                                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                    isPopular
                                                        ? "bg-action-gold/20 text-action-gold"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                            </div>
                                            <span className={isPopular ? "text-slate-100" : "text-slate-800"}>
                                                {inc}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Exclusions List */}
                                {pkg.excludes.length > 0 && (
                                    <>
                                        <div
                                            className={`text-xs font-bold uppercase tracking-wider mb-3 pt-4 border-t ${
                                                isPopular
                                                    ? "border-white/10 text-slate-400"
                                                    : "border-slate-200 text-slate-500"
                                            }`}
                                        >
                                            Not Included (Requires Higher Tier):
                                        </div>
                                        <ul className="space-y-2.5">
                                            {pkg.excludes.map((exc, i) => (
                                                <li
                                                    key={i}
                                                    className={`flex items-start gap-3 text-xs sm:text-sm leading-snug ${
                                                        isPopular ? "text-slate-400" : "text-slate-500"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                            isPopular
                                                                ? "bg-rose-500/20 text-rose-300"
                                                                : "bg-rose-50 text-rose-500"
                                                        }`}
                                                    >
                                                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                                                    </div>
                                                    <span>{exc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => setSelectedPkg({ name: pkg.name, price: pkg.priceSingle })}
                                className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                                    isPopular
                                        ? "bg-action-gold text-brand-navy hover:bg-white hover:shadow-lg"
                                        : isPremium
                                        ? "bg-action-gold text-brand-navy hover:bg-brand-navy hover:text-white hover:shadow-lg"
                                        : "bg-brand-navy text-white hover:bg-action-gold hover:text-brand-navy"
                                }`}
                            >
                                <span>Book {pkg.name} Package</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Inclusions Comparison Section */}
            <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-8 bg-slate-50/70 border-b border-slate-200">
                    <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">
                        DETAILED SPECIFICATION
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-brand-navy mb-2">
                        Package Inclusions Comparison Matrix
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
                        See exactly how each tier differs. Essential and Standard operate on our <strong>Basic Wash</strong> protocol for routine dirt, while Supreme delivers <strong>Full Restorative Detailing</strong> for hard water bore stains, paint, and caked grime.
                    </p>
                </div>

                {/* ============================================================ */}
                {/* MOBILE VIEW (Dedicated responsive layout - zero side-scrolling) */}
                {/* ============================================================ */}
                <div className="md:hidden p-4 sm:p-6 bg-slate-50/40">
                    {/* View Switcher: By Package vs Compare All */}
                    <div className="flex bg-slate-200/80 p-1 rounded-xl mb-5 max-w-md mx-auto">
                        <button
                            onClick={() => setMobileViewMode("package")}
                            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                mobileViewMode === "package"
                                    ? "bg-white shadow-sm text-brand-navy"
                                    : "text-slate-600 hover:text-brand-navy"
                            }`}
                        >
                            <Layers className="w-3.5 h-3.5 text-action-gold" />
                            <span>Inspect By Package</span>
                        </button>
                        <button
                            onClick={() => setMobileViewMode("compare")}
                            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                mobileViewMode === "compare"
                                    ? "bg-white shadow-sm text-brand-navy"
                                    : "text-slate-600 hover:text-brand-navy"
                            }`}
                        >
                            <SlidersHorizontal className="w-3.5 h-3.5 text-action-gold" />
                            <span>Side-by-Side Cards</span>
                        </button>
                    </div>

                    {/* Mode 1: Inspect by Package (Segmented Tabs) */}
                    {mobileViewMode === "package" && (
                        <div>
                            {/* Segmented Package Selector Tabs */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {(["essential", "standard", "supreme"] as const).map((tierKey) => {
                                    const pkg = packages.find((p) => p.name.toLowerCase() === tierKey)!;
                                    const isActive = mobileActiveTier === tierKey;
                                    return (
                                        <button
                                            key={tierKey}
                                            onClick={() => setMobileActiveTier(tierKey)}
                                            className={`p-2.5 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center ${
                                                isActive
                                                    ? tierKey === "standard"
                                                        ? "bg-brand-navy text-white border-action-gold shadow-md"
                                                        : tierKey === "supreme"
                                                        ? "bg-amber-50 text-brand-navy border-action-gold shadow-md"
                                                        : "bg-slate-800 text-white border-slate-700 shadow-md"
                                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                            }`}
                                        >
                                            <span className="text-xs font-bold block truncate">
                                                {pkg.name} {pkg.popular ? "★" : pkg.premium ? "💎" : ""}
                                            </span>
                                            <span
                                                className={`text-[11px] font-semibold block mt-0.5 ${
                                                    isActive
                                                        ? "text-action-gold"
                                                        : "text-slate-500"
                                                }`}
                                            >
                                                {pkg.priceSingle}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Active Package Hero Card */}
                            <div
                                className={`p-5 rounded-2xl mb-4 border ${
                                    mobileActiveTier === "standard"
                                        ? "bg-brand-navy text-white border-action-gold shadow-md"
                                        : mobileActiveTier === "supreme"
                                        ? "bg-white text-brand-navy border-amber-300 shadow-sm"
                                        : "bg-white text-brand-navy border-slate-200 shadow-sm"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span
                                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            mobileActiveTier === "standard"
                                                ? "bg-white/20 text-action-gold"
                                                : mobileActiveTier === "supreme"
                                                ? "bg-amber-100 text-amber-900"
                                                : "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        {activePackageData.tier}
                                    </span>
                                    <span
                                        className={`text-xs font-semibold ${
                                            mobileActiveTier === "standard" ? "text-slate-300" : "text-slate-500"
                                        }`}
                                    >
                                        {activePackageData.badge}
                                    </span>
                                </div>
                                <h4
                                    className={`text-xl font-bold mb-1 ${
                                        mobileActiveTier === "standard" ? "text-white" : "text-brand-navy"
                                    }`}
                                >
                                    {activePackageData.name} Package Specification
                                </h4>
                                <p
                                    className={`text-xs leading-relaxed mb-3 ${
                                        mobileActiveTier === "standard" ? "text-slate-200" : "text-slate-600"
                                    }`}
                                >
                                    {activePackageData.subtitle}
                                </p>
                                <div className="flex items-center justify-between pt-3 border-t border-white/10 sm:border-slate-200 text-xs">
                                    <span>Single Storey: <strong className="text-action-gold">{activePackageData.priceSingle}</strong></span>
                                    <span>Double Storey: <strong className="text-action-gold">{activePackageData.priceDouble}</strong></span>
                                </div>
                            </div>

                            {/* 13 Features Clean Vertical Checklist */}
                            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
                                {comparisonRows.map((row, idx) => {
                                    const value = row[mobileActiveTier];
                                    const isIncluded = typeof value === "boolean" ? value : true;

                                    return (
                                        <div
                                            key={idx}
                                            className={`p-3.5 flex items-start gap-3 ${
                                                !isIncluded ? "bg-slate-50/50 opacity-75" : "bg-white"
                                            }`}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {typeof value === "boolean" ? (
                                                    value ? (
                                                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-6 h-6 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center">
                                                            <X className="w-3.5 h-3.5 stroke-[2.5]" />
                                                        </div>
                                                    )
                                                ) : (
                                                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-brand-navy text-action-gold">
                                                        {value}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span
                                                        className={`text-xs font-bold ${
                                                            isIncluded ? "text-brand-navy" : "text-slate-500 line-through"
                                                        }`}
                                                    >
                                                        {row.feature}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                                                            typeof value !== "boolean"
                                                                ? "bg-slate-100 text-slate-700"
                                                                : value
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-rose-50 text-rose-600"
                                                        }`}
                                                    >
                                                        {typeof value !== "boolean"
                                                            ? value
                                                            : value
                                                            ? "Included"
                                                            : "Not included"}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                                    {row.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Mobile Book Button for Active Tier */}
                            <div className="mt-4">
                                <button
                                    onClick={() =>
                                        setSelectedPkg({
                                            name: activePackageData.name,
                                            price: activePackageData.priceSingle,
                                        })
                                    }
                                    className="w-full py-3.5 bg-action-gold text-brand-navy font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-action-gold/90 cursor-pointer"
                                >
                                    <span>Select {activePackageData.name} ({activePackageData.priceSingle})</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Mode 2: Side-by-Side Comparison Cards (All 3 Tiers Side by Side per Feature) */}
                    {mobileViewMode === "compare" && (
                        <div className="space-y-3">
                            <div className="text-xs text-slate-500 text-center mb-2">
                                Comparing all 3 packages side-by-side for each service feature:
                            </div>

                            {comparisonRows.map((row, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
                                >
                                    <div className="mb-2.5">
                                        <span className="text-[10px] font-bold text-action-gold uppercase tracking-wider block mb-0.5">
                                            {row.category}
                                        </span>
                                        <h5 className="text-sm font-bold text-brand-navy leading-snug">
                                            {row.feature}
                                        </h5>
                                        <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                                            {row.description}
                                        </p>
                                    </div>

                                    {/* 3 Tier Status Badges Side-by-Side */}
                                    <div className="grid grid-cols-3 gap-1.5 pt-2.5 border-t border-slate-100">
                                        {/* Essential */}
                                        <div
                                            className={`p-2 rounded-xl text-center border ${
                                                row.essential === true
                                                    ? "bg-emerald-50/80 border-emerald-200 text-emerald-800"
                                                    : row.essential === false
                                                    ? "bg-slate-50 border-slate-200 text-slate-400"
                                                    : "bg-slate-100 border-slate-200 text-slate-800"
                                            }`}
                                        >
                                            <span className="text-[10px] font-semibold text-slate-500 block">Essential</span>
                                            <div className="mt-1 flex items-center justify-center">
                                                {typeof row.essential === "boolean" ? (
                                                    row.essential ? (
                                                        <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                                                    )
                                                ) : (
                                                    <span className="text-[10px] font-bold">{row.essential}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Standard (Most Popular) */}
                                        <div
                                            className={`p-2 rounded-xl text-center border ring-1 ${
                                                row.standard === true
                                                    ? "bg-amber-50/70 border-action-gold ring-action-gold/40 text-amber-950"
                                                    : row.standard === false
                                                    ? "bg-slate-50 border-slate-200 ring-transparent text-slate-400"
                                                    : "bg-brand-navy text-action-gold border-brand-navy ring-transparent"
                                            }`}
                                        >
                                            <span className="text-[10px] font-bold text-brand-navy block">
                                                Standard ★
                                            </span>
                                            <div className="mt-1 flex items-center justify-center">
                                                {typeof row.standard === "boolean" ? (
                                                    row.standard ? (
                                                        <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                                                    )
                                                ) : (
                                                    <span className="text-[10px] font-bold">{row.standard}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Supreme */}
                                        <div
                                            className={`p-2 rounded-xl text-center border ${
                                                row.supreme === true
                                                    ? "bg-emerald-50/80 border-emerald-200 text-emerald-800"
                                                    : row.supreme === false
                                                    ? "bg-slate-50 border-slate-200 text-slate-400"
                                                    : "bg-amber-100 border-amber-300 text-amber-900"
                                            }`}
                                        >
                                            <span className="text-[10px] font-semibold text-slate-500 block">Supreme 💎</span>
                                            <div className="mt-1 flex items-center justify-center">
                                                {typeof row.supreme === "boolean" ? (
                                                    row.supreme ? (
                                                        <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-slate-400 stroke-[2.5]" />
                                                    )
                                                ) : (
                                                    <span className="text-[10px] font-bold">{row.supreme}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ============================================================ */}
                {/* DESKTOP TABLE (Hidden on mobile, pristine on wide screens) */}
                {/* ============================================================ */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-100/60 text-xs sm:text-sm font-bold text-brand-navy">
                                <th className="p-4 sm:p-5 w-2/5">Service Feature</th>
                                <th className="p-4 sm:p-5 text-center w-1/5">Essential</th>
                                <th className="p-4 sm:p-5 text-center w-1/5 bg-brand-navy text-white">
                                    Standard <span className="block text-[10px] text-action-gold font-normal">Most Popular</span>
                                </th>
                                <th className="p-4 sm:p-5 text-center w-1/5">Supreme <span className="block text-[10px] text-amber-700 font-normal">Premium</span></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                            {comparisonRows.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/40 hover:bg-slate-50/80"}
                                >
                                    <td className="p-4 sm:p-5">
                                        <div className="font-bold text-brand-navy">{row.feature}</div>
                                        <div className="text-slate-500 text-[11px] sm:text-xs mt-0.5">{row.description}</div>
                                    </td>

                                    {/* Essential */}
                                    <td className="p-4 sm:p-5 text-center">
                                        {typeof row.essential === "boolean" ? (
                                            row.essential ? (
                                                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700">
                                                    <Check className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 text-rose-500">
                                                    <X className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                            )
                                        ) : (
                                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-800">
                                                {row.essential}
                                            </span>
                                        )}
                                    </td>

                                    {/* Standard */}
                                    <td className="p-4 sm:p-5 text-center bg-brand-navy/5">
                                        {typeof row.standard === "boolean" ? (
                                            row.standard ? (
                                                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700">
                                                    <Check className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 text-rose-500">
                                                    <X className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                            )
                                        ) : (
                                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-brand-navy text-white">
                                                {row.standard}
                                            </span>
                                        )}
                                    </td>

                                    {/* Supreme */}
                                    <td className="p-4 sm:p-5 text-center">
                                        {typeof row.supreme === "boolean" ? (
                                            row.supreme ? (
                                                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-700">
                                                    <Check className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                            ) : (
                                                <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50 text-rose-500">
                                                    <X className="w-4 h-4 stroke-[2.5]" />
                                                </div>
                                            )
                                        ) : (
                                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-action-gold text-brand-navy">
                                                {row.supreme}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t-2 border-slate-200 bg-slate-50">
                                <td className="p-4 sm:p-5 font-bold text-brand-navy">Book Package</td>
                                <td className="p-4 sm:p-5 text-center">
                                    <button
                                        onClick={() => setSelectedPkg({ name: "Essential", price: "From $159" })}
                                        className="px-3 sm:px-4 py-2 bg-slate-200 hover:bg-brand-navy hover:text-white rounded-lg text-xs font-bold text-brand-navy transition-colors cursor-pointer"
                                    >
                                        Select Essential
                                    </button>
                                </td>
                                <td className="p-4 sm:p-5 text-center bg-brand-navy/5">
                                    <button
                                        onClick={() => setSelectedPkg({ name: "Standard", price: "From $279" })}
                                        className="px-3 sm:px-4 py-2 bg-action-gold hover:bg-brand-navy hover:text-white rounded-lg text-xs font-bold text-brand-navy transition-colors cursor-pointer"
                                    >
                                        Select Standard
                                    </button>
                                </td>
                                <td className="p-4 sm:p-5 text-center">
                                    <button
                                        onClick={() => setSelectedPkg({ name: "Supreme", price: "From $479" })}
                                        className="px-3 sm:px-4 py-2 bg-brand-navy text-white hover:bg-action-gold hover:text-brand-navy rounded-lg text-xs font-bold transition-colors cursor-pointer"
                                    >
                                        Select Supreme
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
