export const BLOG_BASE_PATH = '/blog-daily';

export const PAGE_SIZE = 12;

export const SITE_NAME = 'Daily Cleaning Guides & Updates | Aspect Window Cleaning';

export const REVALIDATE_SECONDS = process.env.NODE_ENV === 'development' ? 10 : 86400;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aspectwindowcleaning.com.au').replace(/\/+$/, '');

