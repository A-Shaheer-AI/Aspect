"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { sendLeadEmail } from "@/app/actions/send-email";
import { trackFormCompleted } from "@/hooks/useGtm";
import { getLeadAttribution } from "@/lib/attribution";
import { sanitizePhoneInput } from "@/lib/phone";

export interface LandingPackageModalProps {
    selectedPkg: { name: string; price: string } | null;
    setSelectedPkg: React.Dispatch<React.SetStateAction<{ name: string; price: string } | null>>;
    isDoubleStorey: boolean;
    setIsDoubleStorey: (val: boolean) => void;
    includeTracks: boolean;
    setIncludeTracks: (val: boolean) => void;
}

export function LandingPackageModal({
    selectedPkg,
    setSelectedPkg,
    isDoubleStorey,
    setIsDoubleStorey,
    includeTracks,
    setIncludeTracks,
}: LandingPackageModalProps) {
    const [pkgForm, setPkgForm] = useState({ name: "", phone: "", suburb: "" });
    const [isPkgSubmitting, setIsPkgSubmitting] = useState(false);
    const [pkgSubmitted, setPkgSubmitted] = useState(false);
    const [pkgError, setPkgError] = useState("");

    if (!selectedPkg) return null;

    const handlePkgSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPkgSubmitting(true);
        setPkgError("");
        try {
            const attribution = getLeadAttribution("Landing Page - Package Selection Modal");
            const res = await sendLeadEmail({
                name: pkgForm.name,
                phone: pkgForm.phone,
                suburb: pkgForm.suburb,
                serviceType: "Residential Window Cleaning",
                storeys: isDoubleStorey ? "Double Storey" : "Single Storey",
                selectedTier: selectedPkg?.name,
                packagePrice: selectedPkg?.price,
                quoteType: "Landing Page Package Selection",
                message: `Selected Price: ${selectedPkg?.price}${includeTracks ? " | Deep Track Restoration Add-On Requested" : ""}`,
                ...attribution,
            });
            if (res.error) throw new Error(res.error);

            trackFormCompleted();
            setPkgSubmitted(true);
            setPkgForm({ name: "", phone: "", suburb: "" });
        } catch (err) {
            setPkgError("Something went wrong. Please try again or call us.");
        } finally {
            setIsPkgSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.85)", WebkitBackdropFilter: "blur(8px)" }}
        >
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative">
                <button
                    onClick={() => {
                        setSelectedPkg(null);
                        setPkgSubmitted(false);
                    }}
                    aria-label="Close package booking"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X className="w-6 h-6" />
                </button>

                {pkgSubmitted ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-2">Thank you!</h3>
                        <p className="text-gray-600">
                            We will reach out soon to confirm your {selectedPkg.name} package.
                        </p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl md:text-2xl font-bold text-brand-navy mb-1">Book Your Package</h3>
                        <p className="text-gray-500 text-xs sm:text-sm mb-4 leading-relaxed">
                            Confirm your property storey type below for exact starting rates.
                        </p>

                        {/* Storey Toggle inside Modal */}
                        <div className="bg-gray-100 p-1 rounded-xl flex gap-1 mb-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDoubleStorey(false);
                                    const newPrice =
                                        selectedPkg.name === "Essential"
                                            ? "Starting From $159"
                                            : selectedPkg.name === "Standard"
                                            ? "Starting From $279"
                                            : "Starting From $479";
                                    setSelectedPkg((prev) => (prev ? { ...prev, price: newPrice } : null));
                                }}
                                className={
                                    "flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer " +
                                    (!isDoubleStorey ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-gray-700")
                                }
                            >
                                Single Storey
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsDoubleStorey(true);
                                    const newPrice =
                                        selectedPkg.name === "Essential"
                                            ? "Starting From $279"
                                            : selectedPkg.name === "Standard"
                                            ? "Starting From $499"
                                            : "Starting From $859";
                                    setSelectedPkg((prev) => (prev ? { ...prev, price: newPrice } : null));
                                }}
                                className={
                                    "flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer " +
                                    (isDoubleStorey ? "bg-brand-navy text-white shadow-sm" : "text-gray-500 hover:text-gray-700")
                                }
                            >
                                Double Storey
                            </button>
                        </div>

                        <div className="p-3 bg-brand-navy/5 rounded-xl border border-brand-navy/10 mb-4 flex items-center justify-between">
                            <div>
                                <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">Package</span>
                                <span className="text-base font-bold text-brand-navy">{selectedPkg.name}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[11px] font-semibold text-gray-500 block uppercase tracking-wider">
                                    {isDoubleStorey ? "Double Storey" : "Single Storey"}
                                </span>
                                <span className="text-base font-black text-brand-navy">{selectedPkg.price}</span>
                            </div>
                        </div>

                        <form onSubmit={handlePkgSubmit} action="/api/quote" method="POST" className="space-y-4 text-left">
                            <input
                                type="hidden"
                                name="service"
                                value={`Residential Window Cleaning - ${selectedPkg.name} (${
                                    isDoubleStorey ? "Double Storey" : "Single Storey"
                                })`}
                            />
                            <input type="hidden" name="storeys" value={isDoubleStorey ? "Double Storey" : "Single Storey"} />
                            <input type="hidden" name="selectedTier" value={selectedPkg.name} />
                            <input type="hidden" name="packagePrice" value={selectedPkg.price} />
                            <input type="hidden" name="message" value={`Selected Price: ${selectedPkg.price}`} />
                            <div>
                                <label htmlFor="pkg-name" className="block text-sm font-bold text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    id="pkg-name"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    type="text"
                                    value={pkgForm.name}
                                    onChange={(e) => setPkgForm({ ...pkgForm, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-gold focus:border-transparent text-base"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="pkg-phone" className="block text-sm font-bold text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    id="pkg-phone"
                                    name="phone"
                                    autoComplete="tel-national"
                                    inputMode="tel"
                                    required
                                    type="tel"
                                    value={pkgForm.phone}
                                    onChange={(e) => setPkgForm({ ...pkgForm, phone: e.target.value })}
                                    onBlur={(e) => setPkgForm({ ...pkgForm, phone: sanitizePhoneInput(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-gold focus:border-transparent text-base"
                                    placeholder="0400 000 000"
                                />
                            </div>
                            <div>
                                <label htmlFor="pkg-suburb" className="block text-sm font-bold text-gray-700 mb-1">
                                    Suburb
                                </label>
                                <input
                                    id="pkg-suburb"
                                    name="suburb"
                                    autoComplete="address-level2"
                                    required
                                    type="text"
                                    value={pkgForm.suburb}
                                    onChange={(e) => setPkgForm({ ...pkgForm, suburb: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-gold focus:border-transparent text-base"
                                    placeholder="e.g. Subiaco"
                                />
                            </div>
                            {selectedPkg.name === "Standard" && (
                                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-amber-200 bg-amber-50/80 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={includeTracks}
                                        onChange={(e) => setIncludeTracks(e.target.checked)}
                                        className="mt-0.5 rounded text-brand-navy focus:ring-action-gold w-4 h-4 cursor-pointer"
                                    />
                                    <div className="text-xs leading-tight text-brand-navy">
                                        <span className="font-bold">Add Deep Track &amp; Sliding Channel Scrubbing</span>
                                        <span className="block text-[11px] text-gray-600 mt-0.5">
                                            (Optional Add-On: basic wipe included for maintained tracks. Check this if tracks have
                                            heavy insects, dirt or sand).
                                        </span>
                                    </div>
                                </label>
                            )}
                            {pkgError && <p className="text-red-500 text-sm font-semibold">{pkgError}</p>}
                            <button
                                disabled={isPkgSubmitting}
                                type="submit"
                                className="w-full bg-action-gold text-brand-navy font-bold py-4 rounded-xl hover:shadow-lg transition-all cursor-pointer"
                            >
                                {isPkgSubmitting ? "Booking..." : "Book Now \u2192"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
