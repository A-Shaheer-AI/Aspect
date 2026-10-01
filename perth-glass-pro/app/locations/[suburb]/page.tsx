import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BUSINESS } from "@/lib/config";
import { ArrowRight, Home, Building2, Sparkles, Droplets, Wind, Phone, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import suburbsData from "@/lib/perth_suburbs.json";
import ServicesClient from "@/components/ServicesClient";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import FAQ from "@/components/FAQ";

interface SuburbRecord {
    name: string;
    type?: string;
    description?: string;
    service_description?: string;
    nearby_landmark?: string;
    nearby_landmarks?: string[];
    local_note?: string;
    window_cleaning_tip?: string;
    distance_from_base?: {
        km: number;
        travel_time_mins: number;
        main_arterial: string;
    };
    architecture_profile?: string;
    local_challenges_reddit?: string;
    cleaning_strategy?: string;
    coverage_guarantee?: string;
    suburb_faqs?: Array<{ question: string; answer: string }>;
}

const ALL_SUBURBS: SuburbRecord[] = [
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
    { id: 'commercial', title: 'Commercial & Strata', description: 'Scissor lift EWP and water-fed pure water poles up to 4 storeys for offices, retail, and strata complexes. Full safety documentation.', iconName: "Building2", servicePage: '/services/commercial-window-cleaning' },
    { id: 'gutter', title: 'Gutter Cleaning', description: 'Prevent water damage with complete debris removal and downpipe flushing. Roof inspection included.', iconName: "Droplets", servicePage: '/services/gutter-cleaning' },
    { id: 'pressure', title: 'Pressure Washing', description: 'Revitalize driveways, patios, and outdoor areas. Safe for pavers, concrete, and tiles.', iconName: "Wind", servicePage: '/services/pressure-washing' },
];

export default async function SuburbPage({ params }: { params: Promise<{ suburb: string }> }) {
    const { suburb: suburbSlug } = await params;

    const suburb = ALL_SUBURBS.find(
        s => s.name.toLowerCase().replace(/ /g, '-') === suburbSlug
    );

    if (!suburb) notFound();

    const customFaqs: { question: string; answer: string }[] = [];
    if (suburbSlug === 'joondalup') {
        customFaqs.push(
            {
                question: "Do you offer gutter cleaning and downpipe clearing in Joondalup?",
                answer: "Yes! Gutter cleaning in Joondalup is one of our most requested services. With native eucalyptus trees and seasonal leaf drop throughout the northern corridor, our thorough gutter clearing and downpipe flushing protect your rooflines and foundations from water damage."
            },
            {
                question: "Can Aspect clean multi-storey commercial offices in Joondalup CBD?",
                answer: "Yes. We service commercial buildings, retail shopfronts, and strata facilities up to 4 storeys across the Joondalup city centre using pure water reach poles and certified scissor lifts."
            }
        );
    } else if (suburbSlug === 'fremantle') {
        customFaqs.push(
            {
                question: "How do you handle coastal salt spray on Fremantle windows?",
                answer: "Fremantle's coastal exposure and sea breezes off the harbour leave a sticky salt crust on glass. Our 0ppm pure water system dissolves salt and mineral residue without scratching glass or damaging heritage window frames."
            },
            {
                question: "Do you clean heritage shopfronts and commercial glazing in Fremantle?",
                answer: "Yes. Aspect provides specialized commercial window cleaning for Fremantle's heritage shopfronts, cafes, and historic buildings, taking extra care with character timber and vintage glazing."
            }
        );
    }

    const localizedFaqs = suburb.suburb_faqs || [];

    const SUBURB_FAQS = [
        ...localizedFaqs,
        ...customFaqs,
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
        "logo": "https://aspectwindowcleaning.com.au/brand/white-logo.png",
        "telephone": BUSINESS.phoneRaw,
        "url": `https://aspectwindowcleaning.com.au/locations/${suburbSlug}`,
        "priceRange": "$$",
        "areaServed": {
            "@type": "City",
            "name": suburb.name
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "43",
            "bestRating": "5",
            "worstRating": "1"
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

                    <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-xs sm:text-sm font-medium">Same-Week Availability in {suburb.name}</span>
                        {suburb.distance_from_base && (
                            <>
                                <span className="text-white/40">•</span>
                                <span className="text-xs sm:text-sm text-brand-water/90">
                                    {suburb.distance_from_base.km} km from Nedlands ({suburb.distance_from_base.travel_time_mins} mins via {suburb.distance_from_base.main_arterial})
                                </span>
                                <span className="text-white/40">•</span>
                                <span className="text-xs sm:text-sm text-action-gold font-semibold">Zero Callout Fees</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
                        Window Cleaning in {suburb.name}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-brand-water/80 max-w-2xl mx-auto mb-8">
                        {suburb.service_description || `Professional streak-free window cleaning in ${suburb.name}. Specialized pure water technology, frames and tracks included, and zero callout fees.`}
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

            {/* Local Area Profile & Maintenance Notes (400-500 Words of Unique Content) */}
            <section className="py-16 bg-white border-b border-slate-200/80">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-1.5 bg-brand-navy/10 text-brand-navy px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <MapPin className="w-3.5 h-3.5 text-action-gold" />
                            <span>Local Area Guide • {suburb.name} WA</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
                            Window &amp; Exterior Cleaning Guide for {suburb.name}
                        </h2>
                        <p className="text-brand-slate text-base sm:text-lg leading-relaxed">
                            {suburb.service_description || suburb.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Card 1: Architectural Character & Landmarks */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5 text-brand-navy font-bold text-lg">
                                        <div className="w-9 h-9 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                                            <Home className="w-5 h-5 text-action-gold" />
                                        </div>
                                        <span>Architectural Styles &amp; Local Landmarks</span>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
                                        {suburb.type || "Local Profile"}
                                    </span>
                                </div>
                                <p className="text-sm sm:text-base text-brand-slate leading-relaxed mb-4">
                                    {suburb.architecture_profile}
                                </p>
                            </div>
                            {suburb.nearby_landmarks && suburb.nearby_landmarks.length > 0 && (
                                <div className="pt-4 border-t border-slate-200/80">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Key Local Destinations:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {suburb.nearby_landmarks.map((landmark, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-lg">
                                                <MapPin className="w-3 h-3 text-action-gold" />
                                                {landmark}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card 2: Community Challenges & Local Concerns */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5 text-brand-navy font-bold text-lg">
                                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                                            <Wind className="w-5 h-5" />
                                        </div>
                                        <span>Community Maintenance Challenges</span>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                                        Local Insights
                                    </span>
                                </div>
                                <p className="text-sm sm:text-base text-brand-slate leading-relaxed mb-4">
                                    {suburb.local_challenges_reddit}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-200/80 bg-white/60 -mx-2 -mb-2 p-3 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
                                    <Droplets className="w-3.5 h-3.5 text-action-gold" />
                                    <span>Microclimate Factor:</span>
                                </div>
                                <p className="text-xs text-brand-slate mt-1">
                                    {suburb.local_note || `Seasonal environmental factors and wind exposure affect glass longevity across ${suburb.name}.`}
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Aspect's Equipment & Access Strategy */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5 text-brand-navy font-bold text-lg">
                                        <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <span>Specialized Equipment &amp; Access Strategy</span>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider bg-green-100 text-green-800 px-2.5 py-1 rounded-full">
                                        Aspect Solution
                                    </span>
                                </div>
                                <p className="text-sm sm:text-base text-brand-slate leading-relaxed mb-4">
                                    {suburb.cleaning_strategy}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-200/80">
                                <div className="grid grid-cols-2 gap-2 text-xs text-brand-slate">
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                        <span>0 PPM Pure RO/DI Water</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                        <span>Carbon-Fibre Poles (4 Storeys)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                        <span>Wall-Standoff Straight Ladders</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                        <span>0000 Bronze Wool Descaling</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 4: Base Distance & Zero Callout Guarantee */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2.5 text-brand-navy font-bold text-lg">
                                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <span>Depot Distance &amp; Coverage Guarantee</span>
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                                        Zero Travel Fees
                                    </span>
                                </div>
                                <p className="text-sm sm:text-base text-brand-slate leading-relaxed mb-4">
                                    {suburb.coverage_guarantee}
                                </p>
                            </div>
                            {suburb.distance_from_base && (
                                <div className="pt-4 border-t border-slate-200/80 bg-white p-3.5 rounded-2xl border border-slate-200/60">
                                    <div className="grid sm:grid-cols-3 gap-2 text-center">
                                        <div>
                                            <span className="text-slate-400 text-xs block">Depot Distance</span>
                                            <span className="font-bold text-brand-navy text-sm">{suburb.distance_from_base.km} km</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-xs block">Drive Time</span>
                                            <span className="font-bold text-brand-navy text-sm">~{suburb.distance_from_base.travel_time_mins} mins</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-xs block">Callout Fee</span>
                                            <span className="font-bold text-green-600 text-sm">$0.00 (Free)</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Internal SEO Hub Links */}
                    <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 text-sm text-brand-slate leading-relaxed">
                        <span className="font-semibold text-brand-navy block mb-1">Aspect Exterior Cleaning Services in {suburb.name}:</span>
                        In addition to our <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline font-semibold">residential window cleaning in {suburb.name}</Link>, we provide professional pure-water <Link href="/services/solar-panel-washing" className="text-action-gold hover:underline font-semibold">clean solar panels in Perth</Link>, exterior <Link href="/services/pressure-washing" className="text-action-gold hover:underline font-semibold">pressure washing</Link>, and complete <Link href="/services/gutter-cleaning" className="text-action-gold hover:underline font-semibold">roof gutter cleaning in Perth</Link>. Business and strata managers can book certified <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-semibold">commercial window cleaners in Perth</Link> with scissor lifts and pure-water reach poles up to 4 storeys. Looking for a trusted <Link href="/" className="text-action-gold hover:underline font-semibold">window cleaning service in Perth</Link>? Explore our real <Link href="/case-studies" className="text-action-gold hover:underline font-semibold">Perth case studies</Link>, browse our <Link href="/blog" className="text-action-gold hover:underline font-semibold">cleaning guides</Link>, compare our <Link href="/pricing" className="text-action-gold hover:underline font-semibold">transparent pricing</Link>, or <Link href="/contact" className="text-action-gold hover:underline font-semibold">contact our team</Link> for an upfront quote.
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
