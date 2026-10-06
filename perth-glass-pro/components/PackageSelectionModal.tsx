"use client";
import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { getLeadAttribution } from "@/lib/attribution";
import { sanitizePhoneInput } from "@/lib/phone";

type PackageSelectionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    packageName: string;
    packagePrice?: string;
    storeys?: string;
};

export default function PackageSelectionModal({ isOpen, onClose, packageName, packagePrice, storeys }: PackageSelectionModalProps) {
    const [pkgForm, setPkgForm] = useState({ name: "", phone: "", suburb: "" });
    const [isPkgSubmitting, setIsPkgSubmitting] = useState(false);
    const [pkgSubmitted, setPkgSubmitted] = useState(false);
    const [isDoubleStorey, setIsDoubleStorey] = useState(
        storeys ? storeys.toLowerCase().includes("double") : false
    );

    if (!isOpen) return null;

    const getPackageRate = (pkg: string, isDouble: boolean) => {
        const clean = (pkg || "").toLowerCase();
        if (clean.includes("essential")) return isDouble ? "Starting From $279" : "Starting From $159";
        if (clean.includes("standard")) return isDouble ? "Starting From $499" : "Starting From $279";
        if (clean.includes("supreme")) return isDouble ? "Starting From $859" : "Starting From $479";
        return packagePrice || (isDouble ? "Starting From $279" : "Starting From $159");
    };

    const activePrice = getPackageRate(packageName, isDoubleStorey);
    const activeStoreys = isDoubleStorey ? "Double Storey" : "Single Storey";

    const handlePkgSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPkgSubmitting(true);
        try {
            const attribution = getLeadAttribution("Pricing Page - Package Selection Modal");
            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: pkgForm.name,
                    phone: pkgForm.phone,
                    suburb: pkgForm.suburb,
                    serviceType: "Residential Window Cleaning",
                    storeys: activeStoreys,
                    selectedTier: packageName,
                    packagePrice: activePrice,
                    quoteType: "Pricing Page Package Selection",
                    message: `Selected Price: ${activePrice}`,
                    ...attribution,
                }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            
            setPkgSubmitted(true);
            setPkgForm({ name: "", phone: "", suburb: "" });
        } catch (error) {
            console.error("Error submitting package form:", error);
            alert("Something went wrong. Please try again or call us.");
        } finally {
            setIsPkgSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative max-h-[92vh] overflow-y-auto my-auto">
                <button onClick={() => { onClose(); setPkgSubmitted(false); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 cursor-pointer">
                    <X className="w-6 h-6" />
                </button>
                
                {pkgSubmitted ? (
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#00173C] mb-2">Thank you!</h3>
                        <p className="text-gray-600 mb-2">We will reach out soon to confirm your {packageName} package.</p>
                        <p className="text-[#D4AF37] font-bold">We will get back to you within 60 mins.</p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl md:text-2xl font-bold text-[#00173C] mb-1">Book Your Package</h3>
                        <p className="text-gray-500 text-xs sm:text-sm mb-4 leading-relaxed">
                            Confirm your property storey type below for exact starting rates.
                        </p>

                        {/* Storey Toggle inside Modal */}
                        <div className="bg-gray-100 p-1 rounded-xl flex gap-1 mb-4">
                            <button
                                type="button"
                                onClick={() => setIsDoubleStorey(false)}
                                className={"flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer " + (!isDoubleStorey ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-gray-700")}
                            >
                                Single Storey
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsDoubleStorey(true)}
                                className={"flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer " + (isDoubleStorey ? "bg-brand-navy text-white shadow-sm" : "text-gray-500 hover:text-gray-700")}
                            >
                                Double Storey
                            </button>
                        </div>

                        <div className="p-3 bg-brand-navy/5 rounded-xl border border-brand-navy/10 mb-4 flex items-center justify-between">
                            <div>
                                <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">Package</span>
                                <span className="text-base font-bold text-brand-navy">{packageName}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">{activeStoreys}</span>
                                <span className="text-base font-black text-brand-navy">{activePrice}</span>
                            </div>
                        </div>
                        
                        <form onSubmit={handlePkgSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-bold text-[#00173C] uppercase tracking-wider mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={pkgForm.name}
                                    onChange={(e) => setPkgForm({...pkgForm, name: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-base transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#00173C] uppercase tracking-wider mb-1">Phone Number</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel-national"
                                    required
                                    value={pkgForm.phone}
                                    onChange={(e) => setPkgForm({...pkgForm, phone: sanitizePhoneInput(e.target.value)})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-base transition-all"
                                    placeholder="0400 000 000"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#00173C] uppercase tracking-wider mb-1">Suburb</label>
                                <input
                                    type="text"
                                    required
                                    value={pkgForm.suburb}
                                    onChange={(e) => setPkgForm({...pkgForm, suburb: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-base transition-all"
                                    placeholder="Your Suburb"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isPkgSubmitting}
                                className="w-full py-4 bg-[#D4AF37] text-[#00173C] font-bold text-lg rounded-xl hover:bg-[#ffe54d] transition-colors disabled:opacity-70 mt-2 cursor-pointer"
                            >
                                {isPkgSubmitting ? "Submitting..." : "Lock In Package \u2192"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}