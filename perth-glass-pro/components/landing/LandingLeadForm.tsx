"use client";

import { CheckCircle2 } from "lucide-react";

export interface LandingLeadFormProps {
    submitted: boolean;
    showPromo?: boolean;
    formData: { name: string; phone: string; suburb: string; promo?: string };
    setFormData: (d: { name: string; phone: string; suburb: string; promo?: string }) => void;
    onSubmit: () => void;
    dark?: boolean;
    includeTracks?: boolean;
    setIncludeTracks?: (v: boolean) => void;
}

export function LeadForm({
    submitted,
    formData,
    setFormData,
    onSubmit,
    dark = false,
    showPromo = true,
    includeTracks = false,
    setIncludeTracks,
}: LandingLeadFormProps) {
    const fields = [
        { key: "name", placeholder: "Your Name", type: "text", autoComplete: "name" },
        { key: "phone", placeholder: "Phone Number", type: "tel", autoComplete: "tel" },
        { key: "suburb", placeholder: "Your Suburb", type: "text", autoComplete: "address-level2" },
        { key: "promo", placeholder: "Promo Code", type: "text", autoComplete: "off" },
    ];

    if (submitted) {
        return (
            <div className="flex flex-col items-center gap-3 py-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
                <p className="font-bold text-center" style={{ color: dark ? "#fff" : "#07077E" }}>
                    We&apos;ll text you shortly!
                </p>
                <p className="text-sm text-center" style={{ color: dark ? "rgba(255,255,255,0.6)" : "#888" }}>
                    Usually within 60 minutes.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            action="/api/quote"
            method="POST"
            className="flex flex-col gap-2.5 text-left"
        >
            <input type="hidden" name="source" value="landing-lead-form" />
            <input type="hidden" name="service" value="Residential Window Cleaning" />
            <input type="hidden" name="tracksAddon" value={includeTracks ? "Yes - Deep Track Detailing" : "No"} />
            {fields
                .filter((f) => !(f.key === "promo" && !showPromo))
                .map((f) => (
                    <input
                        key={f.key}
                        name={f.key}
                        id={`lead-${f.key}`}
                        autoComplete={f.autoComplete}
                        type={f.type}
                        placeholder={f.placeholder}
                        value={formData[f.key as keyof typeof formData] || ""}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        required={f.key !== "promo"}
                        className="w-full rounded-xl px-4 py-3 text-base outline-none transition-all"
                        style={{
                            background: dark ? "rgba(255,255,255,0.92)" : "#f4f6ff",
                            border: "1.5px solid",
                            borderColor: dark ? "transparent" : "#e0e6f5",
                            color: "#1a1a2e",
                            fontFamily: "inherit",
                        }}
                    />
                ))}
            {setIncludeTracks && (
                <label
                    className="flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer select-none transition-all"
                    style={{
                        background: dark ? "rgba(255,255,255,0.08)" : "#f8faff",
                        borderColor: dark ? "rgba(255,229,77,0.3)" : "#e0e6f5",
                        color: dark ? "#fff" : "#07077E",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={includeTracks}
                        onChange={(e) => setIncludeTracks(e.target.checked)}
                        className="mt-0.5 rounded cursor-pointer w-4 h-4 text-action-gold focus:ring-action-gold shrink-0"
                    />
                    <div className="text-xs leading-snug">
                        <span className="font-bold">Add Deep Track &amp; Sliding Door Scrubbing</span>
                        <span className="block text-[11px] opacity-75 mt-0.5">
                            (Optional Add-On: dislodges stubborn sand, grease &amp; heavy insect buildup)
                        </span>
                    </div>
                </label>
            )}
            <button
                type="submit"
                className="w-full rounded-xl py-3.5 text-sm font-bold mt-1 transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{
                    background: "#FFE54D",
                    color: "#07077E",
                    boxShadow: "0 4px 20px rgba(255,229,77,0.4)",
                }}
            >
                Send Me a Quote ➔
            </button>
            <p className="text-center text-xs mt-1" style={{ color: dark ? "rgba(255,255,255,0.45)" : "#aaa" }}>
                🔒 We never share your details
            </p>
        </form>
    );
}
