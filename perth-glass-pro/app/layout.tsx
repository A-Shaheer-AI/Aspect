import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyInterface from "@/components/ui/StickyInterface";
import ConditionalLayout from "@/components/ConditionalLayout";

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
    icons: {
        icon: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1772130850/white-logo_pzpxjk.png"
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
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "Aspect Window Cleaning",
                            "image": "https://res.cloudinary.com/dr8tjrszy/image/upload/v1772130850/white-logo_pzpxjk.png",
                            "@id": "https://aspectwindowcleaning.com.au/",
                            "url": "https://aspectwindowcleaning.com.au/",
                            "telephone": "+61426996192",
                            "priceRange": "$$",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "183 Stirling Hwy, Nedlands",
                                "addressLocality": "Perth",
                                "addressRegion": "WA",
                                "postalCode": "6009",
                                "addressCountry": "AU"
                            },
                            "geo": {
                                "@type": "GeoCoordinates",
                                "latitude": -31.9806823,
                                "longitude": 115.7929967
                            },
                            "openingHoursSpecification": {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                                "opens": "00:00",
                                "closes": "23:59"
                            },
                            "sameAs": [
                                "https://maps.app.goo.gl/fkrQnHZybt7ZYSah7",
                                "https://www.facebook.com/profile.php?id=61576666721111",
                                "https://www.instagram.com/aspectwindowcleaningperth/",
                                "https://www.tiktok.com/@aspect.window.cle",
                                "https://aspectwindowcleaning.com.au/"
                            ],
                            "description": "Professional window cleaning in Perth. Residential and commercial high-reach specialists. Fully insured. 5-star rated."
                        })
                    }}
                />
            </head>
            <body className="bg-brand-snow text-brand-navy font-body antialiased">
                {/* ACCESSIBILITY: Skip to content link */}
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>

                {/* <Navbar />
                <main id="main-content">
                    {children}
                </main>
                <Footer /> */}
                <ConditionalLayout children={children} />

                {/* Tag Manager - loaded after interactive */}

                <GoogleTagManager gtmId="GTM-KFLNCF23" />
                <SpeedInsights />
            </body>
        </html>
    );
}
