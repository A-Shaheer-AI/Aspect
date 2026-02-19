import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Home, Building2, Sun, Droplets } from "lucide-react";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
    title: "Our Services | Aspect Window Cleaning Perth",
    description: "Comprehensive window cleaning services in Perth. From residential and commercial to solar panels and pressure washing. View our full service list.",
};

const MAIN_SERVICES = [
    {
        id: "residential",
        title: "Residential Window Cleaning",
        description: "Complete interior and exterior window cleaning for homes of all sizes. Includes flyscreen cleaning, track vacuuming, and frame wiping. We treat your home with care and respect.",
        icon: Home,
        features: ["Interior & Exterior", "Flyscreens & Tracks", "Frame Cleaning", "Double Story"],
        link: "/residential",
    },
    {
        id: "commercial",
        title: "Commercial Window Cleaning",
        description: "Professional cleaning for offices, shopfronts, and strata properties. We use water-fed poles for high reach and comply with all safety regulations including EWP work.",
        icon: Building2,
        features: ["Offices & Retail", "Strata Complexes", "High Reach (EWP)", "Safety Compliant"],
        link: "/commercial",
    },
    {
        id: "solar",
        title: "Solar Panel Cleaning",
        description: "Maximize your solar energy production by removing dust, bird droppings, and grime. We use pure water technology to leave panels spot-free and efficient.",
        icon: Sun,
        features: ["Pure Water System", "Efficiency Boost", "Safe Access", "Chemical Free"],
        link: "/services/solar-panel-washing",
    },
    {
        id: "pressure",
        title: "Pressure Cleaning",
        description: "High-pressure cleaning for driveways, pavers, patios, and building facades. Remove stubborn stains, moss, and dirt to revitalize your property's appearance.",
        icon: Droplets,
        features: ["Driveways & Paving", "Building Washdowns", "Soft Washing", "Stain Removal"],
        link: "/services/pressure-cleaning",
    },
];

const ALL_SERVICES_LIST = [
    "Interior window cleaning", "Exterior window cleaning", "Screen cleaning", "Post-construction window cleaning",
    "Skylight cleaning", "Hard water stain removal", "Window track cleaning", "Storm window cleaning",
    "Glass door cleaning", "Window frame cleaning", "Mirror cleaning", "Office window cleaning",
    "Window washing", "Stained glass cleaning", "Awning cleaning", "Balcony glass cleaning",
    "After builders window cleaning", "Showroom window cleaning", "Winter window cleaning", "Retail window cleaning",
    "Conservatory window cleaning", "French window cleaning", "Storefront window cleaning", "Window restoration",
    "Scratch removal", "Caulking and sealing", "Apartment window cleaning", "Hotel window cleaning",
    "Window tint cleaning", "Porch window cleaning", "Window inspection", "School window cleaning",
    "Medical facility window cleaning", "Industrial window cleaning", "Window ledge cleaning", "Sill cleaning",
    "Window sticker removal", "Holiday window cleaning", "Move in window cleaning", "Move out window cleaning",
    "Patio door cleaning", "Sunroom window cleaning", "Custom window cleaning", "Rooftop/skylight cleaning",
    "Facade washing", "Glass and mirror cleaning", "Interior and exterior window cleaning", "Car Showroom Window Cleaning",
    "Window Cleaning Solutions", "Clinic Window Cleaning", "Commercial Window Cleaning Maintenance", "Comprehensive Window Cleaning",
    "Domestic Window Cleaning", "External Cleaning Window", "Facade Window Cleaning", "Flyscreen Cleaning",
    "French Windows Cleaned", "Glass Roof Cleaning", "Glass Stain Removal", "Graffiti Removal",
    "High Pressure Cleaning", "Home Window Cleaning", "Hospital Window Cleaning", "House Window Cleaning",
    "Low-rise Window Cleaning", "Regular Maintenance", "Restaurant Window Cleaning", "STRATA Window Cleaning",
    "Shopfront Window Cleaning", "Shopping Center Window Cleaning", "Stain Removal", "Standard Window Cleaning",
    "Townhouse Window Cleaning", "Water Fed Poles", "Window Graffiti Removal", "Window Cleaning Construction",
    "Window Cleaning Process", "Construction Window Cleaning Service", "Deep Clean", "Eco-Friendly Cleaning Solutions",
    "End of Lease Cleaning", "Environmentally Friendly Cleaning", "New construction window cleaning", "Scheduled Maintenance",
    "Strata Services window cleaning", "Window Cleaning Perth", "Domestic Window Cleaners", "Floor Window Cleaning",
    "Full-Service Window Cleaning", "High Pressure Washing", "Monthly Window Cleaning", "Residential Window Cleaners",
    "Sparkling Clean Windows", "Environmentally Responsible Cleaning", "Frequent Window Cleaning", "Glass Fence Cleaning",
    "Patio Area Window Cleaning", "Periodic Maintenance", "Pool Fence Cleaning", "Building Windows Cleaning",
    "Commercial Properties", "Commercial strata window cleaning", "Fly Screens Cleaning", "Glass Window Cleaning",
    "High-Pressure Washers", "Personalised Cleaning", "Pure Water Technology", "Residential strata window cleaning",
    "Window Cleaners", "Wiping Down", "External Window Cleaning", "Glass Pool Fence & Balustrade Cleaning",
    "Internal Window Cleaning", "Personalised Service", "Commercial Window Cleaning Services", "Glass Balustrade Cleaning",
    "High Access Window Cleaning", "Maintenance & Repairs", "Solar Panel Cleaning Services", "Balustrade cleaning",
    "Cobweb Removal", "Dirt Removal", "External Building Washing", "External House Washing", "Flyscreen Mesh Cleaning",
    "Window Cleaning Home Services", "Mould Removal", "Power Cleaning", "Residential House Window Cleaning",
    "Shopfront Windows Cleaned", "Water Fed Pole System"
];

// Remove duplicates and sort alphabetically
const UNIQUE_SERVICES = Array.from(new Set(ALL_SERVICES_LIST)).sort();

export default function ServicesPage() {
    return (
        <main className="bg-brand-snow min-h-screen ">
            {/* Hero */}
            <section className="bg-brand-navy text-white py-24">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
                        Our Cleaning <span className="text-action-gold">Services</span>
                    </h1>
                    <p className="text-xl text-brand-slate max-w-2xl mx-auto">
                        We offer a comprehensive range of cleaning solutions for residential and commercial properties across Perth.
                    </p>
                </div>
            </section>
            {/* Header */}
            {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-navy mb-6">
                    Our Cleaning <span className="text-action-gold">Services</span>
                </h1>
                <p className="text-xl text-brand-slate max-w-2xl mx-auto">
                    We offer a comprehensive range of cleaning solutions for residential and commercial properties across Perth.
                </p>
            </div> */}

            {/* Main Services (Detailed) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-10">
                <div className="grid md:grid-cols-2 gap-8">
                    {MAIN_SERVICES.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:border-action-gold/30 transition-colors group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-brand-navy/5 rounded-xl text-brand-navy group-hover:bg-action-gold group-hover:text-brand-navy transition-colors">
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-action-gold transition-colors" />
                            </div>
                            <h2 className="text-2xl font-bold text-brand-navy mb-3">{service.title}</h2>
                            <p className="text-brand-slate mb-6 leading-relaxed">{service.description}</p>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm text-brand-navy/80 font-medium">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={service.link}
                                className="inline-flex items-center text-action-gold font-bold hover:gap-2 transition-all"
                            >
                                Learn More <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Full Service List */}
            <section className="bg-white py-20 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-brand-navy mb-4">
                            Complete Service List
                        </h2>
                        <p className="text-brand-slate text-lg">
                            If you need it cleaned, we can probably do it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                        {UNIQUE_SERVICES.map((service, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-snow transition-colors"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-action-gold/70 flex-shrink-0" />
                                <span className="text-brand-navy/80 text-sm font-medium">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactSection />
        </main>
    );
}
