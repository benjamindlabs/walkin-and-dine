"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowDown, Flame, Wine, Sparkles, Compass } from "lucide-react";
import { initGSAP, prefersReducedMotion, gsap, ScrollTrigger } from "@/lib/animations";

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

interface HeroProps {
  onOpenReservation: () => void;
}

export function Hero({ onOpenReservation }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scene 1: Initial Hero State
  const scene1Ref = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  // Scene 2 & 3: Living Cinematic Composition
  const cinematicLayerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const centerDishCardRef = useRef<HTMLDivElement>(null);
  const hearthCardRef = useRef<HTMLDivElement>(null);
  const cocktailCardRef = useRef<HTMLDivElement>(null);

  // Upper Typography Choreography Zone
  const narrativeBeat1Ref = useRef<HTMLDivElement>(null);
  const narrativeBeat2Ref = useRef<HTMLDivElement>(null);

  // Scroll phase tracking state
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => prefersReducedMotion(),
    () => false
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    initGSAP();

    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance animation before scrolling begins
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      entranceTl
        .fromTo(
          bgImageRef.current,
          { scale: 1.08, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: 1.6 }
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=1.1"
        )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.7"
        )
        .fromTo(
          sublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );

      // 2. Responsive master scroll-driven timeline using gsap.matchMedia
      const mm = gsap.matchMedia();

      // DESKTOP & LARGE SCREENS (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        const desktopTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=220%",
            pin: stageRef.current,
            pinSpacing: true,
            scrub: 0.9,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.28) {
                setActivePhase(1);
              } else if (p < 0.65) {
                setActivePhase(2);
              } else {
                setActivePhase(3);
              }
            },
          },
        });

        // Initial setup for cinematic elements
        gsap.set(cinematicLayerRef.current, { opacity: 0, pointerEvents: "none" });
        gsap.set(centerDishCardRef.current, {
          opacity: 0,
          scale: 0.82,
          y: 70,
        });
        gsap.set(hearthCardRef.current, {
          opacity: 0,
          x: -80,
          y: 40,
          rotate: -2.5,
        });
        gsap.set(cocktailCardRef.current, {
          opacity: 0,
          x: 80,
          y: 40,
          rotate: 2.5,
        });
        gsap.set(narrativeBeat1Ref.current, { opacity: 0, y: 25, pointerEvents: "none" });
        gsap.set(narrativeBeat2Ref.current, { opacity: 0, y: 25, pointerEvents: "none" });

        // Phase 1 -> Phase 2 (0.0 to 0.35): Fade out initial hero, reveal layered composition
        desktopTl
          .to(
            scene1Ref.current,
            {
              opacity: 0,
              y: -50,
              filter: "blur(4px)",
              duration: 0.24,
              ease: "power2.inOut",
            },
            0
          )
          .to(
            scrollPromptRef.current,
            { opacity: 0, y: -20, duration: 0.15 },
            0
          )
          .to(
            bgImageRef.current,
            {
              scale: 1.08,
              opacity: 0.35,
              duration: 0.5,
              ease: "none",
            },
            0
          )
          .to(
            bgOverlayRef.current,
            {
              backgroundColor: "rgba(10, 9, 8, 0.82)",
              duration: 0.4,
            },
            0
          )
          .to(
            cinematicLayerRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.2,
            },
            0.14
          )
          // Reveal Beat 1 in centered upper typography zone
          .to(
            narrativeBeat1Ref.current,
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.28,
              ease: "power2.out",
            },
            0.20
          )
          // Central focal dish glides smoothly into place
          .to(
            centerDishCardRef.current,
            {
              opacity: 1,
              scale: 1,
              y: 20,
              duration: 0.34,
              ease: "power2.out",
            },
            0.20
          )
          // Supporting hearth vignette slides in from left with depth
          .to(
            hearthCardRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: -1.5,
              duration: 0.36,
              ease: "power2.out",
            },
            0.22
          )
          // Supporting cellar vignette slides in from right with depth
          .to(
            cocktailCardRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 1.5,
              duration: 0.36,
              ease: "power2.out",
            },
            0.24
          );

        // Phase 2 -> Phase 3 (0.35 to 0.72): Clean cross-fade of typography in exact same centered container
        desktopTl
          .to(
            narrativeBeat1Ref.current,
            {
              opacity: 0,
              y: -20,
              pointerEvents: "none",
              duration: 0.16,
              ease: "power2.in",
            },
            0.46
          )
          .to(
            narrativeBeat2Ref.current,
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.22,
              ease: "power2.out",
            },
            0.52
          )
          // Dynamic parallax choreography of cards
          .to(
            centerDishCardRef.current,
            {
              scale: 1.04,
              y: 20,
              duration: 0.42,
              ease: "power1.inOut",
            },
            0.44
          )
          .to(
            hearthCardRef.current,
            {
              y: -25,
              x: -15,
              scale: 0.96,
              duration: 0.45,
              ease: "power1.inOut",
            },
            0.42
          )
          .to(
            cocktailCardRef.current,
            {
              y: -25,
              x: 15,
              scale: 0.96,
              duration: 0.45,
              ease: "power1.inOut",
            },
            0.42
          );

        // Phase 3 -> Exit (0.75 to 1.0): Graceful exit for seamless handoff to ScrollSequence
        desktopTl
          .to(
            [centerDishCardRef.current, hearthCardRef.current, cocktailCardRef.current],
            {
              y: -30,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
            },
            0.75
          )
          .to(
            narrativeBeat2Ref.current,
            {
              opacity: 0,
              y: -20,
              duration: 0.25,
              ease: "power2.in",
            },
            0.75
          )
          .to(
            cinematicLayerRef.current,
            {
              opacity: 0,
              duration: 0.2,
              ease: "power2.in",
            },
            0.8
          );
      });

      // MOBILE & TABLET (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=130%",
            pin: stageRef.current,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.3) {
                setActivePhase(1);
              } else if (p < 0.68) {
                setActivePhase(2);
              } else {
                setActivePhase(3);
              }
            },
          },
        });

        gsap.set(cinematicLayerRef.current, { opacity: 0, pointerEvents: "none" });
        gsap.set(centerDishCardRef.current, { opacity: 0, scale: 0.88, y: 40 });
        gsap.set(narrativeBeat1Ref.current, { opacity: 0, y: 20, pointerEvents: "none" });
        gsap.set(narrativeBeat2Ref.current, { opacity: 0, y: 20, pointerEvents: "none" });

        mobileTl
          .to(
            scene1Ref.current,
            {
              opacity: 0,
              y: -35,
              duration: 0.24,
              ease: "power2.inOut",
            },
            0
          )
          .to(
            bgImageRef.current,
            {
              scale: 1.05,
              opacity: 0.35,
              duration: 0.45,
            },
            0
          )
          .to(
            cinematicLayerRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.2,
            },
            0.16
          )
          .to(
            narrativeBeat1Ref.current,
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.26,
            },
            0.20
          )
          .to(
            centerDishCardRef.current,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.32,
            },
            0.20
          )
          .to(
            narrativeBeat1Ref.current,
            {
              opacity: 0,
              y: -15,
              pointerEvents: "none",
              duration: 0.16,
            },
            0.48
          )
          .to(
            narrativeBeat2Ref.current,
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.24,
            },
            0.52
          )
          .to(
            [centerDishCardRef.current, narrativeBeat2Ref.current, cinematicLayerRef.current],
            {
              opacity: 0,
              y: -20,
              duration: 0.25,
              ease: "power2.in",
            },
            0.75
          );
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative w-full bg-[#0a0908] text-[#f4efe6] overflow-visible"
      aria-label="Introduction & Welcome"
    >
      {/* Pinned Stage Container */}
      <div
        ref={stageRef}
        className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[660px] max-h-[1200px] overflow-hidden flex flex-col justify-between"
      >
        {/* Layer 0: Atmospheric Deep Background Video */}
        <div
          ref={bgImageRef}
          className="absolute inset-0 z-0 overflow-hidden transform-gpu will-change-transform"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero.jpg"
            className="w-full h-full object-cover object-center pointer-events-none"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/hero.mp4" type="video/mp4" />
            <source src="/videos/hero.webm" type="video/webm" />
          </video>
        </div>

        {/* Dynamic Dark Vignette Overlay */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 z-[1] transition-colors duration-500 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/65 to-[#0a0908]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908]/85 via-transparent to-[#0a0908]/85" />
        </div>

        {/* Scene 1: Initial Welcome Hero State */}
        <div
          ref={scene1Ref}
          className="relative z-10 max-w-4xl px-5 sm:px-12 md:px-20 pt-24 xs:pt-28 sm:pt-36 pb-12 sm:pb-20 flex flex-col justify-end h-full"
        >
          <div ref={badgeRef} className="mb-3 sm:mb-6">
            <span className="inline-flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[#c59b6d] bg-[#141210]/90 border border-[#2e2926] rounded-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]" />
              Wood-Fired Hearth & Vintage Cellar
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-[#f4efe6] font-normal"
          >
            The quiet art of fire & season.
          </h1>

          <p
            ref={sublineRef}
            className="mt-4 sm:mt-8 text-sm xs:text-base sm:text-lg md:text-xl text-[#a8a29e] max-w-2xl font-light leading-relaxed"
          >
            An unhurried dining room where open hearth embers meet wild coastal ingredients and considered cellar pairings.
          </p>

          {/* Action Controls */}
          <div
            ref={ctaRef}
            className="mt-6 sm:mt-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-6"
          >
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-6 sm:px-7 py-3.5 bg-[#c59b6d] text-[#0a0908] font-medium text-xs tracking-[0.16em] uppercase hover:bg-[#d8b083] transition-colors rounded-sm min-h-[44px] flex items-center justify-center font-sans shadow-lg shadow-[#0a0908]/50 focus-visible:outline-2 focus-visible:outline-[#c59b6d] cursor-pointer"
            >
              Reserve Your Table
            </button>

            <a
              href="#offerings"
              className="px-6 sm:px-7 py-3.5 bg-[#141210]/90 hover:bg-[#1c1917] border border-[#2e2926] hover:border-[#c59b6d]/60 text-[#f4efe6] font-medium text-xs tracking-[0.16em] uppercase transition-colors rounded-sm min-h-[44px] flex items-center justify-center font-sans backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
            >
              Explore Offerings
            </a>
          </div>
        </div>

        {/* Scene 2 & 3: Living Cinematic Composition */}
        <div
          ref={cinematicLayerRef}
          className={`absolute inset-0 z-20 px-4 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28 pb-8 flex flex-col justify-between items-center ${
            isReducedMotion ? "relative opacity-100 mt-16 pointer-events-auto" : "opacity-0"
          }`}
        >
          {/* Top Editorial Typography Zone (Occupies identical centered container) */}
          <div className="relative w-full max-w-2xl mx-auto h-[120px] sm:h-[135px] flex items-center justify-center z-30">
            {/* Beat 1: The Kitchen Craft */}
            <div
              ref={narrativeBeat1Ref}
              className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2 pointer-events-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c59b6d]">
                  01 / The Living Kitchen
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f4efe6] font-normal tracking-tight">
                Forged in embers. Rooted in the coast.
              </h2>
              <p className="text-xs sm:text-sm text-[#a8a29e] font-light max-w-lg mx-auto leading-relaxed">
                Every evening is a dialogue between white oak embers, daily tide landings, and low-intervention cellar vintages.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[10px] font-mono uppercase tracking-wider text-[#a8a29e]">
                <span className="px-2.5 py-0.5 rounded-sm bg-[#141210]/90 border border-[#2e2926]">
                  Split White Oak
                </span>
                <span className="px-2.5 py-0.5 rounded-sm bg-[#141210]/90 border border-[#2e2926]">
                  Daily Tide Catch
                </span>
                <span className="px-2.5 py-0.5 rounded-sm bg-[#141210]/90 border border-[#2e2926]">
                  Cellar Pairings
                </span>
              </div>
            </div>

            {/* Beat 2: The Dining Cadence */}
            <div
              ref={narrativeBeat2Ref}
              className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2 pointer-events-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#c59b6d]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c59b6d]">
                  02 / The Dining Cadence
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f4efe6] font-normal tracking-tight">
                An unhurried three hours at your table.
              </h2>
              <p className="text-xs sm:text-sm text-[#a8a29e] font-light max-w-lg mx-auto leading-relaxed">
                Only two seatings each evening. Time slows down so every course arrives at its peak.
              </p>
              <div className="flex items-center justify-center gap-3 pt-1.5">
                <button
                  type="button"
                  onClick={onOpenReservation}
                  className="px-6 py-2 bg-[#c59b6d] text-[#0a0908] text-xs font-mono uppercase tracking-widest rounded-sm min-h-[44px] hover:bg-[#d8b083] transition-colors font-medium shadow-md shadow-[#0a0908]/50"
                >
                  Request Table
                </button>
                <a
                  href="#philosophy"
                  className="px-6 py-2 bg-[#141210] border border-[#2e2926] hover:border-[#c59b6d]/60 text-[#f4efe6] text-xs font-mono uppercase tracking-widest rounded-sm min-h-[44px] flex items-center justify-center transition-colors"
                >
                  Our Philosophy
                </a>
              </div>
            </div>
          </div>

          {/* Lower Cards Tableau (Separated with clean spatial gap) */}
          <div
            ref={cardsContainerRef}
            className="relative w-full max-w-6xl flex-1 flex items-center justify-center pb-4 sm:pb-8"
          >
            {/* Supporting Left Layer: The Hearth & Live Fire (Desktop Only) */}
            <div
              ref={hearthCardRef}
              className="hidden lg:block absolute left-2 xl:left-8 top-1/2 -translate-y-1/2 z-10 w-[230px] xl:w-[260px] rounded-sm overflow-hidden border border-[#2e2926] bg-[#141210] shadow-2xl backdrop-blur-md transform-gpu will-change-transform"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/hearth.jpg"
                  alt="Open brick hearth with glowing applewood embers"
                  fill
                  sizes="260px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/90 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#0a0908]/85 text-[10px] font-mono tracking-widest text-[#c59b6d] uppercase border border-[#2e2926]">
                    <Flame className="w-3 h-3 text-[#c59b6d]" /> Live Fire
                  </span>
                </div>
              </div>
              <div className="p-3.5 border-t border-[#2e2926]/80 text-left">
                <span className="text-[10px] font-mono tracking-widest text-[#c59b6d] uppercase block">
                  The Hearth Room
                </span>
                <p className="text-[11px] text-[#a8a29e] font-light mt-0.5 leading-relaxed">
                  White oak embers brought to heat over five unhurried hours.
                </p>
              </div>
            </div>

            {/* Central Focal Food Plating (Hero Main Character) */}
            <div
              ref={centerDishCardRef}
              className="relative z-20 w-[92vw] sm:w-[420px] lg:w-[460px] xl:w-[500px] rounded-sm overflow-hidden border border-[#2e2926] bg-[#141210] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] transform-gpu will-change-transform"
            >
              <div className="relative aspect-[16/11] w-full">
                <Image
                  src="/images/dish.jpg"
                  alt="Dry-aged duck breast glazed with sour cherry and roasted heirloom carrots"
                  fill
                  priority
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 420px, 500px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/95 via-[#0a0908]/25 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5">
                  <span className="px-2.5 py-1 rounded-sm bg-[#0a0908]/90 border border-[#2e2926] text-[10px] sm:text-[11px] font-mono tracking-widest text-[#c59b6d] uppercase backdrop-blur-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#c59b6d]" />
                    Signature Harvest
                  </span>
                </div>

                {/* Card Footer Details */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#c59b6d] tracking-widest uppercase mb-1">
                    <span>21-Day Dry Aged Duck</span>
                    <span>Tasting Course</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-[#f4efe6] font-normal leading-snug">
                    Sour Cherry Reduction & Ember-Charred Carrots
                  </h3>
                </div>
              </div>
            </div>

            {/* Supporting Right Layer: Cellar & Cocktails (Desktop Only) */}
            <div
              ref={cocktailCardRef}
              className="hidden lg:block absolute right-2 xl:right-8 top-1/2 -translate-y-1/2 z-10 w-[200px] xl:w-[230px] rounded-sm overflow-hidden border border-[#2e2926] bg-[#141210] shadow-2xl backdrop-blur-md transform-gpu will-change-transform"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/images/cocktail.jpg"
                  alt="Amber botanical cocktail in vintage cut crystal"
                  fill
                  sizes="230px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/90 via-transparent to-transparent" />
                <div className="absolute top-2.5 right-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[#0a0908]/85 text-[10px] font-mono tracking-widest text-[#c59b6d] uppercase border border-[#2e2926]">
                    <Wine className="w-3 h-3 text-[#c59b6d]" /> Cellar
                  </span>
                </div>
              </div>
              <div className="p-3.5 border-t border-[#2e2926]/80 text-left">
                <span className="text-[10px] font-mono tracking-widest text-[#c59b6d] uppercase block">
                  The Cellar Balance
                </span>
                <p className="text-[11px] text-[#a8a29e] font-light mt-0.5 leading-relaxed">
                  Low-intervention coastal vintages and smoked aperitifs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Indicator (Bottom Left of Stage: completely clear of all cards) */}
        <div className="absolute left-6 sm:left-12 bottom-6 z-30 hidden md:flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] uppercase text-[#a8a29e] pointer-events-none">
          <div className="flex items-center gap-3">
            <span
              className={`transition-colors duration-300 ${
                activePhase === 1 ? "text-[#c59b6d] font-semibold" : "text-[#a8a29e]/40"
              }`}
            >
              01 Welcome
            </span>
            <span className="text-[#2e2926]">•</span>
            <span
              className={`transition-colors duration-300 ${
                activePhase === 2 ? "text-[#c59b6d] font-semibold" : "text-[#a8a29e]/40"
              }`}
            >
              02 The Craft
            </span>
            <span className="text-[#2e2926]">•</span>
            <span
              className={`transition-colors duration-300 ${
                activePhase === 3 ? "text-[#c59b6d] font-semibold" : "text-[#a8a29e]/40"
              }`}
            >
              03 The Cadence
            </span>
          </div>
          <div className="w-12 h-0.5 bg-[#2e2926] relative overflow-hidden rounded-full">
            <div
              className="h-full bg-[#c59b6d] transition-all duration-300"
              style={{
                width: `${(activePhase / 3) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Scroll Cue (Initial screen) */}
        <div
          ref={scrollPromptRef}
          className="absolute right-6 sm:right-12 md:right-20 bottom-8 sm:bottom-12 z-10 hidden md:flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-[#a8a29e]"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#c59b6d] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
