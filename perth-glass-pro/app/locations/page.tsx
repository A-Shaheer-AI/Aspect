"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { ALL_SUBURBS, getSuburbsByRegion } from "@/lib/suburbs";

export default function LocationsPage() {
    const [filter, setFilter] = useState("");
    const { North, South } = getSuburbsByRegion();
    
    const filteredSuburbs = useMemo(() => {
        const all = [...North, ...South];
        if (!filter) return { North, South };
        return {
            North: North.filter(s => s.name.toLowerCase().includes(filter.toLowerCase())),
            South: South.filter(s => s.name.toLowerCase().includes(filter.toLowerCase())),
        };
    }, [filter, North, South]);

    return (
        <main className="min-h-screen bg-brand-snow">
            {/* Hero */}
            <section className="bg-brand-navy text-white pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                        Service Areas
                    </h1>
                    <p className="text-xl text-brand-slate max-w-2xl mx-auto">
                        We proudly serve all Perth metro suburbs. Click your suburb to view available services.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 my-8">

                {/* Filter */}
                <div className="max-w-md mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-slate/50" />
                        <input
                            type="text"
                            placeholder="Search suburbs..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-action-gold focus:outline-none text-lg"
                        />
                    </div>
                </div>

                {/* Suburb Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* North */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <span className="w-3 h-3 rounded-full bg-action-gold" />
                            North of River
                            <span className="text-sm font-normal text-brand-slate ml-auto">
                                {filteredSuburbs.North.length} suburbs
                            </span>
                        </h2>
                        <div className="grid grid-cols-2 gap-2">
                            {filteredSuburbs.North.map((suburb) => (
                                <Link
                                    key={suburb.name}
                                    href={`/locations/${suburb.name.toLowerCase().replace(/ /g, '-')}`}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-brand-slate hover:text-brand-navy transition-colors text-sm"
                                >
                                    <MapPin className="w-4 h-4 text-action-gold flex-shrink-0" />
                                    {suburb.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* South */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                            <span className="w-3 h-3 rounded-full bg-brand-navy" />
                            South of River
                            <span className="text-sm font-normal text-brand-slate ml-auto">
                                {filteredSuburbs.South.length} suburbs
                            </span>
                        </h2>
                        <div className="grid grid-cols-2 gap-2">
                            {filteredSuburbs.South.map((suburb) => (
                                <Link
                                    key={suburb.name}
                                    href={`/locations/${suburb.name.toLowerCase().replace(/ /g, '-')}`}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-brand-slate hover:text-brand-navy transition-colors text-sm"
                                >
                                    <MapPin className="w-4 h-4 text-action-gold flex-shrink-0" />
                                    {suburb.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* No Results */}
                {filteredSuburbs.North.length === 0 && filteredSuburbs.South.length === 0 && (
                    <p className="text-center text-brand-slate py-12">
                        No suburbs found matching &quot;{filter}&quot;
                    </p>
                )}
            </div>

        </main>
    );
}
