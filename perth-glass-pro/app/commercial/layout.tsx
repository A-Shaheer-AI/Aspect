import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Commercial Cleaning & Janitorial Services Perth | Aspect",
    description: "Professional commercial cleaning & office janitorial services across Perth. Workstation hygiene, restroom sanitation, floor care, strata, and high-reach glass.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/services/commercial-window-cleaning" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
