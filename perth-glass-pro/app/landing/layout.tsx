import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Window Cleaning Perth | Aspect Window Cleaning",
    description: "Perth's trusted residential and commercial window cleaners. Instant free quote and same-week bookings.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://aspectwindowcleaning.com.au",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
