"use client";

import { Shield, Award, Clock, Users, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Review {
    id: number;
    name: string;
    reviews: string;
    rating: number;
    date: string;
    content: string;
}

const reviews: Review[] = [
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
        content: "I recently hired them for window cleaning, and I couldn't be happier with the results. The team was punctual, professional, and paid great attention to detail. Our windows are spotless—inside and out—and they even cleaned the screens and tracks. Highly recommend their service and will definitely use them again.",
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

export default function TrustGrid() {

    const stats = [
        { value: "1+", label: "Years Experience", icon: Award },
        { value: "100+", label: "Happy Customers", icon: Users },
        { value: "5.0", label: "Google Rating", icon: Star },
        { value: "100%", label: "Satisfaction Rate", icon: CheckCircle },
    ];

    const trustBadges = [
        { icon: Shield, title: "Fully Insured", description: "$20M public liability" },
        { icon: Clock, title: "Same Week Service", description: "Fast turnaround" },
        { icon: Award, title: "Police Cleared", description: "All staff vetted" },
    ];

    return (
        <section className="pt-24 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#ffe54d]/20 to-transparent blur-xl" />
                                <Icon className="w-8 h-8 text-[#ffe54d] mb-3 relative z-10" />
                                <div className="text-3xl md:text-4xl font-bold text-brand-navy relative z-10">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-brand-slate relative z-10">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Badges */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {trustBadges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={badge.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-[#ffe54d]/40 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#ffe54d]/10 flex items-center justify-center group-hover:bg-[#ffe54d]/20 transition">
                                        <Icon className="w-6 h-6 text-[#ffe54d]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-navy mb-1">
                                            {badge.title}
                                        </h3>
                                        <p className="text-sm text-brand-slate">
                                            {badge.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Google Reviews Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google Reviews
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
                            What Our Customers Say
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-2xl font-bold text-brand-navy">5.0</span>
                            <span className="text-gray-500"> 30+ reviews</span>
                        </div>
                    </div>

                    {/* Desktop Grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.slice(0, 6).map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(review.name)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                                        {getInitials(review.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-brand-navy truncate">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.reviews}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>

                                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                                    {review.content}
                                </p>

                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-xs text-gray-400">Posted on Google</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Horizontal Scroll */}
                    <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        <div className="flex gap-4" style={{ width: 'max-content' }}>
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="w-[320px] flex-shrink-0 bg-white rounded-2xl p-5 shadow-lg shadow-gray-200/50 border border-slate-100"
                                >
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.name)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                            {getInitials(review.name)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-brand-navy text-sm truncate">{review.name}</h4>
                                            <p className="text-xs text-gray-500">{review.reviews}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500">{review.date}</span>
                                    </div>

                                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                                        {review.content}
                                    </p>

                                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span className="text-xs text-gray-400">Google</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-10">
                        <Link
                            href="https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z/data=!4m8!3m7!1s0xafbbd7c3dd591183:0xe683c8a7e7212664!8m2!3d-31.9806823!4d115.7929967!9m1!1b1!16s%2Fg%2F11x1zxrlv3?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-brand-navy text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-navy/90 transition-colors shadow-lg shadow-brand-navy/20"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            View All Reviews on Google
                        </Link>
                    </div>
                </motion.div>

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