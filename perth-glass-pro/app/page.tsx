import Hero from "@/components/Hero";
import ClientHomeContent from "@/components/ClientHomeContent";
import { Metadata } from "next";
import { HOME_FAQS } from "@/content/home-faqs";

export const metadata: Metadata = {
    title: { absolute: "Aspect Window Cleaning Perth | Residential & Commercial" },
    description: "Perth's premier window, solar & exterior cleaning service. Pure water streak-free results, $20M insured & police-cleared technicians. Get a free quote today!",
    alternates: { canonical: "https://aspectwindowcleaning.com.au" }
};

export default function Home() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": HOME_FAQS.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Video Hero Section - Above the Fold */}
            <Hero />

            {/* Below the Fold Content */}
            <ClientHomeContent />
        </div>
    );
}
