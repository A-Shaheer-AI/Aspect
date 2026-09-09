"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "./QuoteModal";
import { BUSINESS } from "@/lib/config";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Updated links with full anchor paths for inner page compatibility
    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Office Cleaning", href: "/services/commercial-cleaning" },
        { name: "Commercial", href: "/commercial" },
        { name: "Areas", href: "/#areas" },
        { name: "Reviews", href: "/#reviews" },
        { name: "Pricing", href: "/pricing" },
        { name: "Blog", href: "/blog" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Contact", href: "/contact" },
    ];

    const router = usePathname();

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "navbar-glass shadow-lg py-2.5 sm:py-3" :
                    "bg-transparent py-4 sm:py-5 lg:py-6"}`}>
                <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                    <div className="flex items-center justify-between gap-4 xl:gap-8">
                        {/* Logo */}
                        <Link href="/" className="shrink-0 flex items-center">
                            <Image
                                src={isScrolled ?
                                    "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,e_trim/v1772045271/aspect-logo-removebg-preview_fvfhlo.png" :
                                    "https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,e_trim/v1772130850/white-logo_pzpxjk.png"
                                }
                                width={120}
                                height={62}
                                priority
                                sizes="(max-width: 768px) 100px, 140px"
                                alt="aspect-window-cleaning-logo"
                                className="object-contain w-auto h-11 sm:h-12 lg:h-13 xl:h-14 transition-all"
                            />
                        </Link>

                        {/* Desktop Navigation - Balanced Spacing across Full Width */}
                        <div className="hidden xl:flex items-center gap-3.5 xl:gap-4.5 2xl:gap-6 text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] whitespace-nowrap">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-medium transition-colors hover:text-action-gold py-1 ${isScrolled ? "text-brand-navy" : "text-white"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden xl:flex items-center shrink-0 gap-3.5 xl:gap-4 2xl:gap-5">
                            {/* Subtle divider before phone number */}
                            <div className={`h-5 w-px ${isScrolled ? "bg-slate-300" : "bg-white/20"} hidden xl:block`} />

                            {/* Phone Icon - Vibrant Green */}
                            <a
                                href={`tel:${BUSINESS.phoneRaw}`}
                                className="flex items-center gap-2 font-semibold text-xs xl:text-sm transition-all hover:opacity-80"
                            >
                                <Phone className="w-4 h-4 xl:w-4.5 xl:h-4.5 text-emerald-400 shrink-0" />
                                <span className={isScrolled ? "text-brand-navy" : "text-white"}>{BUSINESS.phone}</span>
                            </a>
                            <a
                                href="/pricing"
                                onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}
                                className="shimmer-btn text-brand-navy font-bold px-5 xl:px-6 py-2.5 text-xs xl:text-sm rounded-full hover:shadow-lg transition-shadow cursor-pointer inline-block whitespace-nowrap"
                            >
                                Get Fast Quote
                            </a>
                        </div>

                        {/* Mobile / Tablet Action & Menu Button */}
                        <div className="flex xl:hidden items-center gap-2 sm:gap-3">
                            <a
                                href={`tel:${BUSINESS.phoneRaw}`}
                                aria-label={`Call Aspect Window Cleaning at ${BUSINESS.phone}`}
                                className={`p-2 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold transition-colors ${
                                    isScrolled
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                                }`}
                            >
                                <Phone className="w-4 h-4 text-emerald-400" />
                                <span className="hidden sm:inline">{BUSINESS.phone}</span>
                            </a>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMobileMenuOpen}
                                className={`p-2.5 rounded-xl transition-colors ${(isScrolled || isMobileMenuOpen) ? "text-brand-navy hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="xl:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
                        >
                            <div className="px-4 py-6 space-y-2">
                                {navLinks.map((link) => {
                                    const isActive = router === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center min-h-[48px] px-4 rounded-xl font-semibold text-base transition-colors ${
                                                isActive
                                                    ? "bg-brand-navy text-white shadow-sm"
                                                    : "text-brand-navy hover:bg-slate-50 hover:text-action-gold"
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                                {/* Mobile Call Button */}
                                <div className="pt-2 border-t border-slate-100 mt-2">
                                    <a
                                        href={`tel:${BUSINESS.phoneRaw}`}
                                        className="flex items-center gap-3 text-brand-navy font-bold min-h-[48px] px-4 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        <Phone className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>Call: {BUSINESS.phone}</span>
                                    </a>
                                    <a
                                        href="/pricing"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsMobileMenuOpen(false);
                                            setIsModalOpen(true);
                                        }}
                                        className="w-full shimmer-btn text-brand-navy font-bold py-3.5 rounded-full mt-3 inline-flex items-center justify-center text-center shadow-md cursor-pointer"
                                    >
                                        Get Fast Quote
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Quote Modal */}
            <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} quoteType="general" />
        </>
    );
}
