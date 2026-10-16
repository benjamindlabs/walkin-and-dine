"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { initGSAP, prefersReducedMotion, gsap } from "@/lib/animations";

interface MenuItem {
  name: string;
  notes: string;
  provenance: string;
  priceNote: string;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  hearth: [
    {
      name: "Dry-Aged Duck Breast",
      notes: "Glazed in sour cherry reduction, roasted heirloom baby carrots, nasturtium oil",
      provenance: "Sonoma valley poultry, 21-day dry aged",
      priceNote: "Featured Signature",
    },
    {
      name: "Ember-Roasted Heritage Pork",
      notes: "Crisped crackling, caramelized apple mostarda, charred winter greens",
      provenance: "Berkshire pasture-raised, wood-roasted 6 hours",
      priceNote: "Daily Cut",
    },
    {
      name: "Smoked Maitake & Celeriac",
      notes: "Slow-roasted over fruitwood, black garlic purée, hazelnut crumble",
      provenance: "Foraged Oregon mushrooms",
      priceNote: "Harvest Plate",
    },
  ],
  tide: [
    {
      name: "Kona Kampachi Crudo",
      notes: "Fermented yuzu broth, white soy, shaved sea radish, coriander blossom",
      provenance: "Wild line-caught Pacific",
      priceNote: "Cold Larder",
    },
    {
      name: "Hearth-Charred Spanish Octopus",
      notes: "Smoked paprika emulsion, fingerling potatoes in pork fat, pickled shallots",
      provenance: "Sustainable dive-caught",
      priceNote: "Plancha",
    },
    {
      name: "Coal-Baked Oysters",
      notes: "Cultured ramp butter, crispy leek crumbs, smoked sea salt",
      provenance: "Pacific Northwest tidal beds",
      priceNote: "Half Dozen",
    },
  ],
  libations: [
    {
      name: "The Ember Old Fashioned",
      notes: "Single barrel bourbon, smoked demerara, aromatic and charred cedar bitters",
      provenance: "Handcrafted crystal & carved ice",
      priceNote: "Bar Signature",
    },
    {
      name: "Smoked Rosemary & Pine Gimlet",
      notes: "Botanical dry gin, torched alpine pine, clarified lime cordial",
      provenance: "House distilled botanical syrups",
      priceNote: "Seasonal Pour",
    },
    {
      name: "Sommelier Cellar Selection",
      notes: "Low-intervention biodynamic wines from coastal volcanic terroirs",
      provenance: "Curated by head sommelier",
      priceNote: "Glass / Bottle",
    },
  ],
};

interface OfferingsProps {
  onOpenReservation: () => void;
}

export function Offerings({ onOpenReservation }: OfferingsProps) {
  const [activeTab, setActiveTab] = useState<"hearth" | "tide" | "libations">("hearth");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initGSAP();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
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
      id="offerings"
      ref={sectionRef}
      className="py-16 sm:py-28 md:py-36 px-5 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#2e2926]/40"
      aria-label="Menu Offerings"
    >
      <div ref={headerRef} className="max-w-3xl mb-10 sm:mb-16">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase">
            02 / Offerings
          </span>
          <span className="w-10 h-px bg-[#2e2926]" />
        </div>

        <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#f4efe6] font-normal leading-[1.14] sm:leading-[1.12]">
          A seasonal cadence dictated by the harvest.
        </h2>

        <p className="mt-3 sm:mt-4 text-[#a8a29e] text-sm sm:text-base md:text-lg font-light leading-relaxed">
          Dishes evolve nightly. Below is a representative tasting preview illustrating our balance of wood smoke, raw purity, and seasonal larder.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-[#2e2926] pb-3" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === "hearth"}
          onClick={() => setActiveTab("hearth")}
          className={`px-4 sm:px-5 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase transition-colors min-h-[44px] flex items-center justify-center cursor-pointer ${
            activeTab === "hearth"
              ? "bg-[#c59b6d] text-[#0a0908] font-medium"
              : "text-[#a8a29e] hover:text-[#f4efe6] hover:bg-[#141210]"
          }`}
        >
          Hearth & Fire
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "tide"}
          onClick={() => setActiveTab("tide")}
          className={`px-4 sm:px-5 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase transition-colors min-h-[44px] flex items-center justify-center cursor-pointer ${
            activeTab === "tide"
              ? "bg-[#c59b6d] text-[#0a0908] font-medium"
              : "text-[#a8a29e] hover:text-[#f4efe6] hover:bg-[#141210]"
          }`}
        >
          Coastal & Tide
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "libations"}
          onClick={() => setActiveTab("libations")}
          className={`px-4 sm:px-5 py-2.5 rounded-sm text-xs font-mono tracking-widest uppercase transition-colors min-h-[44px] flex items-center justify-center cursor-pointer ${
            activeTab === "libations"
              ? "bg-[#c59b6d] text-[#0a0908] font-medium"
              : "text-[#a8a29e] hover:text-[#f4efe6] hover:bg-[#141210]"
          }`}
        >
          Craft & Cellar
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Visual Feature Dish */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#2e2926] bg-[#141210] shadow-xl group">
            <Image
              src="/images/dish.jpg"
              alt="Dry-aged duck breast with glazed roasted heirloom carrots and dark reduction"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/90 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[11px] font-mono tracking-widest text-[#c59b6d] uppercase">
                Featured Plating
              </span>
              <p className="text-sm font-serif text-[#f4efe6] mt-0.5">
                Dry-Aged Duck Breast • Cherry Reduction & Ember Carrots
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#a8a29e] font-mono">
            * Representative preview. Exact nightly menu is tailored to local daily landings.
          </p>
        </div>

        {/* Menu Listings */}
        <div className="lg:col-span-7 space-y-6">
          {MENU_DATA[activeTab].map((item) => (
            <div
              key={item.name}
              className="p-6 bg-[#141210] border border-[#2e2926] hover:border-[#c59b6d]/40 rounded-sm transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <h3 className="font-serif text-xl sm:text-2xl text-[#f4efe6] font-normal">
                  {item.name}
                </h3>
                <span className="text-xs font-mono tracking-widest text-[#c59b6d] uppercase">
                  {item.priceNote}
                </span>
              </div>
              <p className="text-sm text-[#a8a29e] leading-relaxed mb-3">
                {item.notes}
              </p>
              <div className="text-[11px] font-mono tracking-wider text-[#a8a29e]/80 uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]" />
                {item.provenance}
              </div>
            </div>
          ))}

          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-[#a8a29e]">
              A complete eight-course tasting menu with optional cellar pairing is offered nightly.
            </div>
            <button
              type="button"
              onClick={onOpenReservation}
              className="px-6 py-2.5 bg-[#1c1917] hover:bg-[#2e2926] border border-[#2e2926] text-[#f4efe6] text-xs font-mono uppercase tracking-widest transition-colors rounded-sm min-h-[44px]"
            >
              Reserve for Tasting
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
