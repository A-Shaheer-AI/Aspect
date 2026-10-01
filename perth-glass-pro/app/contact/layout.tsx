import type { Metadata } from "next";

export const metadata: Metadata = {
    title: { absolute: "Contact Window Cleaners Perth | Aspect Window Cleaning" },
    description: "Contact Aspect Window Cleaning Perth for streak-free residential and commercial window cleaning. Call 0426 996 192 or request an instant quote online.",
    alternates: { canonical: "https://aspectwindowcleaning.com.au/contact" }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
