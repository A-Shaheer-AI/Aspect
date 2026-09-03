import Hero from "@/components/Hero";
import ClientHomeContent from "@/components/ClientHomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aspect Window Cleaning Perth | Residential & Commercial | Free Quote",
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
