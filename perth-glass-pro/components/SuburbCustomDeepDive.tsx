import Link from "next/link";
import { Droplets, Wind, Building2, Trees, CheckCircle2 } from "lucide-react";

interface SuburbCustomDeepDiveProps {
    suburbSlug: string;
    suburbName: string;
}

export default function SuburbCustomDeepDive({ suburbSlug, suburbName }: SuburbCustomDeepDiveProps) {
    if (suburbSlug === "fremantle") {
        return (
            <div className="mt-8 bg-gradient-to-br from-amber-50/60 to-slate-50 border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full w-fit mb-3">
                    <Building2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Heritage Architecture &amp; Coastal Port Focus</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mb-3">
                    Specialist Heritage Glazing &amp; Coastal Window Cleaning in Fremantle
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-brand-slate leading-relaxed">
                    <p>
                        Fremantle possesses one of Western Australia’s most celebrated architectural streetscapes—from 19th-century limestone merchant buildings and Victorian cottages to character Federation homes across South Fremantle and East Fremantle. However, maintaining historic glass in a bustling coastal port requires specialized trade experience. Antique double-hung timber sash windows, fragile leadlight cames, and aged linseed oil putty cannot withstand aggressive high-pressure washing, which easily forces moisture past delicate seals, damages lime-based mortar, or fractures irreplaceable vintage float glass.
                    </p>
                    <p>
                        Simultaneously, Fremantle’s maritime geography exposes exterior glass to relentless airborne sea salt. Carried onshore by the afternoon &ldquo;Fremantle Doctor&rdquo; breeze from Victoria Quay and Fishing Boat Harbour, corrosive sodium chloride aerosol bonds tenaciously to glass surfaces. When left uncleaned, marine salt reacts with Perth’s intense UV radiation to trigger permanent silicate calcification and glass etching. Furthermore, street-facing commercial shopfronts along High Street, Market Street, and South Terrace’s Cappuccino Strip suffer from heavy diesel exhaust soot and pedestrian smudges that diminish business curb appeal.
                    </p>
                    <p>
                        At Aspect Window Cleaning, our technicians deploy conservation-grade cleaning techniques designed specifically for character properties. We combine gentle lamb&rsquo;s wool hand applicators, pH-neutral biodegradable solutions, and surgical-grade brass squeegees for delicate heritage sashes, ensuring zero damage to vintage joinery. For contemporary rear additions, modern beachfront residences, and multi-storey port apartment complexes, we utilize 0 PPM deionised pure water reach poles up to 4 storeys. Whether you manage a heritage retail boutique requiring reliable <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-semibold">commercial window cleaning in Perth</Link> or own a historic cottage needing expert <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline font-semibold">residential window cleaning in Fremantle</Link>, Aspect delivers crystal clarity with complete architectural preservation.
                    </p>
                </div>
                <div className="mt-5 pt-4 border-t border-amber-200/60 grid sm:grid-cols-3 gap-3 text-xs text-brand-navy font-semibold">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Preservation-Safe for Vintage Sashes &amp; Leadlights</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Marine Salt Dissolving Without Glass Scratches</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>High-Reach Pure Water up to 4 Storeys</span>
                    </div>
                </div>
            </div>
        );
    }

    if (suburbSlug === "joondalup") {
        return (
            <div className="mt-8 bg-gradient-to-br from-emerald-50/60 to-slate-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full w-fit mb-3">
                    <Trees className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Canopy Debris &amp; Gutter Drainage Protection</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mb-3">
                    Downpipe Flushing &amp; Gutter Cleaning in Joondalup: Beating Eucalyptus Blockages
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-brand-slate leading-relaxed">
                    <p>
                        As the commercial and residential capital of Perth&rsquo;s northern corridor, Joondalup enjoys a lush natural setting bordering Lake Joondalup Nature Reserve and Yellagonga Regional Park. While this proximity creates spectacular parkland surroundings, the dense canopy of native eucalyptus—predominantly tuart, jarrah, and marri trees—presents an ongoing hazard for residential and commercial roof drainage systems. Over the hot, windy summer months, heavy gum leaves, bark strips, and woody gumnuts accumulate inside roof valleys and gutters.
                    </p>
                    <p>
                        Without regular maintenance, this organic debris bakes into dense, compacted dams. When sudden Perth winter storms strike, trapped rainwater cannot reach downpipes, forcing hundreds of litres of runoff under roof tiles or Colorbond sheets into ceiling cavities, rotting timber fascia boards, and causing foundation subsidence. In summer, dry leaf buildup presents a serious fire hazard from drifting bushfire embers. Professional <Link href="/services/gutter-cleaning" className="text-action-gold hover:underline font-semibold">gutter cleaning in Joondalup</Link> is essential preventative maintenance to safeguard your property&rsquo;s structural integrity.
                    </p>
                    <p>
                        Aspect Window Cleaning provides a complete roofline care solution across Joondalup. Our technicians physically extract all organic matter from gutters and roof valleys, bag all waste for off-site disposal, and thoroughly power-flush downpipes down to ground soakwells to confirm unobstructed drainage flow. In addition, for multi-storey offices, medical clinics around Joondalup Health Campus, and retail precincts near Lakeside Joondalup, we deliver certified <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-semibold">commercial window cleaning in Joondalup</Link> using 4-storey reach poles and scissor lift equipment, backed by full SWMS safety compliance.
                    </p>
                </div>
                <div className="mt-5 pt-4 border-t border-emerald-200/60 grid sm:grid-cols-3 gap-3 text-xs text-brand-navy font-semibold">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Downpipes Flushed to Ground Soakwells</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Roof Valleys &amp; Gutters 100% Cleared</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>CBD Office Facades Serviced up to 4 Storeys</span>
                    </div>
                </div>
            </div>
        );
    }

    if (suburbSlug === "cottesloe" || suburbSlug === "city-beach") {
        return (
            <div className="mt-8 bg-gradient-to-br from-cyan-50/60 to-slate-50 border border-cyan-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100 px-3 py-1 rounded-full w-fit mb-3">
                    <Droplets className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Coastal Saline Defense &amp; Mineral Calcification Restoration</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mb-3">
                    Oceanfront Window Restoration: Battling Sea Salt Etching &amp; Bore Water Scaling
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-brand-slate leading-relaxed">
                    <p>
                        Properties along the premium coastal amphitheatre of {suburbName} represent some of Perth&rsquo;s finest architectural real estate, featuring expansive floor-to-ceiling glass, double-height stairwell voids, and frameless ocean-facing balustrades. However, living within direct sight of the Indian Ocean comes with severe environmental challenges. Daily onshore winds carry dense maritime salt mist inland. When evening dew dissolves these airborne particles and the fierce morning sun bakes them dry, sodium chloride and mineral crystals bond directly into the microscopic pores of the glass.
                    </p>
                    <p>
                        If left unaddressed for more than 8 to 12 weeks, this cycle creates permanent silicate calcification—commonly known as &ldquo;glass cancer&rdquo; or stage-two etching. At this stage, standard household detergents and squeegees cannot remove the hazy white film. Additionally, many coastal estates utilize groundwater bore systems for landscaping; sprinkler overspray containing dissolved calcium and iron leaves stubborn orange and milky rings that chemically fuse to exterior panes.
                    </p>
                    <p>
                        Aspect Window Cleaning specializes in elite coastal restoration for luxury homes across {suburbName}. We apply proprietary calcium-dissolving mineral solutions and ungraduated surgical razor detailing to eliminate stubborn calcification without scratching float glass. Our 0 PPM deionised reverse-osmosis pure water system washes away residual sea salt from delicate Low-E coatings, powder-coated aluminium frames, and sliding door tracks. Learn more about protecting your glass in our guide to <Link href="/blog/perth-coastal-window-cleaning-salt-hard-water-etching" className="text-action-gold hover:underline font-semibold">Perth coastal window cleaning and salt etching</Link>, or contact Aspect for white-glove <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline font-semibold">residential window cleaning in {suburbName}</Link>.
                    </p>
                </div>
                <div className="mt-5 pt-4 border-t border-cyan-200/60 grid sm:grid-cols-3 gap-3 text-xs text-brand-navy font-semibold">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Stage-One Salt Calcification Eradication</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Bore Water Mineral Descaling Solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>100% Certified Safe for Low-E &amp; Tinted Glass</span>
                    </div>
                </div>
            </div>
        );
    }

    if (suburbSlug === "armadale") {
        return (
            <div className="mt-8 bg-gradient-to-br from-orange-50/60 to-slate-50 border border-orange-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-800 bg-orange-100 px-3 py-1 rounded-full w-fit mb-3">
                    <Wind className="w-3.5 h-3.5 text-orange-700" />
                    <span>Darling Scarp Microclimate &amp; Red Dust Defense</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mb-3">
                    Scarp Dust Defense: Window &amp; Exterior Cleaning in Armadale
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-brand-slate leading-relaxed">
                    <p>
                        Nestled directly at the base of the Darling Scarp, Armadale experiences a distinct foothills microclimate. During Perth’s hot summer months, strong easterly winds sweep down the escarpment, carrying fine red laterite clay dust, agricultural particulates, and native bushland pollen straight onto suburban homes across Armadale, Mount Richon, and Seville Grove. When this abrasive dust settles on exterior glass, morning humidity converts it into a stubborn, muddy film.
                    </p>
                    <p>
                        Attempting to wipe dry scarp dust with standard cloths acts like fine-grit sandpaper, inflicting microscopic swirl scratches across glass panes. Furthermore, heavy red dirt compacts tightly into sliding window tracks and security door rollers, causing mechanisms to jam and fail. Seasonal eucalyptus pollen also coats flyscreens and solar arrays, dramatically reducing natural light entry and dragging down rooftop renewable energy yields.
                    </p>
                    <p>
                        Aspect Window Cleaning utilizes laboratory-grade pure water technology to neutralize the Armadale dust factor. Our soft-bristled, carbon-fibre water-fed poles scrub glass, frames, and sills simultaneously, flushing away baked-on clay particles with zero scratching and no soapy chemical residue. We thoroughly vacuum and detail sliding tracks, wash security screens, and clear roof drainage channels through our complete <Link href="/services/gutter-cleaning" className="text-action-gold hover:underline font-semibold">gutter cleaning services</Link>. For trusted, streak-free <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline font-semibold">window cleaning in Armadale</Link>, Aspect provides dependable same-week service with zero travel fees.
                    </p>
                </div>
                <div className="mt-5 pt-4 border-t border-orange-200/60 grid sm:grid-cols-3 gap-3 text-xs text-brand-navy font-semibold">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Non-Abrasive Scarp Dust Removal</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Sliding Window &amp; Door Track Deep Cleaning</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Flyscreens &amp; Security Mesh Washed Spotless</span>
                    </div>
                </div>
            </div>
        );
    }

    if (suburbSlug === "morley") {
        return (
            <div className="mt-8 bg-gradient-to-br from-indigo-50/60 to-slate-50 border border-indigo-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-3 py-1 rounded-full w-fit mb-3">
                    <Building2 className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Commercial Hub &amp; Established Residential Care</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mb-3">
                    Residential &amp; Commercial Window Cleaning in Morley
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-brand-slate leading-relaxed">
                    <p>
                        Morley is one of Perth&rsquo;s most vibrant north-eastern hubs, anchored by the massive Galleria Shopping Centre precinct, bustling automotive and trade showrooms along Walter Road, and expansive residential avenues of classic brick-and-tile family homes. In this high-density environment, exterior glazing is exposed to heavy commercial traffic exhaust, road soot, and airborne suburban dust.
                    </p>
                    <p>
                        For retail showrooms, medical suites, and professional offices across Morley, pristine display glass is essential for attracting shoppers and establishing immediate client trust. Handprints, adhesive promo stickers, and greasy road grime rapidly degrade storefront presentation. Meanwhile, residential homeowners face weathered flyscreens, dusty security doors, and hard-to-reach highlight windows that block Perth&rsquo;s natural daylight.
                    </p>
                    <p>
                        Aspect Window Cleaning delivers tailored solutions for both residential and commercial clients across Morley. For business premises, our recurring <Link href="/services/commercial-window-cleaning" className="text-action-gold hover:underline font-semibold">commercial window cleaning in Morley</Link> provides flexible early-morning scheduling, detailed entrance glass maintenance, and frame washing with zero disruption to trading hours. For homes, our full-service <Link href="/services/residential-window-cleaning" className="text-action-gold hover:underline font-semibold">residential window cleaning in Morley</Link> includes glass, screens, sills, and tracks, restoring flawless streak-free clarity inside and out.
                    </p>
                </div>
                <div className="mt-5 pt-4 border-t border-indigo-200/60 grid sm:grid-cols-3 gap-3 text-xs text-brand-navy font-semibold">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Retail &amp; Office Shopfront Detailing</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Inside &amp; Outside Residential Glass Packages</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>Frames, Screens &amp; Tracks Fully Serviced</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
