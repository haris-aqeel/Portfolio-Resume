"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, GraduationCap, Briefcase, Globe } from "lucide-react";

const quickFacts = [
  {
    icon: MapPin,
    label: "Location",
    value: "Karachi, Pakistan",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "BE Software Engineering, NED University",
  },
  {
    icon: Briefcase,
    label: "Current Role",
    value: "Senior Data Engineer @ Folio3",
  },
  {
    icon: Globe,
    label: "Work Preference",
    value: "Open to Remote",
  },
];

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
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="text-primary font-mono text-sm mb-4"
            >
              About Me
            </motion.p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              From frontend to data pipelines
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-6 text-muted text-lg leading-relaxed">
            <p>
              I started out as a frontend developer — React, TypeScript, GraphQL — building products for early-stage startups. At some point, I got more interested in the data behind the apps than the apps themselves. How it was collected, how it moved, how it turned into something useful. So I made the switch to data engineering and {"haven't"} looked back.
            </p>
            
            <p>
              These days I work mostly in the{" "}
              <span className="text-white font-medium">Microsoft Azure ecosystem</span> —{" "}
              <span className="text-white font-medium">Fabric</span>,{" "}
              <span className="text-white font-medium">ADF</span>,{" "}
              <span className="text-white font-medium">Databricks</span>,{" "}
              <span className="text-white font-medium">Power BI</span>. Building pipelines, modeling data, making sure the right people have the right numbers at the right time. The software background still shapes how I think — I approach data systems the way I used to approach software. Clean architecture, maintainability, not just making it work.
            </p>

            <p>
              {"If you're"} building something data-heavy or need someone who understands both the engineering and the product side — feel free to reach out.
            </p>
          </div>

          {/* Quick Facts Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickFacts.map((fact, index) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="p-5 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors"
              >
                <fact.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-xs text-muted uppercase tracking-wider mb-1">{fact.label}</p>
                <p className="text-sm text-white font-medium">{fact.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
