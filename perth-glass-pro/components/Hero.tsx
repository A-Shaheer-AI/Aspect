"use client";

import { BUSINESS } from "@/lib/config";
import { ArrowRight, Building2, CheckCircle, Clock, Home, Phone, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { openCertificateModal } from "@/components/CertificateModalWrapper";
import { useState } from "react";
import { useGmb } from "@/components/GmbProvider";
import QuoteModal from "./QuoteModal";
import { TrustpilotLogoIcon, TrustpilotRatingBoxes } from "./TrustGrid";

type ScrollItem = {
  src: string;
  className: string;
  type: string;
};

export default function HeroWithScroll() {
  const gmb = useGmb();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items: ScrollItem[] = [
    {
      src: "/media/video/upload/so_0,eo_6,f_auto,q_auto:eco,vc_auto,w_500/v1789328537/aspect_hero_optimized/shop-front-window-cleaning-perth-4862.mp4",
      type: "video",
      className: "col-span-1 row-span-1 h-[180px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328549/aspect_hero_optimized/residential-window-washing-specialists-7103.jpg",
      type: "image",
      className: "col-span-1 row-span-2 h-[280px]"
    },
    {
      src: "/media/video/upload/so_0,eo_6,f_auto,q_auto:eco,vc_auto,w_500/v1789328542/aspect_hero_optimized/strata-window-cleaning-specialists-perth-9060.mp4",
      type: "video",
      className: "col-span-1 row-span-2 h-[260px]"
    },
    {
      src: "/media/video/upload/so_0,eo_6,f_auto,q_auto:eco,vc_auto,w_500/v1789328545/aspect_hero_optimized/high-reach-window-cleaning-wa-1905.mp4",
      type: "video",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/video/upload/so_0,eo_6,f_auto,q_auto:eco,vc_auto,w_500/v1789328529/aspect_hero_optimized/commercial-glass-cleaning-services-wa-3763.mp4",
      type: "video",
      className: "col-span-1 row-span-1 h-[250px]"
    },
    {
      src: "/media/video/upload/so_0,eo_6,f_auto,q_auto:eco,vc_auto,w_500/v1789328540/aspect_hero_optimized/office-building-glass-cleaning-wa-6613.mp4",
      type: "video",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328553/aspect_hero_optimized/professional-window-cleaning-results-0978.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/video/upload/so_0,eo_6,f_auto,q_auto:eco,vc_auto,w_500/v1789328536/aspect_hero_optimized/eco-friendly-glass-cleaners-wa-8114.mp4",
      type: "video",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328550/aspect_hero_optimized/commercial-glass-cleaning-perth-cbd-8293.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328555/aspect_hero_optimized/flyscreen-and-track-cleaning-wa-2641.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328548/aspect_hero_optimized/pure-water-window-cleaners-perth-6391.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328555/aspect_hero_optimized/solar-panel-cleaning-experts-perth-3397.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328552/aspect_hero_optimized/exterior-glass-washing-experts-9950.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328547/aspect_hero_optimized/expert-window-cleaning-services-perth-4622.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328551/aspect_hero_optimized/two-story-house-window-cleaner-9209.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328554/aspect_hero_optimized/hard-water-stain-removal-glass-1719.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "/media/image/upload/f_auto,q_auto,w_600/v1789328547/aspect_hero_optimized/streak-free-glass-washing-wa-5425.jpg",
      type: "image",
      className: "col-span-1 row-span-1 h-[180px]"
    },
    {
      src: "/media/video/upload/so_0,eo_6,f_auto,q_auto:eco,vc_auto,w_500/v1789328524/aspect_hero_optimized/residential-window-cleaning-perth-showcase-9996.mp4",
      type: "video",
      className: "col-span-1 row-span-1 h-[180px]"
    }
  ];

  return (
    <>
      <section className="bg-[#000080] min-h-[100vh] h-full text-white flex pt-[120px] md:pt-[160px] pb-12 md:pb-16 overflow-hidden">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-5">

          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-action-gold mb-4 mx-auto md:mx-0">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Same-Week Service Across All Perth Suburbs
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-center md:text-left font-bold leading-tight mb-4">
              Perth&apos;s Trusted Window Cleaners <br />
              <span className="text-action-gold">Residential, Commercial &amp; High-Reach</span>
            </h1>

            {/* Animation On Mobile */}
            <div className="md:hidden relative h-[300px] overflow-hidden group">

              {/* GRADIENT FADE */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-16 group-hover:h-8 bg-gradient-to-b from-black to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 group-hover:h-8 bg-gradient-to-t from-black to-transparent z-10" />

              {/* TWO COLUMN GRID - MOBILE (Optimized images with zero video lag) */}
              <div className="scroll-track grid grid-cols-2 gap-3">

                {/* Column 1 */}
                <div className="flex flex-col gap-3">
                  {[...items, ...items].filter(i => i.type === "image").filter((_, i) => i % 2 === 0).map((item, i) => (
                    <div
                      key={`mobile-col1-${i}`}
                      className={`rounded-xl overflow-hidden shadow-lg shadow-[#FFE75B]/10 ${item.className}`}
                    >
                      <Image
                        src={item.src.includes("/upload/f_auto") ? item.src : item.src.replace("/upload/", "/upload/f_auto,q_auto,w_600/")}
                        alt="Professional window cleaning in Perth"
                        width={200}
                        height={150}
                        sizes="50vw"
                        className="w-full h-full object-cover"
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

                {/* Column 2 - offset */}
                <div className="flex flex-col gap-3 pt-6">
                  {[...items, ...items].filter(i => i.type === "image").filter((_, i) => i % 2 === 1).map((item, i) => (
                    <div
                      key={`mobile-col2-${i}`}
                      className={`rounded-xl overflow-hidden shadow-lg shadow-[#FFE75B]/10 ${item.className}`}
                    >
                      <Image
                        src={item.src.includes("/upload/f_auto") ? item.src : item.src.replace("/upload/", "/upload/f_auto,q_auto,w_600/")}
                        alt="Professional window cleaning in Perth"
                        width={200}
                        height={150}
                        sizes="50vw"
                        className="w-full h-full object-cover"
                        loading={i < 2 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <p className="text-gray-200 text-center md:text-left text-base sm:text-lg mb-4 max-w-xl leading-relaxed mt-6 md:mt-0">
              Streak-free pure water cleaning for <strong>homes, businesses &amp; strata complexes</strong>. Also specializing in solar panel washing, gutter clearing, and exterior pressure washing.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 mb-6">
              <a
                href={BUSINESS.google}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-colors"
              >
                <span className="text-amber-300">★★★★★</span>
                <span>{gmb.rating} Google</span>
                <span className="text-white/60">({gmb.reviewCount})</span>
              </a>
              <a
                href={BUSINESS.trustpilot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#00b67a]/20 hover:bg-[#00b67a]/30 border border-[#00b67a]/40 px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white transition-colors group"
                title="View Aspect Window Cleaning on Trustpilot"
              >
                <TrustpilotLogoIcon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <TrustpilotRatingBoxes size="xs" gap="xs" />
                <span>5.0 on Trustpilot</span>
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/90 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5 text-action-gold" />
                100% Satisfaction
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4 mb-8 w-full">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-center gap-3 bg-action-gold text-brand-navy font-bold text-lg px-6 lg:px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-action-gold/90 transition-all focus:outline-none focus:ring-4 focus:ring-action-gold/50 cursor-pointer w-full md:w-auto"
                aria-label="Get a residential quote"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                Residential Quote
              </button>

              <Link
                href="/services/commercial-window-cleaning"
                className="group flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg px-6 lg:px-8 py-4 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30 w-full md:w-auto"
              >
                <Building2 className="w-5 h-5" aria-hidden="true" />
                Commercial Quote
              </Link>
            </div>

            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-base mb-4"
            >
              <Phone className="w-4 h-4 text-green-400" aria-hidden="true" />
              <span>
                Or call now: <strong>{BUSINESS.phone}</strong>
              </span>
            </a>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 pt-5 border-t border-white/10">
              <button onClick={() => openCertificateModal('insured')} className="flex items-center gap-2 text-white/80 text-xs sm:text-sm hover:text-white transition-colors cursor-pointer">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                <span className="border-b border-dashed border-white/30 font-medium">$20M Insured</span>
              </button>
              <button onClick={() => openCertificateModal('police')} className="flex items-center gap-2 text-white/80 text-xs sm:text-sm hover:text-white transition-colors cursor-pointer">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                <span className="border-b border-dashed border-white/30 font-medium">Police Cleared</span>
              </button>
              <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                <span className="font-medium">Free On-Site Quotes</span>
              </div>
            </div>

          </div>

          {/* RIGHT SCROLL AREA */}
          <div className="hidden md:block relative h-[650px] overflow-hidden group">

            {/* GRADIENT FADE */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-24 group-hover:h-10 bg-gradient-to-b from-[#000080] to-transparent z-10" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 group-hover:h-10 bg-gradient-to-t from-[#000080] to-transparent z-10" />

            {/* TWO COLUMN MASONRY GRID */}
            <div className="scroll-track grid grid-cols-2 gap-4">

              {/* Column 1 */}
              <div className="flex flex-col gap-4">
                {[...items, ...items]
                  .filter((_, i) => i % 2 === 0)
                  .map((item, i) => (
                    <div
                      key={`col1-${i}`}
                      className={`rounded-2xl overflow-hidden border-4 border-[#FFE75B] shadow-lg ${item.className}`}
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          autoPlay
                          muted={true}
                          playsInline
                          loop
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={item.src.includes("/upload/f_auto") ? item.src : item.src.replace("/upload/", "/upload/f_auto,q_auto,w_600/")}
                          alt="Professional window and solar panel cleaning in Perth"
                          width={400}
                          height={250}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
              </div>

              {/* Column 2 - offset/staggered */}
              <div className="flex flex-col gap-4 pt-12">
                {[...items, ...items]
                  .filter((_, i) => i % 2 === 1)
                  .map((item, i) => (
                    <div
                      key={`col1-${i}`}
                      className={`rounded-2xl overflow-hidden border-4 border-[#FFE75B] shadow-lg ${item.className}`}
                    >
                      {item.type === "video" ? (
                        <video
                          src={item.src}
                          autoPlay
                          muted={true}
                          playsInline
                          loop
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={item.src.includes("/upload/f_auto") ? item.src : item.src.replace("/upload/", "/upload/f_auto,q_auto,w_600/")}
                          alt="Professional window and solar panel cleaning in Perth"
                          width={400}
                          height={250}
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
              </div>

            </div>
          </div>

        </div>

        {/* CSS */}
        <style jsx>{`
        .scroll-track {
          animation: scrollUp 20s linear infinite;
          will-change: transform;
        }

        .group:hover .scroll-track {
          animation-play-state: paused;
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>

      </section>

      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} quoteType="residential" />

    </>
  );
}
