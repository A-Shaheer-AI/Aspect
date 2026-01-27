import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Camera } from "lucide-react";

export const metadata: Metadata = {
    title: "Our Work | Portfolio | Aspect Window Cleaning Perth",
    description: "See the difference professional window cleaning makes. Before and after photos of our work across Perth homes and businesses.",
};

// Portfolio items - In production, these would come from a CMS
const portfolioItems = [
    {
        id: 1,
        title: "Coastal Home Transformation",
        location: "Cottesloe",
        type: "Residential",
        description: "Years of salt buildup removed from this oceanfront home. The owners couldn't believe the difference.",
        beforeImage: "/assets/images/portfolio/before-1.jpg",
        afterImage: "/assets/images/portfolio/after-1.jpg",
    },
    {
        id: 2,
        title: "Office Building Refresh",
        location: "Perth CBD",
        type: "Commercial",
        description: "30-storey office building cleaned using water-fed pole system. Zero disruption to tenants.",
        beforeImage: "/assets/images/portfolio/before-2.jpg",
        afterImage: "/assets/images/portfolio/after-2.jpg",
    },
    {
        id: 3,
        title: "Solar Panel Restoration",
        location: "Joondalup",
        type: "Solar",
        description: "Efficiency increased by 28% after removing 3 years of dust and bird droppings.",
        beforeImage: "/assets/images/portfolio/before-3.jpg",
        afterImage: "/assets/images/portfolio/after-3.jpg",
    },
    {
        id: 4,
        title: "Track & Sill Deep Clean",
        location: "Fremantle",
        type: "Residential",
        description: "Neglected window tracks restored to like-new condition. Our Window Revival service at work.",
        beforeImage: "/assets/images/portfolio/before-4.jpg",
        afterImage: "/assets/images/portfolio/after-4.jpg",
    },
];

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-brand-navy py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                        <Camera className="w-4 h-4 text-action-gold" />
                        <span className="text-white/90 text-sm font-medium">Real Results</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                        Our Work Speaks for Itself
                    </h1>
                    <p className="text-xl text-brand-water/90 max-w-2xl mx-auto">
                        See the dramatic difference professional cleaning makes. These are real before &amp; after photos from Perth homes and businesses.
                    </p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {portfolioItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow"
                            >
                                {/* Before/After Comparison */}
                                <div className="relative aspect-[16/10] bg-slate-100">
                                    <div className="absolute inset-0 flex">
                                        {/* Before Side */}
                                        <div className="w-1/2 relative overflow-hidden border-r-2 border-white">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-50 flex items-center justify-center">
                                                <div className="text-center p-4">
                                                    <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-2xl">😟</span>
                                                    </div>
                                                    <span className="text-orange-700 font-bold text-sm">BEFORE</span>
                                                    <p className="text-orange-600 text-xs mt-1">Dirty &amp; Neglected</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* After Side */}
                                        <div className="w-1/2 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                                                <div className="text-center p-4">
                                                    <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                                        <span className="text-2xl">✨</span>
                                                    </div>
                                                    <span className="text-blue-700 font-bold text-sm">AFTER</span>
                                                    <p className="text-blue-600 text-xs mt-1">Crystal Clear</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Slider Handle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
                                        <div className="flex gap-0.5">
                                            <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                                            <div className="w-1 h-4 bg-slate-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-action-gold/10 text-action-gold text-xs font-bold px-2 py-1 rounded">
                                            {item.type}
                                        </span>
                                        <span className="text-brand-slate text-sm">{item.location}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-brand-navy mb-2">{item.title}</h3>
                                    <p className="text-brand-slate text-sm">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
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
