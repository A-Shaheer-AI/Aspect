"use client";

import { useState } from "react";
import { Phone, CheckCircle2, Star, Shield, Zap, Sun, ClipboardCheck, X } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { sendLeadEmail } from "../actions/send-email";
import { trackFormCompleted } from "@/hooks/useGtm";

/* ─────────────────────────────────────────
   LEAD FORM — shared by hero + modal
───────────────────────────────────────── */
function LeadForm({
    submitted,
    formData,
    setFormData,
    onSubmit,
    dark = false,
}: {
    submitted: boolean;
    formData: { name: string; phone: string; suburb: string };
    setFormData: (d: { name: string; phone: string; suburb: string }) => void;
    onSubmit: () => void;
    dark?: boolean;
}) {
    const fields = [
        { key: "name", placeholder: "Your Name", type: "text" },
        { key: "phone", placeholder: "Phone Number", type: "tel" },
        { key: "suburb", placeholder: "Your Suburb", type: "text" },
    ];
    if (submitted) {
        return (
            <div className="flex flex-col items-center gap-3 py-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
                <p className="font-bold text-center" style={{ color: dark ? "#fff" : "#07077E" }}>
                    We&apos;ll text you shortly!
                </p>
                <p className="text-sm text-center" style={{ color: dark ? "rgba(255,255,255,0.6)" : "#888" }}>
                    Usually within 60 minutes.
                </p>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-2.5">
            {fields.map((f) => (
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
   PAGE
───────────────────────────────────────── */
export default function SolarPanelCleaningAdsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", suburb: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            const result = await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                suburb: formData.suburb,
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
        { num: "01", title: "Free Quote", body: "Share your panel count and address — we'll send a fast, transparent quote." },
        { num: "02", title: "Book a Time", body: "Same-week availability across Perth. Pick a time that suits you." },
        { num: "03", title: "We Clean", body: "Purified water and soft-brush equipment — every panel cleaned safely." },
        { num: "04", title: "You Inspect", body: "We walk you through the results. Satisfied? Job done." },
    ];

    const googleReviews = [
        { name: "June Bird", suburb: "Perth", text: "Guys done a beautiful job. My windows are sparkling. 2 very nice gentleman. Highly recommend." },
        { name: "Hussai", suburb: "Perth", text: "Team arrived on time, were friendly and professional. Many windows came out spotless and clear." },
        { name: "Taylor Bow", suburb: "North Perth", text: "Did a great job cleaning inside and outside of windows at my North Perth property. Very professional." },
        { name: "Shabnam", suburb: "Perth", text: "Punctual, professional, and paid great attention to detail. Our windows are spotless. Couldn't be happier." },
    ];

    const NAVY = "#07077E";
    const YELLOW = "#FFE54D";

    return (
        <>
            {/* ─── MODAL ─── */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ background: "rgba(7,7,126,0.6)", backdropFilter: "blur(6px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
                >
                    <div
                        className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl"
                        style={{ background: NAVY, border: "1px solid rgba(255,229,77,0.2)" }}
                    >
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 cursor-pointer"
                            style={{ color: "rgba(255,255,255,0.5)" }}
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
                            onSubmit={handleSubmit}
                            dark
                        />
                    </div>
                </div>
            )}

            {/* ─── SECTION 1: HERO — with background image ─── */}
            <section
                className="relative min-h-screen flex flex-col overflow-hidden bg-cover bg-center
                    bg-[linear-gradient(160deg,rgba(7,7,126,0.75)_0%,rgba(5,5,80,0.85)_60%,rgba(3,3,50,0.92)_100%),url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/solar-plates-cleaning_lasnea.jpg')]
                    md:bg-[linear-gradient(160deg,rgba(7,7,126,0.7)_0%,rgba(5,5,80,0.82)_60%,rgba(3,3,50,0.9)_100%),url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.18_PM_vt57zl.jpg')]"
            >
                {/* Subtle decorative circles — sit on top of image */}
                <div
                    className="pointer-events-none absolute"
                    style={{
                        top: "-200px", right: "-200px",
                        width: 700, height: 700,
                        border: "1px solid rgba(255,229,77,0.08)",
                        borderRadius: "50%",
                    }}
                />
                <div
                    className="pointer-events-none absolute"
                    style={{
                        top: "-100px", right: "-100px",
                        width: 500, height: 500,
                        border: "1px solid rgba(255,229,77,0.05)",
                        borderRadius: "50%",
                    }}
                />
                <div
                    className="pointer-events-none absolute"
                    style={{
                        bottom: "-80px", left: "-80px",
                        width: 400, height: 400,
                        border: "1px solid rgba(255,229,77,0.04)",
                        borderRadius: "50%",
                    }}
                />

                {/* NAV */}
                <nav className="relative z-10 flex items-center justify-end px-6 pt-5 pb-2">
                    <Link
                        href={`tel:${BUSINESS.phoneRaw}`}
                        className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                        style={{ background: YELLOW, color: NAVY, boxShadow: "0 4px 20px rgba(255,229,77,0.4)" }}
                    >
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.3)", animation: "pulse 1.5s infinite" }}
                        />
                        {BUSINESS.phone}
                    </Link>
                </nav>

                {/* HERO BODY */}
                <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-10 pt-6 text-center text-white">
                    {/* Tag */}
                    <div
                        className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest"
                        style={{ borderColor: "rgba(255,229,77,0.35)", color: YELLOW }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                        Recover up to 30% lost output
                    </div>

                    {/* Headline */}
                    <h1 className="mb-4 leading-none font-black text-white" style={{ fontSize: "clamp(40px,8vw,80px)", letterSpacing: "0.5px" }}>
                        Perth&apos;s Solar Panel
                        <br />
                        <span style={{ color: YELLOW }}>Cleaning Specialists</span>
                    </h1>

                    {/* Sub */}
                    <p className="mb-8 max-w-sm text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                        Dirty panels silently cost you money. We restore full output using manufacturer-approved purified water technology — safely, streak-free.
                    </p>

                    {/* CTAs */}
                    <div className="mb-8 flex w-full max-w-sm flex-col gap-3">
                        <Link
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="flex items-center justify-center gap-3 rounded-2xl py-4 font-bold text-base transition-all hover:-translate-y-0.5"
                            style={{ background: YELLOW, color: NAVY, boxShadow: "0 6px 32px rgba(255,229,77,0.4)" }}
                        >
                            <Phone className="w-5 h-5" />
                            Call for Instant Quote
                        </Link>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex items-center justify-center gap-2 rounded-2xl border py-4 font-medium text-base transition-all hover:bg-white/10 cursor-pointer"
                            style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}
                        >
                            Get a Free Text Quote →
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { icon: "🛡️", text: "$20M Insured" },
                            { icon: "👮", text: "Police Cleared" },
                            { icon: "💧", text: "Purified Water Tech" },
                            { icon: "⭐", text: "5.0 Google Reviews" },
                        ].map((b) => (
                            <span
                                key={b.text}
                                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.85)" }}
                            >
                                {b.icon} {b.text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SECTION 2: STATS STRIP ─── */}
            <section style={{ background: YELLOW }}>
                <div className="mx-auto grid max-w-4xl grid-cols-4">
                    {[
                        { num: "30%", label: "Output Recovered" },
                        { num: "5.0★", label: "Google Rating" },
                        { num: "$20M", label: "Insured" },
                        { num: "24hr", label: "Response Time" },
                    ].map((s, i) => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center justify-center py-5 text-center"
                            style={{ borderRight: i < 3 ? `1px solid rgba(7,7,126,0.15)` : "none" }}
                        >
                            <span
                                className="leading-none font-black"
                                style={{ fontSize: "clamp(18px,4vw,34px)", color: NAVY }}
                            >
                                {s.num}
                            </span>
                            <span className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(7,7,126,0.55)" }}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 3: LEAD FORM (split layout) ─── */}
            <section className="px-5 py-16" style={{ background: NAVY }}>
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
                    {/* Left copy */}
                    <div>
                        <div
                            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                            style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}
                        >
                            Get your free quote
                        </div>
                        <h2
                            className="mb-3 leading-none text-white font-black"
                            style={{ fontSize: "clamp(32px,5vw,52px)" }}
                        >
                            How Much Are Dirty Panels Costing You?
                        </h2>
                        <p className="mb-8 text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            Fill in your details and we&apos;ll text you a price within 60 minutes. No obligation, no pushy sales.
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                "Fast reply — usually within the hour",
                                "Same-week and next-day slots available",
                                "Manufacturer-approved cleaning method",
                                "No lock-in contracts",
                            ].map((point, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                                    <div
                                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs"
                                        style={{ background: "rgba(255,229,77,0.15)", border: "1px solid rgba(255,229,77,0.35)", color: YELLOW }}
                                    >
                                        ✓
                                    </div>
                                    {point}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right form card */}
                    <div className="rounded-2xl p-6 shadow-2xl" style={{ background: "white" }}>
                        <h3 className="mb-1 font-bold text-base" style={{ color: NAVY }}>Get a Fast Text Quote</h3>
                        <p className="mb-5 text-sm" style={{ color: "#888" }}>We&apos;ll reply within 60 minutes</p>
                        <LeadForm
                            submitted={submitted}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </section>

            {/* ─── SECTION 4: TRUSTED BY ─── */}
            <section className="px-6 py-10 text-center" style={{ background: "#f4f6ff" }}>
                <p className="mb-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "#aaa" }}>
                    Trusted by Perth businesses
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10">
                    {[
                        { src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1772795795/toyota-logo_bcplvi.png", alt: "Toyota" },
                        { src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1772795795/richad-logo_u2l4jl.png", alt: "Richard Group" },
                        { src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1772795794/bespoke-logo_lulwwt.png", alt: "Bespoke" },
                    ].map((logo) => (
                        <div key={logo.alt} className="relative h-13 w-28 grayscale transition duration-300 hover:grayscale-0">
                            <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 5: DID YOU KNOW callout ─── */}
            <section className="px-5 py-12" style={{ background: "#f4f6ff" }}>
                <div
                    className="mx-auto max-w-4xl rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
                    style={{ background: NAVY }}
                >
                    {/* decorative circle */}
                    <div className="pointer-events-none absolute" style={{ top: "-80px", right: "-80px", width: 300, height: 300, border: "1px solid rgba(255,229,77,0.08)", borderRadius: "50%" }} />
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(255,229,77,0.12)", color: YELLOW }}
                    >
                        Did you know?
                    </div>
                    <h3 className="text-white font-black mb-4" style={{ fontSize: "clamp(22px,4vw,36px)", lineHeight: 1.1 }}>
                        Dirty Panels Could Be Costing You<br />
                        <span style={{ color: YELLOW }}>Money Right Now</span>
                    </h3>
                    <p className="mx-auto max-w-xl text-base font-light leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                        Studies show a thin layer of dust and grime can reduce solar panel output by 15–30%. In Perth&apos;s dusty climate — with frequent easterly winds, bushfire smoke, and high bird activity — panels lose significant efficiency within just a few months.
                    </p>
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                        style={{ background: "rgba(255,229,77,0.12)", color: YELLOW, border: "1px solid rgba(255,229,77,0.25)" }}
                    >
                        ✨ Regular cleaning is the #1 way to protect your energy returns
                    </div>
                </div>
            </section>

            {/* ─── SECTION 6: BENTO WHY US ─── */}
            <section className="px-5 pb-16" style={{ background: "#f4f6ff" }}>
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div
                        className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}
                    >
                        Why Aspect
                    </div>
                    <h2
                        className="mb-3 leading-none"
                        style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}
                    >
                        Why Perth Homeowners Trust Us for Solar Cleaning
                    </h2>
                    <p className="mx-auto max-w-lg text-base font-light leading-relaxed" style={{ color: "#888" }}>
                        Safe, effective, and manufacturer-approved — so your panels are restored without any risk of damage or voided warranty.
                    </p>
                </div>

                {/* Bento grid */}
                <div className="mx-auto grid max-w-4xl grid-cols-12 gap-3">
                    {/* Big navy card */}
                    <div className="col-span-12 md:col-span-5 rounded-2xl p-6" style={{ background: NAVY }}>
                        <div className="mb-2 leading-none font-black" style={{ fontSize: 56, color: YELLOW }}>
                            30%
                        </div>
                        <p className="font-bold text-base text-white mb-2">Output Recovered</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            Professional cleaning restores full sunlight absorption — recovering up to 30% of lost output and maximising daily electricity generation.
                        </p>
                    </div>

                    {/* Wide white card */}
                    <div className="col-span-12 md:col-span-7 rounded-2xl p-6 bg-white">
                        <div
                            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                            style={{ background: "rgba(7,7,126,0.07)" }}
                        >
                            <Sun className="w-5 h-5" style={{ color: NAVY }} />
                        </div>
                        <p className="font-bold text-base mb-2" style={{ color: NAVY }}>Manufacturer-Approved Method</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "#888" }}>
                            We use soft-brush, purified water systems — the method recommended by all major solar panel manufacturers. No harsh chemicals, no abrasive tools, zero risk of voiding your warranty.
                        </p>
                    </div>

                    {/* 3 small cards */}
                    {[
                        { icon: <Shield className="w-5 h-5" style={{ color: NAVY }} />, title: "Trained & Insured", body: "$20M public liability and police clearance on every job. Safe roof access guaranteed." },
                        { icon: <Zap className="w-5 h-5" style={{ color: NAVY }} />, title: "Transparent Pricing", body: "The price we quote is the price you pay. No hidden fees, no surprises." },
                        { icon: <ClipboardCheck className="w-5 h-5" style={{ color: NAVY }} />, title: "Post-Clean Report", body: "We inspect every panel while cleaning and flag any damage or concerns.", yellow: true },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="col-span-12 md:col-span-4 rounded-2xl p-5"
                            style={{ background: (card as { yellow?: boolean }).yellow ? YELLOW : "white" }}
                        >
                            <div
                                className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                                style={{ background: (card as { yellow?: boolean }).yellow ? "rgba(7,7,126,0.1)" : "rgba(7,7,126,0.06)" }}
                            >
                                {card.icon}
                            </div>
                            <p className="font-bold text-sm mb-1.5" style={{ color: NAVY }}>{card.title}</p>
                            <p className="text-xs font-light leading-relaxed" style={{ color: (card as { yellow?: boolean }).yellow ? "rgba(7,7,126,0.6)" : "#888" }}>
                                {card.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 7: BEFORE / AFTER ─── */}
            <section className="px-5 py-16 bg-white">
                <div className="mx-auto mb-8 max-w-4xl text-center">
                    <div
                        className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}
                    >
                        Our results
                    </div>
                    <h2
                        className="leading-none"
                        style={{ fontSize: "clamp(36px,5vw,52px)", color: NAVY }}
                    >
                        See the Difference
                    </h2>
                </div>
                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-4">
                        <BeforeAfterSlider
                            initial={50}
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/solar-pannel-clean_cigwab.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* ─── SECTION 8: HOW IT WORKS ─── */}
            <section className="px-5 py-16" style={{ background: "#f4f6ff" }}>
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div
                        className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}
                    >
                        How it works
                    </div>
                    <h2
                        className="mb-3 leading-none"
                        style={{ fontSize: "clamp(36px,5vw,52px)", color: NAVY }}
                    >
                        Booked & Done in 4 Steps
                    </h2>
                    <p className="mx-auto max-w-md text-base font-light" style={{ color: "#888" }}>
                        Simple, safe, and completely hassle-free from first contact to fully restored panels.
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
                                <div key={step.num} className="flex flex-col items-center text-center">
                                    <div
                                        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full font-black"
                                        style={{
                                            background: NAVY,
                                            color: YELLOW,
                                            fontSize: 22,
                                            boxShadow: `0 4px 20px rgba(7,7,126,0.25)`,
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

            {/* ─── SECTION 9: REVIEWS ─── */}
            <section className="px-5 py-16 bg-white">
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <h2
                        className="mb-2 leading-none"
                        style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}
                    >
                        Perth Homeowners Love Us
                    </h2>
                    <Link
                        href="https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z"
                        target="_blank"
                        className="text-sm font-medium hover:underline"
                        style={{ color: "#888" }}
                    >
                        5.0 across 100+ Google Reviews
                    </Link>
                </div>
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
                    {googleReviews.map((r, i) => (
                        <div
                            key={i}
                            className="relative overflow-hidden rounded-2xl p-5"
                            style={{ background: "#f4f6ff", border: "1px solid rgba(7,7,126,0.07)" }}
                        >
                            <span
                                className="pointer-events-none absolute right-4 top-2 select-none font-black leading-none"
                                style={{ fontSize: 80, color: "rgba(7,7,126,0.05)" }}
                            >
                                "
                            </span>
                            <div className="mb-2 flex gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="mb-4 text-sm leading-relaxed" style={{ color: "#444" }}>&ldquo;{r.text}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-black text-sm"
                                    style={{ background: NAVY, color: YELLOW }}
                                >
                                    {r.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div>
                                    <p className="font-bold text-sm" style={{ color: NAVY }}>{r.name}</p>
                                    <p className="text-xs" style={{ color: "#aaa" }}>{r.suburb}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 10: FOOTER CTA ─── */}
            <section
                className="relative overflow-hidden px-5 py-16 text-center"
                style={{ background: NAVY }}
            >
                <div
                    className="pointer-events-none absolute"
                    style={{ top: "-150px", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, border: "1px solid rgba(255,229,77,0.05)", borderRadius: "50%" }}
                />
                <div className="relative z-10">
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}
                    >
                        Ready to boost your solar output?
                    </div>
                    <h2
                        className="mb-3 leading-none text-white"
                        style={{ fontSize: "clamp(40px,6vw,60px)" }}
                    >
                        Book Your Solar Clean Today
                    </h2>
                    <p className="mb-8 text-base font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Same-week slots available. Free, no-obligation quote in 60 minutes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="flex items-center gap-2 rounded-2xl px-7 py-4 font-bold text-base transition-all hover:-translate-y-0.5"
                            style={{ background: YELLOW, color: NAVY, boxShadow: "0 6px 28px rgba(255,229,77,0.35)" }}
                        >
                            <Phone className="w-5 h-5" />
                            Call {BUSINESS.phone}
                        </Link>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex items-center gap-2 rounded-2xl border px-7 py-4 font-medium text-base transition-all hover:bg-white/10 cursor-pointer"
                            style={{ borderColor: "rgba(255,255,255,0.25)", color: "white" }}
                        >
                            Get a Text Quote →
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── STICKY BAR ─── */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center px-5 py-3"
                style={{ background: NAVY, borderTop: `2px solid ${YELLOW}`, boxShadow: "0 -4px 24px rgba(7,7,126,0.3)" }}
            >
                <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-white">Aspect Window Cleaning</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Perth&apos;s #1 Rated</p>
                </div>
                <Link
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-sm transition-all hover:scale-105 sm:ml-auto"
                    style={{ background: YELLOW, color: NAVY }}
                >
                    <Phone className="w-4 h-4" />
                    Call Now — {BUSINESS.phone}
                </Link>
            </div>
            {/* spacer so content isn't hidden behind sticky bar */}
            <div className="h-16" style={{ background: NAVY }} />

            <style>{`
                @keyframes pulse {
                    0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
                    50%      { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
                }
            `}</style>
        </>
    );
}