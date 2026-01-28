"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Home, Building2 } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";
import { BUSINESS } from "@/lib/config";

export default function StickyInterface() {
    const [showMobileCTA, setShowMobileCTA] = useState(false);
    const [showDesktopScroll, setShowDesktopScroll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        let lastScrollTime = 0;

        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime < 100) return;
            lastScrollTime = now;

            if (isMobile) {
                const heroButton = document.getElementById("hero-call-button");
                if (heroButton) {
                    const rect = heroButton.getBoundingClientRect();
                    setShowMobileCTA(rect.bottom < 0);
                }
            } else {
                setShowDesktopScroll(window.scrollY > 500);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile]);

    return (
        <>
            {/* Mobile: Sticky Bottom Bar with full labels */}
            {isMobile && showMobileCTA && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
                    style={{ animation: "slideUp 0.3s ease-out" }}
                >
                    <div className="flex gap-2">
                        {/* Residential - Full name */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex-1 bg-action-gold text-brand-navy font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                            <Home className="w-4 h-4" aria-hidden="true" />
                            Residential
                        </button>

                        {/* Commercial - Full name */}
                        <Link
                            href="/commercial"
                            className="flex-1 bg-brand-navy text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                            <Building2 className="w-4 h-4" aria-hidden="true" />
                            Commercial
                        </Link>
                    </div>
                </div>
            )}

            {/* Mobile: Floating green call button */}
            {isMobile && showMobileCTA && (
                <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 active:scale-95 transition-all md:hidden"
                    aria-label="Call now"
                    style={{ animation: "scaleIn 0.3s ease-out" }}
                >
                    <Phone className="w-6 h-6" aria-hidden="true" />
                </a>
            )}

            {/* Desktop: Scroll to top button */}
            {!isMobile && showDesktopScroll && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-8 right-8 z-50 hidden md:flex items-center justify-center w-12 h-12 bg-brand-navy text-white rounded-full shadow-lg hover:bg-brand-slate transition-colors"
                    aria-label="Scroll to top"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            )}

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                quoteType="residential"
            />

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </>
    );
}
