"use client";

import { Phone, Mail, MapPin, Clock, Search, FileText, ArrowRight, ExternalLink, Star } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Link from "next/link";
import { getSuburbsByRegion } from "@/lib/suburbs";
import GoogleMap from "./GoogleMap";

export default function ContactSection() {

    const { North, South } = getSuburbsByRegion();

    return (
        <>
            <section id="contact" className="py-12 sm:py-20 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-3 sm:mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-brand-slate text-base sm:text-lg max-w-2xl mx-auto">
                            Ready for sparkling clean windows? Contact us for a free quote.
                        </p>
                    </div>

                    {/* 4 Interactive Contact CTA Cards - Fully Clickable Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* 1. Phone CTA Box */}
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="group relative flex flex-col justify-between bg-slate-50 hover:bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-slate-200 hover:border-action-gold shadow-sm hover:shadow-xl transition-all duration-300 text-left active:scale-[0.99] cursor-pointer"
                            aria-label={`Call Aspect Window Cleaning at ${BUSINESS.phone}`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-action-gold/15 flex items-center justify-center text-brand-navy group-hover:bg-action-gold group-hover:scale-110 transition-all duration-300">
                                        <Phone className="w-6 h-6 text-brand-navy" aria-hidden="true" />
                                    </div>
                                    <span className="text-[11px] font-bold tracking-wider uppercase bg-brand-navy/5 text-brand-navy px-2.5 py-1 rounded-full group-hover:bg-action-gold/20 transition-colors">
                                        Direct Call
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-1">
                                    Call Us Directly
                                </h3>
                                <p className="text-xl font-extrabold text-brand-navy tracking-tight mt-1 group-hover:text-action-gold transition-colors">
                                    {BUSINESS.phone}
                                </p>
                                <p className="text-xs text-brand-slate mt-2 leading-relaxed">
                                    Fast on-the-spot quotes & same-week bookings across Perth.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-brand-navy group-hover:text-action-gold transition-colors">
                                <span>Click to Call Now</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>

                        {/* 2. Email CTA Box */}
                        <a
                            href={`mailto:${BUSINESS.email}`}
                            className="group relative flex flex-col justify-between bg-slate-50 hover:bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-slate-200 hover:border-action-gold shadow-sm hover:shadow-xl transition-all duration-300 text-left active:scale-[0.99] cursor-pointer"
                            aria-label={`Email Aspect Window Cleaning at ${BUSINESS.email}`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-action-gold/15 flex items-center justify-center text-brand-navy group-hover:bg-action-gold group-hover:scale-110 transition-all duration-300">
                                        <Mail className="w-6 h-6 text-brand-navy" aria-hidden="true" />
                                    </div>
                                    <span className="text-[11px] font-bold tracking-wider uppercase bg-brand-navy/5 text-brand-navy px-2.5 py-1 rounded-full group-hover:bg-action-gold/20 transition-colors">
                                        Email Us
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-1">
                                    Send an Email
                                </h3>
                                <p className="text-sm font-bold text-brand-navy break-all mt-1 group-hover:text-action-gold transition-colors leading-snug">
                                    {BUSINESS.email}
                                </p>
                                <p className="text-xs text-brand-slate mt-2 leading-relaxed">
                                    Send property photos, site specs, or tender requests.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-brand-navy group-hover:text-action-gold transition-colors">
                                <span>Click to Email</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </a>

                        {/* 3. Online Form CTA Box */}
                        <Link
                            href="/contact"
                            className="group relative flex flex-col justify-between bg-slate-50 hover:bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-slate-200 hover:border-action-gold shadow-sm hover:shadow-xl transition-all duration-300 text-left active:scale-[0.99] cursor-pointer"
                            aria-label="Fill online quote form"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-action-gold/15 flex items-center justify-center text-brand-navy group-hover:bg-action-gold group-hover:scale-110 transition-all duration-300">
                                        <FileText className="w-6 h-6 text-brand-navy" aria-hidden="true" />
                                    </div>
                                    <span className="text-[11px] font-bold tracking-wider uppercase bg-brand-navy/5 text-brand-navy px-2.5 py-1 rounded-full group-hover:bg-action-gold/20 transition-colors">
                                        Online Form
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-1">
                                    Fill Online Form
                                </h3>
                                <p className="text-xl font-extrabold text-brand-navy tracking-tight mt-1 group-hover:text-action-gold transition-colors">
                                    Instant Quote Request
                                </p>
                                <p className="text-xs text-brand-slate mt-2 leading-relaxed">
                                    Guaranteed response within 60 minutes during business hours.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-brand-navy group-hover:text-action-gold transition-colors">
                                <span>Open Quote Form</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* 4. Location & Google Profile CTA Box */}
                        <a
                            href={BUSINESS.google}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex flex-col justify-between bg-slate-50 hover:bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-slate-200 hover:border-action-gold shadow-sm hover:shadow-xl transition-all duration-300 text-left active:scale-[0.99] cursor-pointer"
                            aria-label="View Aspect Window Cleaning Google Business Profile"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-action-gold/15 flex items-center justify-center text-brand-navy group-hover:bg-action-gold group-hover:scale-110 transition-all duration-300">
                                        <MapPin className="w-6 h-6 text-brand-navy" aria-hidden="true" />
                                    </div>
                                    <span className="text-[11px] font-bold tracking-wider uppercase bg-action-gold/20 text-brand-navy px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-action-gold text-action-gold" />
                                        5.0 Google
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-1">
                                    Our Office & Profile
                                </h3>
                                <p className="text-sm font-bold text-brand-navy mt-1 group-hover:text-action-gold transition-colors leading-snug">
                                    {BUSINESS.location}
                                </p>
                                <p className="text-xs text-brand-slate mt-2 leading-relaxed">
                                    Verified Google business listing with 43+ five-star reviews.
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-brand-navy group-hover:text-action-gold transition-colors">
                                <span>View Google Profile</span>
                                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* SEO Suburb List */}
            {/* bg-pattern-squeegee */}
            <div className=" bg-brand-water/20 p-8 border border-slate-100/50">
                <h3 className="text-center text-2xl font-heading font-bold text-brand-navy mb-10">
                    Proudly Serving All Perth Metro Areas
                </h3>

                <div className="hidden md:grid grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* North */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h4 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <span className="w-2 h-2 rounded-full bg-action-gold" />
                            North of River
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {North.slice(0, 20).map(s => (
                                <Link
                                    key={s.name}
                                    href={`/locations/${s.name.toLowerCase().replace(/ /g, '-')}`}
                                    className="text-brand-slate hover:text-brand-navy text-sm transition-colors"
                                >
                                    {s.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* South */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h4 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <span className="w-2 h-2 rounded-full bg-brand-navy" />
                            South of River
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {South.slice(0, 20).map(s => (
                                <Link
                                    key={s.name}
                                    href={`/locations/${s.name.toLowerCase().replace(/ /g, '-')}`}
                                    className="text-brand-slate hover:text-brand-navy text-sm transition-colors"
                                >
                                    {s.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden text-center">
                    <Link
                        href="/locations"
                        className="inline-flex items-center gap-2 text-brand-navy font-medium bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm"
                    >
                        <Search className="w-4 h-4" />
                        Browse All 373 Perth Suburbs
                    </Link>
                </div>

                <div className="hidden sm:block text-center mt-12">
                    <Link
                        href="/locations"
                        className="inline-flex items-center bg-brand-navy text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-brand-navy/90 transition-colors"
                    >
                        View all 373 suburbs
                    </Link>
                </div>
            </div>
        </>
    );
}
