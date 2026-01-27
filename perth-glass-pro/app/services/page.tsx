import Link from "next/link";
import { Metadata } from "next";
import { Home, Building2, Sun, Droplets, ArrowRight, Wrench, Zap, Fence, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Our Services | Aspect Window Cleaning Perth",
    description: "Complete cleaning services for Perth homes and businesses. Window cleaning, solar panel cleaning, gutter cleaning, pressure washing, and more.",
};

const primaryServices = [
    {
        title: "Residential Window Cleaning",
        description: "Crystal-clear windows for your home using our Pure Water Technology. Inside, outside, or both — we leave zero streaks and zero spots.",
        icon: Home,
        features: ["Pure Water Technology", "Inside & Outside", "Frames & Sills Included", "Flyscreen Cleaning"],
        href: "/services/window-cleaning",
        color: "bg-blue-50 border-blue-200",
        iconColor: "text-blue-500",
    },
    {
        title: "Commercial Window Cleaning",
        description: "Keep your business looking professional with regular commercial window cleaning. Strata, offices, shopfronts, and multi-story buildings.",
        icon: Building2,
        features: ["Strata Specialists", "Water-Fed Pole System", "Lift Access Available", "Scheduled Maintenance"],
        href: "/commercial",
        color: "bg-slate-50 border-slate-200",
        iconColor: "text-brand-navy",
    },
    {
        title: "Solar Panel Cleaning",
        description: "Dirty panels lose up to 30% efficiency. Our gentle cleaning process restores maximum power output without damaging your investment.",
        icon: Sun,
        features: ["Boost Energy Output", "Extend Panel Life", "No Harsh Chemicals", "Before/After Photos"],
        href: "/services/solar-panel-cleaning",
        color: "bg-yellow-50 border-yellow-200",
        iconColor: "text-yellow-500",
    },
    {
        title: "Pressure Washing",
        description: "Revive your driveways, patios, pathways, and outdoor areas. Our high-pressure cleaning removes years of grime, mould, and stains.",
        icon: Droplets,
        features: ["Driveways & Patios", "Deck Restoration", "Mould Removal", "Eco-Friendly"],
        href: "/services/pressure-washing",
        color: "bg-cyan-50 border-cyan-200",
        iconColor: "text-cyan-500",
    },
    {
        title: "Gutter Cleaning",
        description: "Prevent water damage and pest infestations with thorough gutter cleaning. We remove leaves, debris, and blockages safely.",
        icon: Zap,
        features: ["Full Debris Removal", "Downpipe Flush", "Before/After Photos", "Roof Inspection"],
        href: "/services/gutter-cleaning",
        color: "bg-green-50 border-green-200",
        iconColor: "text-green-500",
    },
];

const secondaryServices = [
    { name: "Flyscreen Repair & Replacement", icon: Wrench },
    { name: "Hard Water Stain Removal", icon: Droplets },
    { name: "Pool Fence Detailing", icon: Fence },
    { name: "Mirror & Glass Polishing", icon: CheckCircle },
    { name: "Skylight Cleaning", icon: Sun },
    { name: "Conservatory Cleaning", icon: Home },
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-brand-navy py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                        Our Full Cleaning Menu
                    </h1>
                    <p className="text-xl text-brand-water/90 max-w-2xl mx-auto">
                        Professional cleaning services for every surface. All backed by our 100% satisfaction guarantee.
                    </p>
                </div>
            </section>

            {/* Primary Services Grid */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {primaryServices.map((service) => (
                            <Link
                                key={service.title}
                                href={service.href}
                                className={`group p-6 sm:p-8 rounded-2xl border-2 ${service.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                            >
                                <service.icon className={`w-12 h-12 ${service.iconColor} mb-4`} />
                                <h2 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-action-gold transition-colors">
                                    {service.title}
                                </h2>
                                <p className="text-brand-slate mb-4 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-brand-navy">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <span className="inline-flex items-center gap-2 text-action-gold font-bold text-sm group-hover:gap-3 transition-all">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Secondary Services */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-navy text-center mb-8">
                        Additional Services
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {secondaryServices.map((service) => (
                            <div
                                key={service.name}
                                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200"
                            >
                                <service.icon className="w-6 h-6 text-action-gold flex-shrink-0" />
                                <span className="font-medium text-brand-navy">{service.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-brand-slate mb-4">
                            Don&apos;t see what you need? We may still be able to help!
                        </p>
                        <Link
                            href="/quote"
                            className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
                        >
                            Get a Custom Quote <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
