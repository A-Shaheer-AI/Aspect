"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, CheckCircle2, Star, Shield, Droplets, Zap, Building2, X, Tag, ChevronLeft, ChevronRight } from "lucide-react";
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

const whatsInclude = [
    {
        title: "Interior & Exterior Glass",
        description:
            "Full clean of both sides of every window pane — removing dirt, water spots, and environmental buildup for a streak-free finish.",
        img: "https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/gallery-1.jpg"
    },
    {
        title: "Frames, Sills & Tracks",
        description:
            "We clean all frames, sills, and sliding tracks to remove grime, mould, and built-up debris that harbour bacteria and damage seals.",
        img: "https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/gallery-2.jpg"
    },
    {
        title: "Screen & Fly Screen Cleaning",
        description:
            "Screens are removed, cleaned, and refitted — removing dust, pollen, and grime that blocks airflow and reduces light.",
        img: "https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/gallery-3.jpg"
    },
    {
        title: "Pure Water Cleaning Method",
        description:
            "We use purified, deionised water that leaves zero mineral residue on glass — meaning windows stay cleaner for longer after each service.",
        img: "https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/gallery-4.jpg"
    },
    {
        title: "Hard Water Stain Removal",
        description:
            "Stubborn mineral deposits and hard water stains are treated with specialist solutions, restoring glass clarity where standard cleaning can't.",
        img: "https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/gallery-5.jpg"
    },
    {
        title: "Cobweb & Debris Clearing",
        description:
            "We remove cobwebs, spider nests, and environmental debris from corners, eaves, and window surroundings for a truly spotless finish.",
        img: "https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/gallery-6.jpg"
    }
];

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function WindowCleaningAdsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [showPromo, setShowPromo] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
                message: formData.promo,
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
        { num: "01", title: "Call or Quote", body: "Call us or fill the form. We'll text a price within the hour.", clickable: true },
        { num: "02", title: "We Confirm", body: "Pick a time that works. Same-week slots usually available.", clickable: false },
        { num: "03", title: "We Clean", body: "Our team arrives on time and gets every pane streak-free.", clickable: false },
        { num: "04", title: "You Enjoy", body: "Crystal-clear windows, guaranteed. Book again anytime.", clickable: false },
    ];

    const windowCleaningReviews = [
        {
            id: 1,
            name: "Hussai",
            reviews: "2 reviews",
            rating: 5,
            date: "3 months ago",
            content:
                "Great work! I called them for cleaning the windows at my home. The team arrived on time, were friendly and professional, and took great care. The windows came out spotless and clear.",
        },
        {
            id: 2,
            name: "June Bird",
            reviews: "3 reviews",
            rating: 5,
            date: "2 months ago",
            content:
                "Guys did a beautiful job. My windows are sparkling. Two very nice gentlemen. Highly recommend.",
        },
        {
            id: 3,
            name: "Taylor Bow",
            reviews: "5 reviews",
            rating: 5,
            date: "2 months ago",
            content:
                "Aspect Window Cleaning did a great job cleaning the inside and outside of the windows at my North Perth property. Good service, communication, and professionalism.",
        },
        {
            id: 4,
            name: "Shabnam",
            reviews: "1 review",
            rating: 5,
            date: "8 months ago",
            content:
                "The team was punctual, professional, and paid great attention to detail. Our windows are spotless inside and out, including screens and tracks.",
        },
        {
            id: 5,
            name: "Ross Glossop",
            reviews: "2 reviews",
            rating: 5,
            date: "3 months ago",
            content:
                "The Aspect team did an amazing job cleaning our many windows. Enthusiastic and thorough work. Great job thank you.",
        },
        {
            id: 6,
            name: "Sabine Parker",
            reviews: "12 reviews",
            rating: 5,
            date: "5 months ago",
            content:
                "Prompt and professional service. Did an amazing job on our double glazed windows and sliding doors. Highly recommend.",
        },
        {
            id: 7,
            name: "Krystal Copley",
            reviews: "5 reviews",
            rating: 5,
            date: "2 months ago",
            content:
                "Lovely people. Quick reply, came for a free quote. Good communication and very professional service.",
        },
        {
            id: 8,
            name: "lynne",
            reviews: "2 reviews",
            rating: 5,
            date: "2 months ago",
            content:
                "Good communication, competitive price, fast and efficient service. Beautifully clean windows and screens. Thank you!",
        },
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
            <section
                className="relative min-h-screen flex flex-col items-center justify-center md:px-5 pb-10 text-white bg-cover bg-center
  bg-[linear-gradient(160deg,rgba(10,22,40,0.5)_0%,rgba(15,37,69,0.8)_60%,rgba(19,48,96,0.8)_100%),url('/landing-hero-bg.jpeg')]
  md:bg-[linear-gradient(160deg,rgba(10,22,40,0.5)_0%,rgba(15,37,69,0.8)_60%,rgba(19,48,96,0.8)_100%),url('/landing-hero-bg.jpeg')]"
            >

                {/* HERO BODY */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1300px] mx-auto items-center gap-12 px-5 pb-10 pt-6">

                    {/* LEFT SIDE: BADGE, IMAGES, CTA */}
                    <div className="flex flex-col items-start text-left text-white lg:pr-8 w-full max-w-xl mx-auto lg:max-w-none">
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest"
                            style={{ borderColor: "rgba(255,229,77,0.35)", color: YELLOW }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
                            Same-week booking available
                        </div>

                        {/* MOBILE HEADING (Hidden on desktop) */}
                        <div className="lg:hidden text-center text-white mb-8 w-full">
                            <h1 className="mb-4 leading-none font-black text-white" style={{ fontSize: "clamp(32px,4vw,56px)", letterSpacing: "1px" }}>
                                Perth&apos;s #1
                                <br />
                                <span style={{ color: YELLOW }}>Window Cleaners</span>
                            </h1>
                            <p className="w-full text-base font-light leading-relaxed mx-auto max-w-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
                                Next-Day Availability. Commercial-Grade Pure Water Cleaning for Homes & Businesses.
                            </p>
                        </div>

                        {/* IMAGES GALLERY: Scrollable on mobile, 3x2 on desktop */}
                        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-3 lg:gap-4 pb-4 lg:pb-0 snap-x mb-8 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <style>{`
                                .snap-x::-webkit-scrollbar { display: none; }
                            `}</style>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <div
                                    key={num}
                                    onClick={() => { setCurrentImageIndex(num - 1); setGalleryOpen(true); }}
                                    className="relative w-48 h-36 lg:w-full lg:aspect-[4/3] lg:h-auto flex-shrink-0 snap-center rounded-xl overflow-hidden shadow-lg border border-white/20 hover:scale-105 cursor-pointer transition-all duration-300"
                                >
                                    <Image
                                        src={`https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/gallery-${num}.jpg`}
                                        alt={`Recent Work ${num}`}
                                        fill
                                        sizes="(max-width: 1024px) 192px, 33vw"
                                        priority={num <= 3}
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-md">
                            {[
                                { icon: "🛡️", text: "$20M Insured" },
                                { icon: "👮", text: "Police Cleared" },
                                { icon: "💧", text: "Pure Water Tech" },
                                { icon: "⭐", text: "5.0 Google Reviews" },
                            ].map((b) => (
                                <span
                                    key={b.text}
                                    className="flex items-center justify-center gap-1 sm:gap-2 rounded-full px-1 sm:px-5 py-2.5 text-[11px] sm:text-sm md:text-base font-semibold text-center"
                                    style={{ background: "rgba(255,229,77,0.15)", border: "1px solid rgba(255,229,77,0.4)", color: YELLOW }}
                                >
                                    <span className="text-sm sm:text-lg">{b.icon}</span> <span className="whitespace-nowrap">{b.text}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: HEADING, DESC & FORM */}
                    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto lg:max-w-[480px] lg:ml-auto lg:mr-0">
                        
                        <div className="hidden lg:block text-left text-white">
                            <h1 className="mb-4 leading-none font-black text-white" style={{ fontSize: "clamp(36px,4vw,56px)", letterSpacing: "1px" }}>
                                Perth&apos;s #1
                                <br />
                                <span style={{ color: YELLOW }}>Window Cleaners</span>
                            </h1>

                            <p className="w-full text-base font-light leading-relaxed mx-auto lg:mx-0 max-w-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
                                Next-Day Availability. Commercial-Grade Pure Water Cleaning for Homes & Businesses.
                            </p>
                        </div>

                        {/* LEAD FORM */}
                        <div className="rounded-3xl p-5 shadow-2xl w-full bg-white border border-gray-100 mx-auto">
                            <h3 className="mb-2 font-black text-xl leading-tight text-center" style={{ color: NAVY }}>
                                Ready for Spotless Windows?
                            </h3>
                            <p className="mb-5 text-xs text-center" style={{ color: "#888" }}>
                                We&apos;ll reply with a fast quote within 60 minutes.
                            </p>
                            <LeadForm
                                submitted={submitted}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={handleSubmit}
                                showPromo={false}
                            />
                        </div>

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

            {/* ─── SECTION 3: REVIEWS ─── */}
            <section className="max-w-7xl mx-auto px-5 py-16 bg-white">
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
                        5.0 across 30+ Google Reviews
                    </Link>
                </div>
                <GoogleReviews reviews={windowCleaningReviews} />
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
                            <Image
                                src={logo.src.replace(
                                    "/upload/",
                                    "/upload/f_auto,q_auto/"
                                )}
                                alt={logo.alt}
                                fill
                                sizes="112px"
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 5: BENTO WHY US ─── */}
            <section className="px-5 py-16" style={{ background: "#f4f6ff" }}>
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}>
                        Why Aspect
                    </div>
                    <h2 className="mb-3 leading-none" style={{ fontSize: "clamp(24px,5vw,52px)", color: NAVY }}>
                        Not All Window Cleaners Are the Same
                    </h2>
                    <p className="mx-auto max-w-lg text-base font-light leading-relaxed" style={{ color: "#888" }}>
                        We&apos;ve cleaned thousands of Perth homes and businesses. Here&apos;s what makes us different.
                    </p>
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-5 rounded-2xl p-6" style={{ background: NAVY }}>
                        <div className="mb-2 leading-none font-black" style={{ fontSize: 56, color: YELLOW }}>100%</div>
                        <p className="font-bold text-base text-white mb-2">Satisfaction Guaranteed</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                            If anything falls short, we return and fix it at no extra cost. No questions asked.
                        </p>
                    </div>
                    <div className="col-span-12 md:col-span-7 rounded-2xl p-6 bg-white">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(7,7,126,0.07)" }}>
                            <Droplets className="w-5 h-5" style={{ color: NAVY }} />
                        </div>
                        <p className="font-bold text-base mb-2" style={{ color: NAVY }}>Pure Water Technology</p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "#888" }}>
                            Our commercial RO/DI filtration system uses zero chemicals — glass stays cleaner for longer, even after rain. No streaks, no residue.
                        </p>
                    </div>
                    {[
                        { icon: <Shield className="w-5 h-5" style={{ color: NAVY }} />, title: "Fully Insured", body: "$20M public liability so you're always protected on every job." },
                        { icon: <Zap className="w-5 h-5" style={{ color: NAVY }} />, title: "Urgent & Flexible", body: "Next-day emergency cleans available for rental inspections." },
                        { icon: <Building2 className="w-5 h-5" style={{ color: NAVY }} />, title: "Police Cleared", body: "Background-checked team you can trust inside your home.", yellow: true },
                    ].map((card) => (
                        <div key={card.title} className="col-span-12 md:col-span-4 rounded-2xl p-5" style={{ background: card.yellow ? YELLOW : "white" }}>
                            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: card.yellow ? "rgba(7,7,126,0.1)" : "rgba(7,7,126,0.06)" }}>
                                {card.icon}
                            </div>
                            <p className="font-bold text-sm mb-1.5" style={{ color: NAVY }}>{card.title}</p>
                            <p className="text-xs font-light leading-relaxed" style={{ color: card.yellow ? "rgba(7,7,126,0.6)" : "#888" }}>{card.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 6: BEFORE / AFTER ─── */}
            <section className="px-5 py-16 bg-white">
                <div className="mx-auto mb-8 max-w-4xl text-center">
                    <div className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(7,7,126,0.07)", color: NAVY }}>
                        Our results
                    </div>
                    <h2 className="leading-none" style={{ fontSize: "clamp(36px,5vw,52px)", color: NAVY }}>
                        See the Difference
                    </h2>
                </div>
                <div className="mx-auto max-w-4xl">
                    <div className="mb-4 overflow-hidden rounded-2xl" style={{ height: 380 }}>
                        <video className="h-full w-full object-cover" controls preload="metadata">
                            <source src="https://res.cloudinary.com/dr8tjrszy/video/upload/v1772968701/VID-20260228-WA0016_xsz3cm_401388.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1774345158/IMG_9593_1_2_b98bl5.png"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.03_PM_vtb2tn.jpg"
                            initial={50}
                        />
                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/after.jpg"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/aspect_gallery/before.jpg"
                            initial={50}
                        />
                    </div>
                </div>
            </section>

            {/* ─── SECTION 6.5: WHAT'S INCLUDED ─── */}
            <section className="py-16 bg-gray-50 px-5">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-sm font-semibold uppercase mb-2 text-center" style={{ color: YELLOW }}>
                        WHAT'S INCLUDED
                    </h3>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-8" style={{ color: NAVY }}>
                        Everything Covered in Our Window Clean
                    </h2>
                    <p className="mb-10 text-center max-w-2xl mx-auto text-base font-light" style={{ color: "#888" }}>
                        We don't cut corners. Every booking includes a full, thorough clean of all accessible window components — not just the glass.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {whatsInclude.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                            >
                                <div className="relative w-full h-48 bg-gray-100 flex-shrink-0 overflow-hidden">
                                    <Image 
                                        src={item.img} 
                                        alt={item.title} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                <div className="p-6 flex flex-col gap-3">
                                    <h4 className="font-semibold text-lg" style={{ color: NAVY }}>
                                        {item.title}
                                    </h4>
                                    <p className="text-sm leading-relaxed font-light" style={{ color: "#888" }}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SECTION 7: HOW IT WORKS ─── */}
            <section className="px-5 py-16" style={{ background: "#f4f6ff" }}>
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



            {/* ─── SECTION 9: FOOTER CTA ─── */}
            <section className="relative overflow-hidden px-5 py-16 text-center" style={{ background: NAVY }}>
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
                        <Link
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="flex items-center gap-2 rounded-2xl px-7 py-4 font-bold text-base transition-all hover:-translate-y-0.5"
                            style={{ background: YELLOW, color: NAVY, boxShadow: "0 6px 28px rgba(255,229,77,0.35)" }}
                        >
                            <Phone className="w-5 h-5" />
                            Call {BUSINESS.phone}
                        </Link>
                        <button
                            onClick={openRegularModal}
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
            {/* spacer */}
            <div className="h-16" style={{ background: NAVY }} />

            {/* GALLERY SLIDESHOW POPUP */}
            {galleryOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4">
                    <button onClick={() => setGalleryOpen(false)} className="absolute top-4 right-4 text-white p-2">
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative w-full max-w-4xl aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden">
                        <Image src={`/gallery/gallery-${currentImageIndex + 1}.jpeg`} alt="Gallery" fill className="object-contain" />
                    </div>
                    <button onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : 5)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black transition-colors">
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button onClick={() => setCurrentImageIndex(prev => prev < 5 ? prev + 1 : 0)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/50 rounded-full hover:bg-black transition-colors">
                        <ChevronRight className="w-8 h-8" />
                    </button>
                    <div className="text-white mt-4 font-semibold">{currentImageIndex + 1} / 6</div>
                </div>
            )}
        </>
    );
}