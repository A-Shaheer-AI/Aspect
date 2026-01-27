"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { addDays, isBefore, startOfToday } from "date-fns";
import { ALL_SUBURBS } from "@/lib/suburbs";
import { sendLeadEmail } from "@/app/actions/send-email";
import { CAL_LINK } from "@/lib/config";

// --- Math Engine Constants ---
const PRICING = {
    BASE_SINGLE: 165,
    BASE_DOUBLE: 250,
    PER_BEDROOM: 28,
    MULTIPLIER_INT_EXT: 1.75,
    MULTIPLIER_NEGLECTED: 1.28,
    MULTIPLIER_CONSTRUCTION: 1.8,
    URGENCY_FEE: 50,
};

// --- Types ---
type FormData = {
    date: string;
    isFlexible: boolean;
    name: string;
    phone: string;
    suburb: string;
    storeys: "single" | "double";
    scope: "exterior" | "int_ext";
    bedrooms: number;
    condition: "standard" | "neglected" | "construction";
    selectedTier: "essential" | "standard" | "premium" | null;
    flexibleNotes: string;
};

const INITIAL_DATA: FormData = {
    date: "",
    isFlexible: false,
    name: "",
    phone: "",
    suburb: "",
    storeys: "single",
    scope: "int_ext",
    bedrooms: 3,
    condition: "standard",
    selectedTier: null,
    flexibleNotes: "",
};

// --- Typing Animation Component (Desktop Only) ---
function TypingHeadline({ text, className }: { text: string; className?: string }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText("");
        setIsComplete(false);
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, 35);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <h2 className={className}>
            {displayedText}
            {!isComplete && <span className="animate-pulse">|</span>}
        </h2>
    );
}

export default function ResidentialEstimator() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [isUrgent, setIsUrgent] = useState(false);
    const [filteredSuburbs, setFilteredSuburbs] = useState<{ name: string; region: string }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    // --- Price Calculation ---
    const calculateTotal = (tier: "essential" | "standard" | "premium") => {
        let base = formData.storeys === "single" ? PRICING.BASE_SINGLE : PRICING.BASE_DOUBLE;
        let sizeCost = formData.bedrooms * PRICING.PER_BEDROOM;
        let subtotal = base + sizeCost;

        if (formData.scope === "int_ext") subtotal *= PRICING.MULTIPLIER_INT_EXT;
        if (formData.condition === "neglected") subtotal *= PRICING.MULTIPLIER_NEGLECTED;
        if (formData.condition === "construction") subtotal *= PRICING.MULTIPLIER_CONSTRUCTION;

        if (tier === "essential") subtotal *= 0.85;
        if (tier === "premium") subtotal *= 1.4;
        if (isUrgent) subtotal += PRICING.URGENCY_FEE;

        return Math.round(subtotal);
    };

    // --- Urgency Check ---
    useEffect(() => {
        if (formData.isFlexible) {
            setIsUrgent(false);
            return;
        }
        if (formData.date) {
            const selected = new Date(formData.date);
            const today = startOfToday();
            const sevenDaysFromNow = addDays(today, 7);
            setIsUrgent(isBefore(selected, sevenDaysFromNow) && !isBefore(selected, today));
        }
    }, [formData.date, formData.isFlexible]);

    // --- Cal.com Integration ---
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { styles: { branding: { brandColor: "#D4AF37" } }, hideEventTypeDetails: false, layout: "month_view" });
        })();
    }, []);

    // --- Handlers ---
    const nextStep = () => setStep((p) => p + 1);
    const prevStep = () => setStep((p) => p - 1);
    const updateField = (field: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSuburbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        updateField("suburb", val);
        if (val.length > 0) {
            const matches = ALL_SUBURBS.filter((s) => s.name.toLowerCase().includes(val.toLowerCase())).slice(0, 5);
            setFilteredSuburbs(matches);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectSuburb = (name: string) => {
        updateField("suburb", name);
        setShowSuggestions(false);
    };

    const handleSubmitRequest = async () => {
        setIsSubmitting(true);
        setSubmissionError(null);

        try {
            const result = await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                suburb: formData.suburb,
                storeys: formData.storeys,
                scope: formData.scope,
                bedrooms: formData.bedrooms,
                condition: formData.condition,
                selectedTier: formData.selectedTier || undefined,
                priceEstimate: calculateTotal(formData.selectedTier || "standard"),
                isUrgent,
                flexibleNotes: formData.flexibleNotes,
                serviceType: "Residential Window Cleaning",
            });

            if (result.success) {
                setIsSuccess(true);
                setStep(6); // Move to success step
            } else {
                setSubmissionError(result.error || "Failed to send request. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setSubmissionError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Animation Variants ---
    const variants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="w-full min-h-[60vh] bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-white/20 mt-8 md:mt-12">
            {/* Header with Back Button - z-50 for clickability */}
            <div className="bg-brand-navy p-4 flex items-center justify-between text-white relative z-50">
                {step > 1 ? (
                    <button
                        onClick={prevStep}
                        className="text-white hover:text-action-gold transition-colors text-sm flex items-center gap-1 font-bold z-50"
                    >
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                ) : (
                    <span className="text-white/80 text-sm font-medium">Get your instant estimate</span>
                )}
                <span className="text-white/40 text-xs">Aspect Window Cleaning</span>
            </div>

            <div className="p-6 sm:p-8 md:p-10 flex flex-col relative">
                <AnimatePresence mode="wait">
                    {/* STEP 1: TIMELINE */}
                    {step === 1 && (
                        <motion.div key="step1" variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-5">
                            {/* Mobile: Static headline */}
                            <h2 className="md:hidden text-2xl sm:text-3xl font-heading font-bold text-brand-navy leading-tight">
                                When would you like your windows cleaned?
                            </h2>
                            {/* Desktop: Typing animation */}
                            <div className="hidden md:block">
                                <TypingHeadline
                                    text="When would you like your windows cleaned?"
                                    className="text-3xl lg:text-4xl font-heading font-bold text-brand-navy leading-tight"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-brand-slate font-medium mb-1 block">Preferred Date</span>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => {
                                            updateField("date", e.target.value);
                                            updateField("isFlexible", false);
                                        }}
                                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-action-gold focus:ring-4 focus:ring-action-gold/10 text-lg outline-none transition-all"
                                    />
                                </label>

                                <button
                                    onClick={() => updateField("isFlexible", !formData.isFlexible)}
                                    className={`w-full h-14 rounded-xl border-2 font-bold text-base flex items-center justify-center gap-2 transition-all ${formData.isFlexible ? "bg-green-100 border-green-500 text-green-700" : "border-slate-200 text-brand-slate hover:border-action-gold/50"
                                        }`}
                                >
                                    <CheckCircle className={`w-5 h-5 ${formData.isFlexible ? "opacity-100" : "opacity-0"}`} />
                                    I&apos;m flexible with dates
                                </button>
                            </div>

                            {isUrgent && (
                                <div className="bg-orange-50 border border-orange-200 text-orange-700 p-3 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium">
                                        ⚡ Priority Slot Applied (+${PRICING.URGENCY_FEE})
                                        <br />
                                        <span className="text-xs opacity-80 font-normal">Spots are limited this week.</span>
                                    </span>
                                </div>
                            )}

                            <button
                                onClick={nextStep}
                                disabled={!formData.date && !formData.isFlexible}
                                className="w-full bg-action-gold text-brand-navy font-bold h-14 text-lg rounded-xl shadow-lg hover:brightness-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                Next Step <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: CONTACT INFO */}
                    {step === 2 && (
                        <motion.div key="step2" variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-5">
                            <h2 className="md:hidden text-2xl sm:text-3xl font-heading font-bold text-brand-navy leading-tight">
                                Where should we send the estimate?
                            </h2>
                            <div className="hidden md:block">
                                <TypingHeadline text="Where should we send the estimate?" className="text-3xl lg:text-4xl font-heading font-bold text-brand-navy leading-tight" />
                            </div>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-action-gold text-lg outline-none"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={(e) => updateField("phone", e.target.value)}
                                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-action-gold text-lg outline-none"
                                />
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Suburb (e.g. Cottesloe)"
                                        value={formData.suburb}
                                        onChange={handleSuburbChange}
                                        onFocus={() => formData.suburb.length > 0 && setShowSuggestions(true)}
                                        className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-action-gold text-lg outline-none"
                                    />
                                    {showSuggestions && filteredSuburbs.length > 0 && (
                                        <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                                            {filteredSuburbs.map((sub) => (
                                                <button
                                                    key={sub.name}
                                                    onClick={() => selectSuburb(sub.name)}
                                                    className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between border-b border-slate-50 last:border-0"
                                                >
                                                    <span className="font-medium text-brand-navy">{sub.name}</span>
                                                    <span className="text-xs text-brand-slate bg-slate-100 px-2 py-1 rounded-full">{sub.region}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={nextStep}
                                disabled={!formData.name || !formData.phone || !formData.suburb}
                                className="w-full bg-action-gold text-brand-navy font-bold h-14 text-lg rounded-xl shadow-lg hover:brightness-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                Next Step <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 3: PROPERTY DETAILS */}
                    {step === 3 && (
                        <motion.div key="step3" variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-5">
                            <h2 className="md:hidden text-2xl sm:text-3xl font-heading font-bold text-brand-navy leading-tight">Tell us about the home.</h2>
                            <div className="hidden md:block">
                                <TypingHeadline text="Tell us about the home." className="text-3xl lg:text-4xl font-heading font-bold text-brand-navy leading-tight" />
                            </div>

                            {/* Storeys */}
                            <div className="bg-slate-50 p-1.5 rounded-xl flex gap-1">
                                {["single", "double"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => updateField("storeys", opt)}
                                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${formData.storeys === opt ? "bg-white shadow-md text-brand-navy ring-1 ring-black/5" : "text-brand-slate hover:text-brand-navy hover:bg-white/50"
                                            }`}
                                    >
                                        {opt === "single" ? "Single Storey" : "Double Storey"}
                                    </button>
                                ))}
                            </div>

                            {/* Scope */}
                            <div className="bg-slate-50 p-1.5 rounded-xl flex gap-1">
                                {["exterior", "int_ext"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => updateField("scope", opt)}
                                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${formData.scope === opt ? "bg-white shadow-md text-brand-navy ring-1 ring-black/5" : "text-brand-slate hover:text-brand-navy hover:bg-white/50"
                                            }`}
                                    >
                                        {opt === "exterior" ? "Exterior Only" : "Inside & Out"}
                                    </button>
                                ))}
                            </div>

                            {/* Bedrooms */}
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="font-bold text-brand-navy">Bedrooms</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => updateField("bedrooms", Math.max(1, formData.bedrooms - 1))}
                                        className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center font-bold text-lg hover:bg-slate-100 active:scale-95"
                                    >
                                        -
                                    </button>
                                    <span className="font-bold text-xl w-6 text-center">{formData.bedrooms}</span>
                                    <button
                                        onClick={() => updateField("bedrooms", formData.bedrooms + 1)}
                                        className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center font-bold text-lg hover:bg-slate-100 active:scale-95"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Condition */}
                            <div className="space-y-2">
                                <label className="text-brand-slate font-medium ml-1">Window Condition</label>
                                <select
                                    value={formData.condition}
                                    onChange={(e) => updateField("condition", e.target.value)}
                                    className="w-full h-14 px-4 rounded-xl border-2 border-slate-200 focus:border-action-gold text-base outline-none bg-white appearance-none"
                                >
                                    <option value="standard">Standard (Cleaned in last 9 months)</option>
                                    <option value="neglected">Neglected (Not cleaned in over 1 year)</option>
                                    <option value="construction">Construction / Coastal / Renovation</option>
                                </select>
                            </div>

                            <button
                                onClick={nextStep}
                                className="w-full bg-action-gold text-brand-navy font-bold h-14 text-lg rounded-xl shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                Get Quote <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 4: QUOTE CARDS */}
                    {step === 4 && (
                        <motion.div key="step4" variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-navy text-center">Select your service level</h2>
                            <p className="text-center text-brand-slate text-sm">*Prices are indicative only</p>

                            {/* Tier 1: Essential */}
                            <div
                                onClick={() => {
                                    updateField("selectedTier", "essential");
                                    nextStep();
                                }}
                                className="relative p-5 rounded-2xl border-2 border-slate-200 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-brand-navy text-lg">Essential Refresh</h3>
                                    <div className="text-right">
                                        <span className="block font-bold text-2xl">${calculateTotal("essential")}</span>
                                        <span className="text-xs text-brand-slate uppercase font-bold">+ GST</span>
                                    </div>
                                </div>
                                <p className="text-sm text-brand-slate/80">Glass & Sills Only. Basic external wash.</p>
                                {isUrgent && (
                                    <div className="mt-2 text-xs text-orange-600 font-medium flex items-center gap-1 bg-orange-50 w-fit px-2 py-1 rounded">
                                        <AlertCircle className="w-3 h-3" /> Includes Priority Fee
                                    </div>
                                )}
                            </div>

                            {/* Tier 2: Window Care - Running Light Border */}
                            <div
                                onClick={() => {
                                    updateField("selectedTier", "standard");
                                    nextStep();
                                }}
                                className="relative p-5 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] running-light-border"
                            >
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-action-gold text-brand-navy text-xs font-bold px-4 py-1.5 rounded-full shadow-sm z-10">
                                    MOST POPULAR
                                </span>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-brand-navy text-lg">Window Care</h3>
                                    <div className="text-right">
                                        <span className="block font-bold text-2xl">${calculateTotal("standard")}</span>
                                        <span className="text-xs text-brand-slate uppercase font-bold">+ GST</span>
                                    </div>
                                </div>
                                <p className="text-sm text-brand-slate/80">Glass, Frames, Flyscreens & Sills. Most Popular.</p>
                                {isUrgent && (
                                    <div className="mt-2 text-xs text-orange-600 font-medium flex items-center gap-1 bg-orange-50 w-fit px-2 py-1 rounded">
                                        <AlertCircle className="w-3 h-3" /> Includes Priority Fee
                                    </div>
                                )}
                            </div>

                            {/* Tier 3: Window Revival - Glitter Effect */}
                            <div
                                onClick={() => {
                                    updateField("selectedTier", "premium");
                                    nextStep();
                                }}
                                className="relative p-5 rounded-2xl border-2 border-brand-navy bg-brand-navy/5 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                            >
                                {/* Sparkle Icon */}
                                <Sparkles className="absolute top-3 right-3 w-5 h-5 text-action-gold animate-pulse" />
                                <div className="absolute inset-0 pointer-events-none glitter-overlay"></div>
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <h3 className="font-bold text-brand-navy text-lg flex items-center gap-2">
                                        Window Revival
                                    </h3>
                                    <div className="text-right">
                                        <span className="block font-bold text-2xl">${calculateTotal("premium")}</span>
                                        <span className="text-xs text-brand-slate uppercase font-bold">+ GST</span>
                                    </div>
                                </div>
                                <p className="text-sm text-brand-slate/80 relative z-10">Deep Track Clean + Paint/Residue Removal.</p>
                                {isUrgent && (
                                    <div className="mt-2 text-xs text-orange-600 font-medium flex items-center gap-1 bg-orange-50 w-fit px-2 py-1 rounded relative z-10">
                                        <AlertCircle className="w-3 h-3" /> Includes Priority Fee
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 5: BOOKING */}
                    {step === 5 && (
                        <motion.div key="step5" variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-4">
                            {/* Summary Card */}
                            <div className="bg-brand-navy/5 p-4 rounded-xl border border-brand-navy/10">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-brand-navy text-lg flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        {formData.selectedTier === "essential" ? "Essential Refresh" : formData.selectedTier === "standard" ? "Window Care" : "Window Revival"}
                                    </h3>
                                    <span className="text-xs text-brand-slate bg-slate-200 px-2 py-1 rounded">Indicative Quote</span>
                                </div>
                                <p className="text-2xl font-bold text-brand-navy">
                                    ${calculateTotal(formData.selectedTier || "standard")}
                                    <span className="text-sm font-normal text-brand-slate ml-1">+ GST</span>
                                </p>
                                {isUrgent && <p className="text-xs text-orange-600 mt-1 font-medium">*Includes $50 Priority Fee for same-week booking</p>}
                            </div>

                            {/* Error Message */}
                            {submissionError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm">{submissionError}</span>
                                </div>
                            )}

                            {/* Calendar or Flexible Form */}
                            <div className="flex-grow">
                                {formData.isFlexible ? (
                                    <div className="flex flex-col gap-4">
                                        <p className="text-brand-slate">Since you're flexible, please let us know your preferred days or times, and we'll slot you in where it fits best.</p>
                                        <textarea
                                            placeholder="E.g. Mondays or Fridays work best for me..."
                                            value={formData.flexibleNotes}
                                            onChange={(e) => updateField("flexibleNotes", e.target.value)}
                                            className="w-full h-32 p-4 rounded-xl border-2 border-slate-200 focus:border-action-gold text-base outline-none resize-none"
                                        ></textarea>
                                        <button
                                            onClick={handleSubmitRequest}
                                            disabled={isSubmitting}
                                            className="w-full bg-brand-navy text-white font-bold h-14 rounded-xl shadow-lg hover:bg-brand-navy/90 text-lg uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                "SUBMIT REQUEST"
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-brand-navy mb-3">Select Your Slot:</h4>
                                        <div className="rounded-xl overflow-hidden border border-slate-200 min-h-[300px]">
                                            <Cal calLink={CAL_LINK} style={{ width: "100%", height: "350px", overflow: "auto" }} config={{ layout: "month_view" }} />
                                        </div>
                                        <div className="text-center mt-4">
                                            <button className="text-sm text-brand-slate underline hover:text-action-gold transition-colors">Date unavailable? Request a squeeze-in.</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 6: SUCCESS */}
                    {step === 6 && isSuccess && (
                        <motion.div key="step6" variants={variants} initial="enter" animate="center" exit="exit" className="flex flex-col items-center justify-center gap-6 py-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-2">Request Sent!</h2>
                                <p className="text-brand-slate">We'll get back to you within 2 hours with a confirmed quote.</p>
                            </div>
                            <div className="bg-brand-navy/5 p-4 rounded-xl border border-brand-navy/10 w-full max-w-sm">
                                <p className="text-center text-brand-navy font-bold text-xl">
                                    ${calculateTotal(formData.selectedTier || "standard")} + GST
                                </p>
                                <p className="text-center text-brand-slate text-sm mt-1">Indicative Quote</p>
                            </div>
                            <a
                                href="tel:+61400000000"
                                className="text-action-gold font-medium hover:underline"
                            >
                                Need it faster? Call us now
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CSS for Visual Effects */}
            <style jsx>{`
                /* Running Light Border for Tier 2 */
                .running-light-border {
                    position: relative;
                    background: linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #d4af37, #f0d68c, #d4af37, #f0d68c) border-box;
                    border: 3px solid transparent;
                    animation: borderRotate 3s linear infinite;
                }
                @keyframes borderRotate {
                    0% {
                        background: linear-gradient(#fff, #fff) padding-box, linear-gradient(0deg, #d4af37, #f0d68c, #d4af37, #f0d68c) border-box;
                    }
                    25% {
                        background: linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #d4af37, #f0d68c, #d4af37, #f0d68c) border-box;
                    }
                    50% {
                        background: linear-gradient(#fff, #fff) padding-box, linear-gradient(180deg, #d4af37, #f0d68c, #d4af37, #f0d68c) border-box;
                    }
                    75% {
                        background: linear-gradient(#fff, #fff) padding-box, linear-gradient(270deg, #d4af37, #f0d68c, #d4af37, #f0d68c) border-box;
                    }
                    100% {
                        background: linear-gradient(#fff, #fff) padding-box, linear-gradient(360deg, #d4af37, #f0d68c, #d4af37, #f0d68c) border-box;
                    }
                }

                /* Glitter Overlay for Tier 3 */
                .glitter-overlay {
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 1px, transparent 1px);
                    background-size: 12px 12px;
                    animation: shimmer 2s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0%,
                    100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }
            `}</style>
        </div>
    );
}
