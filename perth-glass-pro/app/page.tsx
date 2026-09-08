import Hero from "@/components/Hero";
import ClientHomeContent from "@/components/ClientHomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Aspect Window Cleaning Perth | Residential & Commercial" },
    description: "Perth's premier window, solar & exterior cleaning service. Pure water streak-free results, $20M insured & police-cleared technicians. Get a free quote today!",
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
