"use client"

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Camera, Filter } from "lucide-react";
import { useState } from "react";

type Category = "All" | "Residential" | "Commercial" | "Solar" | "Pressure" | "Gutter";

interface GalleryItem {
    id: number;
    image: string;
    category: Category;
    title: string;
    location: string;
}

const galleryItems: GalleryItem[] = [
    // Residential
    { id: 1, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.09_PM_1_hnnwtr.jpg", category: "Residential", title: "Coastal Home", location: "Cottesloe" },
    { id: 2, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/WhatsApp_Image_2026-02-22_at_8.47.53_PM_1_utloaq.jpg", category: "Residential", title: "Family Home", location: "Subiaco" },
    { id: 3, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/outside-windows-cleaning_lzp8fq.jpg", category: "Residential", title: "Modern Villa", location: "Dalkeith" },

    // Commercial
    { id: 4, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960134/commercial-window-cleaning_gzkvaj.jpg", category: "Commercial", title: "Office Tower", location: "Perth CBD" },
    { id: 5, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960134/indoor-pool-cleaning_hwpcmj.jpg", category: "Commercial", title: "Retail Complex", location: "Claremont" },
    { id: 6, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960129/commercial-sign-cleaning_jzafjr.jpg", category: "Commercial", title: "Medical Center", location: "Nedlands" },

    // Solar
    { id: 7, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960127/home-rough-solar-cleaning_c6z3z9.jpg", category: "Solar", title: "Solar Restoration", location: "Joondalup" },
    { id: 8, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/solar-plates-cleaning_lasnea.jpg", category: "Solar", title: "Panel Cleaning", location: "Fremantle" },
    { id: 9, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960142/WhatsApp_Image_2026-02-22_at_8.47.57_PM_kidsnl.jpg", category: "Solar", title: "Roof Solar", location: "Mandurah" },

    // Pressure
    { id: 10, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/WhatsApp_Image_2026-02-22_at_8.47.52_PM_kzbneh.jpg", category: "Pressure", title: "Driveway Clean", location: "Mount Lawley" },
    { id: 11, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1772800983/after-cleaning-street_lhtqux.jpg", category: "Pressure", title: "Patio Restore", location: "Victoria Park" },
    { id: 12, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960141/WhatsApp_Image_2026-02-22_at_8.47.56_PM_ceiqiy.jpg", category: "Pressure", title: "Deck Cleaning", location: "South Perth" },

    // Gutter
    // { id: 13, image: "/https://res.cloudinary.com/dr8tjrszy/image/upload/v1775689518/images_lfpd4s.jpg", category: "Gutter", title: "Gutter Clear", location: "Wembley" },
    // { id: 14, image: "/https://res.cloudinary.com/dr8tjrszy/image/upload/v1775689518/gutter_cleaning_vszeu8.jpg", category: "Gutter", title: "Downpipe Clean", location: "Leederville" },
    { id: 15, image: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1775331528/gutter-cleaning_ym4thx.jpg", category: "Gutter", title: "Roof Gutters", location: "Floreat" },
];

const categories: Category[] = ["All", "Residential", "Commercial", "Solar", "Pressure", "Gutter"];

export default function PortfolioPage() {
    const [activeFilter, setActiveFilter] = useState<Category>("All");

    const filteredItems = activeFilter === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === activeFilter);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-brand-navy py-20 sm:pt-32 sm:pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                        <Camera className="w-4 h-4 text-action-gold" />
                        <span className="text-white/90 text-sm font-medium">Our Portfolio</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                        Stunning Results
                    </h1>
                    <p className="text-xl text-brand-water/90 max-w-2xl mx-auto">
                        Browse our gallery of transformations.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                        <Filter className="w-4 h-4 text-brand-slate mr-2 flex-shrink-0" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeFilter === cat
                                    ? "bg-action-gold text-brand-navy shadow-md"
                                    : "bg-slate-100 text-brand-slate hover:bg-slate-200"
                                    }`}
                            >
                                {cat === "All" ? "All Work" : `${cat} Cleaning`}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid - Simple shadow hover only */}
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-md hover:shadow-2xl transition-shadow duration-300"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-brand-slate text-lg">No images in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-action-gold fill-action-gold" />
                        ))}
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">
                        Ready for Your Transformation?
                    </h2>
                    <p className="text-brand-slate text-lg mb-8">
                        Join hundreds of happy Perth customers who love their sparkling clean windows.
                    </p>
                    <Link
                        href="/quote"
                        className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:shadow-lg transition-shadow"
                    >
                        Get Your Free Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}