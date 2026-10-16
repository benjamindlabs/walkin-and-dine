import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isScrollTriggerRegistered = false;

export function initGSAP() {
  if (typeof window !== "undefined" && !isScrollTriggerRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isScrollTriggerRegistered = true;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateFadeUp(
  target: string | Element | Element[],
  vars: gsap.TweenVars = {}
) {
  if (typeof window === "undefined") return;
  initGSAP();

  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  return gsap.fromTo(
    target,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      ...vars,
    }
  );
}

export { gsap, ScrollTrigger };
