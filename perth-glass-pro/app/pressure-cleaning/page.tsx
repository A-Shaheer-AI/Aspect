"use client";

import { useEffect, useState } from "react";
import { Phone, CheckCircle2, Star, Shield, Zap, Droplets, Leaf, X, Tag } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { sendLeadEmail } from "../actions/send-email";
import { trackFormCompleted } from "@/hooks/useGtm";
import GoogleReviews from "@/components/GoogleReviews";


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
export default function PressureWashingAdsPage() {
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
                setSubmitted(true);
                trackFormCompleted();
            };
        } catch (e) {
            console.error(e);
        }
        if (formData.name && formData.phone && formData.suburb) setSubmitted(true);
    };

    const surfaces = [
        { icon: "🏠", label: "Driveways & Pathways" },
        { icon: "🪵", label: "Patios & Decks" },
        { icon: "🧱", label: "Walls & Fences" },
        { icon: "🏘️", label: "House Exteriors" },
        { icon: "🅿️", label: "Car Parks" },
        { icon: "🏊", label: "Pool Surrounds" },
    ];

    const processSteps = [
        {
            num: "01",
            title: "Assessment",
            body: "We assess the surface type and soiling level, then select the right pressure and solutions.",
            clickable: true
        },
        {
            num: "02",
            title: "Pre-Treatment",
            body: "Eco-friendly degreaser applied to break down oil, grease, and biological growth.",
            clickable: false
        },
        {
            num: "03",
            title: "Pressure Wash",
            body: "Methodical high-pressure clean across every area — removing all dirt and buildup.",
            clickable: false
        },
        {
            num: "04",
            title: "Final Rinse",
            body: "Thorough rinse removes all detergent and debris. Surfaces left clean and residue-free.",
            clickable: false
        },
    ];

    const pressureCleaningReviews = [
        {
            id: 1,
            name: "Vicki Slate",
            reviews: "3 reviews",
            rating: 5,
            date: "3 weeks ago",
            content:
                "These guys did a fantastic job cleaning windows, jams, runners, pressure washing eaves, decks and sidewalks, removing mould from brickwork that hadn’t been done in probably 10 years. Very professional and thorough service.",
        },
        {
            id: 2,
            name: "Laura McCarthy",
            reviews: "14 reviews",
            rating: 5,
            date: "6 days ago",
            content:
                "The team did a very thorough and professional job on our 3 storey house with difficult access areas. They also handled exterior cleaning and pressure washing where needed. Very happy with the results.",
        },
        {
            id: 3,
            name: "J Buchanan",
            reviews: "5 reviews",
            rating: 5,
            date: "3 days ago",
            content:
                "Aspect cleaned gutters very professionally and swiftly. Job was well done and all agreed work including exterior cleaning was completed exactly as promised. Highly recommended.",
        },
        {
            id: 4,
            name: "Ronny Brown",
            reviews: "16 reviews",
            rating: 5,
            date: "5 days ago",
            content:
                "The guys were great, turned up very fast and did an excellent job including exterior cleaning work. Would recommend them to everybody.",
        },
        {
            id: 5,
            name: "Martin Abreu",
            reviews: "3 reviews",
            rating: 5,
            date: "4 days ago",
            content:
                "Did an excellent job cleaning gutters and exterior surfaces. Very professional and efficient service.",
        },
    ];

    const NAVY = "#07077E";
    const YELLOW = "#FFE54D";
    const HERO_VIDEO_URL = "https://res.cloudinary.com/dr8tjrszy/video/upload/v1776147185/window-cleaning-services-in-perth_ejfjoh.mp4";
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
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[linear-gradient(160deg,rgba(7,7,126,0.75)_0%,rgba(5,5,80,0.85)_60%,rgba(3,3,50,0.92)_100%)]">

                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={HERO_VIDEO_URL}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={HERO_VIDEO_URL} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-hero-overlay z-0" aria-hidden="true" />


                {/* Decorative circles */}
                <div className="pointer-events-none absolute" style={{ top: "-200px", right: "-200px", width: 700, height: 700, border: "1px solid rgba(255,229,77,0.08)", borderRadius: "50%" }} />
                <div className="pointer-events-none absolute" style={{ top: "-100px", right: "-100px", width: 500, height: 500, border: "1px solid rgba(255,229,77,0.05)", borderRadius: "50%" }} />
                <div className="pointer-events-none absolute" style={{ bottom: "-80px", left: "-80px", width: 400, height: 400, border: "1px solid rgba(255,229,77,0.04)", borderRadius: "50%" }} />

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
                    <div
                        className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest"
                        style={{ borderColor: "rgba(255,229,77,0.35)", color: YELLOW }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                        Same-week booking available
                    </div>

                    <h1 className="mb-4 leading-none font-black text-white" style={{ fontSize: "clamp(40px,8vw,80px)", letterSpacing: "0.5px" }}>
                        Perth&apos;s Pressure
                        <br />
                        <span style={{ color: YELLOW }}>Washing Specialists</span>
                    </h1>

                    <p className="mb-8 max-w-sm text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                        Driveways, patios, walls, and exteriors restored to near-new condition. Commercial-grade equipment, eco-friendly solutions, zero surface damage.
                    </p>

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

                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            { icon: "🛡️", text: "$20M Insured" },
                            { icon: "👮", text: "Police Cleared" },
                            { icon: "🌿", text: "Eco-Friendly" },
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
                        { num: "100+", label: "Happy Clients" },
                        { num: "5.0★", label: "Google Rating" },
                        { num: "$20M", label: "Insured" },
                        { num: "24hr", label: "Response Time" },
                    ].map((s, i) => (
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

            {/* ─── SECTION 3: LEAD FORM ─── */}
            <section className="px-5 py-16" style={{ background: NAVY }}>
                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
                    <div>
                        <div
                            className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                            style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}
                        >
                            Get your free quote
                        </div>
                        <h2 className="mb-3 leading-none text-white font-black" style={{ fontSize: "clamp(32px,5vw,52px)" }}>
                            Ready to Restore Your Property?
                        </h2>
                        <p className="mb-8 text-base font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            Fill in your details and we&apos;ll text you a price within 60 minutes. No obligation, no pushy sales.
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                "Fast reply — usually within the hour",
                                "Same-week and next-day slots available",
                                "Eco-friendly, pet-safe solutions",
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

            {/* ─── SECTION 5: SURFACES WE CLEAN ─── */}
            <section className="px-5 py-12" style={{ background: "#f4f6ff" }}>
                <div className="mx-auto mb-8 max-w-4xl text-center">
                    <div
                        className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}
                    >
                        What we clean
                    </div>
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(24px,5vw,48px)", color: NAVY }}>
                        Surfaces We Pressure Wash
                    </h2>
                    <p className="mx-auto max-w-md text-base font-light" style={{ color: "#888" }}>
                        From driveways to pool surrounds — we restore all outdoor surfaces safely and effectively.
                    </p>
                </div>
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-3">
                    {surfaces.map((s) => (
                        <div
                            key={s.label}
                            className="flex items-center gap-3 rounded-2xl px-4 py-4"
                            style={{ background: "white", border: "1px solid rgba(7,7,126,0.07)" }}
                        >
                            <span className="text-xl">{s.icon}</span>
                            <span className="text-sm font-semibold" style={{ color: NAVY }}>{s.label}</span>
                        </div>
                    ))}
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
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}>
                        Why Perth Homeowners Choose Us
                    </h2>
                    <p className="mx-auto max-w-lg text-base font-light leading-relaxed" style={{ color: "#888" }}>
                        Commercial-grade equipment, eco-friendly products, and zero surface damage — every single job.
                    </p>
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-12 gap-3">
                    {/* Big navy card */}
                    <div className="col-span-12 md:col-span-5 rounded-2xl p-6" style={{ background: NAVY }}>
                        <div className="mb-2 leading-none font-black" style={{ fontSize: 56, color: YELLOW }}>
                            100%
                        </div>
                        <p className="font-bold text-base text-white mb-2">Satisfaction Guaranteed</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            If anything falls short, we return and fix it at no extra cost. Not finished until you&apos;re completely happy.
                        </p>
                    </div>

                    {/* Wide white card */}
                    <div className="col-span-12 md:col-span-7 rounded-2xl p-6 bg-white">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(7,7,126,0.07)" }}>
                            <Zap className="w-5 h-5" style={{ color: NAVY }} />
                        </div>
                        <p className="font-bold text-base mb-2" style={{ color: NAVY }}>Professional Equipment & Adjusted Pressure</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "#888" }}>
                            Commercial-grade pressure washers with adjustable settings — matching the right pressure and nozzle to each surface type for a thorough clean without any risk of damage to pavers, render, or timber.
                        </p>
                    </div>

                    {/* 3 small cards */}
                    {[
                        { icon: <Shield className="w-5 h-5" style={{ color: NAVY }} />, title: "Fully Insured", body: "$20M public liability on every job. We work safely and responsibly on your property." },
                        { icon: <Leaf className="w-5 h-5" style={{ color: NAVY }} />, title: "Eco-Friendly Products", body: "Biodegradable detergents safe for your garden, lawn, and pets. No harmful residue left behind." },
                        { icon: <Droplets className="w-5 h-5" style={{ color: NAVY }} />, title: "Police Cleared", body: "Background-checked team you can trust on your property every time.", yellow: true },
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
                    <h2 className="leading-none" style={{ fontSize: "clamp(36px,5vw,52px)", color: NAVY }}>
                        See the Difference
                    </h2>
                </div>
                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-4">
                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772800983/after-cleaning-street_lhtqux.jpg"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772967205/street-before-cleaning_iupbdq.jpg"
                            initial={50}
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
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(36px,5vw,52px)", color: NAVY }}>
                        Booked & Done in 4 Steps
                    </h2>
                    <p className="mx-auto max-w-md text-base font-light" style={{ color: "#888" }}>
                        Simple, fast, and completely hassle-free from first contact to freshly restored surfaces.
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
                                    <p className="mb-2 font-bold text-sm" style={{ color: NAVY }}>{step.title}</p>
                                    <p className="text-xs font-light leading-relaxed" style={{ color: "#888" }}>{step.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SECTION 9: REVIEWS ─── */}
            <section className="max-w-7xl mx-auto px-5 py-16 bg-white">
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        ))}
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
                        5.0 across 30+ Google Reviews
                    </Link>
                </div>
                <GoogleReviews reviews={pressureCleaningReviews} />
            </section>

            {/* ─── SECTION 10: FOOTER CTA ─── */}
            <section className="relative overflow-hidden px-5 py-16 text-center" style={{ background: NAVY }}>
                <div
                    className="pointer-events-none absolute"
                    style={{ top: "-150px", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, border: "1px solid rgba(255,229,77,0.05)", borderRadius: "50%" }}
                />
                <div className="relative z-10">
                    <div
                        className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                        style={{ background: "rgba(255,229,77,0.1)", color: YELLOW }}
                    >
                        Ready to restore your property?
                    </div>
                    <h2 className="mb-3 leading-none text-white" style={{ fontSize: "clamp(40px,6vw,60px)" }}>
                        Book Your Pressure Wash Today
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
                className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3"
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
            {/* spacer */}
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