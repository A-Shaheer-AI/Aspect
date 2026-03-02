"use client";

import { Droplets, Sparkles, Leaf, Shield, Baby, Clock } from "lucide-react";

export default function PureWaterSection() {
    return (
        <section className="bg-gradient-to-b from-white to-brand-water/5 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block text-action-gold font-bold text-sm uppercase tracking-wider mb-2">
                        The Aspect Difference
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-brand-navy mb-4">
                        The Science of a Spot-Free Shine
                    </h2>
                    <p className="text-brand-slate text-lg max-w-2xl mx-auto">
                        Professional pure water cleaning provides superior window cleaning results
                        because it uses advanced technology which creates better outcomes that
                        remain visible for extended periods.
                    </p>
                </div>

                {/* 2-Column Layout: Text Left, Visual Right */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-brand-navy">
                            Why Do Windows Get Spots After Cleaning?
                        </h3>
                        <p className="text-brand-slate leading-relaxed">
                            Perth tap water contains elevated dissolved mineral content which exceeds <strong className="text-brand-navy">
                                300 parts per million </strong>because it includes calcium, magnesium, and silica. When
                            water evaporates from glass surfaces, it leaves behind mineral residues that
                            create water spots and streaks which cause windows to develop a dirty
                            appearance. Glass surfaces become damaged through mineral accumulation
                            because it decreases their transparency and shortens their operational
                            lifespan.
                        </p>
                        <h3>
                            Our Pure Water Window Cleaning System
                        </h3>
                        <p className="text-brand-slate leading-relaxed">
                            The advanced multi-stage <strong className="text-brand-navy">water filtration system </strong>of our company removes 99.9
                            percent of all minerals and impurities from water to create pure water with 0
                            parts per million purity level.
                            The absence of dissolved solids in pure water results in a natural drying process
                            which produces no residue that leaves behind an unblemished and <span className="text-brand-navy font-medium">transparent
                                appearance for your windows</span>.
                        </p>
                        <h3>
                            Benefits of Pure Water Cleaning
                        </h3>
                        {/* Benefits Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Sparkles className="w-6 h-6 text-action-gold flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">
                                        Streak Free Results
                                    </h4>
                                    <p className="text-brand-slate text-xs">
                                        The process creates a window surface which remains free from water marks
                                        and haze and any remaining residue.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Clock className="w-6 h-6 text-action-gold flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">
                                        Longer Lasting Clean
                                    </h4>
                                    <p className="text-brand-slate text-xs">
                                        The traditional methods of window cleaning result in windows which remain
                                        clean for two additional weeks when compared to their standard duration of
                                        cleanliness.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Leaf className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">
                                        Eco-Friendly Cleaning
                                    </h4>
                                    <p className="text-brand-slate text-xs">
                                        The process requires no dangerous chemicals because it utilizes only purified
                                        water which meets environmental safety standards.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Baby className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">
                                        Safe for Families & Pets
                                    </h4>
                                    <p className="text-brand-slate text-xs">
                                        The use of chemical-free cleaning methods creates a healthier space for
                                        families and pets.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Glass Longevity Note */}
                        <div className="bg-brand-navy/5 border-l-4 border-action-gold p-4 rounded-r-xl">
                            <p className="text-brand-navy text-sm">
                                <strong>Protect Your Glass Investment:</strong>The untreated water process lets mineral deposits build up which creates
                                permanent stains that reduce glass transparency. The use of professional pure
                                water cleaning protects your windows by maintaining their clarity and
                                extending glass lifespan which prevents expensive future replacements.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Visual Comparison */}
                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100">
                            <h4 className="text-center font-bold text-brand-navy text-lg mb-6">
                                Water Quality Comparison
                            </h4>

                            {/* Tap Water vs Pure Water */}
                            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                {/* Tap Water */}
                                <div className="text-center">
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-orange-300 flex items-center justify-center">
                                        <Droplets className="w-10 h-10 sm:w-14 sm:h-14 text-orange-400" />
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            300 ppm
                                        </div>
                                    </div>
                                    <h5 className="font-bold text-brand-navy">Tap Water</h5>
                                    <p className="text-brand-slate text-xs mt-1">Leaves mineral deposits</p>
                                    <div className="mt-3 space-y-1">
                                        <div className="text-xs text-red-500 flex items-center justify-center gap-1">
                                            <span>✕</span> The process of tap water cleaning produces mineral deposits which accumulate on surfaces.
                                        </div>
                                        <div className="text-xs text-red-500 flex items-center justify-center gap-1">
                                            <span>✕</span> The cleaning solution creates streaks and leaves behind spotting on surfaces.
                                        </div>
                                        <div className="text-xs text-red-500 flex items-center justify-center gap-1">
                                            <span>✕</span> The surface experiences buildup of calcium minerals which develops progressively throughout the years.
                                        </div>
                                        <div className="text-xs text-red-500 flex items-center justify-center gap-1">
                                            <span>✕</span> The surface appears either dim because of the dim light or because of the presence of hazy particles.
                                        </div>
                                    </div>
                                </div>

                                {/* Pure Water */}
                                <div className="text-center">
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-50 to-cyan-100 border-4 border-blue-400 flex items-center justify-center animate-pulse-slow">
                                        <Droplets className="w-10 h-10 sm:w-14 sm:h-14 text-blue-500" />
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            0 ppm
                                        </div>
                                    </div>
                                    <h5 className="font-bold text-brand-navy">Our Pure Water</h5>
                                    <p className="text-brand-slate text-xs mt-1">Evaporates 100% clean</p>
                                    <div className="mt-3 space-y-1">
                                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                                            <span>✓</span> 0 ppm purified water.
                                        </div>
                                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                                            <span>✓</span> Spot free drying
                                        </div>
                                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                                            <span>✓</span> The surface remains clean because it contains neither residue nor chemical substances.
                                        </div>
                                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                                            <span>✓</span> The material achieves a transparent appearance which enables complete vision through it.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* TDS Explanation */}
                            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                                <p className="text-xs text-brand-slate">
                                    <strong>TDS (Total Dissolved Solids)</strong> measures mineral content in water.
                                    <br />
                                    Lower TDS = Cleaner evaporation = Spotless glass.
                                </p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-action-gold/10 rounded-full blur-2xl" aria-hidden="true"></div>
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl" aria-hidden="true"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
