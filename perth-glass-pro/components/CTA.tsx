import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = ({ title }: { title: string }) => {
    return (
        <section className="bg-brand-navy text-white py-16">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-heading font-bold mb-4">
                    {title}
                </h2>
                <p className="text-brand-water/80 mb-8">
                   Same-week bookings available. Free, no-obligation quote.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                    <Link href="/pricing#estimator" className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-action-gold/90 transition-all shadow-md">
                        <span>Get Instant Quote</span> <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-base sm:text-lg transition-colors border border-white/20">
                        <span>Contact Our Team</span>
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-brand-water/70">
                    <Link href="/pricing" className="hover:text-action-gold transition-colors underline underline-offset-4 decoration-action-gold/50">
                        View Pricing & Packages
                    </Link>
                    <span>&bull;</span>
                    <Link href="/case-studies" className="hover:text-action-gold transition-colors underline underline-offset-4 decoration-action-gold/50">
                        See Perth Case Studies
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CTA