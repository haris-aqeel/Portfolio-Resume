"use client";

import { useState, useMemo } from "react";
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
import { architectures, nodeTypes as importedNodeTypes } from "./arch-data";
import type { ArchitectureDiagram, WalkthroughSection } from "./arch-data";

const tabIcons = [Layers, Zap, RefreshCw, Settings, Sparkles];

const legendItems = [
  { color: "#5eead4", label: "Source" },
  { color: "#38bdf8", label: "Processing" },
  { color: "#a78bfa", label: "Storage" },
  { color: "#5eead4", label: "Consumption" },
  { color: "#fbbf24", label: "Governance" },
];

function Walkthrough({
  data,
}: {
  data: ArchitectureDiagram["walkthrough"];
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted leading-relaxed">{data.intro}</p>

      <div className="space-y-4">
        {data.sections.map((s: WalkthroughSection, i: number) => (
          <div key={i}>
            <h4 className="text-sm font-semibold text-slate-200 mb-1">
              {s.title}
            </h4>
            <p className="text-sm text-muted leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      {data.decisions && data.decisions.length > 0 && (
        <div className="border-t border-slate-700/50 pt-4">
          <h4 className="text-sm font-semibold text-slate-200 mb-2">
            Key design decisions:
          </h4>
          <ul className="text-sm text-muted space-y-1">
            {data.decisions.map((d: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">-</span>
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
  
  // Memoize nodeTypes to prevent React Flow warning about object recreation
  const nodeTypes = useMemo(() => importedNodeTypes, []);

  return (
    <section id="architecture" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-primary font-mono text-sm mb-2">System Design</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Architecture Showcase
            </h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              {"I don't"} just run pipelines - I design the systems that pipelines live inside. 
              Below are architecture patterns {"I've"} built, studied, or can speak to in depth.
            </p>
          </div>

          {/* Tab Navigation */}
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
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-slate-800/50 border border-slate-700/50 text-muted hover:text-slate-100 hover:border-slate-600"
                  }`}
                >
                  <Icon size={14} />
                  <span className="hidden sm:inline">{arch.tabLabel}</span>
                  <span className="sm:hidden">{arch.tabLabel.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {/* Title */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-100">
                  {current.tabLabel}
                </h3>
                <p className="text-sm text-muted mt-1">{current.oneLiner}</p>
              </div>

              {/* ReactFlow Diagram */}
              <div
                className="rounded-xl border border-slate-700/50 overflow-hidden"
                style={{ height: 600, background: "#0f172a" }}
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
                  <Background color="#1e293b" gap={20} />
                  <Controls
                    showInteractive={false}
                    className="!bg-slate-900 !border-slate-700 !rounded-lg !shadow-lg [&>button]:!bg-slate-900 [&>button]:!border-slate-700 [&>button]:!text-muted [&>button:hover]:!text-slate-200"
                  />
                </ReactFlow>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                {legendItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-xs text-muted"
                  >
                    <div
                      className="w-3 h-3 rounded-sm"
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
                  className="sm:hidden w-full flex items-center justify-between px-4 py-3 rounded-lg premium-card text-sm text-muted mb-3"
                >
                  <span>Architecture Walkthrough</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${walkthroughOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`${
                    walkthroughOpen ? "block" : "hidden"
                  } sm:block premium-card p-6`}
                >
                  <Walkthrough data={current.walkthrough} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
