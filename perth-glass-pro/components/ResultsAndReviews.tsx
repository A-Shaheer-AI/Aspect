import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight, Quote } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import FAQ from "./FAQ";

export default function ResultsAndReviews() {

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
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">
                            See the Difference
                        </h2>
                        <p className="text-brand-slate text-lg max-w-2xl mx-auto">
                            Real window cleaning results from Perth homes. Drag the slider to compare before & after.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 items-start">

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1774345158/IMG_9593_1_2_b98bl5.png"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.03_PM_vtb2tn.jpg"
                            initial={50}
                        />

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1776944961/WhatsApp_Image_2026-04-22_at_8.43.25_PM_cylrzg.jpg"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1776944961/WhatsApp_Image_2026-04-22_at_8.43.25_PM_1_pmmoi8.jpg"
                            initial={50}
                        />

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772792157/after-window-cleaning_fs1hhz.jpg"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772792155/aspect-before-window-cleaning_zfr8ae.jpg"
                            initial={50}
                        />

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960140/WhatsApp_Image_2026-02-22_at_8.47.54_PM_neyxo8.jpg"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960141/WhatsApp_Image_2026-02-22_at_8.47.54_PM_1_pytncp.jpg"
                            initial={50}
                        />

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1777441114/WhatsApp_Image_2026-04-27_at_12.43.51_PM_qux9dv.jpg"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1777441115/WhatsApp_Image_2026-04-27_at_12.43.50_PM_q1q5xo.jpg"
                            initial={50}
                        />


                    </div>
                </div>

            </section>

            {/* Faqs */}
            <FAQ title="" faqs={Faqs} />
        </>
    );
}
