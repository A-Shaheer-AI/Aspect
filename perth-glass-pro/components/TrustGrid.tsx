"use client";

import { Shield, Award, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TrustGrid() {
    const stats = [
        { value: "1+", label: "Years Experience", icon: Award },
        { value: "100+", label: "Happy Customers", icon: Users },
        { value: "5.0", label: "Google Rating", icon: Star },
        { value: "100%", label: "Satisfaction Rate", icon: CheckCircle },
    ];

    const trustBadges = [
        { icon: Shield, title: "Fully Insured", description: "$20M public liability" },
        { icon: Clock, title: "Same Week Service", description: "Fast turnaround" },
        { icon: Award, title: "Police Cleared", description: "All staff vetted" },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 🔢 Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#ffe54d]/20 to-transparent blur-xl" />

                                <Icon className="w-8 h-8 text-[#ffe54d] mb-3 relative z-10" />

                                <div className="text-3xl md:text-4xl font-bold text-brand-navy relative z-10">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-brand-slate relative z-10">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 🛡️ Trust Badges */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {trustBadges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={badge.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-[#ffe54d]/40 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#ffe54d]/10 flex items-center justify-center group-hover:bg-[#ffe54d]/20 transition">
                                        <Icon className="w-6 h-6 text-[#ffe54d]" />
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-brand-navy mb-1">
                                            {badge.title}
                                        </h3>
                                        <p className="text-sm text-brand-slate">
                                            {badge.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ⭐ Google Rating Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl p-10 text-center text-white bg-brand-navy"
                >
                    {/* Gold glow background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ffe54d]/20 via-transparent to-[#ffe54d]/20 blur-2xl opacity-50" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 text-[#ffe54d] fill-[#ffe54d]" />
                            ))}
                        </div>

                        <p className="text-2xl font-bold mb-2">
                            5.0 Google Rating
                        </p>

                        <Link
                            target="_blank"
                            href="https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z/data=!3m1!4b1!4m6!3m5!1s0xafbbd7c3dd591183:0xe683c8a7e7212664!8m2!3d-31.9806823!4d115.7929967!16s%2Fg%2F11x1zxrlv3?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"
                            className="inline-block mt-2 text-sm text-white/80 hover:text-[#ffe54d] transition"
                        >
                            View All Reviews →
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}