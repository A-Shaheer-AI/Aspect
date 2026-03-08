import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Shield, Phone, CheckCircle2 } from "lucide-react";
import { BUSINESS } from "@/lib/config";

export const metadata: Metadata = {
    title: "Commercial & Strata Window Cleaning",
    description: "Professional commercial window cleaning in Perth. Cherry picker (EWP), water-fed pole, and multi-story specialists. Offices, retail, and strata buildings. Free quotes.",
};

export default function CommercialPage() {
    const features = [
        "Certified Cherry Picker (EWP) operators for cleaning windows in high-rise buildings",
        "Water-Fed Pole System for safe commercial window cleaning (up to 4 stories)",
        "Access to lifts and scissor lifts is available for buildings with multiple levels.",
        "Adjustable schedule that includes commercial cleaning after hours",
        "Thorough safety records and adherence",
        "Friendly service from the strata and property manager",
    ];

    const industries = [
        "Office Buildings",
        "Retail Centres",
        "Hotels & Hospitality",
        "Educational Facilities",
        "Medical Centres",
        "Industrial Warehouses",
    ];

    return (
        <div className="min-h-screen bg-brand-snow">
            {/* Hero */}
            <section className="bg-brand-navy text-white pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                        <Building2 className="w-5 h-5 text-action-gold" />
                        <span className="text-sm font-medium">Commercial Services</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                        Window Cleaning for
                        <br />
                        <span className="text-action-gold">
                            Businesses and Strata
                        </span>
                    </h1>
                    <p className="text-xl text-brand-water/80 max-w-2xl mx-auto mb-10">
                        Perth window cleaning services for businesses and apartments. specialized high-reach
                        cleaning for multi-story buildings, retail establishments, and offices. Completely safety
                        compliant, insured, and certified.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="flex items-center gap-3 bg-action-gold text-brand-navy font-bold text-lg px-8 py-4 rounded-full hover:bg-action-gold/90 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            Request a Quote
                        </a>
                        <Link
                            href="/services/commercial-cleaning"
                            className="flex items-center gap-3 bg-white/10 border-2 border-white/30 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white/20 transition-colors"
                        >
                            Find Out More
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                        Why Pick Aspect for Cleaning Commercial Windows?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-action-gold flex-shrink-0" />
                                <span className="text-brand-slate">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries */}
            <section className="py-16 bg-brand-snow">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                        Industries We Serve
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {industries.map((industry) => (
                            <div key={industry} className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                                <p className="font-medium text-brand-navy">{industry}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust */}
            <section className="py-12 bg-white border-y border-slate-200">
                <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="flex items-center gap-3 text-brand-slate">
                        <Shield className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">$20M Public Liability</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-slate">
                        <CheckCircle2 className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">WorkCover Compliant</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-slate">
                        <Building2 className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">Strata Specialists</span>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-brand-navy text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-4">
                        Get a Commercial Quote
                    </h2>
                    <p className="text-brand-water/80 mb-8">
                        Contact us for a free site inspection and no-obligation quote.
                    </p>
                    <a
                        href={`tel:${BUSINESS.phoneRaw}`}
                        className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90 transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                        {BUSINESS.phone}
                    </a>
                </div>
            </section>
        </div>
    );
}
