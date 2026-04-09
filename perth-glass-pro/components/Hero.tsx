"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Home, Building2, Phone, Star, Shield, Clock, CheckCircle, Calendar } from "lucide-react";
import QuoteModal from "./QuoteModal";
import { BUSINESS } from "@/lib/config";

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const HERO_VIDEO_URL = 'https://res.cloudinary.com/dr8tjrszy/video/upload/perth-window-cleaning-hero_rnws53.mp4';
    const HERO_VIDEO_URL = 'https://res.cloudinary.com/dr8tjrszy/video/upload/perth-window-cleaning-hero_rnws53.mp4';
    const HERO_POSTER_URL = 'https://res.cloudinary.com/dr8tjrszy/video/upload/v1772387266/VID-20260228-WA0016_xsz3cm.mp4   ';

    return (
        <>
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
                {/* Background Video with Smart Loading */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={HERO_POSTER_URL}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={HERO_VIDEO_URL} type="video/mp4" />
                </video>

                {/* Overlay - darkened for better text readability */}
                <div className="absolute inset-0 bg-hero-overlay z-0" aria-hidden="true" />

                {/* Content - Reduced pt-24 to pt-20 */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-8 sm:pb-20">
                    <div className="text-center">
                        {/* Trained & Professional Badge - Linked to /booking */}
                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-8 hover:bg-white/20 transition-colors group"
                        >
                            <Calendar className="w-4 h-4 text-green-400" aria-hidden="true" />
                            <span className="text-white/90 text-xs sm:text-sm font-medium">
                                Same week booking available
                            </span>
                            <ArrowRight className="w-3 h-3 text-white/60 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {/* Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-3 sm:mb-6">
                            Your Local Window
                            <br />
                            <span className="text-action-gold">
                                Cleaning Service in Perth
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-base sm:text-xl md:text-2xl text-brand-water/90 max-w-2xl mx-auto mb-4 sm:mb-8 leading-relaxed px-2">
                            Streak-free results for homes and businesses.
                            <span className="hidden sm:inline">
                                <br />
                            </span>
                            <strong className="text-white">100% satisfaction guaranteed.</strong>
                        </p>

                        {/* Google Rating - Desktop only */}
                        <div className="hidden sm:flex items-center justify-center gap-2 mb-8 sm:mb-10">
                            <div className="flex" aria-label="5 star rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-action-gold fill-action-gold" aria-hidden="true" />
                                ))}
                            </div>
                            <Link
                                className="cursor-pointer leading-5"
                                target="_blank"
                                href={"https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z/data=!3m1!4b1!4m6!3m5!1s0xafbbd7c3dd591183:0xe683c8a7e7212664!8m2!3d-31.9806823!4d115.7929967!16s%2Fg%2F11x1zxrlv3?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"}>
                                <span className="text-white font-bold">5.0</span>
                                <span className="text-white/70 text-sm sm:text-base"> Google Reviews</span>
                            </Link>
                        </div>

                        {/* MOBILE: All 3 CTAs stacked - Call first */}
                        <div className="flex flex-col gap-3 sm:hidden px-2 mb-6">
                            {/* Call Button - Primary on mobile */}
                            <a
                                href={`tel:${BUSINESS.phoneRaw}`}
                                id="hero-call-button"
                                className="flex items-center justify-center gap-3 bg-green-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
                            >
                                <Phone className="w-5 h-5" aria-hidden="true" />
                                Call Now: {BUSINESS.phone}
                            </a>

                            {/* Residential Quote - Updated CTA text */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center gap-3 bg-action-gold text-brand-navy font-bold text-base px-6 py-3.5 rounded-full shadow-lg hover:bg-action-gold/90 transition-colors cursor-pointer"
                                aria-label="Get a residential quote"
                            >
                                <Home className="w-5 h-5" aria-hidden="true" />
                                Residential Quote
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </button>

                            {/* Commercial Quote */}
                            <Link
                                href="/commercial"
                                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-base px-6 py-3.5 rounded-full hover:bg-white/20 transition-colors"
                            >
                                <Building2 className="w-5 h-5" aria-hidden="true" />
                                Commercial Quote
                                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                        </div>

                        {/* DESKTOP: Original layout - Updated CTA text */}
                        <div className="hidden sm:flex flex-row items-center justify-center gap-4 mb-8 sm:mb-10">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="group flex items-center justify-center gap-3 bg-action-gold text-brand-navy font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-action-gold/90 transition-all focus:outline-none focus:ring-4 focus:ring-action-gold/50"
                                aria-label="Get a residential quote"
                                style={{ cursor: "pointer" }}
                            >
                                <Home className="w-5 h-5" aria-hidden="true" />
                                Residential Quote
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </button>

                            <Link
                                href="/commercial"
                                className="group flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30"
                            >
                                <Building2 className="w-5 h-5" aria-hidden="true" />
                                Commercial Quote
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                            </Link>
                        </div>

                        {/* Desktop Phone CTA */}
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="hidden sm:inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-base"
                        >
                            <Phone className="w-4 h-4 text-green-400" aria-hidden="true" />
                            <span>
                                Or call now: <strong>{BUSINESS.phone}</strong>
                            </span>
                        </a>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-12 pt-6 sm:pt-10 border-t border-white/10">
                            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                                <span>$20M Insured</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                                <span>Trained and Professional</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                                <span>Police Cleared</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - Desktop only */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block" aria-hidden="true">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce"></div>
                    </div>
                </div>
            </section>

            <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} quoteType="residential" />
        </>
    );
}
