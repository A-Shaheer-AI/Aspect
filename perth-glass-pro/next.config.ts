if (!process.env.NODE_OPTIONS?.includes('--max-old-space-size')) {
    process.env.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --max-old-space-size=4096`.trim();
}

import type { NextConfig } from "next";
import { withOpinlyConfig } from "@opinly/next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "**.babylovegrowth.ai",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    async redirects() {
        return [
            {
                source: "/prices",
                destination: "/pricing",
                permanent: true,
            },
            {
                source: "/quote",
                destination: "/pricing",
                permanent: true,
            },
            {
                source: "/:path*",
                has: [{ type: "host", value: "www.aspectwindowcleaning.com.au" }],
                destination: "https://aspectwindowcleaning.com.au/:path*",
                permanent: true,
            },
            {
                source: "/residential",
                destination: "/services/residential-window-cleaning",
                permanent: true,
            },
            {
                source: "/commercial",
                destination: "/services/commercial-window-cleaning",
                permanent: true,
            },
            {
                source: "/booking",
                destination: "/pricing",
                permanent: true,
            },
            {
                source: "/booking/:path*",
                destination: "/pricing",
                permanent: true,
            },
            {
                source: "/sitemap-0.xml",
                destination: "/sitemap.xml",
                permanent: true,
            }
        ]
    },

    async rewrites() {
        return [
            {
                source: "/media/:path*",
                destination: "https://res.cloudinary.com/dr8tjrszy/:path*",
            },
        ];
    },

    async headers() {
        return [
            {
                source: "/media/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, s-maxage=31536000, immutable",
                    },
                    {
                        key: "CDN-Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                    {
                        key: "Cloudflare-CDN-Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/:folder(brand|certificates|assets|gallery)/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, s-maxage=31536000, immutable",
                    },
                    {
                        key: "CDN-Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                    {
                        key: "Cloudflare-CDN-Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    }
};

export default withOpinlyConfig({
    blogPath: '/blog',
    imagesPath: '/images',
    companyName: 'Aspect Window Cleaning',
    cdnNamespace: 'ilGRqUw5shCGM2jPUvhHH',
    siteUrl: 'https://aspectwindowcleaning.com.au',
})(nextConfig);