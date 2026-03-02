import Hero from "@/components/Hero";
import ClientHomeContent from "@/components/ClientHomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BEST Window Cleaning Perth - If you're looking for Window Cleaning Service Perth or even Window Cleaning near me - Aspect Window Cleaning is the place to call",
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
