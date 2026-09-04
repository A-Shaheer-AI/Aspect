import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Home, Building2, Sparkles, Droplets, Wind, Phone } from "lucide-react";
import suburbsData from "@/lib/perth_suburbs.json";
import ServicesAvailable from "@/components/ServicesAvailable";
import ServicesClient from "@/components/ServicesClient";

const ALL_SUBURBS = [
    ...(suburbsData.regions.north_of_river.suburbs || []),
    ...(suburbsData.regions.south_of_river.suburbs || [])
];

export async function generateStaticParams() {
    return ALL_SUBURBS.map((suburb) => ({
        suburb: suburb.name.toLowerCase().replace(/ /g, '-'),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ suburb: string }> }): Promise<Metadata> {
    const { suburb: suburbSlug } = await params;

    const suburbName = suburbSlug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

    const templates = [
        `Professional window cleaning, solar panel washing, gutter cleaning and pressure washing in ${suburbName}, Perth. Same-week service. Free quotes. Call now.`,
        `Top-rated window cleaners in ${suburbName}. We offer residential and commercial window cleaning, pressure washing, and solar panel cleaning. Get a free quote today!`,
        `Looking for reliable window cleaning in ${suburbName}? Aspect Window Cleaning provides streak-free results for homes and businesses. Fully insured and police cleared.`,
        `Expert window and property cleaning services in ${suburbName}, Perth. From multi-story commercial buildings to residential homes, we guarantee a perfect finish.`
    ];

    const description = templates[suburbName.length % 4];

    return {
        title: `Window Cleaning ${suburbName} | Window Cleaning Perth | Aspect Window Cleaning`,
        description: description,
        openGraph: {
            title: `Property Cleaning in ${suburbName} | Aspect Window Cleaning`,
            description: `Trusted cleaning services for homes and businesses in ${suburbName}. Fully insured. 5-star rated.`,
        },
    };
}

const SERVICES = [
    { id: 'window', title: 'Residential Window Cleaning', description: 'Crystal-clear windows for your home using pure water technology. Inside & out, frames & tracks included.', iconName: "Home", servicePage: '/residential' },
    { id: 'solar', title: 'Solar Panel Washing', description: 'Boost energy output by up to 30% with professional panel cleaning. Manufacturer-approved methods.', iconName: "Sparkles", servicePage: '/services/solar-panel-washing' },
    { id: 'commercial', title: 'Commercial & Strata', description: 'High-reach EWP and rope access for offices, retail, and multi-story buildings. Full safety documentation.', iconName: "Building2", servicePage: '/commercial' },
    { id: 'gutter', title: 'Gutter Cleaning', description: 'Prevent water damage with complete debris removal and downpipe flushing. Roof inspection included.', iconName: "Droplets", servicePage: '/services/gutter-cleaning' },
    { id: 'pressure', title: 'Pressure Washing', description: 'Revitalize driveways, patios, and outdoor areas. Safe for pavers, concrete, and tiles.', iconName: "Wind", servicePage: '/services/pressure-washing' },
];

export default async function SuburbPage({ params }: { params: Promise<{ suburb: string }> }) {
    const { suburb: suburbSlug } = await params;

    const suburb = ALL_SUBURBS.find(
        s => s.name.toLowerCase().replace(/ /g, '-') === suburbSlug
    );

    if (!suburb) notFound();

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
                        Window Cleaning in {suburb.name}
                    </h1>

                    <p className="text-lg md:text-xl text-brand-water/80 max-w-2xl mx-auto mb-8">
                        {suburb.description}
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

            <section className="py-8 max-w-4xl mx-auto px-4 text-center text-gray-600">
                <p>{suburb.local_note}</p>
                <p className="mt-4 text-sm leading-relaxed">
                    In addition to our core window cleaning services, we offer <Link href="/services/solar-panel-washing" className="text-action-gold hover:underline font-semibold">solar panel washing</Link>, <Link href="/services/pressure-washing" className="text-action-gold hover:underline font-semibold">pressure washing</Link>, and <Link href="/services/gutter-cleaning" className="text-action-gold hover:underline font-semibold">gutter cleaning</Link> in {suburb.name} and surrounding areas. For business owners, our <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-semibold">commercial cleaning</Link> team is available for strata, retail, and office properties. Read our <Link href="/blog" className="text-action-gold hover:underline font-semibold">property maintenance guides</Link> to learn more about protecting your Perth home.
                </p>
            </section>

            {/* Services */}
            <ServicesClient
                SERVICES={SERVICES}
                suburbName={suburb.name}
            />

            {/* CTA */}
            <section className="bg-brand-navy text-white py-16">
                <div className="max-w-3xl mx-auto px-4 text-center">

                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                        Ready for Sparkling Results?
                    </h2>

                    <p className="text-brand-water/80 mb-8">
                        Get a free, no-obligation quote for any service in {suburb.name}.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                        <a
                            href="tel:+61400000000"
                            className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            Call Now
                        </a>

                        <Link
                            href="/pricing#estimator"
                            className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/20 transition-colors"
                        >
                            Online Quote <ArrowRight className="w-5 h-5" />
                        </Link>

                    </div>

                </div>
            </section>

        </div>
    );
}