"use client"
import { useState } from "react"
import { motion } from "framer-motion"

export default function BeforeAfter() {
    const [sliderPosition, setSliderPosition] = useState(50)

    return (
       <div className="px-5">
         <div className="w-full md:w-1/2 mx-auto">
            {/* Before/After Slider */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-200"
            >
                {/* After Image (Background) */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1772800983/after-cleaning-street_lhtqux.jpg')` }}
                />

                {/* Before Image (Foreground, clipped) */}
                <div
                    className="absolute inset-0 bg-cover bg-center border-r-2 border-white"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dr8tjrszy/image/upload/v1772967205/street-before-cleaning_iupbdq.jpg')`,
                        clipPath: `inset(0 0 0 ${sliderPosition}%)`, // This will clip the "Before" image based on slider
                    }}
                />

                {/* Label Badge */}
                <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    Before
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    After
                </div>

                {/* Slider Control */}
                <div className="absolute inset-0 flex items-center">
                    <input
                        type="range" aria-label="Window cleaning before and after comparison slider"
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy w-5 h-5"><path d="M8 3L4 7l4 4"/><path d="M4 7h16"/><path d="M16 21l4-4-4-4"/><path d="M20 17H4"/></svg>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
       </div>
    )
}