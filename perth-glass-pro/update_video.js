const fs = require('fs');
let content = fs.readFileSync('components/ui/SmartVideo.tsx', 'utf8');

// We need to add useRef and IntersectionObserver logic.
const newComponent = `"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface SmartVideoProps {
    posterSrc: string;
    videoSrc: string;
    className?: string;
    priority?: boolean;
    alt?: string;
}

export default function SmartVideo({
    posterSrc,
    videoSrc,
    className = "",
    priority = false,
    alt = "Background video",
}: SmartVideoProps) {
    const [isMobile, setIsMobile] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Intersection Observer for scroll-to-play
    useEffect(() => {
        if (!videoRef.current || isMobile || prefersReducedMotion) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current?.play().catch(e => console.warn("Video autoplay failed:", e));
                    } else {
                        videoRef.current?.pause();
                    }
                });
            },
            { threshold: 0.1 } // Play when at least 10% is visible
        );

        observer.observe(containerRef.current!);

        return () => observer.disconnect();
    }, [isMobile, prefersReducedMotion, videoLoaded]);

    const shouldRenderVideo = !isMobile && !prefersReducedMotion;

    return (
        <div ref={containerRef} className={\`relative overflow-hidden \${className}\`}>
            <Image
                src={posterSrc}
                alt={alt}
                fill
                priority={priority}
                className="object-cover"
                sizes="100vw"
                quality={85}
            />

            {shouldRenderVideo && (
                <video
                    ref={videoRef}
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 \${videoLoaded ? "opacity-100" : "opacity-0"
                        }\`}
                    poster={posterSrc}
                >
                    <source src={videoSrc} type="video/webm" />
                    <source src={videoSrc.replace(".webm", ".mp4")} type="video/mp4" />
                </video>
            )}
        </div>
    );
}
`;
fs.writeFileSync('components/ui/SmartVideo.tsx', newComponent, 'utf8');
console.log("Updated SmartVideo with IntersectionObserver");