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
                        Why we don&apos;t use the garden hose — and why your windows will thank us.
                    </p>
                </div>

                {/* 2-Column Layout: Text Left, Visual Right */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-brand-navy">
                            What Happens When Tap Water Dries?
                        </h3>
                        <p className="text-brand-slate leading-relaxed">
                            Perth tap water contains <strong className="text-brand-navy">300+ ppm (parts per million)</strong> of dissolved minerals like calcium, magnesium, and silica. When this water evaporates on your glass, these minerals are left behind — creating those frustrating <span className="text-brand-navy font-medium">white spots, streaks, and hazy film</span> that make freshly-cleaned windows look dirty within days.
                        </p>
                        <p className="text-brand-slate leading-relaxed">
                            Our <strong className="text-brand-navy">Pure Water Technology</strong> uses a multi-stage filtration system that removes <span className="text-action-gold font-bold">100% of mineral deposits</span>. The result? Water with <strong>0 ppm TDS (Total Dissolved Solids)</strong> that evaporates completely clean — leaving nothing but a <span className="text-brand-navy font-medium">crystal-clear, spot-free finish</span>.
                        </p>

                        {/* Benefits Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Sparkles className="w-6 h-6 text-action-gold flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">Spot-Free Finish</h4>
                                    <p className="text-brand-slate text-xs">No streaks, no water marks</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Clock className="w-6 h-6 text-action-gold flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">Glass Stays Cleaner Longer</h4>
                                    <p className="text-brand-slate text-xs">Extends time between cleans</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Leaf className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">100% Eco-Friendly</h4>
                                    <p className="text-brand-slate text-xs">No chemicals, just pure H₂O</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                <Baby className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-brand-navy text-sm">Safe for Pets & Kids</h4>
                                    <p className="text-brand-slate text-xs">Zero toxic residue</p>
                                </div>
                            </div>
                        </div>

                        {/* Glass Longevity Note */}
                        <div className="bg-brand-navy/5 border-l-4 border-action-gold p-4 rounded-r-xl">
                            <p className="text-brand-navy text-sm">
                                <strong>Protect Your Investment:</strong> Mineral buildup from tap water can etch into glass over time, causing permanent damage. Pure water cleaning helps maintain <span className="font-medium">glass longevity</span> and keeps your windows looking new for years.
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
                                            <span>✕</span> Streaks & spots
                                        </div>
                                        <div className="text-xs text-red-500 flex items-center justify-center gap-1">
                                            <span>✕</span> Calcium buildup
                                        </div>
                                        <div className="text-xs text-red-500 flex items-center justify-center gap-1">
                                            <span>✕</span> Hazy finish
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
                                            <span>✓</span> Spot-free finish
                                        </div>
                                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                                            <span>✓</span> No residue
                                        </div>
                                        <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                                            <span>✓</span> Crystal clear
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
