"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    initial?: number;
    className?: string;
}

const BeforeAfterSlider = ({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    initial = 50,
    className = "",
}: BeforeAfterSliderProps) => {
    const [sliderPosition, setSliderPosition] = useState(initial);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const updatePositionFromClientX = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(Math.round(percentage * 10) / 10);
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        isDragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        updatePositionFromClientX(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        updatePositionFromClientX(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        isDragging.current = false;
        try {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            setSliderPosition((prev) => Math.max(0, prev - 5));
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            setSliderPosition((prev) => Math.min(100, prev + 5));
        }
    };

    // Keep handle thumb within container bounds so it never gets clipped at 0% or 100%
    const handleLeft = Math.max(3, Math.min(97, sliderPosition));

    return (
        <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-slate-200 select-none cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-action-gold ${className}`}
            style={{ touchAction: "none" }}
        >
            {/* 1. Before Image (Background, visible on left) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src={beforeImage}
                    alt="Before window cleaning"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                />
            </div>

            {/* 2. After Image (Foreground, clipped from left so visible on right) */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                    WebkitClipPath: `inset(0 0 0 ${sliderPosition}%)`,
                }}
            >
                <Image
                    src={afterImage}
                    alt="After window cleaning"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                />
            </div>

            {/* 3. Floating Badges (z-20) */}
            <div
                className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider z-20 pointer-events-none transition-opacity duration-200"
                style={{ opacity: sliderPosition < 15 ? 0.3 : 1 }}
            >
                {beforeLabel}
            </div>
            <div
                className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider z-20 pointer-events-none transition-opacity duration-200"
                style={{ opacity: sliderPosition > 85 ? 0.3 : 1 }}
            >
                {afterLabel}
            </div>

            {/* 4. Dividing Line (z-30) */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-30 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
            />

            {/* 5. Handle Thumb (z-30 - guaranteed above both images) */}
            <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                style={{ left: `${handleLeft}%` }}
            >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.4)] border-2 border-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-brand-navy"
                    >
                        <path d="m9 18-6-6 6-6" />
                        <path d="m15 6 6 6-6 6" />
                    </svg>
                </div>
            </div>

            {/* Accessible Hidden Input for assistive tech */}
            <input
                type="range"
                aria-label="Before and after comparison slider"
                min="0"
                max="100"
                value={Math.round(sliderPosition)}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="sr-only"
            />
        </div>
    );
};

export default BeforeAfterSlider;