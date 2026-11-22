"use client";

import { useEffect, useRef } from "react";

export interface ScrollAutoplayVideoProps {
    src: string;
    type?: string;
    className?: string;
}

export function ScrollAutoplayVideo({
    src,
    type = "video/mp4",
    className = "h-full w-full object-cover",
}: ScrollAutoplayVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Guarantee muted & inline playback for iOS Safari and mobile WebKit
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch((err) => {
                                if (err.name === "NotAllowedError") {
                                    video.muted = true;
                                    video.play().catch(() => {});
                                }
                            });
                        }
                    } else {
                        video.pause();
                    }
                });
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            className={className}
            controls
            muted
            playsInline
            loop
            preload="none"
        >
            <source src={src} type={type} />
        </video>
    );
}
