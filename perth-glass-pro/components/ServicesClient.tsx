"use client";

import { useState } from "react";
import Link from "next/link";
import QuoteModal from "./QuoteModal";
import { Home, Building2, Sparkles, Droplets, Wind, ArrowRight } from "lucide-react";

type Service = {
    id: string;
    title: string;
    description: string;
    iconName: string;
    servicePage: string;
};

type ServicesClientProps = {
    SERVICES: Service[];
    suburbName: string;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home,
    Building2,
    Sparkles,
    Droplets,
    Wind,
};

export default function ServicesClient({ SERVICES, suburbName }: ServicesClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string>("");

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                    Services Available in {suburbName}
                </h2>

                {SERVICES.map((service, index) => {
                    const Icon = iconMap[service.iconName];

                    return (
                        <section key={service.id} className={`py-8 md:py-10 ${index !== SERVICES.length - 1 ? 'border-b border-slate-200' : ''}`}>
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-action-gold/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-action-gold" />
                                </div>

                                <div>
                                    <h3 className="text-xl md:text-2xl font-heading font-bold text-brand-navy mb-2">
                                        {service.title} in {suburbName}
                                    </h3>

                                    <p className="text-gray-600 mb-4">
                                        {service.description}
                                    </p>

                                    <div className="flex gap-3 items-center">
                                        <button
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setSelectedServices(service.title)
                                            }}
                                            className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-5 py-2.5 rounded-full hover:bg-action-gold/90 transition-colors text-sm cursor-pointer"
                                        >
                                            Get Quote <ArrowRight className="w-4 h-4" />
                                        </button>

                                        <Link href={service.servicePage} className="underline">
                                            Learn more {service.title.toLowerCase()} →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* MODAL */}
            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                quoteType="general"
                initialService={selectedServices}
            />
        </>
    );
}