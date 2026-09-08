"use client";

import { useState } from "react";

type FAQItem = {
    question: string;
    answer: string | React.ReactNode;
};

type Faqs = {
    faqs: FAQItem[];
    title?: string;
};

export default function FAQ({ faqs, title }: Faqs) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faqs" className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-4">
                    Frequently Asked Questions
                </h2>

                {title ? (
                    <p className="text-center text-brand-slate mb-8 max-w-2xl mx-auto">
                        {title}
                    </p>
                ) : (
                    <p className="text-center text-brand-slate mb-8 max-w-2xl mx-auto text-sm sm:text-base">
                        Everything you need to know about our cleaning processes, pricing, equipment, and satisfaction guarantee.
                    </p>
                )}

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border border-slate-200 rounded-xl overflow-hidden transition-colors hover:border-slate-300"
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    aria-expanded={isOpen}
                                    className="w-full text-left p-5 font-semibold flex justify-between items-center cursor-pointer gap-4 text-brand-navy hover:text-action-gold transition-colors"
                                >
                                    <span className="text-base sm:text-lg leading-snug">{faq.question}</span>
                                    <span className="text-xl font-bold flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-brand-navy">
                                        {isOpen ? "−" : "+"}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="p-5 pt-0 text-brand-slate leading-relaxed text-sm sm:text-base border-t border-slate-100 bg-slate-50/50">
                                        <div className="pt-3">{faq.answer}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
