"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenReservation: () => void;
}

export function Navbar({ onOpenReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open, plus handle Escape key
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isMobileMenuOpen]);

  const closeMenuAndScroll = useCallback((id: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
    // Allow drawer close animation / state flush before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0908]/95 backdrop-blur-md border-b border-[#2e2926]/70 py-3 sm:py-3.5 shadow-lg shadow-black/50"
          : "bg-gradient-to-b from-[#0a0908]/95 via-[#0a0908]/60 to-transparent py-4 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <a
          href="#top"
          className="group flex flex-col focus-visible:outline-2 focus-visible:outline-[#c59b6d] rounded-sm py-1"
          aria-label="Walkin & Dine Home"
        >
          <span className="font-serif text-lg xs:text-xl sm:text-2xl tracking-[0.14em] sm:tracking-[0.18em] text-[#f4efe6] group-hover:text-[#c59b6d] transition-colors uppercase font-medium">
            Walkin & Dine
          </span>
          <span className="text-[9px] xs:text-[10px] tracking-[0.25em] text-[#a8a29e] uppercase font-sans">
            Wood-Fired Kitchen
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-8 text-xs tracking-[0.16em] uppercase font-sans text-[#f4efe6]"
          aria-label="Main Navigation"
        >
          <a
            href="#chef-sequence"
            className="text-[#a8a29e] hover:text-[#f4efe6] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#c59b6d] rounded-sm"
          >
            The Sequence
          </a>
          <a
            href="#philosophy"
            className="text-[#a8a29e] hover:text-[#f4efe6] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#c59b6d] rounded-sm"
          >
            Philosophy
          </a>
          <a
            href="#offerings"
            className="text-[#a8a29e] hover:text-[#f4efe6] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#c59b6d] rounded-sm"
          >
            Offerings
          </a>
          <a
            href="#atmosphere"
            className="text-[#a8a29e] hover:text-[#f4efe6] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#c59b6d] rounded-sm"
          >
            Atmosphere
          </a>
          <a
            href="#visit"
            className="text-[#a8a29e] hover:text-[#f4efe6] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#c59b6d] rounded-sm"
          >
            Hours & Location
          </a>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-[#c59b6d] text-[#0a0908] hover:bg-[#d8b083] font-medium text-xs tracking-[0.14em] uppercase transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#c59b6d] cursor-pointer"
          >
            Reserve Table
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-2 text-[#f4efe6] hover:text-[#c59b6d] min-h-[44px] min-w-[44px] flex items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-[#c59b6d] cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="md:hidden fixed inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto bg-[#0a0908]/98 backdrop-blur-xl border-b border-[#2e2926] px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col text-sm tracking-[0.16em] uppercase">
            <button
              onClick={() => closeMenuAndScroll("chef-sequence")}
              className="text-left text-[#f4efe6] hover:text-[#c59b6d] active:text-[#c59b6d] py-3.5 min-h-[48px] flex items-center border-b border-[#2e2926]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
            >
              The Sequence
            </button>
            <button
              onClick={() => closeMenuAndScroll("philosophy")}
              className="text-left text-[#f4efe6] hover:text-[#c59b6d] active:text-[#c59b6d] py-3.5 min-h-[48px] flex items-center border-b border-[#2e2926]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
            >
              Philosophy
            </button>
            <button
              onClick={() => closeMenuAndScroll("offerings")}
              className="text-left text-[#f4efe6] hover:text-[#c59b6d] active:text-[#c59b6d] py-3.5 min-h-[48px] flex items-center border-b border-[#2e2926]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
            >
              Offerings
            </button>
            <button
              onClick={() => closeMenuAndScroll("atmosphere")}
              className="text-left text-[#f4efe6] hover:text-[#c59b6d] active:text-[#c59b6d] py-3.5 min-h-[48px] flex items-center border-b border-[#2e2926]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
            >
              Atmosphere
            </button>
            <button
              onClick={() => closeMenuAndScroll("visit")}
              className="text-left text-[#f4efe6] hover:text-[#c59b6d] active:text-[#c59b6d] py-3.5 min-h-[48px] flex items-center border-b border-[#2e2926]/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#c59b6d]"
            >
              Hours & Location
            </button>
            <div className="pt-5 mt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.body.style.overflow = "";
                  onOpenReservation();
                }}
                className="w-full py-3.5 bg-[#c59b6d] hover:bg-[#d8b083] text-[#0a0908] font-medium tracking-[0.14em] uppercase text-xs rounded-sm min-h-[48px] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#c59b6d] cursor-pointer"
              >
                Reserve Table
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
