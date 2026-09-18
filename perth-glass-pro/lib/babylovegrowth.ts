import { BlogClient, type BlogArticle, type BlogArticleSummary } from "babylovegrowth-next-js-blog";
import { blogs, type BlogPost } from "@/content/blogs";

/**
 * BabyLoveGrowth Blog Client
 * Read articles server-side with cached static rendering / ISR.
 * Note: Never expose BABYLOVEGROWTH_BLOG_API_KEY with NEXT_PUBLIC_ or call from client components.
 */
export const blogClient = new BlogClient({
  apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
  baseUrl: process.env.BABYLOVEGROWTH_BLOG_API_URL || "https://api.babylovegrowth.ai/api/integrations/v1",
  revalidate: process.env.NODE_ENV === "development" ? 10 : 86400,
});

export interface UnifiedBlogSummary {
  id: string | number;
  title: string;
  slug: string;
  date: string;
  thumbnail: string;
  excerpt: string;
  source: "local" | "babylovegrowth";
}

export type UnifiedBlogPost =
  | {
      source: "local";
      post: BlogPost;
    }
  | {
      source: "babylovegrowth";
      article: BlogArticle;
    };

/**
 * Get all blogs (local + remote) sorted by date descending.
 * Gracefully falls back to local blogs if BABYLOVEGROWTH_BLOG_API_KEY is not set or if the remote API fails.
 */
export async function getAllUnifiedBlogs(): Promise<UnifiedBlogSummary[]> {
  const localSummaries: UnifiedBlogSummary[] = blogs.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    date: b.date,
    thumbnail: b.thumbnail || "",
    excerpt: b.excerpt,
    source: "local" as const,
  }));

  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    return localSummaries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  try {
    const remoteArticles = await blogClient.getAllArticles({ publishedOnly: true });
    const localSlugs = new Set(blogs.map((b) => b.slug));

    const remoteSummaries: UnifiedBlogSummary[] = (remoteArticles || [])
      .filter((a) => !localSlugs.has(a.slug))
      .map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        date: a.created_at,
        thumbnail: a.hero_image_url || "",
        excerpt: a.excerpt || a.meta_description || "",
        source: "babylovegrowth" as const,
      }));

    return [...localSummaries, ...remoteSummaries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.warn("BabyLoveGrowth fetch failed, falling back to local posts:", error);
    return localSummaries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}

/**
 * Get a single blog post by slug (checking local first, then remote).
 */
export async function getUnifiedBlogBySlug(slug: string): Promise<UnifiedBlogPost | null> {
  const localPost = blogs.find((b) => b.slug === slug);
  if (localPost) {
    return { source: "local", post: localPost };
  }

  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    return null;
  }

  try {
    const article = await blogClient.getArticleBySlug(slug);
    if (article && article.published) {
      return { source: "babylovegrowth", article };
    }
  } catch (error) {
    console.warn(`Failed to fetch BabyLoveGrowth article for slug "${slug}":`, error);
  }

  return null;
}

/**
 * Get all slugs for static params generation.
 */
export async function getAllUnifiedBlogSlugs(): Promise<string[]> {
  const localSlugs = blogs.map((b) => b.slug);

  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) {
    return localSlugs;
  }

  try {
    const remoteArticles = await blogClient.getAllArticles({ publishedOnly: true });
    const remoteSlugs = (remoteArticles || []).map((a) => a.slug);
    return Array.from(new Set([...localSlugs, ...remoteSlugs]));
  } catch (error) {
    console.warn("Failed to fetch BabyLoveGrowth slugs, using local only:", error);
    return localSlugs;
  }
}
