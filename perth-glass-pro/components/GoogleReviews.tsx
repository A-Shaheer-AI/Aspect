"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const reviewImages = [
    { src: "/gallery/review-1-new.webp", position: "object-center" },
    { src: "/gallery/review-2-new.webp", position: "object-center" },
    { src: "/gallery/review-3-new.webp", position: "object-center" },
    { src: "/gallery/after.jpg", position: "object-center" },
    { src: "/gallery/gallery-3.jpeg", position: "object-center" },
    { src: "/gallery/review-6.jpeg", position: "object-center" },
];

export interface Review {
    id: number;
    name: string;
    reviews?: string;
    rating: number;
    date: string;
    content: string;
}

interface Props {
    reviews: Review[];
}

const getInitials = (name: string) =>
    name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

const getAvatarColor = (name: string) => {
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500",
    ];
    return colors[name.charCodeAt(0) % colors.length];
};

export default function GoogleReviews({ reviews }: Props) {
    return (
        <>
            {/* Desktop Grid (RESTORED DESIGN) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.slice(0, 6).map((review, i) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition overflow-hidden flex flex-col"
                    >
                        {/* Image Header */}
                        <div className="relative w-full h-48 bg-gray-100 flex-shrink-0">
                            <Image 
                                src={reviewImages[i % reviewImages.length].src} 
                                alt="Window cleaning work" 
                                fill 
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className={`object-cover ${reviewImages[i % reviewImages.length].position}`}
                            />
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-4">
                                <div
                                className={`w-12 h-12 rounded-full ${getAvatarColor(
                                    review.name
                                )} flex items-center justify-center text-white font-bold`}
                            >
                                {getInitials(review.name)}
                            </div>

                            <div className="flex-1">
                                <h4 className="font-semibold text-brand-navy">
                                    {review.name}
                                </h4>
                                <p className="text-sm text-gray-500">{review.reviews}</p>
                                <p className="text-xs text-gray-400">{review.date}</p>
                            </div>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-0.5 mb-3">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                            {review.content}
                        </p>

                        {/* Google footer */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 mt-auto">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span className="text-xs text-gray-400">Posted on Google</span>
                                </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Scroll (RESTORED STYLE) */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                <div className="flex gap-4" style={{ width: "max-content" }}>
                    {reviews.map((review, i) => (
                        <div
                            key={review.id}
                            className="w-[320px] flex-shrink-0 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col"
                        >
                            {/* Image Header */}
                            <div className="relative w-full h-40 bg-gray-100 flex-shrink-0">
                                <Image 
                                    src={reviewImages[i % reviewImages.length].src} 
                                    alt="Window cleaning work" 
                                    fill 
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className={`object-cover ${reviewImages[i % reviewImages.length].position}`}
                                />
                            </div>
                            
                            <div className="p-5 flex-1 flex flex-col">
                                {/* Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div
                                    className={`w-10 h-10 rounded-full ${getAvatarColor(
                                        review.name
                                    )} flex items-center justify-center text-white font-bold`}
                                >
                                    {getInitials(review.name)}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-sm">{review.name}</h4>
                                    <p className="text-xs text-gray-500">{review.date}</p>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-sm text-gray-700 line-clamp-3">
                                {review.content}
                            </p>

                            <div className="mt-3 pt-3 border-t text-xs text-gray-400 mt-auto">
                                Google review
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}