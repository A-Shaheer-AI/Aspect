"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/config";

export default function ContactSection() {
    return (
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
                <div className="grid grid-cols-2 gap-3 sm:hidden">
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
                        <p className="text-brand-slate text-xs mt-1">Mon-Sat 7am-5pm</p>
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
                        <p className="text-brand-slate">Perth Metro, WA</p>
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
                        <p className="text-brand-slate">Mon-Sat: 7am-5pm</p>
                    </a>
                </div>

                {/* CTA - Desktop only */}
                <div className="hidden sm:block text-center mt-12">
                    <a
                        href={`tel:${BUSINESS.phoneRaw}`}
                        className="inline-flex items-center gap-3 bg-brand-navy text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-brand-navy/90 transition-colors"
                    >
                        <Phone className="w-5 h-5" aria-hidden="true" />
                        Call Now for Free Quote
                    </a>
                </div>
            </div>
        </section>
    );
}
