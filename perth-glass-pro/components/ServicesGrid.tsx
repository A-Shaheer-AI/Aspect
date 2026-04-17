"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Droplets, Home, Building2, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesGrid() {

    const services = [
        {
            id: "residential",
            title: "Residential Homes",
            subtext: "Inside & out residential window cleaning. Flyscreens & tracks included for a complete finish.",
            link: "/residential",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960130/house-windows-cleaning_byke0n.jpg",
            icon: Home,
            className: "md:col-span-2 md:row-span-2", // Hero size - 2x2
            accent: "from-blue-500/20 to-cyan-500/20",
            iconBg: "bg-blue-500",
        },
        {
            id: "commercial",
            title: "Commercial & Strata",
            subtext: "Offices, retail & high-reach EWP commercial window cleaning. Certified professionals.",
            link: "/commercial",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sign-cleaning-2_ozlp2x.jpg",
            icon: Building2,
            className: "md:col-span-1 md:row-span-2", // Tall - 1x2
            accent: "from-purple-500/20 to-pink-500/20",
            iconBg: "bg-purple-500",
        },
        {
            id: "pressure",
            title: "Pressure Cleaning",
            subtext: "Driveways, pavers & exterior pressure cleaning. Soft washing available.",
            link: "/services/pressure-washing",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1774450638/pressure-cleaning-giff_ulc4tk.gif",
            icon: Zap,
            className: "md:col-span-1 md:row-span-1", // Standard
            accent: "from-orange-500/20 to-red-500/20",
            iconBg: "bg-orange-500",
        },
        {
            id: "solar",
            title: "Solar Maintenance",
            subtext: "Increase solar efficiency with pure water solar panel cleaning.",
            link: "/services/solar-panel-washing",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg",
            icon: Sparkles,
            className: "md:col-span-1 md:row-span-1", // Standard
            accent: "from-yellow-500/20 to-amber-500/20",
            iconBg: "bg-yellow-500",
        },
        {
            id: "gutter",
            title: "Gutter Cleaning",
            subtext: "Roof gutters, downpipes & valleys cleared. Prevent water damage with regular maintenance.",
            link: "/services/gutter-cleaning",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1775990687/gutter-cleaning_nd8wyn.jpg",
            icon: Droplets,
            className: "md:col-span-1 md:row-span-1", // Standard
            accent: "from-emerald-500/20 to-teal-500/20",
            iconBg: "bg-emerald-500",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#000080] text-sm font-semibold mb-6 border border-blue-100">
                        <Sparkles className="w-4 h-4" />
                        What We Offer
                    </span>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        Our <span className="text-[#000080]">Services</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Professional cleaning solutions tailored to your needs. Select a service to discover how we can transform your property.
                    </p>
                </motion.div>

                {/* Mobile: Horizontal Scroll Carousel */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 md:hidden scrollbar-hide -mx-4 px-4">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={`mobile-${service.id}`}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={service.link}
                                    className="group relative rounded-3xl overflow-hidden shadow-xl snap-center min-w-[85vw] h-[380px] block"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0 w-full h-full">
                                        {service.id === "pressure" ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    {/* Accent Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                        <div className={`w-12 h-12 rounded-2xl ${service.iconBg} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                                            {service.subtext}
                                        </p>

                                        {/* Arrow indicator */}
                                        <div className="mt-4 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                                            <span className="text-sm font-medium">Learn more</span>
                                            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Desktop: Bento Grid Layout */}
                <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-[280px] w-full">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={`desktop-${service.id}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={service.className}
                            >
                                <Link
                                    href={service.link}
                                    className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 w-full h-full block"
                                >
                                    {/* Background Image with Zoom Effect */}
                                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                                        {service.id === "pressure" ? (
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                unoptimized
                                                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                        )}
                                    </div>

                                    {/* Multi-layer Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    {/* Shine Effect on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </div>

                                    {/* Content Container */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                        {/* Top: Icon Badge */}
                                        <div className="flex justify-between items-start">
                                            <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 backdrop-blur-sm bg-opacity-90`}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                <ArrowUpRight className="w-5 h-5 text-white" />
                                            </div>
                                        </div>

                                        {/* Bottom: Text Content */}
                                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                                                {service.title}
                                            </h3>
                                            <p className="text-white/80 text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 line-clamp-2">
                                                {service.subtext}
                                            </p>

                                            {/* Animated Line */}
                                            <div className="mt-4 h-0.5 bg-white/30 rounded-full overflow-hidden">
                                                <div className="h-full bg-white w-0 group-hover:w-full transition-all duration-700 ease-out" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-3 bg-slate-900 text-white font-semibold px-8 py-4 rounded-full hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <span>View all Services</span>
                        <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            {/* Custom CSS for scrollbar hiding */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}