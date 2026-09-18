import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogArticleSummary } from 'babylovegrowth-next-js-blog';
import { BLOG_BASE_PATH } from '../constants';
import { formatDate } from '../format';

export function ArticleCard({ article }: { article: BlogArticleSummary }) {
  return (
    <Link
      href={`${BLOG_BASE_PATH}/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 shadow-sm hover:shadow-xl h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {article.hero_image_url ? (
          <Image
            src={article.hero_image_url}
            alt={article.title}
            fill
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-slate/30">
            No Image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-brand-slate mb-3">
          <Calendar className="w-4 h-4 text-action-gold" />
          <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
        </div>
        <h2 className="text-xl font-heading font-bold text-brand-navy group-hover:text-action-gold transition-colors line-clamp-2 mb-3">
          {article.title}
        </h2>
        <p className="line-clamp-3 text-sm text-brand-slate mb-6 flex-grow">
          {article.excerpt || article.meta_description}
        </p>
        <span className="inline-flex items-center gap-2 text-brand-navy font-bold text-sm group-hover:translate-x-1 transition-transform">
          Read Article <ArrowRight className="w-4 h-4 text-action-gold" />
        </span>
      </div>
    </Link>
  );
}
