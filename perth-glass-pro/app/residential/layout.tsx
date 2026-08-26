import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Residential Window Cleaning",
    description: "Professional residential window cleaning in Perth. Expert inside and out cleaning, frames, and tracks. Free, fast quotes available.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
