"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              <span className="text-primary font-mono text-xl mr-2">01.</span>
              About Me
            </h2>
            <div className="h-px flex-1 bg-slate-700/50 max-w-xs" />
          </div>

          {/* Content */}
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              I started out as a frontend developer — React, TypeScript, GraphQL — building products for early-stage startups. At some point, I got more interested in the data behind the apps than the apps themselves. How it was collected, how it moved, how it turned into something useful. So I made the switch to data engineering and {"haven't"} looked back.
            </p>
            
            <p>
              These days I work mostly in the{" "}
              <span className="text-slate-100">Microsoft Azure ecosystem</span> —{" "}
              <span className="text-slate-100">Fabric</span>,{" "}
              <span className="text-slate-100">ADF</span>,{" "}
              <span className="text-slate-100">Databricks</span>,{" "}
              <span className="text-slate-100">Power BI</span>. Building pipelines, modeling data, making sure the right people have the right numbers at the right time. The software background still shapes how I think — I approach data systems the way I used to approach software. Clean architecture, maintainability, not just making it work.
            </p>

            <p>
              {"If you're"} building something data-heavy or need someone who understands both the engineering and the product side — feel free to reach out.
            </p>
          </div>

          {/* Quick Facts */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-primary mt-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M4.5 11L0 5.5L1.5 4L4.5 7L10.5 1L12 2.5L4.5 11Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm text-slate-100 font-medium">Location</p>
                <p className="text-sm text-muted">Karachi, Pakistan</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary mt-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M4.5 11L0 5.5L1.5 4L4.5 7L10.5 1L12 2.5L4.5 11Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm text-slate-100 font-medium">Education</p>
                <p className="text-sm text-muted">BE Software Engineering, NED University</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary mt-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M4.5 11L0 5.5L1.5 4L4.5 7L10.5 1L12 2.5L4.5 11Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm text-slate-100 font-medium">Current Role</p>
                <p className="text-sm text-muted">Senior Data Engineer @ Folio3</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary mt-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M4.5 11L0 5.5L1.5 4L4.5 7L10.5 1L12 2.5L4.5 11Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm text-slate-100 font-medium">Work Preference</p>
                <p className="text-sm text-muted">Open to Remote</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
