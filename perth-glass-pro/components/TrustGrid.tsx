"use client";

import { useState } from "react";
import { Shield, Award, Clock, Users, Star, CheckCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGmb } from "@/components/GmbProvider";
import { BUSINESS } from "@/lib/config";

export interface Review {
    id: number;
    name: string;
    reviews: string;
    rating: number;
    date: string;
    content: string;
    source?: "google" | "trustpilot";
    url?: string;
    badge?: string;
    tag?: string;
    service?: string;
    avatarColor?: string;
    avatarImage?: string;
    isLocalGuide?: boolean;
}

export const reviews: Review[] = [
    {
        id: 0,
        name: "Vicki Slate",
        reviews: "5 reviews",
        rating: 5,
        date: "22 weeks ago",
        tag: "Pre-Sale Window & Pressure Clean • Added $20,000 Value",
        service: "Windows, jams, runners, pressure washing eaves, decks & walks",
        content: "These guys did a fantastic job cleaning windows, jams, runners, pressure washing eaves, decks and side walks, removing mould from brickwork., that hadn't been done in probably 10 years. We thought the new owners would need to replace the windows so potentially this added $20,000 value to the house. On time, friendly and professional. Highly recommend them.",
        source: "google",
        avatarColor: "bg-[#7B1FA2]",
    },
    {
        id: 1,
        name: "Terri Surman",
        reviews: "10 reviews · 0 photos",
        rating: 5,
        date: "2 weeks ago",
        tag: "Great price",
        badge: "NEW",
        service: "Interior and exterior window cleaning (2-storey)",
        content: "We have a two storey home with a tonne of windows & some are extremely hard to get to because of an added alfresco area & Vergola. Aspect Window Cleaning managed to get to all these windows and do a fantastic job. The gentleman are so lovely & hard working! Very impressed with all the communication & even phone calls on the day confirming time of arrival. Fazal came & quoted beforehand & even reminded us if we had some tinted windows they might need to be aware of (& we did)! Very thorough service. Thank you 🙏",
        source: "google",
        avatarColor: "bg-[#C2410C]",
    },
    {
        id: 2,
        name: "Linda Footman",
        reviews: "Local Guide · 19 reviews · 79 photos",
        rating: 5,
        date: "1 week ago",
        tag: "Reasonable price",
        badge: "NEW",
        service: "Residential window cleaning",
        isLocalGuide: true,
        avatarImage: "/images/reviewers/linda-footman.png",
        content: "Fazal is very professional, friendly and honest. I shall definitely recommend him to family and friends",
        source: "google",
    },
    {
        id: 99,
        name: "Verified Customer",
        reviews: "Trustpilot Verified Review · 1 review",
        rating: 5,
        date: "September 2026",
        badge: "NEW",
        service: "Window cleaning service",
        content: "Fazal and his team turned up on the time and completed all cleaning as discussed to a high standard.",
        source: "trustpilot",
        url: "https://www.trustpilot.com/review/aspectwindowcleaning.com.au",
    },
    {
        id: 3,
        name: "Mick Quinlan",
        reviews: "10 reviews · 0 photos",
        rating: 5,
        date: "26 weeks ago",
        service: "2-Storey Windows (Inside & Out), 24 Solar Panels & Roof Gutters",
        avatarImage: "/images/reviewers/mick-quinlan.png",
        content: "Aspect Window Cleaning, lead by Fazal, provided a high quality clean to our house windows (inside & out), 24 solar panels & roof gutters on a 2 storey property! Fazal is courteous & professional & provided a great clean.",
        source: "google",
    },
    {
        id: 5,
        name: "Admin Ben Pitts Concrete",
        reviews: "2 reviews · 0 photos",
        rating: 5,
        date: "3 weeks ago",
        badge: "NEW",
        service: "Interior and exterior window cleaning",
        avatarImage: "/images/reviewers/ben-pitts.png",
        content: "Arrived on time and did a fantastic job. Very happy with results. Highly recommend",
        source: "google",
    },
    // Page 2 Reviews (6 more client reviews)
    {
        id: 4,
        name: "Mandy Thompson",
        reviews: "4 reviews · 0 photos",
        rating: 5,
        date: "1 week ago",
        tag: "Reasonable price",
        badge: "NEW",
        service: "Interior and exterior window cleaning",
        content: "Very efficient and prompt great communication on what needed to be done. Great work Thankyou again",
        source: "google",
        avatarColor: "bg-[#00897B]",
    },
    {
        id: 6,
        name: "Wendy Smith",
        reviews: "3 reviews · 4 photos",
        rating: 5,
        date: "a year ago",
        service: "Full residential window cleaning",
        content: "Thank you to Ahmed and Flynn for a great job doing our windows. The house is definitely brighter and clearer. I will definitely be recommending you to family and friends. We are very happy with the results and your professionalism.",
        source: "google",
        avatarColor: "bg-[#8E24AA]",
    },
    {
        id: 7,
        name: "June Bird",
        reviews: "3 reviews · 1 photo",
        rating: 5,
        date: "a month ago",
        service: "Exterior & interior window cleaning",
        content: "Guys done a beautiful job. My windows are sparkling. 2 very nice gentleman. Highly recommend.",
        source: "google",
        avatarColor: "bg-[#E53935]",
    },
    {
        id: 8,
        name: "Ross Glossop",
        reviews: "2 reviews",
        rating: 5,
        date: "2 months ago",
        service: "Multi-panel glass washing",
        content: "The Aspect team did an amazing job cleaning our many windows. Enthusiastic and thorough. Great job thankyou",
        source: "google",
        avatarColor: "bg-[#FB8C00]",
    },
    {
        id: 9,
        name: "Sabine Parker",
        reviews: "12 reviews · 2 photos",
        rating: 5,
        date: "4 months ago",
        service: "Double glazed window & sliding door cleaning",
        content: "Fazal was prompt, professional & did an amazing job on our double glazed windows and sliding door. Would highly recommend. Thank you Fazal",
        source: "google",
        avatarColor: "bg-[#43A047]",
    },
    {
        id: 10,
        name: "Tim and Mandy Lagana",
        reviews: "2 reviews · 1 photo",
        rating: 5,
        date: "a year ago",
        service: "Exterior windows and frame cleaning",
        content: "Flynn from Aspect Window Cleaning cleaned all of the exterior windows and frames on our house. He did a great job and the windows look great. The prices were very reasonable and the work done to a great standard. Thank you.",
        source: "google",
        avatarColor: "bg-[#3949AB]",
    },
];

const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
};

const getAvatarColor = (name: string) => {
    const colors = [
        "bg-[#1E88E5]", "bg-[#43A047]", "bg-[#E53935]", "bg-[#FB8C00]",
        "bg-[#8E24AA]", "bg-[#D81B60]", "bg-[#3949AB]", "bg-[#00897B]",
        "bg-[#F4511E]", "bg-[#00ACC1]"
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

/**
 * Authentic Local Guide Star Badge
 */
export function LocalGuideBadge({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <span
            className={`inline-flex items-center justify-center rounded-full bg-[#E37400] text-white shadow-xs ${className}`}
            title="Google Local Guide"
        >
            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white" aria-hidden="true">
                <path d="M12 2l2.6 7.5h7.9l-6.4 4.6 2.4 7.6-6.5-4.7-6.5 4.7 2.4-7.6-6.4-4.6h7.9z" />
            </svg>
        </span>
    );
}

/**
 * Official Google 4-Color 'G' Logo
 */
export function GoogleGLogo({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-label="Google">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

/**
 * Authentic Trustpilot & Google Visual Rating Components
 * Recreating official Trustpilot brand language: emerald green square blocks (#00b67a),
 * white 5-point stars, 3D folded logo mark, and horizontal 'Excellent' widget layout.
 */
export function TrustpilotStar({ className = "w-3 h-3" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.6 7.5h7.9l-6.4 4.6 2.4 7.6-6.5-4.7-6.5 4.7 2.4-7.6-6.4-4.6h7.9z" />
        </svg>
    );
}

export function TrustpilotLogoIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Trustpilot logo">
            {/* Primary emerald star body */}
            <path
                d="M12 1.5l2.75 8.46h8.9l-7.2 5.23 2.75 8.46-7.2-5.23-7.2 5.23 2.75-8.46-7.2-5.23h8.9z"
                fill="#00b67a"
            />
            {/* Dark green folded wedge on lower-right ray */}
            <path
                d="M12 16.92l4.45 3.23-1.7-5.23L12 16.92z"
                fill="#005128"
            />
        </svg>
    );
}

export function TrustpilotRatingBoxes({
    size = "md",
    gap = "sm",
}: {
    size?: "xs" | "sm" | "md" | "lg";
    gap?: "xs" | "sm";
}) {
    const sizeConfig = {
        xs: { box: "w-3.5 h-3.5 rounded-[1.5px]", star: "w-2.5 h-2.5" },
        sm: { box: "w-[18px] h-[18px] rounded-[2px]", star: "w-3 h-3" },
        md: { box: "w-5 h-5 rounded-[2px]", star: "w-3.5 h-3.5" },
        lg: { box: "w-6 h-6 rounded-[3px]", star: "w-4 h-4" },
    }[size];

    const gapClass = gap === "xs" ? "gap-[2px]" : "gap-[3px]";

    return (
        <div className={`inline-flex items-center ${gapClass}`} aria-label="5 out of 5 stars">
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className={`inline-flex items-center justify-center bg-[#00b67a] text-white shadow-xs shrink-0 ${sizeConfig.box}`}
                >
                    <TrustpilotStar className={`${sizeConfig.star} fill-white`} />
                </span>
            ))}
        </div>
    );
}

export function TrustpilotHorizontalWidget({ className = "" }: { className?: string }) {
    return (
        <a
            href={BUSINESS.trustpilot}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-2.5 bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-[#00b67a]/40 shadow-sm hover:shadow-md px-3.5 sm:px-4 py-2 rounded-xl transition-all duration-200 group ${className}`}
            title="View Aspect Window Cleaning reviews on Trustpilot"
        >
            <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">Excellent</span>
            <TrustpilotRatingBoxes size="sm" />
            <span className="text-xs sm:text-sm font-semibold text-slate-700">5.0 out of 5</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
                <TrustpilotLogoIcon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">
                    Trustpilot
                </span>
            </div>
        </a>
    );
}

export function GoogleRatingWidget({ className = "" }: { className?: string }) {
    const gmb = useGmb();
    return (
        <a
            href={BUSINESS.google}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-2.5 bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-blue-400/40 shadow-sm hover:shadow-md px-3.5 sm:px-4 py-2 rounded-xl transition-all duration-200 group ${className}`}
            title="View Aspect Window Cleaning reviews on Google"
        >
            <GoogleGLogo className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">Google</span>
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">{gmb.rating}★ ({gmb.reviewCount}+)</span>
        </a>
    );
}

/**
 * Modern, high-contrast, 1-line prominent Trust & Stats bar.
 */
export function TrustStatsBar() {
    const gmb = useGmb();

    const stats = [
        { value: "1.5+", label: "Years Experience", icon: Award, suffix: "+" },
        { value: "200+", label: "Happy Customers", icon: Users, suffix: "+" },
        { value: "5.0", label: "Google & Trustpilot", icon: Star, suffix: "★" },
        { value: "100%", label: "Satisfaction Rate", icon: CheckCircle, suffix: "%" },
    ];

    return (
        <section className="py-6 sm:py-8 bg-slate-50/70 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#000066] via-brand-navy to-[#0a196e] text-white shadow-2xl shadow-brand-navy/15 overflow-hidden border border-white/10">
                    {/* Subtle ambient light accents */}
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-action-gold/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

                    {/* 1-Line Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 relative z-10">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon;
                            const num = String(stat.value).replace(/[+★%]/g, '');
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="flex items-center gap-3.5 sm:gap-4 p-5 sm:p-6 lg:p-7 group hover:bg-white/[0.03] transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-action-gold/20 group-hover:border-action-gold/40 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-action-gold" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-baseline gap-0.5 font-heading leading-none">
                                            <span>{num}</span>
                                            <span className="text-action-gold text-xl sm:text-2xl font-bold">{stat.suffix}</span>
                                        </div>
                                        <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1 truncate">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Integrated Trust Badges Strip */}
                    <div className="py-3.5 px-4 sm:px-6 bg-black/20 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-slate-200 relative z-10">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-action-gold shrink-0" />
                            <span><strong className="text-white font-semibold">$20M</strong> Public Liability</span>
                        </div>
                        <span className="hidden md:inline text-white/25">•</span>
                        <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-action-gold shrink-0" />
                            <span><strong className="text-white font-semibold">Police Cleared</strong> & Vetted</span>
                        </div>
                        <span className="hidden md:inline text-white/25">•</span>
                        <a
                            href={BUSINESS.trustpilot}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition-colors group"
                        >
                            <TrustpilotLogoIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <div className="flex items-center gap-1.5">
                                <TrustpilotRatingBoxes size="xs" gap="xs" />
                                <span><strong className="text-white font-semibold">5.0 Star</strong> on Trustpilot</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Verified Customer Testimonials & Reviews Section
 * Features authentic Google Review UI styling, Trustpilot brand fidelity,
 * full text reviews (no truncation), and sleek black/white scroll arrows.
 */
export function ReviewsSection() {
    const gmb = useGmb();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const reviewsPerPage = 6;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const startIndex = currentPage * reviewsPerPage;
    const visibleReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

    return (
        <section id="reviews" className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    {/* Dual Platform Verification Widgets */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
                        <GoogleRatingWidget />
                        <TrustpilotHorizontalWidget />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4 font-heading">
                        What Our Customers Say
                    </h2>

                    <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl">
                        <div className="flex items-center gap-1.5">
                            <span className="text-xl sm:text-2xl font-extrabold text-brand-navy">5.0</span>
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
                                ))}
                            </div>
                        </div>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <span className="text-xs sm:text-sm font-medium text-slate-700">
                            {gmb.reviewCount}+ Verified Client Ratings Across Google & Trustpilot • 100% 5-Star Track Record
                        </span>
                    </div>
                </div>

                {/* Desktop Carousel Controls Strip (Clean Black & White Arrow Style) */}
                <div className="hidden md:flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                            {gmb.reviewCount}+ Verified Customer Reviews
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-[#00b67a]" />
                            All Customers Verified
                        </span>
                    </div>

                    {/* Black & White Scroll Arrow Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => (prev === 0 ? totalPages - 1 : prev - 1))}
                            className="w-9 h-9 rounded-full border-2 border-black bg-white hover:bg-black text-black hover:text-white flex items-center justify-center transition-colors shadow-xs"
                            aria-label="Previous reviews"
                            title="Previous reviews"
                        >
                            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => (prev === totalPages - 1 ? 0 : prev + 1))}
                            className="w-9 h-9 rounded-full border-2 border-black bg-black text-white hover:bg-neutral-800 flex items-center justify-center transition-colors shadow-xs"
                            aria-label="Next reviews"
                            title="Next reviews"
                        >
                            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                    </div>
                </div>

                {/* Desktop Reviews Grid (Animated Carousel) */}
                <div className="hidden md:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {visibleReviews.map((review) => {
                                const isTrustpilot = review.source === "trustpilot";
                                return (
                                    <div
                                        key={review.id}
                                        className={`rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${
                                            isTrustpilot
                                                ? "bg-gradient-to-b from-emerald-50/30 via-white to-white border-2 border-[#00b67a]/40 ring-1 ring-[#00b67a]/20"
                                                : "bg-white border border-slate-200/90 hover:border-slate-300"
                                        }`}
                                    >
                                        <div>
                                            {/* Reviewer Header - Authentic Google / Trustpilot Layout */}
                                            <div className="flex items-start gap-3 mb-3.5">
                                                {/* Profile Avatar */}
                                                {review.avatarImage ? (
                                                    <div className="relative w-11 h-11 shrink-0">
                                                        <Image
                                                            src={review.avatarImage}
                                                            alt={review.name}
                                                            width={44}
                                                            height={44}
                                                            className="w-11 h-11 rounded-full object-cover shadow-xs"
                                                        />
                                                        {review.isLocalGuide && (
                                                            <span className="absolute -bottom-1 -right-1">
                                                                <LocalGuideBadge className="w-4 h-4" />
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : isTrustpilot ? (
                                                    <div className="w-11 h-11 rounded-xl bg-[#00b67a] flex items-center justify-center text-white shadow-sm shrink-0">
                                                        {/* Crisp White Star inside Emerald Box */}
                                                        <TrustpilotStar className="w-6 h-6 fill-white" />
                                                    </div>
                                                ) : (
                                                    <div className={`w-11 h-11 rounded-full ${review.avatarColor || getAvatarColor(review.name)} flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0`}>
                                                        {getInitials(review.name)}
                                                    </div>
                                                )}

                                                {/* Reviewer Name, Link & Verified Badge */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-1.5">
                                                        <a
                                                            href={isTrustpilot ? (review.url || BUSINESS.trustpilot) : BUSINESS.google}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 text-sm sm:text-base leading-tight truncate"
                                                        >
                                                            <span className="truncate">{review.name}</span>
                                                            <ExternalLink className="w-3.5 h-3.5 text-blue-600 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                                                        </a>
                                                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#005128] border border-emerald-200/80 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                                                            <CheckCircle className="w-2.5 h-2.5 text-[#00b67a]" />
                                                            Verified
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-0.5">{review.reviews}</p>
                                                </div>
                                            </div>

                                            {/* Rating Row: 5 Stars + Date + NEW Badge */}
                                            <div className="flex items-center gap-2 mb-2.5">
                                                {isTrustpilot ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <TrustpilotRatingBoxes size="sm" />
                                                        <span className="text-xs font-bold text-[#005128] bg-emerald-100/70 px-1.5 py-0.5 rounded">
                                                            5.0 ★
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star key={star} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                                                        ))}
                                                    </div>
                                                )}
                                                <span className="text-xs text-slate-500">{review.date}</span>
                                                {review.badge && (
                                                    <span className="text-[10px] font-bold text-slate-700 border border-slate-300 px-1.5 py-0.2 rounded-[3px] uppercase tracking-wide">
                                                        {review.badge}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Google Tag (Reasonable price, Great price, etc.) */}
                                            {review.tag && (
                                                <p className="text-xs font-bold text-slate-900 mb-1.5">{review.tag}</p>
                                            )}

                                            {/* Full Review Text (No cut-offs) */}
                                            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line">
                                                &ldquo;{review.content}&rdquo;
                                            </p>

                                            {/* Google Structured Services Attribute */}
                                            {review.service && (
                                                <div className={`mt-3 pt-2.5 border-t ${isTrustpilot ? 'border-emerald-100/80' : 'border-slate-100'}`}>
                                                    <p className="text-[11px] font-bold text-slate-900">Services</p>
                                                    <p className="text-xs text-slate-600 font-medium">{review.service}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Bottom Bar */}
                                        <div className={`mt-4 pt-3 border-t ${isTrustpilot ? 'border-emerald-100/80' : 'border-slate-100'} flex items-center justify-between text-xs`}>
                                            {isTrustpilot ? (
                                                <>
                                                    <div className="flex items-center gap-1.5 font-semibold text-[#005128]">
                                                        <TrustpilotLogoIcon className="w-4 h-4 shrink-0" />
                                                        <span>Trustpilot Review</span>
                                                    </div>
                                                    <a
                                                        href={review.url || BUSINESS.trustpilot}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-semibold text-[#00b67a] hover:text-[#005128] underline decoration-dotted transition-colors"
                                                    >
                                                        Verify on Trustpilot ↗
                                                    </a>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-1.5 text-[#1a73e8] font-medium">
                                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="9 17 4 12 9 7" />
                                                            <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                                                        </svg>
                                                        <span>Reply</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                                                        <GoogleGLogo className="w-3.5 h-3.5" />
                                                        <span>Verified Google Review</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile Horizontal Swipeable Scroll (Shows All Reviews) */}
                <div className="md:hidden">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-xs font-semibold text-slate-700">
                            {gmb.reviewCount}+ Customer Reviews (Swipe to view all →)
                        </span>
                        <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            100% Verified
                        </span>
                    </div>

                    <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        <div className="flex gap-4" style={{ width: "max-content" }}>
                            {reviews.map((review) => {
                                const isTrustpilot = review.source === "trustpilot";
                                return (
                                    <div
                                        key={review.id}
                                        className={`w-[320px] sm:w-[340px] flex-shrink-0 rounded-2xl p-5 shadow-sm flex flex-col justify-between ${
                                            isTrustpilot
                                                ? "bg-gradient-to-b from-emerald-50/40 via-white to-white border-2 border-[#00b67a]/40 ring-1 ring-[#00b67a]/20"
                                                : "bg-white border border-slate-200/90"
                                        }`}
                                    >
                                        <div>
                                            <div className="flex items-start gap-3 mb-3">
                                                {review.avatarImage ? (
                                                    <div className="relative w-10 h-10 shrink-0">
                                                        <Image
                                                            src={review.avatarImage}
                                                            alt={review.name}
                                                            width={40}
                                                            height={40}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        {review.isLocalGuide && (
                                                            <span className="absolute -bottom-1 -right-1">
                                                                <LocalGuideBadge className="w-3.5 h-3.5" />
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : isTrustpilot ? (
                                                    <div className="w-10 h-10 rounded-xl bg-[#00b67a] flex items-center justify-center text-white shadow-sm shrink-0">
                                                        <TrustpilotStar className="w-5 h-5 fill-white" />
                                                    </div>
                                                ) : (
                                                    <div className={`w-10 h-10 rounded-full ${review.avatarColor || getAvatarColor(review.name)} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                                                        {getInitials(review.name)}
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-1">
                                                        <h4 className="font-semibold text-brand-navy text-sm truncate">{review.name}</h4>
                                                        <span className="bg-emerald-50 text-[#005128] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase inline-flex items-center gap-0.5 shrink-0 border border-emerald-200/70">
                                                            <CheckCircle className="w-2.5 h-2.5 text-[#00b67a]" />
                                                            Verified
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500">{review.reviews}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 mb-2">
                                                {isTrustpilot ? (
                                                    <div className="flex items-center gap-1.5">
                                                        <TrustpilotRatingBoxes size="xs" />
                                                        <span className="text-[10px] font-bold text-[#005128] bg-emerald-100/70 px-1 rounded">
                                                            5.0
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star key={star} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                                                        ))}
                                                    </div>
                                                )}
                                                <span className="text-xs text-slate-500">{review.date}</span>
                                                {review.badge && (
                                                    <span className="text-[10px] font-bold text-slate-700 border border-slate-300 px-1 py-0.2 rounded-[3px] uppercase">
                                                        {review.badge}
                                                    </span>
                                                )}
                                            </div>

                                            {review.tag && (
                                                <p className="text-xs font-bold text-slate-900 mb-1">{review.tag}</p>
                                            )}

                                            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line">
                                                &ldquo;{review.content}&rdquo;
                                            </p>

                                            {review.service && (
                                                <div className={`mt-2.5 pt-2 border-t ${isTrustpilot ? 'border-emerald-100' : 'border-slate-100'}`}>
                                                    <p className="text-[10px] font-bold text-slate-900">Services</p>
                                                    <p className="text-xs text-slate-600">{review.service}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`mt-3 pt-3 border-t ${isTrustpilot ? 'border-emerald-100' : 'border-slate-100'} flex items-center justify-between text-xs`}>
                                            {isTrustpilot ? (
                                                <>
                                                    <div className="flex items-center gap-1 font-semibold text-[#005128]">
                                                        <TrustpilotLogoIcon className="w-3.5 h-3.5" />
                                                        <span>Trustpilot</span>
                                                    </div>
                                                    <a
                                                        href={review.url || BUSINESS.trustpilot}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-semibold text-[#00b67a] hover:text-[#005128] underline decoration-dotted"
                                                    >
                                                        Verify ↗
                                                    </a>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-1 text-[#1a73e8] font-medium text-xs">
                                                        <span>↰ Reply</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                                        <GoogleGLogo className="w-3 h-3" />
                                                        <span>Google</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* View All External Links */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                    <Link
                        href={BUSINESS.google}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-brand-navy text-white px-7 py-3 rounded-full font-semibold hover:bg-brand-navy/90 transition-colors shadow-lg shadow-brand-navy/20 text-sm sm:text-base group"
                    >
                        <GoogleGLogo className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>View All on Google ({gmb.reviewCount} Reviews)</span>
                    </Link>
                    <Link
                        href={BUSINESS.trustpilot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#00b67a] hover:bg-[#009b67] text-white px-7 py-3 rounded-full font-semibold transition-all shadow-lg shadow-[#00b67a]/25 text-sm sm:text-base group"
                    >
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-white text-[#00b67a] rounded-xs shrink-0 group-hover:scale-110 transition-transform">
                            <TrustpilotStar className="w-3.5 h-3.5 fill-[#00b67a]" />
                        </span>
                        <span>View on Trustpilot</span>
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-0.5">5.0 ★</span>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}

/**
 * Backward-compatible wrapper rendering both TrustStatsBar and ReviewsSection
 */
export default function TrustGrid() {
    return (
        <>
            <TrustStatsBar />
            <ReviewsSection />
        </>
    );
}