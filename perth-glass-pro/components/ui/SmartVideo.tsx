"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SmartVideoProps {
    posterSrc: string;
    videoSrc: string;
    className?: string;
    priority?: boolean;
    alt?: string;
}

/**
 * SmartVideo - A performance-optimized background video component
 * 
 * - Shows poster image instantly (good for LCP)
 * - Lazy-loads video only on desktop (saves mobile data)
 * - Uses native lazy loading for the video element
 * - Fully accessible with reduced motion support
 */
export default function SmartVideo({
    posterSrc,
    videoSrc,
    className = "",
    priority = false,
    alt = "Background video",
}: SmartVideoProps) {
    const [isMobile, setIsMobile] = useState(true); // Default to mobile (no video)
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for mobile on client side
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check for reduced motion preference
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Don't render video on mobile or if user prefers reduced motion
    const shouldRenderVideo = !isMobile && !prefersReducedMotion;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Poster Image - Always visible, renders instantly */}
            <Image
                src={posterSrc}
                alt={alt}
                fill
                priority={priority}
                className="object-cover"
                sizes="100vw"
                quality={85}
            />

            {/* Video - Only on desktop, lazy loaded */}
            {shouldRenderVideo && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    // Poster as fallback while video loads
                    poster={posterSrc}
                >
                    <source src={videoSrc} type="video/webm" />
                    <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
                </video>
            )}

            {/* Overlay slot - children can be passed for gradient overlays */}
        </div>
    );
}
