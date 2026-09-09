import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { openCertificateModal } from "@/components/CertificateModalWrapper";
import { ArrowRight, Building2, Shield, Phone, CheckCircle2 } from "lucide-react";
import { BUSINESS } from "@/lib/config";

export const metadata: Metadata = {
    title: "Commercial Cleaning, Janitorial & Window Cleaning Perth | Aspect",
    description: "Perth commercial cleaning, office janitorial, and high-reach window cleaning. Directly employed police-cleared staff, EWP certified, $20M insured. 24/7 service.",
};

export default function CommercialPage() {
    const features = [
        "Certified Cherry Picker (EWP) operators for high-reach glass and facade cleaning",
        "Water-Fed Pole System for pure-water cleaning up to 4 storeys from the ground",
        "Comprehensive office janitorial care & hospital-grade surface sanitisation",
        "Commercial hard floor strip & seal and carpet hot water extraction",
        "100% directly employed, police-cleared staff — zero subcontracting",
        "Adjustable 24/7 schedule including after-hours and weekend maintenance",
        "Thorough WorkSafe WA compliance, strict SWMS, and $20M public liability",
        "Proactive supervisory audits and single dedicated local account manager",
    ];

    const industries = [
        "Corporate Office Buildings",
        "Medical & Healthcare Clinics",
        "Strata & Multi-Unit Complexes",
        "Retail Centres & Showrooms",
        "Industrial & Warehouse Facilities",
        "Educational & Childcare Facilities",
        "Gyms & Fitness Centres",
        "Hospitality & Commercial Dining",
    ];

    return (
        <div className="min-h-screen bg-brand-snow">
            {/* Hero */}
            <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                        <Building2 className="w-5 h-5 text-action-gold" />
                        <span className="text-sm font-medium">Commercial Services</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6">
                        Window Cleaning for
                        <br />
                        <span className="text-action-gold">
                            Businesses and Strata
                        </span>
                    </h1>
                    <p className="text-base sm:text-xl text-brand-water/80 max-w-2xl mx-auto mb-8 sm:mb-10">
                        Perth window cleaning services for businesses and apartments. Specialized high-reach
                        cleaning for multi-story buildings, retail establishments, and offices. Completely safety
                        compliant, insured, and certified.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <Link
                            href="/services/commercial-window-cleaning"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold text-base px-8 py-4 rounded-full hover:bg-action-gold/90 transition-colors min-h-[48px]"
                        >
                            Commercial Window Cleaning
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/services/commercial-cleaning"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white/20 transition-colors min-h-[48px]"
                        >
                            Office Janitorial Services
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>


            {/* EWP IMAGE SECTION */}
            <section className="py-12 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960129/commercial-sign-cleaning_jzafjr.jpg"
                            alt="Commercial Window Cleaning with EWP Cherry Picker"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 896px"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                        Why Pick Aspect for Commercial Cleaning & High-Reach Glazing?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div key={feature} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-action-gold flex-shrink-0" />
                                <span className="text-brand-slate">{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-brand-navy to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                        <div>
                            <span className="text-action-gold text-xs font-bold uppercase tracking-wider block mb-1">Dual-Contract Advantage</span>
                            <h3 className="text-lg font-bold text-white mb-1">Complete Office Janitorial + High-Reach Window Cleaning</h3>
                            <p className="text-slate-300 text-sm max-w-xl">
                                Consolidate routine workstation sanitation, restroom restocking, floor care, and external facade washing under one vetted team and one invoice. Save up to 20% on bundled contracts.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                            <Link
                                href="/services/commercial-cleaning"
                                className="inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold px-6 py-3 rounded-full text-sm hover:bg-action-gold/90 transition-all min-h-[44px]"
                            >
                                Office Janitorial <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/services/commercial-window-cleaning"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-white/20 transition-all min-h-[44px]"
                            >
                                Window Cleaning <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
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
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-action-gold/90 transition-colors min-h-[48px]"
                    >
                        <Phone className="w-5 h-5" />
                        {BUSINESS.phone}
                    </a>
                </div>
            </section>
        </div>
    );
}
