"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TechIcon } from "./TechIcon";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Data Engineering",
    skills: [
      "Microsoft Fabric",
      "Azure Data Factory",
      "Azure Databricks",
      "PySpark",
      "Delta Lake",
      "Azure SQL Data Warehouse",
      "Google BigQuery",
      "Looker Studio",
    ],
  },
  {
    name: "Analytics & BI",
    skills: [
      "Power BI",
      "DAX",
      "Excel",
      "Dynamics 365 F&O",
    ],
  },
  {
    name: "Cloud Platforms",
    skills: [
      "Microsoft Azure",
      "AWS",
      "Google Cloud Platform",
      "Vercel",
    ],
  },
  {
    name: "Programming",
    skills: [
      "Python",
      "SQL",
      "TypeScript",
      "JavaScript",
      "React.js",
      "Next.js",
      "Node.js",
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      "Git",
      "Docker (basic)",
      "AWS CDK",
      "REST APIs",
      "GraphQL",
    ],
  },
];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              <span className="text-primary font-mono text-xl mr-2">03.</span>
              Skills & Technologies
            </h2>
            <div className="h-px flex-1 bg-slate-700/50 max-w-xs" />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="premium-card p-6"
              >
                <h3 className="text-sm font-semibold text-slate-100 mb-4">
                  {category.name}
                </h3>
                <ul className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <span className="text-primary flex-shrink-0">
                        <TechIcon name={skill} size={16} />
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-sm font-semibold text-slate-100 mb-6">
              Active Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Fabric Data Engineer Associate",
                "Fabric Analytics Engineer Associate",
                "Azure Data Fundamentals",
              ].map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 text-sm text-slate-100"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {cert}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
