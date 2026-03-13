"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, GraduationCap, Building2, Briefcase } from "lucide-react";

const highlights = [
  {
    icon: Building2,
    label: "Folio3 Software",
    detail: "Senior Data Engineer",
    color: "#2997FF",
  },
  {
    icon: MapPin,
    label: "Karachi, Pakistan",
    detail: "Open to Remote",
    color: "#BF5AF2",
  },
  {
    icon: GraduationCap,
    label: "NED University",
    detail: "BE Software Engineering, 2023",
    color: "#30D158",
  },
  {
    icon: Briefcase,
    label: "3+ Years",
    detail: "Data & Software Engineering",
    color: "#FF9F0A",
  },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label font-[family-name:var(--font-jetbrains)]">
            Background
          </span>
          <h2 className="heading-lg text-[#F5F5F7] mt-4">
            About Me
          </h2>
        </motion.div>

        {/* Highlight cards - bento style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="bento-card p-5 sm:p-6 text-center"
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${h.color}15` }}
              >
                <h.icon size={20} style={{ color: h.color }} />
              </div>
              <div className="text-[15px] font-semibold text-[#F5F5F7] mb-1">
                {h.label}
              </div>
              <div className="text-[13px] text-[#86868B]">{h.detail}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-[720px] mx-auto"
        >
          <div className="space-y-6 text-[17px] text-[#86868B] leading-[1.75]">
            <p>
              I started out as a frontend developer — React, TypeScript,
              GraphQL — building products for early-stage startups. At some
              point I got more interested in{" "}
              <span className="text-[#F5F5F7]">the data behind the apps</span>{" "}
              than the apps themselves. How it was collected, how it moved, how
              it turned into something useful. So I made the switch to data
              engineering and haven&apos;t looked back.
            </p>
            <p>
              These days I work mostly in the{" "}
              <span className="text-[#F5F5F7]">Microsoft Azure ecosystem</span>{" "}
              — Fabric, ADF, Databricks, Power BI. Building pipelines, modeling
              data, making sure the right people have the right numbers at the
              right time. The software background still shapes how I think — I
              approach data systems the way I used to approach software.{" "}
              <span className="text-[#F5F5F7]">
                Clean architecture, maintainability, not just making it work.
              </span>
            </p>
            <p>
              If you&apos;re building something data-heavy or need someone who
              understands both the engineering and the product side — feel free
              to reach out.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
