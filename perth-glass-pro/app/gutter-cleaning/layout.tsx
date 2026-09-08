import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gutter Cleaning Perth | Aspect Window Cleaning",
    description: "Professional gutter cleaning across Perth. Prevent roof leaks, water damage, and pests. Fast quotes and same-week bookings.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://aspectwindowcleaning.com.au/services/gutter-cleaning",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
