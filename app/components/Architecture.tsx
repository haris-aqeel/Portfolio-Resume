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
  { color: "#22d3ee", label: "Source" },
  { color: "#6366f1", label: "Processing" },
  { color: "#9333ea", label: "Storage" },
  { color: "#22c55e", label: "Consumption" },
  { color: "#f59e0b", label: "Governance" },
];

/* ── Walkthrough renderer ── */

function Walkthrough({
  data,
}: {
  data: ArchitectureDiagram["walkthrough"];
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-400 leading-relaxed">{data.intro}</p>

      <div className="space-y-4">
        {data.sections.map((s: WalkthroughSection, i: number) => (
          <div key={i}>
            <h4 className="text-sm font-semibold text-zinc-200 mb-1">
              {s.title}
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      {data.decisions && data.decisions.length > 0 && (
        <div className="border-t border-zinc-800 pt-4">
          <h4 className="text-sm font-semibold text-zinc-200 mb-2">
            Key design decisions:
          </h4>
          <ul className="text-sm text-zinc-400 space-y-1">
            {data.decisions.map((d: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-zinc-600 select-none">&mdash;</span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-[family-name:var(--font-jetbrains)] text-[#6366f1] tracking-wider uppercase">
            System Design
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Data Engineering{" "}
            <span className="gradient-text">Architecture Showcase</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            I don&apos;t just run pipelines &mdash; I design the systems that
            pipelines live inside. Below are five architecture patterns
            I&apos;ve built, studied, or can speak to in depth. Each one
            reflects how I think about data: as infrastructure that has to be
            trustworthy before it can be useful.
          </p>
        </motion.div>

        {/* ── Tab Navigation (pill-style) ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#6366f1] text-white shadow-lg shadow-indigo-500/25"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-200 hover:border-zinc-700"
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
              <h3 className="text-lg font-bold text-zinc-100">
                {current.tabLabel}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                {current.oneLiner}
              </p>
            </div>

            {/* ReactFlow Diagram */}
            <div
              className="rounded-xl border border-zinc-800 overflow-hidden"
              style={{ height: 700, background: "#0a0a0a" }}
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
                <Background color="#1a1a1a" gap={20} />
                <Controls
                  showInteractive={false}
                  className="!bg-zinc-900 !border-zinc-800 !rounded-lg !shadow-lg [&>button]:!bg-zinc-900 [&>button]:!border-zinc-800 [&>button]:!text-zinc-500 [&>button:hover]:!text-zinc-200"
                />
              </ReactFlow>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              {legendItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-zinc-500"
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="w-6 h-0.5 bg-indigo-500" />
                Batch
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-cyan-400" />
                Streaming
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-amber-500" />
                Governance
              </div>
            </div>

            {/* ── Walkthrough ── */}
            <div className="mt-6">
              {/* Mobile toggle */}
              <button
                onClick={() => setWalkthroughOpen(!walkthroughOpen)}
                className="sm:hidden w-full flex items-center justify-between px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 mb-3"
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
                } sm:block rounded-xl bg-zinc-900/50 border border-zinc-800 p-6`}
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
          className="text-center text-zinc-600 text-sm mt-12 max-w-2xl mx-auto leading-relaxed italic"
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
