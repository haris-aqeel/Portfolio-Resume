"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Layers, Zap, RefreshCw, Settings, Sparkles, ChevronDown, LayoutGrid, GitBranch } from "lucide-react";
import { architectures, nodeTypes } from "./arch-data";
import type { ArchitectureDiagram, WalkthroughSection } from "./arch-data";
import ArchitecturePipeline from "./ArchitecturePipeline";

const tabIcons = [Layers, Zap, RefreshCw, Settings, Sparkles];

const legendItems = [
  { color: "#4285F4", label: "Source" },
  { color: "#FFA000", label: "Processing" },
  { color: "#AB47BC", label: "Storage" },
  { color: "#34A853", label: "Consumption" },
  { color: "#FF7043", label: "Governance" },
];

function Walkthrough({ data }: { data: ArchitectureDiagram["walkthrough"] }) {
  return (
    <div className="space-y-5">
      <p className="text-[14px] text-[#9AA0A6] leading-relaxed">{data.intro}</p>
      <div className="space-y-4">
        {data.sections.map((s: WalkthroughSection, i: number) => (
          <div key={i}>
            <h4 className="text-[14px] font-bold text-white mb-1">{s.title}</h4>
            <p className="text-[14px] text-[#9AA0A6] leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
      {data.decisions && data.decisions.length > 0 && (
        <div className="border-t border-white/[0.06] pt-4">
          <h4 className="text-[14px] font-bold text-white mb-2">Key design decisions:</h4>
          <ul className="text-[14px] text-[#9AA0A6] space-y-1.5">
            {data.decisions.map((d: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#FFA000]">&mdash;</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Architecture() {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<"pipeline" | "diagram">("diagram");
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const current = architectures[activeTab];

  return (
    <section id="architecture" className="relative section-light pt-12 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <span className="section-label font-[family-name:var(--font-jetbrains)]">System Design</span>
          <h2 className="heading-lg mt-4" style={{ color: "#1B1B1F" }}>Architecture Showcase</h2>
          <p className="text-[#5F6368] mt-5 max-w-[600px] mx-auto text-[16px] leading-relaxed">
            Five architecture patterns I&apos;ve built, studied, or can speak to in depth.
          </p>
        </motion.div>

        {/* Tabs + View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap justify-center items-start gap-6">
            {/* Group 1 — Production */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34A853]">Production Built</span>
              <div className="flex flex-wrap justify-center gap-2">
                {architectures.map((arch, i) => {
                  if (arch.conceptual) return null;
                  const Icon = tabIcons[i];
                  const isActive = activeTab === i;
                  return (
                    <button
                      key={arch.id}
                      onClick={() => { setActiveTab(i); setWalkthroughOpen(false); }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-[#FFA000] text-[#1B1B1F] shadow-[0_4px_16px_rgba(255,160,0,0.25)]"
                          : "bg-white text-[#5F6368] border border-[#E8EAED] hover:border-[#FFA000] hover:text-[#FFA000]"
                      }`}
                    >
                      <Icon size={14} />
                      <span className="hidden sm:inline">{arch.tabLabel}</span>
                      <span className="sm:hidden">{arch.tabLabel.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-12 bg-[#E8EAED]" />

            {/* Group 2 — Studied */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9AA0A6]">Studied / Can Speak To</span>
              <div className="flex flex-wrap justify-center gap-2">
                {architectures.map((arch, i) => {
                  if (!arch.conceptual) return null;
                  const Icon = tabIcons[i];
                  const isActive = activeTab === i;
                  return (
                    <button
                      key={arch.id}
                      onClick={() => { setActiveTab(i); setWalkthroughOpen(false); }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                        isActive
                          ? "bg-[#FFA000] text-[#1B1B1F] shadow-[0_4px_16px_rgba(255,160,0,0.25)]"
                          : "bg-white text-[#5F6368] border border-[#E8EAED] hover:border-[#FFA000] hover:text-[#FFA000]"
                      }`}
                    >
                      <Icon size={14} />
                      <span className="hidden sm:inline">{arch.tabLabel}</span>
                      <span className="sm:hidden">{arch.tabLabel.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* View mode toggle — commented out, diagram only for now */}
          {/* <div className="flex items-center gap-1 bg-white border border-[#E8EAED] rounded-full p-1">
            <button
              onClick={() => setViewMode("pipeline")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
                viewMode === "pipeline"
                  ? "bg-[#1B1B1F] text-white"
                  : "text-[#5F6368] hover:text-[#1B1B1F]"
              }`}
            >
              <LayoutGrid size={12} />
              Pipeline
            </button>
            <button
              onClick={() => setViewMode("diagram")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${
                viewMode === "diagram"
                  ? "bg-[#1B1B1F] text-white"
                  : "text-[#5F6368] hover:text-[#1B1B1F]"
              }`}
            >
              <GitBranch size={12} />
              Diagram
            </button>
          </div> */}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`${current.id}-${viewMode}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-[18px] font-bold" style={{ color: "#1B1B1F" }}>{current.tabLabel}</h3>
                {current.conceptual && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFA000]/10 text-[#FFA000] border border-[#FFA000]/20">
                    Conceptual / Studied
                  </span>
                )}
              </div>
              <p className="text-[14px] text-[#5F6368] mt-1">{current.oneLiner}</p>
            </div>

            {/* Pipeline view — commented out, diagram only for now */}
            {/* viewMode === "pipeline" ? (
              <ArchitecturePipeline diagram={current} />
            ) : ( */}
              <>
                <div className="rounded-3xl overflow-hidden border border-[#E8EAED]" style={{ height: 700, background: "#1B1B1F" }}>
                  <ReactFlow
                    nodes={current.nodes} edges={current.edges} nodeTypes={nodeTypes}
                    fitView fitViewOptions={{ padding: 0.25 }}
                    proOptions={{ hideAttribution: true }}
                    nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
                    panOnDrag={true} zoomOnScroll={true} minZoom={0.3} maxZoom={1.5}
                  >
                    <Background color="#292929" gap={20} />
                    <Controls showInteractive={false} className="!bg-[#292929] !border-[#3C3C3F] !rounded-xl !shadow-lg [&>button]:!bg-[#292929] [&>button]:!border-[#3C3C3F] [&>button]:!text-[#9AA0A6] [&>button:hover]:!text-white" />
                  </ReactFlow>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
                  {legendItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-[12px] text-[#5F6368]">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </>
            {/* ) */}

            {/* Walkthrough - dark card */}
            <div className="mt-6">
              <button
                onClick={() => setWalkthroughOpen(!walkthroughOpen)}
                className="sm:hidden w-full flex items-center justify-between px-5 py-3 rounded-xl bg-[#1B1B1F] text-[14px] text-[#9AA0A6] mb-3"
              >
                <span>Architecture Walkthrough</span>
                <ChevronDown size={16} className={`transition-transform ${walkthroughOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`${walkthroughOpen ? "block" : "hidden"} sm:block rounded-3xl bg-[#1B1B1F] p-8`}>
                <Walkthrough data={current.walkthrough} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
