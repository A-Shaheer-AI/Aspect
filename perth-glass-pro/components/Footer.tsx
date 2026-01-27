import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const services = [
        { name: "Window Cleaning", href: "/services/window-cleaning" },
        { name: "Solar Panel Washing", href: "/services/solar-panel-washing" },
        { name: "Commercial Cleaning", href: "/services/commercial-cleaning" },
        { name: "Gutter Cleaning", href: "/services/gutter-cleaning" },
        { name: "Pressure Washing", href: "/services/pressure-washing" },
    ];

    const areas = [
        { name: "Joondalup", href: "/locations/joondalup" },
        { name: "Fremantle", href: "/locations/fremantle" },
        { name: "Subiaco", href: "/locations/subiaco" },
        { name: "Cottesloe", href: "/locations/cottesloe" },
    ];

    return (
        <footer className="bg-pattern-cleaning text-white py-10 sm:py-16 pb-24 sm:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* MOBILE: Compact 2-column layout */}
                <div className="grid grid-cols-2 gap-6 sm:hidden">
                    {/* Brand + Contact */}
                    <div className="col-span-2">
                        <h3 className="font-heading font-bold text-xl mb-2 text-action-gold">
                            Aspect
                        </h3>
                        <p className="text-gray-400 text-xs mb-3">
                            Perth&apos;s window cleaning specialists
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                            <a href="tel:+61400000000" className="flex items-center gap-2 text-gray-300 hover:text-action-gold">
                                <Phone className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                04XX XXX XXX
                            </a>
                            <a href="mailto:hello@aspect.com.au" className="flex items-center gap-2 text-gray-300 hover:text-action-gold">
                                <Mail className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                hello@aspect.com.au
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-sm mb-3">Services</h4>
                        <ul className="space-y-1.5">
                            {services.slice(0, 4).map((service) => (
                                <li key={service.name}>
                                    <Link href={service.href} className="text-gray-400 hover:text-action-gold text-xs">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas */}
                    <div>
                        <h4 className="font-bold text-sm mb-3">Areas</h4>
                        <ul className="space-y-1.5">
                            {areas.map((area) => (
                                <li key={area.name}>
                                    <Link href={area.href} className="text-gray-400 hover:text-action-gold text-xs">
                                        {area.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/locations" className="text-action-gold text-xs font-medium">
                                    All areas →
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* DESKTOP: Original 4-column layout */}
                <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-heading font-bold text-2xl mb-4 text-action-gold">
                            Aspect
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Perth&apos;s precision window cleaning specialists. Professional,
                            safe, and reliable service for residential and commercial
                            properties across the metro area.
                        </p>
                        <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4 text-action-gold" aria-hidden="true" />
                            <span className="text-sm">Perth, Western Australia</span>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        href={service.href}
                                        className="text-gray-300 hover:text-action-gold transition-colors text-sm"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Service Areas</h4>
                        <ul className="space-y-2">
                            {areas.map((area) => (
                                <li key={area.name}>
                                    <Link
                                        href={area.href}
                                        className="text-gray-300 hover:text-action-gold transition-colors text-sm"
                                    >
                                        {area.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/locations"
                                    className="text-action-gold hover:underline text-sm font-medium"
                                >
                                    View all 100+ suburbs →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:+61400000000"
                                    className="flex items-center gap-3 text-gray-300 hover:text-action-gold transition-colors"
                                >
                                    <Phone className="w-5 h-5 text-action-gold" aria-hidden="true" />
                                    <span>04XX XXX XXX</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hello@aspect.com.au"
                                    className="flex items-center gap-3 text-gray-300 hover:text-action-gold transition-colors"
                                >
                                    <Mail className="w-5 h-5 text-action-gold" aria-hidden="true" />
                                    <span>hello@aspect.com.au</span>
                                </a>
                            </li>
                        </ul>
                        <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-xs text-gray-400">
                                Fully insured • Police cleared • ABN Registered
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-xs text-gray-500">
                        © {currentYear} Aspect Window Cleaning
                    </p>
                    <div className="flex gap-4 sm:gap-6 text-xs text-gray-500">
                        <Link href="/privacy" className="hover:text-gray-300">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-gray-300">
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
