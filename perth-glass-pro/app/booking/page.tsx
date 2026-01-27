"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_LINK } from "@/lib/config";
import Link from "next/link";
import { ArrowLeft, Phone, Clock, Shield, CheckCircle } from "lucide-react";

export default function BookingPage() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", {
                styles: { branding: { brandColor: "#D4AF37" } },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-brand-navy to-brand-navy/95">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
                        Book Your Clean
                    </h1>
                    <p className="text-xl text-brand-water/90 max-w-2xl mx-auto">
                        Choose a time that works for you. We&apos;ll confirm your appointment within 2 hours.
                    </p>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Shield className="w-5 h-5 text-action-gold" />
                        <span>$20M Insured</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Clock className="w-5 h-5 text-action-gold" />
                        <span>Same-Week Available</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                        <CheckCircle className="w-5 h-5 text-action-gold" />
                        <span>100% Satisfaction Guarantee</span>
                    </div>
                </div>
            </div>

            {/* Calendar Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-4 sm:p-6" style={{ minHeight: "600px" }}>
                        <Cal
                            calLink={CAL_LINK}
                            style={{ width: "100%", height: "100%", minHeight: "550px", overflow: "auto" }}
                            config={{ layout: "month_view" }}
                        />
                    </div>
                </div>

                {/* Alternative Contact */}
                <div className="text-center mt-8">
                    <p className="text-white/60 mb-4">Prefer to speak with someone?</p>
                    <a
                        href="tel:+61400000000"
                        className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                        Call: 04XX XXX XXX
                    </a>
                </div>
            </div>
        </main>
    );
}
