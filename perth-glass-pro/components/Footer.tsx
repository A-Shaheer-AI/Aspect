import Link from "next/link";
import { openCertificateModal } from "@/components/CertificateModalWrapper";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import Image from "next/image";
import { getGmbData } from "@/app/actions/gmb";

export default async function Footer() {
    const gmbData = await getGmbData();
    const currentYear = new Date().getFullYear();

    const services = [
        { name: "Residential Window Cleaning", href: "/services/residential-window-cleaning" },
        { name: "Commercial Cleaning", href: "/services/commercial-window-cleaning" },
        { name: "Solar Panel Washing", href: "/services/solar-panel-washing" },
        { name: "Gutter Cleaning", href: "/services/gutter-cleaning" },
        { name: "Pressure Washing", href: "/services/pressure-washing" },
    ];

    const quickLinks = [
        { name: "Pricing & Packages", href: "/pricing" },
        { name: "Recent Case Studies", href: "/case-studies" },
        { name: "Window Cleaning Blog", href: "/blog" },
        { name: "Project Portfolio", href: "/portfolio" },
        { name: "Contact Us", href: "/contact" },
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
                            {BUSINESS.name}
                        </h3>
                        <p className="text-gray-400 text-xs mb-3">
                            Perth&apos;s professional precision window cleaning specialists. Safe, reliable residential &amp;
                            commercial window cleaning services across all 373 Perth suburbs.
                        </p>
                        <div className="flex flex-col gap-2 text-sm">
                            <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2 text-gray-300 hover:text-action-gold">
                                <Phone className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                {BUSINESS.phone}
                            </a>
                            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 text-gray-300 hover:text-action-gold">
                                <Mail className="w-4 h-4 text-action-gold" aria-hidden="true" />
                                {BUSINESS.email}
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-sm mb-3 text-white">Services</h4>
                        <ul className="space-y-1.5">
                            {services.slice(0, 4).map((service) => (
                                <li key={service.name}>
                                    <Link href={service.href} className="text-gray-400 hover:text-action-gold text-xs">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/services" className="text-action-gold text-xs font-medium">
                                    All services →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm mb-3 text-white">Quick Links</h4>
                        <ul className="space-y-1.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-gray-400 hover:text-action-gold text-xs">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas */}
                    <div className="col-span-2 pt-2 border-t border-white/10">
                        <h4 className="font-bold text-sm mb-2 text-white">Service Areas</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                            {areas.map((area) => (
                                <Link key={area.name} href={area.href} className="text-gray-400 hover:text-action-gold">
                                    {area.name}
                                </Link>
                            ))}
                            <Link href="/locations" className="text-action-gold font-medium">
                                All 373 suburbs →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* DESKTOP: 5-column layout */}
                <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
                    {/* Brand */}
                    <div className="flex flex-col gap-4 lg:col-span-1">
                        <Image
                            src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto/v1772130850/white-logo_pzpxjk.png"
                            width={90}
                            height={90}
                            sizes="180px"
                            alt="aspect-window-cleaning-logo"
                            className="object-contain"
                        />
                        <p className="text-gray-300 text-xs leading-relaxed">
                            Perth&apos;s professional precision window cleaning specialists. Safe, streak-free residential &amp;
                            commercial cleaning across the entire metropolitan area.
                        </p>
                        <div className="flex items-start gap-2 text-gray-300 text-xs mt-1">
                            <MapPin className="w-4 h-4 text-action-gold shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{gmbData.address}</span>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-base mb-4 text-white">Our Services</h4>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        href={service.href}
                                        className="text-gray-300 hover:text-action-gold transition-colors text-xs sm:text-sm"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-1">
                                <Link
                                    href="/services"
                                    className="text-action-gold hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1"
                                >
                                    <span>All Services</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links / Explore */}
                    <div>
                        <h4 className="font-bold text-base mb-4 text-white">Explore</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-300 hover:text-action-gold transition-colors text-xs sm:text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas */}
                    <div>
                        <h4 className="font-bold text-base mb-4 text-white">Service Areas</h4>
                        <ul className="space-y-2">
                            {areas.map((area) => (
                                <li key={area.name}>
                                    <Link
                                        href={area.href}
                                        className="text-gray-300 hover:text-action-gold transition-colors text-xs sm:text-sm"
                                    >
                                        {area.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-1">
                                <Link
                                    href="/locations"
                                    className="text-action-gold hover:underline text-xs sm:text-sm font-medium inline-flex items-center gap-1"
                                >
                                    <span>All 373 Suburbs</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-1">
                        <h4 className="font-bold text-base mb-4 text-white">Contact Us</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-2.5 text-gray-300 hover:text-action-gold transition-colors text-xs sm:text-sm">
                                    <Phone className="w-4 h-4 text-action-gold shrink-0" aria-hidden="true" />
                                    <span>{BUSINESS.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2.5 text-gray-300 hover:text-action-gold transition-colors text-xs sm:text-sm">
                                    <Mail className="w-4 h-4 text-action-gold shrink-0" aria-hidden="true" />
                                    <span>{BUSINESS.email}</span>
                                </a>
                            </li>
                        </ul>
                        <div className="mt-3">
                            <iframe
                                title="Google Maps location of Aspect Window Cleaning"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.2706528608983!2d115.79041641168274!3d-31.980677723649464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xafbbd7c3dd591183%3A0xe683c8a7e7212664!2sAspect%20Window%20Cleaning!5e0!3m2!1sen!2sau!4v1768258784219!5m2!1sen!2sau"
                                width="100%"
                                height="120"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg"
                            />
                        </div>
                        <div className="mt-3 p-2.5 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-[11px] text-gray-400 leading-normal">
                                <button onClick={() => openCertificateModal('insured')} className="hover:text-white transition-colors underline decoration-dashed underline-offset-2">Fully insured</button> &bull; 
                                <button onClick={() => openCertificateModal('police')} className="hover:text-white transition-colors underline decoration-dashed underline-offset-2">Police cleared</button> &bull; 
                                ABN Registered
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-xs text-gray-500">
                        © {currentYear} Aspect Window Cleaning. All rights reserved.
                    </p>
                    <div className="flex gap-4 sm:gap-6 text-xs text-gray-500">
                        <Link href="/privacy" className="hover:text-gray-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-gray-300">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
