import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing & Packages | Aspect Window Cleaning Perth",
    description: "Transparent pricing for residential and commercial window cleaning, solar panels, and gutters in Perth. View our Essential, Standard, and Supreme packages.",
    openGraph: {
        title: "Pricing & Packages | Aspect Window Cleaning Perth",
        description: "Transparent pricing for residential and commercial window cleaning, solar panels, and gutters in Perth. View our Essential, Standard, and Supreme packages.",
        type: "website",
        url: "https://aspectwindowcleaning.com.au/pricing",
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