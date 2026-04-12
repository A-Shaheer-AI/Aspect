"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyInterface from "@/components/ui/StickyInterface";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const addsPages = ["/landing", "/solar-cleaning", "/gutter-cleaning", "/pressure-cleaning"];
    const isAdsPage = addsPages.some((route) =>
        pathname.startsWith(route)
    );

    return (
        <>
            {!isAdsPage && <Navbar />}
            <main id="main-content">{children}</main>
            <Footer />
            {!isAdsPage && <StickyInterface />}
        </>
    );
}