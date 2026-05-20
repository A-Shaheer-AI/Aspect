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
    title: "Pressure Cleaning Perth | Driveway & Exterior Washing | Aspect Window Cleaning",
    description:
        "Professional pressure cleaning in Perth. Driveways, patios, walls & commercial surfaces. Remove stains, algae & oil safely. Fully insured. Free quotes.",
};

const whatWeClean = [
    {
        icon: ChevronsRight,
        title: "Driveways & Pathways",
        description:
            "Remove oil stains, tyre marks, dirt, and grime from concrete, brick, and paved driveways and pathways — restoring a clean, fresh appearance.",
    },
    {
        icon: ChevronsRight,
        title: "Patios & Decks",
        description:
            "Strip away algae, mould, and embedded dirt from timber, composite, and concrete outdoor entertaining areas safely and without damage.",
    },
    {
        icon: ChevronsRight,
        title: "Walls & Fences",
        description:
            "Clean rendered, brick, and Colorbond walls and fences of dirt buildup, staining, and biological growth — improving kerb appeal instantly.",
    },
    {
        icon: ChevronsRight,
        title: "House Exterior Surfaces",
        description:
            "Full exterior wash of rendered and brick home facades, removing cobwebs, dust, dirt streaks, and biological growth from all external walls.",
    },
    {
        icon: ChevronsRight,
        title: "Car Parks & Commercial Areas",
        description:
            "High-volume pressure cleaning of commercial car parks, loading bays, and hard-stand areas — removing oil, rubber marks, and general grime.",
    },
    {
        icon: ChevronsRight,
        title: "Pool Surrounds & Entertaining Areas",
        description:
            "Safely clean pool coping, surrounding tiles, and outdoor entertaining zones — removing algae and slip hazards from wet-area surfaces.",
    },
];

const benefitsOfPressureWashing = [
    {
        number: "01",
        title: "Restore & Protect Your Property's Value",
        description:
            "Dirty, stained surfaces instantly reduce the visual appeal and perceived value of your property. Professional pressure washing restores surfaces to near-new condition — making an immediate positive impression on visitors, buyers, and neighbours alike.",
    },
    {
        number: "02",
        title: "Eliminate Slip Hazards & Improve Safety",
        description:
            "Algae, moss, and wet grime on driveways, pathways, and pool surrounds create serious slip risks. Pressure washing removes these hazards completely, making your outdoor areas safe for your family, staff, and visitors year-round.",
    },
    {
        number: "03",
        title: "Extend the Lifespan of Your Surfaces",
        description:
            "Biological growth like algae and lichen slowly breaks down concrete, render, and paving materials if left untreated. Regular pressure washing removes this growth before it causes structural deterioration — significantly extending the life of your outdoor surfaces",
    },
    {
        number: "04",
        title: "Eco-Friendly & Highly Effective",
        description:
            "Our pressure washing process uses eco-friendly, biodegradable degreasers and detergents that break down oil, grime, and stains without harming your garden, lawn, or the surrounding environment — delivering powerful results responsibly.",
    },
];

const whyAspectPoints = [
    {
        title: "Professional Equipment & Adjusted Pressure",
        description:
            "We use commercial-grade pressure washers with adjustable settings — matching the right pressure and nozzle to each surface type to deliver a thorough clean without any risk of damage to pavers, render, or timber.",
    },
    {
        title: "Fully Insured — $20M Cover",
        description:
            "Complete public liability insurance on every job gives you total peace of mind. We work safely and responsibly on your property from start to finish.",
    },
    {
        title: "Eco-Friendly Detergents & Safe Techniques",
        description:
            "All cleaning solutions we use are biodegradable and safe for your garden, lawn, pets, and the environment. We pre-treat stubborn stains and rinse thoroughly — leaving no chemical residue behind.",
    },
    {
        title: "100% Satisfaction Guaranteed",
        description:
            "We're not finished until you're completely happy with the result. If anything doesn't meet your expectations, we return and fix it at no extra cost — every time.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Assessment",
        description:
            "We assess the surface type, level of soiling, and any stubborn stains — then select the right pressure settings and solutions.",
    },
    {
        number: "02",
        title: "Pre-Treatment",
        description:
            "Eco-friendly degreaser is applied to break down oil, grease, and biological growth before washing begins.",
    },
    {
        number: "03",
        title: "Pressure Wash",
        description:
            "Methodical, high-pressure cleaning across every area — removing all dirt, staining, and  buildup completely.",
    },
    {
        number: "04",
        title: "Final Rinse",
        description:
            "A thorough final rinse removes all detergent and loosened debris, leaving surfaces clean, safe, and residue-free.",
    },
];

const pressureWashing: FaqsType[] = [
    {
        question: "What surfaces can be pressure washed?",
        answer:
            "We pressure wash concrete driveways and pathways, brick and paved areas, rendered and brick walls, Colorbond fences, timber and composite decking, pool surrounds, house exteriors, and commercial hard-stand areas. If you're unsure about a specific surface, just ask — we'll advise the safest and most effective approach.",
    },
    {
        question: "Will pressure washing damage my surfaces?",
        answer:
            "Not when done correctly. Our technicians adjust pressure settings and nozzle types to match each surface — using lower pressure for delicate materials like render and timber, and higher pressure for concrete and brick. We never use settings that could cause damage.",
    },
    {
        question: "Can pressure washing remove oil stains from driveways?",
        answer:
            "Yes. We pre-treat oil and grease stains with an eco-friendly degreaser before pressure washing. This breaks down the oil at a molecular level, allowing the pressure wash to remove even deep-set stains that have been there for years.",
    },
    {
        question: "How often should I have my property pressure washed?",
        answer:
            "For most Perth homes, an annual pressure wash is sufficient to maintain driveways, patios, and exterior walls. Properties near bushland, coastal areas, or with heavy tree coverage may benefit from cleaning every six months due to increased moss, algae, and debris buildup.",
    },
    {
        question: "Do I need to be home during the service?",
        answer:
            "Not necessarily. As long as we have safe access to the areas being cleaned and a water connection is available, our team can complete the job independently. We'll notify you when the work is done and can send before and after photos on request.",
    },
    {
        question: "Are your cleaning products safe for my garden and pets?",
        answer:
            "Yes. All detergents and degreasers we use are biodegradable and environmentally responsible. We take care to avoid direct contact with garden beds and lawn areas, and rinse all surfaces thoroughly so no chemical residue remains after the service.",
    },
    {
        question: "Do you offer pressure washing for commercial properties?",
        answer:
            "Absolutely. We service commercial car parks, loading docks, retail forecourts, strata complexes, and other commercial hard surfaces across the Perth metro area. Contact us for a tailored quote based on your site size and requirements.",
    },
];

const PressureWashing = () => {
    return (
        <div className="bg-white text-brand-slate">

            {/* HERO */}
            <section className="bg-brand-navy text-white pt-30 pb-24 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Pressure Washing Services
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    Revitalise Your Property. Restore Every Surface. Perth's Trusted Specialists.
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
                    Restore Every Surface with Professional Pressure Washing
                </h2>
                <p className="mb-4">
                    Over time, Perth's outdoor surfaces accumulate years of dirt, oil stains, algae, and grime that regular cleaning
                    simply cannot remove. At Aspect Window Cleaning, we use professional-grade pressure washing equipment to
                    strip away even the toughest buildup — restoring driveways, patios, walls, and exterior surfaces to their original
                    condition quickly and efficiently. Our technicians adjust pressure settings and cleaning solutions to suit each
                    surface type, ensuring a thorough clean every time without causing any damage. Whether it's a residential
                    driveway or a large commercial car park, we deliver results that make an immediate difference to the look and
                    safety of your property.
                </p>
            </section>

            {/* IMAGE */}
            <section className="py-5">
                <div className="max-w-5xl mx-auto px-4">
                    <Image
                        src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960122/indoor-cleaning_ioqiqq.jpg"
                        alt="Technician cleaning solar panels in Perth"
                        width={1200}
                        height={300}
                        className="rounded-xl"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                </div>
            </section>

            {/* WHAT WE CLEAN */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <h3 className="text-sm text-action-gold font-semibold uppercase mb-2">
                    WHAT WE CLEAN
                </h3>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-8">
                    Surfaces We Pressure Wash
                </h2>
                <p className="mb-10 text-brand-slate">
                    From driveways to pool surrounds — we restore all outdoor surfaces safely and effectively.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    {whatWeClean.map((item, index) => {
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

            {/* Real benefits of pessure washing */}
            <section className="bg-slate-50 py-16">
                <div className="max-w-6xl mx-auto px-4">

                    {/* Subheading */}
                    <h4 className="text-action-gold font-bold text-lg text-center mb-2">
                        WHY IT MATTERS
                    </h4>

                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy text-center mb-6">
                        The Real Benefits of Professional Pressure Washing
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Pressure washing is more than cosmetic — it actively protects your property, improves safety, and extends the life of your outdoor surfaces.
                    </p>

                    {/* Benefits List */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {benefitsOfPressureWashing.map((benefit) => (
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
                            beforeImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772967205/street-before-cleaning_iupbdq.jpg"
                            afterImage="https://res.cloudinary.com/dr8tjrszy/image/upload/v1772800983/after-cleaning-street_lhtqux.jpg"
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
                        Why Perth Homeowners Choose Us for Pressure Washing
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        With hundreds of 5-star reviews across Perth, Aspect Window Cleaning is the trusted name for safe, effective pressure washing that delivers results every time.
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
                        How Our Pressure Washing Service Works
                    </h2>

                    {/* Intro */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Simple, fast, and hassle-free — from your first call to freshly restored surfaces.
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
                    title="Everything you need to know about our pressure washing service in Perth."
                    faqs={pressureWashing}
                />
            </section>

            {/* CTA */}
            <CTA title="Ready to Restore Your Property" />

        </div>
    );
}

export default PressureWashing