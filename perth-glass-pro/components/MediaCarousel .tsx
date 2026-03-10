"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Slide = {
  type: "image" | "video";
  src: string;
};

export default function MediaCarousel() {
  const slides: Slide[] = [
    {
      type: "image",
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.22_PM_t0qwqg.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.03_PM_vtb2tn.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960144/WhatsApp_Image_2026-02-22_at_8.48.09_PM_1_hnnwtr.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960147/WhatsApp_Image_2026-02-22_at_8.48.22_PM_t0qwqg.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960145/WhatsApp_Image_2026-02-22_at_8.48.10_PM_kyugva.jpg",
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1771960136/outside-windows-cleaning_lzp8fq.jpg",
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // navigation
          // pagination={{ clickable: true }}
          loop
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {slide.type === "image" ? (
                <img
                  src={slide.src}
                  alt="slide"
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              ) : (
                <video
                  src={slide.src}
                  controls
                  muted
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Button */}
       <div className="mt-12 text-center"> <Link href="/portfolio" className="inline-flex items-center gap-2 bg-brand-navy text-white font-bold px-8 py-3 rounded-full hover:bg-brand-navy/90 transition-colors" > View Gallery <ArrowUpRight className="w-5 h-5" /> </Link> </div>

      </div>
    </section>
  );
}