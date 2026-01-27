import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Home, Building2, Sparkles, Droplets, Wind, Phone } from "lucide-react";
import { ALL_SUBURBS } from "@/lib/suburbs";
import ServicesAvailable from "@/components/ServicesAvailable";

export async function generateStaticParams() {
    return ALL_SUBURBS.map((suburb) => ({
        suburb: suburb.name.toLowerCase().replace(/ /g, '-'),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ suburb: string }> }): Promise<Metadata> {
    const { suburb: suburbSlug } = await params;
    const suburbName = suburbSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
        title: `Property Cleaning Services in ${suburbName} | Aspect`,
        description: `Professional window cleaning, solar panel washing, gutter cleaning and pressure washing in ${suburbName}, Perth. Same-week service. Free quotes. Call now.`,
        openGraph: {
            title: `Property Cleaning in ${suburbName} | Aspect Window Cleaning`,
            description: `Trusted cleaning services for homes and businesses in ${suburbName}. Fully insured. 5-star rated.`,
        },
    };
}

const SERVICES = [
    { id: 'window', title: 'Residential Window Cleaning', description: 'Crystal-clear windows for your home using pure water technology. Inside & out, frames & tracks included.', icon: Home, servicePage: '/services/window-cleaning' },
    { id: 'solar', title: 'Solar Panel Washing', description: 'Boost energy output by up to 30% with professional panel cleaning. Manufacturer-approved methods.', icon: Sparkles, servicePage: '/services/solar-panel-washing' },
    { id: 'commercial', title: 'Commercial & Strata', description: 'High-reach EWP and rope access for offices, retail, and multi-story buildings. Full safety documentation.', icon: Building2, servicePage: '/services/commercial-cleaning' },
    { id: 'gutter', title: 'Gutter Cleaning', description: 'Prevent water damage with complete debris removal and downpipe flushing. Roof inspection included.', icon: Droplets, servicePage: '/services/gutter-cleaning' },
    { id: 'pressure', title: 'Pressure Washing', description: 'Revitalize driveways, patios, and outdoor areas. Safe for pavers, concrete, and tiles.', icon: Wind, servicePage: '/services/pressure-washing' },
];

export default async function SuburbPage({ params }: { params: Promise<{ suburb: string }> }) {
    const { suburb: suburbSlug } = await params;
    const suburbName = suburbSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const isValid = ALL_SUBURBS.some(s => s.name.toLowerCase() === suburbName.toLowerCase());
    if (!isValid) notFound();

    return (
        <div className="min-h-screen bg-brand-snow">
            {/* Hero */}
            <section className="bg-brand-navy text-white py-20 md:py-28">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-sm font-medium">Same-Week Availability</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
                        Property Cleaning in {suburbName}
                    </h1>
                    <p className="text-lg md:text-xl text-brand-water/80 max-w-2xl mx-auto mb-8">
                        Professional cleaning services for homes and businesses in {suburbName}. Fully insured. 5-star rated.
                    </p>
                    <a
                        href="tel:+61400000000"
                        className="inline-flex items-center gap-3 bg-action-gold text-brand-navy font-bold text-lg px-8 py-4 rounded-full hover:bg-action-gold/90 transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                        Call for Free Quote
                    </a>
                </div>
            </section>

            {/* Services */}
            <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy text-center mb-10">
                    Services Available in {suburbName}
                </h2>
                {SERVICES.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <section key={service.id} id={service.id} className={`py-8 md:py-10 ${index !== SERVICES.length - 1 ? 'border-b border-slate-200' : ''}`}>
                            <div className="flex flex-col md:flex-row md:items-start gap-5">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-action-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-action-gold" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-navy mb-2">
                                        {service.title} in {suburbName}
                                    </h3>
                                    <p className="text-brand-slate mb-4 leading-relaxed">{service.description}</p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Link href={`/quote?service=${service.id}&suburb=${suburbSlug}`} className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-5 py-2.5 rounded-full hover:bg-action-gold/90 transition-colors text-sm">
                                            Get Quote <ArrowRight className="w-4 h-4" />
                                        </Link>
                                        <Link href={service.servicePage} className="text-sm text-brand-navy font-medium hover:text-action-gold underline underline-offset-2 transition-colors">
                                            Learn more about {service.title.toLowerCase()} →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Services Available - SEO Backlinks */}
            <ServicesAvailable suburbName={suburbName} suburbSlug={suburbSlug} />

            {/* CTA */}
            <section className="bg-brand-navy text-white py-16">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Ready for Sparkling Results?</h2>
                    <p className="text-brand-water/80 mb-8">Get a free, no-obligation quote for any service in {suburbName}.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="tel:+61400000000" className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90 transition-colors">
                            <Phone className="w-5 h-5" />
                            Call Now
                        </a>
                        <Link href="/quote" className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/20 transition-colors">
                            Online Quote <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

