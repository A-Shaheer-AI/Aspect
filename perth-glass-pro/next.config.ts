import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },

    async redirects() {
        return [
            {
                source: "/:path*",
                has: [{ type: "host", value: "www.aspectwindowcleaning.com.au" }],
                destination: "https://aspectwindowcleaning.com.au/:path*",
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
