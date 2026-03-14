"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="relative">
      {/* Dark section */}
      <div className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="section-label font-[family-name:var(--font-jetbrains)]">About</span>
            <div className="max-w-2xl mt-6">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
