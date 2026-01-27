"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "./QuoteModal";

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
        { name: "Services", href: "/services/window-cleaning" },
        { name: "Commercial", href: "/commercial" },
        { name: "Areas", href: "/#areas" },
        { name: "Reviews", href: "/#reviews" },
        { name: "Pricing", href: "/quote" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "navbar-glass shadow-lg py-3" : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span className={`text-2xl font-heading font-bold transition-colors ${isScrolled ? "text-brand-navy" : "text-white"}`}>
                                Aspect
                            </span>
                            <span className={`text-sm font-medium transition-colors ${isScrolled ? "text-brand-slate" : "text-brand-water"}`}>
                                Window Cleaning
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`font-medium transition-colors hover:text-action-gold ${isScrolled ? "text-brand-navy" : "text-white"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Phone Icon - Vibrant Green */}
                            <a
                                href="tel:+61400000000"
                                className="flex items-center gap-2 font-medium transition-colors hover:opacity-80"
                            >
                                <Phone className="w-5 h-5 text-green-500" />
                                <span className={isScrolled ? "text-brand-navy" : "text-white"}>04XX XXX XXX</span>
                            </a>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="shimmer-btn text-brand-navy font-bold px-6 py-2.5 rounded-full hover:shadow-lg transition-shadow"
                            >
                                Get Fast Quote
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                            className={`md:hidden p-2 ${isScrolled ? "text-brand-navy" : "text-white"}`}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-slate-100"
                        >
                            <div className="px-4 py-6 space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block text-brand-navy font-medium py-2 hover:text-action-gold"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {/* Mobile Call Button */}
                                <a
                                    href="tel:+61400000000"
                                    className="flex items-center gap-2 text-brand-navy font-medium py-2"
                                >
                                    <Phone className="w-5 h-5 text-green-500" />
                                    Call: 04XX XXX XXX
                                </a>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                    className="w-full shimmer-btn text-brand-navy font-bold py-3 rounded-full mt-4"
                                >
                                    Get Fast Quote
                                </button>
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
