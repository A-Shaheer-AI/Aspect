import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Clock } from "lucide-react";
import AreasServed from "@/components/AreasServed";

const SERVICES_DATA: Record<string, {
    title: string;
    description: string;
    metaDescription: string;
    benefits: string[];
    process: { title: string; description: string }[];
    serviceType: 'window' | 'solar' | 'commercial' | 'gutter' | 'pressure';
}> = {
    'window-cleaning': {
        title: 'Window Cleaning',
        description: 'Professional residential and commercial window cleaning in Perth.',
        metaDescription: 'Expert window cleaning services in Perth. Streak-free results using pure water technology.',
        serviceType: 'window',
        benefits: ['Streak-free results', 'Pure water technology', 'Safe multi-story access', 'Fully insured', 'Eco-friendly solutions', 'Regular maintenance packages'],
        process: [
            { title: 'Assessment', description: 'Inspect windows and identify requirements.' },
            { title: 'Pure Water Clean', description: 'Use deionized water for spotless finish.' },
            { title: 'Detail Work', description: 'Frames, sills, and tracks cleaned.' },
            { title: 'Inspection', description: 'Walk-through to ensure perfection.' },
        ],
    },
    'solar-panel-washing': {
        title: 'Solar Panel Washing',
        description: 'Maximize energy output with professional solar panel cleaning.',
        metaDescription: 'Professional solar panel cleaning in Perth. Increase efficiency by up to 30%.',
        serviceType: 'solar',
        benefits: ['Increase output by 30%', 'Extend panel lifespan', 'Manufacturer-approved', 'No harsh chemicals', 'Before & after reports', 'Scheduled maintenance'],
        process: [
            { title: 'Efficiency Check', description: 'Measure baseline energy output.' },
            { title: 'Gentle Wash', description: 'Purified water and soft brushes.' },
            { title: 'Inspection', description: 'Check for damage during cleaning.' },
            { title: 'Report', description: 'Compare before and after readings.' },
        ],
    },
    'commercial-cleaning': {
        title: 'Commercial Window Cleaning',
        description: 'High-reach EWP and rope access for offices and high-rise buildings.',
        metaDescription: 'Commercial window cleaning specialists in Perth. Cherry picker and rope access.',
        serviceType: 'commercial',
        benefits: ['Certified EWP technicians', 'Flexible scheduling', 'Safety documentation', 'Strata-friendly', 'Multi-building contracts', 'First-class results'],
        process: [
            { title: 'Site Inspection', description: 'Assess access and safety requirements.' },
            { title: 'Safety Planning', description: 'JSAs and risk assessments prepared.' },
            { title: 'Execution', description: 'Professional crew with proper equipment.' },
            { title: 'QA', description: 'Final walkthrough with property manager.' },
        ],
    },
    'gutter-cleaning': {
        title: 'Gutter Cleaning',
        description: 'Prevent water damage with professional gutter cleaning.',
        metaDescription: 'Professional gutter cleaning in Perth. Prevent leaks and water damage.',
        serviceType: 'gutter',
        benefits: ['Prevent leaks', 'Remove debris & nests', 'Downpipe flushing', 'Roof inspection', 'Before & after photos', 'Seasonal packages'],
        process: [
            { title: 'Roof Access', description: 'Safe access via ladders or EWP.' },
            { title: 'Debris Removal', description: 'Manual removal and bagging.' },
            { title: 'Flush', description: 'Downpipes flushed for drainage.' },
            { title: 'Inspection', description: 'Check for rust or damage.' },
        ],
    },
    'pressure-washing': {
        title: 'Pressure Washing',
        description: 'Revitalize driveways and outdoor areas.',
        metaDescription: 'Professional pressure washing in Perth. Driveways, patios, and more.',
        serviceType: 'pressure',
        benefits: ['Remove years of grime', 'Revitalize surfaces', 'Safe for all surfaces', 'Eco-friendly detergents', 'Prevent slippery surfaces', 'Improve curb appeal'],
        process: [
            { title: 'Assessment', description: 'Identify material and pressure settings.' },
            { title: 'Pre-Treatment', description: 'Eco-friendly degreaser applied.' },
            { title: 'Wash', description: 'Systematic high-pressure cleaning.' },
            { title: 'Rinse', description: 'Final rinse for clean finish.' },
        ],
    },
};

export async function generateStaticParams() {
    return Object.keys(SERVICES_DATA).map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
    const { service } = await params;
    const data = SERVICES_DATA[service];
    if (!data) return { title: 'Service Not Found' };
    return { title: data.title, description: data.metaDescription };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
    const { service } = await params;
    const data = SERVICES_DATA[service];
    if (!data) notFound();

    return (
        <div className="min-h-screen bg-brand-snow">
            {/* Hero */}
            <section className="bg-brand-navy text-white py-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{data.title}</h1>
                    <p className="text-xl text-brand-water/80 max-w-2xl mx-auto mb-8">{data.description}</p>
                    <Link href="/quote" className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90">
                        Get Free Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">Why Choose Our {data.title}?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-action-gold flex-shrink-0" />
                                <span className="text-brand-slate">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 bg-brand-snow">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">Our Process</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {data.process.map((step, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 rounded-full bg-action-gold text-brand-navy font-bold text-xl flex items-center justify-center mx-auto mb-4">{i + 1}</div>
                                <h3 className="font-bold text-brand-navy mb-2">{step.title}</h3>
                                <p className="text-sm text-brand-slate">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust */}
            <section className="py-12 bg-white border-y border-slate-200">
                <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="flex items-center gap-3 text-brand-slate"><Shield className="w-8 h-8 text-action-gold" /><span className="font-medium">Fully Insured</span></div>
                    <div className="flex items-center gap-3 text-brand-slate"><Sparkles className="w-8 h-8 text-action-gold" /><span className="font-medium">Satisfaction Guaranteed</span></div>
                    <div className="flex items-center gap-3 text-brand-slate"><Clock className="w-8 h-8 text-action-gold" /><span className="font-medium">Same Week Booking</span></div>
                </div>
            </section>

            {/* SEO Loop */}
            <AreasServed serviceType={data.serviceType} />

            {/* Final CTA */}
            <section className="bg-brand-navy text-white py-16">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-brand-water/80 mb-8">Contact us for a free quote on {data.title.toLowerCase()}.</p>
                    <Link href="/quote" className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90">
                        Get Your Free Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
