import { BlogClient } from "babylovegrowth-next-js-blog";

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
