"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { architectureLayers } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ArchitectureSection() {
  const { t, locale } = useLanguage();
  const [activeId, setActiveId] = useState<string>(architectureLayers[0].id);
  const [scale, setScale] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const active = architectureLayers.find((l) => l.id === activeId)!;
  const nodeMap = Object.fromEntries(active.nodes.map((n) => [n.id, n]));

  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.2, 1.6)), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(s - 0.2, 0.6)), []);
  const reset = useCallback(() => setScale(1), []);

  return (
    <section id="architecture" className="section-padding section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={t.architecture.label}
          title={t.architecture.title}
          subtitle={t.architecture.subtitle}
        />

        <FadeIn>
          <div className="mb-8 flex flex-wrap gap-2">
            {architectureLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveId(layer.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 md:text-sm",
                  activeId === layer.id
                    ? "bg-foreground text-background"
                    : "glass text-muted hover:text-foreground"
                )}
              >
                {locale === "zh" ? layer.label.zh : layer.label.en}
              </button>
            ))}
          </div>
        </FadeIn>

        <GlassPanel className="relative overflow-hidden p-6 md:p-10">
          <div className="absolute top-4 right-4 z-10 flex gap-1">
            <button
              onClick={zoomOut}
              className="glass flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
              aria-label={t.architecture.zoomOut}
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={reset}
              className="glass flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
              aria-label={t.architecture.reset}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={zoomIn}
              className="glass flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
              aria-label={t.architecture.zoomIn}
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <motion.div
            key={activeId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center pt-8"
            style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
          >
            <svg
              viewBox="0 0 100 100"
              className="h-auto w-full max-w-lg"
              role="img"
              aria-label={active.label.en}
            >
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {active.edges.map(([from, to], i) => {
                const a = nodeMap[from];
                const b = nodeMap[to];
                if (!a || !b) return null;
                const highlighted =
                  hoveredNode === from || hoveredNode === to;
                return (
                  <motion.line
                    key={`${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="url(#edgeGrad)"
                    strokeWidth={highlighted ? 0.6 : 0.35}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="text-foreground"
                  />
                );
              })}

              {active.nodes.map((node, i) => {
                const isHovered = hoveredNode === node.id;
                return (
                  <g
                    key={node.id}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <motion.rect
                      x={node.x - 14}
                      y={node.y - 5}
                      width={28}
                      height={10}
                      rx={2}
                      fill="currentColor"
                      fillOpacity={isHovered ? 0.12 : 0.05}
                      stroke="currentColor"
                      strokeOpacity={isHovered ? 0.5 : 0.2}
                      strokeWidth={0.3}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: isHovered ? 1.08 : 1 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="text-foreground"
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                    <motion.text
                      x={node.x}
                      y={node.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={3.2}
                      fill="currentColor"
                      fillOpacity={isHovered ? 1 : 0.75}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 + 0.2 }}
                      className="pointer-events-none select-none font-medium"
                    >
                      {node.label}
                    </motion.text>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </GlassPanel>
      </div>
    </section>
  );
}
