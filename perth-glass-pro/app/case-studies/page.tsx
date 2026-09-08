import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Users, Clock } from "lucide-react";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
    title: { absolute: "Window Cleaning Case Studies | Aspect Window Cleaning Perth" },
    description: "Explore real window cleaning transformations across Perth. See before-and-after results, timelines, and customer outcomes for residential & commercial jobs.",
    openGraph: {
        title: "Window Cleaning Case Studies | Aspect Window Cleaning Perth",
        description: "Real jobs. Real results. See how Aspect Window Cleaning delivers across Perth homes and businesses.",
        images: [
            {
                url: "/og-image.webp",
                type: "image/webp",
                width: 1200,
                height: 630,
                alt: "Aspect Window Cleaning Case Studies Perth",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Window Cleaning Case Studies | Aspect Window Cleaning Perth",
        description: "Real jobs. Real results. See how Aspect Window Cleaning delivers across Perth homes and businesses.",
        images: ["/og-image.webp"],
    },
    alternates: {
        canonical: "https://aspectwindowcleaning.com.au/case-studies",
    },
};

export default function CaseStudiesIndexPage() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Window Cleaning Case Studies | Aspect Window Cleaning Perth",
        "description": "Real window cleaning case studies from across Perth — residential, commercial, pre-sale and specialist jobs.",
        "url": "https://aspectwindowcleaning.com.au/case-studies",
        "publisher": {
            "@type": "Organization",
            "name": "Aspect Window Cleaning",
            "url": "https://aspectwindowcleaning.com.au",
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="min-h-screen bg-brand-snow">

                {/* Hero */}
                <header className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-action-gold"></span>
                            <span className="text-sm font-medium">Real Jobs. Real Results.</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
                            Window Cleaning Case Studies
                        </h1>
                        <p className="text-base sm:text-xl text-brand-water/80 max-w-2xl mx-auto">
                            We document our most interesting jobs so you can see exactly what we do, how we do it, and the results we deliver across Perth homes and businesses.
                        </p>
                    </div>
                </header>

                {/* Case Studies Grid */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                    {caseStudies.length === 0 ? (
                        <p className="text-center text-gray-500 py-20">Case studies coming soon.</p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {caseStudies.map((cs) => {
                                const dateFormatted = new Date(cs.date).toLocaleDateString("en-AU", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                });
                                return (
                                    <Link
                                        key={cs.slug}
                                        href={`/case-studies/${cs.slug}`}
                                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-action-gold/40 hover:shadow-xl transition-all flex flex-col"
                                        aria-label={cs.title}
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative w-full aspect-video bg-gray-200">
                                            <Image
                                                src={cs.thumbnail}
                                                alt={`${cs.serviceType[0]} case study — ${cs.suburb}, Perth`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        <div className="p-5 sm:p-6 flex flex-col flex-1">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {cs.serviceType.map((t) => (
                                                    <span key={t} className="text-xs font-bold bg-action-gold/10 text-action-gold border border-action-gold/20 px-2 py-0.5 rounded-full">{t}</span>
                                                ))}
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-base sm:text-lg font-bold text-brand-navy mb-3 leading-snug group-hover:text-action-gold transition-colors line-clamp-3">
                                                {cs.title}
                                            </h2>

                                            {/* Meta */}
                                            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-gray-500 mb-4">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-action-gold" aria-hidden="true" />
                                                    {cs.suburb}, Perth
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3 text-action-gold" aria-hidden="true" />
                                                    <time dateTime={cs.date}>{dateFormatted}</time>
                                                </span>
                                                {cs.jobDetails.duration && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3 text-action-gold" aria-hidden="true" />
                                                        {cs.jobDetails.duration}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                                                {cs.excerpt}
                                            </p>

                                            <div className="flex items-center gap-1 text-action-gold font-bold text-sm group-hover:gap-2 transition-all mt-auto">
                                                Read Case Study <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </main>

                {/* CTA */}
                <section className="bg-brand-navy text-white py-12 sm:py-16 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                            Want Us to Handle Your Next Job?
                        </h2>
                        <p className="text-brand-water/80 mb-8 text-sm sm:text-base">
                            From tight pre-sale deadlines to routine residential maintenance — we work across Perth metro and deliver consistent, professional results.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <Link href="/pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base hover:bg-action-gold/90 transition-colors shadow-md min-h-[48px]">
                                View Pricing Guide <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base hover:bg-white/20 transition-colors min-h-[48px]">
                                Contact Our Team <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                            <Link href="/services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base hover:bg-white/20 transition-colors min-h-[48px]">
                                All Services <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
