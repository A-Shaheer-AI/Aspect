"use client";

import { Shield, Award, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustGrid() {
    const stats = [
        { value: "15+", label: "Years Experience", icon: Award },
        { value: "5000+", label: "Happy Customers", icon: Users },
        { value: "4.9", label: "Google Rating", icon: Star },
        { value: "100%", label: "Satisfaction Rate", icon: CheckCircle },
    ];

    const trustBadges = [
        { icon: Shield, title: "Fully Insured", description: "$20M public liability" },
        { icon: Clock, title: "Same Week Service", description: "Fast turnaround" },
        { icon: Award, title: "Police Cleared", description: "All staff vetted" },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 bg-slate-50 rounded-2xl"
                            >
                                <Icon className="w-8 h-8 text-action-gold mx-auto mb-3" />
                                <div className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-brand-slate">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Badges */}
                <div className="grid md:grid-cols-3 gap-8">
                    {trustBadges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={badge.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 p-6 border border-slate-100 rounded-2xl hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-action-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-6 h-6 text-action-gold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-navy mb-1">{badge.title}</h3>
                                    <p className="text-sm text-brand-slate">{badge.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Google Rating Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-gradient-to-r from-brand-navy to-brand-navy/90 rounded-2xl p-8 text-center text-white"
                >
                    <div className="flex items-center justify-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-action-gold fill-action-gold" />
                        ))}
                    </div>
                    <p className="text-xl font-bold mb-1">4.9 out of 5 stars</p>
                    <p className="text-brand-water/80 text-sm">Based on 200+ Google Reviews</p>
                </motion.div>
            </div>
        </section>
    );
}
