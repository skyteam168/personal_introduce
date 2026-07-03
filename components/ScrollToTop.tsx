"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { smoothScrollToTop, cn } from "@/lib/utils";

const SHOW_THRESHOLD = 400;
const RING_RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function ScrollToTop() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [visible, setVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });
  const strokeDashoffset = useTransform(
    progress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  );

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(() => {
    if (scrolling) return;
    setScrolling(true);
    smoothScrollToTop();
    window.setTimeout(() => setScrolling(false), 1500);
  }, [scrolling]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          disabled={scrolling}
          aria-label={t.scrollToTop.label}
          className={cn(
            "fixed right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full",
            "border border-border/60 bg-background/80 text-foreground shadow-lg backdrop-blur-xl",
            "transition-[box-shadow,border-color] duration-300",
            "hover:border-foreground/25 hover:shadow-xl",
            "disabled:pointer-events-none",
            isHome ? "bottom-[5.25rem] sm:bottom-[5.5rem]" : "bottom-6"
          )}
        >
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle
              cx="22"
              cy="22"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-border/30"
            />
            <motion.circle
              cx="22"
              cy="22"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-foreground/60"
              style={{
                strokeDasharray: CIRCUMFERENCE,
                strokeDashoffset,
              }}
            />
          </svg>

          <motion.div
            animate={scrolling ? { y: [0, -4, 0] } : {}}
            transition={{
              duration: 0.5,
              repeat: scrolling ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <ChevronUp className="relative h-5 w-5" strokeWidth={2.25} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
