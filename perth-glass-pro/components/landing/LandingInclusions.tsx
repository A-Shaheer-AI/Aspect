"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import { InclusionItem } from "./landingData";

/* 
   WHAT'S INCLUDED CARD COMPONENT
   - Compact overlay layout on mobile where text sits directly on the lower part of the photo
   - Scroll-driven reveal: text smoothly translates from bottom to top over the image as you scroll
   - Inspect Feature pill on top right
*/
export function InclusionCard({
    item,
    onSelect,
}: {
    item: InclusionItem;
    onSelect: () => void;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"],
    });

    const textY = useTransform(scrollYProgress, [0, 0.75], [26, 0]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0.35, 1]);
    const scrimOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.95]);

    return (
        <div
            ref={cardRef}
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect();
                }
            }}
            aria-label={`View details for ${item.title}`}
            className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group cursor-pointer text-left select-none ring-1 ring-transparent hover:ring-action-gold/50 relative h-48 sm:h-52 md:h-auto"
        >
            {/* Visual Media Header / Mobile Background */}
            <div className="absolute inset-0 w-full h-full md:relative md:h-48 bg-gray-100 flex-shrink-0 overflow-hidden">
                <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Desktop hover gradient */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Inspect Feature Pill */}
                <div
                    className="absolute top-2.5 right-2.5 md:top-3 md:right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 md:px-3 md:py-1 rounded-full text-[11px] md:text-xs font-bold text-brand-navy shadow-md group-hover:bg-action-gold transition-colors flex items-center gap-1.5 z-20"
                    style={{ backgroundColor: "rgba(255,255,255,0.95)", WebkitBackdropFilter: "blur(4px)" }}
                >
                    <span>Inspect Feature</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>

            {/* Mobile View: Text sits over the lower half of the image and smoothly rises as you scroll */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="md:hidden absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4 flex flex-col justify-end"
            >
                <motion.div
                    style={{ opacity: scrimOpacity }}
                    className="absolute inset-0 bg-gradient-to-t from-[#07077E] via-[#07077E]/85 via-50% to-transparent -z-10 pointer-events-none"
                />
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-action-gold transition-colors mb-1 leading-tight drop-shadow-sm">
                    {item.title}
                </h3>
                <p className="text-xs sm:text-sm leading-snug text-white/90 font-normal line-clamp-2 drop-shadow-sm">
                    {item.description}
                </p>
            </motion.div>

            {/* Desktop View: Clean text body under image */}
            <div className="hidden md:flex p-5 flex-col gap-2 flex-1 justify-between bg-white z-10">
                <div>
                    <h3 className="font-bold text-lg text-brand-navy group-hover:text-action-gold transition-colors mb-1">
                        {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 font-normal">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* 
   WHAT'S INCLUDED DETAIL POP-UP MODAL
*/
export function InclusionDetailModal({
    item,
    onClose,
    onOpenQuoteModal,
}: {
    item: InclusionItem | null;
    onClose: () => void;
    onOpenQuoteModal: () => void;
}) {
    if (!item) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            style={{ backgroundColor: "rgba(0,0,0,0.85)", WebkitBackdropFilter: "blur(8px)" }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]">
                {/* Picture on top */}
                <div className="relative w-full h-56 sm:h-64 bg-slate-800 shrink-0 overflow-hidden">
                    <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 512px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        aria-label="Close details"
                        className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/95 text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer border-2 border-red-500/30"
                    >
                        <X className="w-7 h-7 stroke-[3]" />
                    </button>

                    {/* Standard Inclusions Badge */}
                    <div className="absolute bottom-4 left-4 z-10">
                        <span
                            className="px-3.5 py-1.5 rounded-full text-brand-navy font-bold text-xs shadow-md uppercase tracking-wider backdrop-blur-sm"
                            style={{ backgroundColor: "rgba(255,255,255,0.95)", WebkitBackdropFilter: "blur(4px)" }}
                        >
                            Standard Inclusions
                        </span>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-4 text-left">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-brand-navy mb-2">
                            {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    {item.detail && (
                        <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            {item.detail}
                        </p>
                    )}

                    {item.benefits && item.benefits.length > 0 && (
                        <div className="space-y-2 pt-1">
                            {item.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-navy">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* CTA at the bottom */}
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 shrink-0">
                    <button
                        onClick={() => {
                            onClose();
                            onOpenQuoteModal();
                        }}
                        className="w-full py-4 px-5 rounded-2xl bg-action-gold text-brand-navy font-extrabold text-sm sm:text-base hover:bg-brand-navy hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer text-center group"
                    >
                        <span>Looking for exactly this?? Book now to get your free quote</span>
                        <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
