"use client";

import { useState } from "react";
import { Phone, Shield, Droplets, Zap, Building2, Star, CheckCircle2, BusIcon } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
    const [formData, setFormData] = useState({ name: "", phone: "", suburb: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (formData.name && formData.phone && formData.suburb) {
            setSubmitted(true);
        }
    };

    return (
        <div
            className="min-h-screen bg-white font-sans"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* Google Fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.22s; }
        .fade-up-3 { animation-delay: 0.34s; }
        .fade-up-4 { animation-delay: 0.46s; }
        .badge-row { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
      `}</style>

            {/* ─── SECTION 1: HERO ─── */}
            <section
                className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-10 pb-10 text-white"
                style={{ background: "linear-gradient(160deg, #0a1628 0%, #0f2545 60%, #133060 100%)" }}
            >
                {/* Offer ribbon */}
                <div
                    className="fade-up fade-up-1 mb-5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
                    style={{ background: "#f0a500", color: "#0a1628" }}
                >
                    🌸 Spring Offer — 15% Off First Clean When You Book This Week
                </div>

                {/* Headline */}
                <h1
                    className="fade-up fade-up-2 font-display text-center text-4xl leading-tight mb-2"
                    style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
                >
                    Perth's Trusted Local<br />Window Cleaners
                </h1>

                {/* Sub-headline */}
                <p className="fade-up fade-up-3 text-center text-base text-blue-100 mb-5 max-w-xs leading-snug">
                    Next-Day Availability. Commercial-Grade Pure Water Cleaning for Homes &amp; Businesses.
                </p>

                {/* Trust badges */}
                <div className="fade-up fade-up-3 badge-row mb-7">
                    {[
                        { icon: "🛡️", text: "$20M Insured" },
                        { icon: "👮", text: "Police Cleared" },
                        { icon: "💧", text: "RO/DI Tech" },
                    ].map((b) => (
                        <span
                            key={b.text}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
                        >
                            {b.icon} {b.text}
                        </span>
                    ))}
                </div>

                {/* CTA — Call */}
                <Link
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="fade-up fade-up-4 w-full max-w-sm flex items-center justify-center gap-3 rounded-xl py-4 text-lg font-bold mb-4 shadow-lg"
                    style={{ background: "#22c55e", color: "#fff", boxShadow: "0 4px 24px rgba(34,197,94,0.35)" }}
                >
                    <Phone className="w-5 h-5" fill="white" />
                    Call {BUSINESS.phoneRaw} for Instant Quote
                </Link>

                {/* Form */}
                <div
                    className="fade-up fade-up-4 w-full max-w-sm rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)" }}
                >
                    <p className="text-center text-sm text-blue-100 mb-3 font-medium">
                        Or get a <strong className="text-white">fast text quote</strong> in minutes:
                    </p>
                    {submitted ? (
                        <div className="flex flex-col items-center gap-2 py-3">
                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                            <p className="text-white font-semibold text-center">Got it! We'll text you shortly.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {[
                                { key: "name", placeholder: "Your Name" },
                                { key: "phone", placeholder: "Phone Number" },
                                { key: "suburb", placeholder: "Suburb" },
                            ].map((f) => (
                                <input
                                    key={f.key}
                                    type="text"
                                    placeholder={f.placeholder}
                                    value={formData[f.key as keyof typeof formData]}
                                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                                    className="w-full rounded-lg px-4 py-3 text-sm text-gray-900 outline-none"
                                    style={{ background: "rgba(255,255,255,0.92)" }}
                                />
                            ))}
                            <button
                                onClick={handleSubmit}
                                className="w-full rounded-lg py-3 text-sm font-bold mt-1"
                                style={{ background: "#f0a500", color: "#0a1628" }}
                            >
                                Get a Fast Text Quote →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── SECTION 2: TRUSTED BY BANNER ─── */}
            <section
                className="px-5 py-4 text-center"
                style={{ background: "#f4f4f5" }}
            >
                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mb-3">
                    Fully Compliant with Local Government &amp; Commercial Standards. Trusted By:
                </p>
                <div className="flex items-center justify-center gap-8 flex-wrap">
                    {/* Toyota placeholder */}
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className="w-14 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "#cc0000" }}
                        >
                            TOYOTA
                        </div>
                    </div>
                    {/* Furniture showroom placeholder */}
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className="w-14 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "#4b5563" }}
                        >
                            SHOWROOM
                        </div>
                    </div>
                    {/* Council placeholder */}
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className="w-14 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "#1d4ed8" }}
                        >
                            COUNCIL
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SECTION 3: PROOF GALLERY ─── */}
            <section className="max-w-5xl mx-auto px-5 py-8">
                <h2
                    className="font-display text-center text-2xl font-bold mb-5"
                    style={{ fontFamily: "'Syne', sans-serif", color: "#0f2545" }}
                >
                    See the Difference
                </h2>

                <div className="flex flex-col gap-4">
                    {/* Worker image */}
                    <div className="relative rounded-2xl overflow-hidden" style={{ height: 340 }}>
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/outside-windows-cleaning_lzp8fq.jpg"
                            alt="Aspect Window Cleaning technician using RO/DI pole system"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Before & After */}
                    <div className="relative rounded-2xl overflow-hidden" style={{ height: 520 }}>
                        <div className="flex h-full">
                            {/* Before */}
                            <div className="relative flex-1 overflow-hidden">
                                <Image
                                    src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.08_PM_1_x4ymo2.jpg"
                                    alt="Window before cleaning"
                                    fill
                                    className="object-cover"
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 py-1.5 text-center text-white text-sm font-bold"
                                    style={{ background: "rgba(0,0,0,0.45)" }}
                                >
                                    BEFORE
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-0.5 bg-white z-10" />

                            {/* After */}
                            <div className="relative flex-1 overflow-hidden">
                                <Image
                                    src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/shope-gates-cleaning_euctx1.jpg"
                                    alt="Window after cleaning — crystal clear"
                                    fill
                                    className="object-cover"
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 py-1.5 text-center text-white text-sm font-bold"
                                    style={{ background: "rgba(0,0,0,0.35)" }}
                                >
                                    AFTER ✨
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* ─── SECTION 4: WHY CHOOSE US — 2x2 GRID ─── */}
            <section className="max-w-5xl mx-auto px-5 py-8"
                style={{ background: "#f8fafc" }}>
                <h2
                    className="font-display text-center text-2xl font-bold mb-6"
                    style={{ fontFamily: "'Syne', sans-serif", color: "#0f2545" }}
                >
                    Why Choose Aspect?
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        {
                            icon: <Shield className="w-6 h-6" />,
                            title: "Fully Vetted & Safe",
                            body: "Police Cleared, $20M Public Liability, and White Card Certified.",
                            color: "#1d4ed8",
                        },
                        {
                            icon: <Droplets className="w-6 h-6" />,
                            title: "Pure Water Technology",
                            body: "Commercial RO/DI filtration. Zero chemicals — glass stays cleaner, for longer.",
                            color: "#0ea5e9",
                        },
                        {
                            icon: <Zap className="w-6 h-6" />,
                            title: "Urgent & Flexible",
                            body: "Next-day emergency cleans for rental inspections, or set-and-forget subscriptions.",
                            color: "#f0a500",
                        },
                        {
                            icon: <Building2 className="w-6 h-6" />,
                            title: "Homes to Showrooms",
                            body: "From quick residential maintenance to heavy commercial glass restoration.",
                            color: "#0f2545",
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className="rounded-2xl p-4 flex flex-col gap-2"
                            style={{ background: "#fff", border: "1px solid #e2e8f0" }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                                style={{ background: card.color }}
                            >
                                {card.icon}
                            </div>
                            <p className="text-sm font-bold leading-tight" style={{ color: "#0f2545" }}>
                                {card.title}
                            </p>
                            <p className="text-xs text-gray-500 leading-snug">{card.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 5: GUARANTEE ─── */}
            <section className="max-w-5xl mx-auto px-5 py-8">
                <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: "linear-gradient(135deg, #0f2545, #133060)", color: "white" }}
                >
                    <div className="text-4xl mb-3">🌦️</div>
                    <h2 className="font-display text-xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                        The 7-Day Rain &amp; Shine Guarantee
                    </h2>
                    <p className="text-sm text-blue-100 leading-relaxed">
                        Worried about the weather? Don't be. If it rains within 7 days of your clean and spots your glass, we will come back and touch up the affected windows completely free.
                    </p>
                </div>
            </section>

            {/* ─── SECTION 6: REVIEWS ─── */}
            <section className="max-w-5xl mx-auto px-5 py-8" style={{ background: "#f8fafc" }}>
                <div className="flex flex-col items-center mb-5">
                    <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 font-medium">5.0 · Google Reviews</p>
                </div>
                <div className="flex flex-col gap-3">
                    {[
                        {
                            name: "Sarah M.",
                            suburb: "Subiaco",
                            text: "Ahmed was on time, professional, and the windows have never looked so clear. Will definitely book again!",
                        },
                        {
                            name: "James T.",
                            suburb: "Cottesloe",
                            text: "Extremely professional from start to finish. They cleaned the frames too — something the last guy never did.",
                        },
                        {
                            name: "Linda K.",
                            suburb: "Applecross",
                            text: "Used them for our rental inspection. Same-day booking, immaculate result. Highly recommend.",
                        },
                    ].map((r) => (
                        <div
                            key={r.name}
                            className="rounded-2xl p-4"
                            style={{ background: "#fff", border: "1px solid #e2e8f0" }}
                        >
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-700 leading-snug mb-2">"{r.text}"</p>
                            <p className="text-xs font-semibold text-gray-500">
                                {r.name} · {r.suburb}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SECTION 7: FOOTER CTA ─── */}
            <section
                className="px-5 py-10 text-center"
                style={{ background: "#0a1628", color: "white" }}
            >
                <p className="text-xs text-blue-300 uppercase tracking-widest font-semibold mb-2">
                    Still here? Let's get you booked.
                </p>
                <h2
                    className="font-display text-2xl font-bold mb-4"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    Ready for Crystal-Clear Windows?
                </h2>
                <Link
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-4 text-base font-bold mb-4"
                    style={{ background: "#22c55e", color: "#fff" }}
                >
                    <Phone className="w-5 h-5" fill="white" />
                    Call Now — {BUSINESS.phone}
                </Link>
                <p className="text-xs text-blue-300 mt-4">
                    ABN: {BUSINESS.phone} · Serving all Perth metro areas<br />
                    © {new Date().getFullYear()} Aspect Window Cleaning
                </p>
            </section>

            {/* ─── STICKY BOTTOM CTA ─── */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2 w-full md:max-w-2xs mx-auto"
            >
                <Link
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="flex items-center justify-center gap-3 w-full rounded-xl py-4 text-base font-bold shadow-2xl"
                    style={{ background: "#22c55e", color: "#fff", boxShadow: "0 4px 30px rgba(34,197,94,0.5)" }}
                >
                    <Phone className="w-5 h-5" fill="white" />
                    Call Now for a Free Quote
                </Link>
            </div>

        </div>
    );
}