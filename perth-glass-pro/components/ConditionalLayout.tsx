"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyInterface from "@/components/ui/StickyInterface";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLanding = pathname.startsWith("/landing");

    return (
        <>
            {!isLanding && <Navbar />}
            <main id="main-content">{children}</main>
            {!isLanding && <Footer />}
            {!isLanding && <StickyInterface />}
        </>
    );
}