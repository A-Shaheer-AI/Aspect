"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initAttribution } from "@/lib/attribution";

function InnerAttributionTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        initAttribution();
    }, [pathname, searchParams]);

    return null;
}

export default function AttributionTracker() {
    return (
        <Suspense fallback={null}>
            <InnerAttributionTracker />
        </Suspense>
    );
}
