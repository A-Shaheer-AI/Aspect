"use client";
import { openCertificateModal } from "@/components/CertificateModalWrapper";

export default function ClickableBadge({ type, children, className }: { type?: "insured" | "police", children: React.ReactNode, className?: string }) {
    if (type) {
        return (
            <button 
                type="button" 
                onClick={() => openCertificateModal(type)}
                className={`w-full text-left cursor-pointer ${className}`}
            >
                {children}
            </button>
        );
    }
    
    return (
        <div className={className}>
            {children}
        </div>
    );
}