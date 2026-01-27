import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Aspect Window Cleaning",
    description: "Privacy policy for Aspect Window Cleaning Perth. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-brand-navy py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-brand-water/80">Last updated: January 2026</p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 sm:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg">
                    <h2>Information We Collect</h2>
                    <p>
                        When you request a quote or book a service through Aspect Window Cleaning, we collect:
                    </p>
                    <ul>
                        <li>Your name and contact details (phone number, email address)</li>
                        <li>Your property address and suburb</li>
                        <li>Service preferences and property details</li>
                        <li>Any additional notes you provide</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>We use your personal information to:</p>
                    <ul>
                        <li>Provide accurate quotes and schedule services</li>
                        <li>Contact you about your booking or inquiry</li>
                        <li>Send appointment reminders and follow-ups</li>
                        <li>Improve our services based on feedback</li>
                    </ul>

                    <h2>Information Sharing</h2>
                    <p>
                        We do not sell, trade, or rent your personal information to third parties.
                        Your information may be shared with service providers who assist in our operations
                        (e.g., email services, scheduling software) under strict confidentiality agreements.
                    </p>

                    <h2>Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect your personal information
                        against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2>Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access the personal information we hold about you</li>
                        <li>Request correction of inaccurate information</li>
                        <li>Request deletion of your personal information</li>
                        <li>Opt out of marketing communications</li>
                    </ul>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy or wish to exercise your rights,
                        please contact us:
                    </p>
                    <ul>
                        <li>Phone: 04XX XXX XXX</li>
                        <li>Email: hello@aspect.com.au</li>
                    </ul>

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
