import HomeQuoteForm from "./HomeQuoteForm";
import ServicesGrid from "./ServicesGrid";
import { TrustStatsBar, ReviewsSection } from "./TrustGrid";
import { SeeTheDifference } from "./ResultsAndReviews";
import ServiceFinder from "./ServiceFinder";
import FAQ from "./FAQ";
import { HOME_FAQS } from "@/content/home-faqs";
import ContactSection from "./ContactSection";

export default function ClientHomeContent() {
    return (
        <>
            {/* Quick Quote Form Section */}
            <section className="pt-20 pb-16 bg-slate-50 relative border-b border-slate-100">
                {/* Decorative background element */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#000080]/5 to-transparent pointer-events-none" />
                
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="lg:w-1/3 text-center lg:text-left">
                            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-[#000080] mb-3 leading-tight">
                                Free Custom Quote within 1 Hour
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Fill out the form and our team will get back to you with a competitive quote in no time.
                            </p>
                        </div>
                        <div className="lg:w-2/3 w-full">
                            <HomeQuoteForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* 1. Services Bento Grid */}
            <ServicesGrid />

            {/* 2. Modern 1-Line Prominent Stats & Trust Bar */}
            <TrustStatsBar />

            {/* 3. See the Difference Section (Above Reviews) */}
            <SeeTheDifference />

            {/* 4. Customer Reviews Section */}
            <ReviewsSection />

            {/* 5. Natural Language Service Finder */}
            <ServiceFinder />

            {/* 6. Frequently Asked Questions */}
            <FAQ title="" faqs={HOME_FAQS} />

            {/* 7. Contact Section */}
            <ContactSection />
        </>
    );
}
