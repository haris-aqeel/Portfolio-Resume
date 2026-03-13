"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import CountUp from "react-countup";

const stats = [
  { value: 60, suffix: "K+", label: "Earned on Upwork" },
  { value: 47, suffix: "", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Job Success Score" },
  { value: 5.0, suffix: "", label: "Client Rating", decimals: 1 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* ── Cinematic background ── */}
      {/* Main spotlight */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(41,151,255,0.12)_0%,rgba(191,90,242,0.06)_40%,transparent_70%)] blur-[80px] pointer-events-none" />
      {/* Secondary glow */}
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(191,90,242,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="relative max-w-[1120px] mx-auto px-6 w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] text-[13px] text-[#86868B]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#30D158]" />
            </span>
            Available for work
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="heading-xl text-[#F5F5F7] mb-6"
        >
          Senior Data
          <br />
          <span className="gradient-text">Engineer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[18px] sm:text-[21px] text-[#86868B] max-w-[580px] mx-auto leading-relaxed font-light"
        >
          I build end-to-end data platforms on Microsoft Fabric — from
          lakehouse architecture to semantic layers that AI can trust.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <a
            href="#architecture"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-[15px]"
          >
            View My Work
            <ArrowDown size={16} />
          </a>
          <a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 text-[15px]"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 sm:mt-28"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 max-w-[640px] mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#F5F5F7] tracking-tight">
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.label === "Earned on Upwork" ? "$" : ""}
                    decimals={stat.decimals || 0}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-[12px] text-[#86868B] mt-1.5 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
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
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[26px] h-[40px] rounded-full border-2 border-white/10 flex justify-center pt-2"
        >
          <div className="w-[3px] h-[6px] rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
