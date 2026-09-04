import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import { ChevronsRight } from "lucide-react";
import CTA from "@/components/CTA";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

type FaqsType = {
    question: string;
    answer: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Residential Window Cleaning Perth | Interior & Exterior | Aspect Window Cleaning",
    description:
        "Professional residential window cleaning in Perth. Interior, exterior, screens & tracks. Pure water technology, streak-free finish. Fully insured. Free quotes.",
};

const whatsInclude = [
    {
        icon: ChevronsRight,
        title: "Interior & Exterior Glass",
        description:
            "We clean every pane on both sides using pure water technology - removing Perth's salt, dust, and grime for glass so clear it practically disappears.",
    },
    {
        icon: ChevronsRight,
        title: "Frames, Sills & Tracks",
        description:
            "Salt, moisture, and organic matter trapped in frames and tracks breed mould and corrode seals. We remove all of it - protecting your window system, not just the glass.",
    },
    {
        icon: ChevronsRight,
        title: "Screen & Fly Screen Cleaning",
        description:
            "Dirty screens block up to 25% of natural airflow and cast a visible haze over your view. We remove, wash, and refit every screen - restoring your light and breeze.",
    },
    {
        icon: ChevronsRight,
        title: "Pure Water Cleaning Method",
        description:
            "Our purified, deionised water contains zero minerals - so when it evaporates, it leaves absolutely nothing behind. No residue, no spots, no streaks. Windows stay cleaner for longer.",
    },
    {
        icon: ChevronsRight,
        title: "Hard Water Stain Removal",
        description:
            "Perth's water is mineral-rich and relentless. We use specialist solutions to dissolve calcium and magnesium deposits before they permanently etch your glass - restoring full clarity.",
    },
    {
        icon: ChevronsRight,
        title: "Streak-Free Polish",
        description:
            "Every pane is hand-finished with a professional streak-free polish. Checked in multiple lighting angles until it's flawless - because streaks are only invisible until the sun hits.",
    },
];

const benefitsOfCommercialCleaning = [
    {
        number: "01",
        title: "Maximise Natural Light & Comfort",
        description:
            "Every layer of grime on your windows blocks natural light from entering your home. Professional cleaning removes that barrier - making rooms measurably brighter and more comfortable without changing your electricity bill.",
    },
    {
        number: "02",
        title: "Protect Glass from Long-Term Damage",
        description:
            "Perth's mineral-rich water and salt air etch permanently into glass over time. Once bonded, these deposits can't be removed with standard cleaning - and glass replacement costs hundreds per pane. Regular professional cleaning stops the damage before it starts.",
    },
    {
        number: "03",
        title: "Improve Kerb Appeal & Property Value",
        description:
            "Sparkling windows transform how your home looks from the street - immediately. Whether you're selling, renting, or just taking pride in your property, clean windows are the fastest way to lift your home's appearance and perceived value.",
    },
    {
        number: "04",
        title: "Healthier Indoor Environment",
        description:
            "Mould, dust mites, and pollen accumulate in dirty tracks and sills and circulate through your home every time you open a window. A thorough clean removes these allergens at the source - something a quick wipe can't do.",
    },
];

const whyAspectPoints = [
    {
        title: "Pure Water Technology",
        description:
            "Our purified water system produces 0ppm deionised water - leaving zero mineral residue on glass. Your windows dry spotless every time and stay cleaner up to twice as long between services compared to traditional cleaning methods.",
    },
    {
        title: "Eco-Friendly Cleaning Solutions",
        description:
            "All our products are non-toxic, biodegradable, and safe for kids, pets, and Perth's sensitive garden environments. We deliver professional-grade results without a single drop of harsh chemical on your property.",
    },
    {
        title: "Trained & Police-Cleared Team",
        description:
            "Every Aspect technician is professionally trained, police-cleared, and covered by $20M public liability insurance. You're not just letting a cleaner in - you're letting in a verified professional.",
    },
    {
        title: "Flexible Scheduling & Reliable Service",
        description:
            "Same-week bookings across the Perth metro. We send a reminder the day before, arrive within the agreed window, and we don't pack up until the job meets our standard - which means it'll meet yours.",
    },
];

const processSteps = [
    {
        number: "01",
        title: "Get a Free Quote",
        description:
            "Tell us your property type and window count - we'll give you a fast, transparent price.",
    },
    {
        number: "02",
        title: "Book a Time",
        description:
            "Same-week availability across Perth. Pick a time that works for you.",
    },
    {
        number: "03",
        title: "We Clean",
        description:
            "Our technician arrives on time, cleans every window thoroughly inside and out.",
    },
    {
        number: "04",
        title: "Inspect & Approve",
        description:
            "We walk you through the results. Fully satisfied? Done. Not happy? We fix it.",
    },
];

const pressureWashing: FaqsType[] = [
    {
        question: "How often should I have my windows cleaned?",
        answer:
            "For most Perth homes, twice a year is a solid baseline - but it's rarely enough on its own. Properties within 3km of the coast need cleans every 6-8 weeks due to salt air buildup. Homes surrounded by eucalyptus or in dusty outer suburbs benefit from quarterly visits. We'll recommend the right frequency for your property after the first job.",
    },
    {
        question: "What is pure water window cleaning and why is it better?",
        answer:
            "Pure water cleaning uses deionised water - stripped of every dissolved mineral - fed through an extendable pole with a soft-brush head. Because the water is 100% pure, when it evaporates it leaves nothing behind: no mineral spots, no residue, no streaks. It also allows us to safely clean windows up to 4 stories high from the ground - no ladders on your roof, no risk.",
    },
    {
        question: "Do you clean both the inside and outside of windows?",
        answer:
            "Yes - our standard service includes both interior and exterior glass, plus frames, sills, tracks, and screens. If you only need exterior or a specific area done, we can absolutely accommodate that. Just tell us when booking and we'll adjust the scope and quote accordingly.",
    },
    {
        question: "Are your products safe for my family and pets?",
        answer:
            "Absolutely. We use non-toxic, biodegradable, eco-friendly cleaning solutions that are completely safe for children, pets, and garden plants. We never use harsh chemicals near your home.",
    },
    {
        question: "Can you clean windows at height on double-storey homes?",
        answer:
            "Yes. Our team is equipped and trained for safe access to single and double-storey properties. We use water-fed poles, ladders, and appropriate safety equipment to reach all windows without risk to your property or our team. ",
    },
    {
        question: "Do I need to be home during the clean?",
        answer:
            "Not necessarily. As long as we have safe access to the exterior, we can complete the outside clean while you're away. For interior cleaning, someone does need to be present. We'll confirm all access requirements when you book.",
    },
    {
        question: "What areas of Perth do you service?",
        answer:
            "We service the full Perth metro area - including Joondalup, Fremantle, Subiaco, Cottesloe, and 100+ surrounding suburbs. Contact us to confirm availability in your area. ",
    },
];

const ResidentialWindowCleaning = () => {
    return (
        <div className="bg-white text-brand-slate">

            {/* HERO */}
            <section className="bg-brand-navy text-white pt-30 pb-24 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    Professional Window Cleaning Services
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    Streak-Free Results for Homes & Businesses Across Perth.
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
                    Perth's Premier Window Cleaning Specialists
                </h2>
                <p className="mb-4">
                    Clean windows do far more than improve appearances - they let natural light flood your home, 
boost your property's kerb appeal, and protect your glass from long-term damage caused by mineral deposits, pollution, 
and environmental buildup. At Aspect Window Cleaning, we deliver streak-free, crystal-clear results for residential and <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline">commercial properties</Link> across the entire <Link href="/locations" className="text-action-gold hover:underline">Perth metro area</Link>. Our trained, police-cleared 
technicians use the latest pure water technology and eco-friendly solutions to give you spotless windows - every 
single time. We also offer <Link href="/services/solar-panel-washing" className="text-action-gold hover:underline">solar panel washing</Link> and <Link href="/services/gutter-cleaning" className="text-action-gold hover:underline">gutter cleaning</Link>.
                </p>
            </section>

            {/* IMAGE */}
            <section className="py-5">
                <div className="max-w-5xl mx-auto px-4">
                    <Image
                        src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960139/WhatsApp_Image_2026-02-22_at_8.47.53_PM_1_utloaq.jpg"
                        alt="Residential window cleaning in Perth"
                        width={1000}
                        height={300}
                        className="rounded-xl"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                </div>
            </section>

            {/* Our services */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <h3 className="text-sm text-action-gold font-semibold uppercase mb-2">
                    OUR SERVICES
                </h3>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">
                    Residential & Commercial Window Cleaning
                </h2>
                <p className="mb-12 text-brand-slate max-w-3xl">
                    Whether you own a single-storey home or manage a multi-level commercial building, we have the equipment, training, and experience to deliver outstanding results.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Residential Service */}
                    <div className="group">
                        <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                            <Image
                                src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1771960141/WhatsApp_Image_2026-02-22_at_8.47.56_PM_1_ekwlh4.jpg"
                                alt="Technician cleaning residential home windows"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#ffe54d]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h4 className="font-semibold text-xl text-brand-navy mb-3">
                            Residential Window Cleaning
                        </h4>
                        <p className="text-brand-slate text-sm leading-relaxed">
                            Transform your home with crystal-clear windows from top to bottom. We clean every pane, frame, sill, screen, and track - restoring brightness and improving your home's appearance inside and out. Ideal for regular maintenance or pre-sale preparation.
                        </p>
                    </div>

                    {/* Commercial Service */}
                    <div className="group">
                        <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                            <Image
                                src="https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960134/commercial-window-cleaning_gzkvaj.jpg"
                                alt="Technician cleaning large commercial glass facade"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#ffe54d]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <h4 className="font-semibold text-xl text-brand-navy mb-3">
                            Commercial Window Cleaning
                        </h4>
                        <p className="text-brand-slate text-sm leading-relaxed">
                            First impressions matter for your business. Our commercial window cleaning service keeps your shopfront, office, or strata building looking polished and professional at all times. We offer flexible scheduling including after-hours to minimise disruption.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHAT's Include */}
            <section className="py-16 max-w-5xl mx-auto px-4">
                <h3 className="text-sm text-action-gold font-semibold uppercase mb-2">
                    WHAT'S INCLUDED
                </h3>
                <h2 className="text-3xl font-heading font-bold text-brand-navy mb-8">
                    Everything Covered in Our Window Clean
                </h2>
                <p className="mb-10 text-brand-slate">
                    We don't cut corners. Every booking includes a full, thorough clean of all accessible window components - not just the glass.
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
                        The Real Benefits of Professional Window Cleaning
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        Regular professional window cleaning is more than cosmetic - it actively protects your glass, improves your living
                        environment, and adds value to your property.
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
                        Why Perth Chooses Aspect Window Cleaning
                    </h2>

                    {/* Intro paragraph */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        With a 5.0 Google rating and hundreds of five-star reviews, Aspect Window Cleaning is Perth's most trusted
                        window cleaning service.
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
                        How Our Window Cleaning Works
                    </h2>

                    {/* Intro */}
                    <p className="text-center text-brand-slate max-w-3xl mx-auto mb-12">
                        A simple, stress-free experience from first contact to spotless windows.
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
                    title="Everything you need to know about our window cleaning service"
                    faqs={pressureWashing}
                />
            </section>

            {/* CTA */}
            <CTA title="Book Your Window Cleaning Today" />

        </div>
    );
}

export default ResidentialWindowCleaning
