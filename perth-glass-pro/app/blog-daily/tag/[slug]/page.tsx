import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard } from '../../components/ArticleCard';
import { Pagination } from '../../components/Pagination';
import { BLOG_BASE_PATH, SITE_URL } from '../../constants';
import { blog } from '../../lib/blog-client';
import { paginate, parsePage } from '../../pagination';
import type { BlogArticleSummary } from '../../types';

export const revalidate = 86400;

export async function generateStaticParams() {
  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    return [];
  }
  try {
    const tags = await blog.getTags();
    return (tags || []).map((tag) => ({ slug: tag.slug }));
  } catch (error) {
    console.warn('Failed to generateStaticParams for /blog-daily/tag/[slug]:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: { absolute: `Articles tagged #${slug} | Aspect Window Cleaning` },
    alternates: { canonical: `${SITE_URL}${BLOG_BASE_PATH}/tag/${slug}` },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    notFound();
  }

  let articles: BlogArticleSummary[] = [];
  try {
    articles = await blog.getArticlesByTag(slug);
  } catch (error) {
    console.warn(`Failed to fetch articles for tag "${slug}":`, error);
  }

  if (articles.length === 0) {
    notFound();
  }

  const basePath = `${BLOG_BASE_PATH}/tag/${slug}`;
  const { items, info } = paginate(articles, parsePage(page));

  return (
    <main className="min-h-screen bg-brand-snow bg-pattern-bubbles text-brand-navy pt-32 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-10">
          <Link
            href={BLOG_BASE_PATH}
            className="text-sm font-semibold text-action-gold hover:underline"
          >
            ← All daily articles
          </Link>
          <h1 className="mt-4 text-3xl font-heading font-bold tracking-tight text-brand-navy sm:text-4xl">
            #{slug}
          </h1>
          <p className="mt-2 text-brand-slate">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <Pagination basePath={basePath} info={info} />
      </div>
    </main>
  );
}
