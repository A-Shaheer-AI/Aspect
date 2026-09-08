import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pressure Washing Perth | Aspect Window Cleaning",
    description: "High-pressure cleaning for driveways, patios, and outdoor hard surfaces across Perth. Fast quotes and reliable service.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://aspectwindowcleaning.com.au/services/pressure-washing",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
