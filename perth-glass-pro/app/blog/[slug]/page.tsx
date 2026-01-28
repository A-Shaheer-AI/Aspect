import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { remark } from 'remark';
import html from 'remark-html';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/constants';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
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
            images: [
                {
                    url: post.thumbnail || '',
                },
            ],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Convert markdown to HTML
    const processedContent = await remark()
        .use(html)
        .process(post.content);
    const contentHtml = processedContent.toString();

    // JSON-LD Schema
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
                        className="object-cover opacity-60"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-brand-navy opacity-80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 pb-12">
                    <div className="max-w-3xl mx-auto">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-action-gold mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Blog
                        </Link>
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
            <div className="max-w-3xl mx-auto px-4 py-16">
                <div
                    className="prose prose-lg prose-slate hover:prose-a:text-action-gold prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-navy"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </div>

            {/* Sticky Conversion CTA */}
            <div className="sticky bottom-4 z-40 px-4 mb-4">
                <div className="max-w-3xl mx-auto bg-brand-navy text-white p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
                    <div className="text-center sm:text-left">
                        <h3 className="font-bold text-lg mb-1">Liked this result?</h3>
                        <p className="text-brand-water/80 text-sm">Get the same sparkling finish for your home.</p>
                    </div>
                    <Link
                        href="/quote"
                        className="bg-action-gold text-brand-navy font-bold px-6 py-3 rounded-full hover:bg-action-gold/90 transition-colors inline-flex items-center gap-2 shadow-lg whitespace-nowrap"
                    >
                        Get Free Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
