"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

/* Terminal lines for the decorative code block */
const terminalLines = [
  { prompt: true, text: "fabric pipeline run --workspace prod" },
  { prompt: false, text: "\u2714 Bronze layer: 2.4M rows ingested" },
  { prompt: false, text: "\u2714 Silver layer: deduplicated, SCD2 applied" },
  { prompt: false, text: "\u2714 Gold layer: dimensional model refreshed" },
  { prompt: false, text: "\u2714 Direct Lake: semantic model live" },
  { prompt: true, text: "_" },
];

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* Animated gradient orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,rgba(34,211,238,0.06)_40%,transparent_70%)] blur-3xl animate-[float_8s_ease-in-out_infinite] pointer-events-none" />

      {/* Subtle floating dots */}
      <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-indigo-500/40 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 rounded-full bg-cyan-400/30 animate-[float_7s_ease-in-out_infinite_1s]" />
      <div className="absolute top-[60%] left-[10%] w-1 h-1 rounded-full bg-purple-500/30 animate-[float_5s_ease-in-out_infinite_2s]" />
      <div className="absolute top-[50%] right-[12%] w-1 h-1 rounded-full bg-indigo-400/20 animate-[float_8s_ease-in-out_infinite_0.5s]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
          {/* ── Left: Main content ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs text-zinc-400 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for work
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Senior{" "}
              <span className="gradient-text">Data Engineer</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg sm:text-xl text-zinc-400 mt-2 font-medium"
            >
              who thinks like a software engineer.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-zinc-500 mt-5 max-w-lg leading-relaxed"
            >
              I design and build end-to-end data platforms on Microsoft Fabric
              &mdash; from lakehouse architecture and real-time pipelines to
              governed semantic layers that Power BI and AI can trust.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a
                href="#architecture"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                <ArrowDown
                  size={16}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
                View My Work
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-200 font-medium text-sm transition-all duration-200 backdrop-blur-sm"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>
          </div>

          {/* ── Right: Terminal decoration ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block w-[380px]"
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-indigo-500/5">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/50">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-[10px] text-zinc-600 font-[family-name:var(--font-jetbrains)]">
                  fabric-pipeline.sh
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-4 space-y-1.5 font-[family-name:var(--font-jetbrains)] text-[11px] leading-relaxed">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.3, duration: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    {line.prompt ? (
                      <>
                        <span className="text-emerald-500 select-none shrink-0">
                          $
                        </span>
                        <span className="text-zinc-300">
                          {line.text === "_" ? (
                            <span className="inline-block w-2 h-3.5 bg-zinc-400 animate-pulse" />
                          ) : (
                            line.text
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="text-zinc-500 pl-4">{line.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
