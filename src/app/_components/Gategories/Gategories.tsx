
"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import type { Category } from "@/interface/singleProduct.t";

import "swiper/css";

type Props = {
  categories: Category[];
};

const Gategories = ({ categories }: Props) => {
  const [swiperReady, setSwiperReady] = useState(false);

  if (!categories?.length) return null;

  return (
    <div
      className={`w-full min-w-0 overflow-hidden ${
        swiperReady ? "opacity-100" : "invisible"
      }`}
    >
      <Swiper
        modules={[FreeMode, Autoplay]}
        onSwiper={() => setSwiperReady(true)}
        onInit={() => setSwiperReady(true)}
        freeMode
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        loop={categories.length >= 8}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          480: { slidesPerView: 3, spaceBetween: 16 },
          640: { slidesPerView: 4, spaceBetween: 16 },
          768: { slidesPerView: 5, spaceBetween: 20 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
          1280: { slidesPerView: 8, spaceBetween: 24 },
        }}
        className="!py-4"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id} className="h-auto cursor-pointer">
            <div className="group flex h-full min-w-0 flex-col items-center gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-green-50 dark:bg-gray-800">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 479px) 45vw, (max-width: 639px) 30vw, (max-width: 767px) 23vw, (max-width: 1023px) 18vw, 12vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="line-clamp-2 min-h-10 w-full text-center text-sm font-bold text-gray-800 dark:text-gray-100">
                {category.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gategories;
