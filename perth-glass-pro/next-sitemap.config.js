/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aspectwindowcleaning.com.au',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/auto-blogs',
          '/landing',
          '/gutter-cleaning',
          '/solar-cleaning',
          '/pressure-cleaning',
          '/booking',
        ],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/admin',
    '/auto-blogs',
    '/landing',
    '/residential',
    '/commercial',
    '/booking',
    '/gutter-cleaning',
    '/solar-cleaning',
    '/pressure-cleaning'
  ],
  transform: async (config, path) => {
    // Custom priorities
    let priority = config.priority;
    if (path === '/') priority = 1.0;
    else if (path.startsWith('/services')) priority = 0.9;
    else if (path.startsWith('/locations')) priority = 0.8;
    else if (path.startsWith('/case-studies')) priority = 0.8;
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  }
}