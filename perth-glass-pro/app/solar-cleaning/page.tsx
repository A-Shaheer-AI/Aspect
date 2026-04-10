"use client";

import { useState } from "react";
import { Phone, Shield, Droplets, Zap, Sun, CheckCircle2, Star } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import MediaCarousel from "@/components/MediaCarousel ";
import { sendLeadEmail } from "../actions/send-email";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function SolarLandingPage() {
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", suburb: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            const result = await sendLeadEmail(formData);
            if (result.success) setSubmitted(true);
        } catch (err) {
            console.log(err);
        }
    };

    const aspectChoose = [
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Fully Vetted & Insured",
            body: "$20M Public Liability + Police Cleared technicians.",
            color: "#1d4ed8",
        },
        {
            icon: <Droplets className="w-6 h-6" />,
            title: "Pure Water Cleaning",
            body: "Deionised water system for spotless, streak-free panels.",
            color: "#0ea5e9",
        },
        {
            icon: <Sun className="w-6 h-6" />,
            title: "Maximise Output",
            body: "Restore up to 30% lost solar efficiency instantly.",
            color: "#f59e0b",
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Fast Turnaround",
            body: "Same-week bookings across Perth.",
            color: "#22c55e",
        },
    ];

    return (
        <>

            {formModalOpen && (
                <>
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 min-h-screen">

                        {/* Form */}
                        <div
                            className="fade-up w-full max-w-sm rounded-2xl p-4 bg-black/50"
                            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
                        >
                            <p className="text-center text-sm text-blue-100 mb-3 font-medium">
                                Spring Offer 15% Off Applied
                            </p>
                            <button
                                onClick={() => setFormModalOpen(false)}
                                className="absolute top-3 right-3 text-white text-lg font-bold cursor-pointer"
                            >
                                ✕
                            </button>
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
                    </div>
                </>
            )}
            
            {/* HERO */}
            <section
                className="relative min-h-screen flex flex-col items-center justify-center px-5 pb-10 text-white bg-cover bg-center
  bg-[linear-gradient(160deg,rgba(10,22,40,0.5)_0%,rgba(15,37,69,0.8)_60%,rgba(19,48,96,0.8)_100%),url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/solar-plates-cleaning_lasnea.jpg')]
  md:bg-[linear-gradient(160deg,rgba(10,22,40,0.5)_0%,rgba(15,37,69,0.8)_60%,rgba(19,48,96,0.8)_100%),url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.18_PM_vt57zl.jpg')]"
            >
                {/* Offer ribbon */}
                <div
                    onClick={() => setFormModalOpen(true)}
                    className="fade-up fade-up-1 mb-5 rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold tracking-wide uppercase bg-[#f0a500] text-[#0a1628] cursor-pointer"
                >
                    Spring Offer — 15% Off First Clean When You Book This Week
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-3 sm:mb-6 text-center">
                    Solar Panel Cleaning Perth
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


            {/* PROOF */}
            <section className="max-w-5xl mx-auto px-5 py-10">
                <h2 className="text-center text-2xl font-bold mb-6">
                    See the Difference
                </h2>

                <div className="max-w-4xl mx-auto w-full">
                    <BeforeAfterSlider
                        initial={50}
                        beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/solar-pannel-clean_cigwab.jpg"
                        afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg"
                    />
                </div>
            </section>

            {/* WHY */}
            <section className="max-w-5xl mx-auto px-5 py-10 bg-gray-50">
                <h2 className="text-center text-2xl font-bold mb-6">
                    Why Choose Us?
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {aspectChoose.map((card) => (
                        <div key={card.title} className="p-4 bg-white rounded-xl border">
                            {card.icon}
                            <h3 className="font-bold mt-2">{card.title}</h3>
                            <p className="text-sm text-gray-500">{card.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* REVIEWS */}
            <section className="max-w-5xl mx-auto px-5 py-10">
                <div className="text-center mb-6">
                    <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-yellow-400" />
                        ))}
                    </div>
                    <p>5.0 Google Reviews</p>
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-10 bg-[#0a1628] text-white">
                <h2 className="mb-4 text-xl">Ready to Boost Your Solar Output?</h2>
                <Link
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="px-6 py-4 bg-green-500 rounded-xl font-bold"
                >
                    Call Now — {BUSINESS.phone}
                </Link>
            </section>
        </>
    );
}