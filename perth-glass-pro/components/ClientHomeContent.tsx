import HomeQuoteForm from "./HomeQuoteForm";
import CommercialHomeSection from "./CommercialHomeSection";
import ServicesGrid from "./ServicesGrid";
import { TrustStatsBar, ReviewsSection } from "./TrustGrid";
import PricingPackages from "./PricingPackages";
import { SeeTheDifference } from "./ResultsAndReviews";
import ServiceFinder from "./ServiceFinder";
import FAQ from "./FAQ";
import { HOME_FAQS } from "@/content/home-faqs";
import ContactSection from "./ContactSection";

export default function ClientHomeContent() {
    return (
        <>
            {/* Quick Quote Form Section */}
            <section id="quote" className="pt-20 pb-16 bg-slate-50 relative border-b border-slate-100 scroll-mt-20">
                {/* Decorative background element */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#000080]/5 to-transparent pointer-events-none" />
                
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="lg:w-1/3 text-center lg:text-left">
                            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-[#000080] mb-3 leading-tight">
                                Fast Quote: Perth Window Cleaning Service
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

            {/* 1. Services Bento Grid (Residential Glass front-and-centre) */}
            <ServicesGrid />

            {/* 2. Modern 1-Line Prominent Stats & Trust Bar */}
            <TrustStatsBar />

            {/* 3. Commercial Window Cleaning Division Showcase */}
            <CommercialHomeSection />

            {/* 4. Clear & Transparent Pricing Packages */}
            <section id="pricing" className="py-16 md:py-24 bg-white border-b border-slate-100 scroll-mt-20 relative">
                <span id="packages" className="absolute -top-20 invisible pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#000080]/10 border border-[#000080]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#000080] mb-4">
                            Transparent Perth Pricing
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-brand-navy tracking-tight leading-tight mb-4">
                            Perth Window Cleaning Prices: Clear, Fixed Rates
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                            No hidden fees, no surprise callout surcharges. Choose your package below or contact us for a free written quote.
                        </p>
                    </div>
                    <PricingPackages />
                </div>
            </section>

            {/* 5. See the Difference Section (Above Reviews) */}
            <SeeTheDifference />

            {/* 6. Customer Reviews Section */}
            <ReviewsSection />

            {/* 7. Natural Language Service Finder */}
            <ServiceFinder />

            {/* 8. Frequently Asked Questions */}
            <FAQ heading="Window Cleaning Perth: Frequently Asked Questions" title="" faqs={HOME_FAQS} />

            {/* 9. Contact Section */}
            <ContactSection />
        </>
    );
}
