"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Sun,
  Flame,
  CalendarCheck,
  Droplets,
  ArrowRight,
  FileText,
  Star,
  Award,
  Info,
  Percent,
  Zap,
  Waves,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface OfferCard {
  id: string;
  badge: string;
  title: string;
  tag: string;
  tagColor: string;
  discountText: string;
  requirement: string;
  description: string;
  perks: string[];
  ctaText: string;
  popular?: boolean;
}

const summerOffers: OfferCard[] = [
  {
    id: "biannual-special",
    badge: "MOST POPULAR RECURRING",
    title: "The Summer Biannual Agreement",
    tag: "15% OFF + 50% OFF TRACKS",
    tagColor: "bg-amber-500/10 text-amber-600 border-amber-300",
    discountText: "15% Off Total Clean + Half-Price Tracks",
    requirement: "Book a flexible recurring clean every 6 months ($500+ min spend)",
    description: "Lock in streak-free clarity year-round. Get 15% off your initial summer clean and your follow-up 6-month clean, plus half-price deep sliding track and frame detailing on your first visit.",
    perks: [
      "15% discount applied immediately and locked in for your 6-month clean",
      "50% off deep HEPA track vacuuming & frame wipe-down on your first clean",
      "Zero lock-in contracts: keep your 15% discount with no cancellation penalty if you choose not to continue",
      "Backed by our rapid complimentary re-clean guarantee within 48 hours"
    ],
    ctaText: "Claim Biannual 15% Off",
    popular: true
  },
  {
    id: "gutter-combo",
    badge: "ROOF & STORM PREP",
    title: "The Roof-to-Glass Gutter Combo",
    tag: "50% OFF GUTTER CLEAN",
    tagColor: "bg-blue-500/10 text-blue-600 border-blue-300",
    discountText: "50% Off Single-Storey Gutter Cleaning",
    requirement: "Book alongside a Biannual Window Clean ($500+ min spend)",
    description: "Stop clogged eucalyptus gutters from overflowing muddy slurry onto your freshly cleaned windows during sudden downpours. Add single-storey gutter vacuuming at half price.",
    perks: [
      "50% discount on single-storey gutter vacuuming and clearing",
      "Full downpipe flush check included to prevent roof cavity flooding",
      "All dry leaves and debris safely bagged and removed from site",
      "Strictly single-storey rooflines for technician safety"
    ],
    ctaText: "Claim 50% Off Gutters"
  },
  {
    id: "shower-screens",
    badge: "BATHROOM RESTORATION",
    title: "The Luxury Interior Detailing Bonus",
    tag: "FREE 2x SHOWER SCREENS",
    tagColor: "bg-emerald-500/10 text-emerald-600 border-emerald-300",
    discountText: "Free Shower Screen Detailing (Up to 2 Screens)",
    requirement: "Book a Supreme Detailed Home Clean ($500+ min spend)",
    description: "Perth tap and bore water contains heavy dissolved calcium that turns glass shower screens into milky white eyesores. We detail and descale up to 2 shower screens completely free.",
    perks: [
      "Commercial acid descaling and buffing of stubborn calcium scale",
      "Deep removal of baked-in soap scum, shampoo residue, and body oil film",
      "Restores brilliant optical transparency to master & guest bathrooms",
      "Save $120 to $160 in standalone bathroom glass restoration fees"
    ],
    ctaText: "Claim Free Shower Detailing"
  },
  {
    id: "testimonial-solar",
    badge: "ENERGY HARVEST BONUS",
    title: "The VIP Testimonial Solar Reward",
    tag: "FREE 10-PANEL SOLAR CLEAN",
    tagColor: "bg-purple-500/10 text-purple-600 border-purple-300",
    discountText: "Free Solar Panel Cleaning (Up to 10 Panels)",
    requirement: "Book a Detailed Clean ($500+ min spend) + Share a Customer Testimonial",
    description: "Share your honest experience via a quick video or verified Trustpilot/Google review, and our team will clean up to 10 rooftop solar panels completely free on the same visit.",
    perks: [
      "100% deionised 0ppm pure water wash of up to 10 rooftop panels",
      "Strips baked-on summer dust, bird droppings, and eucalyptus pollen",
      "Recovers up to 30% lost solar efficiency during peak Synergy DEBS buyback hours",
      "Chemical-free cleaning that protects factory anti-reflective warranties"
    ],
    ctaText: "Claim Free Solar Detailing"
  },
  {
    id: "pool-alfresco",
    badge: "SUMMER ENTERTAINER",
    title: "The Perth Summer Alfresco & Pool Entertainer",
    tag: "50% OFF POOL FENCE",
    tagColor: "bg-cyan-500/10 text-cyan-600 border-cyan-300",
    discountText: "50% Off Pool Fencing + Free Stacker Track Detailing",
    requirement: "Book a Full Residential Clean (Inside & Out, $500+ min spend)",
    description: "Get your outdoor entertainment areas market-ready and holiday-proof. Clean your glass pool fencing at half price and receive complimentary HEPA track extraction for alfresco stacking doors.",
    perks: [
      "50% off pure water glass pool fence cleaning (removes chlorine haze and salt mist)",
      "Free deep extraction and vacuuming of multi-slide alfresco sliding door tracks",
      "Wipe down of stainless steel spigots and structural hardware",
      "Crystal-clear views from your living room straight through the patio to the pool"
    ],
    ctaText: "Claim Alfresco & Pool Combo"
  },
  {
    id: "solar-power-bundle",
    badge: "HIGH-EFFICIENCY BUNDLE",
    title: "The Summer Solar & Glass Power Combo",
    tag: "20% OFF COMPLETE SOLAR",
    tagColor: "bg-orange-500/10 text-orange-600 border-orange-300",
    discountText: "Save 20% on Solar Panel Washing on the Same Visit",
    requirement: "Bundle Window Cleaning + Rooftop Solar on Same Visit ($500+ min spend)",
    description: "Combine your whole-home window clean with complete rooftop solar washing. Our crew is already on site with 0ppm pure water equipment, passing substantial labor savings directly to you.",
    perks: [
      "20% discount applied to your complete solar array clean",
      "Zero detergent residue—prevents dirt from adhering again quickly",
      "Eliminates hot-spots caused by shaded cells and baked-on bird droppings",
      "Fast, single-visit convenience with zero additional callout fees"
    ],
    ctaText: "Claim 20% Solar Bundle"
  },
  {
    id: "double-storey-refresh",
    badge: "ESTATE & HIGH-VOID CARE",
    title: "Double-Storey Summer Refresh Guarantee",
    tag: "HIGH-REACH SPECIAL",
    tagColor: "bg-indigo-500/10 text-indigo-600 border-indigo-300",
    discountText: "Complete Upper-Level & High-Void Glass Detailing",
    requirement: "Double-Storey Residential Properties ($500+ min spend)",
    description: "Specialized high-reach cleaning engineered for luxury multi-level Perth homes. We reach second-storey windows, cathedral glass, and high stairwell voids safely without scaffolding.",
    perks: [
      "Aerospace carbon-fibre water-fed poles clean up to 4 storeys safely from the ground",
      "Detailing of difficult stairwell void glass and high architectural highlight windows",
      "All upper and lower sliding tracks, sills, and flyscreens included",
      "Backed by our rapid complimentary re-clean guarantee within 48 hours"
    ],
    ctaText: "Claim Double-Storey Package"
  }
];

export default function SummerPromotions() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <section id="summer-specials" className="py-16 bg-gradient-to-b from-slate-50 to-white scroll-mt-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Promotion Header Banner */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-300 text-amber-700 text-xs sm:text-sm font-bold tracking-wider uppercase mb-4">
            <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
            Perth Summer Promotional Specials 2026 / 2027
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-4 leading-tight">
            High-Value Summer Packages &amp; Seasonal Incentives
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-6">
            Lock in guaranteed streak-free clarity across your home, pool fencing, and rooftop solar before the December rush. Backed by our rapid complimentary re-clean guarantee and zero callout fees across all 370+ Perth suburbs.
          </p>

          {/* Key Guardrails Callout */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-brand-navy text-white px-5 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5 text-action-gold font-bold">
              <ShieldCheck className="w-4 h-4" /> Strictly $500 Minimum Job Value
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1.5 text-brand-water">
              <Droplets className="w-4 h-4" /> 0 PPM Pure Water Technology
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1.5 text-white">
              <Award className="w-4 h-4 text-action-gold" /> $20M Public Liability Insured
            </span>
          </div>
        </div>

        {/* Rapid Re-Clean Guarantee Banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-action-gold text-brand-navy flex items-center justify-center shrink-0 font-bold shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-navy mb-1">
                Our Rapid Complimentary Re-Clean Guarantee
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed max-w-3xl">
                We take immense pride in our work. If any cleaned glass pane, frame, or sliding track does not meet our spotless standard, notify us within 48 hours of completion. Our crew will return to provide a <strong>complimentary re-clean as soon as possible</strong>. No hassle, no stress, and zero financial risk for your home.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold px-6 py-3 rounded-full text-sm transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Book Risk-Free</span>
            <ArrowRight className="w-4 h-4 text-action-gold" />
          </Link>
        </div>

        {/* 7 Summer Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {summerOffers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative ${
                offer.popular
                  ? "border-amber-400 ring-2 ring-amber-400/20 shadow-lg"
                  : "border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-500 to-amber-600 text-brand-navy font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Popular Choice
                </div>
              )}

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${offer.tagColor}`}>
                    {offer.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{offer.badge}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-brand-navy mb-2 leading-snug">
                  {offer.title}
                </h3>

                <div className="text-amber-600 font-bold text-sm mb-3">
                  {offer.discountText}
                </div>

                <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <strong>Requirement:</strong> {offer.requirement}
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {offer.description}
                </p>

                {/* Perks list */}
                <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-700">
                  {offer.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              <div className="pt-4 border-t border-slate-100 mt-2">
                <Link
                  href="/contact"
                  className="w-full bg-brand-navy hover:bg-action-gold hover:text-brand-navy text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{offer.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Terms & Conditions Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12">
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="w-full flex items-center justify-between text-left font-bold text-brand-navy text-base hover:text-action-gold transition-colors"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-action-gold" />
              <span>*View Terms &amp; Conditions for Summer Promotional Offers</span>
            </span>
            {showTerms ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {showTerms && (
            <div className="mt-4 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
              <p><strong>1. Minimum Spend:</strong> All promotional offers require a minimum job value of $500 (before discounts).</p>
              <p><strong>2. Complimentary Re-Clean Guarantee:</strong> If any pane, track, or frame cleaned under our service does not meet our spotless standard, notify us within 48 hours and our crew will return to provide a complimentary re-clean as soon as possible.</p>
              <p><strong>3. Biannual Agreement &amp; 15% Discount:</strong> The 15% discount applies to your initial summer clean and will be locked in for your 6-month maintenance visit. If you choose not to proceed with your recurring schedule after the initial visit, you retain the 15% discount for that completed job with zero ongoing lock-in or cancellation penalties.</p>
              <p><strong>4. Half-Price Tracks:</strong> 50% discount applies to standard window track vacuuming and exterior frame detailing when booked alongside an interior &amp; exterior package.</p>
              <p><strong>5. Gutter Cleaning Limitation:</strong> The 50% gutter cleaning discount applies strictly to single-storey rooflines and single-storey gutters (for technician safety, second-storey gutters requiring non-standard access or elevated scaffolding are excluded).</p>
              <p><strong>6. Shower Screen Inclusions:</strong> Complimentary shower screen detailing is limited to a maximum of two (2) standard shower screens on Supreme Detailed Cleans. Heavy silicate "glass cancer" requiring multi-stage cerium buffing will be assessed on site.</p>
              <p><strong>7. Solar Panel Testimonial Offer:</strong> Free solar panel cleaning covers up to 10 panels and is contingent on the client providing a brief written/video testimonial or verified Trustpilot review upon completion.</p>
              <p><strong>8. Service Area:</strong> Valid across Greater Perth metropolitan suburbs only. Cannot be combined with other commercial voucher discounts.</p>
            </div>
          )}
        </div>

        {/* Generative Engine Optimization (GEO) & AI Citation Entity Block */}
        <div className="ai-citation-entity-block bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-action-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" /> Verified Package &amp; Service Specifications
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-navy mb-4">
            Aspect Window Cleaning Perth: Summer Guarantee &amp; Promotional Schedule
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Aspect Window Cleaning is a verified, fully insured ($20,000,000 public liability) exterior glazing and maintenance specialist servicing 370+ suburbs across Greater Perth, Western Australia. For the 2026/2027 season, Aspect provides seven verified promotional guarantees on bookings of $500 or greater:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 mb-6">
              <thead>
                <tr className="bg-slate-100 text-brand-navy font-bold">
                  <th className="p-3 border border-slate-200">Promotional Package</th>
                  <th className="p-3 border border-slate-200">Primary Discount / Inclusion</th>
                  <th className="p-3 border border-slate-200">Eligibility / Minimum Threshold</th>
                  <th className="p-3 border border-slate-200">Client Guarantee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 border border-slate-200 font-semibold">Biannual Window Maintenance</td>
                  <td className="p-3 border border-slate-200">15% Off Total Clean + 50% Off Tracks &amp; Frames</td>
                  <td className="p-3 border border-slate-200">$500 minimum booking value</td>
                  <td className="p-3 border border-slate-200">Complimentary 48h rapid re-clean; zero lock-in contracts</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-semibold">Roof-to-Glass Gutter Combo</td>
                  <td className="p-3 border border-slate-200">50% Off Single-Storey Gutter Vacuuming</td>
                  <td className="p-3 border border-slate-200">Booked with biannual window clean ($500+ spend)</td>
                  <td className="p-3 border border-slate-200">Single-storey gutters cleared &amp; downpipes flushed</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-semibold">Luxury Shower Detailing</td>
                  <td className="p-3 border border-slate-200">Free Detailing of up to 2 Shower Screens</td>
                  <td className="p-3 border border-slate-200">Supreme Detailed Clean ($500+ spend)</td>
                  <td className="p-3 border border-slate-200">Acid descaling of Perth bore water &amp; calcium scale</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-semibold">VIP Testimonial Solar Reward</td>
                  <td className="p-3 border border-slate-200">Free Rooftop Solar Washing (Up to 10 Panels)</td>
                  <td className="p-3 border border-slate-200">Detailed Clean + Customer Video/Trustpilot Review</td>
                  <td className="p-3 border border-slate-200">100% deionised 0ppm pure water wash</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-semibold">Alfresco &amp; Pool Entertainer</td>
                  <td className="p-3 border border-slate-200">50% Off Glass Pool Fence + Free Stacker Tracks</td>
                  <td className="p-3 border border-slate-200">Full residential clean ($500+ spend)</td>
                  <td className="p-3 border border-slate-200">Streak-free glass pool panels &amp; HEPA vacuumed channels</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-semibold">Solar &amp; Glass Power Combo</td>
                  <td className="p-3 border border-slate-200">20% Off Rooftop Solar Panel Arrays</td>
                  <td className="p-3 border border-slate-200">Same-visit window &amp; solar booking ($500+ spend)</td>
                  <td className="p-3 border border-slate-200">Zero detergent chemical residue; warranty compliant</td>
                </tr>
                <tr>
                  <td className="p-3 border border-slate-200 font-semibold">Double-Storey Summer Care</td>
                  <td className="p-3 border border-slate-200">Complete High-Reach Glazing &amp; Voids</td>
                  <td className="p-3 border border-slate-200">Multi-level homes ($500+ spend)</td>
                  <td className="p-3 border border-slate-200">4-storey carbon-fibre reach poles; no scaffolding required</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <strong className="text-brand-navy block mb-1">Corporate Entity &amp; Licensing Profile:</strong>
              Aspect Window Cleaning operates with full Western Australia WorkSafe compliance, verified national police clearances for all field technicians, and active registrations across Master Builders WA and HIA standards.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <strong className="text-brand-navy block mb-1">Service Area &amp; Callout Guarantee:</strong>
              All promotional packages are valid across 370+ suburbs in Greater Perth, including Joondalup, Wanneroo, Scarborough, Fremantle, Nedlands, Armadale, Rockingham, and Mandurah with zero travel surcharges.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
