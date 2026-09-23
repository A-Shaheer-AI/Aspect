import { createOpinlyClient, type OpinlyClient } from '@opinly/backend';

let clientInstance: OpinlyClient | null = null;

function getClient(): OpinlyClient {
  if (!clientInstance) {
    const apiKey = process.env.OPINLY_API_KEY;
    if (!apiKey) {
      // Safe fallback when OPINLY_API_KEY is not yet configured in env
      return {
        posts: async () => ({ data: [], has_more: false, next_cursor: null }),
        post: async () => null,
        author: async () => ({ type: 'not-found', data: null }),
        authors: async () => ({ type: 'authors', data: [] }),
        categories: async () => [],
        tags: async () => [],
        routes: async () => [],
        rss: async () => [],
        track: async () => ({ recorded: false }),
        trackPurchase: async () => ({ recorded: false }),
      };
    }
    clientInstance = createOpinlyClient({
      apiKey,
      fetch: (url, init) =>
        fetch(url, {
          ...init,
          cache: 'force-cache',
          next: { tags: ['opinly'] },
        }),
    });
  }
  return clientInstance;
}

/**
 * Opinly API Client
 * Reads OPINLY_API_KEY from process.env automatically.
 * Caches responses in the Next.js data cache with the 'opinly' tag,
 * enabling immediate revalidation when webhooks fire.
 */
export const opinly = new Proxy({} as OpinlyClient, {
  get(_target, prop: keyof OpinlyClient) {
    const client = getClient();
    return client[prop];
  },
});

