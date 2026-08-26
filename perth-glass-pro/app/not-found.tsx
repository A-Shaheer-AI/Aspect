import Link from "next/link";
import { Home, Phone, Droplets } from "lucide-react";
import { BUSINESS } from "@/lib/config";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-brand-navy flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                {/* Icon */}
                <div className="relative inline-block mb-8">
                    <Droplets className="w-24 h-24 text-brand-water/30" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-heading font-bold text-action-gold">
                        404
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
                    Spot Missed!
                </h1>

                {/* Copy */}
                <p className="text-xl text-brand-water/80 mb-8">
                    We couldn&apos;t find that page. It may have been moved, or the link might be incorrect.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-6 py-3 rounded-full hover:shadow-lg transition-shadow"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <a
                        href={`tel:${BUSINESS.phoneRaw}`}
                        className="flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                        Call Us
                    </a>
                </div>

                {/* Subtle branding */}
                <p className="text-brand-water/40 text-sm mt-12">
                    Aspect Window Cleaning - Perth&apos;s Window Cleaning Experts
                </p>
            </div>
        </main>
    );
}
