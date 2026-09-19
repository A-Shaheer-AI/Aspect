import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, ArrowRight, Tag, User } from 'lucide-react';
import { format } from 'date-fns';
import {
  generateOpinlyMetadata,
  opinlyConfig,
  OpinlyJsonLd,
  buildBlogPostingJsonLd,
  buildFaqJsonLd,
} from '@opinly/next';
import { OpinlyContent } from '@opinly/react';
import type { SeoResolved } from '@opinly/shared';
import type { FullPost, Post, CategorySummary, AuthorPage, Authors } from '@opinly/backend';

import { opinly } from '@/clients/opinly';
import { blogs, type BlogPost as LocalBlogPost } from '@/content/blogs';
import { SITE_URL } from '@/lib/constants';
import '@/app/blog-daily/blog-content.css';

export const revalidate = 3600;

const categoryPrefix = opinlyConfig.categoryPrefix ?? 'category';
const authorPrefix = opinlyConfig.authorPrefix ?? 'authors';

type BlogPageProps = {
  params: Promise<{ slug?: string[] }>;
};

type AuthorData = Extract<AuthorPage, { type: 'author' }>['data'];

type LoadedRoute =
  | { type: 'home'; data: { posts: Post[]; categories: CategorySummary[] } }
  | { type: 'post'; data: FullPost }
  | { type: 'local-post'; data: LocalBlogPost }
  | { type: 'category'; data: CategorySummary & { name: string; posts: Post[] } }
  | { type: 'author'; data: AuthorData }
  | { type: 'authors'; data: Authors['data'] }
  | { type: 'not-found' };

const loadRoute = async (slug: string[]): Promise<LoadedRoute> => {
  // 1. Blog Index Route (/blog)
  if (slug.length === 0) {
    let posts: Post[] = [];
    let categories: CategorySummary[] = [];

    if (process.env.OPINLY_API_KEY) {
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          opinly.posts({ limit: 12 }),
          opinly.categories(),
        ]);
        posts = postsRes.data;
        categories = categoriesRes;
      } catch (error) {
        console.warn('Failed to load Opinly home route data:', error);
      }
    }

    return { type: 'home', data: { posts, categories } };
  }

  // 2. Category Archive Route (/blog/category/[categorySlug])
  if (slug[0] === categoryPrefix && slug[1]) {
    if (process.env.OPINLY_API_KEY) {
      try {
        const [categories, list] = await Promise.all([
          opinly.categories(),
          opinly.posts({ category: slug[1] }),
        ]);
        const meta = categories.find((c) => c.slug === slug[1]);
        if (meta) {
          return {
            type: 'category',
            data: { ...meta, name: meta.title, posts: list.data },
          };
        }
      } catch (error) {
        console.warn(`Failed to load Opinly category "${slug[1]}":`, error);
      }
    }
    return { type: 'not-found' };
  }

  // 3. Author Archive Route (/blog/authors or /blog/authors/[authorSlug])
  if (slug[0] === authorPrefix) {
    if (process.env.OPINLY_API_KEY) {
      try {
        const authorSlug = slug[1];
        if (!authorSlug) {
          const res = await opinly.authors();
          return { type: 'authors', data: res.data };
        }
        const author = await opinly.author(authorSlug);
        if (author.type === 'author') {
          return { type: 'author', data: author.data };
        }
      } catch (error) {
        console.warn(`Failed to load Opinly author "${slug[1]}":`, error);
      }
    }
    return { type: 'not-found' };
  }

  // 4. Single Post Route (/blog/[postSlug])
  if (slug.length === 1) {
    const postSlug = slug[0];

    // Try Opinly first if API key is configured
    if (process.env.OPINLY_API_KEY) {
      try {
        const post = await opinly.post(postSlug);
        if (post) {
          return { type: 'post', data: post };
        }
      } catch (error) {
        console.warn(`Failed to fetch Opinly post for slug "${postSlug}":`, error);
      }
    }

    // Fall back to local posts to protect existing rankings & URLs
    const local = blogs.find((b) => b.slug === postSlug);
    if (local) {
      return { type: 'local-post', data: local };
    }
  }

  return { type: 'not-found' };
};

const toSeo = (route: LoadedRoute): SeoResolved => {
  if (route.type === 'post' || route.type === 'category' || route.type === 'author') {
    return { type: route.type, data: route.data as any };
  }
  return { type: route.type as any };
};

export async function generateStaticParams() {
  const localParams = blogs.map((item) => ({ slug: [item.slug] }));
  localParams.push({ slug: [] });

  if (process.env.OPINLY_API_KEY) {
    try {
      const routes = await opinly.routes();
      const opinlyParams = routes.map((route) => {
        if (route.type === 'home') return { slug: [] };
        if (route.type === 'category') return { slug: [categoryPrefix, route.slug] };
        if (route.type === 'author') return { slug: [authorPrefix, route.slug] };
        return { slug: [route.slug] };
      });
      return [...localParams, ...opinlyParams];
    } catch (e) {
      console.warn('Failed to fetch Opinly routes in generateStaticParams:', e);
    }
  }

  return localParams;
}

export const generateMetadata = async (
  props: BlogPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug } = await props.params;
  const route = await loadRoute(slug ?? []);

  if (route.type === 'local-post') {
    const post = route.data;
    return {
      title: { absolute: `${post.title} | Aspect Window Cleaning` },
      description: post.excerpt,
      alternates: { canonical: `https://aspectwindowcleaning.com.au/blog/${post.slug}` },
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

  return generateOpinlyMetadata(toSeo(route), parent);
};

export default async function BlogCatchAllPage(props: BlogPageProps) {
  const { slug } = await props.params;
  const route = await loadRoute(slug ?? []);

  switch (route.type) {
    case 'home':
      return <BlogIndexView opinlyPosts={route.data.posts} categories={route.data.categories} />;
    case 'post':
      return <OpinlyPostView post={route.data} />;
    case 'local-post':
      return <LocalPostView post={route.data} />;
    case 'category':
      return <CategoryArchiveView category={route.data} />;
    case 'author':
      return <AuthorArchiveView author={route.data} />;
    case 'authors':
      return <AuthorsDirectoryView authors={route.data} />;
    default:
      notFound();
  }
}

// -----------------------------------------------------------------------------
// VIEWS & SUBCOMPONENTS
// -----------------------------------------------------------------------------

function BlogIndexView({
  opinlyPosts,
  categories,
}: {
  opinlyPosts: Post[];
  categories: CategorySummary[];
}) {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Aspect Window Cleaning Blog',
    description: 'Expert advice on window cleaning, solar panel maintenance, and property care in Perth.',
    url: 'https://aspectwindowcleaning.com.au/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Aspect Window Cleaning',
    },
  };

  return (
    <div className="min-h-screen bg-brand-snow bg-pattern-bubbles">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Hero */}
      <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            Cleaning Tips & Property Guides
          </h1>
          <p className="text-base sm:text-xl text-brand-water/80 max-w-2xl mx-auto">
            Expert advice for keeping your Perth residential and commercial property sparkling clean.
          </p>
        </div>
      </section>

      {/* Categories Bar */}
      {categories.length > 0 && (
        <section className="py-6 px-4 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-slate mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-action-gold" /> Categories:
            </span>
            <Link
              href="/blog"
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-navy text-white hover:bg-brand-navy/90 transition-colors"
            >
              All Guides
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/${categoryPrefix}/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors whitespace-nowrap"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blogs Grid */}
      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Opinly Posts (if any) */}
          {opinlyPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6">
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {opinlyPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      {post.image?.fileKey ? (
                        <img
                          src={`/images/${post.image.fileKey}`}
                          alt={post.image.alt ?? post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-slate/30">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      {post.firstPublishedAt && (
                        <div className="flex items-center gap-2 text-sm text-brand-slate mb-3">
                          <Calendar className="w-4 h-4 text-action-gold" />
                          <span>{format(new Date(post.firstPublishedAt), 'MMMM d, yyyy')}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-action-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-brand-slate line-clamp-3 mb-6 flex-grow text-sm">
                        {post.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-brand-navy font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-4 h-4 text-action-gold" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Local Featured Perth Guides */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6">
              Perth Property Care & Cleaning Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogs.map((post) => {
                const postDate = new Date(post.date);
                const formattedDate = !isNaN(postDate.getTime())
                  ? format(postDate, 'MMMM d, yyyy')
                  : '';
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                  >
                    <div className="relative aspect-video bg-slate-100 overflow-hidden">
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          fill
                          unoptimized={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-slate/30">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      {formattedDate && (
                        <div className="flex items-center gap-2 text-sm text-brand-slate mb-3">
                          <Calendar className="w-4 h-4 text-action-gold" />
                          <span>{formattedDate}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-action-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-brand-slate line-clamp-3 mb-6 flex-grow text-sm">
                        {(post.excerpt || '').replace(/<[^>]+>/g, '')}
                      </p>
                      <span className="inline-flex items-center gap-2 text-brand-navy font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-4 h-4 text-action-gold" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation & Booking CTA */}
      <section className="bg-brand-navy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
            Ready for Professional Results on Your Property?
          </h2>
          <p className="text-brand-water/80 max-w-2xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Put these cleaning principles into practice with our police-cleared, insured Perth team.
            Check out transparent pricing or contact our team for a fast on-site quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-action-gold text-brand-navy font-bold px-8 py-3.5 rounded-full text-base hover:bg-action-gold/90 transition-all shadow-md min-h-[48px]"
            >
              View Pricing Guide
            </Link>
            <Link
              href="/case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-colors border border-white/20 min-h-[48px]"
            >
              View Case Studies
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-full text-base transition-colors border border-white/20 min-h-[48px]"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function OpinlyPostView({ post }: { post: FullPost }) {
  const contentConfig = {
    imagesPrefix: opinlyConfig.imagesPrefix,
    siteUrl: opinlyConfig.siteUrl,
    blogPrefix: opinlyConfig.blogPrefix,
    siteName: opinlyConfig.siteName,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aspectwindowcleaning.com.au' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://aspectwindowcleaning.com.au/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://aspectwindowcleaning.com.au/blog/${post.slug}` },
    ],
  };

  const headerImageKey = post.titleFile?.fileKey || post.images?.[0]?.fileKey;
  const headerImageAlt = post.titleFile?.altText ?? post.images?.[0]?.altText ?? post.title;
  const categoryLabel = (post.category as any)?.name || (post.category as any)?.title;

  const formattedDate = post.firstPublishedAt
    ? format(new Date(post.firstPublishedAt), 'MMMM d, yyyy')
    : '';

  return (
    <article className="min-h-screen bg-white">
      <OpinlyJsonLd data={buildBlogPostingJsonLd(post)} />
      {post.faqs?.length ? <OpinlyJsonLd data={buildFaqJsonLd(post.faqs)} /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Image */}
      <div className="relative min-h-[280px] sm:min-h-[340px] h-[40vh] md:h-[50vh] bg-brand-navy">
        {headerImageKey ? (
          <img
            src={`/images/${headerImageKey}`}
            alt={headerImageAlt}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-navy opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 sm:pb-12">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-action-gold hover:underline mb-3 sm:mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> All Cleaning Guides
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-xs sm:text-sm">
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-action-gold" />
                  <time dateTime={post.firstPublishedAt}>{formattedDate}</time>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-action-gold" />
                  <span>{post.author.name}</span>
                </div>
              )}
              {post.category && categoryLabel && (
                <Link
                  href={`/blog/${categoryPrefix}/${post.category.slug}`}
                  className="px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  {categoryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        <div className="blog-content">
          <OpinlyContent content={post.content} config={contentConfig} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
            {post.tags.map((tag) => (
              <span
                key={tag.slug}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-brand-navy"
              >
                #{(tag as any).name || (tag as any).title || tag.slug}
              </span>
            ))}
          </div>
        )}

        {/* Interlinking */}
        <div className="p-6 sm:p-8 bg-brand-snow border border-slate-200 rounded-2xl">
          <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">
            Looking for Professional Window Cleaning in Perth?
          </h3>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            Whether you are preparing a property for sale, dealing with stubborn bore water mineral
            etching, or scheduling regular maintenance, our team delivers guaranteed streak-free
            results across all 370+ Perth suburbs.
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
              All Cleaning Guides &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Conversion CTA */}
      <div className="relative my-8 sm:sticky sm:bottom-4 z-30 px-4 mb-4">
        <div className="max-w-3xl mx-auto bg-brand-navy text-white p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-1">Liked this article?</h3>
            <p className="text-brand-water/80 text-sm">Get the same sparkling finish for your home.</p>
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

function LocalPostView({ post }: { post: LocalBlogPost }) {
  const localJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.thumbnail ? [post.thumbnail] : [],
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aspectwindowcleaning.com.au/blog/${post.slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'Aspect Window Cleaning',
      url: SITE_URL || 'https://aspectwindowcleaning.com.au',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aspect Window Cleaning',
      url: 'https://aspectwindowcleaning.com.au',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aspectwindowcleaning.com.au/brand/white-logo.png',
      },
    },
    description: post.excerpt,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aspectwindowcleaning.com.au' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://aspectwindowcleaning.com.au/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://aspectwindowcleaning.com.au/blog/${post.slug}` },
    ],
  };

  const parsedDate = new Date(post.date);
  const formattedDate = !isNaN(parsedDate.getTime()) ? format(parsedDate, 'MMMM d, yyyy') : '';

  return (
    <article className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Image */}
      <div className="relative min-h-[280px] sm:min-h-[340px] h-[40vh] md:h-[50vh] bg-brand-navy">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
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
              href="/blog"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-action-gold hover:underline mb-3 sm:mb-4"
            >
              <ArrowLeft className="w-4 h-4" /> All Cleaning Guides
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 leading-tight">
              {post.title}
            </h1>
            {formattedDate && (
              <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                <Calendar className="w-4 h-4 text-action-gold" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
        {post.intro && (
          <p
            className="text-lg text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.intro as string }}
          />
        )}

        {post.sections?.map((section, i) => (
          <div key={i} className="space-y-4">
            <h2 className="text-2xl font-heading font-bold text-brand-navy">
              {section.heading}
            </h2>

            {'body' in section && section.body && (
              <p
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.body as string }}
              />
            )}

            {'subsections' in section && section.subsections && (
              <div className="space-y-4 mt-2">
                {section.subsections.map((sub, j) => (
                  <div key={j} className="pl-4 border-l-4 border-action-gold">
                    <h3 className="text-lg font-semibold text-brand-navy mb-1">
                      {sub.heading}
                    </h3>
                    <p
                      className="text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sub.body as string }}
                    />
                  </div>
                ))}
              </div>
            )}

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

            {'note' in section && section.note && (
              <p className="text-sm text-slate-500 italic mt-2">{section.note}</p>
            )}
          </div>
        ))}

        {post.conclusion && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <p
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.conclusion as string }}
            />
          </div>
        )}

        <div className="p-6 sm:p-8 bg-brand-snow border border-slate-200 rounded-2xl">
          <h3 className="text-lg font-heading font-bold text-brand-navy mb-2">
            Looking for Professional Window Cleaning in Perth?
          </h3>
          <p className="text-slate-600 text-sm mb-5 leading-relaxed">
            Whether you are preparing a property for sale, dealing with stubborn bore water mineral
            etching, or scheduling regular maintenance, our team delivers guaranteed streak-free
            results across all 370+ Perth suburbs.
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
              All Cleaning Guides &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className="relative my-8 sm:sticky sm:bottom-4 z-30 px-4 mb-4">
        <div className="max-w-3xl mx-auto bg-brand-navy text-white p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-1">Liked this result?</h3>
            <p className="text-brand-water/80 text-sm">Get the same sparkling finish for your home.</p>
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

function CategoryArchiveView({
  category,
}: {
  category: CategorySummary & { name: string; posts: Post[] };
}) {
  return (
    <div className="min-h-screen bg-brand-snow bg-pattern-bubbles">
      <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-action-gold hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> All Guides
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-base sm:text-xl text-brand-water/80 max-w-2xl">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {category.posts.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-slate-100 text-center">
              <p className="text-brand-slate text-lg">No articles found in this category yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {category.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    {post.image?.fileKey ? (
                      <img
                        src={`/images/${post.image.fileKey}`}
                        alt={post.image.alt ?? post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-slate/30">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {post.firstPublishedAt && (
                      <div className="flex items-center gap-2 text-sm text-brand-slate mb-3">
                        <Calendar className="w-4 h-4 text-action-gold" />
                        <span>{format(new Date(post.firstPublishedAt), 'MMMM d, yyyy')}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-action-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-brand-slate line-clamp-3 mb-6 flex-grow text-sm">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-brand-navy font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-4 h-4 text-action-gold" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function AuthorArchiveView({ author }: { author: AuthorData }) {
  const avatarKey = (author as any).avatar?.fileKey || (author as any).image?.fileKey;

  return (
    <div className="min-h-screen bg-brand-snow bg-pattern-bubbles">
      <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-action-gold hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> All Guides
          </Link>
          <div className="flex items-center gap-4">
            {avatarKey && (
              <img
                src={`/images/${avatarKey}`}
                alt={author.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-action-gold object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-1">
                {author.name}
              </h1>
              {author.bio && <p className="text-brand-water/80 max-w-xl text-sm sm:text-base">{author.bio}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {author.posts.length === 0 ? (
            <div className="p-12 bg-white rounded-2xl border border-slate-100 text-center">
              <p className="text-brand-slate text-lg">No articles written by this author yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {author.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    {post.image?.fileKey ? (
                      <img
                        src={`/images/${post.image.fileKey}`}
                        alt={post.image.alt ?? post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-slate/30">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    {post.firstPublishedAt && (
                      <div className="flex items-center gap-2 text-sm text-brand-slate mb-3">
                        <Calendar className="w-4 h-4 text-action-gold" />
                        <span>{format(new Date(post.firstPublishedAt), 'MMMM d, yyyy')}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-action-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-brand-slate line-clamp-3 mb-6 flex-grow text-sm">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-brand-navy font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-4 h-4 text-action-gold" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function AuthorsDirectoryView({ authors }: { authors: Authors['data'] }) {
  return (
    <div className="min-h-screen bg-brand-snow bg-pattern-bubbles">
      <section className="bg-brand-navy text-white pt-32 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-3">Our Authors</h1>
          <p className="text-brand-water/80 max-w-xl mx-auto text-sm sm:text-base">
            Meet the property maintenance and cleaning experts behind our guides.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {authors.map((author) => {
            const avatarKey = (author as any).avatar?.fileKey || (author as any).image?.fileKey;
            return (
              <Link
                key={author.slug}
                href={`/blog/${authorPrefix}/${author.slug}`}
                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                {avatarKey ? (
                  <img
                    src={`/images/${avatarKey}`}
                    alt={author.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-action-gold mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-brand-slate mb-4">
                    <User className="w-8 h-8" />
                  </div>
                )}
                <h2 className="text-lg font-bold text-brand-navy mb-1">{author.name}</h2>
                {author.bio && <p className="text-xs text-brand-slate line-clamp-2">{author.bio}</p>}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
