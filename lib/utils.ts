import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Silky smooth scroll to top with distance-aware duration */
export function smoothScrollToTop() {
  const start = window.scrollY;
  if (start === 0) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, 0);
    return;
  }

  const duration = Math.min(Math.max(start * 0.6, 500), 1400);
  const startTime = performance.now();

  const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

  const tick = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start * (1 - easeOutQuint(progress)));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
