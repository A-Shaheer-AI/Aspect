import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Residential Window Cleaning Perth | Aspect Window Cleaning",
    description: "Professional residential window cleaning in Perth. Expert inside and out cleaning, frames, and tracks. Free, fast quotes available.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/services/residential-window-cleaning" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
