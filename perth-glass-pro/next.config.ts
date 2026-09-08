import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
        ],
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
                source: "/gutter-cleaning",
                destination: "/services/gutter-cleaning",
                permanent: true,
            },
            {
                source: "/solar-cleaning",
                destination: "/services/solar-panel-washing",
                permanent: true,
            },
            {
                source: "/pressure-cleaning",
                destination: "/services/pressure-washing",
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
            }
        ]
    }
};

export default nextConfig;