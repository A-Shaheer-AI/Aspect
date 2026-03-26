"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ServicesGrid() {

    const services = [
        {
            id: "residential",
            title: "Residential Homes",
            subtext: "Inside & out residential window cleaning. Flyscreens & tracks included.",
            link: "/residential",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960130/house-windows-cleaning_byke0n.jpg",
            className: "md:col-span-2 md:row-span-1", // Large Block
        },
        {
            id: "commercial",
            title: "Commercial & Strata",
            subtext: "Offices, retail & high-reach EWP commercial window cleaning.",
            link: "/commercial",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sign-cleaning-2_ozlp2x.jpg",
            className: "md:col-span-1 md:row-span-2", // Tall Block
        },
        {
            id: "pressure",
            title: "Pressure Cleaning",
            subtext: "Driveways, pavers & exterior pressure cleaning. Soft washing available.",
            link: "/services/pressure-washing",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1774450638/pressure-cleaning-giff_ulc4tk.gif",
            className: "md:col-span-1 md:row-span-1",
        },
        {
            id: "solar",
            title: "Solar Maintenance",
            subtext: "Increase solar efficiency with pure water solar panel cleaning.",
            link: "/services/solar-panel-washing",
            image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg",
            className: "md:col-span-1 md:row-span-1",
        },
    ];

    return (
        <section className="py-20 bg-brand-snow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-brand-navy mb-4">
                        Our Cleaning Services
                    </h2>
                    <p className="text-brand-slate text-lg max-w-2xl mx-auto">
                        Select a service to learn more about our specialized solutions.
                    </p>
                </div>

                {/* Mobile: Horizontal Swipe Carousel */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:hidden scrollbar-hide -mx-4 px-4">
                    {services.map((service) => (
                        <Link
                            key={`mobile-${service.id}`}
                            href={service.link}
                            className="group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 snap-center min-w-[85vw] h-[300px]"
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
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-2xl font-montserrat font-bold text-white mb-1">{service.title}</h3>
                                <p className="text-brand-snow/90 font-medium text-sm">{service.subtext}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Desktop: Bento Grid (Strictly Separate) */}
                <div className="hidden md:grid grid-cols-3 gap-6 auto-rows-[300px] w-full">
                    {services.map((service) => (
                        <Link
                            key={`desktop-${service.id}`}
                            href={service.link}
                            className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 w-full ${service.className}`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Overlay - Darkens on hover */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-3xl font-montserrat font-bold text-white">
                                            {service.title}
                                        </h3>
                                        <ArrowUpRight className="w-8 h-8 text-brand-water opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <p className="text-brand-snow/90 font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                        {service.subtext}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 bg-brand-navy text-white font-bold px-8 py-3 rounded-full hover:bg-brand-navy/90 transition-colors"
                    >
                        View all Services
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
