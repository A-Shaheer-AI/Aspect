"use client";

import { useState } from "react";
import { openCertificateModal } from "@/components/CertificateModalWrapper";
import { Phone, Star, Shield, Droplets, Zap, Building2, Tag, ChevronLeft, ChevronRight, Camera, Check, ArrowRight, Sparkles, Eye, X, CheckCircle2 } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import { useGmb } from "@/components/GmbProvider";
import Link from "next/link";
import Image from "next/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { sendLeadEmail } from "../actions/send-email";
import { trackFormCompleted } from "@/hooks/useGtm";
import GoogleReviews from "@/components/GoogleReviews";
import { getLeadAttribution } from "@/lib/attribution";

import { LeadForm } from "@/components/landing/LandingLeadForm";
import { QuoteModal } from "@/components/landing/LandingQuoteModal";
import { ScrollAutoplayVideo } from "@/components/landing/ScrollAutoplayVideo";
import { FreeTrialForm } from "@/components/landing/FreeTrialForm";
import { InclusionCard, InclusionDetailModal } from "@/components/landing/LandingInclusions";
import { LandingPackageModal } from "@/components/landing/LandingPackageModal";
import {
    whatsInclude,
    InclusionItem,
    processSteps,
    windowCleaningReviews,
    galleryImages,
} from "@/components/landing/landingData";

type FormDataType = {
    name: string;
    phone: string;
    suburb: string;
    promo?: string;
};

export default function WindowCleaningAdsPage() {
    const gmb = useGmb();
    const [modalOpen, setModalOpen] = useState(false);
    const [isDoubleStorey, setIsDoubleStorey] = useState(false);
    const [activeDiffTab, setActiveDiffTab] = useState<"see" | "feel">("see");
    const [activeSliderJob, setActiveSliderJob] = useState<"residential" | "commercial" | "tracks">("residential");
    const [trackViewMode, setTrackViewMode] = useState<"split" | "slider">("split");
    const [includeTracks, setIncludeTracks] = useState(false);
    const [showPromo, setShowPromo] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollPopupShown, setScrollPopupShown] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({ name: "", phone: "", suburb: "", promo: "", });
    const [submitted, setSubmitted] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState<{name: string, price: string} | null>(null);
    const [selectedInclusion, setSelectedInclusion] = useState<InclusionItem | null>(null);

    /*  Auto-scroll popup disabled to comply with Google Ads Landing Page Experience guidelines
        (Interstitials and unexpected modals triggered on scroll penalize Quality Score).
        Modals remain fully accessible via user click triggers. */

    const openRegularModal = () => {
        setShowPromo(false);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const attribution = getLeadAttribution("Landing Page - Hero Quote Form");
            const combinedMessage = `${formData.promo || ""}${includeTracks ? " | Deep Track Restoration Add-On Requested" : ""}`.trim();
            const result = await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                suburb: formData.suburb,
                message: combinedMessage || undefined,
                ...attribution,
            });
            if (result.success) {
                trackFormCompleted();
                setSubmitted(true);
            }
        } catch (e) {
            console.error(e);
        }
        if (formData.name && formData.phone && formData.suburb) setSubmitted(true);
    };

    const NAVY = "#07077E";
    const YELLOW = "#FFE54D";

    return (
        <>
            {/*  MODAL  */}
            <QuoteModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                submitted={submitted}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                showPromo={showPromo}
                includeTracks={includeTracks}
                setIncludeTracks={setIncludeTracks}
            />

            
            {/* ZERO-JS EMERGENCY CLICK-TO-CALL BANNER */}
            <noscript>
                <div className="bg-amber-400 text-[#07077E] px-4 py-3.5 text-center font-bold text-sm sm:text-base border-b-2 border-[#07077E] sticky top-0 z-[60] shadow-lg">
                    <span>⚡ Need fast window cleaning in Perth? Call us directly: </span>
                    <a href={`tel:${BUSINESS.phoneRaw}`} className="underline font-black hover:text-black">
                        {BUSINESS.phone}
                    </a>
                    <span> (Available 7 Days • Fast Quotes by Phone)</span>
                </div>
            </noscript>

            {/* 🔹🔹🔹 SECTION 1: HERO  🔹🔹🔹 */}
            <section
                id="hero"
                className="relative min-h-screen flex flex-col items-center justify-center md:px-5 pb-10 text-white bg-cover bg-center scroll-mt-20
  bg-[linear-gradient(160deg,rgba(10,22,40,0.85)_0%,rgba(15,37,69,0.88)_60%,rgba(19,48,96,0.92)_100%),url('/assets/landing-hero-bg-mobile.webp')]
  md:bg-[linear-gradient(160deg,rgba(10,22,40,0.82)_0%,rgba(15,37,69,0.85)_60%,rgba(19,48,96,0.90)_100%),url('/assets/landing-hero-bg.webp')]"
                style={{ backgroundColor: "#0A1628" }}
            >

                {/* HERO BODY */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1300px] mx-auto items-center gap-12 px-5 pb-10 pt-6">

                    {/* LEFT SIDE: BADGE, IMAGES, CTA */}
                    <div className="flex flex-col items-start text-left text-white lg:pr-8 w-full max-w-xl mx-auto lg:max-w-none">
                        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm mx-auto lg:mx-0 self-center lg:self-start">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="uppercase tracking-wider text-[11px] sm:text-xs text-white/95 font-medium">
                                Same-week booking available
                            </span>
                        </div>

                        {/* MOBILE HEADING (Hidden on desktop) */}
                        <div className="lg:hidden text-center text-white mb-8 w-full">
                            <h2 className="mb-4 leading-none font-black text-white" style={{ fontSize: "clamp(32px,4vw,56px)", letterSpacing: "1px" }}>
                                Perth&apos;s #1
                                <br />
                                <span style={{ color: YELLOW }}>Window Cleaners</span>
                            </h2>
                            <p className="w-full text-base sm:text-lg font-medium text-white/95 leading-relaxed mx-auto max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                                Next-Day Availability. Commercial-Grade Pure Water Cleaning for Homes &amp; Businesses.
                            </p>
                        </div>

                        {/* IMAGES GALLERY: Scrollable on mobile, 3x2 on desktop */}
                        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-3 lg:gap-4 pb-4 lg:pb-0 snap-x mb-8 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <style>{`
                                .snap-x::-webkit-scrollbar { display: none; }
                            `}</style>
                            {galleryImages.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => { setCurrentImageIndex(index); setGalleryOpen(true); }}
                                    className="relative w-48 h-36 lg:w-full lg:aspect-[4/3] lg:h-auto flex-shrink-0 snap-center rounded-xl overflow-hidden shadow-lg border border-white/20 hover:scale-105 cursor-pointer transition-all duration-300"
                                >
                                    <Image
                                        src={img.thumb}
                                        alt={`Recent Work ${index + 1}`}
                                        fill
                                        sizes="(max-width: 1024px) 192px, 33vw"
                                        priority={index === 0}
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-md mx-auto lg:mx-0">
                            {[ { icon: "\uD83D\uDEE1\uFE0F", text: "$20M Insured" }, { icon: "🏅", text: "Police Cleared" }, { icon: "💧", text: "Pure Water Tech" }, { icon: "\u2B50", text: `${gmb.rating} Google Reviews` } ].map((b) => 
                                (() => {
                                    const isInsured = b.text.includes("Insured");
                                    const isPolice = b.text.includes("Police");
                                    const Component = (isInsured || isPolice) ? "button" : "span";
                                    const clickHandler = isInsured ? () => openCertificateModal('insured') : (isPolice ? () => openCertificateModal('police') : undefined);
                                    
                                    return (
                                        <Component
                                            key={b.text}
                                            onClick={clickHandler}
                                            className={"flex items-center justify-center gap-2 rounded-full px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white/95 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 shadow-sm transition-all duration-200 " + ((isInsured || isPolice) ? "hover:scale-105 active:scale-95 cursor-pointer hover:border-white/40" : "")}
                                        >
                                            <span className="text-base sm:text-lg">{b.icon}</span> <span className="whitespace-nowrap">{b.text}</span>
                                        </Component>
                                    );
                                })()
)}
                        </div>
                    </div>

                    {/* RIGHT SIDE: HEADING, DESC & FORM */}
                    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto lg:max-w-[480px] lg:ml-auto lg:mr-0">

                        <div className="hidden lg:block text-left text-white">
                            <h1 className="mb-4 leading-none font-black text-white" style={{ fontSize: "clamp(36px,4vw,56px)", letterSpacing: "1px" }}>
                                Window Cleaning Perth
                                <br />
                                <span style={{ color: YELLOW }}>Residential &amp; Commercial</span>
                            </h1>

                            <p className="w-full text-base sm:text-lg font-medium text-white/95 leading-relaxed mx-auto lg:mx-0 max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                                Professional <strong>window cleaning Perth</strong> with next-day availability. Commercial-grade pure water cleaning for homes and businesses.
                            </p>
                        </div>

                        {/* LEAD FORM */}
                        <div id="quote" className="rounded-3xl p-5 shadow-2xl w-full bg-white border border-gray-100 mx-auto scroll-mt-24">
                            <h2 className="mb-2 font-black text-xl leading-tight text-center" style={{ color: NAVY }}>
                                Ready for Spotless Windows?
                            </h2>
                            <p className="mb-5 text-xs text-center" style={{ color: "#888" }}>
                                We&apos;ll reply with a fast quote within 60 minutes.
                            </p>
                            <LeadForm
                                submitted={submitted}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={handleSubmit}
                                showPromo={false}
                                includeTracks={includeTracks}
                                setIncludeTracks={setIncludeTracks}
                            />
                        </div>

                    </div>
                </div>
            </section>

            
{/* 🔹🔹🔹 SECTION 2: STATS STRIP  🔹🔹🔹 */}
            <section id="stats" className="scroll-mt-20" style={{ background: YELLOW }}>
                <div className="mx-auto grid max-w-4xl grid-cols-4">
                    {[ { num: "100+", label: "Happy Clients" }, { num: `${gmb.rating}\u2B50`, label: "Google Rating" }, { num: "$20M", label: "Insured" }, { num: "24hr", label: "Response Time" } ].map((s, i) => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center justify-center py-5 text-center"
                            style={{ borderRight: i < 3 ? `1px solid rgba(7,7,126,0.15)` : "none" }}
                        >
                            <span className="leading-none font-black" style={{ fontSize: "clamp(18px,4vw,34px)", color: NAVY }}>
                                {s.num}
                            </span>
                            <span className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(7,7,126,0.55)" }}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🔹🔹🔹 SECTION 3: PRICING PACKAGES (HIGH-INTENT GOOGLE ADS CRO) 🔹🔹🔹 */}
            <section id="pricing" className="py-16 bg-white px-5 border-b border-gray-100 scroll-mt-20 relative">
                <span id="packages" className="absolute -top-20 invisible pointer-events-none" />
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Clear, Transparent Pricing</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">We don't hide our rates. Select your home type below for our starting residential packages. Click a package to book now.</p>
                    
                    <div className="flex justify-center mb-10">
                        <div className="bg-gray-100 p-1 rounded-full flex gap-1">
                            <button 
                                onClick={() => setIsDoubleStorey(false)} 
                                className={"px-6 py-2 rounded-full font-bold text-sm transition-all " + (!isDoubleStorey ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-gray-700 cursor-pointer")}
                            >
                                Single Storey
                            </button>
                            <button 
                                onClick={() => setIsDoubleStorey(true)} 
                                className={"px-6 py-2 rounded-full font-bold text-sm transition-all " + (isDoubleStorey ? "bg-brand-navy text-white shadow-sm" : "text-gray-500 hover:text-gray-700 cursor-pointer")}
                            >
                                Double Storey
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        {/* Essential Package */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedPkg({ name: "Essential", price: isDoubleStorey ? "Starting From $279" : "Starting From $159" })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedPkg({ name: "Essential", price: isDoubleStorey ? "Starting From $279" : "Starting From $159" });
                                }
                            }}
                            className="p-6 sm:p-7 border border-slate-200 rounded-3xl shadow-sm bg-gray-50 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-navy cursor-pointer group select-none relative"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700">
                                        Basic Wash Tier
                                    </span>
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Exterior Only
                                    </span>
                                </div>
                                <h3 className="font-bold text-2xl text-brand-navy mb-1.5 group-hover:text-action-gold transition-colors">
                                    Essential
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                    Quick exterior refresh to lift surface grime and restore street appeal.
                                </p>

                                <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 mb-5">
                                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">Starting From</span>
                                    <p className="text-3xl font-black text-brand-navy transition-all duration-300">
                                        {isDoubleStorey ? "From $279" : "From $159"}
                                    </p>
                                </div>

                                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-700">
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>100% pure deionised water exterior wash</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Spot-free, streak-free mineral-free dry</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Exterior window frames & sills wiped</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Cobweb clearing around all frames</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 bg-slate-200 text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-all shadow-sm">
                                <span>Book Essential Package</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* Standard Package (MOST POPULAR) */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedPkg({ name: "Standard", price: isDoubleStorey ? "Starting From $499" : "Starting From $279" })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedPkg({ name: "Standard", price: isDoubleStorey ? "Starting From $499" : "Starting From $279" });
                                }
                            }}
                            className="p-6 sm:p-7 border-2 border-action-gold rounded-3xl shadow-xl bg-brand-navy text-white relative transform md:-translate-y-3 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer group select-none"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-gold text-brand-navy px-4 py-1 rounded-full text-xs font-extrabold tracking-wider shadow-md whitespace-nowrap uppercase">
                                ★ MOST POPULAR CHOICE
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3 mt-1">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-action-gold">
                                        Basic Wash Tier
                                    </span>
                                    <span className="text-xs font-semibold text-brand-water uppercase tracking-wider">
                                        Inside & Out
                                    </span>
                                </div>

                                <h3 className="font-bold text-2xl text-white mb-1.5 group-hover:text-action-gold transition-colors">
                                    Standard
                                </h3>
                                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                                    Complete clarity inside and out — our signature full home residential clean.
                                </p>

                                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 mb-5">
                                    <span className="text-xs font-semibold text-slate-300 block mb-0.5">Starting From</span>
                                    <p className="text-3xl font-black text-action-gold transition-all duration-300">
                                        {isDoubleStorey ? "From $499" : "From $279"}
                                    </p>
                                </div>

                                <div className="space-y-2.5 mb-5 text-xs sm:text-sm text-slate-200">
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-action-gold shrink-0 mt-0.5" />
                                        <span>Both interior & exterior glass washed</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-action-gold shrink-0 mt-0.5" />
                                        <span>Pure water exterior + precision squeegee inside</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-action-gold shrink-0 mt-0.5" />
                                        <span>External & internal frames and sills wiped</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-action-gold shrink-0 mt-0.5" />
                                        <span>Basic track wipe included (for maintained tracks)</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-action-gold shrink-0 mt-0.5" />
                                        <span>Flyscreens removed, dusted & refitted</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-action-gold shrink-0 mt-0.5" />
                                        <span>Full spider & cobweb surround removal</span>
                                    </div>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-[11px] text-slate-200 leading-snug mb-5">
                                    💡 <strong className="text-action-gold">Track Notice:</strong> Basic wipe included for maintained tracks. Heavy insect debris, compacted sand, or neglected tracks require our Deep Track Add-On or Supreme package.
                                </div>
                            </div>

                            <div className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 bg-action-gold text-brand-navy group-hover:bg-white transition-all shadow-md">
                                <span>Book Standard Package</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* Supreme Package (PREMIUM) */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedPkg({ name: "Supreme", price: isDoubleStorey ? "Starting From $859" : "Starting From $479" })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedPkg({ name: "Supreme", price: isDoubleStorey ? "Starting From $859" : "Starting From $479" });
                                }
                            }}
                            className="p-6 sm:p-7 border-2 border-action-gold rounded-3xl bg-white relative flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group select-none shadow-[0_0_20px_rgba(251,191,36,0.25)]"
                        >
                            <div className="absolute top-0 right-6 -translate-y-1/2 bg-action-gold text-brand-navy px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" /> Restorative Detailing
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3 mt-1">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                                        Full Detailing
                                    </span>
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Premium Restoration
                                    </span>
                                </div>

                                <h3 className="font-bold text-2xl text-brand-navy mb-1.5 group-hover:text-action-gold transition-colors">
                                    Supreme
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                    Intensive restorative detailing for bore water stains, paint, and neglected glass.
                                </p>

                                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-5">
                                    <span className="text-xs font-semibold text-slate-500 block mb-0.5">Starting From</span>
                                    <p className="text-3xl font-black text-brand-navy transition-all duration-300">
                                        {isDoubleStorey ? "From $859" : "From $479"}
                                    </p>
                                </div>

                                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-700">
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Complete restorative interior & exterior clean</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Tracks & sliding channels vacuumed & detailed</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Perth bore water & mineral stain descaling</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Paint overspray, plaster, render & sticker scraping</span>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>Grade-0000 bronze wool restorative polishing</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 bg-action-gold text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-all shadow-sm">
                                <span>Book Supreme Package</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔹🔹🔹 SECTION 3.5: CUSTOMER REVIEWS & SOCIAL PROOF 🔹🔹🔹 */}
            <section id="reviews" className="py-16 px-5 bg-slate-50 border-b border-gray-100 scroll-mt-20 relative">
                <span id="testimonials" className="absolute -top-20 invisible pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    <div className="mx-auto mb-10 max-w-4xl text-center">
                        <div className="mb-3 flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <h2 className="mb-2 leading-none" style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}>
                            Perth Homeowners Love Us
                        </h2>
                        <Link
                            href="https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z"
                            target="_blank"
                            className="text-sm font-medium hover:underline"
                            style={{ color: "#888" }}
                        >
                            {gmb.rating} across {gmb.reviewCount} Google Reviews
                        </Link>
                    </div>
                    <GoogleReviews reviews={windowCleaningReviews} />
                </div>
            </section>

{/* 🔹🔹🔹 SECTION 5: THE ASPECT DIFFERENCE (SEE & FEEL) 🔹🔹🔹 */}
            <section id="difference" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 scroll-mt-20 relative">
                <span id="results" className="absolute -top-20 invisible pointer-events-none" />
                <span id="before-after" className="absolute -top-20 invisible pointer-events-none" />
                <div className="max-w-7xl mx-auto">
                    {/* Main Section Header */}
                    <div className="mx-auto mb-10 max-w-3xl text-center">
                        <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}>
                            The Aspect Difference
                        </div>
                        <h2 className="mb-3 leading-tight font-heading font-black" style={{ fontSize: "clamp(28px,4.5vw,48px)", color: NAVY }}>
                            See the Results. Feel the Difference.
                        </h2>
                        <p className="text-sm sm:text-base font-light max-w-2xl mx-auto text-gray-500">
                            From high-reach pure water purification to police-cleared master technicians, here is how we deliver streak-free glass that stays clean twice as long.
                        </p>

                        {/* Mobile Tab Switcher (lg:hidden) */}
                        <div className="mt-6 flex lg:hidden justify-center">
                            <div className="bg-slate-100 p-1.5 rounded-2xl flex border border-slate-200/80 w-full max-w-sm shadow-inner">
                                <button
                                    type="button"
                                    onClick={() => setActiveDiffTab("see")}
                                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                        activeDiffTab === "see"
                                            ? "bg-brand-navy text-white shadow-sm"
                                            : "text-slate-600 hover:text-brand-navy"
                                    }`}
                                >
                                    <Eye className="w-4 h-4 text-action-gold" />
                                    <span>See the Difference</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveDiffTab("feel")}
                                    className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                        activeDiffTab === "feel"
                                            ? "bg-brand-navy text-white shadow-sm"
                                            : "text-slate-600 hover:text-brand-navy"
                                    }`}
                                >
                                    <Sparkles className="w-4 h-4 text-action-gold" />
                                    <span>Feel the Difference</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Grid Layout: Side-by-Side on PC, Tab-toggled on Mobile */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-stretch">
                        
                        {/* LEFT COLUMN: SEE THE DIFFERENCE */}
                        <div className={`${activeDiffTab === "see" ? "flex" : "hidden"} lg:flex flex-col justify-between bg-slate-50/80 border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-sm transition-all duration-300`}>
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-brand-navy/70 bg-brand-navy/5 px-3 py-1 rounded-full">
                                        Visual Proof
                                    </span>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 100% Real Jobs
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-heading font-black text-brand-navy mb-1.5">
                                    See the Difference
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 font-light mb-5">
                                    Watch on-site footage and slide across real transformations on Perth properties.
                                </p>

                                {/* Video Container */}
                                <div className="mb-4 overflow-hidden rounded-2xl shadow-md border border-slate-200/60 bg-black relative" style={{ height: 260 }}>
                                    <ScrollAutoplayVideo
                                        src="/media/video/upload/q_auto:eco,w_800,vc_auto/v1772968701/VID-20260228-WA0016_xsz3cm_401388.mp4"
                                        type="video/mp4"
                                    />
                                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 pointer-events-none">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                        <span>Perth Site Footage</span>
                                    </div>
                                </div>

                                {/* Before / After Slider Showcase */}
                                <div>
                                    <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
                                        <div className="inline-flex p-1 bg-slate-200/80 rounded-xl border border-slate-300/60 shadow-inner">
                                            <button
                                                type="button"
                                                onClick={() => setActiveSliderJob("residential")}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                    activeSliderJob === "residential"
                                                        ? "bg-white text-brand-navy shadow-sm"
                                                        : "text-slate-600 hover:text-brand-navy"
                                                }`}
                                            >
                                                Patio Glass
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveSliderJob("tracks")}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                    activeSliderJob === "tracks"
                                                        ? "bg-white text-brand-navy shadow-sm"
                                                        : "text-slate-600 hover:text-brand-navy"
                                                }`}
                                            >
                                                Door Tracks 🧽
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveSliderJob("commercial")}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                    activeSliderJob === "commercial"
                                                        ? "bg-white text-brand-navy shadow-sm"
                                                        : "text-slate-600 hover:text-brand-navy"
                                                }`}
                                            >
                                                Commercial
                                            </button>
                                        </div>
                                        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">↔ Drag handle left/right</span>
                                    </div>

                                    <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200/80">
                                        {activeSliderJob === "residential" ? (
                                            <BeforeAfterSlider
                                                afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1774345158/IMG_9593_1_2_b98bl5.png"
                                                beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.03_PM_vtb2tn.jpg"
                                                beforeLabel="Before"
                                                afterLabel="After"
                                                initial={50}
                                            />
                                        ) : activeSliderJob === "tracks" ? (
                                            <BeforeAfterSlider
                                                afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/c_crop,w_512,h_1024,x_512,y_0,f_auto,q_auto/v1792771489/aspect_landing/track-cleaning-before-after.jpg"
                                                beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/c_crop,w_512,h_1024,x_0,y_0,f_auto,q_auto/v1792771489/aspect_landing/track-cleaning-before-after.jpg"
                                                beforeLabel="Real Dirty Track"
                                                afterLabel="Restored Track"
                                                initial={50}
                                            />
                                        ) : (
                                            <BeforeAfterSlider
                                                afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1785879700/aspect_gallery/after.webp"
                                                beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1785879695/aspect_gallery/1-before.webp"
                                                beforeLabel="Before"
                                                afterLabel="After"
                                                initial={50}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Quick Switcher Link */}
                            <div className="mt-5 pt-3 border-t border-slate-200/80 lg:hidden text-center">
                                <button
                                    type="button"
                                    onClick={() => setActiveDiffTab("feel")}
                                    className="text-xs font-bold text-brand-navy hover:text-action-gold inline-flex items-center gap-1.5 cursor-pointer py-1"
                                >
                                    <span>Discover Why Aspect & Pure Water Tech</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: FEEL THE DIFFERENCE */}
                        <div className={`${activeDiffTab === "feel" ? "flex" : "hidden"} lg:flex flex-col justify-between bg-brand-navy text-white rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden border border-white/10 transition-all duration-300`}>
                            {/* Atmospheric Glow */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-action-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-action-gold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                        The Aspect Standard
                                    </span>
                                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-200 font-medium">
                                        <Sparkles className="w-3.5 h-3.5 text-action-gold" /> Beyond Squeegees
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-1">
                                    Feel the Difference
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-action-gold mb-5">
                                    Why Aspect? The Technology Behind the Clean
                                </p>

                                {/* Pure Water Technology Hero Box */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 mb-4 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-action-gold text-xs font-bold uppercase tracking-wider">
                                        <Droplets className="w-4 h-4 text-action-gold shrink-0" />
                                        <span>Commercial RO/DI Pure Water & Carbon Fibre Poles</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                                        We don&apos;t just use a squeegee and soapy water. We use advanced <strong className="text-white font-bold">Carbon Fibre Poles</strong> and a <strong className="text-white font-bold">Commercial RO/DI Pure Water System</strong>.
                                    </p>
                                    <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-300 leading-relaxed">
                                        <strong className="text-action-gold font-bold">Why does this matter?</strong> Because filtering out all minerals and chemicals means the water evaporates perfectly clear, leaving your windows streak-free and cleaner for much longer. It&apos;s safer, faster, and delivers a superior result.
                                    </div>
                                </div>

                                {/* 3 Pillar Cards */}
                                <div className="space-y-3">
                                    {/* 1. Fully Insured & Checked */}
                                    <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 border border-white/10">
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-action-gold/20 flex items-center justify-center shrink-0 mt-0.5 border border-action-gold/30">
                                                <Shield className="w-5 h-5 text-action-gold" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between flex-wrap gap-1">
                                                    <h4 className="font-bold text-sm sm:text-base text-white">Fully Insured & Checked</h4>
                                                    <button
                                                        type="button"
                                                        onClick={() => openCertificateModal('insured')}
                                                        className="text-xs font-bold text-action-gold hover:text-yellow-300 hover:underline flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <span>View Certificates</span>
                                                        <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-300 leading-relaxed mt-1">
                                                    Our entire team is police-cleared and backed by $20,000,000 Public Liability Insurance for your complete peace of mind.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. 100% Satisfaction */}
                                    <div className="bg-action-gold text-brand-navy rounded-2xl p-4 shadow-sm border border-yellow-300">
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-brand-navy/15 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle2 className="w-5 h-5 text-brand-navy" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm sm:text-base text-brand-navy">100% Satisfaction</h4>
                                                <p className="text-xs text-brand-navy/90 leading-relaxed mt-1">
                                                    We guarantee our work. If anything falls short, we return and fix it at no extra cost. No questions asked.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Urgent & Flexible */}
                                    <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 border border-white/10">
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-blue-400/20 flex items-center justify-center shrink-0 mt-0.5 border border-blue-400/30">
                                                <Zap className="w-5 h-5 text-action-gold" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm sm:text-base text-white">Urgent & Flexible</h4>
                                                <p className="text-xs text-gray-300 leading-relaxed mt-1">
                                                    Next-day emergency cleans are available. Whether it&apos;s an end-of-lease or a rental inspection, we&apos;ve got you covered.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Quick Switcher Link */}
                            <div className="mt-5 pt-3 border-t border-white/10 lg:hidden text-center relative z-10">
                                <button
                                    type="button"
                                    onClick={() => setActiveDiffTab("see")}
                                    className="text-xs font-bold text-action-gold hover:text-white inline-flex items-center gap-1.5 cursor-pointer py-1"
                                >
                                    <span>View live transformation video & sliders</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔹🔹🔹 SECTION 5.5: DEDICATED TRACK & SILL SHOWCASE (HIGH-CTR GOOGLE ADS CONVERSION) 🔹🔹🔹 */}
            <section id="tracks" className="py-14 md:py-20 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 scroll-mt-20 relative overflow-hidden">
                {/* Atmospheric Glow */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-action-gold/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-widest bg-action-gold text-brand-navy mb-3 shadow-md">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Deep Track &amp; Sliding Channel Restoration</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-3 leading-tight">
                            Tired of Sticky, Insect-Caked <span className="text-action-gold">Sliding Door Tracks?</span>
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                            Perth&apos;s coastal sand and dry summer dust collect in sliding door tracks, causing rollers to grind and channels to turn black with dead insects and grime. See the real transformation below.
                        </p>
                    </div>

                    {/* Large, Spacious Spotlight Container */}
                    <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-4 sm:p-7 shadow-2xl">
                        {/* Top Toolbar / Mode Switcher */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-700/80">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs sm:text-sm font-bold text-slate-200">
                                    High-Definition Track Restoration Comparison
                                </span>
                            </div>
                            <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-slate-700 text-xs font-bold">
                                <button
                                    type="button"
                                    onClick={() => setTrackViewMode("split")}
                                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                        trackViewMode === "split"
                                            ? "bg-action-gold text-brand-navy shadow-sm"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    Side-by-Side Comparison
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTrackViewMode("slider")}
                                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                        trackViewMode === "slider"
                                            ? "bg-action-gold text-brand-navy shadow-sm"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    Interactive Slider
                                </button>
                            </div>
                        </div>

                        {/* Visual View Area */}
                        {trackViewMode === "split" ? (
                            /* Side-by-Side View: Spacious full width container with high clarity */
                            <div className="space-y-4">
                                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[2/1] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-inner flex items-center justify-center">
                                    <Image
                                        src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_1400/v1792771489/aspect_landing/track-cleaning-before-after.jpg"
                                        alt="Window track cleaning before and after Perth"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 1200px"
                                        className="object-contain"
                                        priority={false}
                                    />

                                    {/* Floating Labels */}
                                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider border border-white/20 shadow-lg">
                                        ⬅ Real Dirty Track (Compacted Sand &amp; Insects)
                                    </div>
                                    <div className="absolute top-3 right-3 bg-action-gold text-brand-navy text-[11px] sm:text-xs px-3 py-1.5 rounded-full font-black uppercase tracking-wider shadow-lg">
                                        Restored Clean Channel ➡
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                                        <span className="font-bold text-rose-400 block mb-1">❌ Left: The Problem</span>
                                        Accumulated sand from Fremantle Doctor winds, dead spiders, cockroach debris, and dried mud jam sliding door wheels, causing expensive track damage.
                                    </div>
                                    <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                                        <span className="font-bold text-action-gold block mb-1">✨ Right: The Aspect Standard</span>
                                        HEPA vacuuming, specialist nylon channel detailing brushes, and aluminum-safe degreasers leave the metal channel gliding effortlessly like brand new.
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Interactive Slider Mode in Large Space */
                            <div className="space-y-4">
                                <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                                    <BeforeAfterSlider
                                        beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/c_crop,w_512,h_1024,x_0,y_0,f_auto,q_auto/v1792771489/aspect_landing/track-cleaning-before-after.jpg"
                                        afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/c_crop,w_512,h_1024,x_512,y_0,f_auto,q_auto/v1792771489/aspect_landing/track-cleaning-before-after.jpg"
                                        beforeLabel="Real Dirty Track"
                                        afterLabel="Restored Clean"
                                        initial={50}
                                    />
                                </div>
                                <p className="text-center text-xs text-slate-400">
                                    ↔ Drag slider handle left or right to inspect the before and after track channel detailing.
                                </p>
                            </div>
                        )}

                        {/* Scope & Transparency Box at Bottom of Showcase */}
                        <div className="mt-6 pt-5 border-t border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-left text-xs sm:text-sm text-slate-300 max-w-2xl">
                                <strong className="text-white">Fair Scope Notice:</strong> Our Standard package includes a complimentary basic wipe for maintained tracks. For heavily soiled tracks with years of insect debris, choose our <strong className="text-action-gold">Deep Track Add-On</strong> or our <strong className="text-action-gold">Supreme Package</strong>.
                            </div>
                            <button
                                type="button"
                                onClick={openRegularModal}
                                className="w-full md:w-auto px-6 py-3.5 rounded-xl font-extrabold text-sm bg-action-gold text-brand-navy hover:bg-white transition-all shadow-lg hover:shadow-xl cursor-pointer shrink-0"
                            >
                                Get a Quote for Your Tracks &amp; Windows ➔
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔹🔹🔹 SECTION 6.5: WHAT'S INCLUDED  🔹🔹🔹 */}
            <section id="included" className="py-10 md:py-16 bg-gray-50 px-4 sm:px-5 scroll-mt-20 relative">
                <span id="services" className="absolute -top-20 invisible pointer-events-none" />
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs sm:text-sm font-semibold uppercase mb-1.5 text-center" style={{ color: YELLOW }}>
                        WHAT'S INCLUDED
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center mb-2.5 md:mb-4" style={{ color: NAVY }}>
                        Everything Covered in Our Window Clean
                    </h2>
                    <p className="mb-4 md:mb-8 text-center max-w-2xl mx-auto text-xs sm:text-base font-light text-gray-500">
                        We don't cut corners. Every booking includes a full, thorough clean of all accessible window components - not just the glass.
                    </p>


                    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                        {whatsInclude.map((item, index) => (
                            <InclusionCard
                                key={index}
                                item={item}
                                onSelect={() => setSelectedInclusion(item)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            
<section id="commercial" className="py-12 px-5 bg-white border-y border-gray-100 text-center scroll-mt-20">
                <div className="max-w-3xl mx-auto">
                    <Building2 className="w-8 h-8 text-brand-slate mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-brand-navy mb-2">Looking for Commercial Services?</h2>
                    <p className="text-gray-600 mb-6">We provide specialized cleaning for storefronts, strata complexes, and multi-story office buildings across Perth.</p>
                    <Link href="/services/commercial-window-cleaning" className="text-brand-navy font-bold underline hover:text-action-gold transition-colors">Head to our Commercial Window Cleaning page &rarr;</Link>
                </div>
            </section>

<section id="clients" className="px-6 py-10 text-center scroll-mt-20" style={{ background: "#f4f6ff" }}>
                <p className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "#666" }}>
                    Trusted by Perth businesses
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10">
                    {[
                        { src: "/assets/images/clients/toyota-logo.png", alt: "Toyota" },
                        { src: "/assets/images/clients/richard-group-logo.png", alt: "Richard Group" },
                        { src: "/assets/images/clients/bespoke-logo.png", alt: "Bespoke" },
                    ].map((logo) => (
                        <div key={logo.alt} className="relative h-13 w-28 grayscale-0 md:grayscale transition duration-300 md:hover:grayscale-0">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                unoptimized={true}
                                sizes="112px"
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* REAL ESTATE / PRE-SALE SNIPPET */}
            <section id="pre-sale" className="py-16 px-5 bg-brand-navy text-white relative overflow-hidden scroll-mt-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-action-gold opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="shrink-0 bg-white/10 p-5 rounded-2xl border border-white/20 shadow-lg hidden md:block">
                        <Camera className="w-12 h-12 text-action-gold" />
                    </div>
                    <div className="text-center md:text-left">
                        <div className="md:hidden flex justify-center mb-4">
                            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                                <Camera className="w-10 h-10 text-action-gold" />
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Pre-Sale & Real Estate Photography Cleaning</h2>
                        <p className="text-brand-water leading-relaxed mb-4 text-lg">
                            Getting ready to list your property on the market? First impressions are everything. We offer specialized pre-sale and pre-photography cleaning packages designed to maximize your home's curb appeal.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Unlike standard exterior washes, our pre-sale team performs an in-depth, top-to-bottom clean. We detail the inside and outside of the glass, scrub the tracks, wash the flyscreens, and clear out all cobwebs. Let us help you get your property picture-perfect and ready for home opens.
                        </p>
                    </div>
                </div>
            </section>

{/* 🔹🔹🔹 SECTION 7: HOW IT WORKS  🔹🔹🔹 */}
            <section id="how-it-works" className="px-5 py-16 scroll-mt-20 relative" style={{ background: "#f4f6ff" }}>
                <span id="process" className="absolute -top-20 invisible pointer-events-none" />
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}>
                        How it works
                    </div>
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(36px,5vw,52px)", color: NAVY }}>
                        Booked & Done in 4 Steps
                    </h2>
                    <p className="mx-auto max-w-md text-base font-light" style={{ color: "#888" }}>
                        Simple, fast, and completely hassle-free from first contact to sparkling windows.
                    </p>
                </div>
                <div className="mx-auto max-w-4xl">
                    <div className="relative">
                        <div
                            className="absolute hidden md:block"
                            style={{
                                top: 28,
                                left: "calc(12.5% + 16px)",
                                right: "calc(12.5% + 16px)",
                                height: 1,
                                background: `linear-gradient(90deg, ${NAVY} 0%, ${YELLOW} 100%)`,
                            }}
                        />
                        <div className="relative grid grid-cols-2 gap-6 md:grid-cols-4">
                            {processSteps.map((step) => (
                                <div
                                    key={step.num}
                                    className={`flex flex-col items-center text-center ${step.clickable ? "group" : ""}`}
                                    onClick={step.clickable ? openRegularModal : undefined}
                                    style={step.clickable ? { cursor: "pointer" } : undefined}
                                >
                                    <div
                                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full font-black transition-all"
                                        style={{
                                            background: step.clickable ? YELLOW : NAVY,
                                            color: step.clickable ? NAVY : YELLOW,
                                            fontSize: 22,
                                            boxShadow: step.clickable
                                                ? `0 4px 20px rgba(255,229,77,0.5)`
                                                : `0 4px 20px rgba(7,7,126,0.25)`,
                                            position: "relative",
                                            zIndex: 1,
                                        }}
                                    >
                                        {step.num}
                                    </div>
                                    <p
                                        className="mb-2 font-bold text-sm transition-all"
                                        style={{
                                            color: NAVY,
                                            textDecoration: step.clickable ? "underline" : "none",
                                            textDecorationColor: "rgba(7,7,126,0.3)",
                                            textUnderlineOffset: "3px",
                                        }}
                                    >
                                        {step.title}
                                    </p>
                                    <p className="text-xs font-light leading-relaxed" style={{ color: "#888" }}>{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            
{/* PROMOS */}
            <section id="promotions" className="py-16 px-5 bg-white border-b border-gray-100 scroll-mt-20 relative">
                <span id="offers" className="absolute -top-20 invisible pointer-events-none" />
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy">Current Promotions & Bundles</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Take advantage of our seasonal offers to keep your entire property sparkling from top to bottom.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl shadow-sm text-center">
                            <Tag className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-brand-navy mb-2">Bundle & Save 10%</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Group multiple services togetherlike window cleaning, gutter cleaning, solar panel washing, or pressure washingand get a flat 10% off your entire package.</p>
                            <p className="text-xs text-gray-400 font-bold uppercase">No minimum value</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-100 p-8 rounded-2xl shadow-sm text-center transform md:-translate-y-4 mt-4 md:mt-0">
                            <div className="bg-action-gold text-brand-navy font-bold text-xs px-3 py-1 rounded-full w-max mx-auto mb-4 tracking-wider uppercase">Most Popular</div>
                            <h3 className="font-bold text-xl text-brand-navy mb-2">Refer a Friend: $50 Off</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Love our service? Refer a neighbour or friend and get $30-$50 off your next clean when they book with us.</p>
                            <p className="text-xs text-gray-400 font-bold uppercase">Min. order value $250</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-sm text-center">
                            <Droplets className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-brand-navy mb-2">$50 Off Flyscreen Detail</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">Add comprehensive flyscreen deep cleaning to any standard or supreme window cleaning package and save $50 instantly.</p>
                            <p className="text-xs text-gray-400 font-bold uppercase">Min. order value $300</p>
                        </div>
                    </div>
                </div>
            </section>

            
{/* FREE TRIAL */}
            <section id="free-trial" className="py-20 px-5 bg-gray-50 scroll-mt-20">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-brand-navy mb-4">Still Not Convinced?</h2>
                        <h3 className="text-xl text-action-gold font-bold mb-4">Try Us For Free</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">We are so confident in the quality of our work and the power of our Pure Water systems that we want to prove it to you. Ask us to come over and clean <strong>2 windows absolutely free of charge</strong>.</p>
                        <p className="text-gray-600 mb-6 leading-relaxed">See the level of service, experience our professionalism, and witness the difference it makes to your home before you spend a single cent. Just drop your address below!</p>
                        <p className="text-sm text-gray-500 italic">* Offer valid for accessible residential ground-floor windows. Subject to availability.</p>
                    </div>
                    <div className="w-full md:w-96 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <h4 className="font-bold text-brand-navy mb-4 text-center">Request Your Free Trial</h4>
                        <FreeTrialForm />
                    </div>
                </div>
            </section>

            {/* COMMERCIAL SNIPPET */}
            


		

            
{/* 🔹🔹🔹 SECTION 9: FOOTER CTA  🔹🔹🔹 */}
            <section id="contact" className="relative overflow-hidden px-5 py-16 text-center scroll-mt-20" style={{ background: NAVY }}>
                <div className="pointer-events-none absolute" style={{ top: "-150px", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, border: "1px solid rgba(255,229,77,0.05)", borderRadius: "50%" }} />
                <div className="relative z-10">
                    <div className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}>
                        Still thinking about it?
                    </div>
                    <h2 className="mb-3 leading-none text-white" style={{ fontSize: "clamp(40px,6vw,60px)" }}>
                        Book Your Clean Today
                    </h2>
                    <p className="mb-8 text-base font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Same-week slots available. Free, no-obligation quote in 60 minutes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="flex items-center gap-2 rounded-2xl px-7 py-4 font-bold text-base transition-all hover:-translate-y-0.5"
                            style={{ background: YELLOW, color: NAVY, boxShadow: "0 6px 28px rgba(255,229,77,0.35)" }}
                        >
                            <Phone className="w-5 h-5" />
                            Call {BUSINESS.phone}
                        </a>
                        <button
                            onClick={openRegularModal}
                            className="flex items-center gap-2 rounded-2xl border px-7 py-4 font-medium text-base transition-all hover:bg-white/10 cursor-pointer"
                            style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}
                        >
                            Get a Text Quote &nbsp;
                        </button>
                    </div>
                </div>
            </section>

            
{/* 🔹🔹🔹 STICKY BAR 🔹🔹🔹 */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
                style={{ backgroundColor: NAVY, borderTop: `2px solid ${YELLOW}`, boxShadow: "0 -4px 24px rgba(7,7,126,0.3)" }}
            >
                <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-white">Aspect Window Cleaning</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Perth&apos;s #1 Rated</p>
                </div>
                <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-sm transition-all hover:scale-105 sm:ml-auto shiny-call-btn"
                    style={{ background: YELLOW, color: NAVY }}
                >
                    <Phone className="w-4 h-4" />
                    Call Now - {BUSINESS.phone}
                </a>
            </div>
            {/* spacer */}
            <div className="h-16 pb-[env(safe-area-inset-bottom)]" style={{ background: NAVY }} />

            {/* GALLERY SLIDESHOW POPUP */}
            {galleryOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4">
                    <button onClick={() => setGalleryOpen(false)} className="absolute top-4 right-4 text-white p-2">
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative w-full max-w-4xl aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden">
                        <Image src={galleryImages[currentImageIndex].full} alt="Gallery" fill className="object-contain" unoptimized />
                    </div>
                    <button onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black transition-colors">
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button onClick={() => setCurrentImageIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black transition-colors">
                        <ChevronRight className="w-8 h-8" />
                    </button>
                    <div className="text-white mt-4 font-semibold">{currentImageIndex + 1} / {galleryImages.length}</div>
                </div>
            )}
            {/* WHAT'S INCLUDED DETAIL POP-UP MODAL */}
            <InclusionDetailModal
                item={selectedInclusion}
                onClose={() => setSelectedInclusion(null)}
                onOpenQuoteModal={() => {
                    setSelectedInclusion(null);
                    setModalOpen(true);
                }}
            />

            {/* PACKAGE SELECTION MODAL */}
            <LandingPackageModal
                selectedPkg={selectedPkg}
                setSelectedPkg={setSelectedPkg}
                isDoubleStorey={isDoubleStorey}
                setIsDoubleStorey={setIsDoubleStorey}
                includeTracks={includeTracks}
                setIncludeTracks={setIncludeTracks}
            />
        </>
    );
}