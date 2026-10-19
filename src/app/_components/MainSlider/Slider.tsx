"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import SlideOne from "../../../assets/slider-image-1.jpg";
import SlideTwo from "../../../assets/slider-image-2.jpg";
import SlideThree from "../../../assets/slider-image-3.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    eyebrow: "FRESH PICKS FOR YOU",
    title: "Freshness You Can Taste",
    description:
      "Discover fresh picks and everyday essentials selected for your daily needs.",
    image: SlideOne,
    accent: "Fresh groceries, better choices.",
  },
  {
    eyebrow: "EVERYDAY ESSENTIALS",
    title: "Everything You Need, In One Place",
    description:
      "Explore your favorites and make every shopping trip simple and convenient.",
    image: SlideTwo,
    accent: "Your daily shopping made easier.",
  },
  {
    eyebrow: "SMART SHOPPING STARTS HERE",
    title: "Your Favorites Are Waiting",
    description:
      "Browse our collection and discover products that fit your lifestyle.",
    image: SlideThree,
    accent: "Discover something you'll love.",
  },
];

export function Slider() {
  const plugin = React.useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: true,
    }),
  );

  return (
    <section className="mb-12">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="group relative w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative min-h-[390px] overflow-hidden rounded-3xl bg-green-950 sm:min-h-[440px] lg:min-h-[480px]">
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Green Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/85 to-green-950/10" />

                {/* Content */}
                <div className="relative z-10 flex min-h-[390px] items-center px-7 py-12 sm:min-h-[440px] sm:px-12 lg:min-h-[480px] lg:px-16">
                  <div className="max-w-xl">
                    <span className="mb-5 inline-flex rounded-full border border-green-300/30 bg-green-500/20 px-4 py-2 text-xs font-bold tracking-widest text-green-200">
                      {slide.eyebrow}
                    </span>

                    <h2 className="mb-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                      {slide.title}
                    </h2>

                    <p className="mb-4 max-w-lg text-sm leading-7 text-green-50/85 sm:text-base sm:leading-8">
                      {slide.description}
                    </p>

                    <p className="mb-8 text-sm font-semibold text-green-300">
                      {slide.accent}
                    </p>

                    {/* ------------------------------------------------------- */}
                    <a
                      href="#products"
                      className="inline-flex items-center justify-center gap-3 rounded-xl bg-green-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition hover:-translate-y-0.5 hover:bg-green-400"
                    >
                      Shop Now
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="pointer-events-none absolute -bottom-28 -right-20 size-72 rounded-full border border-white/20 sm:size-96" />
                <div className="pointer-events-none absolute -bottom-16 -right-8 size-56 rounded-full border border-white/10 sm:size-72" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 size-10 border-white/30 bg-white/90 text-green-800 shadow-lg hover:bg-white sm:left-5" />
        <CarouselNext className="right-3 size-10 border-white/30 bg-white/90 text-green-800 shadow-lg hover:bg-white sm:right-5" />
      </Carousel>
    </section>
  );
}
