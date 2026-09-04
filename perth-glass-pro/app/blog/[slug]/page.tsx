import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { SITE_URL } from '../../../lib/constants';
import { blogs } from '@/content/blogs';

export async function generateStaticParams() {
    return blogs.map((item) => ({
        slug: item.slug
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogs.find(blog => blog.slug === slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Aspect Window Cleaning'],
            images: [{ url: post.thumbnail || '' }],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogs.find(blog => blog.slug === slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        image: post.thumbnail,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: 'Aspect Window Cleaning',
            url: SITE_URL,
        },
        description: post.excerpt,
    };

    return (
        <article className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Image */}
            <div className="relative h-[40vh] md:h-[50vh] bg-brand-navy">
                {post.thumbnail ? (
                    <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-60"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-brand-navy opacity-80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 pb-12">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-2 text-white/80">
                            <Calendar className="w-4 h-4 text-action-gold" />
                            <time dateTime={post.date}>
                                {format(new Date(post.date), 'MMMM d, yyyy')}
                            </time>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">

                {/* Intro */}
                {post.intro && (
                    <p className="text-lg text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.intro as string }}></p>
                )}

                {/* Sections */}
                {post.sections?.map((section, i) => (
                    <div key={i} className="space-y-4">
                        <h2 className="text-2xl font-heading font-bold text-brand-navy">
                            {section.heading}
                        </h2>

                        {"body" in section && section.body && (
                            <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.body as string }}></p>
                        )}

                        {/* Subsections (e.g. Benefits) */}
                        {"subsections" in section && section.subsections && (
                            <div className="space-y-4 mt-2">
                                {section.subsections.map((sub, j) => (
                                    <div key={j} className="pl-4 border-l-4 border-action-gold">
                                        <h3 className="text-lg font-semibold text-brand-navy mb-1">
                                            {sub.heading}
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: sub.body as string }}></p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Bullet list */}
                        {'bullets' in section && section.bullets && (
                            <ul className="space-y-2 mt-2">
                                {section.bullets.map((bullet, k) => (
                                    <li key={k} className="flex gap-2 text-slate-700">
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-action-gold flex-shrink-0" />
                                        <span>
                                            {bullet.label && (
                                                <span className="font-semibold text-brand-navy">
                                                    {bullet.label}{bullet.body ? ': ' : ''}
                                                </span>
                                            )}
                                            {bullet.body && <span dangerouslySetInnerHTML={{ __html: bullet.body as string }} />}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Note */}
                        {"note" in section && section.note && (
                            <p className="text-sm text-slate-500 italic mt-2">{section.note}</p>
                        )}
                    </div>
                ))}

                {/* Conclusion */}
                {post.conclusion && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                        <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.conclusion as string }}></p>
                    </div>
                )}
            </div>

            {/* Sticky Conversion CTA */}
            <div className="sticky bottom-4 z-40 px-4 mb-4">
                <div className="max-w-3xl mx-auto bg-brand-navy text-white p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
                    <div className="text-center sm:text-left">
                        <h3 className="font-bold text-lg mb-1">Liked this result?</h3>
                        <p className="text-brand-water/80 text-sm">Get the same sparkling finish for your home.</p>
                    </div>
                    <Link
                        href="/pricing#estimator"
                        className="bg-action-gold text-brand-navy font-bold px-6 py-3 rounded-full hover:bg-action-gold/90 transition-colors inline-flex items-center gap-2 shadow-lg whitespace-nowrap"
                    >
                        Get Free Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
