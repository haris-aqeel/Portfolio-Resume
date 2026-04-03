"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const stats = [
  { value: 100, suffix: "K+", label: "Earned", prefix: "$" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Job Success" },
  { value: 5.0, suffix: "", label: "Client Rating", decimals: 1 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(255,160,0,0.07)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 w-full pt-24">
        {/* Top banner - Firebase style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="warm-glass p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-[700px]">
            <div>
              <p className="text-[15px] font-semibold text-white mb-1">
                Microsoft Certified Data Engineer
              </p>
              <p className="text-[13px] text-[#9AA0A6] leading-relaxed">
                Microsoft Fabric migrations · ADF pipelines · Power BI · Real estate data platforms
              </p>
            </div>
            <a href="#experience" className="btn-primary px-5 py-2.5 text-[13px] font-semibold whitespace-nowrap shrink-0">
              See My Work
            </a>
          </div>
        </motion.div>

        {/* Photo + Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center gap-5 mb-10"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-[#FFA000]/30 ring-offset-2 ring-offset-[#1B1B1F] shrink-0">
            <Image
              src="/images/haris.jpg"
              alt="Haris Aqeel"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold text-white">Haris Aqeel</h2>
            <p className="text-[13px] sm:text-[14px] text-[#9AA0A6]">Senior Data Engineer · Microsoft Fabric Certified</p>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="heading-xl max-w-[900px] mb-8"
        >
          Build your data platform{" "}
          <span className="gradient-text">the best it can be</span>{" "}
          with a Senior Data Engineer
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[18px] sm:text-[20px] text-[#9AA0A6] max-w-[640px] leading-[1.6] font-light"
        >
          I design, build and optimise end-to-end data platforms on Microsoft Fabric
          and Azure — from lakehouse architecture and integration pipelines to
          governed semantic layers that Power BI can trust.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#architecture"
            className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-[15px]"
          >
            View Architecture
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 text-[15px]"
          >
            Get in Touch
          </a>
        </motion.div>

      </div>
    </section>
  );
}
