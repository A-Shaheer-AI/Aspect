import Hero from "@/components/Hero";
import ClientHomeContent from "@/components/ClientHomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aspect Window Cleaning Perth | Residential & Commercial | Free Quote",
    description: "Professional window cleaning in Perth — residential, commercial EWP, solar panels, gutters & pressure washing. Police cleared, $20M insured. Get a free same-week quote.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au" }
}

export default function Home() {

    return (
        <div className="min-h-screen">
            {/* Video Hero Section - Above the Fold */}
            <Hero />

            {/* Below the Fold Content (Lazy Loaded) */}
            <ClientHomeContent />
        </div>
    );
}
