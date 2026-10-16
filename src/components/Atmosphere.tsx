"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { initGSAP, prefersReducedMotion, gsap } from "@/lib/animations";

export function Atmosphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        galleryRef.current?.children ? Array.from(galleryRef.current.children) : [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atmosphere"
      ref={sectionRef}
      className="py-16 sm:py-28 md:py-36 px-5 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#2e2926]/40"
      aria-label="Atmosphere & Space"
    >
      <div className="max-w-3xl mb-10 sm:mb-16">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase">
            03 / Atmosphere
          </span>
          <span className="w-10 h-px bg-[#2e2926]" />
        </div>

        <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#f4efe6] font-normal leading-[1.14] sm:leading-[1.12]">
          Space designed for unhurried conversation.
        </h2>

        <p className="mt-3 sm:mt-4 text-[#a8a29e] text-sm sm:text-base md:text-lg font-light leading-relaxed">
          From the low hum of amber candlelight to the deep scent of burning applewood, every corner is proportioned for warmth, intimacy, and ease.
        </p>
      </div>

      {/* Editorial Asymmetric Image Grid */}
      <div
        ref={galleryRef}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start"
      >
        {/* Gallery Item 1: Cocktail Craft (Portrait on desktop, balanced on mobile) */}
        <div className="md:col-span-5 relative group overflow-hidden rounded-sm border border-[#2e2926] bg-[#141210]">
          <div className="relative aspect-[4/3] xs:aspect-[16/11] md:aspect-[3/4] w-full">
            <Image
              src="/images/cocktail.jpg"
              alt="Artisanal cocktail in vintage cut crystal on polished walnut bar"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono tracking-widest text-[#c59b6d] uppercase block mb-1">
                The Bar
              </span>
              <h3 className="font-serif text-xl text-[#f4efe6]">
                Single-Barrel & Botanical Alchemy
              </h3>
              <p className="text-xs text-[#a8a29e] mt-1">
                Curated aperitifs and smoked infusions designed to awaken the palate.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Item 2 & 3: Staggered Right Stack */}
        <div className="md:col-span-7 space-y-6 sm:space-y-8">
          {/* Gallery Item 2: Dining Room */}
          <div className="relative group overflow-hidden rounded-sm border border-[#2e2926] bg-[#141210]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/hero.jpg"
                alt="Candlelit tables and warm stone textures of the dining room"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] font-mono tracking-widest text-[#c59b6d] uppercase block mb-1">
                  The Dining Room
                </span>
                <h3 className="font-serif text-xl text-[#f4efe6]">
                  Acoustic Quiet & Warm Timber
                </h3>
                <p className="text-xs text-[#a8a29e] mt-1">
                  Reclaimed timber tables and textured plaster surfaces for natural warmth.
                </p>
              </div>
            </div>
          </div>

          {/* Atmosphere Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-[#141210] border border-[#2e2926] rounded-sm">
              <span className="text-xs font-mono tracking-widest text-[#c59b6d] uppercase block mb-2">
                Acoustics
              </span>
              <p className="text-sm text-[#f4efe6] font-serif">
                Gentle vinyl playback and textured felt dampening ensure effortless, private conversation.
              </p>
            </div>

            <div className="p-6 bg-[#141210] border border-[#2e2926] rounded-sm">
              <span className="text-xs font-mono tracking-widest text-[#c59b6d] uppercase block mb-2">
                Pacing
              </span>
              <p className="text-sm text-[#f4efe6] font-serif">
                Two seatings each evening, allowing three unhurried hours for each party.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
