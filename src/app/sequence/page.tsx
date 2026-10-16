"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ScrollSequence } from "@/components/ScrollSequence";
import { ReservationModal } from "@/components/ReservationModal";

export default function SequencePage() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#f4efe6]">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0908]/80 backdrop-blur-md border-b border-[#2e2926]/50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#a8a29e] hover:text-[#f4efe6] transition-colors uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
        <div className="text-xs font-mono tracking-widest text-[#c59b6d] uppercase">
          WALKIN & DINE SEQUENCE • 32 FRAMES
        </div>
      </header>

      <main className="w-full">
        <ScrollSequence
          id="cinematic-hearth"
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
