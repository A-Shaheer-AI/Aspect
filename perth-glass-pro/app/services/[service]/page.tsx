import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Sparkles, Clock } from "lucide-react";
import AreasServed from "@/components/AreasServed";

const SERVICES_DATA: Record<string, {
    title: string;
    serviceTitle?: string;
    description: string;
    metaDescription: string;
    benefits: string[];
    process: { title: string; description: string }[];
    serviceType: 'window' | 'solar' | 'commercial' | 'gutter' | 'pressure';
}> = {
    'window-cleaning': {
        title: 'Window Cleaning',
        serviceTitle: "Window Cleaning in Perth",
        description: 'Professional residential and commercial window cleaning in Perth.',
        metaDescription: 'Expert window cleaning services in Perth. Streak-free results using pure water technology.',
        serviceType: 'window',
        benefits: ['Streak-free window cleaning results', 'Advanced pure water window cleaning technology', 'Safe multi-storey window cleaning access', 'Fully insured professional window cleaners', 'Eco-friendly, chemical-free cleaning solutions', 'Flexible regular window maintenance packages'],
        process: [
            {
                title: 'Assessment',
                description: 'Thorough window inspection to assess glass condition and cleaning requirements.'
            },
            {
                title: 'Pure Water Clean',
                description: 'Use of deionized pure water system for a spotless, streak-free exterior finish.'
            },
            {
                title: 'Detail Work',
                description: 'Window frames, sills, and tracks professionally cleaned and restored.'
            },
            {
                title: 'Inspection',
                description: 'Complete quality check to ensure flawless window cleaning results.'
            },
        ],
    },
    'solar-panel-washing': {
        title: 'Solar Panel Washing ',
        serviceTitle: "Solar Panel Cleaning Service in Perth",
        description: 'Maximize energy output with professional solar panel cleaning.',
        metaDescription: 'Professional solar panel cleaning in Perth. Increase efficiency by up to 30%.',
        serviceType: 'solar',
        benefits: ['Boost solar panel efficiency by up to 30%', 'Prolong the life and efficiency of solar panels', 'Approved solar panel cleaning techniques', 'Chemical-free cleaning with pure water', 'Before and after efficiency comparison', 'Regular solar panel maintenance schedules'],
        process: [
            {
                title: 'Efficiency Check',
                description: 'Test the initial solar energy efficiency and performance.'
            },
            {
                title: 'Gentle Wash',
                description: 'Clean solar panels with purified water and soft brushes.'
            },
            {
                title: 'Inspection',
                description: 'Assess solar panel damage, debris accumulation, and efficiency during cleaning.'
            },
            {
                title: 'Report',
                description: 'Compare the solar efficiency difference before and after cleaning.'
            },
        ],
    },
    'commercial-cleaning': {
        title: 'Commercial Window Cleaning',
        serviceTitle: "Commercial Window Cleaning in Perth",
        description: 'High-reach EWP and rope access for offices and high-rise buildings.',
        metaDescription: 'Commercial window cleaning specialists in Perth. Cherry picker and rope access.',
        serviceType: 'commercial',
        benefits: ['Experienced EWP operators for high-rise window cleaning', 'Flexible commercial cleaning schedules', 'Full safety documentation and compliance', 'Strata-friendly commercial window cleaning service', 'Multi-building commercial cleaning contracts', 'First-class, streak-free commercial cleaning results'],
        process: [
            {
                title: 'Site Inspection',
                description: 'Evaluation of building access, height requirements, and safety compliance requirements.'
            },
            {
                title: 'Safety Planning',
                description: 'JSAs, risk assessments, and commercial safety documentation developed.'
            },
            {
                title: 'Execution',
                description: 'Experienced commercial window cleaning team with certified equipment and water-fed poles.'
            },
            {
                title: 'QA',
                description: 'Final quality assurance inspection with property or strata manager.'
            },
        ],
    },
    'gutter-cleaning': {
        title: 'Gutter Cleaning',
        serviceTitle: "Gutter Cleaning Service in Perth",
        description: 'Prevent water damage with professional gutter cleaning.',
        metaDescription: 'Professional gutter cleaning in Perth. Prevent leaks and water damage.',
        serviceType: 'gutter',
        benefits: ['Stop roof leaks and water damage', 'Clean gutter debris, leaves, and bird nests', 'Professional downpipe flush service', 'Roof and gutter inspection included', 'Before and after gutter cleaning photos', 'Annual gutter maintenance packages'],
        process: [
            { title: 'Roof Access', description: 'Access to your roof via ladders or EWP for high or multi-level homes.' },
            { title: 'Debris Removal', description: 'Manual gutter debris removal and bagging for a complete clean.' },
            { title: 'Flush', description: 'Downpipes flushed to ensure correct water flow and drainage.' },
            { title: 'Inspection', description: 'Final gutter and roof inspection to check for rust, obstructions, or damage.' },
        ],
    },
    'pressure-washing': {
        title: 'Pressure Washing',
        serviceTitle: "Pressure Washing in Perth",
        description: 'Revitalize driveways and outdoor areas.',
        metaDescription: 'Professional pressure washing in Perth. Driveways, patios, and more.',
        serviceType: 'pressure',
        benefits: ['Strip away years of grime and dirt accumulation', 'Restore driveways, pavers, and exterior surfaces', 'Pressure washing safely for all surfaces', 'Eco-friendly pressure cleaning detergents', 'Prevent slippery surfaces and moss growth', 'Enhance property curb appeal'],
        process: [
            { title: 'Assessment', description: 'Determine the surface type and adjust pressure cleaning settings accordingly.' },
            { title: 'Pre-Treatment', description: 'Use eco-friendly degreaser to break down dirt, oil, and stains.' },
            { title: 'Wash', description: 'Methodical high-pressure cleaning to thoroughly restore surfaces.' },
            { title: 'Rinse', description: 'Methodical high-pressure cleaning to thoroughly restore surfaces.' },
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
    return {
        title: `${data.serviceTitle} | Window Cleaning Perth | Aspect Window Cleaning`,
        description: data.metaDescription
    };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
    const { service } = await params;
    const data = SERVICES_DATA[service];
    if (!data) notFound();

    return (
        <div className="min-h-screen bg-brand-snow">
            {/* Hero */}
            <section className="bg-brand-navy text-white pt-32 pb-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        {data.title}
                    </h1>
                    <p className="text-xl text-brand-water/80 max-w-2xl mx-auto mb-8">
                        {data.description}
                    </p>
                    <Link href="/quote" className="inline-flex items-center gap-2 bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:bg-action-gold/90">
                        Get Free Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                        Why Choose Our {data.serviceTitle}?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-action-gold flex-shrink-0" />
                                <span className="text-brand-slate">
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 bg-brand-snow">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-brand-navy text-center mb-12">
                        Our Professional Window Cleaning Process
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {data.process.map((step, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 rounded-full bg-action-gold text-brand-navy font-bold text-xl flex items-center justify-center mx-auto mb-4">
                                    {i + 1}
                                </div>
                                <h3 className="font-bold text-brand-navy mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-brand-slate">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust */}
            <section className="py-12 bg-white border-y border-slate-200">
                <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
                    <div className="flex items-center gap-3 text-brand-slate">
                        <Shield className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">Fully Insured</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-slate">
                        <Sparkles className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">Satisfaction Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-slate">
                        <Clock className="w-8 h-8 text-action-gold" />
                        <span className="font-medium">Same Week Booking</span>
                    </div>
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
