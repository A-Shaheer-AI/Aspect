import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Residential Window Cleaning Perth | Aspect Window Cleaning" },
    description: "Professional residential window cleaning in Perth. 0ppm pure water technology for single and double-storey homes. Streak-free results, fully insured.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/residential" },
};

export default function ResidentialLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
