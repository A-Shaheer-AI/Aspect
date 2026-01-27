import Link from "next/link";
import { Home, Sparkles, Building2, Droplets, Wind, ArrowRight } from "lucide-react";

interface ServicesAvailableProps {
    suburbName: string;
    suburbSlug: string;
}

const ALL_SERVICES = [
    {
        id: 'window',
        title: 'Window Cleaning',
        description: 'Crystal-clear, streak-free windows',
        icon: Home,
        href: '/services/window-cleaning',
        color: 'bg-blue-50 text-blue-600'
    },
    {
        id: 'solar',
        title: 'Solar Panel Washing',
        description: 'Boost energy output by 30%',
        icon: Sparkles,
        href: '/services/solar-panel-washing',
        color: 'bg-yellow-50 text-yellow-600'
    },
    {
        id: 'commercial',
        title: 'Commercial Cleaning',
        description: 'EWP & high-rise specialists',
        icon: Building2,
        href: '/services/commercial-cleaning',
        color: 'bg-purple-50 text-purple-600'
    },
    {
        id: 'gutter',
        title: 'Gutter Cleaning',
        description: 'Prevent water damage',
        icon: Droplets,
        href: '/services/gutter-cleaning',
        color: 'bg-cyan-50 text-cyan-600'
    },
    {
        id: 'pressure',
        title: 'Pressure Washing',
        description: 'Revitalize outdoor areas',
        icon: Wind,
        href: '/services/pressure-washing',
        color: 'bg-green-50 text-green-600'
    },
];

/**
 * SEO component that creates backlinks from suburb pages to all service pages.
 * Completes the Hub-and-Spoke architecture.
 */
export default function ServicesAvailable({ suburbName, suburbSlug }: ServicesAvailableProps) {
    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy text-center mb-4">
                    All Services in {suburbName}
                </h2>
                <p className="text-center text-brand-slate mb-10 max-w-xl mx-auto">
                    Professional property cleaning services available in {suburbName} and surrounding areas.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ALL_SERVICES.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Link
                                key={service.id}
                                href={`${service.href}?from=${suburbSlug}`}
                                className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-action-gold hover:shadow-lg transition-all duration-200"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-brand-navy group-hover:text-action-gold transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-brand-slate mt-1">
                                            {service.description}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-brand-slate/30 group-hover:text-action-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* SEO Text */}
                <p className="text-center text-sm text-brand-slate/60 mt-8">
                    Looking for professional cleaning in {suburbName}? We offer window cleaning, solar panel washing,
                    commercial cleaning, gutter cleaning, and pressure washing services across Perth metro.
                </p>
            </div>
        </section>
    );
}
