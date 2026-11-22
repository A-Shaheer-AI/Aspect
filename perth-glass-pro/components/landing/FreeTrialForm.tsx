"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { sendLeadEmail } from "@/app/actions/send-email";
import { trackFormCompleted } from "@/hooks/useGtm";
import { getLeadAttribution } from "@/lib/attribution";
import { sanitizePhoneInput } from "@/lib/phone";

export function FreeTrialForm() {
    const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.address) return;
        try {
            const attribution = getLeadAttribution("Landing Page - Free Trial Form");
            await sendLeadEmail({
                name: formData.name,
                phone: formData.phone,
                email: "No Email Provided (Free Trial)",
                suburb: formData.address,
                serviceType: "FREE TRIAL - 2 Windows",
                message: "User requested the 2-window free trial.",
                ...attribution,
            });
            setSubmitted(true);
            trackFormCompleted();
        } catch (error) {
            console.error(error);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="font-bold text-brand-navy">Request Received!</p>
                <p className="text-sm text-gray-500 mt-2">We&apos;ll text you shortly to arrange your free trial.</p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            action="/api/quote"
            method="POST"
            className="flex flex-col gap-3"
        >
            <input type="hidden" name="service" value="FREE TRIAL - 2 Windows" />
            <input type="hidden" name="message" value="User requested the 2-window free trial." />
            <input
                id="trial-name"
                name="name"
                autoComplete="name"
                required
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-base outline-none bg-white border border-gray-200 text-gray-900 focus:border-brand-navy"
            />
            <input
                id="trial-phone"
                name="phone"
                autoComplete="tel-national"
                inputMode="tel"
                required
                type="tel"
                placeholder="0400 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onBlur={(e) => setFormData({ ...formData, phone: sanitizePhoneInput(e.target.value) })}
                className="w-full rounded-xl px-4 py-3 text-base outline-none bg-white border border-gray-200 text-gray-900 focus:border-brand-navy"
            />
            <input
                id="trial-address"
                name="suburb"
                autoComplete="street-address"
                required
                type="text"
                placeholder="Full Property Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full rounded-xl px-4 py-3 text-base outline-none bg-white border border-gray-200 text-gray-900 focus:border-brand-navy"
            />
            <button
                type="submit"
                className="w-full bg-brand-navy text-white font-bold rounded-xl py-3.5 text-sm mt-2 hover:shadow-lg transition-all cursor-pointer"
            >
                Claim 2 Free Windows
            </button>
        </form>
    );
}
