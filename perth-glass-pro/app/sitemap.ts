import type { MetadataRoute } from 'next';
import { buildSitemapEntries } from '@opinly/shared';
import { opinlyConfig } from '@opinly/next';
import { opinly } from '@/clients/opinly';
import { blogs } from '@/content/blogs';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aspectwindowcleaning.com.au';
  const now = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services/residential-window-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/commercial-window-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/commercial-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/solar-panel-washing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/gutter-cleaning`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/services/pressure-washing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
  ];

  // Local blogs
  const localBlogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Fetch Opinly dynamic routes
  let opinlyEntries: MetadataRoute.Sitemap = [];
  if (process.env.OPINLY_API_KEY) {
    try {
      const routes = await opinly.routes();
      opinlyEntries = buildSitemapEntries(routes, opinlyConfig).map((e) => ({
        url: e.url,
        lastModified: new Date(e.lastModified),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    } catch (error) {
      console.warn('Failed to fetch Opinly routes for sitemap:', error);
    }
  }

  // Deduplicate by URL
  const seenUrls = new Set<string>();
  const combined: MetadataRoute.Sitemap = [];

  for (const entry of [...staticPages, ...localBlogEntries, ...opinlyEntries]) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      combined.push(entry);
    }
  }

  return combined;
}
