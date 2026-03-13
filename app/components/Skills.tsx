"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TechIcon } from "./TechIcon";
import { Award } from "lucide-react";

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

const certifications = [
  "Fabric Data Engineer Associate",
  "Fabric Analytics Engineer Associate", 
  "Azure Data Fundamentals",
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
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="text-primary font-mono text-sm mb-4"
            >
              Skills & Technologies
            </motion.p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Tools I work with
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-colors"
              >
                <h3 className="text-base font-semibold text-white mb-5">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-muted"
                    >
                      <span className="flex-shrink-0 text-primary">
                        <TechIcon name={skill} size={18} />
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-white">
                Active Certifications
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-white">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
