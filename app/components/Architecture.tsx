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

/* ── Tab config with icons ── */

const tabIcons = [Layers, Zap, RefreshCw, Settings, Sparkles];

/* ── Legend items ── */

const legendItems = [
  { color: "#3B82F6", label: "Source" },
  { color: "#D4A853", label: "Processing" },
  { color: "#8B5CF6", label: "Storage" },
  { color: "#10B981", label: "Consumption" },
  { color: "#F59E0B", label: "Governance" },
];

/* ── Walkthrough renderer ── */

function Walkthrough({
  data,
}: {
  data: ArchitectureDiagram["walkthrough"];
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-[#A1A1AA] leading-relaxed">{data.intro}</p>

      <div className="space-y-4">
        {data.sections.map((s: WalkthroughSection, i: number) => (
          <div key={i}>
            <h4 className="text-sm font-semibold text-[#E4E4E7] mb-1">
              {s.title}
            </h4>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      {data.decisions && data.decisions.length > 0 && (
        <div className="border-t border-[#27272A] pt-4">
          <h4 className="text-sm font-semibold text-[#E4E4E7] mb-2">
            Key design decisions:
          </h4>
          <ul className="text-sm text-[#A1A1AA] space-y-1">
            {data.decisions.map((d: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#D4A853] select-none">&mdash;</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Main Section ── */

export default function Architecture() {
  const [activeTab, setActiveTab] = useState(0);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const current = architectures[activeTab];

  return (
    <section id="architecture" className="relative py-24 sm:py-32">
      <div className="section-divider mb-24" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label font-[family-name:var(--font-jetbrains)]">
            System Design
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 font-[family-name:var(--font-playfair)]">
            Data Engineering{" "}
            <span className="gradient-text">Architecture Showcase</span>
          </h2>
          <p className="text-[#71717A] mt-5 max-w-2xl mx-auto text-sm leading-relaxed">
            I don&apos;t just run pipelines &mdash; I design the systems that
            pipelines live inside. Below are five architecture patterns
            I&apos;ve built, studied, or can speak to in depth.
          </p>
        </motion.div>

        {/* ── Tab Navigation (pill-style) ── */}
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4A853] to-[#B8922E] text-[#09090B] shadow-lg shadow-[#D4A853]/20"
                    : "bg-[#18181B] border border-[#27272A] text-[#71717A] hover:text-[#A1A1AA] hover:border-[#3F3F46]"
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{arch.tabLabel}</span>
                <span className="sm:hidden">
                  {arch.tabLabel.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Tab Content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* Title + one-liner */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#FAFAF9]">
                {current.tabLabel}
              </h3>
              <p className="text-sm text-[#71717A] mt-1">
                {current.oneLiner}
              </p>
            </div>

            {/* ReactFlow Diagram */}
            <div
              className="rounded-xl border border-[#27272A] overflow-hidden"
              style={{ height: 700, background: "#09090B" }}
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
                <Background color="#1C1C20" gap={20} />
                <Controls
                  showInteractive={false}
                  className="!bg-[#18181B] !border-[#27272A] !rounded-lg !shadow-lg [&>button]:!bg-[#18181B] [&>button]:!border-[#27272A] [&>button]:!text-[#71717A] [&>button:hover]:!text-[#D4A853]"
                />
              </ReactFlow>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
              {legendItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-[#71717A]"
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs text-[#71717A]">
                <div className="w-6 h-0.5 bg-[#D4A853]" />
                Batch
              </div>
              <div className="flex items-center gap-2 text-xs text-[#71717A]">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-[#3B82F6]" />
                Streaming
              </div>
              <div className="flex items-center gap-2 text-xs text-[#71717A]">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-[#F59E0B]" />
                Governance
              </div>
            </div>

            {/* ── Walkthrough ── */}
            <div className="mt-6">
              {/* Mobile toggle */}
              <button
                onClick={() => setWalkthroughOpen(!walkthroughOpen)}
                className="sm:hidden w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#18181B] border border-[#27272A] text-sm text-[#A1A1AA] mb-3"
              >
                <span>Architecture Walkthrough</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    walkthroughOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Content — always visible on sm+, toggled on mobile */}
              <div
                className={`${
                  walkthroughOpen ? "block" : "hidden"
                } sm:block rounded-xl premium-card p-6`}
              >
                <Walkthrough data={current.walkthrough} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Section Footer ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-[#52525B] text-sm mt-14 max-w-2xl mx-auto leading-relaxed italic"
        >
          These aren&apos;t diagrams copied from documentation. They&apos;re
          how I think about system design &mdash; the trade-offs, the failure
          modes, the decisions that aren&apos;t in any tutorial. If you want to
          talk through any of these in depth, I&apos;m happy to.
        </motion.p>
      </div>
    </section>
  );
}
