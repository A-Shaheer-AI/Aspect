"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle, Lock } from "lucide-react";
import { sendLeadEmail } from "@/app/actions/send-email";

export default function HomeQuoteForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        suburb: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.phone || !formData.suburb) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const result = await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                email: "No email provided (Quick Form)",
                suburb: formData.suburb,
                serviceType: "General (Quick Form)",
                message: "Submitted from Home Page Quick Form",
            });
            
            if (result.success) {
                setIsSuccess(true);
                setFormData({ name: "", phone: "", suburb: "" });
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

    return (
        <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-xl p-8 sm:p-10 mx-auto">
            {isSuccess ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-brand-navy mb-2">
                        Quote Request Sent!
                    </h3>
                    <p className="text-brand-slate mb-6">
                        We&apos;ll get back to you within 60 minutes.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="bg-action-gold text-brand-navy font-bold px-6 py-3 rounded-full hover:bg-action-gold/90 transition-colors"
                    >
                        Send Another Request
                    </button>
                </div>
            ) : (
                <>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#000080] mb-2">
                            Ready for Spotless Windows?
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base">
                            We&apos;ll reply with a fast quote within 60 minutes.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="quick-name" className="sr-only">Your Name</label>
                            <input
                                id="quick-name"
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all placeholder:text-slate-400"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="quick-phone" className="sr-only">Phone Number</label>
                            <input
                                id="quick-phone"
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all placeholder:text-slate-400"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="quick-suburb" className="sr-only">Your Suburb</label>
                            <input
                                id="quick-suburb"
                                type="text"
                                placeholder="Your Suburb"
                                value={formData.suburb}
                                onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-action-gold focus:ring-2 focus:ring-action-gold/20 outline-none transition-all placeholder:text-slate-400"
                                required
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                                {errorMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-[#FFE75B] text-[#000080] font-bold text-lg px-6 py-4 rounded-xl hover:bg-[#FFE75B]/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Me a Quote
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 text-sm">
                        <Lock className="w-4 h-4 text-amber-500" />
                        <p>We never share your details</p>
                    </div>
                </>
            )}
        </div>
    );
}
