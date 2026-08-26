import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import { ChevronsRight } from "lucide-react";
import CTA from "@/components/CTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type FaqsType = {
    question: string;
    answer: string;
}

export const metadata: Metadata = {
    title: "Gutter Cleaning Perth | Roof & Downpipe Clearing | Aspect Window Cleaning",
    description:
        "Professional gutter cleaning in Perth. Leaf removal, downpipe clearing & roof valley cleaning. Prevent water damage & pests. Fully insured. Free quotes.",
};

const whatsInclude = [
    {
        icon: ChevronsRight,
        title: "Leaf & Debris Removal",
        description:
            "Full removal of eucalyptus leaves, pine needles, seed pods, dirt, and organic buildup from every metre of guttering and roof valley - nothing left to block your system.",
    },
    {
        icon: ChevronsRight,
        title: "Downpipe Clearing",
        description:
            "We flush every downpipe from roof to drain to confirm unobstructed flow. Blocked downpipes cause overflow at the worst possible time - during Perth's winter storms.",
    },
    {
        icon: ChevronsRight,
        title: "Gutter Inspection",
        description:
            "As we work, we check for cracks, rust spots, sagging sections, loose brackets, and pitch problems that prevent proper drainage - and flag anything that needs attention before it becomes expensive.",
    },
    {
        icon: ChevronsRight,
        title: "Safe Debris Disposal",
        description:
            "All collected debris is bagged and removed from your property. We don't leave a pile of wet leaves on your lawn or driveway - the job isn't done until everything is clean.",
    },
    {
        icon: ChevronsRight,
        title: "Roof Valley Cleaning",
        description:
            "Roof valleys are where water concentrates during rain - and where blockages cause the most serious damage. We clear every valley thoroughly, not just the visible gutters.",
    },
    {
        icon: ChevronsRight,
        title: "Post-Clean Flush Test",
        description:
            "After cleaning, we run water through the entire system to verify full, unrestricted flow from roof to drain. It's the only way to be certain the job is actually done.",
    },
];

const benefitsOfGutterCleaning = [
    {
        number: "01",
        title: "Prevent Water Damage to Walls & Foundations",
        description:
            "Perth's winters bring intense, concentrated rainfall after months of dry conditions. Blocked gutters during the first heavy storm of the season overflow rapidly - directing water against walls and foundations, causing dampness, mould, and structural cracking that costs thousands to repair. Clean gutters route every drop safely away.",
    },
    {
        number: "02",
        title: "Avoid Pest Infestations",
        description:
            "Damp, debris-filled gutters are prime real estate for mosquitoes, paper wasps, and roof rats - particularly during Perth's warm shoulder seasons. The decaying organic matter and standing water create an ideal breeding environment. Regular cleaning eliminates the habitat entirely.",
    },
    {
        number: "03",
        title: "Protect Your Roof & Fascia",
        description:
            "Debris traps moisture against your fascia boards and roof edges for weeks after rain, accelerating rot and rust in ways you can't see from the ground. We've seen fascia boards replaced at $1,500+ that would have been perfectly fine with twice-yearly gutter maintenance.",
    },
    {
        number: "04",
        title: "Prevent Sagging & Structural Failure",
        description:
            "A single section of gutter packed with saturated eucalyptus leaves can carry 15-20kg - many times more than it was designed to hold. That weight causes brackets to fail, gutters to pull away from fascia, and full sections to collapse. Clean gutters weigh next to nothing.",
    },
];

const whyAspectPoints = [
    {
        title: "Experienced & Trained Technicians",
        description:
            "Our team is trained in safe roof access and knows what to look for beyond just visible debris. We flag early signs of damage - rust spots, cracked joins, loose brackets - while we're up there, so you can address issues before they become expensive.",
    },
    {
        title: "Fully Insured - $20M Cover",
        description:
            "Working at height carries risk. Our $20M public liability insurance means that risk sits with us, not with you. Every job is performed safely, carefully, and with full professional accountability.",
    },
    {
        title: "Transparent Pricing, No Hidden Fees",
        description:
            "Your quote covers the full job - clearing, flushing, inspecting, and debris disposal. The price you're given is the price on the invoice. No add-ons, no surprises, no charges for debris removal.",
    },
    {
        title: "100% Satisfaction Guaranteed",
        description:
            "We walk you through the completed job and confirm the flush test results. If anything doesn't meet your expectations, we return and make it right - at no cost, no argument, no delay.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Get a Free Quote",
        description:
            "Contact us with your property details and we'll provide a fast, transparent quote.",
    },
    {
        number: "02",
        title: "Book a Time",
        description:
            "Choose a day that suits - same-week availability across the Perth metro area.",
    },
    {
        number: "03",
        title: "We Clean",
        description:
            "Our technician arrives on time, cleans thoroughly, and tests water flow end-to-end.",
    },
    {
        number: "04",
        title: "Inspect & Approve",
        description:
            "We walk you through the results. Fully satisfied? Done. Not happy? We fix it.",
    },
];

const gutterCleaningFaqs: FaqsType[] = [
    {
        question: "Why is regular gutter cleaning important?",
        answer:
            "Blocked gutters prevent proper water drainage, causing overflow that can damage your roof, walls, and foundations. Regular cleaning keeps water moving freely and protects the structural integrity of your property.",
    },
    {
        question: "How often should I have my gutters cleaned in Perth?",
        answer:
            "For most Perth homes, we recommend cleaning at least twice a year - once in autumn after leaves have fallen, and once in spring. Homes near large trees or in coastal areas may need cleaning three to four times per year.",
    },
    {
        question: "What are the signs that my gutters need cleaning?",
        answer:
            "Watch for water overflowing during rain, sagging gutter sections, plants growing in the gutter, visible debris buildup, water stains on exterior walls, or any evidence of pest activity around your roofline.",
    },
    {
        question: "What happens if I neglect my gutters?",
        answer:
            "Over time, blocked gutters cause water damage to fascia boards, rot in timber structures, cracked foundations, and mould growth inside walls. The repair costs far exceed the cost of routine gutter cleaning.",
    },
    {
        question: "Do I need to be home during the service?",
        answer:
            "Not necessarily. As long as we have safe access to your property and a water connection available, we can complete the job in your absence and send you before/after photos upon completion.",
    },
    {
        question: "Do you service both single and double storey homes?",
        answer:
            "Yes. Our technicians are trained and equipped for safe access to single and double storey properties across all roof types including colorbond, terracotta tile, concrete tile, and Zincalume.",
    },
];

const GutterCleaningServices = () => {
    return (
        <div className="bg-white text-brand-slate">

            {/* HERO */}
            <section className="bg-brand-navy text-white pt-30 pb-24 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Gutter Cleaning Services
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    Professional. Reliable. Perth's Trusted Gutter Specialists.
                </p>
                <Link href="/quote" className="bg-action-gold text-black px-8 py-4 rounded-full font-bold">
                    Get Free Quote
                </Link>
            </section>

            {/* TRUST BADGES */}
            <section className="bg-white py-10 -mt-8 relative z-10">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

                        {/* Badge 1 */}
                        <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl text-2xl flex-shrink-0">
                                💰
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    $20M Insured
                                </div>
                                <div className="text-xs text-brand-slate">Fully protected</div>
                            </div>
                        </div>

                        {/* Badge 2 */}
                        <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl text-2xl flex-shrink-0">
                                🛡️
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    Police Cleared
                                </div>
                                <div className="text-xs text-brand-slate">Background checked</div>
                            </div>
                        </div>

                        {/* Badge 3 */}
                        <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl text-2xl flex-shrink-0">
                                ⏱️
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    Same-Week Bookings
                                </div>
                                <div className="text-xs text-brand-slate">Fast service</div>
                            </div>
                        </div>

                        {/* Badge 4 */}
                        <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl text-2xl flex-shrink-0">
                                ⭐
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                                    5.0 Google Reviews
                                </div>
                                <div className="text-xs text-brand-slate">Happy customers</div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="mt-5 py-8 max-w-5xl mx-auto px-4">
                <h5 className="text-action-gold font-semibold mb-2">
                    About This Service
                </h5>
                <h2 className="text-3xl font-heading font-bold text-brand-navy text-left mb-5">
                    Protect Your Home With Expert Gutter Cleaning
                </h2>
                <p className="mb-4">
                    Blocked gutters are one of the most overlooked - and most damaging - maintenance issues for Perth
                    homeowners. When leaves, dirt, and debris build up, water has nowhere to go. It overflows, seeps under roofing,
                    and slowly damages your walls, foundations, and fascia boards. At Aspect Window Cleaning, we provide a
                    thorough, safe, and reliable gutter cleaning service to keep your property fully protected all year round.
                </p>
            </section>

            {/* IMAGE */}
            <section className="py-5">
                <div className="max-w-5xl mx-auto px-4">
                    <Image
                        src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1775331528/gutter-cleaning_ym4thx.jpg"
                        alt="gutter cleaning in Perth"
                        width={1000}
                        height={300}
                        className="rounded-xl"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                </div>
            </section>


            {/* WHAT's Include */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <h3 className="text-sm text-action-gold font-semibold uppercase mb-2">
                    WHAT'S INCLUDED
                </h3>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-8">
                    What's Included in Our Gutter Cleaning Service
                </h2>
                <p className="mb-10 text-brand-slate">
                    We don't just scoop out the obvious debris - our service is comprehensive, covering every component of your
                    gutter system from inlet to outlet.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    {whatsInclude.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-7 h-7 text-action-gold" />
                                </div>
                                <h4 className="font-semibold text-lg text-brand-navy">
                                    {item.title}
                                </h4>
                                <p className="text-brand-slate text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Real benefits of commercial cleaning */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Subheading */}
                    <h4 className="text-action-gold font-bold text-lg text-center mb-2">
                        WHY IT MATTERS
                    </h4>

                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        The Real Cost of Blocked Gutters
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Gutter cleaning is not just routine maintenance - it's active protection for your home. Here's what neglected
                        gutters can lead to, and how regular cleaning prevents it.
                    </p>

                    {/* Benefits List */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {benefitsOfGutterCleaning.map((benefit) => (
                            <div key={benefit.number} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                                <div className="text-action-gold font-bold text-xl mb-2">{benefit.number}</div>
                                <h3 className="font-semibold text-lg text-brand-navy mb-2">{benefit.title}</h3>
                                <p className="text-brand-slate">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Before After Image */}

                    {/* <div className="max-w-3xl mx-auto w-full">
                        <BeforeAfterSlider
                            initial={50}
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.08_PM_1_x4ymo2.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/shope-gates-cleaning_euctx1.jpg"
                        />
                    </div> */}

                </div>
            </section>

            {/* Perth Homeowners */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Subheading */}
                    <h4 className="text-action-gold font-bold text-lg text-center mb-2">
                        WHY ASPECT
                    </h4>

                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        Why Perth Homeowners Choose Us
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        With hundreds of 5-star reviews across Perth, Aspect Window Cleaning is the trusted name for safe, professional,
                        and thorough gutter cleaning.
                    </p>

                    {/* Points grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {whyAspectPoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                            >
                                <h3 className="text-action-gold font-bold text-xl mb-2">
                                    {point.title}
                                </h3>
                                <p className="text-brand-slate">
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* PROCESS Solar Pannel Cleaning */}
            <section className="py-16 bg-brand-snow">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Subheading */}
                    <h4 className="text-action-gold font-semibold uppercase mb-2 text-center">
                        OUR PROCESS
                    </h4>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        How Our Gutter Cleaning Works
                    </h2>

                    {/* Intro */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        A simple, hassle-free process from first contact to sparkling clean gutters.
                    </p>

                    {/* Steps */}
                    <div className="grid md:grid-cols-4 gap-8">
                        {processSteps.map((step) => (
                            <div key={step.number} className="text-center">

                                {/* Number circle (same style as your main site) */}
                                <div className="w-12 h-12 rounded-full bg-action-gold text-brand-navy font-bold text-xl flex items-center justify-center mx-auto mb-4">
                                    {step.number}
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-brand-navy mb-2">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-brand-slate leading-relaxed">
                                    {step.description}
                                </p>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* FAQ */}
            <section className="pt-5 pb-10 max-w-5xl mx-auto px-4">
                <FAQ
                    title="Ready to Book Your Gutter Cleaning"
                    faqs={gutterCleaningFaqs}
                />
            </section>

            {/* CTA */}
            <CTA title="Book Your Window Cleaning Today" />

        </div>
    );
}

export default GutterCleaningServices