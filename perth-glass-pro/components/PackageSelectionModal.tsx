"use client";
import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

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

    if (!isOpen) return null;

    const handlePkgSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPkgSubmitting(true);
        try {
            const res = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: pkgForm.name,
                    phone: pkgForm.phone,
                    suburb: pkgForm.suburb,
                    serviceType: "Residential Window Cleaning",
                    storeys: storeys || "Unspecified",
                    selectedTier: packageName,
                    quoteType: "Pricing Page Package Selection",
                    message: packagePrice ? `Selected Price: ${packagePrice}` : "Package selected",
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
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative">
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
                        <h3 className="text-xl md:text-2xl font-bold text-[#00173C] mb-2">Book Your Package</h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            You have selected the <strong className="text-[#00173C]">{packageName}</strong> package{packagePrice ? ` (${packagePrice})` : ''}. Please provide your details to lock this in.
                        </p>
                        
                        <form onSubmit={handlePkgSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="block text-xs font-bold text-[#00173C] uppercase tracking-wider mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={pkgForm.name}
                                    onChange={(e) => setPkgForm({...pkgForm, name: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#00173C] uppercase tracking-wider mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={pkgForm.phone}
                                    onChange={(e) => setPkgForm({...pkgForm, phone: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                    placeholder="Your Phone Number"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#00173C] uppercase tracking-wider mb-1">Suburb</label>
                                <input
                                    type="text"
                                    required
                                    value={pkgForm.suburb}
                                    onChange={(e) => setPkgForm({...pkgForm, suburb: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                                    placeholder="Your Suburb"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isPkgSubmitting}
                                className="w-full py-4 bg-[#D4AF37] text-[#00173C] font-bold text-lg rounded-xl hover:bg-[#ffe54d] transition-colors disabled:opacity-70 mt-2"
                            >
                                {isPkgSubmitting ? "Submitting..." : "Request Call Back"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}