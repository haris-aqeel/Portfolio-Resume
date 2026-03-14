"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ArchitectureDiagram, ArchNodeData } from "./arch-data";
import type { Node } from "@xyflow/react";
import { C } from "./arch-data/types";
import { ChevronDown, ChevronRight } from "lucide-react";

/* ── Layer classification based on node color ── */

const layerMeta: Record<string, { name: string; gradient: string; dotColor: string }> = {
  [C.cyan]:   { name: "Sources",      gradient: "from-[#4285F4]/10 to-transparent", dotColor: "#4285F4" },
  [C.indigo]: { name: "Processing",   gradient: "from-[#4285F4]/10 to-transparent", dotColor: "#4285F4" },
  [C.gray]:   { name: "Raw / Staging", gradient: "from-[#9AA0A6]/10 to-transparent", dotColor: "#9AA0A6" },
  [C.purple]: { name: "Storage",      gradient: "from-[#AB47BC]/10 to-transparent", dotColor: "#AB47BC" },
  [C.bronze]: { name: "Bronze",       gradient: "from-[#FF7043]/10 to-transparent", dotColor: "#FF7043" },
  [C.silver]: { name: "Silver",       gradient: "from-[#9AA0A6]/10 to-transparent", dotColor: "#9AA0A6" },
  [C.gold]:   { name: "Gold / AI",    gradient: "from-[#FFA000]/10 to-transparent", dotColor: "#FFA000" },
  [C.teal]:   { name: "Semantic",     gradient: "from-[#4285F4]/10 to-transparent", dotColor: "#4285F4" },
  [C.amber]:  { name: "Governance",   gradient: "from-[#FFA000]/10 to-transparent", dotColor: "#FFA000" },
  [C.red]:    { name: "Hot Path",     gradient: "from-[#EA4335]/10 to-transparent", dotColor: "#EA4335" },
  [C.blue]:   { name: "Archive",      gradient: "from-[#4285F4]/10 to-transparent", dotColor: "#4285F4" },
  [C.green]:  { name: "Consumption",  gradient: "from-[#34A853]/10 to-transparent", dotColor: "#34A853" },
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
    // Bucket Y values within 80px range
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
    // Use the dominant color in the group
    const colorCounts = new Map<string, number>();
    for (const n of nodes) {
      const c = n.data.color;
      colorCounts.set(c, (colorCounts.get(c) || 0) + 1);
    }
    let dominantColor = nodes[0].data.color;
    let maxCount = 0;
    for (const [c, count] of colorCounts) {
      if (count > maxCount) { dominantColor = c; maxCount = count; }
    }

    const meta = layerMeta[dominantColor] || { name: "Layer", gradient: "from-white/5 to-transparent", dotColor: "#9AA0A6" };

    return { y, color: dominantColor, layerName: meta.name, nodes };
  });
}

/* ── Single Node Card ── */

function NodeCard({ node, index }: { node: Node<ArchNodeData>; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const d = node.data;
  const isWide = node.type === "wide";
  const isDashed = d.dashed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={() => setExpanded(!expanded)}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isWide ? "col-span-full" : ""
      }`}
    >
      <div
        className={`relative rounded-2xl border p-4 transition-all duration-300 hover:shadow-lg hover:shadow-[${d.color}]/10 ${
          isDashed ? "border-dashed" : ""
        } ${d.glow ? "shadow-md" : ""}`}
        style={{
          backgroundColor: `${d.color}0A`,
          borderColor: expanded ? `${d.color}40` : `${d.color}18`,
          boxShadow: d.glow ? `0 0 30px ${d.color}15` : undefined,
        }}
      >
        {/* Badge */}
        {d.badge && (
          <div
            className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[9px] font-bold z-10"
            style={{
              backgroundColor: `${d.badge === "production" ? "#FFA000" : "#4285F4"}15`,
              color: d.badge === "production" ? "#FFA000" : "#4285F4",
              border: `1px solid ${d.badge === "production" ? "#FFA000" : "#4285F4"}25`,
            }}
          >
            {d.badge === "production" ? "\u26A1 Prod" : "\uD83D\uDCD0 Arch"}
          </div>
        )}

        <div className="flex items-start gap-3">
          {/* Color dot indicator */}
          <div
            className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: d.color }}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-[14px] font-semibold text-white leading-tight">
                {d.label}
              </h4>
              <ChevronRight
                size={14}
                className={`text-[#6B6B6F] transition-transform duration-200 flex-shrink-0 ${
                  expanded ? "rotate-90" : ""
                }`}
              />
            </div>

            {d.sublabel && (
              <p className="text-[11px] text-[#6B6B6F] mt-1 font-[family-name:var(--font-jetbrains)]">
                {d.sublabel}
              </p>
            )}

            {/* Items / tags */}
            {d.items && d.items.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {d.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium font-[family-name:var(--font-jetbrains)]"
                    style={{
                      backgroundColor: `${d.color}12`,
                      color: `${d.color}bb`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {/* Expanded tooltip detail */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="text-[13px] text-[#9AA0A6] leading-relaxed mt-3 pt-3 border-t"
                    style={{ borderColor: `${d.color}15` }}
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

/* ── Animated connector between layers ── */

function LayerConnector({ color }: { color: string }) {
  return (
    <div className="flex justify-center py-2">
      <div className="relative h-10 w-px">
        <div className="absolute inset-0 w-px" style={{ backgroundColor: `${color}30` }} />
        <motion.div
          className="absolute top-0 left-0 w-px h-4"
          style={{ backgroundColor: color }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Dot at bottom */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: `${color}50` }}
        />
      </div>
    </div>
  );
}

/* ── Main Pipeline View ── */

export default function ArchitecturePipeline({ diagram }: { diagram: ArchitectureDiagram }) {
  const layers = groupNodesByLayer(diagram);

  return (
    <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-[#1B1B1F] p-6 sm:p-8">
      {layers.map((layer, layerIdx) => {
        const meta = layerMeta[layer.color] || { name: "Layer", gradient: "from-white/5 to-transparent", dotColor: "#9AA0A6" };

        return (
          <div key={layerIdx}>
            {/* Layer header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: layerIdx * 0.1 }}
              className={`flex items-center gap-3 mb-4 ${layerIdx > 0 ? "" : ""}`}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: meta.dotColor }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-jetbrains)]"
                style={{ color: `${meta.dotColor}99` }}
              >
                {meta.name}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: `${meta.dotColor}15` }} />
            </motion.div>

            {/* Node grid */}
            <div className={`grid gap-3 mb-2 ${
              layer.nodes.length === 1
                ? "grid-cols-1"
                : layer.nodes.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : layer.nodes.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}>
              {layer.nodes.map((node, nodeIdx) => (
                <NodeCard
                  key={node.id}
                  node={node}
                  index={layerIdx * 3 + nodeIdx}
                />
              ))}
            </div>

            {/* Connector to next layer */}
            {layerIdx < layers.length - 1 && (
              <LayerConnector color={layers[layerIdx + 1].color} />
            )}
          </div>
        );
      })}
    </div>
  );
}
