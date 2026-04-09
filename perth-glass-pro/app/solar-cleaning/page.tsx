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
            {/* HERO */}
            <section
                className="relative min-h-screen flex flex-col items-center justify-center px-5 pb-10 text-white bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(10,22,40,0.7), rgba(10,22,40,0.9)),
                    url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1775000000/solar-cleaning.jpg')`,
                }}
            >
                <div
                    onClick={() => setFormModalOpen(true)}
                    className="mb-5 rounded-full px-4 py-1.5 text-xs font-semibold bg-[#f0a500] text-[#0a1628] cursor-pointer"
                >
                    Limited Offer — Save 15% This Week
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                    Solar Panel Cleaning Perth
                </h1>

                <p className="text-center text-blue-100 mb-6 max-w-md">
                    Increase your solar output by up to 30% with professional cleaning using pure water technology.
                </p>

                <div className="flex gap-3 mb-6 flex-wrap justify-center">
                    <span className="badge">🛡️ $20M Insured</span>
                    <span className="badge">👮 Police Cleared</span>
                    <span className="badge">⚡ Same Week</span>
                </div>

                <Link
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="w-full max-w-sm text-center py-4 rounded-xl font-bold mb-4"
                    style={{ background: "#22c55e" }}
                >
                    Call {BUSINESS.phoneRaw}
                </Link>

                {/* FORM */}
                <div className="w-full max-w-sm bg-white/10 p-4 rounded-xl">
                    {submitted ? (
                        <div className="text-center">
                            <CheckCircle2 className="mx-auto text-green-400" />
                            <p>We’ll text you shortly.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {["name", "phone", "suburb"].map((f) => (
                                <input
                                    key={f}
                                    placeholder={f}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [f]: e.target.value })
                                    }
                                    className="p-3 rounded text-black"
                                />
                            ))}
                            <button
                                onClick={handleSubmit}
                                className="bg-yellow-400 py-3 rounded font-bold"
                            >
                                Get Fast Quote →
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

                <BeforeAfterSlider
                    beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/dirty-solar.jpg"
                    afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/clean-solar.jpg"
                />
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