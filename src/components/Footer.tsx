"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="border-t border-[#2e2926] bg-[#0a0908] text-[#f4efe6] pt-16 pb-12 px-5 sm:px-12 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 sm:pb-16 border-b border-[#2e2926]/60">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl tracking-wider text-[#f4efe6] uppercase font-medium">
              Walkin & Dine
            </h2>
            <p className="text-sm text-[#a8a29e] max-w-sm font-light leading-relaxed">
              An unhurried dining room centered around open hearth cookery, wild harvests, and low-intervention cellar vintages.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c59b6d] block mb-2">
              Navigation
            </span>
            <ul className="space-y-1 text-sm text-[#a8a29e]">
              <li>
                <a href="#chef-sequence" className="hover:text-[#f4efe6] transition-colors py-2 inline-block min-h-[36px]">
                  The Sequence
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#f4efe6] transition-colors py-2 inline-block min-h-[36px]">
                  Culinary Philosophy
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-[#f4efe6] transition-colors py-2 inline-block min-h-[36px]">
                  Seasonal Offerings
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-[#f4efe6] transition-colors py-2 inline-block min-h-[36px]">
                  Atmosphere & Spaces
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#f4efe6] transition-colors py-2 inline-block min-h-[36px]">
                  Hours & Location
                </a>
              </li>
            </ul>
          </div>

          {/* Cellar Dispatches Form */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c59b6d] block mb-1">
              Seasonal Journal
            </span>
            <p className="text-xs text-[#a8a29e] leading-relaxed">
              Receive quarterly dispatches on cellar releases, seasonal menu previews, and winemaker collaborations.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col xs:flex-row gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email for seasonal journal
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#141210] border border-[#2e2926] rounded-sm px-3.5 py-2.5 text-xs text-[#f4efe6] focus:border-[#c59b6d] focus:outline-none flex-1 min-h-[44px]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#c59b6d] text-[#0a0908] text-xs font-mono uppercase tracking-widest hover:bg-[#d8b083] transition-colors rounded-sm min-h-[44px] flex items-center justify-center font-medium cursor-pointer"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="p-3 bg-[#141210] border border-[#c59b6d]/40 rounded-sm flex items-center gap-2 text-xs text-[#c59b6d]">
                <Check className="w-4 h-4" />
                <span>Subscribed. You will receive our next seasonal dispatch.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Credits & Navigation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a8a29e] font-mono">
          <div>
            © 2026 Walkin & Dine. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#visit" className="hover:text-[#f4efe6] transition-colors">428 Hearthstone Way, San Francisco</a>
            <span className="text-[#2e2926]">•</span>
            <a href="#offerings" className="hover:text-[#f4efe6] transition-colors">Tasting Menus</a>
            <span className="text-[#2e2926]">•</span>
            <span className="text-[#c59b6d]">Wood-Fired Hearth & Cellar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
