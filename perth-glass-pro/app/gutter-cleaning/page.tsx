"use client";

import { useEffect, useState } from "react";
import { Phone, CheckCircle2, Star, Shield, Droplets, Zap, Home, X, Leaf, Droplet, AlertTriangle, Bug, Hammer, Tag } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import { sendLeadEmail } from "../actions/send-email";
import { trackFormCompleted } from "@/hooks/useGtm";
import GoogleReviews from "@/components/GoogleReviews";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";


type FormDataType = {
    name: string;
    phone: string;
    suburb: string;
    promo?: string;
};

/* ─────────────────────────────────────────
   LEAD FORM — shared by hero + modal
───────────────────────────────────────── */
function LeadForm({
    submitted,
    formData,
    setFormData,
    onSubmit,
    dark = false,
    showPromo = true
}: {
    submitted: boolean;
    showPromo?: boolean;
    formData: { name: string; phone: string; suburb: string, promo?: string };
    setFormData: (d: { name: string; phone: string; suburb: string; promo?: string }) => void;
    onSubmit: () => void;
    dark?: boolean;
}) {
    const fields = [
        { key: "name", placeholder: "Your Name", type: "text" },
        { key: "phone", placeholder: "Phone Number", type: "tel" },
        { key: "suburb", placeholder: "Your Suburb", type: "text" },
        { key: "promo", placeholder: "Promo Code", type: "text" },
    ];
    if (submitted) {
        return (
            <div className="flex flex-col items-center gap-3 py-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
                <p className="font-bold text-center" style={{ color: dark ? "#fff" : "#07077E" }}>
                    We'll text you shortly!
                </p>
                <p className="text-sm text-center" style={{ color: dark ? "rgba(255,255,255,0.6)" : "#888" }}>
                    Usually within 60 minutes.
                </p>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-2.5">
            {fields.filter((f) => !(f.key === "promo" && !showPromo))
                .map((f) => (
                    <input
                        key={f.key}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={formData[f.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                        style={{
                            background: dark ? "rgba(255,255,255,0.92)" : "#f4f6ff",
                            border: "1.5px solid",
                            borderColor: dark ? "transparent" : "#e0e6f5",
                            color: "#1a1a2e",
                            fontFamily: "inherit",
                        }}
                    />
                ))}
            <button
                onClick={onSubmit}
                className="w-full rounded-xl py-3.5 text-sm font-bold mt-1 transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{
                    background: "#FFE54D",
                    color: "#07077E",
                    boxShadow: "0 4px 20px rgba(255,229,77,0.4)",
                }}
            >
                Send Me a Quote →
            </button>
            <p className="text-center text-xs mt-1" style={{ color: dark ? "rgba(255,255,255,0.45)" : "#aaa" }}>
                🔒 We never share your details
            </p>
        </div>
    );
}

/* ─────────────────────────────────────────
   MODAL — reusable, accepts optional promo
───────────────────────────────────────── */
function QuoteModal({
    open,
    onClose,
    submitted,
    formData,
    setFormData,
    onSubmit,
    showPromo = false,
}: {
    open: boolean;
    onClose: () => void;
    submitted: boolean;
    formData: { name: string; phone: string; suburb: string; promo?: string };
    setFormData: (d: { name: string; phone: string; suburb: string; promo?: string; }) => void;
    onSubmit: () => void;
    showPromo?: boolean;
}) {
    if (!open) return null;

    const NAVY = "#07077E";
    const YELLOW = "#FFE54D";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(7,7,126,0.65)", backdropFilter: "blur(8px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
                style={{
                    background: NAVY,
                    border: "1px solid rgba(255,229,77,0.2)",
                    animation: "modalPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
            >
                {/* Promo banner — only shown on scroll popup */}
                {showPromo && (
                    <div
                        className="relative flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #FFE54D 0%, #FFD93B 100%)",
                            color: NAVY,
                        }}
                    >
                        {/* subtle glow */}
                        <div className="absolute inset-0 opacity-20 blur-md bg-white pointer-events-none" />

                        <Tag className="w-4 h-4 shrink-0" />

                        <span>
                            New users get{" "}
                            <span className="font-extrabold underline underline-offset-2">
                                10% OFF
                            </span>
                        </span>

                        <span className="opacity-60">•</span>

                        <span className="text-xs font-medium">Use code</span>

                        <span
                            className="rounded-md px-2 py-0.5 text-xs font-black tracking-wider"
                            style={{
                                background: "rgba(7,7,126,0.15)",
                                letterSpacing: "0.12em",
                            }}
                        >
                            PERTH
                        </span>
                    </div>
                )}

                <div className="p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-4 cursor-pointer"
                        style={{ color: showPromo ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.5)", top: showPromo ? "3.2rem" : "1rem" }}
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div
                        className="inline-block text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 mb-4"
                        style={{ background: "rgba(255,229,77,0.12)", color: YELLOW }}
                    >
                        Free Quote — No Obligation
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">Get a Fast Text Quote</h3>
                    <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        We reply within 60 minutes.
                    </p>
                    <LeadForm
                        submitted={submitted}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={onSubmit}
                        dark
                        showPromo={showPromo}
                    />

                </div>
            </div>

            <style>{`
                @keyframes modalPop {
                    from { opacity: 0; transform: scale(0.88) translateY(16px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0);    }
                }
            `}</style>
        </div>
    );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function GutterCleaningAdsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [showPromo, setShowPromo] = useState(false);
    const [scrollPopupShown, setScrollPopupShown] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({ name: "", phone: "", suburb: "", promo: "", });
    const [submitted, setSubmitted] = useState(false);


    /* ── Scroll-triggered popup at 50% page height ── */
    useEffect(() => {
        const handleScroll = () => {
            if (scrollPopupShown) return;
            const scrolled = window.scrollY + window.innerHeight;
            const total = document.documentElement.scrollHeight;
            if (scrolled / total >= 0.5) {
                setShowPromo(true);
                setModalOpen(true);
                setScrollPopupShown(true);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollPopupShown]);

    const openRegularModal = () => {
        setShowPromo(false);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const result = await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                suburb: formData.suburb,
                sourceUrl: window.location.href
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

    const processSteps = [
        {
            num: "01",
            title: "Get Quote",
            body: "Contact us with your property details and we'll provide a fast, transparent quote.",
            clickable: true
        },
        {
            num: "02",
            title: "Book Time",
            body: "Choose a day that suits — same-week availability across Perth metro.",
            clickable: false
        },
        {
            num: "03",
            title: "We Clean",
            body: "Our technician arrives on time, cleans thoroughly, and tests water flow end-to-end.",
            clickable: false
        },
        {
            num: "04",
            title: "Inspect & Approve",
            body: "We walk you through the results. Fully satisfied? Done. Not happy? We fix it.",
            clickable: false
        },
    ];

    const gutterReviews = [
        {
            id: 1,
            name: "J Buchanan",
            rating: 5,
            date: "3 days ago",
            reviews: "5 reviews · 22 photos",
            content: "Aspect cleaned out gutters very professionally and swiftly engaged the task. Job was well done and all parts agreed to were completed exactly as denoted. Highly recommended."
        },
        {
            id: 2,
            name: "Martin Abreu",
            rating: 5,
            date: "4 days ago",
            reviews: "3 reviews",
            content: "Did an excellent job cleaning gutters and solar panels."
        },
        {
            id: 3,
            name: "J s",
            rating: 5,
            date: "1 month ago",
            reviews: "6 reviews",
            content: "Recently hired these guys for gutter cleaning of my home, great communication, arrived on time, did a great job and cleaned up. Will use again."
        },
    ];

    const features = [
        { icon: <Leaf className="w-5 h-5" style={{ color: "#07077E" }} />, title: "Leaf & Debris Removal", body: "Full removal of all leaves, twigs, dirt, and organic buildup from gutters and valleys." },
        { icon: <Droplet className="w-5 h-5" style={{ color: "#07077E" }} />, title: "Downpipe Clearing", body: "We flush and clear all downpipes to ensure unobstructed water flow from roof to drain." },
        { icon: <Shield className="w-5 h-5" style={{ color: "#07077E" }} />, title: "Gutter Inspection", body: "We check for cracks, rust, sagging, and loose brackets — and flag anything that needs attention." },
        { icon: <Home className="w-5 h-5" style={{ color: "#07077E" }} />, title: "Safe Debris Disposal", body: "All collected debris is bagged and removed from your property — no mess left behind." },
        {
            icon: <Droplet className="w-5 h-5" style={{ color: "#07077E" }} />,
            title: "Water Flow Test",
            body: "We perform a final water test to confirm gutters and downpipes are flowing correctly."
        },
        {
            icon: <Home className="w-5 h-5" style={{ color: "#07077E" }} />,
            title: "Roof Valley Clearing",
            body: "We clear roof valleys where blockages commonly occur and cause serious water damage."
        },
    ];

    const benefits = [
        { icon: <AlertTriangle className="w-5 h-5" />, title: "Prevent Water Damage", body: "Overflowing gutters direct water against walls and foundations, causing dampness and structural cracking. Clean gutters route water safely away." },
        { icon: <Bug className="w-5 h-5" />, title: "Avoid Pest Infestations", body: "Clogged, damp gutters are a favourite nesting spot for mosquitoes, birds, rodents, and wasps. Regular cleaning eliminates this habitat." },
        { icon: <Hammer className="w-5 h-5" />, title: "Protect Your Roof", body: "Debris buildup traps moisture against fascia boards and roof edges, accelerating rot and rust. Clean gutters extend your roofing lifespan." },
        { icon: <Shield className="w-5 h-5" />, title: "Prevent Structural Failure", body: "A gutter full of saturated debris can weigh tens of kilograms — causing sagging or collapse. Routine cleaning keeps the system secure." },
    ];

    const NAVY = "#07077E";
    const YELLOW = "#FFE54D";

    return (
        <>
            {/* ─── MODAL ─── */}
            <QuoteModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                submitted={submitted}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                showPromo={showPromo}
            />

            {/* ─── SECTION 1: HERO ─── */}
            <section className="relative min-h-screen flex flex-col overflow-hidden bg-cover bg-center
                 bg-[linear-gradient(160deg,rgba(7,7,126,0.7)_0%,rgba(5,5,80,0.82)_60%,rgba(3,3,50,0.9)_100%),url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1775990687/gutter-cleaning_nd8wyn.jpg')]"
            >
                {/* Decorative circles */}
                <div className="pointer-events-none absolute" style={{ top: "-200px", right: "-200px", width: 700, height: 700, border: "1px solid rgba(255,229,77,0.07)", borderRadius: "50%" }} />
                <div className="pointer-events-none absolute" style={{ top: "-100px", right: "-100px", width: 500, height: 500, border: "1px solid rgba(255,229,77,0.05)", borderRadius: "50%" }} />
                <div className="pointer-events-none absolute" style={{ bottom: "-80px", left: "-80px", width: 400, height: 400, border: "1px solid rgba(255,229,77,0.04)", borderRadius: "50%" }} />

                {/* NAV */}
                <nav className="relative z-10 flex items-center justify-end px-6 pt-5 pb-2">
                    <Link href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5" style={{ background: YELLOW, color: NAVY, boxShadow: "0 4px 20px rgba(255,229,77,0.4)" }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.3)", animation: "pulse 1.5s infinite" }} />
                        {BUSINESS.phone}
                    </Link>
                </nav>

                {/* HERO BODY */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-6 text-center text-white">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest" style={{ borderColor: "rgba(255,229,77,0.35)", color: YELLOW }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                        Same-week booking available
                    </div>

                    <h1 className="mb-4 leading-none font-black text-white" style={{ fontSize: "clamp(44px,9vw,84px)", letterSpacing: "1px" }}>
                        Perth's #1
                        <br />
                        <span style={{ color: YELLOW }}>Gutter Cleaners</span>
                    </h1>

                    <p className="mb-8 max-w-sm text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                        Protect your home from water damage. Professional gutter & downpipe cleaning for Perth homes & businesses.
                    </p>

                    <div className="mb-8 flex w-full max-w-sm flex-col gap-3">
                        <Link href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center justify-center gap-3 rounded-2xl py-4 font-bold text-base transition-all hover:-translate-y-0.5" style={{ background: YELLOW, color: NAVY, boxShadow: "0 6px 32px rgba(255,229,77,0.4)" }}>
                            <Phone className="w-5 h-5" />
                            Call for Instant Quote
                        </Link>
                        <button onClick={() => setModalOpen(true)} className="flex items-center justify-center gap-2 rounded-2xl border py-4 font-medium text-base transition-all hover:bg-white/10 cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}>
                            Get a Free Text Quote →
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {[{ icon: "🛡️", text: "$20M Insured" }, { icon: "👮", text: "Police Cleared" }, { icon: "🍃", text: "Full Debris Removal" }, { icon: "⭐", text: "5.0 Google Reviews" }].map((b) => (
                            <span key={b.text} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}>
                                {b.icon} {b.text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SECTION 2: STATS STRIP ─── */}
            <section style={{ background: YELLOW }}>
                <div className="mx-auto grid max-w-4xl grid-cols-4">
                    {[{ num: "100+", label: "Happy Clients" }, { num: "5.0★", label: "Google Rating" }, { num: "$20M", label: "Insured" }, { num: "24hr", label: "Response Time" }].map((s, i) => (
                        <div key={s.label} className="flex flex-col items-center justify-center py-5 text-center" style={{ borderRight: i < 3 ? `1px solid rgba(7,7,126,0.15)` : "none" }}>
                            <span className="leading-none font-black" style={{ fontSize: "clamp(18px,4vw,34px)", color: NAVY }}>{s.num}</span>
                            <span className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(7,7,126,0.55)" }}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 3: LEAD FORM ─── */}
            <section className="px-5 py-16" style={{ background: NAVY }}>
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
                    <div>
                        <div className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}>
                            Get your free quote
                        </div>
                        <h2 className="mb-3 leading-none text-white font-black" style={{ fontSize: "clamp(36px,5vw,52px)" }}>
                            Protect Your Home Today
                        </h2>
                        <p className="mb-8 text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            Blocked gutters cause water damage, pests, and costly repairs. Fill in your details and we'll text you a price within 60 minutes.
                        </p>
                        <div className="flex flex-col gap-3">
                            {["Fast reply — usually within the hour", "Same-week and next-day slots available", "Full debris removal & disposal included", "Water flow test after cleaning"].map((point, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs" style={{ background: "rgba(255,229,77,0.15)", border: "1px solid rgba(255,229,77,0.35)", color: YELLOW }}>✓</div>
                                    {point}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl p-6 shadow-2xl" style={{ background: "white" }}>
                        <h3 className="mb-1 font-bold text-base" style={{ color: NAVY }}>Get Gutter Cleaning Quote</h3>
                        <p className="mb-5 text-sm" style={{ color: "#888" }}>We'll reply within 60 minutes</p>
                        <LeadForm submitted={submitted} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
                    </div>
                </div>
            </section>

            {/* ─── SECTION 4: WHAT'S INCLUDED ─── */}
            <section className="px-5 py-16" style={{ background: "#f4f6ff" }}>
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}>
                        What's Included
                    </div>
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}>
                        Complete Gutter Cleaning Service
                    </h2>
                    <p className="mx-auto max-w-lg text-base font-light leading-relaxed" style={{ color: "#888" }}>
                        We don't just scoop out debris — our service covers every component from inlet to outlet.
                    </p>
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                        <div key={i} className="rounded-2xl p-6 bg-white">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(7,7,126,0.06)" }}>{f.icon}</div>
                            <p className="font-bold text-base mb-2" style={{ color: NAVY }}>{f.title}</p>
                            <p className="text-sm font-light leading-relaxed" style={{ color: "#888" }}>{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 5: WHY IT MATTERS ─── */}
            <section className="px-5 py-16" style={{ background: NAVY }}>
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}>
                        Why It Matters
                    </div>
                    <h2 className="mb-3 leading-none text-white" style={{ fontSize: "clamp(24px,5vw,52px)" }}>
                        The Real Cost of Blocked Gutters
                    </h2>
                    <p className="mx-auto max-w-lg text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                        Gutter cleaning isn't just maintenance — it's active protection for your home.
                    </p>
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((b, i) => (
                        <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(255,229,77,0.15)" }}>
                                <span style={{ color: YELLOW }}>{b.icon}</span>
                            </div>
                            <p className="font-bold text-base mb-2 text-white">{b.title}</p>
                            <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{b.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 6: WHY ASPECT ─── */}
            <section className="px-5 py-16" style={{ background: "#f4f6ff" }}>
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}>
                        Why Aspect
                    </div>
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}>
                        Why Perth Homeowners Choose Us
                    </h2>
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-6 rounded-2xl p-6 bg-white">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(7,7,126,0.06)" }}><Shield className="w-5 h-5" style={{ color: NAVY }} /></div>
                        <p className="font-bold text-base mb-2" style={{ color: NAVY }}>Fully Insured — $20M Cover</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "#888" }}>
                            Complete public liability insurance gives you total peace of mind. We work safely on every property.
                        </p>
                    </div>
                    <div
                        className="col-span-12 md:col-span-6 rounded-2xl p-6"
                        style={{ background: NAVY }}>
                        <div
                            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(255,229,77,0.15)" }}>
                            <Zap className="w-5 h-5" style={{ color: YELLOW }} />
                        </div>
                        <p className="font-bold text-base mb-2 text-white">
                            100% Satisfaction Guaranteed
                        </p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>We're not finished until you're completely happy. If anything doesn't meet expectations, we return and fix it.</p>
                    </div>
                    <div className="col-span-12 md:col-span-6 rounded-2xl p-6" style={{ background: YELLOW }}>
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(7,7,126,0.1)" }}><Home className="w-5 h-5" style={{ color: NAVY }} /></div>
                        <p className="font-bold text-base mb-2" style={{ color: NAVY }}>Transparent Pricing</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(7,7,126,0.6)" }}>Clear, upfront quote before we start. The price you're given is the price you pay — no surprises.</p>
                    </div>
                    <div className="col-span-12 md:col-span-6 rounded-2xl p-6 bg-white">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(7,7,126,0.06)" }}><Droplets className="w-5 h-5" style={{ color: NAVY }} /></div>
                        <p className="font-bold text-base mb-2" style={{ color: NAVY }}>Experienced Technicians</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "#888" }}>Trained in safe roof access, correct techniques, and spotting early signs of damage.</p>
                    </div>
                </div>
            </section>

            {/* ─── SECTION 7: HOW IT WORKS ─── */}
            <section className="px-5 py-16" style={{ background: "#f4f6ff" }}>
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}>
                        Our Process
                    </div>
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(36px,5vw,52px)", color: NAVY }}>
                        How Our Gutter Cleaning Works
                    </h2>
                    <p className="mx-auto max-w-md text-base font-light" style={{ color: "#888" }}>
                        Simple, hassle-free process from first contact to clean gutters.
                    </p>
                </div>
                <div className="mx-auto max-w-4xl">
                    <div className="relative">
                        <div className="absolute hidden md:block" style={{
                            top: 28,
                            left: "calc(12.5% + 16px)",
                            right: "calc(12.5% + 16px)",
                            height: 1, background: `linear-gradient(90deg, ${NAVY} 0%, ${YELLOW} 100%)`
                        }} />
                        <div className="relative grid grid-cols-2 gap-6 md:grid-cols-4">
                            {processSteps.map((step) => (
                                <div
                                    key={step.num}
                                    className={`flex flex-col items-center text-center ${step.clickable ? "group" : ""}`}
                                    onClick={step.clickable ? openRegularModal : undefined}
                                    style={step.clickable ? { cursor: "pointer" } : undefined}
                                >
                                    <div
                                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full font-black"
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
                                    <p className="mb-2 font-bold text-sm" style={{ color: NAVY }}>{step.title}</p>
                                    <p className="text-xs font-light leading-relaxed" style={{ color: "#888" }}>{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-5 py-16 bg-white">
                <BeforeAfterSlider
                    beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1777441113/WhatsApp_Image_2026-04-27_at_12.43.46_PM_cvkw1l.jpg"
                    afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1777441114/WhatsApp_Image_2026-04-27_at_12.43.48_PM_yxfcd8.jpg"
                    initial={50}
                />
            </section>

            {/* ─── SECTION 8: REVIEWS ─── */}
            <section className="max-w-7xl mx-auto px-5 py-16 bg-white">
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <h2 className="mb-2 leading-none" style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}>
                        Perth Homeowners Love Us
                    </h2>
                    <Link href="https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z" target="_blank" className="text-sm font-medium hover:underline" style={{ color: "#888" }}>
                        5.0 across 30+ Google Reviews
                    </Link>
                </div>

                <GoogleReviews reviews={gutterReviews} />

            </section>

            {/* ─── SECTION 9: FOOTER CTA ─── */}
            <section className="relative overflow-hidden px-5 py-16 text-center" style={{ background: NAVY }}>
                <div className="pointer-events-none absolute" style={{ top: "-150px", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, border: "1px solid rgba(255,229,77,0.05)", borderRadius: "50%" }} />
                <div className="relative z-10">
                    <div className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}>
                        Don't wait for water damage
                    </div>
                    <h2 className="mb-3 leading-none text-white" style={{ fontSize: "clamp(40px,6vw,60px)" }}>
                        Book Your Gutter Clean Today
                    </h2>
                    <p className="mb-8 text-base font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Same-week slots available. Free, no-obligation quote in 60 minutes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 rounded-2xl px-7 py-4 font-bold text-base transition-all hover:-translate-y-0.5" style={{ background: YELLOW, color: NAVY, boxShadow: "0 6px 28px rgba(255,229,77,0.35)" }}>
                            <Phone className="w-5 h-5" />
                            Call {BUSINESS.phone}
                        </Link>
                        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 rounded-2xl border px-7 py-4 font-medium text-base transition-all hover:bg-white/10 cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}>
                            Get a Text Quote →
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── STICKY BAR ─── */}
            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center px-5 py-3" style={{ background: NAVY, borderTop: `2px solid ${YELLOW}`, boxShadow: "0 -4px 24px rgba(7,7,126,0.3)" }}>
                <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-white">Aspect Gutter Cleaning</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Perth&apos;s #1 Rated</p>
                </div>
                <Link href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-sm transition-all hover:scale-105 sm:ml-auto" style={{ background: YELLOW, color: NAVY }}>
                    <Phone className="w-4 h-4" />
                    Call Now — {BUSINESS.phone}
                </Link>
            </div>
            <div className="h-16" style={{ background: NAVY }} />
        </>
    );
}