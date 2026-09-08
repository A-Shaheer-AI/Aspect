import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, MapPin, Users, CheckCircle, Phone } from "lucide-react";
import { caseStudies } from "@/content/case-studies";
import { BUSINESS } from "@/lib/config";

export async function generateStaticParams() {
    return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const cs = caseStudies.find((c) => c.slug === slug);
    if (!cs) return {};

    const dateFormatted = new Date(cs.date).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return {
        title: { absolute: `${cs.title} | Aspect Window Cleaning` },
        description: cs.excerpt,
        openGraph: {
            title: cs.title,
            description: cs.excerpt,
            images: [{ url: cs.thumbnail, width: 1200, height: 630, alt: cs.title }],
            type: "article",
            publishedTime: cs.date,
        },
        alternates: {
            canonical: `https://aspectwindowcleaning.com.au/case-studies/${cs.slug}`,
        },
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const cs = caseStudies.find((c) => c.slug === slug);
    if (!cs) notFound();

    const dateFormatted = new Date(cs.date).toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // JSON-LD Schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": cs.title,
        "description": cs.excerpt,
        "datePublished": cs.date,
        "dateModified": cs.date,
        "author": {
            "@type": "Organization",
            "name": "Aspect Window Cleaning",
            "url": "https://aspectwindowcleaning.com.au",
        },
        "publisher": {
            "@type": "Organization",
            "name": "Aspect Window Cleaning",
            "url": "https://aspectwindowcleaning.com.au",
            "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dr8tjrszy/image/upload/v1772130850/white-logo_pzpxjk.png"
            }
        },
        "image": {
            "@type": "ImageObject",
            "url": cs.thumbnail,
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://aspectwindowcleaning.com.au/case-studies/${cs.slug}`,
        },
        "about": {
            "@type": "Service",
            "name": cs.serviceType.join(", "),
            "provider": {
                "@type": "LocalBusiness",
                "name": "Aspect Window Cleaning",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Perth",
                    "addressRegion": "WA",
                    "addressCountry": "AU",
                }
            }
        }
    };

    // Related case studies (exclude current)
    const relatedStudies = caseStudies.filter((c) => c.slug !== cs.slug).slice(0, 3);

    
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
                "name": "Case Studies",
                "item": "https://aspectwindowcleaning.com.au/case-studies"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": cs.title,
                "item": `https://aspectwindowcleaning.com.au/case-studies/${slug}`
            }
        ]
    };

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <div className="min-h-screen bg-brand-snow">

                {/* Breadcrumb */}
                <header className="bg-brand-navy text-white pt-28 sm:pt-32 md:pt-36 pb-16">
                    <div className="max-w-4xl mx-auto px-4">
                        {/* Breadcrumb Navigation */}
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 flex-wrap">
                                <li><Link href="/" className="hover:text-action-gold transition-colors">Home</Link></li>
                                <li><ArrowRight className="w-3 h-3 text-action-gold/70" aria-hidden="true" /></li>
                                <li><Link href="/case-studies" className="hover:text-action-gold transition-colors">Case Studies</Link></li>
                                <li><ArrowRight className="w-3 h-3 text-action-gold/70" aria-hidden="true" /></li>
                                <li className="text-white/90 font-medium truncate max-w-xs">{cs.title}</li>
                            </ol>
                        </nav>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {cs.serviceType.map((tag) => (
                                <span key={tag} className="text-xs font-bold bg-action-gold text-brand-navy px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-6">
                            {cs.title}
                        </h1>
                        <p className="text-lg text-brand-water/80 max-w-3xl mb-8 leading-relaxed">{cs.excerpt}</p>
                        <div className="flex flex-wrap gap-6 text-sm text-brand-water/70">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                <time dateTime={cs.date}>{dateFormatted}</time>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                <span>{cs.suburb}, Perth WA</span>
                            </div>
                            {cs.jobDetails.crew && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                    <span>{cs.jobDetails.crew}</span>
                                </div>
                            )}
                            {cs.jobDetails.duration && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                    <span>{cs.jobDetails.duration}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main content + sidebar */}
                <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-[1fr_320px] gap-10">

                    {/* Main content */}
                    <article>

                        {/* Hero Image */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-10 bg-gray-200">
                            <Image
                                src={cs.thumbnail}
                                alt={`${cs.serviceType[0]} in ${cs.suburb} — ${cs.title}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 720px"
                                priority
                            />
                        </div>

                        {/* Challenge / Solution / Result summary boxes */}
                        <div className="grid md:grid-cols-3 gap-4 mb-10">
                            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                                <h2 className="font-bold text-red-700 text-sm uppercase tracking-wider mb-2">The Challenge</h2>
                                <p className="text-gray-700 text-sm leading-relaxed">{cs.challenge}</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                                <h2 className="font-bold text-blue-700 text-sm uppercase tracking-wider mb-2">Our Approach</h2>
                                <p className="text-gray-700 text-sm leading-relaxed">{cs.solution}</p>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                                <h2 className="font-bold text-green-700 text-sm uppercase tracking-wider mb-2">The Result</h2>
                                <p className="text-gray-700 text-sm leading-relaxed">{cs.result}</p>
                            </div>
                        </div>

                        {/* Full article sections */}
                        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-brand-navy prose-a:text-action-gold prose-a:no-underline hover:prose-a:underline">
                            {cs.sections.map((section, i) => (
                                <section key={i} className="mb-10">
                                    <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">{section.heading}</h2>
                                    <p className="text-gray-700 leading-relaxed">{section.body}</p>
                                </section>
                            ))}
                        </div>

                        {/* Project Gallery */}
                        {cs.images && cs.images.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6">Project Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {cs.images.map((img, idx) => (
                                        <div key={idx} className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image
                                                src={img}
                                                alt={`${cs.title} - Gallery Image ${idx + 1}`}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Google Posts Links */}
                        {cs.googlePosts && cs.googlePosts.length > 0 && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                                <h3 className="text-lg font-bold text-brand-navy mb-3">View More on Google Updates</h3>
                                <p className="text-sm text-gray-600 mb-4">Check out our official Google Business Profile updates for more photos and behind-the-scenes details of this job.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {cs.googlePosts.map((link, index) => (
                                        <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-brand-navy font-semibold px-4 py-2.5 rounded-lg hover:border-action-gold hover:text-action-gold transition-colors text-sm shadow-sm">
                                            Google Update {index + 1} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags / backlink section */}
                        <div className="border-t border-gray-200 pt-8 mt-8">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Related Services</h3>
                            <div className="flex flex-wrap gap-3">
                                {cs.serviceType.includes("Residential Window Cleaning") && (
                                    <Link href="/services/residential-window-cleaning" className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-brand-navy hover:border-action-gold hover:text-action-gold transition-colors">
                                        Residential Window Cleaning <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                    </Link>
                                )}
                                {cs.serviceType.includes("Pre-Sale Cleaning") && (
                                    <Link href="/pricing" className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-brand-navy hover:border-action-gold hover:text-action-gold transition-colors">
                                        View Our Pricing <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                    </Link>
                                )}
                                {cs.nearbySuburbs.length > 0 && (
                                    <Link href={`/locations/${cs.nearbySuburbs[0]}`} className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-brand-navy hover:border-action-gold hover:text-action-gold transition-colors">
                                        Window Cleaning {cs.suburb} <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                    </Link>
                                )}
                                <Link href="/case-studies" className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-brand-navy hover:border-action-gold hover:text-action-gold transition-colors">
                                    All Case Studies <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside>
                        <div className="sticky top-24 space-y-6">

                            {/* Job Details Card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h2 className="font-heading font-bold text-brand-navy text-lg mb-4">Job at a Glance</h2>
                                <dl className="space-y-3 text-sm">
                                    {cs.jobDetails.property && (
                                        <div>
                                            <dt className="text-gray-500 font-medium">Property</dt>
                                            <dd className="text-brand-navy font-semibold">{cs.jobDetails.property}</dd>
                                        </div>
                                    )}
                                    {cs.jobDetails.crew && (
                                        <div>
                                            <dt className="text-gray-500 font-medium">Crew</dt>
                                            <dd className="text-brand-navy font-semibold">{cs.jobDetails.crew}</dd>
                                        </div>
                                    )}
                                    {cs.jobDetails.duration && (
                                        <div>
                                            <dt className="text-gray-500 font-medium">Duration</dt>
                                            <dd className="text-brand-navy font-semibold">{cs.jobDetails.duration}</dd>
                                        </div>
                                    )}
                                    {cs.jobDetails.services && cs.jobDetails.services.length > 0 && (
                                        <div>
                                            <dt className="text-gray-500 font-medium mb-2">Services Performed</dt>
                                            <dd>
                                                <ul className="space-y-1">
                                                    {cs.jobDetails.services.map((svc) => (
                                                        <li key={svc} className="flex items-start gap-2 text-brand-navy">
                                                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                                                            {svc}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-brand-navy text-white rounded-2xl p-6">
                                <h2 className="font-heading font-bold text-xl mb-2">Need a Similar Clean?</h2>
                                <p className="text-brand-water/80 text-sm mb-5 leading-relaxed">
                                    Whether you're preparing for sale, a home open, or just want your property looking its best — our team is ready to help across Perth.
                                </p>
                                <a
                                    href={`tel:${BUSINESS.phoneRaw}`}
                                    className="flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold py-3 px-5 rounded-xl hover:bg-action-gold/90 transition-colors w-full"
                                    aria-label="Call Aspect Window Cleaning for a free quote"
                                >
                                    <Phone className="w-4 h-4" aria-hidden="true" />
                                    {BUSINESS.phone}
                                </a>
                                <Link
                                    href="/pricing"
                                    className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-bold py-3 px-5 rounded-xl hover:bg-white/20 transition-colors w-full mt-3 text-sm"
                                >
                                    View Pricing Guide <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            </div>

                            {/* Nearby Suburbs */}
                            {cs.nearbySuburbs.length > 0 && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h2 className="font-heading font-bold text-brand-navy text-base mb-4">We Also Service Nearby</h2>
                                    <ul className="space-y-2">
                                        {cs.nearbySuburbs.slice(0, 8).map((s) => (
                                            <li key={s}>
                                                <Link
                                                    href={`/locations/${s}`}
                                                    className="flex items-center gap-2 text-sm text-brand-slate hover:text-action-gold transition-colors"
                                                    aria-label={`Window cleaning in ${s.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}`}
                                                >
                                                    <ArrowRight className="w-3 h-3 text-action-gold shrink-0" aria-hidden="true" />
                                                    Window Cleaning {s.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                {/* Related Case Studies */}
                {relatedStudies.length > 0 && (
                    <section className="bg-white border-t border-gray-100 py-16 px-4" aria-label="Related case studies">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl font-heading font-bold text-brand-navy mb-8">More Case Studies</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedStudies.map((rel) => (
                                    <Link key={rel.slug} href={`/case-studies/${rel.slug}`} className="group block bg-brand-snow rounded-xl overflow-hidden border border-gray-100 hover:border-action-gold/40 hover:shadow-md transition-all">
                                        <div className="relative w-full aspect-video bg-gray-200">
                                            <Image src={rel.thumbnail} alt={rel.title} fill className="object-cover" sizes="360px" />
                                        </div>
                                        <div className="p-5">
                                            <div className="text-xs font-bold text-action-gold uppercase tracking-wider mb-2">{rel.suburb}</div>
                                            <h3 className="font-bold text-brand-navy text-base leading-snug group-hover:text-action-gold transition-colors line-clamp-2">{rel.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <section className="bg-brand-navy text-white py-16 px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Ready to Get Your Property Looking Its Best?</h2>
                        <p className="text-brand-water/80 mb-8 max-w-xl mx-auto">
                            From single-storey homes to multi-storey commercial buildings, we deliver professional window cleaning across Perth. Tight deadlines are our speciality.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href={`tel:${BUSINESS.phoneRaw}`}
                                className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90 transition-colors"
                                aria-label="Call Aspect Window Cleaning"
                            >
                                <Phone className="w-5 h-5" aria-hidden="true" />
                                {BUSINESS.phone}
                            </a>
                            <Link href="/case-studies" className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/20 transition-colors">
                                View All Case Studies <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
