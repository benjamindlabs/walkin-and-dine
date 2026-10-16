"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Flame, Compass, Sparkles } from "lucide-react";
import { initGSAP, prefersReducedMotion, gsap } from "@/lib/animations";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-16 sm:py-28 md:py-36 px-5 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#2e2926]/40"
      aria-label="Culinary Philosophy"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Editorial Text Column */}
        <div ref={contentRef} className="lg:col-span-7 space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase">
              01 / Philosophy
            </span>
            <span className="w-10 h-px bg-[#2e2926]" />
          </div>

          <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#f4efe6] font-normal leading-[1.14] sm:leading-[1.12]">
            We cook with primitive fire and modern restraint.
          </h2>

          <div className="space-y-4 sm:space-y-5 text-[#a8a29e] text-sm sm:text-base md:text-lg font-light leading-relaxed">
            <p>
              Every evening starts long before guests arrive. White oak and applewood logs are split by hand, then brought to ember over five hours in our open brick hearth. We do not use electric broilers or gas shortcuts.
            </p>
            <p>
              Our larder changes daily with the tides and the orchard harvests. By allowing smoke, char, and ambient heat to dictate the pace of every dish, we strip away the noise of modern dining to celebrate pure, unadorned flavor.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-4 border-t border-[#2e2926]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#c59b6d] uppercase tracking-wider mb-1.5">
                <Flame className="w-4 h-4" /> Live Wood
              </div>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Aged hardwood embers impart subtle, distinctive perfume.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#c59b6d] uppercase tracking-wider mb-1.5">
                <Compass className="w-4 h-4" /> Micro-Seasons
              </div>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Direct partnerships with coastal divers and heirloom growers.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#c59b6d] uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4" /> Deep Cellar
              </div>
              <p className="text-xs text-[#a8a29e] leading-relaxed">
                Low-intervention vintages selected to balance savory smoke.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Image Column */}
        <div ref={imageRef} className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden border border-[#2e2926] shadow-2xl bg-[#141210]">
            <Image
              src="/images/hearth.jpg"
              alt="Chef tending cast iron vessels over the open hearth fire"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-left">
              <span className="text-[11px] font-mono tracking-widest text-[#c59b6d] uppercase block">
                The Hearth Room
              </span>
              <p className="text-xs text-[#f4efe6] font-light mt-0.5">
                Open fire stations, handcrafted ironwork, and cast cookery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
