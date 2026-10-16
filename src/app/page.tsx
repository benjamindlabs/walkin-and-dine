"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Offerings } from "@/components/Offerings";
import { Atmosphere } from "@/components/Atmosphere";
import { PracticalInfo } from "@/components/PracticalInfo";
import { Footer } from "@/components/Footer";
import { ReservationModal } from "@/components/ReservationModal";
import { ScrollSequence } from "@/components/ScrollSequence";

export default function Home() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#f4efe6] flex flex-col font-sans selection:bg-[#c59b6d] selection:text-[#0a0908]">
      {/* Top Banner indicating Prototype Veracity */}
      <div className="bg-[#141210] border-b border-[#2e2926] text-[11px] font-mono tracking-widest text-[#a8a29e] py-2 px-4 text-center z-50 flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d] animate-pulse" />
        <span>WALKIN & DINE • CONTEMPORARY WOOD-FIRED DINING • VERIFIED FACTS ENGINE</span>
      </div>

      <Navbar onOpenReservation={() => setIsReservationOpen(true)} />

      <main className="flex-1">
        <Hero onOpenReservation={() => setIsReservationOpen(true)} />
        <ScrollSequence onOpenReservation={() => setIsReservationOpen(true)} />
        <Philosophy />
        <Offerings onOpenReservation={() => setIsReservationOpen(true)} />
        <Atmosphere />
        <PracticalInfo onOpenReservation={() => setIsReservationOpen(true)} />
      </main>

      <Footer />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
