"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyInterface from "@/components/ui/StickyInterface";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const addsPages = ["/landing", "/solar-cleaning", "/gutter-cleaning", "/pressure-cleaning"];
    const isCrm = pathname?.startsWith("/crm");
    const isAdsPage = addsPages.some((route) => pathname.startsWith(route));

    if (isCrm) {
        return <main id="main-content" className="min-h-screen bg-slate-50">{children}</main>;
    }

    return (
        <>
            {!isAdsPage && <Navbar />}
            <main id="main-content">{children}</main>
            <Footer />
            {!isAdsPage && <StickyInterface />}
        </>
    );
}