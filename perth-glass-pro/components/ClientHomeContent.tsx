"use client";

import dynamic from "next/dynamic";

// Lazy load all below-fold components for better initial load
const ServicesGrid = dynamic(() => import("./ServicesGrid"), { ssr: false });
const PureWaterSection = dynamic(() => import("./PureWaterSection"), { ssr: false });
const ServiceFinder = dynamic(() => import("./ServiceFinder"), { ssr: false });
const TrustGrid = dynamic(() => import("./TrustGrid"), { ssr: false });
const ResultsAndReviews = dynamic(() => import("./ResultsAndReviews"), { ssr: false });
const AreasServed = dynamic(() => import("./AreasServed"), { ssr: false });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: false });

export default function ClientHomeContent() {
    return (
        <>
            {/* Services Bento Grid */}
            <ServicesGrid />

            {/* Pure Water Technology - SEO Educational Section */}
            <PureWaterSection />

            {/* Natural Language Service Finder */}
            <ServiceFinder />

            {/* Trust Badges & Stats */}
            <TrustGrid />

            {/* Results & Reviews */}
            <ResultsAndReviews />

            {/* Contact Section */}
            <ContactSection />
        </>
    );
}
