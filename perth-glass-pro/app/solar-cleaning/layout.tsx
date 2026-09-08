import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solar Panel Cleaning Perth | Aspect Window Cleaning",
    description: "Professional solar panel cleaning services across Perth. Maximise solar efficiency and power generation. Free instant quotes.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://aspectwindowcleaning.com.au/services/solar-panel-washing",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
