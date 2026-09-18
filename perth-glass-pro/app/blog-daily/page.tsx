import type { Metadata } from 'next';
import { ArticleCard } from './components/ArticleCard';
import { Pagination } from './components/Pagination';
import { BLOG_BASE_PATH, SITE_NAME, SITE_URL } from './constants';
import { blog } from './lib/blog-client';
import { paginate, parsePage } from './pagination';
import type { BlogArticleSummary } from './types';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: 'Daily Perth property care tips, window cleaning insights, and updates from Aspect Window Cleaning.',
  alternates: { canonical: `${SITE_URL}${BLOG_BASE_PATH}` },
};

export default async function BlogDailyIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  let articles: BlogArticleSummary[] = [];

  if (process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    try {
      articles = await blog.getAllArticles({ publishedOnly: true });
    } catch (error) {
      console.warn('Failed to fetch articles for /blog-daily:', error);
      articles = [];
    }
  }

  const { items, info } = paginate(articles, parsePage(page));

  return (
    <main className="min-h-screen bg-brand-snow bg-pattern-bubbles text-brand-navy pt-32 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-heading font-bold tracking-tight text-brand-navy sm:text-4xl">
            Daily Cleaning Guides & Updates
          </h1>
          <p className="mt-3 text-lg text-brand-slate">
            Fresh window care tips, expert guides, and Perth property maintenance insights.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-medium text-brand-slate">
              No daily articles published yet. Check back soon!
            </p>
            <p className="mt-2 text-sm text-slate-400">
              In the meantime, explore our full library of guides on our{' '}
              <a href="/blog" className="text-action-gold underline font-semibold">
                main cleaning blog
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <Pagination basePath={BLOG_BASE_PATH} info={info} />
      </div>
    </main>
  );
}
