"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ArchitectureDiagram, ArchNodeData } from "./arch-data";
import type { Node } from "@xyflow/react";
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

/* ── Derive a meaningful layer name from node labels & context ── */

function inferLayerName(nodes: Node<ArchNodeData>[]): string {
  const labels = nodes.map((n) => n.data.label.toLowerCase());
  const allLabels = labels.join(" ");

  // Source-like
  if (labels.some((l) => l.includes("event hub") || l.includes("iot hub") || l.includes("kafka") || l.includes("webhook") || l.includes("cdc stream"))) return "Event Sources";
  if (labels.some((l) => l.includes("dynamics") || l.includes("sql server") || l.includes("rest api") || l.includes("csv") || l.includes("sftp") || l.includes("cosmos") || l.includes("postgresql") || l.includes("snowflake") || l.includes("azure sql"))) return "Data Sources";
  if (labels.some((l) => l.includes("operational db"))) return "Data Sources";

  // Processing
  if (allLabels.includes("data factory") || allLabels.includes("fabric pipeline")) return "Ingestion";
  if (allLabels.includes("real-time hub")) return "Real-Time Hub";
  if (allLabels.includes("eventstream")) return "Stream Processing";
  if (allLabels.includes("master pipeline")) return "Orchestration";
  if (allLabels.includes("mirroring engine") || allLabels.includes("transaction log")) return "Change Capture";
  if (allLabels.includes("gateway")) return "Data Gateway";

  // Handler branches
  if (labels.some((l) => l.includes("handler"))) return "Ingestion Handlers";

  // Storage tiers
  if (allLabels.includes("onelake") && allLabels.includes("landing")) return "Landing Zone";
  if (allLabels.includes("onelake") && allLabels.includes("unified")) return "Unified Storage";
  if (allLabels.includes("onelake") && allLabels.includes("mirrored")) return "Mirrored Storage";
  if (allLabels.includes("delta conversion")) return "Delta Processing";
  if (labels.some((l) => l.includes("raw") || l.includes("bronze") || l.includes("silver") || l.includes("gold"))) return "Medallion Layers";
  if (allLabels.includes("bronze layer")) return "Bronze Layer";
  if (allLabels.includes("silver layer")) return "Silver Layer";

  // Eventhouse / hot/warm/cold
  if (labels.some((l) => l.includes("eventhouse") || l.includes("lakehouse") || l.includes("archive"))) return "Storage Tiers";

  // Semantic
  if (allLabels.includes("semantic model") && nodes.length <= 2) return "Semantic Layer";
  if (allLabels.includes("medallion lakehouse") && nodes.length <= 2) return "Data Platform";

  // AI
  if (labels.some((l) => l.includes("copilot") || l.includes("data agent") || l.includes("ai function") || l.includes("openai"))) return "AI Capabilities";
  if (labels.some((l) => l.includes("inference") || l.includes("enriched"))) return "AI Outputs";

  // Activator
  if (allLabels.includes("activator")) return "Automation";

  // Governance
  if (labels.some((l) => l.includes("purview") || l.includes("governance") || l.includes("security"))) return "Governance";

  // Consumption
  if (labels.some((l) => l.includes("power bi report") || l.includes("excel") || l.includes("looker") || l.includes("sql analytics") || l.includes("sql endpoint") || l.includes("kql") || l.includes("dashboard") || l.includes("teams") || l.includes("custom app"))) return "Consumption";

  // Monitoring
  if (labels.some((l) => l.includes("pipeline run") || l.includes("schema drift"))) return "Monitoring";

  // Metadata
  if (allLabels.includes("metadata control")) return "Configuration";

  return "Pipeline";
}

/* ── Derive a layer color ── */

function inferLayerColor(nodes: Node<ArchNodeData>[]): string {
  // Pick the most visually distinct color from the nodes
  const colors = nodes.map((n) => n.data.color);
  const unique = [...new Set(colors)];
  // If all same, use that
  if (unique.length === 1) return unique[0];
  // Prefer non-blue color for variety
  const nonBlue = unique.find((c) => c !== "#4285F4");
  return nonBlue || unique[0];
}

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

  return sorted.map(([y, nodes]) => ({
    y,
    color: inferLayerColor(nodes),
    layerName: inferLayerName(nodes),
    nodes,
  }));
}

/* ── SVG flowing connector ── */

function FlowConnector({ fromColor, toColor, spread }: { fromColor: string; toColor: string; spread: boolean }) {
  const w = spread ? 160 : 60;
  const id = `fc-${fromColor.replace("#", "")}-${toColor.replace("#", "")}`;
  return (
    <div className="flex justify-center py-0.5">
      <svg width={w} height="36" viewBox={`0 0 ${w} 36`} fill="none" className="overflow-visible">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fromColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={toColor} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <line x1={w / 2} y1="0" x2={w / 2} y2="36" stroke={`url(#${id})`} strokeWidth="2" />
        <circle r="3" fill={toColor} opacity="0.8">
          <animateMotion dur="1.5s" repeatCount="indefinite" path={`M${w / 2},2 L${w / 2},34`} />
        </circle>
        {spread && (
          <>
            <line x1={w / 2} y1="18" x2={8} y2="36" stroke={toColor} strokeWidth="1" strokeOpacity="0.2" />
            <line x1={w / 2} y1="18" x2={w - 8} y2="36" stroke={toColor} strokeWidth="1" strokeOpacity="0.2" />
          </>
        )}
      </svg>
    </div>
  );
}

/* ── Node Card with prominent logo ── */

function NodeCard({ node, index, isWide }: { node: Node<ArchNodeData>; index: number; isWide?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const d = node.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => setExpanded(!expanded)}
      className={`relative group cursor-pointer ${isWide ? "col-span-full" : ""}`}
    >
      <div
        className={`relative rounded-2xl border p-5 transition-all duration-300 ${
          d.dashed ? "border-dashed" : ""
        } ${expanded ? "shadow-xl" : "hover:shadow-lg"}`}
        style={{
          background: `linear-gradient(145deg, ${d.color}0C 0%, ${d.color}04 100%)`,
          borderColor: expanded ? `${d.color}45` : `${d.color}20`,
          boxShadow: d.glow ? `0 0 40px ${d.color}15` : expanded ? `0 8px 32px ${d.color}12` : undefined,
        }}
      >
        {d.badge && (
          <div
            className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold"
            style={{
              backgroundColor: `${d.badge === "production" ? "#FFA000" : "#4285F4"}15`,
              color: d.badge === "production" ? "#FFA000" : "#4285F4",
              border: `1px solid ${d.badge === "production" ? "#FFA000" : "#4285F4"}28`,
            }}
          >
            {d.badge === "production" ? "\u26A1 Prod" : "\uD83D\uDCD0 Arch"}
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Logo */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${d.color}18, ${d.color}08)`,
              border: `1px solid ${d.color}18`,
            }}
          >
            {d.logo ? (
              <Logo slug={d.logo} color={d.logoColor} size={24} />
            ) : (
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: d.color, color: "#1B1B1F" }}>
                {d.label.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-[14px] font-semibold text-white leading-tight">{d.label}</h4>
              <ChevronRight
                size={14}
                className={`text-[#6B6B6F] transition-transform duration-200 flex-shrink-0 ${expanded ? "rotate-90" : "group-hover:translate-x-0.5"}`}
              />
            </div>

            {d.sublabel && (
              <p className="text-[11px] text-[#6B6B6F] mt-1.5 font-[family-name:var(--font-jetbrains)] leading-relaxed">{d.sublabel}</p>
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
                  <p className="text-[13px] text-[#9AA0A6] leading-relaxed mt-3 pt-3 border-t" style={{ borderColor: `${d.color}15` }}>
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

/* ── Compact Hero Illustration ── */

function PipelineHero({ layers }: { layers: LayerGroup[] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 mb-6" style={{ background: "linear-gradient(160deg, #292929 0%, #1B1B1F 50%)" }}>
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[radial-gradient(ellipse,rgba(255,160,0,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[radial-gradient(ellipse,rgba(66,133,244,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-0">
        {layers.map((layer, li) => (
          <div key={li} className="w-full">
            {/* Layer label */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(to right, transparent, ${layer.color}25)` }} />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-jetbrains)]" style={{ color: `${layer.color}70` }}>
                {layer.layerName}
              </span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(to left, transparent, ${layer.color}25)` }} />
            </div>

            {/* Service chips */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {layer.nodes.map((node, ni) => {
                const d = node.data;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: li * 0.07 + ni * 0.03 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${d.color}10, ${d.color}05)`,
                      borderColor: `${d.color}20`,
                    }}
                    title={d.tooltip}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${d.color}15` }}
                    >
                      {d.logo ? (
                        <Logo slug={d.logo} color={d.logoColor} size={16} />
                      ) : (
                        <span className="text-[9px] font-bold" style={{ color: d.color }}>{d.label.charAt(0)}</span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-white/80 whitespace-nowrap max-w-[130px] truncate">
                      {d.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Connector */}
            {li < layers.length - 1 && (
              <FlowConnector
                fromColor={layer.color}
                toColor={layers[li + 1].color}
                spread={layers[li + 1].nodes.length >= 3}
              />
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-5 pt-4 border-t border-white/[0.06]">
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
  const layers = useMemo(() => groupNodesByLayer(diagram), [diagram]);

  return (
    <div className="space-y-0">
      <PipelineHero layers={layers} />

      <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-[#1B1B1F] p-6 sm:p-8">
        {layers.map((layer, li) => (
          <div key={li}>
            {/* Layer header */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: li * 0.07 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: layer.color }} />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.15em] font-[family-name:var(--font-jetbrains)]"
                style={{ color: `${layer.color}90` }}
              >
                {layer.layerName}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: `${layer.color}12` }} />
            </motion.div>

            {/* Nodes */}
            <div className={`grid gap-3 mb-2 ${
              layer.nodes.length === 1 ? "grid-cols-1"
                : layer.nodes.length === 2 ? "grid-cols-1 sm:grid-cols-2"
                : layer.nodes.length === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : layer.nodes.length === 5 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}>
              {layer.nodes.map((node, ni) => (
                <NodeCard key={node.id} node={node} index={li * 3 + ni} isWide={node.type === "wide"} />
              ))}
            </div>

            {/* Connector */}
            {li < layers.length - 1 && (
              <div className="flex justify-center py-1.5">
                <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
                  <line x1="30" y1="0" x2="30" y2="28" stroke={`${layers[li + 1].color}35`} strokeWidth="1.5" />
                  <circle r="2.5" fill={layers[li + 1].color} opacity="0.6">
                    <animate attributeName="cy" values="3;25;3" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="cx" values="30;30;30" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
