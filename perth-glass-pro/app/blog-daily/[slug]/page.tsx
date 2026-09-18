import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { ArticleJsonLd } from '../components/ArticleJsonLd';
import { TagList } from '../components/TagList';
import { BLOG_BASE_PATH, SITE_URL } from '../constants';
import { formatDate } from '../format';
import { blog } from '../lib/blog-client';
import '../blog-content.css';

export const revalidate = 86400;

export async function generateStaticParams() {
  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    return [];
  }
  try {
    const articles = await blog.getAllArticles({ publishedOnly: true });
    return (articles || []).map((article) => ({ slug: article.slug }));
  } catch (error) {
    console.warn('Failed to generateStaticParams for /blog-daily/[slug]:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    return { title: 'Article' };
  }
  try {
    const article = await blog.getArticleBySlug(slug);
    if (!article) {
      return {};
    }
    const canonical = `${SITE_URL}${BLOG_BASE_PATH}/${article.slug}`;
    return {
      title: { absolute: `${article.title} | Aspect Window Cleaning` },
      description: article.meta_description || article.excerpt,
      alternates: { canonical },
      openGraph: {
        type: 'article',
        title: article.title,
        description: article.meta_description || article.excerpt,
        url: canonical,
        images: article.hero_image_url ? [{ url: article.hero_image_url }] : undefined,
        publishedTime: article.created_at,
        modifiedTime: article.updated_at,
      },
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    notFound();
  }

  let article = null;
  try {
    article = await blog.getArticleBySlug(slug);
  } catch (error) {
    console.warn(`Failed to fetch article for slug "${slug}":`, error);
  }

  if (!article || !article.published) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aspectwindowcleaning.com.au',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Daily Blog',
        item: `${SITE_URL}${BLOG_BASE_PATH}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}${BLOG_BASE_PATH}/${article.slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen bg-white">
      <ArticleJsonLd data={article.jsonLd} />
      <ArticleJsonLd data={article.faqJsonLd} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header / Hero */}
      <div className="relative min-h-[280px] sm:min-h-[340px] h-[40vh] md:h-[50vh] bg-brand-navy">
        {article.hero_image_url ? (
          <Image
            src={article.hero_image_url}
            alt={article.title}
            fill
            unoptimized={true}
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-brand-navy opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:pb-12">
          <div className="max-w-3xl mx-auto">
            <Link
              href={BLOG_BASE_PATH}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-action-gold hover:underline mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> All Daily Articles
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 text-action-gold" />
              <time dateTime={article.created_at}>
                {formatDate(article.created_at)}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: article.content_html }}
        />

        <footer className="mt-12 border-t border-slate-200 pt-6">
          <TagList keywords={[article.seedKeyword ?? '', ...article.keywords]} />
        </footer>

        {/* Helpful Next Steps & Interlinking */}
        <div className="p-6 sm:p-8 bg-brand-snow border border-slate-200 rounded-2xl">
          <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">
            Looking for Professional Window Cleaning in Perth?
          </h3>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            Whether you need residential glass cleaned to perfection or commercial high-reach washing, our police-cleared team delivers guaranteed streak-free results across all Perth suburbs.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
            <Link href="/pricing" className="text-brand-navy hover:text-action-gold transition-colors underline underline-offset-4 decoration-action-gold">
              Pricing & Packages &rarr;
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/case-studies" className="text-brand-navy hover:text-action-gold transition-colors underline underline-offset-4 decoration-action-gold">
              View Case Studies &rarr;
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/contact" className="text-brand-navy hover:text-action-gold transition-colors underline underline-offset-4 decoration-action-gold">
              Contact Us &rarr;
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/blog" className="text-brand-navy hover:text-action-gold transition-colors underline underline-offset-4 decoration-action-gold">
              Main Cleaning Blog &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Conversion CTA */}
      <div className="relative my-8 sm:sticky sm:bottom-4 z-30 px-4 mb-4">
        <div className="max-w-3xl mx-auto bg-brand-navy text-white p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-1">Liked this article?</h3>
            <p className="text-brand-water/80 text-sm">Get the same sparkling finish for your Perth property.</p>
          </div>
          <Link
            href="/pricing"
            className="w-full sm:w-auto bg-action-gold text-brand-navy font-bold px-6 py-3.5 rounded-full hover:bg-action-gold/90 transition-colors inline-flex items-center justify-center gap-2 shadow-lg whitespace-nowrap min-h-[44px]"
          >
            View Pricing Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
