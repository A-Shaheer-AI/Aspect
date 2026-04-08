"use client";

import { Phone, Mail, MapPin, Clock, Search } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Link from "next/link";
import { getSuburbsByRegion } from "@/lib/suburbs";

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

                    {/* MOBILE: 2x2 Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:hidden">
                        {/* Phone */}
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="bg-slate-50 p-4 rounded-xl text-center hover:bg-action-gold/10 transition-colors"
                        >
                            <Phone className="w-8 h-8 text-action-gold mx-auto mb-2" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy text-sm">Call Us</h3>
                            <p className="text-brand-slate text-xs mt-1">{BUSINESS.phone}</p>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${BUSINESS.email}`}
                            className="bg-slate-50 p-4 rounded-xl text-center hover:bg-action-gold/10 transition-colors"
                        >
                            <Mail className="w-8 h-8 text-action-gold mx-auto mb-2" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy text-sm">Email</h3>
                            <p className="text-brand-slate text-xs mt-1">{BUSINESS.email}</p>
                        </a>

                        {/* Location - Links to GMB */}
                        <a
                            href={BUSINESS.google}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-50 p-4 rounded-xl text-center hover:bg-action-gold/10 transition-colors"
                        >
                            <MapPin className="w-8 h-8 text-action-gold mx-auto mb-2" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy text-sm">Location</h3>
                            <p className="text-brand-slate text-xs mt-1">Perth Metro</p>
                        </a>

                        {/* Hours - Links to GMB */}
                        <a
                            href={BUSINESS.google}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-50 p-4 rounded-xl text-center hover:bg-action-gold/10 transition-colors"
                        >
                            <Clock className="w-8 h-8 text-action-gold mx-auto mb-2" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy text-sm">Hours</h3>
                            <p className="text-brand-slate text-xs mt-1">24/7 Availability</p>
                        </a>
                    </div>

                    {/* DESKTOP: 4 Column Grid */}
                    <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Phone */}
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="group bg-slate-50 p-6 rounded-2xl hover:bg-action-gold/10 transition-colors text-center"
                        >
                            <Phone className="w-10 h-10 text-action-gold mx-auto mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy mb-1">Call Us</h3>
                            <p className="text-brand-slate">{BUSINESS.phone}</p>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${BUSINESS.email}`}
                            className="group bg-slate-50 p-6 rounded-2xl hover:bg-action-gold/10 transition-colors text-center"
                        >
                            <Mail className="w-10 h-10 text-action-gold mx-auto mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy mb-1">Email Us</h3>
                            <p className="text-brand-slate">{BUSINESS.email}</p>
                        </a>

                        {/* Location */}
                        <a
                            href={BUSINESS.google}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-slate-50 p-6 rounded-2xl hover:bg-action-gold/10 transition-colors text-center"
                        >
                            <MapPin className="w-10 h-10 text-action-gold mx-auto mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy mb-1">Location</h3>
                            <p className="text-brand-slate">{BUSINESS.location}</p>
                        </a>

                        {/* Hours */}
                        <a
                            href={BUSINESS.google}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-slate-50 p-6 rounded-2xl hover:bg-action-gold/10 transition-colors text-center"
                        >
                            <Clock className="w-10 h-10 text-action-gold mx-auto mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                            <h3 className="font-bold text-brand-navy mb-1">Hours</h3>
                            <p className="text-brand-slate text-xs mt-1">24/7 Availability</p>
                        </a>
                    </div>

                    {/* CTA - Desktop only */}
                    <div className="hidden sm:block text-center mt-12">
                        <Link
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="inline-flex items-center gap-3 bg-brand-navy text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-brand-navy/90 transition-colors"
                        >
                            <Phone className="w-5 h-5" aria-hidden="true" />
                            Call Now for Free Quote
                        </Link>
                    </div>
                </div>
            </section>

            {/* SEO Suburb List */}
            {/* bg-pattern-squeegee */}
            <div className="mt-16 rounded-3xl p-8 border border-slate-100/50">
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
                        Browse All 100+ Suburbs
                    </Link>
                </div>

                <div className="hidden sm:block text-center mt-12">
                    <Link
                        href="/locations"
                        className="inline-flex items-center bg-brand-navy text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-brand-navy/90 transition-colors"
                    >
                        View all 100+ suburbs
                    </Link>
                </div>
            </div>
        </>
    );
}
