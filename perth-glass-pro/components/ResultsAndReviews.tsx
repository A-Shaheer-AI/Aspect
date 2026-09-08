import Link from "next/link";
import { Star, MapPin, ArrowRight, Quote } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import FAQ from "./FAQ";
import { HOME_FAQS } from "@/content/home-faqs";

export default function ResultsAndReviews() {
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
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1785881088/aspect_gallery/3after.webp"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1785881084/aspect_gallery/3before.webp"
                            initial={50}
                        />

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772792157/after-window-cleaning_fs1hhz.jpg"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772792155/aspect-before-window-cleaning_zfr8ae.jpg"
                            initial={50}
                        />

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1785879700/aspect_gallery/after.webp"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1785879695/aspect_gallery/1-before.webp"
                            initial={50}
                        />

                        <BeforeAfterSlider
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1785880638/aspect_gallery/2-before.webp"
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1785880639/aspect_gallery/2-after.webp"
                            initial={50}
                        />
                    </div>
                </div>
            </section>

            {/* Faqs */}
            <FAQ title="" faqs={HOME_FAQS} />
        </>
    );
}
