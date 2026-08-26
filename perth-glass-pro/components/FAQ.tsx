"use client";

import { useState } from "react";

type FAQItem = {
    question: string;
    answer: string | React.ReactNode;
};

type Faqs = {
    faqs: FAQItem[];
    title: string;
}

export default function FAQ({ faqs, title }: Faqs) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faqs" className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">

                <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-5">
                    Frequently Asked Questions
                </h2>

                <p className="text-center text-brand-slate mb-8">
                    {title}
                </p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="w-full text-left p-5 font-semibold flex justify-between items-center cursor-pointer"
                            >
                                {faq.question}
                                <span className="text-xl">
                                    {openIndex === index ? "-" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="p-5 pt-0 text-brand-slate">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
