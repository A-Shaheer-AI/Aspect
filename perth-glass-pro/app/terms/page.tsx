import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | Aspect Window Cleaning",
    description: "Terms and conditions for Aspect Window Cleaning Perth services.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-brand-navy py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-brand-water/80">Last updated: January 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 sm:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg">
                    <h2>Service Agreement</h2>
                    <p>
                        By booking a service with Aspect Window Cleaning, you agree to these terms and conditions.
                    </p>

                    <h2>Booking & Cancellation</h2>
                    <ul>
                        <li>Bookings are confirmed once you receive a confirmation via phone or email</li>
                        <li>Cancellations must be made at least 24 hours before the scheduled appointment</li>
                        <li>Late cancellations may incur a fee</li>
                        <li>We reserve the right to reschedule due to weather conditions</li>
                    </ul>

                    <h2>Pricing & Payment</h2>
                    <ul>
                        <li>Quotes are indicative and may be adjusted upon on-site assessment</li>
                        <li>All prices are in Australian Dollars (AUD) and exclude GST unless stated</li>
                        <li>Payment is due upon completion of service</li>
                        <li>We accept cash, card, and bank transfer</li>
                    </ul>

                    <h2>Service Guarantee</h2>
                    <p>
                        We stand behind our work with a 100% satisfaction guarantee. If you&apos;re not happy
                        with any aspect of our service, contact us within 24 hours and we&apos;ll return to make it right.
                    </p>

                    <h2>Access & Safety</h2>
                    <ul>
                        <li>Please ensure access to all windows is clear before our arrival</li>
                        <li>Pets should be secured during the service</li>
                        <li>We will not access areas we deem unsafe</li>
                        <li>Water and power access is required for most services</li>
                    </ul>

                    <h2>Liability</h2>
                    <p>
                        Aspect Window Cleaning holds $20 million public liability insurance.
                        We take care with all property, but are not liable for pre-existing damage,
                        worn seals, or issues discovered during cleaning.
                    </p>

                    <h2>Changes to Terms</h2>
                    <p>
                        We reserve the right to update these terms at any time. Continued use of our
                        services constitutes acceptance of any changes.
                    </p>

                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <Link href="/" className="text-action-gold font-medium hover:underline">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
