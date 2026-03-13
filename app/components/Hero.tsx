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
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Warm ambient glow - top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(212,168,83,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Cool ambient glow - bottom right */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(59,130,246,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Subtle floating particles */}
      <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-[#D4A853]/30 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#D4A853]/20 animate-[float_7s_ease-in-out_infinite_1s]" />
      <div className="absolute top-[60%] left-[10%] w-1 h-1 rounded-full bg-[#3B82F6]/20 animate-[float_5s_ease-in-out_infinite_2s]" />
      <div className="absolute top-[50%] right-[12%] w-1 h-1 rounded-full bg-[#D4A853]/15 animate-[float_8s_ease-in-out_infinite_0.5s]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          {/* ── Left: Main content ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27272A] bg-[#18181B]/60 text-xs text-[#A1A1AA] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                Available for work
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
            >
              <span className="text-[#FAFAF9]">Senior</span>
              <br />
              <span className="gradient-text font-[family-name:var(--font-playfair)] italic">
                Data Engineer
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg sm:text-xl text-[#71717A] mt-3 font-light tracking-wide"
            >
              who thinks like a software engineer.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-[#A1A1AA] mt-6 max-w-lg leading-relaxed"
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
              className="flex flex-wrap gap-4 mt-10"
            >
              <a
                href="#architecture"
                className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm"
              >
                <ArrowDown
                  size={16}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
                View My Work
              </a>
              <a
                href="#"
                className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm"
              >
                <Download size={16} />
                Download CV
              </a>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-14 w-24 h-px bg-gradient-to-r from-[#D4A853]/50 to-transparent origin-left"
            />
          </div>

          {/* ── Right: Terminal decoration ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block w-[380px]"
          >
            <div className="rounded-2xl border border-[#27272A] bg-[#0F0F12]/90 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/30">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#27272A]/60 bg-[#18181B]/50">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]/50" />
                <div className="w-3 h-3 rounded-full bg-[#EAB308]/50" />
                <div className="w-3 h-3 rounded-full bg-[#10B981]/50" />
                <span className="ml-2 text-[10px] text-[#52525B] font-[family-name:var(--font-jetbrains)]">
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
                        <span className="text-[#D4A853] select-none shrink-0">
                          $
                        </span>
                        <span className="text-[#D4D4D8]">
                          {line.text === "_" ? (
                            <span className="inline-block w-2 h-3.5 bg-[#D4A853]/60 animate-pulse" />
                          ) : (
                            line.text
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#71717A] pl-4">{line.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[#27272A] flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-[#D4A853]/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
