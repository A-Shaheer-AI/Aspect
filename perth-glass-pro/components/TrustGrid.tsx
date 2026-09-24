"use client";

import { Shield, Award, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useGmb } from "@/components/GmbProvider";
import { BUSINESS } from "@/lib/config";

interface Review {
    id: number;
    name: string;
    reviews: string;
    rating: number;
    date: string;
    content: string;
    source?: "google" | "trustpilot";
    url?: string;
}

const reviews: Review[] = [
    {
        id: 0,
        name: "Verified Customer",
        reviews: "Trustpilot Verified Review",
        rating: 5,
        date: "September 2026",
        content: "Fazal and his team turned up on the time and completed all cleaning as discussed to a high standard.",
        source: "trustpilot",
        url: "https://www.trustpilot.com/review/aspectwindowcleaning.com.au",
    },
    {
        id: 1,
        name: "Hussai",
        reviews: "2 reviews",
        rating: 5,
        date: "3 months ago",
        content: "Great work! I recently called them for cleaning the windows at my home. The team arrived on time, were friendly and professional, and took care to protect the surrounding areas while they worked. Many of the windows came out spotless and clear, and I appreciate that they took their time with the job rather than rushing through it.",
    },
    {
        id: 2,
        name: "June Bird",
        reviews: "3 reviews · 1 photo",
        rating: 5,
        date: "a month ago",
        content: "Guys done a beautiful job. My windows are sparkling. 2 very nice gentleman. Highly recommend.",
    },
    {
        id: 3,
        name: "Taylor Bow",
        reviews: "5 reviews",
        rating: 5,
        date: "2 months ago",
        content: "Aspect window cleaning did a great job cleaning the inside and outside of the windows at my North Perth property. I would definitely recommend them. Good service, good communication and professional service.",
    },
    {
        id: 4,
        name: "Shabnam",
        reviews: "1 review",
        rating: 5,
        date: "8 months ago",
        content: "I recently hired them for window cleaning, and I couldn't be happier with the results. The team was punctual, professional, and paid great attention to detail. Our windows are spotless-inside and out-and they even cleaned the screens and tracks. Highly recommend their service and will definitely use them again.",
    },
    {
        id: 5,
        name: "Ross Glossop",
        reviews: "2 reviews",
        rating: 5,
        date: "2 months ago",
        content: "The Aspect team did an amazing job cleaning our many windows. Enthusiastic and thorough. Great job thankyou",
    },
    {
        id: 6,
        name: "Sabine Parker",
        reviews: "12 reviews · 2 photos",
        rating: 5,
        date: "4 months ago",
        content: "Fazal was prompt, professional & did an amazing job on our double glazed windows and sliding door. Would highly recommend. Thank you Fazal",
    },
    {
        id: 7,
        name: "Krystal Copley",
        reviews: "5 reviews · 1 photo",
        rating: 5,
        date: "2 months ago",
        content: "Lovely people. Quick reply. Came to visit to give a free quote. Good communication. Saved me time. Money well spent",
    },
    {
        id: 8,
        name: "lynne",
        reviews: "2 reviews",
        rating: 5,
        date: "2 months ago",
        content: "Good communication, competitive price and fast, efficient and friendly service. Beautifully clean windows and screens. Thank you!",
    },
    {
        id: 9,
        name: "Lynne Dale",
        reviews: "1 review",
        rating: 5,
        date: "5 months ago",
        content: "Ahmed cleaned my windows and security doors today. He was respectful, courteous and I was very happy with the result of his hard work",
    },
    {
        id: 10,
        name: "Wendy Smith",
        reviews: "3 reviews · 4 photos",
        rating: 5,
        date: "a year ago",
        content: "Thank you to Ahmed and Flynn for a great job doing our windows. The house is definitely brighter and clearer. I will definitely be recommending you to family and friends. We are very happy with the results and your professionalism.",
    },
    {
        id: 11,
        name: "Tim and Mandy Lagana",
        reviews: "2 reviews · 1 photo",
        rating: 5,
        date: "a year ago",
        content: "Flynn from Aspect Window Cleaning cleaned all of the exterior windows and frames on our house. He did a great job and the windows look great. The prices were very reasonable and the work done to a great standard. Thank you.",
    },
    {
        id: 12,
        name: "Iqra Iqra",
        reviews: "7 reviews",
        rating: 5,
        date: "8 months ago",
        content: "Fantastic service! The team was punctual, professional, and left my windows spotless. I'll Highly recommend & definitely book them again!",
    },
];

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getAvatarColor = (name: string) => {
    const colors = [
        "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
        "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500",
        "bg-orange-500", "bg-cyan-500"
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

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
            <svg className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
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
 * Replaces the multi-row excessive white space grid with a sleek, cohesive banner.
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
 * Verified Customer Testimonials & Google Reviews Section
 */
export function ReviewsSection() {
    const gmb = useGmb();

    return (
        <section id="reviews" className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    {/* Dual Platform Verification Widgets matching official Trustpilot and Google branding */}
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
                                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                        </div>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <span className="text-xs sm:text-sm font-medium text-slate-600">
                            100% 5-Star Track Record Across Google & Trustpilot
                        </span>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.slice(0, 6).map((review, index) => {
                        const isTrustpilot = review.source === "trustpilot";
                        return (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`rounded-2xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                                    isTrustpilot
                                        ? "bg-gradient-to-b from-emerald-50/40 via-white to-white border-2 border-[#00b67a]/40 ring-1 ring-[#00b67a]/20"
                                        : "bg-white border border-slate-100"
                                }`}
                            >
                                <div>
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className={`w-12 h-12 rounded-xl ${isTrustpilot ? 'bg-[#00b67a]' : getAvatarColor(review.name)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm`}>
                                            {isTrustpilot ? <TrustpilotLogoIcon className="w-7 h-7" /> : getInitials(review.name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-brand-navy truncate">{review.name}</h4>
                                                {isTrustpilot && (
                                                    <span className="inline-flex items-center gap-1 bg-[#00b67a]/15 text-[#005128] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        <CheckCircle className="w-3 h-3 text-[#00b67a]" />
                                                        Verified Customer
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">{review.reviews}</p>
                                        </div>
                                    </div>

                                    {/* Star Rating & Date */}
                                    <div className="flex items-center gap-3 mb-3">
                                        {isTrustpilot ? (
                                            <div className="flex items-center gap-2">
                                                <TrustpilotRatingBoxes size="sm" />
                                                <span className="text-xs font-bold text-[#005128] bg-emerald-100/70 px-1.5 py-0.5 rounded">
                                                    5.0 ★
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        )}
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>

                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                                        &ldquo;{review.content}&rdquo;
                                    </p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    {isTrustpilot ? (
                                        <>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#005128]">
                                                <TrustpilotLogoIcon className="w-4 h-4 shrink-0" />
                                                <span>Trustpilot Verified Review</span>
                                            </div>
                                            <a
                                                href={review.url || BUSINESS.trustpilot}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-semibold text-[#00b67a] hover:text-[#005128] transition-colors underline decoration-dotted inline-flex items-center gap-0.5"
                                            >
                                                Verify on Trustpilot ↗
                                            </a>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="text-xs text-gray-400">Posted on Google</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile Horizontal Scroll */}
                <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                    <div className="flex gap-4" style={{ width: 'max-content' }}>
                        {reviews.map((review) => {
                            const isTrustpilot = review.source === "trustpilot";
                            return (
                                <div
                                    key={review.id}
                                    className={`w-[320px] flex-shrink-0 rounded-2xl p-5 shadow-lg shadow-gray-200/50 flex flex-col justify-between ${
                                        isTrustpilot
                                            ? "bg-gradient-to-b from-emerald-50/40 via-white to-white border-2 border-[#00b67a]/40 ring-1 ring-[#00b67a]/20"
                                            : "bg-white border border-slate-100"
                                    }`}
                                >
                                    <div>
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className={`w-10 h-10 rounded-xl ${isTrustpilot ? 'bg-[#00b67a]' : getAvatarColor(review.name)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}>
                                                {isTrustpilot ? <TrustpilotLogoIcon className="w-5 h-5" /> : getInitials(review.name)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="font-semibold text-brand-navy text-sm truncate">{review.name}</h4>
                                                    {isTrustpilot && (
                                                        <span className="bg-[#00b67a]/15 text-[#005128] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase inline-flex items-center gap-0.5">
                                                            <CheckCircle className="w-2.5 h-2.5 text-[#00b67a]" />
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500">{review.reviews}</p>
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
                                                        <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                                    ))}
                                                </div>
                                            )}
                                            <span className="text-xs text-gray-500">{review.date}</span>
                                        </div>

                                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                                            &ldquo;{review.content}&rdquo;
                                        </p>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                                        {isTrustpilot ? (
                                            <>
                                                <div className="flex items-center gap-1 text-xs font-semibold text-[#005128]">
                                                    <TrustpilotLogoIcon className="w-3.5 h-3.5" />
                                                    <span>Trustpilot</span>
                                                </div>
                                                <a
                                                    href={review.url || BUSINESS.trustpilot}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-semibold text-[#00b67a] hover:text-[#005128] underline decoration-dotted"
                                                >
                                                    Verify ↗
                                                </a>
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                </svg>
                                                <span className="text-xs text-gray-400">Google</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* View All Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                    <Link
                        href={BUSINESS.google}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-brand-navy text-white px-7 py-3 rounded-full font-semibold hover:bg-brand-navy/90 transition-colors shadow-lg shadow-brand-navy/20 text-sm sm:text-base group"
                    >
                        <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>View All on Google</span>
                    </Link>
                    <Link
                        href={BUSINESS.trustpilot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#00b67a] hover:bg-[#009b67] text-white px-7 py-3 rounded-full font-semibold transition-all shadow-lg shadow-[#00b67a]/25 text-sm sm:text-base group"
                    >
                        <TrustpilotLogoIcon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
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