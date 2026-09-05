"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import PackageSelectionModal from "@/components/PackageSelectionModal";

export default function PricingPackages() {
    const [selectedPkg, setSelectedPkg] = useState<{ name: string } | null>(null);

    return (
        <>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Essential */}
                <button
                    onClick={() => setSelectedPkg({ name: "Essential" })}
                    className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-action-gold/50 relative flex flex-col text-left cursor-pointer hover:shadow-xl transition-all group"
                >
                    <h3 className="text-2xl font-bold text-brand-navy mb-2 group-hover:text-action-gold transition-colors">Essential</h3>
                    <p className="text-gray-500 mb-6">External standard clean only</p>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">Exterior glass cleaning using Basic Wash techniques</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">Removal of general environmental dirt and dust</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">Perfect for quick touch-ups before an event or inspection</span>
                        </li>
                    </ul>
                    <div className="w-full py-3 bg-gray-200 group-hover:bg-brand-navy rounded-xl font-bold text-sm text-gray-700 group-hover:text-white transition-colors text-center flex items-center justify-center gap-2">
                        Book Essential <ArrowRight className="w-4 h-4" />
                    </div>
                </button>

                {/* Standard */}
                <button
                    onClick={() => setSelectedPkg({ name: "Standard" })}
                    className="bg-brand-navy rounded-3xl p-8 border border-brand-navy shadow-xl relative flex flex-col transform md:-translate-y-4 text-left cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all group"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-gold text-brand-navy px-4 py-1 rounded-full text-sm font-bold tracking-wide whitespace-nowrap">MOST POPULAR</div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-action-gold transition-colors">Standard</h3>
                    <p className="text-brand-water mb-6">Inside and out basic wash</p>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                            <span className="text-gray-200">Both interior and exterior glass cleaning</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                            <span className="text-gray-200">Major spots will be removed</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                            <span className="text-gray-200">Expect a 90% finish suitable for most people and regular maintenance</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                            <span className="text-gray-200">Includes wiping all frames, sills, and flyscreens</span>
                        </li>
                    </ul>
                    <div className="w-full py-3 bg-action-gold rounded-xl font-bold text-sm text-brand-navy group-hover:bg-white transition-colors text-center flex items-center justify-center gap-2">
                        Book Standard <ArrowRight className="w-4 h-4" />
                    </div>
                </button>

                {/* Supreme */}
                <button
                    onClick={() => setSelectedPkg({ name: "Supreme" })}
                    className="bg-white rounded-3xl p-8 border-2 border-action-gold shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:shadow-[0_0_40px_rgba(251,191,36,0.45)] relative flex flex-col text-left cursor-pointer hover:scale-[1.02] transition-all group"
                >
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-action-gold text-brand-navy px-4 py-1 rounded-full text-sm font-bold tracking-wide">PREMIUM</div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-2 group-hover:text-action-gold transition-colors">Supreme</h3>
                    <p className="text-gray-500 mb-6">Inside and out detailing</p>
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">Restorative interior and exterior glass detailing</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">Removal of all stuck-on items (paint, hard water stains, calcification)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">Custom packages if only some panels need intense detail</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700">Deep cleaning of all frames, sills, and flyscreens</span>
                        </li>
                    </ul>
                    <div className="w-full py-3 bg-action-gold rounded-xl font-bold text-sm text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors text-center flex items-center justify-center gap-2">
                        Book Supreme <ArrowRight className="w-4 h-4" />
                    </div>
                </button>
            </div>

            {/* Package Selection Modal */}
            <PackageSelectionModal
                isOpen={!!selectedPkg}
                onClose={() => setSelectedPkg(null)}
                packageName={selectedPkg?.name ?? ""}
            />
        </>
    );
}
