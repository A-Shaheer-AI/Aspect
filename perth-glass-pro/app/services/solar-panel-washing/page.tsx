import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import FAQ from "@/components/FAQ";
import { TrendingDown, Calendar, ShieldCheck, Star } from "lucide-react";
import CTA from "@/components/CTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type FaqsType = {
    question: string;
    answer: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Solar Panel Cleaning Perth | Boost Efficiency by 30% | Aspect Window Cleaning",
    description:
        "Professional solar panel cleaning in Perth. Increase energy output by up to 30% using purified water & soft brush systems. Fully insured. Free quotes.",
};

const stats = [
    {
        icon: TrendingDown,
        value: "30%",
        label: "Average efficiency lost to grime in Perth",
    },
    {
        icon: Calendar,
        value: "6Ã¢â‚¬â€œ12 Months",
        label: "Optimal cleaning interval for Perth climate",
    },
    {
        icon: ShieldCheck,
        value: "100%",
        label: "Jobs completed with zero panel damage",
    },
    {
        icon: Star,
        value: "5.0?",
        label: "Google rating from Perth homeowners",
    },
];

const whatsInclude = [
    {
        icon: CheckCircle2,
        title: "Dust & Debris Removal",
        description:
            "Full removal of Perth's red dust, eucalyptus pollen, and airborne debris from every panel surface - the buildup that silently costs you money on every sunny day.",
    },
    {
        icon: CheckCircle2,
        title: "Bird Dropping Treatment",
        description:
            "Bird droppings are highly acidic and can permanently etch panel glass if left more than a few weeks. We pre-soak and gently lift every dropping without scratching the anti-reflective coating.",
    },
    {
        icon: CheckCircle2,
        title: "Purified Water Wash",
        description:
            "100% deionised water contains zero minerals - so it evaporates leaving no residue, no spots, and no chemical film on your panels. Maximum light transmission, every time.",
    },
    {
        icon: CheckCircle2,
        title: "Panel Surface Inspection",
        description:
            "While cleaning, our technician visually inspects each panel for micro-cracks, hotspot discolouration, loose connections, and physical damage - and flags anything that warrants your installer's attention.",
    },
    {
        icon: CheckCircle2,
        title: "Frame & Edge Cleaning",
        description:
            "Grime and moisture in panel frames and around mounting brackets traps water and accelerates corrosion. We clean edges and frames thoroughly - protecting the structure of your solar investment.",
    },
    {
        icon: CheckCircle2,
        title: "Safe Roof Access",
        description:
            "We use appropriate ladders, soft-soled footwear, and roof-safe equipment. We never step directly on panels or compromise your roof's integrity - just safe, methodical access every time.",
    },
];

const benefitsOfCleaning = [
    {
        number: "01",
        title: "Restore & Maximise Energy Output",
        description:
            "Perth receives over 3,200 hours of sunshine annually - more than almost any other major city in the world. A layer of grime between your panels and that sunshine is pure waste. Professional cleaning removes that barrier and restores your system to full generating capacity - recovering up to 30% of lost output.",
    },
    {
        number: "02",
        title: "Reduce Your Power Bills",
        description:
            "Even a modest 10-15% efficiency restoration from a single clean can add up to significant savings across a Perth year. Given our solar irradiance levels, dirty panels in summer aren't just inefficient - they're expensive. Most homeowners find cleaning pays for itself within a few billing cycles.",
    },
    {
        number: "03",
        title: "Extend the Lifespan of Your Panels",
        description:
            "Eucalyptus sap and bird droppings are mildly to strongly acidic. Left on panel glass, they don't just block light - they chemically attack the anti-reflective coating, permanently reducing clarity and output. Once the coating is damaged, it cannot be restored. Regular cleaning prevents this irreversible degradation.",
    },
    {
        number: "04",
        title: "Maintain Manufacturer Warranty Compliance",
        description:
            "Most major solar panel warranties (LG, SunPower, REC, Jinko) include maintenance requirements - and some explicitly require documented professional cleaning to remain valid. If you ever need to make a warranty claim, having a cleaning record can be the difference between a successful claim and a rejected one.",
    },
];

const whyAspectPoints = [
    {
        title: "Manufacturer-Approved Methods",
        description:
            "We use only soft-bristle brushes and purified water - the cleaning method explicitly recommended by LG, REC, SunPower, and all major manufacturers. No harsh chemicals, no abrasive pads, no voided warranty - ever.",
    },
    {
        title: "Trained & Insured Technicians",
        description:
            "Our technicians are trained specifically in safe solar panel handling and roof access, with $20M public liability insurance and police clearance on every job. We treat your roof - and your investment - with care.",
    },
    {
        title: "Transparent Pricing, No Hidden Fees",
        description:
            "You receive a clear, itemised quote before any work begins. The price we quote is the price you pay - guaranteed. No surprises when the invoice arrives.",
    },
    {
        title: "100% Satisfaction Guaranteed",
        description:
            "We're not finished until you're completely happy with the result. If anything doesn't meet expectations, we return and fix it at no extra cost - that's our promise.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Free Quote",
        description:
            "Share your panel count and address - we'll give you a fast, transparent quote with no obligation.",
    },
    {
        number: "02",
        title: "Book a Time",
        description:
            "Same-week availability across Perth. Choose a time that works for you.",
    },
    {
        number: "03",
        title: "We Clean",
        description:
            "Our technician uses purified water and soft-brush equipment to clean every panel safely.",
    },
    {
        number: "04",
        title: "You Inspect",
        description:
            "We walk you through results and provide a post-clean report. Satisfied? Job done.",
    },
];

const solarFAQs: FaqsType[] = [
    {
        question: "Why is solar panel cleaning important?",
        answer:
            "Dust, bird droppings, and environmental buildup act as a barrier on your panel surface, reducing the amount of sunlight reaching the photovoltaic cells. Even a thin layer of grime can reduce output by 15Ã¢â‚¬â€œ30%, meaning you're generating significantly less than your system is capable of.",
    },
    {
        question: "How often should I have my solar panels cleaned in Perth?",
        answer:
            "Most Perth homeowners benefit from cleaning every 6 to 12 months. However, homes near bushland, farmland, or high bird activity areas may need quarterly cleaning. We can assess your specific situation and recommend the ideal schedule.",
    },
    {
        question: "Can I clean my solar panels myself?",
        answer:
            "While basic rinsing is possible, DIY cleaning carries real risks - including roof fall hazards, scratching panel surfaces, and using tap water that leaves mineral deposits. Professional cleaning is safer and more effective.",
    },
    {
        question: "What method do you use to clean solar panels?",
        answer:
            "We use a soft-bristle brush system with 100% purified, deionised water - the method recommended by virtually all solar panel manufacturers. It removes debris without scratching or leaving residue.",
    },
    {
        question: "Will cleaning my solar panels void the warranty?",
        answer:
            "No - professional cleaning using approved methods helps maintain your warranty. Many manufacturers require documented maintenance, including cleaning.",
    },
    {
        question: "How do I know if my panels need cleaning?",
        answer:
            "Visible dirt, bird droppings, or reduced inverter output are key signs. If your system is producing less than usual, dirty panels are often the cause.",
    },
    {
        question: "Do you service residential and commercial systems?",
        answer:
            "Yes. We clean residential rooftop systems as well as larger commercial and strata installations across Perth.",
    },
];

const SolarPanelCleaningPage = () => {
    return (
        <div className="bg-white text-brand-slate">

            {/* HERO */}
            <section className="bg-brand-navy text-white pt-30 pb-24 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Solar Panel Cleaning Services in Perth
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    Maximise your solar output. Protect your investment.
                </p>
                <Link href="/pricing#estimator" className="bg-action-gold text-black px-8 py-4 rounded-full font-bold">
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
                                ðŸ’°
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
                                ðŸ›¡ï¸
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
                                â±ï¸
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
                                â­
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
                    Maximise Your Solar Panel Efficiency in Perth
                </h2>
                <p className="mb-4">
                    Solar panels are one of the most valuable investments a <Link href="/locations" className="text-action-gold hover:underline">Perth</Link> homeowner can make - but only when they're
                    operating at full capacity. Dust, bird droppings, pollen, and grime accumulate on panel surfaces over time, blocking
                    sunlight and silently reducing your energy output by up to 30%. At Aspect Window Cleaning, we provide
                    professional solar panel cleaning using purified water and soft-brush technology - the same method
                    recommended by leading panel manufacturers - to safely restore your system's performance and protect your 
                    investment. Combine this with our <Link href="/services/gutter-cleaning" className="text-action-gold hover:underline">gutter cleaning</Link> or <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline">residential window cleaning</Link> services for a complete exterior refresh.
                </p>
            </section>

            {/* IMAGE */}
            <section className="py-5">
                <div className="max-w-5xl mx-auto px-4">
                    <Image
                        src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.18_PM_vt57zl.jpg"
                        alt="Technician cleaning solar panels in Perth"
                        width={1200}
                        height={300}
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="rounded-xl"
                    />
                </div>
            </section>

            {/* STATS */}
            <section className="py-16 bg-slate-100">
                <div className="max-w-5xl mx-auto px-4">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={index}
                                    className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
                                >
                                    {/* Icon */}
                                    <Icon className="w-8 h-8 text-action-gold mx-auto mb-3" />

                                    {/* Value */}
                                    <div className="text-xl md:text-2xl  font-heading font-bold text-brand-navy mb-1">
                                        {stat.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm text-brand-slate">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* DID YOU KNOW SECTION */}
            <section className="py-16 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-8 md:p-14 shadow-sm">

                        <div className="flex flex-col md:flex-row gap-10 items-center">

                            {/* Left Icon / Visual */}
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl shadow flex items-center justify-center border border-amber-200">
                                    <span className="text-5xl">??</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-white text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full border border-amber-200 mb-4">
                                    <span className="text-lg">??</span>
                                    DID YOU KNOW?
                                </div>

                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy leading-tight mb-6">
                                    Dirty Panels Could Be Costing You Money Right Now
                                </h2>

                                <div className="prose prose-slate max-w-none text-lg leading-relaxed">
                                    <p className="text-brand-slate">
                                        Studies show that a thin layer of dust and grime can reduce solar panel output by
                                        <span className="font-semibold text-orange-700"> 15-30%</span>.
                                    </p>
                                    <p className="text-brand-slate">
                                        In Perth's dusty climate - with frequent easterly winds, bushfire smoke, and high bird activity -
                                        panels can lose significant efficiency within just a few months.
                                    </p>
                                    <p className="text-brand-slate font-medium">
                                        Regular professional cleaning is the single most effective way to protect your energy returns.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Optional subtle footer highlight */}
                        <div className="mt-10 pt-8 border-t border-amber-100 text-center">
                            <p className="text-sm text-amber-600 font-medium flex items-center justify-center gap-2">
                                <span>?</span>
                                Clean panels = Maximum savings
                                <span>?</span>
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* INCLUDED */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <h3 className="text-sm text-action-gold font-semibold uppercase mb-2">
                    What's Included
                </h3>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-8">
                    What Our Solar Panel Cleaning Service Covers
                </h2>
                <p className="mb-10 text-brand-slate">
                    A complete, safe, and manufacturer-approved clean of your entire solar system - not just a quick rinse.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {whatsInclude.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex gap-4">
                                <Icon className="w-6 h-6 text-action-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-lg text-brand-navy mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-brand-slate text-sm">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Real benefits of cleaning */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Subheading */}
                    <h4 className="text-action-gold font-bold text-lg text-center mb-2">
                        WHY IT MATTERS
                    </h4>

                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        The Real Benefits of Regular Solar Panel Cleaning
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Cleaning your solar panels isn't just about aesthetics - it directly impacts your energy output, your savings, and the lifespan of your system.
                    </p>

                    {/* Benefits List */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {benefitsOfCleaning.map((benefit) => (
                            <div key={benefit.number} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                                <div className="text-action-gold font-bold text-xl mb-2">{benefit.number}</div>
                                <h3 className="font-semibold text-lg text-brand-navy mb-2">{benefit.title}</h3>
                                <p className="text-brand-slate">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto w-full">
                        <BeforeAfterSlider
                            initial={50}
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/solar-pannel-clean_cigwab.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg"
                        />
                    </div>

                    {/* Images
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative w-full max-h-[500px]">
                            <Image
                                src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960139/solar-pannel-clean_cigwab.jpg"
                                alt="Dirty solar panel - dust and bird dropping buildup"
                                fill
                                className="rounded-xl shadow-md object-cover"
                            />
                        </div>

                        <div className="w-full">
                            <Image
                                src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg"
                                alt="Clean solar panel - full output after professional wash"
                                width={500}
                                height={500}
                                className="rounded-xl shadow-md object-cover"
                            />
                        </div>
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
                        Why Perth Homeowners Trust Aspect for Solar Cleaning
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        We specialise in safe, effective solar panel cleaning using manufacturer-approved methods - so your panels are cleaned thoroughly without any risk of damage.
                    </p>

                    {/* Points grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {whyAspectPoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                            >
                                <h3 className="text-action-gold font-bold text-xl mb-2">{point.title}</h3>
                                <p className="text-brand-slate">{point.description}</p>
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
                        How Our Solar Panel Cleaning Works
                    </h2>

                    {/* Intro */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Simple, safe, and hassle-free - from first contact to fully restored panels.
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
                    title="Solar Panl Cleaning FAQs"
                    faqs={solarFAQs}
                />
            </section>

            {/* CTA */}
            <CTA title="Ready to Boost Your Solar Efficiency" />

        </div>
    );
}

export default SolarPanelCleaningPage
