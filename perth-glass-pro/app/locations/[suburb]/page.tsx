import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUSINESS } from "@/lib/config";
import { ArrowRight, Home, Building2, Sparkles, Droplets, Wind, Phone, MapPin } from "lucide-react";
import suburbsData from "@/lib/perth_suburbs.json";
import ServicesAvailable from "@/components/ServicesAvailable";
import ServicesClient from "@/components/ServicesClient";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FAQ from "@/components/FAQ";

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
        `Looking for spotless windows in ${suburbName}? Enjoy streak-free pure water cleaning from police-cleared, $20M insured Perth pros. Get a free quote today!`,
        `Need reliable window cleaning in ${suburbName}? We clean glass, tracks, screens & frames with zero streaks. Same-week bookings & free quotes. Call now!`,
        `Top-rated window & exterior cleaning in ${suburbName}. Fully insured ($20M) & police-cleared Perth team. Streak-free guarantee. Get your instant quote!`,
        `Sparkling clean windows in ${suburbName} without the hassle. Pure water technology, frames & tracks included. Same-week service. Free instant quotes!`
    ];

    const description = templates[suburbName.length % 4];

    return {
        title: { absolute: `Window Cleaning in ${suburbName} | Aspect Window Cleaning` },
        description: description,
        alternates: { canonical: `https://aspectwindowcleaning.com.au/locations/${suburbSlug}` },
        openGraph: {
            title: `Window Cleaning in ${suburbName} | Aspect Window Cleaning`,
            description: `Trusted cleaning services for homes and businesses in ${suburbName}. Fully insured. 5-star rated.`,
            images: [
                {
                    url: "/og-image.webp",
                    type: "image/webp",
                    width: 1200,
                    height: 630,
                    alt: `Aspect Window Cleaning - ${suburbName}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `Window Cleaning in ${suburbName} | Aspect Window Cleaning`,
            description: `Trusted cleaning services for homes and businesses in ${suburbName}. Fully insured. 5-star rated.`,
            images: ["/og-image.webp"],
        },
    };
}

const SERVICES = [
    { id: 'window', title: 'Residential Window Cleaning', description: 'Crystal-clear windows for your home using pure water technology. Inside & out, frames & tracks included.', iconName: "Home", servicePage: '/services/residential-window-cleaning' },
    { id: 'solar', title: 'Solar Panel Washing', description: 'Boost energy output by up to 30% with professional panel cleaning. Manufacturer-approved methods.', iconName: "Sparkles", servicePage: '/services/solar-panel-washing' },
    { id: 'commercial', title: 'Commercial & Strata', description: 'High-reach EWP and rope access for offices, retail, and multi-story buildings. Full safety documentation.', iconName: "Building2", servicePage: '/services/commercial-window-cleaning' },
    { id: 'gutter', title: 'Gutter Cleaning', description: 'Prevent water damage with complete debris removal and downpipe flushing. Roof inspection included.', iconName: "Droplets", servicePage: '/services/gutter-cleaning' },
    { id: 'pressure', title: 'Pressure Washing', description: 'Revitalize driveways, patios, and outdoor areas. Safe for pavers, concrete, and tiles.', iconName: "Wind", servicePage: '/services/pressure-washing' },
];

export default async function SuburbPage({ params }: { params: Promise<{ suburb: string }> }) {
    const { suburb: suburbSlug } = await params;

    const suburb = ALL_SUBURBS.find(
        s => s.name.toLowerCase().replace(/ /g, '-') === suburbSlug
    );

    if (!suburb) notFound();

    const SUBURB_FAQS = [
        {
            question: `How often should windows be cleaned in ${suburb.name}?`,
            answer: `For most homes in ${suburb.name}, we recommend professional window cleaning every 3 to 6 months. Properties close to the coast or exposed to Perth's summer dust benefit from cleaning every 6 to 8 weeks to prevent permanent glass etching and mineral buildup.`
        },
        {
            question: `Do you service both residential and commercial properties in ${suburb.name}?`,
            answer: `Yes! Aspect Window Cleaning provides complete cleaning services for residential homes, strata complexes, retail shopfronts, and multi-storey commercial offices across ${suburb.name} and surrounding areas.`
        },
        {
            question: `How much does window cleaning cost in ${suburb.name}?`,
            answer: `Our pricing is transparent and competitive. Single-storey residential cleans start from affordable standard packages, and you can calculate your exact cost instantly on our pricing page or call our team for a fast quote.`
        },
        {
            question: `Are your technicians insured and police cleared in ${suburb.name}?`,
            answer: `Yes, every Aspect technician is background-checked, police cleared, and covered by $20 million public liability insurance, ensuring complete security and professionalism on your property.`
        }
    ];

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Aspect Window Cleaning - ${suburb.name}`,
        "image": "https://aspectwindowcleaning.com.au/og-image.webp",
        "logo": "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1772130850/white-logo_pzpxjk.png",
        "telephone": BUSINESS.phoneRaw,
        "url": `https://aspectwindowcleaning.com.au/locations/${suburbSlug}`,
        "priceRange": "$$",
        "areaServed": {
            "@type": "City",
            "name": suburb.name
        },
        "description": `Professional window cleaning, solar panel washing, gutter cleaning, and pressure washing in ${suburb.name}, Perth. Same-week service. Fully insured.`
    };

        const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://aspectwindowcleaning.com.au"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Locations",
                "item": "https://aspectwindowcleaning.com.au/locations"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": suburb.name,
                "item": `https://aspectwindowcleaning.com.au/locations/${suburbSlug}`
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": SUBURB_FAQS.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-brand-snow">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Hero */}
            <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-24">
                <div className="max-w-5xl mx-auto px-4 text-center">

                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-sm font-medium">Same-Week Availability</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
                        Window Cleaning in {suburb.name}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-brand-water/80 max-w-2xl mx-auto mb-8">
                        {suburb.description}
                    </p>

                    <a
                        href={`tel:${BUSINESS.phoneRaw}`}
                        className="inline-flex items-center justify-center gap-3 bg-action-gold text-brand-navy font-bold text-base sm:text-lg px-8 py-4 rounded-full hover:bg-action-gold/90 transition-colors shadow-md min-h-[48px] w-full sm:w-auto"
                    >
                        <Phone className="w-5 h-5" />
                        Call for Free Quote
                    </a>

                </div>
            </section>

            {/* Local Area Profile & Maintenance Notes */}
            <section className="py-12 bg-white border-b border-slate-200/80">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="inline-flex items-center gap-1.5 bg-brand-navy/10 text-brand-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                <MapPin className="w-3.5 h-3.5 text-action-gold" />
                                {suburb.type || "Perth Metro"}
                            </span>
                            {suburb.nearby_landmark && (
                                <span className="inline-flex items-center gap-1.5 bg-action-gold/15 text-brand-navy px-3 py-1 rounded-full text-xs font-semibold">
                                    Near {suburb.nearby_landmark}
                                </span>
                            )}
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-navy mb-4">
                            Local Window &amp; Exterior Cleaning Guide: {suburb.name}
                        </h2>

                        <p className="text-brand-slate text-base sm:text-lg leading-relaxed mb-6">
                            {suburb.service_description || suburb.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                                <div className="flex items-center gap-2 text-brand-navy font-bold mb-2">
                                    <Sparkles className="w-4 h-4 text-action-gold" />
                                    <span>Local Window Care Tip</span>
                                </div>
                                <p className="text-sm text-brand-slate leading-relaxed">
                                    {suburb.window_cleaning_tip || "Regular pure water cleaning prevents environmental mineral bonding on glass surfaces."}
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                                <div className="flex items-center gap-2 text-brand-navy font-bold mb-2">
                                    <Droplets className="w-4 h-4 text-action-gold" />
                                    <span>Microclimate Environmental Note</span>
                                </div>
                                <p className="text-sm text-brand-slate leading-relaxed">
                                    {suburb.local_note || `Environmental dust and seasonal rain patterns affect glass in ${suburb.name}.`}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-brand-slate/90 leading-relaxed pt-2 border-t border-slate-200/60">
                            In addition to our residential window cleaning in {suburb.name}, we provide <Link href="/services/solar-panel-washing" className="text-action-gold hover:underline font-semibold">solar panel washing</Link>, <Link href="/services/pressure-washing" className="text-action-gold hover:underline font-semibold">pressure washing</Link>, and <Link href="/services/gutter-cleaning" className="text-action-gold hover:underline font-semibold">gutter cleaning</Link>. Business and strata owners can request specialized <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-semibold">commercial cleaning</Link> with cherry pickers and reach poles. Explore our real Perth <Link href="/case-studies" className="text-action-gold hover:underline font-semibold">case studies</Link>, browse our <Link href="/blog" className="text-action-gold hover:underline font-semibold">cleaning guides</Link>, compare our <Link href="/pricing" className="text-action-gold hover:underline font-semibold">transparent pricing</Link>, or <Link href="/contact" className="text-action-gold hover:underline font-semibold">contact our team</Link> for an upfront quote.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <ServicesClient
                SERVICES={SERVICES}
                suburbName={suburb.name}
            />

            {/* Case Studies — only renders if relevant studies exist for this suburb */}
            <CaseStudiesSection
                suburbSlug={suburbSlug}
                suburbName={suburb.name}
            />

            {/* FAQs */}
            <FAQ
                faqs={SUBURB_FAQS}
                title={`Common questions about window and exterior cleaning in ${suburb.name}`}
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
                            href={`tel:${BUSINESS.phoneRaw}`}
                            className="inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-action-gold/90 transition-colors w-full sm:w-auto min-h-[48px]"
                        >
                            <Phone className="w-5 h-5" />
                            Call Now
                        </a>

                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-white/20 transition-colors w-full sm:w-auto min-h-[48px]"
                        >
                            View Pricing Guide <ArrowRight className="w-5 h-5" />
                        </Link>

                    </div>

                </div>
            </section>

        </div>
    );
}

