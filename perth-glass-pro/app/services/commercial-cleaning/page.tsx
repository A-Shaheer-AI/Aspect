import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ClickableBadge from "@/components/ClickableBadge";
import { 
    Clock, 
    Shield, 
    BadgeCheck, 
    Star, 
    Sparkles, 
    Quote, 
    ArrowRight, 
    Phone, 
    ChevronsRight, 
    CheckCircle2,
    Users,
    FileText,
    ShieldCheck
} from "lucide-react";

import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BUSINESS } from "@/lib/config";
import {
    whatsInclude,
    specializedSolutions,
    qualityAssurancePillars,
    commercialTestimonials,
    industriesServed,
    benefitsOfCommercialCleaning,
    whyAspectPoints,
    processSteps,
    commercialFAQs,
    FaqsType
} from "./commercialCleaningData";

export const metadata: Metadata = {
    title: { absolute: "Commercial Cleaning & Office Janitorial Services Perth | Aspect" },
    description: "Reliable commercial office cleaning & janitorial services across Perth. Workstation hygiene, restroom sanitation, floor care, strata, and high-reach glass. 24/7 service, $20M insured.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/services/commercial-cleaning" }
};

const CommercialCleaning = () => {
    return (
        <div className="bg-white text-brand-slate">
            {/* Structured Data Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Commercial Cleaning & Office Janitorial Services",
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "Aspect Window Cleaning",
                            "telephone": "0426 996 192",
                            "priceRange": "$$",
                            "url": "https://aspectwindowcleaning.com.au",
                            "openingHours": "Mo-Su 00:00-23:59",
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "5.0",
                                "reviewCount": "43",
                                "bestRating": "5",
                                "worstRating": "1"
                            }
                        },
                        "areaServed": {
                            "@type": "State",
                            "name": "Western Australia"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Commercial Facility Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Commercial Office Janitorial Cleaning"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Commercial Hard Floor Strip & Seal"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Commercial Carpet Steam Cleaning & Extraction"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Washroom Consumables & Hygiene Management"
                                    }
                                }
                            ]
                        },
                        "url": "https://aspectwindowcleaning.com.au/services/commercial-cleaning"
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
                                "name": "Commercial Cleaning & Office Janitorial Services",
                                "item": "https://aspectwindowcleaning.com.au/services/commercial-cleaning"
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
            <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-20 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <span className="inline-flex items-center gap-2 bg-action-gold/20 text-action-gold border border-action-gold/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        <Clock className="w-3.5 h-3.5" /> 24/7 Availability Across Greater Perth
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight">
                        Commercial Office Cleaning & Janitorial Services Perth
                    </h1>
                    <p className="text-base md:text-xl text-slate-200 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Professional <strong>commercial cleaning Perth</strong> and office janitorial care, medical-grade hygiene, workstation sanitation, hard floor strip &amp; seal, and washroom supply. Tailored contracts designed around your operating hours with 100% directly employed staff.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="w-full sm:w-auto bg-action-gold text-brand-navy hover:bg-action-gold/90 px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all text-center min-h-[48px] inline-flex items-center justify-center">
                            Get Free Commercial Quote
                        </Link>
                        <a href="tel:0426996192" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-base transition-all text-center min-h-[48px] inline-flex items-center justify-center">
                            Call 0426 996 192
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
                                <div className="text-xs text-brand-slate">Fully protected</div>
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
                                <Clock className="w-5 h-5 text-action-gold" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    24/7 Operations
                                </div>
                                <div className="text-xs text-brand-slate">After-hours service</div>
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
                                <div className="text-xs text-brand-slate">43+ Verified Reviews</div>
                            </div>
                        </ClickableBadge>
                    </div>
                </div>
            </section>

            {/* PERMANENT IN-HOUSE STAFF GUARANTEE (IPS BENCHMARK) */}
            <section className="py-6 max-w-5xl mx-auto px-4">
                <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-action-gold/20 text-action-gold border border-action-gold/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <Users className="w-3.5 h-3.5" /> 100% In-House Trained Personnel
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-heading font-bold mb-3 text-white">
                                Dedicated Cleaners. Zero Subcontractors. Guaranteed.
                            </h3>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                                Unlike volume cleaning agencies that broker contracts out to unvetted third parties, Aspect directly employs, trains, police-clears, and insures every cleaner. You get a consistent, familiar team assigned directly to your facility who know your building&apos;s security routines, alarm systems, and individual cleaning preferences inside out.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2.5 w-full md:w-auto flex-shrink-0">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-white/10 px-4 py-2 rounded-xl border border-white/15">
                                <CheckCircle2 className="w-4 h-4 text-action-gold flex-shrink-0" />
                                <span>Police-cleared & background-verified</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-white/10 px-4 py-2 rounded-xl border border-white/15">
                                <CheckCircle2 className="w-4 h-4 text-action-gold flex-shrink-0" />
                                <span>Double-checked alarm & key register logs</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-white/10 px-4 py-2 rounded-xl border border-white/15">
                                <CheckCircle2 className="w-4 h-4 text-action-gold flex-shrink-0" />
                                <span>Same cleaners every visit — zero surprises</span>
                            </div>
                        </div>
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
                            From daily vacuuming, workstation sanitisation, and washroom replenishments to periodic deep cleans, carpet extractions, and hard floor strip & seal, our dedicated team handles every square metre with clinical attention to detail.
                        </p>
                    </div>
                    <div>
                        <p className="mb-4">
                            We pride ourselves on non-disruptive, after-hours flexibility. Our police-cleared personnel operate seamlessly around your staff, locking up and securing alarms with absolute diligence. Need exterior high-reach glass cleaning? Explore our dedicated <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-medium">commercial window cleaning</Link>, <Link href="/services/pressure-washing" className="text-action-gold hover:underline font-medium">high-pressure washing</Link>, and <Link href="/services/solar-panel-washing" className="text-action-gold hover:underline font-medium">solar panel washing</Link> across all 370+ suburbs in <Link href="/locations" className="text-action-gold hover:underline font-medium">Perth</Link>.
                        </p>
                        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                            <strong className="text-brand-navy block mb-1">Dual-Contract Efficiency:</strong>
                            Bundle your routine office janitorial schedule with our specialist <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-semibold">commercial high-reach window cleaning</Link> for unified invoicing, a single dedicated account manager, and substantial bundle savings of up to 20%. See our commercial transformations in our <Link href="/case-studies" className="text-action-gold hover:underline font-semibold">case studies</Link> or request a site tender via our <Link href="/contact" className="text-action-gold hover:underline font-semibold">contact page</Link>.
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

            {/* SPECIALIZED COMMERCIAL SOLUTIONS (IPS BENCHMARK) */}
            <section className="py-16 bg-slate-50 border-y border-slate-200">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-action-gold font-semibold uppercase mb-2 block tracking-wider text-xs">FACILITY SERVICES & MAINTENANCE</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
                            Specialized Commercial Cleaning Capabilities
                        </h2>
                        <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
                            Beyond routine surface wiping, we deliver heavy-duty commercial restoration, floor maintenance, and supply logistics across Greater Perth.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {specializedSolutions.map((sol, index) => {
                            const Icon = sol.icon;
                            return (
                                <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-4">
                                            <div className="w-11 h-11 rounded-xl bg-action-gold/10 flex items-center justify-center text-action-gold flex-shrink-0">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-navy bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                                {sol.badge}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-brand-navy mb-2.5">
                                            {sol.title}
                                        </h3>
                                        <p className="text-sm text-brand-slate leading-relaxed">
                                            {sol.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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

            {/* COMMERCIAL INDUSTRIES SERVED (EXPANDED TO 8 SECTORS) */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <span className="text-action-gold font-semibold mb-2 block uppercase tracking-wider text-xs text-center">FACILITIES & SECTORS</span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-4">
                    Industries & Commercial Properties We Serve
                </h2>
                <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                    Every commercial sector has unique security, hygiene, and compliance demands. We customise cleaning protocols for every site.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {industriesServed.map((ind, index) => {
                        const Icon = ind.icon;
                        return (
                            <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-action-gold/40 hover:shadow-md transition-all flex flex-col">
                                <div className="w-10 h-10 rounded-xl bg-action-gold/10 flex items-center justify-center text-action-gold mb-3">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-brand-navy mb-2">{ind.title}</h3>
                                <p className="text-xs sm:text-sm text-brand-slate leading-relaxed">
                                    {ind.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* QUALITY ASSURANCE & SUPERVISORY AUDITS PROTOCOL (IPS BENCHMARK) */}
            <section className="py-16 bg-brand-navy text-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-action-gold font-semibold uppercase mb-2 block tracking-wider text-xs">GOVERNANCE & ACCOUNTABILITY</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Quality Assurance & Supervisory Audits
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            How we maintain clinical standards week after week. We treat quality control as a measurable, systematic process.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {qualityAssurancePillars.map((pillar, index) => {
                            const Icon = pillar.icon;
                            return (
                                <div key={index} className="bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 rounded-2xl hover:border-action-gold/40 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-action-gold/20 text-action-gold flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                                            <p className="text-slate-300 text-sm leading-relaxed">{pillar.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* REAL VALUE */}
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
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.08_PM_1_x4ymo2.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771960136/shope-gates-cleaning_euctx1.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* COMMERCIAL CLIENT TESTIMONIALS (IPS BENCHMARK) */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="text-action-gold font-semibold uppercase mb-2 block tracking-wider text-xs">VERIFIED CLIENT PROOF</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
                            Trusted by Perth Commercial Facilities
                        </h2>
                        <p className="text-brand-slate text-sm sm:text-base leading-relaxed">
                            Read how our dedicated teams protect the presentation, hygiene, and security of commercial premises across Western Australia.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {commercialTestimonials.map((t, index) => (
                            <div key={index} className="bg-slate-50 border border-slate-200 p-6 sm:p-7 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
                                <div>
                                    <div className="flex items-center gap-1 text-action-gold mb-4">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-action-gold" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-brand-slate italic mb-6 leading-relaxed">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="border-t border-slate-200/80 pt-4">
                                    <div className="font-bold text-sm text-brand-navy">{t.author}</div>
                                    <div className="text-xs text-action-gold font-medium">{t.role}</div>
                                    <div className="text-xs text-brand-slate/80">{t.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY ASPECT */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="max-w-5xl mx-auto px-4">
                    <span className="text-action-gold font-bold text-lg text-center mb-2 block uppercase tracking-wider text-xs">WHY ASPECT</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        Why Perth Businesses Choose Aspect
                    </h2>
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        With 43+ 5-star reviews across Perth, Aspect Window Cleaning is the trusted name for professional, reliable commercial cleaning and office janitorial care that never cuts corners.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {whyAspectPoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition"
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
            <section className="py-16 bg-white">
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

            {/* COMMERCIAL TENDER / SITE WALKTHROUGH INQUIRY CARD */}
            <section className="py-12 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-2">COMMERCIAL SITE AUDIT & PROPOSAL</span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3">
                                Request a Free On-Site Commercial Walkthrough
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                Get an obligation-free facility assessment, tailored specification schedule, and transparent fixed-price quotation for your premises.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 text-center">
                                <Clock className="w-5 h-5 text-action-gold mx-auto mb-2" />
                                <div className="font-bold text-sm text-white">Flexible Rosters</div>
                                <div className="text-xs text-slate-400 mt-0.5">Daily, weekly or after-hours</div>
                            </div>
                            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 text-center">
                                <FileText className="w-5 h-5 text-action-gold mx-auto mb-2" />
                                <div className="font-bold text-sm text-white">Itemised Tender</div>
                                <div className="text-xs text-slate-400 mt-0.5">Transparent task checklist</div>
                            </div>
                            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 text-center">
                                <ShieldCheck className="w-5 h-5 text-action-gold mx-auto mb-2" />
                                <div className="font-bold text-sm text-white">Trial Available</div>
                                <div className="text-xs text-slate-400 mt-0.5">Zero lock-in trial period</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy hover:bg-action-gold/90 px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all min-h-[48px]"
                            >
                                Book On-Site Inspection <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="tel:0426996192"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-base transition-all min-h-[48px]"
                            >
                                <Phone className="w-4 h-4 text-action-gold" /> Call 0426 996 192
                            </a>
                        </div>
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

export default CommercialCleaning;
