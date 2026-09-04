import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = ({ title }: { title: string }) => {
    return (
        <section className="bg-brand-navy text-white py-16">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-heading font-bold mb-4">
                    {title} ?
                </h2>
                <p className="text-brand-water/80 mb-8">
                   Same-week bookings available. Free, no-obligation quote.
                </p>
                <Link href="/pricing#estimator" className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90">
                    Get Your Free Quote <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    )
}

export default CTA