"use client";

import { useState } from "react";
import { Check, X, ArrowRight, Sparkles, Shield, Info, HelpCircle } from "lucide-react";
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
    essential: boolean | string;
    standard: boolean | string;
    supreme: boolean | string;
}

const comparisonRows: ComparisonRow[] = [
    {
        feature: "Cleaning Tier Level",
        description: "Standard soap & pure water vs intensive restorative chemical detailing",
        essential: "Basic Wash",
        standard: "Basic Wash",
        supreme: "Full Detailing",
    },
    {
        feature: "Exterior Glass Cleaning",
        description: "All external glass surfaces scrubbed and rinsed",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "100% Pure Deionised Water",
        description: "Purified zero-mineral water guarantees zero water spots or streaks",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "Exterior Frames & Sills Wiped",
        description: "Frame perimeter wiped clean of mud, dust, and spider webs",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "Spider Web & Surround Clearing",
        description: "Cobwebs removed from all window surrounds and corners",
        essential: true,
        standard: true,
        supreme: true,
    },
    {
        feature: "Interior Glass Cleaning",
        description: "Interior glass hand-washed with drop sheets and squeegeed spotless",
        essential: false,
        standard: true,
        supreme: true,
    },
    {
        feature: "Interior Sills & Frames Wiped",
        description: "Internal ledges, sills, and frame borders wiped clean",
        essential: false,
        standard: true,
        supreme: true,
    },
    {
        feature: "Flyscreens Dusted & Wiped",
        description: "Dust and airborne debris wiped down while screens remain in place",
        essential: false,
        standard: true,
        supreme: true,
    },
    {
        feature: "Flyscreens Removed & Deep Washed",
        description: "Screens taken off, thoroughly washed with water/solution, dried & refitted",
        essential: false,
        standard: false,
        supreme: true,
    },
    {
        feature: "Window Tracks & Sliders Deep Cleaned",
        description: "Channels vacuumed and detailed with brushes to remove caked-on dirt",
        essential: false,
        standard: false,
        supreme: true,
    },
    {
        feature: "Perth Bore Water & Mineral Descaling",
        description: "Specialist acid/mineral treatment dissolves stubborn calcium etching",
        essential: false,
        standard: false,
        supreme: true,
    },
    {
        feature: "Paint, Plaster, Render & Sticker Scraping",
        description: "Safety razor scrapers & 0000 bronze wool remove post-reno debris",
        essential: false,
        standard: false,
        supreme: true,
    },
    {
        feature: "Best Suited For",
        description: "Property condition and service requirement",
        essential: "Quick 2-3 mo. curb refresh",
        standard: "Routine 6-mo. home clean",
        supreme: "Pre-sale, post-reno or neglected",
    },
];

export default function PricingPackages() {
    const [selectedPkg, setSelectedPkg] = useState<{ name: string; price?: string } | null>(null);

    return (
        <>
            {/* Package Cards Grid */}
            <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-16">
                {packages.map((pkg) => {
                    const isPopular = pkg.popular;
                    const isPremium = pkg.premium;

                    return (
                        <div
                            key={pkg.name}
                            className={`rounded-3xl p-8 relative flex flex-col transition-all duration-300 ${
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
                                <div className="absolute top-0 right-8 -translate-y-1/2 bg-action-gold text-brand-navy px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5">
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
                                    className={`text-3xl font-heading font-bold mb-2 ${
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
                                    What's Included:
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

                                {/* Exclusions List (Ticks & Crosses) */}
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

            {/* Side-by-Side Inclusions Comparison Matrix */}
            <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 bg-slate-50/70 border-b border-slate-200">
                    <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">
                        DETAILED SPECIFICATION
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy mb-2">
                        Package Inclusions Comparison Matrix
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
                        See exactly how each tier differs. Essential and Standard operate on our <strong>Basic Wash</strong> protocol for routine dirt, while Supreme delivers <strong>Full Restorative Detailing</strong> for hard water bore stains, paint, and caked grime.
                    </p>
                </div>

                <div className="overflow-x-auto">
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

            {/* Package Selection Modal */}
            <PackageSelectionModal
                isOpen={!!selectedPkg}
                onClose={() => setSelectedPkg(null)}
                packageName={selectedPkg?.name ?? ""}
                packagePrice={selectedPkg?.price}
            />
        </>
    );
}
