"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Home, Phone, CheckCircle, Shield, Clock, Star, Sparkles } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";
import { BUSINESS } from "@/lib/config";

export default function ResidentialPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const services = [
        {
            title: "Window Care",
            description: "Our most popular package. Glass, frames, flyscreens, and sills.",
            popular: true,
        },
        {
            title: "Essential Refresh",
            description: "Budget-friendly option. Glass and sills only.",
            popular: false,
        },
        {
            title: "Window Revival",
            description: "Deep clean with track cleaning and residue removal.",
            popular: false,
        },
    ];

    const benefits = [
        { icon: Shield, text: "$20M Public Liability Insurance" },
        { icon: Clock, text: "Same-Week Availability" },
        { icon: CheckCircle, text: "Police Cleared Technicians" },
        { icon: Star, text: "4.9★ Google Rating (200+ Reviews)" },
        { icon: Sparkles, text: "Pure Water Technology" },
    ];

    return (
        <>
            <main className="min-h-screen bg-white">
                {/* Hero */}
                <section className="bg-brand-navy text-white py-24">
                    <div className="max-w-5xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                            <Home className="w-5 h-5 text-action-gold" />
                            <span className="text-sm font-medium">Residential Services</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            Sparkling Clean Windows
                            <br />
                            <span className="text-action-gold">For Your Home</span>
                        </h1>
                        <p className="text-xl text-brand-water/80 max-w-2xl mx-auto mb-10">
                            Professional window cleaning using Pure Water Technology.
                            No streaks, no spots, no residue — just crystal-clear results every time.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-3 bg-action-gold text-brand-navy font-bold text-lg px-8 py-4 rounded-full hover:bg-action-gold/90 transition-colors cursor-pointer"
                            >
                                Get Instant Quote
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <a
                                href={`tel:${BUSINESS.phoneRaw}`}
                                className="flex items-center gap-3 bg-white/10 border-2 border-white/30 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </div>
                    </div>
                </section>

                {/* Service Packages */}
                <section className="py-16 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                            Choose Your Package
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div
                                    key={service.title}
                                    className={`relative bg-white p-6 rounded-2xl border-2 ${service.popular ? "border-action-gold" : "border-slate-200"
                                        }`}
                                >
                                    {service.popular && (
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-action-gold text-brand-navy text-xs font-bold px-4 py-1 rounded-full">
                                            MOST POPULAR
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold text-brand-navy mb-2">{service.title}</h3>
                                    <p className="text-brand-slate text-sm">{service.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                href="/quote"
                                className="inline-flex items-center gap-2 text-action-gold font-medium hover:underline"
                            >
                                Get detailed pricing <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-16 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                            Why Perth Homeowners Choose Aspect
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit.text}
                                    className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl"
                                >
                                    <benefit.icon className="w-8 h-8 text-action-gold flex-shrink-0" />
                                    <span className="text-brand-navy font-medium">{benefit.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-brand-navy text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-heading font-bold mb-4">
                            Ready for Sparkling Clean Windows?
                        </h2>
                        <p className="text-brand-water/80 mb-8">
                            Get your instant quote in under 2 minutes. No obligation, no pressure.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90 transition-colors"
                        >
                            Get Your Free Quote
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </section>
            </main>

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                quoteType="residential"
            />
        </>
    );
}
