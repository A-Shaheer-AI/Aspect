"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Quote } from "lucide-react";

export default function ResultsAndReviews() {
    const [sliderPosition, setSliderPosition] = useState(50);

    const reviews = [
        {
            name: "June Bird",
            suburb: "Perth",
            rating: 5,
            text: "Guys done a beautiful job. My windows are sparkling. Two very nice gentlemen. Highly recommend.",
            avatar: "JB",
        },
        {
            name: "Krystal Copley",
            suburb: "Perth",
            rating: 5,
            text: "Lovely people. Quick reply and came to visit to give a free quote. Good communication. Saved me time. Money well spent.",
            avatar: "KC",
        },
        {
            name: "Lynne",
            suburb: "North Perth",
            rating: 5,
            text: "Good communication, competitive price and fast, efficient and friendly service. Beautifully clean windows and screens. Thank you!",
            avatar: "LY",
        },
    ];

    return (
        <section id="reviews" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
                        See the Difference
                    </h2>
                    <p className="text-brand-slate text-lg max-w-2xl mx-auto">
                        Real window cleaning results from Perth homes. Drag the slider to compare before & after.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Before/After Slider */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-200"
                    >
                        {/* After Image (Background) */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1772800983/after-cleaning-street_lhtqux.jpg')` }}
                        />

                        {/* Before Image (Foreground, clipped) */}
                        <div
                            className="absolute inset-0 bg-cover bg-center border-r-2 border-white"
                            style={{
                                backgroundImage: `url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1772967205/street-before-cleaning_iupbdq.jpg')`,
                                clipPath: `inset(0 0 0 ${sliderPosition}%)`, // This will clip the "Before" image based on slider
                            }}
                        />

                        {/* Label Badge */}
                        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                            Before
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                            After
                        </div>

                        {/* Slider Control */}
                        <div className="absolute inset-0 flex items-center">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderPosition}
                                onChange={(e) => setSliderPosition(Number(e.target.value))}
                                className="w-full h-full opacity-0 cursor-ew-resize z-10"
                            />
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                                style={{ left: `${sliderPosition}%` }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                                    <span className="text-brand-navy text-xs font-bold">⟷</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>


                    {/* Reviews Column */}
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-action-gold/20 flex items-center justify-center text-action-gold font-bold">
                                        {review.avatar}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <p className="font-bold text-brand-navy">{review.name}</p>
                                                <p className="text-xs text-brand-slate flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {review.suburb}
                                                </p>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-action-gold fill-action-gold" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-brand-slate text-sm leading-relaxed">
                                            &ldquo;{review.text}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* CTA */}
                        <Link
                            href="https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z/data=!3m1!4b1!4m6!3m5!1s0xafbbd7c3dd591183:0xe683c8a7e7212664!8m2!3d-31.9806823!4d115.7929967!16s%2Fg%2F11x1zxrlv3?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            className="inline-flex items-center gap-2 text-brand-navy font-medium hover:text-action-gold transition-colors"
                        >
                            Read all 200+ reviews on Google
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Schema Markup for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Aspect Window Cleaning",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "200"
                        }
                    })
                }}
            />
        </section>
    );
}
