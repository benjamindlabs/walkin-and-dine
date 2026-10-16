"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, Users, Check } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [partySize, setPartySize] = useState("2");
  const [date, setDate] = useState("2026-10-15");
  const [time, setTime] = useState("19:30");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-lg bg-[#141210] border border-[#2e2926] rounded-xl p-5 sm:p-8 shadow-2xl text-[#f4efe6] overflow-y-auto max-h-[88dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close reservation dialog"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-[#a8a29e] hover:text-[#f4efe6] hover:bg-[#1c1917] rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-5 sm:mb-6 pr-10">
              <span className="text-xs font-mono tracking-widest text-[#c59b6d] uppercase block mb-1">
                Direct Table Inquiry
              </span>
              <h2
                id="reservation-title"
                className="text-2xl sm:text-3xl font-serif text-[#f4efe6]"
              >
                Reserve Your Evening
              </h2>
              <p className="mt-1 text-xs text-[#a8a29e]">
                Walkin & Dine reservation service. Bar walk-ins are accommodated on a first-arrival basis.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="party-size" className="block text-xs font-medium text-[#a8a29e] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#c59b6d]" /> Guests
                    </span>
                  </label>
                  <select
                    id="party-size"
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="w-full bg-[#1c1917] border border-[#2e2926] rounded-md px-3 py-2 text-base sm:text-sm text-[#f4efe6] focus:border-[#c59b6d] focus:outline-none min-h-[44px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="res-date" className="block text-xs font-medium text-[#a8a29e] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#c59b6d]" /> Date
                    </span>
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1c1917] border border-[#2e2926] rounded-md px-3 py-2 text-base sm:text-sm text-[#f4efe6] focus:border-[#c59b6d] focus:outline-none min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="res-time" className="block text-xs font-medium text-[#a8a29e] mb-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#c59b6d]" /> Time
                    </span>
                  </label>
                  <select
                    id="res-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#1c1917] border border-[#2e2926] rounded-md px-3 py-2 text-base sm:text-sm text-[#f4efe6] focus:border-[#c59b6d] focus:outline-none min-h-[44px]"
                  >
                    {["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="guest-name" className="block text-xs font-medium text-[#a8a29e] mb-1">
                  Full Name
                </label>
                <input
                  id="guest-name"
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1c1917] border border-[#2e2926] rounded-md px-3 py-2 text-base sm:text-sm text-[#f4efe6] focus:border-[#c59b6d] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="guest-email" className="block text-xs font-medium text-[#a8a29e] mb-1">
                  Email Address
                </label>
                <input
                  id="guest-email"
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1c1917] border border-[#2e2926] rounded-md px-3 py-2 text-base sm:text-sm text-[#f4efe6] focus:border-[#c59b6d] focus:outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="guest-notes" className="block text-xs font-medium text-[#a8a29e] mb-1">
                  Dietary Preferences or Special Requests
                </label>
                <textarea
                  id="guest-notes"
                  rows={2}
                  placeholder="Special celebrations, seating preferences, allergies..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#1c1917] border border-[#2e2926] rounded-md px-3 py-2 text-base sm:text-sm text-[#f4efe6] focus:border-[#c59b6d] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#c59b6d] hover:bg-[#d8b083] text-[#0a0908] font-medium py-3.5 px-4 rounded-md transition-colors focus:ring-2 focus:ring-[#c59b6d] focus:ring-offset-2 focus:ring-offset-[#141210] min-h-[48px] flex items-center justify-center font-sans tracking-wide text-sm cursor-pointer"
                >
                  Confirm Table Request
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#c59b6d]/20 border border-[#c59b6d] flex items-center justify-center mx-auto text-[#c59b6d]">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif text-[#f4efe6]">Request Received</h3>
            <p className="text-sm text-[#a8a29e] max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-[#f4efe6] font-medium">{name}</span>. We have received your table request for <span className="text-[#f4efe6]">{partySize} guests</span> on <span className="text-[#f4efe6]">{date} at {time}</span>. A confirmation dispatch has been sent to our concierge desk.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="bg-[#1c1917] border border-[#2e2926] text-[#f4efe6] hover:bg-[#2e2926] px-6 py-2.5 rounded-md text-sm font-medium transition-colors min-h-[44px]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
