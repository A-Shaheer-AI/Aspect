"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    initial?: number;
}

const BeforeAfterSlider = ({
    beforeImage,
    afterImage,
    initial = 50,
}: BeforeAfterSliderProps) => {
    const [sliderPosition, setSliderPosition] = useState(initial);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-200"
        >
            {/* Before (Background) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${beforeImage}')` }}
            >
                <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    Before
                </div>
            </div>

            {/* After (Foreground, clipped) */}
            <div
                className="absolute inset-0 bg-cover bg-center border-r-2 border-white"
                style={{
                    backgroundImage: `url('${afterImage}')`,
                    clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                }}
            >
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    After
                </div>
            </div>

            {/* Slider */}
            <div className="absolute inset-0 flex items-center">
                <input
                    type="range" aria-label="Image comparison slider"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="w-full h-full opacity-0 cursor-ew-resize z-10"
                />
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <span className="text-brand-navy text-xs font-bold">âŸ·</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BeforeAfterSlider;