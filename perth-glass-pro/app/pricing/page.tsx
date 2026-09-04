import React from "react";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import TrustGrid from "@/components/TrustGrid";
import ResultsAndReviews from "@/components/ResultsAndReviews";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            {/* Header Section */}
            <section className="bg-brand-navy text-white pt-16 pb-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Transparent Pricing for Premium Cleaning</h1>
                    <p className="text-xl text-brand-water mb-8 max-w-2xl mx-auto">
                        At Aspect Window Cleaning, we believe in complete transparency. Our pricing structure is designed to give you clear expectations with no hidden fees. Whether you need a quick wash or a supreme detailing, we have a package to suit your property.
                    </p>
                    <Link href="/quote" className="shimmer-btn bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:shadow-xl transition-shadow inline-block">
                        Get an Instant Quote
                    </Link>
                </div>
            </section>

            {/* Understanding Our Tiers */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-brand-navy mb-4">Understanding Our Service Tiers</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">We offer two distinct levels of window cleaning to ensure you get exactly the result you need. Here is a detailed breakdown of the difference between a Basic Wash and Detailing.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-2xl font-bold text-brand-navy mb-4 border-b pb-4">Basic Wash</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Our Basic Wash is the standard cleaning procedure using professional-grade soap, applicators, and squeegees. It is designed to remove general dirt, dust, and environmental grime that accumulates over a few months. 
                            <br/><br/>
                            This tier is perfect for regular maintenance cleans, keeping your glass looking clear and bright. It involves scrubbing the glass surface to agitate standard dirt, followed by a squeegee finish to leave a streak-free shine. While highly effective for normal conditions, it will not remove baked-on debris.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="text-2xl font-bold text-brand-navy mb-4 border-b pb-4">Detailing (Premium)</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Detailing is our advanced, restorative cleaning process. It is specifically required for the removal of stubborn, stuck-on debris that will not budge with standard soap and scrubbing.
                            <br/><br/>
                            This includes removing paint overspray, chemical deposits from building rendering, hard water mineral stains, calcification, rust stains, and heavy sticker residue. We use specialized glass scrapers, grade-0000 steel wool, and commercial mineral removers. Because of the intensive labor and specialized tools required, Detailing is priced starting at 40% higher than a Basic Wash.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Packages */}
            <section className="bg-white py-16 border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Core Packages</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Choose the level of thoroughness that matches your property's current condition.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Essential */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative flex flex-col">
                            <h3 className="text-2xl font-bold text-brand-navy mb-2">Essential</h3>
                            <p className="text-gray-500 mb-6">External standard clean only</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Exterior glass cleaning using Basic Wash techniques</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Removal of general environmental dirt and dust</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Perfect for quick touch-ups before an event or inspection</span>
                                </li>
                            </ul>
                        </div>

                        {/* Standard */}
                        <div className="bg-brand-navy rounded-3xl p-8 border border-brand-navy shadow-xl relative flex flex-col transform md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action-gold text-brand-navy px-4 py-1 rounded-full text-sm font-bold tracking-wide">MOST POPULAR</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Standard</h3>
                            <p className="text-brand-water mb-6">Inside and out basic wash</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                                    <span className="text-gray-200">Both interior and exterior glass cleaning</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                                    <span className="text-gray-200">Major spots will be removed</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                                    <span className="text-gray-200">Expect a 90% finish suitable for most people and regular maintenance</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-action-gold shrink-0 mt-0.5" />
                                    <span className="text-gray-200">Includes wiping all frames, sills, and flyscreens</span>
                                </li>
                            </ul>
                        </div>

                        {/* Supreme */}
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 relative flex flex-col">
                            <h3 className="text-2xl font-bold text-brand-navy mb-2">Supreme</h3>
                            <p className="text-gray-500 mb-6">Inside and out detailing</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Restorative interior and exterior glass detailing</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Removal of all stuck-on items (paint, hard water stains, calcification)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Custom packages available if only some panels require this intense level of detail</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Deep cleaning of all frames, sills, and flyscreens</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Pricing Tables */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                
                {/* Residential */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        <h2 className="text-3xl font-bold text-brand-navy">Residential Pricing</h2>
                        <Link href="/services/residential-window-cleaning" className="text-blue-600 hover:underline font-semibold hidden md:block">Learn more about Residential Cleaning &rarr;</Link>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Single Storey Home</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential</span><span className="font-bold text-brand-navy">From $159</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard</span><span className="font-bold text-brand-navy">From $279</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme</span><span className="font-bold text-brand-navy">From $479</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Double Storey Home</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential</span><span className="font-bold text-brand-navy">From $279</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard</span><span className="font-bold text-brand-navy">From $499</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme</span><span className="font-bold text-brand-navy">From $859</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Apartment</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential</span><span className="font-bold text-brand-navy">From $169</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard</span><span className="font-bold text-brand-navy">From $309</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme</span><span className="font-bold text-brand-navy">From $539</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
                        <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-brand-navy mb-1">Residential Add-Ons (From $40)</h4>
                            <p className="text-sm text-gray-600">We offer highly specialized deep cleaning services that can be added to any package. These include sliding door tracks deep cleaning, interior mirrors, glass pool fencing, and glass balustrades. Contact us to customize your package.</p>
                        </div>
                    </div>
                </div>

                {/* Commercial */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                        <h2 className="text-3xl font-bold text-brand-navy">Commercial Pricing</h2>
                        <Link href="/services/commercial-window-cleaning" className="text-blue-600 hover:underline font-semibold hidden md:block">Learn more about Commercial Cleaning &rarr;</Link>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Shopfronts (Ground)</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential</span><span className="font-bold text-brand-navy">From $90</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard</span><span className="font-bold text-brand-navy">From $99</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme</span><span className="font-bold text-brand-navy">From $179</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Offices & Buildings</h4>
                            <p className="text-sm text-gray-500 mb-4">Includes wiping all frames, sills, and flyscreens</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Essential</span><span className="font-bold text-brand-navy">From $219</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600">Standard</span><span className="font-bold text-brand-navy">From $389</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600">Supreme</span><span className="font-bold text-brand-navy">From $669</span></li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Office Partitions</h4>
                            <p className="text-sm text-gray-500 mb-4">Cleaning of interior glass partitions</p>
                            <ul className="space-y-3">
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Essential (External only)</span><span className="font-bold text-brand-navy">From $79</span></li>
                                <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Standard (Both sides)</span><span className="font-bold text-brand-navy">From $139</span></li>
                                <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Supreme (Both detailed)</span><span className="font-bold text-brand-navy">From $229</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
                        <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-brand-navy mb-1">Commercial Add-Ons (From $80)</h4>
                            <p className="text-sm text-gray-600">Elevate your business presentation with our commercial add-ons. We provide specialized cleaning for commercial glass balustrades, architectural skylights, external business signage, and awnings. Pricing is customized based on square meterage and accessibility requirements.</p>
                        </div>
                    </div>
                </div>

                {/* Additional Services */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-brand-navy mb-8 border-b pb-4">Specialized Services</h2>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Solar */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-brand-navy text-white p-4">
                                <h3 className="text-xl font-bold">Solar Panel Cleaning</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-6 line-clamp-4">
                                    Maximize your energy output with professional solar panel washing. We use advanced reverse osmosis machines to deliver purified water to your panels, ensuring a 100% streak-free finish without the use of harsh chemicals that could degrade the panel surfaces. <Link href="/services/solar-panel-washing" className="text-blue-600 hover:underline">Read more</Link>
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Single Storey Home</span><span className="font-bold text-brand-navy">From $290</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Double Storey Home</span><span className="font-bold text-brand-navy">From $380</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Commercial</span><span className="font-bold text-brand-navy">POA</span></li>
                                    <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Solar Farms</span><span className="font-bold text-brand-navy">From $1.80/panel</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Gutters */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-brand-navy text-white p-4">
                                <h3 className="text-xl font-bold">Gutter Cleaning</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-6 line-clamp-4">
                                    Protect your property from water damage and fire hazards with our comprehensive gutter clearing service. Our package includes the manual removal of all leaves and debris, thorough flushing of all downpipes to ensure proper drainage, and site cleanup. <Link href="/services/gutter-cleaning" className="text-blue-600 hover:underline">Read more</Link>
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Single Storey Home</span><span className="font-bold text-brand-navy">From $290</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Double Storey Home</span><span className="font-bold text-brand-navy">From $450</span></li>
                                    <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Commercial</span><span className="font-bold text-brand-navy">POA</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Pressure Cleaning */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-brand-navy text-white p-4">
                                <h3 className="text-xl font-bold">Pressure Cleaning</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-600 mb-6 line-clamp-4">
                                    Restore the pristine appearance of your property's exterior. We utilize industrial-grade pressure washing equipment with specialized surface cleaner disks and precision wands to strip away years of embedded grime, mould, and algae safely and effectively. <Link href="/services/pressure-washing" className="text-blue-600 hover:underline">Read more</Link>
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Floors (Driveways/Bricks)</span><span className="font-bold text-brand-navy">From $190</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Walls (Concrete/Brick)</span><span className="font-bold text-brand-navy">From $270</span></li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-600 text-sm">Facade (Shop Fronts)</span><span className="font-bold text-brand-navy">From $290</span></li>
                                    <li className="flex justify-between pb-2"><span className="text-gray-600 text-sm">Building Washdown</span><span className="font-bold text-brand-navy">POA</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust and Reviews Section */}
            <TrustGrid />
            <ResultsAndReviews />

            {/* Final CTA */}
            <section className="bg-brand-navy text-white py-20 text-center px-4 mt-12">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Aspect Difference?</h2>
                    <p className="text-brand-water text-lg mb-8">
                        Our pricing is transparent, and our results are guaranteed. Use our instant residential quote tool to lock in your price and preferred booking date in under 60 seconds.
                    </p>
                    <Link href="/quote" className="shimmer-btn bg-action-gold text-brand-navy font-bold px-8 py-4 rounded-full text-lg hover:shadow-xl transition-shadow inline-block">
                        Get Your Free Estimate Now
                    </Link>
                </div>
            </section>
        </main>
    );
}