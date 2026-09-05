import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight, Shield, BadgeCheck, Clock, Star, CheckCircle, CheckCircle2 } from "lucide-react";

import FAQ from "@/components/FAQ";

import CTA from "@/components/CTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type FaqsType = {
    question: string;
    answer: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Commercial Cleaning Perth | Office & Workplace Cleaning | Aspect Window Cleaning",
    description:
        "Professional commercial cleaning services in Perth. Office cleaning, restroom sanitation, floor maintenance & window cleaning. Fully insured with $20M cover. Free quotes.",
};

const whatsInclude = [
    {
        icon: ChevronsRight,
        title: "Office & Workspace Cleaning",
        description:
            "Comprehensive cleaning of all desk surfaces, communal areas, meeting rooms, and reception - creating a workspace that reflects your standards and makes the right impression on every visitor.",
    },
    {
        icon: ChevronsRight,
        title: "Restroom Sanitation",
        description:
            "Deep cleaning and disinfection of all fixtures, tiles, mirrors, and surfaces - plus consumable replenishment. The standard your staff and clients expect, maintained on every visit.",
    },
    {
        icon: ChevronsRight,
        title: "Floor Maintenance",
        description:
            "Vacuuming, mopping, and appropriate care for every floor type in your facility - tiles, carpet, vinyl, and polished concrete - maintaining a clean, professional finish throughout.",
    },
    {
        icon: ChevronsRight,
        title: "Window & Glass Cleaning",
        description:
            "Interior and exterior glass, shopfront panels, and glass partitions cleaned streak-free using our pure water system. Clean glass transforms how your premises look - from both inside and out.",
    },
    {
        icon: ChevronsRight,
        title: "Dusting & High-Touch Surfaces",
        description:
            "All ledges, vents, and high-contact points - door handles, light switches, lift buttons - sanitised on every visit. These are the surfaces that matter most for workplace hygiene and infection control.",
    },
    {
        icon: ChevronsRight,
        title: "Waste Removal & Bin Liner Replacement",
        description:
            "Every bin emptied, sanitised, and relined across your facility. We don't skip bins in less-visible areas - every space in your premises is treated with equal care.",
    },
];

const benefitsOfCommercialCleaning = [
    {
        number: "01",
        title: "Improved First Impressions & Brand Image",
        description:
            "Your premises speak before you do. A clean, well-maintained office or shopfront signals professionalism and attention to detail - the same qualities your clients are looking for in you. A poorly maintained space does the opposite, regardless of what's on the walls.",
    },
    {
        number: "02",
        title: "Enhanced Employee Productivity & Wellbeing",
        description:
            "Research consistently links workplace cleanliness to employee productivity, satisfaction, and retention. A clean environment reduces cognitive load, minimises distractions, and signals to your team that their workplace - and by extension, they - are valued. It's one of the easiest culture investments you can make.",
    },
    {
        number: "03",
        title: "Healthier Indoor Environment",
        description:
            "Bacteria, dust, and allergens accumulate rapidly in busy offices - on surfaces, in air vents, and in high-traffic areas. Regular professional cleaning reduces pathogen load and sick day frequency, protecting your team's health and keeping your operations running without interruption.",
    },
    {
        number: "04",
        title: "Prolonged Asset Lifespan",
        description:
            "Floors, fixtures, and surfaces wear significantly faster when grime is allowed to accumulate. Regular cleaning removes the abrasive particles and corrosive buildup that accelerate wear - extending the life of your fitout and reducing long-term capital expenditure on replacements and repairs.",
    },
];

const whyAspectPoints = [
    {
        title: "Experienced & Trained Team",
        description:
            "Our commercial cleaners are trained across office, retail, industrial, and hospitality environments - and background-checked before they ever set foot in your facility. You get a consistent, professional team that understands your space.",
    },
    {
        title: "Flexible Scheduling Around Your Business",
        description:
            "Early mornings, evenings, weekends - we build around your operating hours, not ours. Your staff never need to work around our team, and your clients never see the process, only the result.",
    },
    {
        title: "Fully Insured - $20M Cover",
        description:
            "Complete public liability coverage on every commercial engagement. We operate within your site rules, carry our documentation, and work with full professional accountability - every single visit.",
    },
    {
        title: "100% Satisfaction Guaranteed",
        description:
            "Every visit is followed by a quality check. If anything falls short of the agreed standard, we return within 24 hours and make it right - at no additional cost. That's our commitment on every contract.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Free Quote",
        description:
            "Tell us about your facility and cleaning needs - we'll provide a fast, transparent quote with no obligation.",
    },
    {
        number: "02",
        title: "Tailored Plan",
        description:
            "We design a cleaning plan specific to your space, frequency, and operational requirements.",
    },
    {
        number: "03",
        title: "We Clean",
        description:
            "Our trained team arrives on time and works methodically through every area - leaving nothing overlooked.",
    },
    {
        number: "04",
        title: "Ongoing Service",
        description:
            "We maintain your agreed schedule and check in regularly to ensure you're always 100% satisfied.",
    },
];

const pressureWashing: FaqsType[] = [
    {
        question: "Why is professional commercial cleaning important?",
        answer:
            "A professionally cleaned workplace protects the health of your staff, makes a strong impression on clients, and safeguards your assets from premature wear. It also reduces the spread of illness and keeps your business compliant with workplace health and safety standards.",
    },
    {
        question: "How often should commercial premises be cleaned?",
        answer:
            "Most businesses benefit from cleaning 3-5 times per week, with some high-traffic environments requiring daily service. We'll assess your space and recommend a frequency that keeps your premises consistently clean without unnecessary visits.",
    },
    {
        question: "Can you work outside of business hours?",
        answer:
            "Absolutely. We offer early morning, evening, and weekend availability so our team never disrupts your staff or clients. Your operations continue without interruption while your premises are cleaned to the highest standard.",
    },
    {
        question: "Are your cleaning products safe and eco-friendly?",
        answer:
            "Yes. We use environmentally responsible cleaning solutions that are non-toxic and biodegradable. They're tough on dirt and bacteria while being safe for your team, your customers, and the surrounding environment",
    },
    {
        question: "Do I need to be on-site during the clean?",
        answer:
            "Not necessarily. Many of our commercial clients provide access and leave us to complete the work independently. We're trustworthy, police-cleared, and will send a completion report or photos if required.",
    },
    {
        question: "Do you offer one-off or regular cleaning contracts?",
        answer:
            "We offer both. Whether you need a one-off deep clean or a long-term ongoing maintenance schedule, we'll tailor a solution to suit your business needs and budget.",
    },
    {
        question: "What types of commercial premises do you clean?",
        answer:
            "We service offices, retail spaces, medical and dental clinics, strata complexes, warehouses, childcare centres, and more across the Perth metro area. If you're unsure whether we cover your facility type, just ask - we likely do.",
    },
];

const CommercialWindowCleaning = () => {
    return (
        <div className="bg-white text-brand-slate">

            {/* HERO */}
            <section className="bg-brand-navy text-white pt-30 pb-24 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Commercial Cleaning Services
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    Professional. Reliable. Perth's Trusted Commercial Cleaning Specialists.
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
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Shield className="w-5 h-5 text-action-gold" /></div>
<div className="min-w-0">
<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
$20M Insured
                                </div>
                                <div className="text-xs text-brand-slate">Fully protected</div>
                            </div>
                        </div>

                        {/* Badge 2 */}
                        <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><BadgeCheck className="w-5 h-5 text-action-gold" /></div>
<div className="min-w-0">
<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
Police Cleared
                                </div>
                                <div className="text-xs text-brand-slate">Background checked</div>
                            </div>
                        </div>

                        {/* Badge 3 */}
                        <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Clock className="w-5 h-5 text-action-gold" /></div>
<div className="min-w-0">
<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
Same-Week Bookings
                                </div>
                                <div className="text-xs text-brand-slate">Fast service</div>
                            </div>
                        </div>

                        {/* Badge 4 */}
                        <div className="flex items-center gap-3 bg-white border border-slate-200 hover:border-action-gold/40 px-5 py-4 rounded-2xl shadow-sm hover:shadow transition-all">
                            <div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Star className="w-5 h-5 text-action-gold fill-action-gold" /></div>
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
                    Keep Your Business Spotless with Expert Commercial Cleaning
                </h2>
                <p className="mb-4">
                    A clean business environment is not just about appearances - it directly impacts employee productivity, client confidence, and workplace health. At Aspect Window Cleaning, we deliver reliable, thorough commercial cleaning services tailored to the specific needs of your facility. Whether you operate a busy office, retail space, strata complex, or industrial site, our experienced team works around your schedule to keep your premises spotless, hygienic, and consistently professional. We use industry-grade equipment and eco-friendly products to deliver outstanding results - every single visit. We also offer <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline">residential window cleaning</Link>, <Link href="/services/pressure-washing" className="text-action-gold hover:underline">pressure washing</Link>, and <Link href="/services/solar-panel-washing" className="text-action-gold hover:underline">solar panel washing</Link> across <Link href="/locations" className="text-action-gold hover:underline">Perth</Link>.
                </p>
            </section>

            {/* IMAGE */}
            <section className="py-5">
                <div className="max-w-4xl mx-auto px-4">
                    <Image
                        src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960135/outside-villa-window-cleaning_yijb3b.jpg"
                        alt="Commercial cleaning in Perth"
                        width={1000}
                        height={300}
                        className="rounded-xl"
                        sizes="(max-width: 1024px) 100vw, 896px"
                    />
                </div>
            </section>

            {/* WHAT'S INCLUDED */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <h3 className="text-sm text-action-gold font-semibold uppercase mb-2">
                    WHAT'S INCLUDED
                </h3>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-8">
                    What Our Commercial Cleaning Service Covers
                </h2>
                <p className="mb-10 text-brand-slate">
                    We go beyond the basics - every visit covers every area your team and clients interact with.
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
                        The Real Value of a Professionally Cleaned Workplace
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Cleaning your workplace isn't just routine maintenance - it directly impacts your team's productivity, your clients' confidence, and the long-term condition of your premises.
                    </p>

                    {/* Benefits List */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {benefitsOfCommercialCleaning.map((benefit) => (
                            <div key={benefit.number} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                                <div className="text-action-gold font-bold text-xl mb-2">{benefit.number}</div>
                                <h3 className="font-semibold text-lg text-brand-navy mb-2">{benefit.title}</h3>
                                <p className="text-brand-slate">{benefit.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-3xl mx-auto w-full">
                        <BeforeAfterSlider
                            initial={50}
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.08_PM_1_x4ymo2.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/shope-gates-cleaning_euctx1.jpg"
                        />
                    </div>

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
                        Why Perth Businesses Choose Us
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        With hundreds of 5-star reviews across Perth, Aspect Window Cleaning is the trusted name for professional, reliable commercial cleaning that never cuts corners.
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
                        How Our Commercial Cleaning Works
                    </h2>

                    {/* Intro */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Simple, hassle-free, and built around your schedule - from first contact to a consistently clean facility.
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
                    title="Everything you need to know about our commercial cleaning service in Perth."
                    faqs={pressureWashing}
                />
            </section>

            {/* CTA */}
            <CTA title="Ready to Book Your Commercial Clean" />

        </div>
    );
}

export default CommercialWindowCleaning
