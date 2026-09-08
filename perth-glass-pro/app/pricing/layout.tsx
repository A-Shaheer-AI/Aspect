import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "https://aspectwindowcleaning.com.au/pricing" },
    title: { absolute: "Window Cleaning Prices Perth | Aspect Window Cleaning" },
    description: "Transparent Perth window cleaning prices with zero hidden fees. Calculate your instant quote online or view our residential & commercial packages. Book today!",
    openGraph: {
        title: "Pricing & Packages | Aspect Window Cleaning Perth",
        description: "Transparent pricing for residential and commercial window cleaning, solar panels, and gutters in Perth. View our Essential, Standard, and Supreme packages.",
        type: "website",
        url: "https://aspectwindowcleaning.com.au/pricing",
        images: [
            {
                url: "/og-image.webp",
                type: "image/webp",
                width: 1200,
                height: 630,
                alt: "Aspect Window Cleaning Perth Pricing & Packages",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing & Packages | Aspect Window Cleaning Perth",
        description: "Transparent pricing for residential and commercial window cleaning, solar panels, and gutters in Perth.",
        images: ["/og-image.webp"],
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Pricing & Packages | Aspect Window Cleaning Perth",
                        "description": "Transparent pricing for residential and commercial window cleaning, solar panels, and gutters in Perth.",
                        "mainEntity": {
                            "@type": "ItemList",
                            "itemListElement": [
                                {
                                    "@type": "Service",
                                    "name": "Residential Window Cleaning",
                                    "offers": {
                                        "@type": "Offer",
                                        "price": "159.00",
                                        "priceCurrency": "AUD"
                                    }
                                },
                                {
                                    "@type": "Service",
                                    "name": "Commercial Window Cleaning",
                                    "offers": {
                                        "@type": "Offer",
                                        "price": "79.00",
                                        "priceCurrency": "AUD"
                                    }
                                },
                                {
                                    "@type": "Service",
                                    "name": "Solar Panel Cleaning",
                                    "offers": {
                                        "@type": "Offer",
                                        "price": "290.00",
                                        "priceCurrency": "AUD"
                                    }
                                },
                                {
                                    "@type": "Service",
                                    "name": "Gutter Cleaning",
                                    "offers": {
                                        "@type": "Offer",
                                        "price": "290.00",
                                        "priceCurrency": "AUD"
                                    }
                                }
                            ]
                        }
                    }),
                }}
            />
            {children}
        </>
    );
}