import Link from "next/link";
import Image from "next/image";
import { 
    Building2, 
    HardHat, 
    Droplets, 
    Clock, 
    Shield, 
    FileText, 
    CheckCircle2, 
    ArrowRight, 
    Phone,
    ExternalLink
} from "lucide-react";

export default function CommercialHomeSection() {
    const methods = [
        {
            icon: Droplets,
            title: "0 PPM Pure Water Reach Poles (Up to 4 Storeys)",
            badge: "Ground-Level Safety",
            description: "Ultra-lightweight telescopic carbon-fiber poles fed with laboratory-grade deionised water. Cleans multi-storey glass, aluminium frames, and sills safely from the ground without expensive boom permits or pedestrian scaffolding."
        },
        {
            icon: HardHat,
            title: "Certified Scissor Lifts & Cherry Pickers (EWPs)",
            badge: "Ticketed Operators",
            description: "High-Risk Work licensed Elevated Work Platform (EWP) technicians for multi-storey commercial complexes, architectural atriums, difficult elevations, and corporate sign fascias up to 4 storeys."
        },
        {
            icon: Clock,
            title: "24/7 Flexible After-Hours Maintenance",
            badge: "Zero Business Disruption",
            description: "Scheduled early morning (before 8:00 AM), evening, or weekend appointments. We keep footpaths clear and ensure zero disruption to trading hours, staff productivity, or customer access."
        }
    ];

    const complianceSignals = [
        { label: "$20M Public Liability", detail: "Comprehensive commercial insurance coverage" },
        { label: "100% Police-Cleared Staff", detail: "Directly employed crew, zero subcontracting" },
        { label: "WorkSafe WA & SWMS Compliant", detail: "Site-specific Job Safety Analysis & safety plans" },
        { label: "24-Hour Proposal Turnaround", detail: "Itemised commercial quotes for tenders & strata" }
    ];

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/70 to-slate-100/60 border-b border-slate-200/80 relative overflow-hidden">
            {/* Subtle architectural background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00008008_1px,transparent_1px),linear-gradient(to_bottom,#00008008_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* SECTION HEADER */}
                <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#000080]/10 border border-[#000080]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#000080] mb-4">
                        <Building2 className="w-3.5 h-3.5 text-action-gold" />
                        Commercial &amp; Strata Glazing Division
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-brand-navy tracking-tight leading-tight mb-4">
                        Commercial Window Cleaning Perth: Built for Facilities, Offices &amp; Strata
                    </h2>

                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        Specialist exterior facade washing and interior glass detailing for Perth businesses, corporate headquarters, automotive showrooms, and multi-storey strata communities up to 4 storeys.
                    </p>
                </div>

                {/* TWO-COLUMN SHOWCASE: Real Project Spotlight (Left) + Methods & Capabilities (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12">
                    
                    {/* LEFT COLUMN: REAL COMMERCIAL PROJECT SPOTLIGHT (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between bg-brand-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group border border-slate-800">
                        {/* Background glow accent */}
                        <div className="absolute -top-24 -right-24 w-60 h-60 bg-action-gold/15 rounded-full blur-3xl pointer-events-none" />

                        <div>
                            {/* Project Image */}
                            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg">
                                <Image
                                    src="https://res.cloudinary.com/dr8tjrszy/image/upload/f_auto,q_auto,w_800/v1771960129/commercial-sign-cleaning_jzafjr.jpg"
                                    alt="Commercial window and facade cleaning at Rockingham Toyota dealership"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md text-action-gold text-xs font-bold px-3 py-1 rounded-full border border-action-gold/30">
                                    <CheckCircle2 className="w-3 h-3 text-action-gold" />
                                    Featured Project
                                </span>
                                <div className="absolute bottom-3 left-3 right-3 text-white">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-action-gold">Automotive Showroom &amp; Facade</p>
                                    <p className="text-sm sm:text-base font-bold truncate">Rockingham Toyota Dealership</p>
                                </div>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3">
                                Proven Execution on High-Stakes Commercial Sites
                            </h3>

                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                                When head contractors and corporate facility managers need meticulous window and facade care, they trust Aspect. We deployed certified EWP cherry pickers and pure-water carbon poles to restore high-reach showroom glass, architectural parapets, and corporate signage with zero disruption to active customer trade.
                            </p>

                            <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-200">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-action-gold shrink-0" />
                                    <span>High-level architectural showroom fascia &amp; glass restoration</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-action-gold shrink-0" />
                                    <span>Certified Elevated Work Platform (EWP) operation up to 4 storeys</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-action-gold shrink-0" />
                                    <span>Pedestrian exclusion zones &amp; strict WorkSafe WA compliance</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-xs text-slate-400">Read the complete project case study</span>
                            <Link 
                                href="/case-studies/rockingham-toyota-dealership-high-reach-commercial-clean"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-action-gold hover:text-yellow-300 transition-colors"
                            >
                                View Case Study <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: METHODS & ACCESS CAPABILITIES (7 Cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-4 sm:gap-6">
                        <div className="space-y-4">
                            {methods.map((method, idx) => {
                                const Icon = method.icon;
                                return (
                                    <div 
                                        key={idx}
                                        className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-action-gold/50 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[#000080]/10 flex items-center justify-center shrink-0 border border-[#000080]/15">
                                            <Icon className="w-6 h-6 text-[#000080]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                                                <h4 className="font-heading font-bold text-base sm:text-lg text-brand-navy">
                                                    {method.title}
                                                </h4>
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-action-gold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                                                    {method.badge}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                {method.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* B2B COMPLIANCE & SAFETY STRIP */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#000080] mb-3 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-action-gold" />
                                Commercial Safety &amp; Governance Credentials
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                {complianceSignals.map((sig, i) => (
                                    <div key={i} className="border-l-2 border-action-gold pl-3">
                                        <p className="text-xs sm:text-sm font-bold text-brand-navy leading-tight">{sig.label}</p>
                                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{sig.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* BOTTOM ACTION BAR */}
                <div className="bg-brand-navy rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
                    <div className="text-center md:text-left">
                        <h4 className="text-xl sm:text-2xl font-bold mb-1">
                            Need a Commercial Window Cleaning Proposal for Your Property?
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                            Fast site visits, SWMS documentation, and transparent itemised pricing for strata managers, corporate offices &amp; retail centres.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                        <Link
                            href="/services/commercial-window-cleaning"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-action-gold text-brand-navy font-bold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-yellow-400 transition-all shadow-md min-h-[48px]"
                        >
                            Explore Commercial Window Cleaning Perth
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        
                        <a
                            href="tel:0426996192"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all min-h-[48px]"
                        >
                            <Phone className="w-4 h-4 text-action-gold" />
                            0426 996 192
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
