"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { ALL_SUBURBS, getSuburbsByRegion } from "@/lib/suburbs";

interface AreasServedProps {
    serviceType: 'window' | 'solar' | 'commercial' | 'gutter' | 'pressure';
}

export default function AreasServed({ serviceType }: AreasServedProps) {
    const [filter, setFilter] = useState("");
    const { North, South } = getSuburbsByRegion();

    const filteredSuburbs = useMemo(() => {
        const all = [...North, ...South];
        if (!filter) return all;
        return all.filter(s =>
            s.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [filter, North, South]);

    const getSuburbLink = (suburbName: string) => {
        const slug = suburbName.toLowerCase().replace(/ /g, '-');
        return `/locations/${slug}#${serviceType}`;
    };

    const serviceDisplayNames: Record<string, string> = {
        window: 'Window Cleaning',
        solar: 'Solar Panel Washing',
        commercial: 'Commercial Services',
        gutter: 'Gutter Cleaning',
        pressure: 'Pressure Washing'
    };

    return (
        <section className="bg-pattern-squeegee py-16 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-4">
                    {serviceDisplayNames[serviceType]} in Perth
                </h2>
                <p className="text-center text-brand-slate mb-10 max-w-2xl mx-auto">
                    We proudly serve all Perth metro suburbs. Click your suburb to view local service details.
                </p>

                {/* Filter */}
                <div className="max-w-md mx-auto mb-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-slate/50" />
                        <input
                            type="text"
                            placeholder="Filter suburbs..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-action-gold focus:outline-none"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {filteredSuburbs.slice(0, 50).map((suburb) => (
                        <Link
                            key={suburb.name}
                            href={getSuburbLink(suburb.name)}
                            className="group flex items-center gap-2 bg-white px-4 py-3 rounded-lg border border-slate-100 shadow-sm hover:border-action-gold hover:shadow-md transition-all text-sm text-brand-slate hover:text-brand-navy"
                        >
                            <MapPin className="w-4 h-4 text-action-gold flex-shrink-0" />
                            <span className="truncate">{suburb.name}</span>
                        </Link>
                    ))}
                </div>

                {filteredSuburbs.length === 0 && (
                    <p className="text-center text-brand-slate py-8">
                        No suburbs found matching &quot;{filter}&quot;
                    </p>
                )}
            </div>
        </section>
    );
}
