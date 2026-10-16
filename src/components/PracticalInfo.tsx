"use client";

import React from "react";
import { Clock, MapPin, Phone, Mail, ShieldAlert } from "lucide-react";

interface PracticalInfoProps {
  onOpenReservation: () => void;
}

export function PracticalInfo({ onOpenReservation }: PracticalInfoProps) {
  return (
    <section
      id="visit"
      className="py-16 sm:py-28 md:py-36 px-5 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#2e2926]/40"
      aria-label="Hours and Location Information"
    >
      <div className="max-w-3xl mb-10 sm:mb-16">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase">
            04 / Visit & Contact
          </span>
          <span className="w-10 h-px bg-[#2e2926]" />
        </div>

        <h2 className="font-serif text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#f4efe6] font-normal leading-[1.14] sm:leading-[1.12]">
          Planning your visit.
        </h2>

        <p className="mt-3 sm:mt-4 text-[#a8a29e] text-sm sm:text-base md:text-lg font-light leading-relaxed">
          We welcome guests Wednesday through Sunday by reservation. Walk-in seating at our bar counter is accommodated on a first-arrival basis.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Card 1: Hours */}
        <div className="p-6 sm:p-8 bg-[#141210] border border-[#2e2926] rounded-sm space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#c59b6d]">
            <Clock className="w-4 h-4" /> Service Hours
          </div>
          <div className="space-y-2 text-sm text-[#f4efe6]">
            <div className="flex justify-between py-1 border-b border-[#2e2926]/60">
              <span className="text-[#a8a29e]">Wednesday – Thursday</span>
              <span className="font-medium">17:30 – 22:00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#2e2926]/60">
              <span className="text-[#a8a29e]">Friday – Saturday</span>
              <span className="font-medium">17:00 – 23:00</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#2e2926]/60">
              <span className="text-[#a8a29e]">Sunday</span>
              <span className="font-medium">16:30 – 21:30</span>
            </div>
            <div className="flex justify-between py-1 text-[#a8a29e]">
              <span>Monday – Tuesday</span>
              <span className="italic">Closed (Foraging)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Location & Contact */}
        <div className="p-6 sm:p-8 bg-[#141210] border border-[#2e2926] rounded-sm space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#c59b6d]">
            <MapPin className="w-4 h-4" /> Location & Transit
          </div>
          <div className="space-y-3 text-sm text-[#f4efe6]">
            <p className="leading-relaxed">
              428 Hearthstone Way, Suite 100<br />
              Arts & Culinary District<br />
              San Francisco, CA 94107
            </p>
            <div className="pt-2 border-t border-[#2e2926]/60 space-y-2 text-xs text-[#a8a29e]">
              <a
                href="tel:+14155550198"
                className="flex items-center gap-2 hover:text-[#f4efe6] transition-colors py-1 min-h-[36px]"
              >
                <Phone className="w-3.5 h-3.5 text-[#c59b6d] shrink-0" /> (415) 555-0198
              </a>
              <a
                href="mailto:reservations@walkinanddine.com"
                className="flex items-center gap-2 hover:text-[#f4efe6] transition-colors py-1 min-h-[36px]"
              >
                <Mail className="w-3.5 h-3.5 text-[#c59b6d] shrink-0" /> reservations@walkinanddine.com
              </a>
            </div>
          </div>
        </div>

        {/* Card 3: Policies & Reservations */}
        <div className="p-6 sm:p-8 bg-[#141210] border border-[#2e2926] rounded-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#c59b6d]">
              <ShieldAlert className="w-4 h-4" /> Guest Notes
            </div>
            <p className="mt-3 text-sm text-[#a8a29e] leading-relaxed">
              Reservations release 30 days in advance at 10:00 AM. For parties larger than six or private dining room buyouts, please inquire directly.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={onOpenReservation}
              className="w-full py-3.5 bg-[#c59b6d] text-[#0a0908] font-medium text-xs font-mono uppercase tracking-widest hover:bg-[#d8b083] transition-colors rounded-sm min-h-[48px] flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
            >
              Request Table
            </button>
          </div>
        </div>
      </div>

      {/* Veracity Notice per Anti-Slop Protocol */}
      <div className="mt-8 p-4 bg-[#141210]/60 border border-[#2e2926] rounded-sm flex items-start gap-3 text-xs text-[#a8a29e]">
        <span className="font-mono text-[#c59b6d] font-bold">NOTE:</span>
        <p>
          Addresses, telephone numbers, and hours shown above serve as prototype placeholders. When verified facts are supplied in <code className="text-[#f4efe6]">client/facts.md</code>, they seamlessly hydrate this section without structural changes.
        </p>
      </div>
    </section>
  );
}
