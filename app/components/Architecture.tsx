"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ReactFlow,
  Background,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Layers,
  Zap,
  RefreshCw,
  Settings,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { architectures, nodeTypes } from "./arch-data";
import type { ArchitectureDiagram, WalkthroughSection } from "./arch-data";

const tabIcons = [Layers, Zap, RefreshCw, Settings, Sparkles];

const legendItems = [
  { color: "#2997FF", label: "Source" },
  { color: "#BF5AF2", label: "Processing" },
  { color: "#FF375F", label: "Storage" },
  { color: "#30D158", label: "Consumption" },
  { color: "#FF9F0A", label: "Governance" },
];

function Walkthrough({
  data,
}: {
  data: ArchitectureDiagram["walkthrough"];
}) {
  return (
    <div className="space-y-5">
      <p className="text-[14px] text-[#86868B] leading-relaxed">{data.intro}</p>

      <div className="space-y-4">
        {data.sections.map((s: WalkthroughSection, i: number) => (
          <div key={i}>
            <h4 className="text-[14px] font-semibold text-[#D1D1D6] mb-1">
              {s.title}
            </h4>
            <p className="text-[14px] text-[#86868B] leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      {data.decisions && data.decisions.length > 0 && (
        <div className="border-t border-white/[0.04] pt-4">
          <h4 className="text-[14px] font-semibold text-[#D1D1D6] mb-2">
            Key design decisions:
          </h4>
          <ul className="text-[14px] text-[#86868B] space-y-1.5">
            {data.decisions.map((d: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#2997FF]">&mdash;</span>
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
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const current = architectures[activeTab];

  return (
    <section id="architecture" className="relative py-28 sm:py-36">
      <div className="section-divider" />

      <div className="max-w-[1120px] mx-auto px-6 pt-28">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="section-label font-[family-name:var(--font-jetbrains)]">
            System Design
          </span>
          <h2 className="heading-lg text-[#F5F5F7] mt-4">
            Architecture Showcase
          </h2>
          <p className="text-[#86868B] mt-5 max-w-[600px] mx-auto text-[16px] leading-relaxed">
            Five architecture patterns I&apos;ve built, studied, or can speak to
            in depth. Each reflects how I think about data as infrastructure.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {architectures.map((arch, i) => {
            const Icon = tabIcons[i];
            const isActive = activeTab === i;
            return (
              <button
                key={arch.id}
                onClick={() => {
                  setActiveTab(i);
                  setWalkthroughOpen(false);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#0071E3] text-white shadow-[0_4px_20px_rgba(0,113,227,0.3)]"
                    : "bg-white/[0.04] text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.08]"
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{arch.tabLabel}</span>
                <span className="sm:hidden">{arch.tabLabel.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-4">
              <h3 className="text-[18px] font-semibold text-[#F5F5F7]">
                {current.tabLabel}
              </h3>
              <p className="text-[14px] text-[#86868B] mt-1">
                {current.oneLiner}
              </p>
            </div>

            <div
              className="rounded-2xl border border-white/[0.04] overflow-hidden"
              style={{ height: 700, background: "#0A0A0A" }}
            >
              <ReactFlow
                nodes={current.nodes}
                edges={current.edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.25 }}
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={true}
                zoomOnScroll={true}
                minZoom={0.3}
                maxZoom={1.5}
              >
                <Background color="#1D1D1F" gap={20} />
                <Controls
                  showInteractive={false}
                  className="!bg-[#1D1D1F] !border-white/[0.04] !rounded-xl !shadow-lg [&>button]:!bg-[#1D1D1F] [&>button]:!border-white/[0.04] [&>button]:!text-[#86868B] [&>button:hover]:!text-[#F5F5F7]"
                />
              </ReactFlow>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-5">
              {legendItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-[12px] text-[#86868B]"
                >
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Walkthrough */}
            <div className="mt-6">
              <button
                onClick={() => setWalkthroughOpen(!walkthroughOpen)}
                className="sm:hidden w-full flex items-center justify-between px-5 py-3 rounded-xl bg-white/[0.04] text-[14px] text-[#86868B] mb-3"
              >
                <span>Architecture Walkthrough</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    walkthroughOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`${
                  walkthroughOpen ? "block" : "hidden"
                } sm:block bento-card p-6`}
              >
                <Walkthrough data={current.walkthrough} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-[#48484A] text-[14px] mt-14 max-w-[600px] mx-auto leading-relaxed italic"
        >
          These aren&apos;t diagrams copied from documentation. They&apos;re
          how I think about system design — the trade-offs, the failure
          modes, the decisions that aren&apos;t in any tutorial.
        </motion.p>
      </div>
    </section>
  );
}
