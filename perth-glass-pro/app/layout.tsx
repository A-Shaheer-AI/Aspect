import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyInterface from "@/components/ui/StickyInterface";
import Clarity from "@/components/Clarity";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["600", "700"],
    variable: "--font-montserrat",
    display: "swap",
    preload: true,
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    title: {
        template: "%s | Aspect Window Cleaning Perth",
        default: "Perth's Premier Window Cleaning | Residential & Commercial Specialists",
    },
    description:
        "Professional window cleaning in Perth. Specialists in residential homes and commercial high-reach (EWP) cleaning. Streak-free results. Fully insured. Same-week service.",
    keywords: [
        "window cleaning Perth",
        "commercial window cleaning",
        "residential window cleaning",
        "high-rise window cleaning",
        "solar panel cleaning Perth",
        "pressure washing Perth",
        "gutter cleaning Perth",
    ],
    authors: [{ name: "Aspect Window Cleaning" }],
    robots: "index, follow",
    openGraph: {
        title: "Aspect Window Cleaning | Perth's Premier Specialists",
        description:
            "Professional window cleaning in Perth. Residential and commercial high-reach specialists. Fully insured. 5-star rated.",
        locale: "en_AU",
        type: "website",
        url: "https://aspectwindowcleaning.com.au",
        siteName: "Aspect Window Cleaning",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
            <head>
                {/* Preconnect to improve font loading */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="bg-brand-snow text-brand-navy font-body antialiased">
                {/* ACCESSIBILITY: Skip to content link */}
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>

                <Navbar />
                <main id="main-content">{children}</main>
                <Footer />
                <StickyInterface />

                {/* Analytics - loaded after interactive */}
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                )}
                <Clarity />
            </body>
        </html>
    );
}
