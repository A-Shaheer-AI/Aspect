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

    const googleReviews = [
        {
            name: "June Bird",
            suburb: "Perth",
            text: "Guys done a beautiful job. My windows are sparkling. 2 very nice gentleman. Highly recommend.",
        },
        {
            name: "Hussai",
            suburb: "Perth",
            text: "Great work! I recently called them for cleaning the windows at my home. The team arrived on time, were friendly and professional, and took care to protect the surrounding areas while they worked. Many of the windows came out spotless and clear.",
        },
        {
            name: "Taylor Bow",
            suburb: "North Perth",
            text: "Aspect window cleaning did a great job cleaning the inside and outside of the windows at my North Perth property. Good service, communication and professional service.",
        },
        {
            name: "Shabnam",
            suburb: "Perth",
            text: "I recently hired them for window cleaning, and I couldn't be happier with the results. The team was punctual, professional, and paid great attention to detail. Our windows are spotless.",
        },
    ];

    const aspectChoose =
        [
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
        ];

    return (
        <>
            {/* ─── SECTION 1: HERO ─── */}
            <section
                className="relative min-h-screen flex flex-col items-center justify-center px-5 pb-10 text-white bg-cover bg-center
  bg-[linear-gradient(160deg,rgba(10,22,40,0.5)_0%,rgba(15,37,69,0.8)_60%,rgba(19,48,96,0.8)_100%),url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/solar-pannel-cleaning_oxfoxx.jpg')]
  md:bg-[linear-gradient(160deg,rgba(10,22,40,0.5)_0%,rgba(15,37,69,0.8)_60%,rgba(19,48,96,0.8)_100%),url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/outside-windows-cleaning_lzp8fq.jpg')]"
            >
                {/* Offer ribbon */}
                <div
                    className="fade-up fade-up-1 mb-5 rounded-full px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-wide uppercase"
                    style={{ background: "#f0a500", color: "#0a1628" }}
                >
                    Spring Offer — 15% Off First Clean When You Book This Week
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-3 sm:mb-6 text-center">
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
                    className="fade-up fade-up-4 w-full max-w-sm flex items-center justify-center gap-3 rounded-xl py-4 text-sm md:text-lg font-bold mb-4 shadow-lg"
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
                            <p className="text-white font-semibold text-center">
                                Got it! We'll text you shortly.
                            </p>
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
                                className="cursor-pointer w-full rounded-lg py-3 text-sm font-bold mt-1"
                                style={{ background: "#f0a500", color: "#0a1628" }}
                            >
                                Get a Fast Text Quote →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── SECTION 2: TRUSTED BY BANNER ─── */}
            <section className="px-6 py-6 bg-zinc-100 text-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-[0.25em] mb-8">
                    Fully Compliant with Local Government & Commercial Standards. Trusted By
                </p>

                <div className="flex flex-wrap items-center justify-center gap-10">

                    {/* Logo 1 */}
                    <div className="relative h-18 w-32 grayscale hover:grayscale-0 transition duration-300">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772795795/toyota-logo_bcplvi.png"
                            alt="Toyota company logo – trusted commercial cleaning client"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Logo 2 */}
                    <div className="relative h-18 w-32 grayscale hover:grayscale-0 transition duration-300">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772795795/richad-logo_u2l4jl.png"
                            alt="Richard Group logo – commercial window and building cleaning client"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Logo 3 */}
                    <div className="relative h-18 w-32 grayscale hover:grayscale-0 transition duration-300">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772795794/bespoke-logo_lulwwt.png"
                            alt="Bespoke company logo – professional commercial cleaning partner"
                            fill
                            className="object-contain"
                        />
                    </div>

                </div>
            </section>

            {/* ─── SECTION 3: PROOF GALLERY ─── */}
            <section className="max-w-5xl mx-auto px-5 py-8">
                <h2
                    className="text-center text-2xl font-bold mb-5"
                >
                    See the Difference
                </h2>

                <div className="flex flex-col gap-4">
                    {/* Worker image */}
                    <div className="relative rounded-2xl overflow-hidden" style={{ height: 440 }}>
                        <video
                            className="w-full h-full object-cover cursor-pointer"
                            controls
                            preload="metadata"
                        >
                            <source
                                src="https://res.cloudinary.com/dr8tjrszy/video/upload/v1772968701/VID-20260228-WA0016_xsz3cm_401388.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>

                    {/* Before & After */}
                    <div className="w-full h-[420px] overflow-x-auto md:overflow-hidden rounded-2xl scroll-smooth scrollbar-hide">
                        <div className="flex h-full w-[200%] md:w-full">

                            {/* Before */}
                            <div className="relative w-full md:flex-1 h-full overflow-hidden">
                                <Image
                                    src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772792155/aspect-before-window-cleaning_zfr8ae.jpg"
                                    alt="Window before cleaning"
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center text-white text-sm font-bold bg-black/45">
                                    BEFORE
                                </div>
                            </div>

                            {/* Divider (only desktop) */}
                            <div className="hidden md:block w-0.5 bg-white z-10" />

                            {/* After */}
                            <div className="relative w-full md:flex-1 h-full overflow-hidden">
                                <Image
                                    src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772792157/after-window-cleaning_fs1hhz.jpg"
                                    alt="Window after cleaning — crystal clear"
                                    fill
                                    className="object-cover"
                                />

                                <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center text-white text-sm font-bold bg-black/35">
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
                    className="text-center text-2xl font-bold mb-6"
                >
                    Why Choose Aspect?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {aspectChoose.map((card) => (
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

            {/* ─── SECTION 6: REVIEWS ─── */}
            <section className="max-w-5xl mx-auto px-5 py-8" style={{ background: "#f8fafc" }}>
                <div className="flex flex-col items-center mb-5">
                    <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <Link
                        className="cursor-pointer hover:underline leading-5"
                        target="_blank"
                        href={"https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z/data=!3m1!4b1!4m6!3m5!1s0xafbbd7c3dd591183:0xe683c8a7e7212664!8m2!3d-31.9806823!4d115.7929967!16s%2Fg%2F11x1zxrlv3?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"}>
                        <span className="text-sm text-gray-500 font-medium">5.0 Google Reviews</span>
                    </Link>
                </div>
                <div className="flex flex-col gap-3">
                    {googleReviews.map((r, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-4"
                            style={{ background: "#fff", border: "1px solid #e2e8f0" }}
                        >
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-sm text-gray-700 leading-snug mb-2">
                                "{r.text}"
                            </p>

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
                    className="text-base sm:text-xl md:text-2xl text-brand-water/90 max-w-2xl mx-auto mb-4 sm:mb-8 leading-relaxed px-2"
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
            </section>

        </>
    );
}