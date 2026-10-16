"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import { Flame, ArrowRight } from "lucide-react";
import { initGSAP, prefersReducedMotion, gsap, ScrollTrigger } from "@/lib/animations";

export interface SequenceMilestone {
  progress: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  position?: "top-left" | "top-right" | "top-center" | "center";
  cta?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

export interface ScrollSequenceProps {
  /** Optional custom list of frame URLs */
  frameUrls?: string[];
  /** Function to generate frame URL from 1-based frame index */
  filenamePattern?: (index: number) => string;
  /** Total number of frames in sequence */
  frameCount?: number;
  /** Container scroll height for desktop (e.g. "380vh") */
  scrollDuration?: string;
  /** Container scroll height for mobile (e.g. "230vh") */
  mobileScrollDuration?: string;
  /** Fit mode: "cover" preserves full-bleed viewport; "contain" fits within viewport */
  fit?: "cover" | "contain";
  /** Canvas background fill color */
  backgroundColor?: string;
  /** Static fallback image for reduced motion or SSR */
  fallbackImage?: string;
  /** Narrative text milestones coordinated with scroll progress */
  milestones?: SequenceMilestone[];
  /** Accessibility section label */
  ariaLabel?: string;
  /** HTML element id */
  id?: string;
  /** Primary action callback (e.g. opening reservation modal) */
  onOpenReservation?: () => void;
  /** Optional custom class name */
  className?: string;
}

const DEFAULT_FRAME_COUNT = 32;
const DEFAULT_FILENAME_PATTERN = (index: number) =>
  `/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const DEFAULT_MILESTONES: SequenceMilestone[] = [
  {
    progress: 0.08,
    eyebrow: "01 • THE WOOD-FIRED HEARTH",
    title: "Embers, Smoke & Hardwood Heat",
    subtitle:
      "Every dish begins over white-hot oak and cherry embers, where raw elemental heat transforms aged cuts.",
    position: "top-left",
  },
  {
    progress: 0.38,
    eyebrow: "02 • THE ART OF BASTING",
    title: "Controlled Flame & Precision",
    subtitle:
      "Lifting the pan draws radiant hearth warmth, infusing every fiber with brown butter, thyme, and roasted garlic.",
    position: "top-left",
  },
  {
    progress: 0.68,
    eyebrow: "03 • CARAMELIZED PERFECTION",
    title: "The Sizzle of the Crust",
    subtitle:
      "A deep mahogany sear formed at eight hundred degrees, locking in rich juices and delicate smoke.",
    position: "top-right",
  },
  {
    progress: 0.90,
    eyebrow: "04 • FROM HEARTH TO TABLE",
    title: "Taste the Flame",
    subtitle:
      "Served piping hot straight from the embers. Savor our wood-fired heritage with the Walkin & Dine seasonal tasting menu.",
    position: "top-center",
    cta: {
      label: "Reserve Your Table",
    },
  },
];

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

export function ScrollSequence({
  frameUrls,
  filenamePattern = DEFAULT_FILENAME_PATTERN,
  frameCount = DEFAULT_FRAME_COUNT,
  scrollDuration = "380vh",
  mobileScrollDuration = "230vh",
  fit = "cover",
  backgroundColor = "#0a0908",
  fallbackImage = "/ezgif-frame-001.jpg",
  milestones,
  ariaLabel = "Cinematic Walkin & Dine Culinary Sequence",
  id = "chef-sequence",
  onOpenReservation,
  className = "",
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameDisplayRef = useRef<HTMLSpanElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  // Track prefers-reduced-motion via standard external store hook
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => prefersReducedMotion(),
    () => false
  );

  const [loadProgress, setLoadProgress] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // Array of image objects cached in memory
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRenderedIndexRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(0);

  // Compute final URLs
  const urls = useMemo(() => {
    if (frameUrls && frameUrls.length > 0) return frameUrls;
    const list: string[] = [];
    for (let i = 1; i <= frameCount; i++) {
      list.push(filenamePattern(i));
    }
    return list;
  }, [frameUrls, frameCount, filenamePattern]);

  const totalFrames = urls.length;
  const activeMilestones = milestones && milestones.length > 0 ? milestones : DEFAULT_MILESTONES;

  // Responsive screen detection for scroll duration & layout adaptation
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Find the closest available loaded image to avoid any black frame
  const getNearestLoadedImage = useCallback(
    (index: number): HTMLImageElement | null => {
      const arr = imagesRef.current;
      if (!arr || arr.length === 0) return null;

      const direct = arr[index];
      if (direct && (direct.naturalWidth > 0 || direct.width > 0)) {
        return direct;
      }
      for (let delta = 1; delta < totalFrames; delta++) {
        const prev = index - delta;
        if (prev >= 0) {
          const img = arr[prev];
          if (img && (img.naturalWidth > 0 || img.width > 0)) return img;
        }
        const next = index + delta;
        if (next < totalFrames) {
          const img = arr[next];
          if (img && (img.naturalWidth > 0 || img.width > 0)) return img;
        }
      }
      return null;
    },
    [totalFrames]
  );

  // Canvas drawing function with art-directed portrait & landscape compositions
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = getNearestLoadedImage(index);
      if (!img) return;

      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const rect = canvas.getBoundingClientRect();
      const clientW =
        rect.width ||
        (canvas.parentElement ? canvas.parentElement.clientWidth : 0) ||
        (typeof window !== "undefined" ? window.innerWidth : 1280);
      const clientH =
        rect.height ||
        (canvas.parentElement ? canvas.parentElement.clientHeight : 0) ||
        (typeof window !== "undefined" ? window.innerHeight : 800);

      const targetWidth = Math.round(clientW * dpr);
      const targetHeight = Math.round(clientH * dpr);

      if (targetWidth === 0 || targetHeight === 0) return;

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      // Base fill
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, cw, ch);

      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;

      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      const isPortrait = canvasRatio < 1.05;

      if (!isPortrait) {
        // Desktop / Landscape: Clean cover fill
        if (fit === "contain") {
          if (canvasRatio > imgRatio) {
            drawH = ch;
            drawW = ch * imgRatio;
            drawX = (cw - drawW) / 2;
            drawY = 0;
          } else {
            drawW = cw;
            drawH = cw / imgRatio;
            drawX = 0;
            drawY = (ch - drawH) / 2;
          }
        } else {
          // Standard cover for wide viewports
          if (canvasRatio > imgRatio) {
            drawW = cw;
            drawH = cw / imgRatio;
            drawX = 0;
            drawY = (ch - drawH) / 2;
          } else {
            drawH = ch;
            drawW = ch * imgRatio;
            drawX = (cw - drawW) / 2;
            drawY = 0;
          }
        }
      } else {
        // Mobile Portrait: Art-directed composition
        // 1.16x width scaling keeps chef, fire, pan, and steak in view
        const scale = 1.16;
        drawW = cw * scale;
        drawH = drawW / imgRatio;

        // Dynamic focal point tracking across sequence:
        // Frames 0-8: Chef tending fire & lifting pan (focalX ~ 0.58)
        // Frames 9-20: Camera descent into pan (focalX transitions smoothly to 0.50)
        // Frames 21-31: Macro steak close-up (focalX 0.50 exact center)
        let focalX = 0.50;
        if (index <= 8) {
          focalX = 0.58;
        } else if (index <= 20) {
          const t = (index - 8) / 12;
          focalX = 0.58 - t * 0.08;
        } else {
          focalX = 0.50;
        }

        drawX = cw * 0.5 - drawW * focalX;
        // Clamp so image does not show blank horizontal gaps
        drawX = Math.min(0, Math.max(cw - drawW, drawX));
        // Vertically center in viewport
        drawY = (ch - drawH) / 2;
      }

      ctx.drawImage(
        img,
        Math.round(drawX),
        Math.round(drawY),
        Math.round(drawW),
        Math.round(drawH)
      );

      currentRenderedIndexRef.current = index;
    },
    [fit, backgroundColor, getNearestLoadedImage]
  );

  // Request animation frame helper to avoid duplicate draws
  const requestFrameRender = useCallback(
    (index: number) => {
      targetFrameRef.current = index;
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        drawFrame(targetFrameRef.current);
      });
    },
    [drawFrame]
  );

  // Update milestone DOM elements based on scroll progress
  const updateMilestones = useCallback(
    (progress: number) => {
      const len = activeMilestones.length;

      activeMilestones.forEach((m, idx) => {
        const el = milestoneRefs.current[idx];
        if (!el) return;

        let opacity = 0;

        if (idx === 0) {
          // First milestone: stays fully visible at top (0.0 to 0.18), then fades out
          if (progress <= 0.18) {
            opacity = 1;
          } else {
            opacity = Math.max(0, 1 - (progress - 0.18) / 0.12);
          }
        } else if (idx === len - 1) {
          // Final milestone: fades in around 0.84 and STAYS 100% visible to the very end
          if (progress >= 0.84) {
            opacity = 1;
          } else {
            opacity = Math.max(0, 1 - (0.84 - progress) / 0.12);
          }
        } else {
          // Middle milestones: smoothly fade in, hold, and fade out
          const windowSize = 0.14;
          const dist = Math.abs(progress - m.progress);
          opacity = Math.max(0, Math.min(1, 1 - dist / windowSize));
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
        el.style.transform = `translate3d(0, ${(1 - opacity) * 12}px, 0)`;
      });

      if (scrollPromptRef.current) {
        scrollPromptRef.current.style.opacity = progress <= 0.08 ? "1" : "0";
      }
    },
    [activeMilestones]
  );

  // Initial client setup and preloading
  useEffect(() => {
    initGSAP();

    if (isReducedMotion) return;

    // Initialize image cache array
    const imgs = new Array<HTMLImageElement>(totalFrames);
    imagesRef.current = imgs;

    const loadedIndices = new Set<number>();
    let loadedCounter = 0;

    const onFrameReady = (frameIdx: number) => {
      if (!loadedIndices.has(frameIdx)) {
        loadedIndices.add(frameIdx);
        loadedCounter++;
        setLoadProgress(Math.round((loadedCounter / totalFrames) * 100));
      }
      // Re-render current frame with newly available image
      requestFrameRender(targetFrameRef.current);
    };

    urls.forEach((url, i) => {
      const img = new window.Image();
      imgs[i] = img;

      img.onload = () => onFrameReady(i);
      img.onerror = () => onFrameReady(i);

      // Set src AFTER event listeners are attached
      img.src = url;

      // Handle synchronously cached images
      if (img.complete && (img.naturalWidth > 0 || img.width > 0)) {
        onFrameReady(i);
      }
    });

    // Window resize listener
    const handleResize = () => {
      requestFrameRender(targetFrameRef.current);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [totalFrames, urls, isReducedMotion, requestFrameRender]);

  // GSAP ScrollTrigger attachment
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return;

    initGSAP();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.round(p * (totalFrames - 1)))
          );

          if (frameDisplayRef.current) {
            frameDisplayRef.current.textContent = `${String(frameIndex + 1).padStart(2, "0")} / ${String(totalFrames).padStart(2, "0")}`;
          }

          requestFrameRender(frameIndex);
          updateMilestones(p);
        },
      });

      requestFrameRender(0);
      updateMilestones(0);
    }, containerRef);

    // Refresh ScrollTrigger to calculate accurate start/end coordinates relative to pinned Hero above
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      requestFrameRender(targetFrameRef.current);
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isReducedMotion, totalFrames, isMobileScreen, requestFrameRender, updateMilestones]);

  // Reduced motion alternative layout
  if (isReducedMotion) {
    return (
      <section
        id={id}
        className={`py-16 sm:py-24 md:py-32 px-5 sm:px-12 md:px-20 max-w-7xl mx-auto border-t border-[#2e2926]/40 ${className}`}
        aria-label={ariaLabel}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#c59b6d] uppercase mb-4">
              <Flame className="w-4 h-4" />
              <span>THE WOOD-FIRED HEARTH</span>
            </div>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#f4efe6] tracking-tight leading-tight mb-4 sm:mb-6">
              Embers, Hardwood Smoke & The Craft of Fire
            </h2>
            <p className="text-[#a8a29e] text-sm sm:text-base leading-relaxed mb-6 font-sans">
              Watch our hearth masters coax mahogany crusts and delicate wood aromas from 800-degree embers.
              Every cut is aged in-house, carved by hand, and finished with brown butter, thyme, and roasted garlic.
            </p>
            <div className="space-y-3 sm:space-y-4 mb-8 text-xs sm:text-sm text-[#f4efe6]/80 font-sans">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c59b6d] shrink-0" />
                <span>Dry-aged heritage beef finished over glowing cherry and oak</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c59b6d] shrink-0" />
                <span>Continuous pan-basting for caramelized crust and tender center</span>
              </div>
            </div>
            {onOpenReservation && (
              <button
                type="button"
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 bg-[#c59b6d] hover:bg-[#d8b083] text-[#0a0908] font-sans font-medium text-xs tracking-[0.16em] uppercase rounded-sm transition-all focus-visible:outline-2 focus-visible:outline-[#c59b6d] cursor-pointer min-h-[44px]"
              >
                <span>Reserve Your Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative aspect-video rounded-sm overflow-hidden border border-[#2e2926] bg-[#141210]">
            <Image
              src={fallbackImage}
              alt="Close-up of caramelized ribeye steak finished with herbs and garlic over hearth coals"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  const currentDuration = isMobileScreen ? mobileScrollDuration : scrollDuration;

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative w-full bg-[#0a0908] text-[#f4efe6] ${className}`}
      aria-label={ariaLabel}
      style={{
        minHeight: currentDuration,
        height: currentDuration,
      }}
    >
      {/* Sticky full-viewport frame player */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-[100dvh] min-h-[560px] overflow-hidden flex items-center justify-center bg-[#0a0908] z-0"
      >
        {/* HTML5 Canvas for ultra-smooth scrubbed frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0"
          style={{
            touchAction: "pan-y",
          }}
        />

        {/* Cinematic Vignettes: Seamless blend with dark background */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 md:h-44 bg-gradient-to-b from-[#0a0908] via-[#0a0908]/75 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 md:h-44 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/75 to-transparent pointer-events-none z-10" />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 38%, rgba(10,9,8,0.72) 100%)",
          }}
        />

        {/* Loading status (discreet, minimalist indicator) */}
        {loadProgress < 100 && (
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#141210]/85 backdrop-blur-sm border border-[#2e2926]/70 text-[10px] sm:text-[11px] font-mono text-[#a8a29e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d] animate-pulse" />
            <span>SEQUENCE {loadProgress}%</span>
          </div>
        )}

        {/* Frame index telemetry indicator for precision testing */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141210]/75 backdrop-blur-sm border border-[#2e2926]/60 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#a8a29e]">
          <span className="text-[#c59b6d]">FRAME</span>
          <span ref={frameDisplayRef}>01 / {String(totalFrames).padStart(2, "0")}</span>
        </div>

        {/* Narrative Milestones Overlay Choreography */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-12 md:px-20">
            {activeMilestones.map((m, idx) => {
              const pos = m.position || "top-left";
              const isCenter = pos === "top-center" || pos === "center";
              const isRight = pos === "top-right";

              // Responsive positioning: on phones (< 640px), keep card at top within reach but clear of video
              let posClasses =
                "top-14 sm:top-20 md:top-24 left-4 sm:left-12 md:left-20 max-w-sm sm:max-w-lg text-left";
              if (isRight) {
                posClasses =
                  "top-14 sm:top-20 md:top-24 right-4 sm:right-12 md:right-20 max-w-sm sm:max-w-lg text-left sm:text-right";
              } else if (isCenter) {
                posClasses =
                  "top-14 sm:top-20 md:top-24 inset-x-4 mx-auto max-w-md sm:max-w-xl text-center px-2";
              }

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    milestoneRefs.current[idx] = el;
                  }}
                  className={`absolute transition-all duration-300 pointer-events-none w-full ${posClasses}`}
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                    transform: idx === 0 ? "translate3d(0, 0, 0)" : "translate3d(0, 12px, 0)",
                  }}
                >
                  <div
                    className={`inline-block p-4 sm:p-7 md:p-8 rounded-sm bg-[#0a0908]/94 backdrop-blur-md border border-[#2e2926] shadow-[0_8px_32px_rgba(0,0,0,0.85)] pointer-events-auto ${
                      isCenter ? "mx-auto" : ""
                    }`}
                  >
                    {m.eyebrow && (
                      <div
                        className={`flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#c59b6d] uppercase mb-2 sm:mb-3 ${
                          isCenter
                            ? "justify-center"
                            : isRight
                            ? "justify-start sm:justify-end"
                            : "justify-start"
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5 text-[#c59b6d]" />
                        <span>{m.eyebrow}</span>
                      </div>
                    )}

                    <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-[#f4efe6] tracking-tight leading-snug mb-2 sm:mb-3">
                      {m.title}
                    </h3>

                    {m.subtitle && (
                      <p className="text-[#a8a29e] text-xs sm:text-sm md:text-base leading-relaxed font-sans mb-4 sm:mb-5">
                        {m.subtitle}
                      </p>
                    )}

                    {m.cta && (
                      <div
                        className={`pt-1 flex ${
                          isCenter
                            ? "justify-center"
                            : isRight
                            ? "justify-start sm:justify-end"
                            : "justify-start"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (m.cta?.onClick) {
                              m.cta.onClick();
                            } else if (onOpenReservation) {
                              onOpenReservation();
                            }
                          }}
                          className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#c59b6d] hover:bg-[#d8b083] text-[#0a0908] font-sans font-medium text-xs tracking-[0.16em] uppercase rounded-sm transition-all focus-visible:outline-2 focus-visible:outline-[#c59b6d] shadow-lg cursor-pointer min-h-[44px]"
                        >
                          <span>{m.cta.label}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Prompt at Sequence Start */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-8 sm:bottom-10 inset-x-0 mx-auto flex flex-col items-center justify-center gap-2 pointer-events-none transition-opacity duration-300 z-20"
        >
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#a8a29e] uppercase">
            Scroll to Witness the Sequence
          </span>
          <div className="w-4 h-7 border border-[#a8a29e]/40 rounded-full flex items-start justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-[#c59b6d] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
