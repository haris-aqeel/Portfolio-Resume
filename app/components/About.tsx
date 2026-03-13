"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, GraduationCap, Building2, Briefcase, ArrowRight } from "lucide-react";

const highlights = [
  { icon: Building2, label: "Folio3 Software", detail: "Senior Data Engineer", color: "#FFA000" },
  { icon: MapPin, label: "Karachi, Pakistan", detail: "Open to Remote", color: "#4285F4" },
  { icon: GraduationCap, label: "NED University", detail: "BE Software Eng, 2023", color: "#34A853" },
  { icon: Briefcase, label: "3+ Years", detail: "Data & Software Eng", color: "#EA4335" },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative">
      {/* Dark section */}
      <div className="py-28 sm:py-36">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="section-label font-[family-name:var(--font-jetbrains)]">About</span>
            <div className="grid lg:grid-cols-2 gap-16 mt-6">
              {/* Left - heading + bio */}
              <div>
                <h2 className="heading-lg mb-8">
                  A data engineer who thinks like a{" "}
                  <span className="gradient-text">software engineer.</span>
                </h2>
                <div className="space-y-5 text-[16px] text-[#9AA0A6] leading-[1.75]">
                  <p>
                    I started out as a frontend developer — React, TypeScript,
                    GraphQL — building products for early-stage startups. At some
                    point I got more interested in the data behind the apps than the
                    apps themselves.
                  </p>
                  <p>
                    These days I work mostly in the Microsoft Azure ecosystem — Fabric, ADF, Databricks, Power BI. The software background still shapes how I think — I approach data systems with{" "}
                    <span className="text-white font-medium">clean architecture, maintainability, not just making it work.</span>
                  </p>
                </div>
              </div>

              {/* Right - highlight cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="bento-card p-6 group cursor-default"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${h.color}15` }}
                    >
                      <h.icon size={24} style={{ color: h.color }} />
                    </div>
                    <div className="text-[16px] font-bold text-white mb-1">{h.label}</div>
                    <div className="text-[14px] text-[#9AA0A6] flex items-center gap-1">
                      {h.detail}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#FFA000]" />
                    </div>
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
