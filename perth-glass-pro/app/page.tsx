import Hero from "@/components/Hero";
import ClientHomeContent from "@/components/ClientHomeContent";

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
