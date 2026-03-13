"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, GraduationCap, Building2 } from "lucide-react";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-[family-name:var(--font-jetbrains)] text-[#6366f1] tracking-wider uppercase">
            Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-6 sm:p-8 rounded-2xl border border-[#222222] bg-[#111111]">
            {/* Info pills */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#222222] text-xs text-[#a1a1aa]">
                <Building2 size={12} className="text-[#6366f1]" />
                Senior Data Engineer @ Folio3 Software
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#222222] text-xs text-[#a1a1aa]">
                <MapPin size={12} className="text-[#22d3ee]" />
                Karachi, Pakistan
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#222222] text-xs text-[#a1a1aa]">
                <GraduationCap size={12} className="text-[#22c55e]" />
                BE Software Engineering — NED University (2019–2023)
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-sm text-[#a1a1aa] leading-relaxed">
              <p>
                I started out as a frontend developer — React, TypeScript,
                GraphQL — building products for early-stage startups. At some
                point I got more interested in the data behind the apps than the
                apps themselves. How it was collected, how it moved, how it
                turned into something useful. So I made the switch to data
                engineering and haven&apos;t looked back.
              </p>
              <p>
                These days I work mostly in the Microsoft Azure ecosystem —
                Fabric, ADF, Databricks, Power BI. Building pipelines, modeling
                data, making sure the right people have the right numbers at the
                right time. The software background still shapes how I think — I
                approach data systems the way I used to approach software. Clean
                architecture, maintainability, not just making it work.
              </p>
              <p>
                If you&apos;re building something data-heavy or need someone who
                understands both the engineering and the product side — feel free
                to reach out.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
