"use client";

import dynamic from "next/dynamic";

// Lazy load all below-fold components for better initial load
const ServicesGrid = dynamic(() => import("./ServicesGrid"), { ssr: false });
// const PureWaterSection = dynamic(() => import("./PureWaterSection"), { ssr: false });
const ServiceFinder = dynamic(() => import("./ServiceFinder"), { ssr: false });
const TrustGrid = dynamic(() => import("./TrustGrid"), { ssr: false });
const ResultsAndReviews = dynamic(() => import("./ResultsAndReviews"), { ssr: false });
const AreasServed = dynamic(() => import("./AreasServed"), { ssr: false });
const ContactSection = dynamic(() => import("./ContactSection"), { ssr: false });

import HomeQuoteForm from "./HomeQuoteForm";

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
            {/* Services Bento Grid */}
            <ServicesGrid />

            {/* Trust Badges & Stats */}
            <TrustGrid />

            {/* Pure Water Technology - SEO Educational Section */}
            {/* <PureWaterSection /> */}

            {/* Natural Language Service Finder */}
            <ServiceFinder />

            {/* Results & Reviews */}
            <ResultsAndReviews />

            {/* Contact Section */}
            <ContactSection />
        </>
    );
}
