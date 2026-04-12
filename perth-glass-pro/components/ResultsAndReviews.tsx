import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Quote } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import FAQ from "./FAQ";

export default function ResultsAndReviews() {

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

    const Faqs: { question: string; answer: string }[] = [
        {
            "question": "Why do windows get spots after cleaning?",
            "answer": "Windows get spots because tap water contains minerals like calcium, magnesium, and silica. When the water evaporates, these minerals stay behind and create visible stains and streaks."
        },
        {
            "question": "What is pure water window cleaning?",
            "answer": "Pure water window cleaning uses a filtration system that removes up to 99.9% of impurities, resulting in 0 ppm (parts per million) water that dries completely clean without leaving any residue."
        },
        {
            "question": "How is pure water better than tap water for cleaning?",
            "answer": "Tap water leaves mineral deposits and streaks, while pure water evaporates 100% clean, leaving no spots, residue, or haze on the glass surface."
        },
        {
            "question": "What does 0 ppm mean in water cleaning?",
            "answer": "0 ppm means the water has no dissolved solids or minerals, which ensures a spotless and streak-free finish when it dries."
        },
        {
            "question": "How long do the results of pure water cleaning last?",
            "answer": "Windows cleaned with pure water stay clean longer—typically up to two weeks more compared to traditional cleaning methods."
        },
        {
            "question": "Is pure water cleaning safe for homes with kids and pets?",
            "answer": "Yes, it is completely safe because it uses no chemicals—only purified water—making it ideal for families and pets."
        },
        {
            "question": "Is pure water cleaning environmentally friendly?",
            "answer": "Yes, it is eco-friendly since it eliminates the need for harmful cleaning chemicals and uses only purified water."
        },
        {
            "question": "Can pure water cleaning damage glass?",
            "answer": "No, it actually protects glass by preventing mineral buildup, which can cause long-term damage and reduce transparency."
        },
        {
            "question": "What is TDS and why does it matter?",
            "answer": "TDS (Total Dissolved Solids) measures the amount of minerals in water. Lower TDS means cleaner evaporation, which results in spotless glass."
        },
        {
            "question": "Does pure water cleaning leave streaks or haze?",
            "answer": "No, pure water dries naturally without leaving any streaks, haze, or residue, ensuring a crystal-clear finish."
        }
    ];

    return (
        <>
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

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1774345158/IMG_9593_1_2_b98bl5.png"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.03_PM_vtb2tn.jpg"
                            initial={50}
                        />

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
                                Read all 20+ reviews on Google
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

            {/* Faqs */}
            <FAQ title="" faqs={Faqs} />
        </>
    );
}
