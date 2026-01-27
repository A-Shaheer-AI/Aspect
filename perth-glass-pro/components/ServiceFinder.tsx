"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { ALL_SUBURBS, getSuburbsByRegion } from "@/lib/suburbs";
import QuoteModal from "./QuoteModal";

export default function ServiceFinder() {
    const [serviceInput, setServiceInput] = useState("");
    const [suburbInput, setSuburbInput] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredSuburbs, setFilteredSuburbs] = useState<typeof ALL_SUBURBS>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const SERVICE_LIST = [
        'Window Cleaning',
        'Solar Panel Washing',
        'Gutter Cleaning',
        'House Washing',
        'Commercial Cleaning',
        'Pressure Washing',
    ];

    const [filteredServices, setFilteredServices] = useState<string[]>([]);
    const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setServiceInput(val);
        if (val.length > 0) {
            const matches = SERVICE_LIST.filter(s =>
                s.toLowerCase().includes(val.toLowerCase())
            );
            setFilteredServices(matches);
            setShowServiceSuggestions(true);
        } else {
            setShowServiceSuggestions(false);
        }
    };

    const selectService = (name: string) => {
        setServiceInput(name);
        setShowServiceSuggestions(false);
    };

    const handleSuburbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSuburbInput(val);
        if (val.length > 0) {
            const matches = ALL_SUBURBS.filter(s =>
                s.name.toLowerCase().includes(val.toLowerCase())
            );
            setFilteredSuburbs(matches);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectSuburb = (name: string) => {
        setSuburbInput(name);
        setShowSuggestions(false);
    };

    const handleGetQuote = () => {
        setIsModalOpen(true);
    };

    const { North, South } = getSuburbsByRegion();

    return (
        <section id="areas" className="bg-brand-water/20 py-20 border-t border-slate-200 bg-pattern-bubbles">
            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialService={serviceInput}
                initialSuburb={suburbInput}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Form Container */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-8">
                        Find Your Service
                    </h2>

                    {/* Natural Language Form */}
                    <div className="flex flex-col gap-6 text-xl sm:text-2xl md:text-3xl font-heading font-medium leading-relaxed text-brand-navy">
                        {/* Service Input */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="opacity-60">I need</span>
                            <div className="relative inline-block min-w-[200px] md:min-w-[300px]">
                                <input
                                    type="text"
                                    value={serviceInput}
                                    onChange={handleServiceChange}
                                    onFocus={() => setShowServiceSuggestions(true)}
                                    className="w-full bg-transparent border-b-4 border-brand-slate/20 focus:border-action-gold outline-none text-action-gold font-bold text-center pb-2 placeholder-brand-slate/30 transition-colors"
                                    placeholder="Window Cleaning..."
                                />
                                {showServiceSuggestions && filteredServices.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto text-lg border border-slate-100 text-left">
                                        {filteredServices.map((service) => (
                                            <button
                                                key={service}
                                                onClick={() => selectService(service)}
                                                className="w-full px-6 py-3 hover:bg-slate-50 text-brand-slate hover:text-brand-navy font-medium transition-colors flex items-center gap-2"
                                            >
                                                <Search className="w-4 h-4 text-action-gold" />
                                                {service}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Suburb Input */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <span className="opacity-60">in</span>
                            <div className="relative inline-block min-w-[200px] md:min-w-[300px]">
                                <input
                                    type="text"
                                    value={suburbInput}
                                    onChange={handleSuburbChange}
                                    onFocus={() => setShowSuggestions(true)}
                                    className="w-full bg-transparent border-b-4 border-brand-slate/20 focus:border-action-gold outline-none text-action-gold font-bold text-center pb-2 placeholder-brand-slate/30 transition-colors"
                                    placeholder="Your suburb..."
                                />
                                {showSuggestions && filteredSuburbs.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto text-lg border border-slate-100 text-left">
                                        {filteredSuburbs.slice(0, 8).map((s) => (
                                            <button
                                                key={s.name}
                                                onClick={() => selectSuburb(s.name)}
                                                className="w-full px-6 py-3 hover:bg-slate-50 text-brand-slate hover:text-brand-navy font-medium transition-colors flex items-center gap-2"
                                            >
                                                <MapPin className="w-4 h-4 text-action-gold" />
                                                {s.name}
                                                <span className="text-xs opacity-50 ml-auto uppercase">{s.region}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-10">
                        <button
                            onClick={handleGetQuote}
                            className="bg-brand-navy hover:bg-brand-navy/90 text-white text-xl font-bold py-4 px-10 rounded-full inline-flex items-center gap-3 transition-all hover:shadow-lg"
                        >
                            Get Quote
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* SEO Suburb List */}
                <div className="mt-16 bg-pattern-squeegee rounded-3xl p-8 border border-slate-100/50">
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
                </div>
            </div>
        </section>
    );
}
