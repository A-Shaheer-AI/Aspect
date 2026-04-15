"use client";

import { BUSINESS } from "@/lib/config";
import { ArrowRight, Building2, CheckCircle, Clock, Home, Phone, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import QuoteModal from "./QuoteModal";

type ScrollItem = {
  src: string;
  className: string;
};

export default function HeroWithScroll() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items: ScrollItem[] = [
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sign-cleaning-2_ozlp2x.jpg",
      className: "col-span-1 row-span-1 h-[180px] "
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960130/house-windows-cleaning_byke0n.jpg",
      className: "col-span-1 row-span-2 h-[280px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1774450638/pressure-cleaning-giff_ulc4tk.gif",
      className: "col-span-1 row-span-2 h-[260px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1775990687/gutter-cleaning_nd8wyn.jpg",
      className: "col-span-1 row-span-1 h-[250px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.09_PM_1_hnnwtr.jpg",
      className: "col-span-1 row-span-1 h-[200px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960142/WhatsApp_Image_2026-02-22_at_8.48.02_PM_hzrubr.jpg",
      className: "col-span-1 row-span-1 h-[200px]"
    }
  ];

  const mobileItems: ScrollItem[] = [
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sign-cleaning-2_ozlp2x.jpg",
      className: "h-[140px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960130/house-windows-cleaning_byke0n.jpg",
      className: "h-[180px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1774450638/pressure-cleaning-giff_ulc4tk.gif",
      className: "h-[160px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960138/sollar-plats-cleaning_gyngjf.jpg",
      className: "h-[140px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1775990687/gutter-cleaning_nd8wyn.jpg",
      className: "h-[150px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.09_PM_1_hnnwtr.jpg",
      className: "h-[170px]"
    },
    {
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960142/WhatsApp_Image_2026-02-22_at_8.48.02_PM_hzrubr.jpg",
      className: "h-[140px]"
    }
  ];

  return (
    <>
      <section className="bg-[#000080] min-h-[95vh] h-full text-white flex pt-30 md:py-0 overflow-hidden">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-5">

          {/* LEFT CONTENT */}
          <div>
            <p className="text-action-gold text-center md:text-left font-semibold mb-4">
              Same week booking available
            </p>

            <h1 className="text-2xl md:text-6xl text-center md:text-left font-bold leading-tight mb-6">
              Your Local Window <br />
              <span className="text-action-gold">Cleaning Service in Perth</span>
            </h1>

            {/* Animation On Mobile */}
            <div className="md:hidden relative h-[300px] overflow-hidden group">

              {/* GRADIENT FADE */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-16 group-hover:h-8 bg-gradient-to-b from-black to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 group-hover:h-8 bg-gradient-to-t from-black to-transparent z-10" />

              {/* TWO COLUMN GRID - MOBILE */}
              <div className="scroll-track grid grid-cols-2 gap-3">

                {/* Column 1 */}
                <div className="flex flex-col gap-3">
                  {[...mobileItems, ...mobileItems].filter((_, i) => i % 2 === 0).map((item, i) => (
                    <div
                      key={`mobile-col1-${i}`}
                      className={`rounded-xl overflow-hidden shadow-lg shadow-[#FFE75B]/10 ${item.className}`}
                    >
                      <Image
                        src={item.src}
                        alt="Service image"
                        width={200}
                        height={150}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>

                {/* Column 2 - offset */}
                <div className="flex flex-col gap-3 pt-6">
                  {[...mobileItems, ...mobileItems].filter((_, i) => i % 2 === 1).map((item, i) => (
                    <div
                      key={`mobile-col2-${i}`}
                      className={`rounded-xl overflow-hidden shadow-lg shadow-[#FFE75B]/10 ${item.className}`}
                    >
                      <Image
                        src={item.src}
                        alt="Service image"
                        width={200}
                        height={150}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <p className="text-gray-300 text-center md:text-left text-lg mb-6 mt-8 md:mt-0">
              Streak-free results for homes and businesses. <br />
              100% satisfaction guaranteed.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <Link href={"https://www.google.com/maps/place/Aspect+Window+Cleaning/@-31.9806823,115.7929967,17z/data=!3m1!4b1!4m6!3m5!1s0xafbbd7c3dd591183:0xe683c8a7e7212664!8m2!3d-31.9806823!4d115.7929967!16s%2Fg%2F11x1zxrlv3?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"} className="bg-white/10 px-4 py-2 rounded-full text-sm">
                ⭐ 5.0 Google Reviews
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-start gap-4 mb-8 w-full">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-center gap-3 bg-action-gold text-brand-navy font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-action-gold/90 transition-all focus:outline-none focus:ring-4 focus:ring-action-gold/50 cursor-pointer w-full md:w-auto"
                aria-label="Get a residential quote"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                Residential Quote
              </button>

              <Link
                href="/commercial"
                className="group flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30 w-full md:w-auto"
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
            <div className="hidden md:flex flex-wrap items-center gap-4 sm:gap-8 pt-5 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                <span>$20M Insured</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                <span>Trained and Professional</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-action-gold" aria-hidden="true" />
                <span>Police Cleared</span>
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
                {[...items, ...items].filter((_, i) => i % 2 === 0).map((item, i) => (
                  <div
                    key={`col1-${i}`}
                    className={`rounded-2xl overflow-hidden border-4 border-[#FFE75B] shadow-lg ${item.className}`}
                  >
                    <Image
                      src={item.src}
                      alt="Service image"
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 - offset/staggered */}
              <div className="flex flex-col gap-4 pt-12">
                {[...items, ...items].filter((_, i) => i % 2 === 1).map((item, i) => (
                  <div
                    key={`col2-${i}`}
                    className={`rounded-2xl overflow-hidden border-4 border-[#FFE75B] shadow-lg ${item.className}`}
                  >
                    <Image
                      src={item.src}
                      alt="Service image"
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
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
