"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Loader2, CheckCircle, Home, Building2, MapPin, Sparkles } from "lucide-react";
import { sendLeadEmail } from "@/app/actions/send-email";
import { trackFormStart, trackFormStep2, trackFormCompleted } from "@/hooks/useGtm";

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    quoteType?: "general" | "residential" | "commercial";
    initialService?: string;
    initialSuburb?: string;
}

export default function QuoteModal({
    isOpen,
    onClose,
    quoteType = "general",
    initialService = "",
    initialSuburb = "",
}: QuoteModalProps) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: initialService,
        suburb: initialSuburb,
        message: "",
    });

    // CRITICAL: Sync props with form state when modal opens or props change
    useEffect(() => {
        if (isOpen) {
            setFormData((prev) => ({
                ...prev,
                service: initialService || prev.service,
                suburb: initialSuburb || prev.suburb,
            }));
            trackFormStart();
        }
    }, [isOpen, initialService, initialSuburb]);

    const handleNextStep = () => {
        trackFormStep2(formData.service, formData.suburb);
        setStep(2);
    }

    // Dynamic greeting based on quote type
    const getGreeting = () => {
        switch (quoteType) {
            case "residential":
                return "Ready for sparkling clean windows?";
            case "commercial":
                return "Let's discuss your commercial needs";
            default:
                return "Get your free quote";
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const result = await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                suburb: formData.suburb,
                serviceType: formData.service || quoteType,
                message: formData.message,
            });
            if (result.success) {
                trackFormCompleted();
                setIsSuccess(true);
            } else {
                setErrorMessage(result.error || "Failed to send. Please try again.");
            }
        } catch (error) {
            console.error("Quote submission error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setStep(1);
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "", service: "", suburb: "", message: "" });
        onClose();
    };

    if (!isOpen) return null;

    // Check if we have pre-filled service/suburb to show them
    const hasPrefilledData = formData.service || formData.suburb;

    return (
        <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto py-10 p-4">
            {/* Backdrop */}
            <div
                onClick={handleClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                style={{ animation: "fadeIn 0.2s ease-out" }}
            />

            {/* Modal Card */}
            <div
                className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
                style={{ animation: "scaleIn 0.2s ease-out" }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    aria-label="Close modal"
                    className="cursor-pointer absolute top-4 right-4 p-2 text-brand-slate hover:text-brand-navy transition-colors"
                >
                    <X className="w-5 h-5" aria-hidden="true" />
                </button>

                {/* Success State */}
                {isSuccess ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-brand-navy mb-2">
                            Quote Request Sent!
                        </h3>
                        <p className="text-brand-slate mb-6">
                            We&apos;ll get back to you within 2 hours.
                        </p>
                        <button
                            onClick={handleClose}
                            className="bg-brand-navy text-white font-bold px-6 py-3 rounded-full hover:bg-brand-navy/90 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="flex justify-center mb-3">
                                {quoteType === "residential" ? (
                                    <Home className="w-10 h-10 text-action-gold" aria-hidden="true" />
                                ) : quoteType === "commercial" ? (
                                    <Building2 className="w-10 h-10 text-action-gold" aria-hidden="true" />
                                ) : (
                                    <Sparkles className="w-10 h-10 text-action-gold" aria-hidden="true" />
                                )}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy">
                                {getGreeting()}
                            </h3>
                            <p className="text-brand-slate text-sm mt-1">
                                Step {step} of 2
                            </p>
                        </div>

                        {/* Pre-filled Info Banner */}
                        {hasPrefilledData && step === 1 && (
                            <div className="bg-action-gold/10 border border-action-gold/30 rounded-lg p-3 mb-4">
                                <p className="text-sm text-brand-navy">
                                    <span className="font-medium">Your selection:</span>{" "}
                                    {formData.service && <span className="font-bold">{formData.service}</span>}
                                    {formData.service && formData.suburb && " in "}
                                    {formData.suburb && (
                                        <span className="font-bold flex-inline items-center gap-1">
                                            <MapPin className="w-3 h-3 inline" aria-hidden="true" /> {formData.suburb}
                                        </span>
                                    )}
                                </p>
                            </div>
                        )}

                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="sr-only">Your name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="suburb" className="sr-only">Your suburb</label>
                                    <input
                                        id="suburb"
                                        type="text"
                                        placeholder="Your suburb (e.g., Joondalup)"
                                        value={formData.suburb}
                                        onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all"
                                    />
                                </div>
                                <button
                                    onClick={handleNextStep}
                                    disabled={!formData.name || !formData.suburb}
                                    className="w-full bg-action-gold text-brand-navy font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-action-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </button>
                            </div>
                        )}

                        {/* Step 2: Contact Details */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="sr-only">Email address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="sr-only">Phone number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Additional details</label>
                                    <textarea
                                        id="message"
                                        placeholder="Any additional details? (optional)"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all resize-none"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 border border-slate-200 text-brand-slate font-medium py-3 rounded-full hover:bg-slate-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!formData.email || !formData.phone || isLoading}
                                        className="flex-1 bg-brand-navy text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-brand-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                                        ) : (
                                            <>
                                                Send Quote
                                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
