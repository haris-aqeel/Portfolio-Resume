"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ArchitectureDiagram, ArchNodeData } from "./arch-data";
import type { Node } from "@xyflow/react";
import { C } from "./arch-data/types";
import { ChevronRight } from "lucide-react";

/* ── Logo from Simple Icons CDN ── */

function Logo({ slug, color, size = 24 }: { slug: string; color?: string; size?: number }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color || "ffffff"}`}
      alt=""
      width={size}
      height={size}
      className="inline-block"
      loading="lazy"
    />
  );
}

/* ── Layer classification ── */

const layerMeta: Record<string, { name: string; dotColor: string }> = {
  [C.cyan]:   { name: "Sources",       dotColor: "#4285F4" },
  [C.indigo]: { name: "Processing",    dotColor: "#4285F4" },
  [C.gray]:   { name: "Raw / Staging", dotColor: "#9AA0A6" },
  [C.purple]: { name: "Storage",       dotColor: "#AB47BC" },
  [C.bronze]: { name: "Bronze",        dotColor: "#FF7043" },
  [C.silver]: { name: "Silver",        dotColor: "#9AA0A6" },
  [C.gold]:   { name: "Gold / AI",     dotColor: "#FFA000" },
  [C.teal]:   { name: "Semantic",      dotColor: "#4285F4" },
  [C.amber]:  { name: "Governance",    dotColor: "#FFA000" },
  [C.red]:    { name: "Hot Path",      dotColor: "#EA4335" },
  [C.blue]:   { name: "Archive",       dotColor: "#4285F4" },
  [C.green]:  { name: "Consumption",   dotColor: "#34A853" },
};

/* ── Group nodes into layers by Y position ── */

interface LayerGroup {
  y: number;
  color: string;
  layerName: string;
  nodes: Node<ArchNodeData>[];
}

function groupNodesByLayer(diagram: ArchitectureDiagram): LayerGroup[] {
  const yBuckets = new Map<number, Node<ArchNodeData>[]>();

  for (const node of diagram.nodes) {
    const y = node.position.y;
    let bucketKey = y;
    for (const existing of yBuckets.keys()) {
      if (Math.abs(existing - y) < 80) {
        bucketKey = existing;
        break;
      }
    }
    if (!yBuckets.has(bucketKey)) yBuckets.set(bucketKey, []);
    yBuckets.get(bucketKey)!.push(node);
  }

  const sorted = [...yBuckets.entries()].sort((a, b) => a[0] - b[0]);

  return sorted.map(([y, nodes]) => {
    const colorCounts = new Map<string, number>();
    for (const n of nodes) {
      colorCounts.set(n.data.color, (colorCounts.get(n.data.color) || 0) + 1);
    }
    let dominantColor = nodes[0].data.color;
    let maxCount = 0;
    for (const [c, count] of colorCounts) {
      if (count > maxCount) { dominantColor = c; maxCount = count; }
    }
    const meta = layerMeta[dominantColor] || { name: "Layer", dotColor: "#9AA0A6" };
    return { y, color: dominantColor, layerName: meta.name, nodes };
  });
}

/* ── Flowing SVG connector between rows ── */

function FlowConnector({ fromColor, toColor, nodeCount }: { fromColor: string; toColor: string; nodeCount: number }) {
  const w = nodeCount > 1 ? 200 : 60;
  return (
    <div className="flex justify-center py-1 overflow-visible">
      <svg width={w} height="40" viewBox={`0 0 ${w} 40`} fill="none" className="overflow-visible">
        <defs>
          <linearGradient id={`fg-${fromColor.slice(1)}-${toColor.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* Center line */}
        <line x1={w / 2} y1="0" x2={w / 2} y2="40" stroke={`url(#fg-${fromColor.slice(1)}-${toColor.slice(1)})`} strokeWidth="2" />
        {/* Animated pulse dot */}
        <circle r="3" fill={toColor}>
          <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${w / 2},0 L${w / 2},40`} />
        </circle>
        {/* Fan-out lines if multiple targets */}
        {nodeCount > 2 && (
          <>
            <line x1={w / 2} y1="20" x2="10" y2="40" stroke={toColor} strokeWidth="1" strokeOpacity="0.3" />
            <line x1={w / 2} y1="20" x2={w - 10} y2="40" stroke={toColor} strokeWidth="1" strokeOpacity="0.3" />
          </>
        )}
      </svg>
    </div>
  );
}

/* ── Single Node Card — Firebase-style with large logo ── */

function NodeCard({ node, index, isWide }: { node: Node<ArchNodeData>; index: number; isWide?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const d = node.data;
  const isDashed = d.dashed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      onClick={() => setExpanded(!expanded)}
      className={`relative group cursor-pointer ${isWide ? "col-span-full" : ""}`}
    >
      <div
        className={`relative rounded-2xl border p-5 transition-all duration-300 ${
          isDashed ? "border-dashed" : ""
        } ${expanded ? "shadow-xl" : "hover:shadow-lg"}`}
        style={{
          background: `linear-gradient(145deg, ${d.color}0D 0%, ${d.color}04 100%)`,
          borderColor: expanded ? `${d.color}50` : `${d.color}20`,
          boxShadow: d.glow ? `0 0 40px ${d.color}18, inset 0 1px 0 ${d.color}12` : expanded ? `0 8px 32px ${d.color}15` : undefined,
        }}
      >
        {/* Badge */}
        {d.badge && (
          <div
            className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold"
            style={{
              backgroundColor: d.badge === "production" ? "#FFA00018" : "#4285F418",
              color: d.badge === "production" ? "#FFA000" : "#4285F4",
              border: `1px solid ${d.badge === "production" ? "#FFA000" : "#4285F4"}30`,
            }}
          >
            {d.badge === "production" ? "\u26A1 Prod" : "\uD83D\uDCD0 Arch"}
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Logo container */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${d.color}20, ${d.color}08)`,
              border: `1px solid ${d.color}20`,
            }}
          >
            {d.logo ? (
              <Logo slug={d.logo} color={d.logoColor} size={24} />
            ) : (
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: d.color }} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-[14px] font-semibold text-white leading-tight">{d.label}</h4>
              <ChevronRight
                size={14}
                className={`text-[#6B6B6F] transition-transform duration-200 flex-shrink-0 ${expanded ? "rotate-90" : "group-hover:translate-x-0.5"}`}
              />
            </div>

            {d.sublabel && (
              <p className="text-[11px] text-[#6B6B6F] mt-1.5 font-[family-name:var(--font-jetbrains)] leading-relaxed">
                {d.sublabel}
              </p>
            )}

            {d.items && d.items.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {d.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium font-[family-name:var(--font-jetbrains)]"
                    style={{ backgroundColor: `${d.color}15`, color: `${d.color}cc` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p
                    className="text-[13px] text-[#9AA0A6] leading-relaxed mt-3 pt-3 border-t"
                    style={{ borderColor: `${d.color}18` }}
                  >
                    {d.tooltip}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Hero illustration: compact visual of the full pipeline ── */

function PipelineHero({ layers }: { layers: LayerGroup[] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 mb-6" style={{ background: "linear-gradient(160deg, #292929 0%, #1B1B1F 40%, #1B1B1F 100%)" }}>
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(ellipse,rgba(255,160,0,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[radial-gradient(ellipse,rgba(66,133,244,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-1">
        {layers.map((layer, layerIdx) => {
          const meta = layerMeta[layer.color] || { name: "Layer", dotColor: "#9AA0A6" };
          return (
            <div key={layerIdx} className="w-full">
              {/* Row of compact service chips */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {layer.nodes.map((node, ni) => {
                  const d = node.data;
                  const isWide = node.type === "wide";
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: layerIdx * 0.08 + ni * 0.04 }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 hover:scale-105 ${isWide ? "px-5" : ""}`}
                      style={{
                        background: `linear-gradient(135deg, ${d.color}14, ${d.color}06)`,
                        borderColor: `${d.color}25`,
                      }}
                      title={d.label}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${d.color}18` }}
                      >
                        {d.logo ? (
                          <Logo slug={d.logo} color={d.logoColor} size={16} />
                        ) : (
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                        )}
                      </div>
                      <span className="text-[11px] font-medium text-white/80 whitespace-nowrap max-w-[140px] truncate">
                        {d.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Connector to next row */}
              {layerIdx < layers.length - 1 && (
                <FlowConnector
                  fromColor={meta.dotColor}
                  toColor={(layerMeta[layers[layerIdx + 1].color] || { dotColor: "#9AA0A6" }).dotColor}
                  nodeCount={layers[layerIdx + 1].nodes.length}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-white/[0.06]">
        {[
          { color: "#4285F4", label: "Source / Processing" },
          { color: "#AB47BC", label: "Storage" },
          { color: "#FFA000", label: "Gold / Governance" },
          { color: "#34A853", label: "Consumption" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-[11px] text-[#6B6B6F]">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Pipeline View ── */

export default function ArchitecturePipeline({ diagram }: { diagram: ArchitectureDiagram }) {
  const layers = groupNodesByLayer(diagram);

  return (
    <div className="space-y-0">
      {/* Hero illustration */}
      <PipelineHero layers={layers} />

      {/* Detailed cards by layer */}
      <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-[#1B1B1F] p-6 sm:p-8">
        {layers.map((layer, layerIdx) => {
          const meta = layerMeta[layer.color] || { name: "Layer", dotColor: "#9AA0A6" };

          return (
            <div key={layerIdx}>
              {/* Layer header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: layerIdx * 0.08 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: meta.dotColor }} />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-jetbrains)]"
                  style={{ color: `${meta.dotColor}99` }}
                >
                  {meta.name}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${meta.dotColor}12` }} />
              </motion.div>

              {/* Node grid */}
              <div className={`grid gap-3 mb-2 ${
                layer.nodes.length === 1 ? "grid-cols-1"
                  : layer.nodes.length === 2 ? "grid-cols-1 sm:grid-cols-2"
                  : layer.nodes.length === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}>
                {layer.nodes.map((node, nodeIdx) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    index={layerIdx * 3 + nodeIdx}
                    isWide={node.type === "wide"}
                  />
                ))}
              </div>

              {/* Connector */}
              {layerIdx < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <svg width="60" height="32" viewBox="0 0 60 32" fill="none">
                    <line x1="30" y1="0" x2="30" y2="32" stroke={`${(layerMeta[layers[layerIdx + 1].color] || { dotColor: "#9AA0A6" }).dotColor}40`} strokeWidth="1.5" />
                    <circle cx="30" cy="16" r="2.5" fill={(layerMeta[layers[layerIdx + 1].color] || { dotColor: "#9AA0A6" }).dotColor} fillOpacity="0.5">
                      <animate attributeName="cy" values="4;28;4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
