import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Window Cleaning Perth | Aspect Window Cleaning",
    description: "Perth's trusted residential and commercial window cleaners. Instant free quote and same-week bookings.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://aspectwindowcleaning.com.au/landing",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <head>
                <link rel="preload" href="/landing-hero-bg.jpeg" as="image" />
            </head>
            {children}
        </>
    );
}
