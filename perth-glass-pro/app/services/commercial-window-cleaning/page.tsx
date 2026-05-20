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
    title: "Commercial Cleaning Perth | Office & Workplace Cleaning | Aspect Window Cleaning",
    description:
        "Professional commercial cleaning services in Perth. Office cleaning, restroom sanitation, floor maintenance & window cleaning. Fully insured with $20M cover. Free quotes.",
};

const whatsInclude = [
    {
        icon: ChevronsRight,
        title: "Office & Workspace Cleaning",
        description:
            "Full cleaning of desks, surfaces, communal areas, meeting rooms, and reception — kept spotless every visit.",
    },
    {
        icon: ChevronsRight,
        title: "Restroom Sanitation",
        description:
            "Deep cleaning and disinfection of all bathrooms, including fixtures, tiles, mirrors, and replenishment of supplies",
    },
    {
        icon: ChevronsRight,
        title: "Floor Maintenance",
        description:
            "Vacuuming, mopping, and floor care across all surface types — tiles, carpet, vinyl, and hard floors.",
    },
    {
        icon: ChevronsRight,
        title: "Window & Glass Cleaning",
        description:
            "Interior and exterior glass, partitions, and shopfronts cleaned streak-free using our pure  water system.",
    },
    {
        icon: ChevronsRight,
        title: "Dusting & High-Touch Surfaces",
        description:
            "All ledges, skirting boards, vents, and high-touch points like door handles and light switches sanitised thoroughly.",
    },
    {
        icon: ChevronsRight,
        title: "Waste Removal & Bin Liner Replacement",
        description:
            "All bins emptied, sanitised, and relined throughout the facility at the end of every service visit.",
    },
];

const benefitsOfCommercialCleaning = [
    {
        number: "01",
        title: "Improved First Impressions & Brand Image",
        description:
            "Your premises are a direct reflection of your brand. Clean, well-maintained spaces signal professionalism and attention to detail — making a powerful first impression on every client, visitor, and new hire who walks through the door.",
    },
    {
        number: "02",
        title: "Enhanced Employee Productivity & Wellbeing",
        description:
            "A clean, organised workplace reduces stress, improves focus, and boosts morale. Studies consistently show that employees working in clean environments are more productive, take fewer sick days, and feel more valued by their employer.",
    },
    {
        number: "03",
        title: "Healthier Indoor Environment",
        description:
            "Dust, allergens, and bacteria accumulate quickly in busy commercial spaces. Regular professional cleaning reduces the risk of illness spreading through your team, lowering absenteeism and maintaining a healthier workplace for everyone. ",
    },
    {
        number: "04",
        title: "Prolonged Asset Lifespan",
        description:
            "Regular professional cleaning protects your flooring, fixtures, and surfaces from premature wear caused by dirt and grime buildup. This extends the life of your assets and reduces long-term maintenance and replacement costs significantly",
    },
];

const whyAspectPoints = [
    {
        title: "Experienced & Trained Team",
        description:
            "Our staff are fully trained, background-checked, and experienced across all types of commercial environments — from boutique offices to large industrial facilities.",
    },
    {
        title: "Flexible Scheduling Around Your Business",
        description:
            "We work early mornings, evenings, and weekends — whatever suits your operations. No disruption to your staff or your clients.",
    },
    {
        title: "Fully Insured — $20M Cover",
        description:
            "Complete public liability cover gives you and your business total peace of mind. We operate responsibly and safely on every site, every single time.",
    },
    {
        title: "100% Satisfaction Guaranteed",
        description:
            "If anything falls short of your expectations, we return and make it right at no extra cost. Your satisfaction is our standard — every visit.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Free Quote",
        description:
            "Tell us about your facility and cleaning needs — we'll provide a fast, transparent quote with no obligation.",
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
            "Our trained team arrives on time and works methodically through every area — leaving nothing overlooked.",
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
            "Most businesses benefit from cleaning 3–5 times per week, with some high-traffic environments requiring daily service. We'll assess your space and recommend a frequency that keeps your premises consistently clean without unnecessary visits.",
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
            "We service offices, retail spaces, medical and dental clinics, strata complexes, warehouses, childcare centres, and more across the Perth metro area. If you're unsure whether we cover your facility type, just ask — we likely do.",
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
                    Keep Your Business Spotless with Expert Commercial Cleaning
                </h2>
                <p className="mb-4">
                    A clean business environment is not just about appearances — it directly impacts employee productivity, client
                    confidence, and workplace health. At Aspect Window Cleaning, we deliver reliable, thorough commercial cleaning services tailored to the specific needs of your facility. Whether you operate a busy office, retail space, strata complex, or industrial site, our experienced team works around your schedule to keep your premises spotless, hygienic, and consistently professional. We use industry-grade equipment and eco-friendly products to deliver outstanding results — every single visit.
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
                    We go beyond the basics — every visit covers every area your team and clients interact with.
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
                        Cleaning your workplace isn't just routine maintenance — it directly impacts your team's productivity, your clients' confidence, and the long-term condition of your premises.
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
                        Simple, hassle-free, and built around your schedule — from first contact to a consistently clean facility.
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