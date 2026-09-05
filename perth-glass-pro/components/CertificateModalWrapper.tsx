"use client";
import { useState, useEffect } from "react";
import { X, Shield } from "lucide-react";
import Image from "next/image";

export function openCertificateModal(type: "insured" | "police") {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-certificate-modal", { detail: { type } }));
    }
}

export default function CertificateModalWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [certType, setCertType] = useState<"insured" | "police" | null>(null);

    // Provide links here when user provides them
    const imageUrls = {
        insured: "", // To be filled
        police: ""   // To be filled
    };

    useEffect(() => {
        const handler = (e: any) => {
            setCertType(e.detail.type);
            setIsOpen(true);
        };
        window.addEventListener("open-certificate-modal", handler);
        return () => window.removeEventListener("open-certificate-modal", handler);
    }, []);

    if (!isOpen) return null;

    const currentUrl = certType ? imageUrls[certType] : "";

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-10 text-gray-800 bg-white/80 p-2 rounded-full hover:bg-white hover:text-gray-900 cursor-pointer shadow">
                    <X className="w-6 h-6" />
                </button>
                <div className="relative w-full aspect-[4/3] md:h-[80vh]">
                    {currentUrl ? (
                        <Image src={currentUrl} alt={certType === "insured" ? "Insurance Certificate" : "Police Clearance"} fill className="object-contain bg-gray-100" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
                            <Shield className="w-12 h-12 mb-4 text-gray-400" />
                            <p className="text-xl font-bold text-gray-700 mb-2">{certType === 'insured' ? '$20M Insurance Policy' : 'Police Clearance Certificate'}</p>
                            <p className="text-sm">Certificate image pending update. The link will be placed here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}