"use client";

import { Suspense } from "react";
import ResidentialEstimator from "@/components/ResidentialEstimator";

export default function QuotePage() {
    return (
        <div className="min-h-screen relative flex items-start justify-center p-4 pt-32 pb-24 bg-brand-navy">
            {/* Estimator Wizard - Widened for better layout */}
            <div className="relative z-10 w-full max-w-4xl py-6 px-4 mt-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-3">
                        Get an Instant Estimate
                    </h1>
                    <p className="text-brand-water/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Use this tool to calculate how much a potential window clean could cost. It provides a fast estimate and allows you to go ahead with a preferred booking date from our current availability. 
                        <br/><span className="text-action-gold font-semibold mt-2 block">Note: This tool is currently only available for Residential Window Cleaning.</span>
                    </p>
                </div>
                <Suspense fallback={
                    <div className="bg-white/90 p-8 rounded-2xl text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-action-gold border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-brand-navy font-bold">Loading Estimator...</p>
                    </div>
                }>
                    <ResidentialEstimator />
                </Suspense>
            </div>
        </div>
    );
}