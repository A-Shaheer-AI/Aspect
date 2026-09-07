import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { caseStudies } from "@/content/case-studies";

type Props = {
    suburbSlug: string;
    suburbName: string;
};

export default function CaseStudiesSection({ suburbSlug, suburbName }: Props) {
    // Find case studies that list this suburb in their nearbySuburbs array
    const relevant = caseStudies.filter((cs) =>
        cs.nearbySuburbs.includes(suburbSlug)
    );

    if (relevant.length === 0) return null;

    return (
        <section className="py-14 max-w-5xl mx-auto px-4" aria-label={`Window cleaning case studies near ${suburbName}`}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <p className="text-action-gold font-semibold text-sm uppercase tracking-wider mb-1">Real Work, Real Results</p>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy">
                        Case Studies Near {suburbName}
                    </h2>
                </div>
                <Link
                    href="/case-studies"
                    className="hidden sm:inline-flex items-center gap-1 text-sm text-action-gold font-bold hover:underline"
                    aria-label="View all window cleaning case studies"
                >
                    View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relevant.slice(0, 3).map((cs) => {
                    const dateFormatted = new Date(cs.date).toLocaleDateString("en-AU", {
                        year: "numeric",
                        month: "short",
                    });
                    return (
                        <Link
                            key={cs.slug}
                            href={`/case-studies/${cs.slug}`}
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-action-gold/40 hover:shadow-lg transition-all flex flex-col"
                            aria-label={cs.title}
                        >
                            <div className="relative w-full aspect-video bg-gray-100">
                                <Image
                                    src={cs.thumbnail}
                                    alt={`${cs.serviceType[0]} near ${suburbName} — ${cs.title}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {cs.serviceType.slice(0, 1).map((t) => (
                                        <span key={t} className="text-xs font-bold text-action-gold bg-action-gold/10 px-2 py-0.5 rounded-full">{t}</span>
                                    ))}
                                </div>
                                <h3 className="font-bold text-brand-navy text-sm leading-snug mb-3 group-hover:text-action-gold transition-colors line-clamp-2">
                                    {cs.title}
                                </h3>
                                <div className="flex gap-3 text-xs text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 text-action-gold" aria-hidden="true" />
                                        {cs.suburb}
                                    </span>
                                    {cs.jobDetails.duration && (
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-action-gold" aria-hidden="true" />
                                            {cs.jobDetails.duration}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1">{cs.excerpt}</p>
                                <div className="flex items-center gap-1 text-action-gold font-bold text-xs mt-3 group-hover:gap-2 transition-all">
                                    Read More <ArrowRight className="w-3 h-3" aria-hidden="true" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-6 text-center sm:hidden">
                <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-action-gold font-bold hover:underline">
                    View All Case Studies <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
            </div>
        </section>
    );
}
