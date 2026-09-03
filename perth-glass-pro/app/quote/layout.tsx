import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get a Free Quote",
    description: "Request a fast, free, no-obligation quote for residential or commercial window cleaning in Perth.",
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
