import ServicesGrid from "./ServicesGrid";
import TrustGrid from "./TrustGrid";
import ServiceFinder from "./ServiceFinder";
import ResultsAndReviews from "./ResultsAndReviews";
import ContactSection from "./ContactSection";

export default function ClientHomeContent() {
    return (
        <>
            {/* Services Bento Grid */}
            <ServicesGrid />

            {/* Trust Badges & Stats */}
            <TrustGrid />

            {/* Natural Language Service Finder */}
            <ServiceFinder />

            {/* Results & Reviews */}
            <ResultsAndReviews />

            {/* Contact Section */}
            <ContactSection />
        </>
    );
}
