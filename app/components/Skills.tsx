"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Database,
  BarChart3,
  Cloud,
  Code2,
  Bot,
  GitBranch,
} from "lucide-react";
import { TechIcon } from "./TechIcon";

interface SkillGroup {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
  span?: string;
}

const skillGroups: SkillGroup[] = [
  {
    title: "Data Engineering",
    icon: Database,
    color: "#2997FF",
    span: "lg:col-span-2",
    skills: [
      "Azure Data Factory",
      "Azure Databricks",
      "PySpark",
      "Microsoft Fabric",
      "Delta Lake",
      "Medallion Architecture",
      "ETL/ELT Pipelines",
      "Azure SQL Data Warehouse",
      "Google BigQuery",
      "Looker Studio",
      "Data Modeling",
    ],
  },
  {
    title: "Analytics & BI",
    icon: BarChart3,
    color: "#BF5AF2",
    skills: [
      "Power BI",
      "DAX",
      "Excel",
      "Data Visualization",
      "Dynamics 365 F&O",
    ],
  },
  {
    title: "Cloud Platforms",
    icon: Cloud,
    color: "#FF9F0A",
    skills: [
      "Microsoft Azure",
      "AWS (Amplify, Lambda, S3, CloudFront, Cognito)",
      "Google Cloud Platform",
      "Serverless Architecture",
      "Vercel",
    ],
  },
  {
    title: "Full-Stack (Prior)",
    icon: Code2,
    color: "#FF375F",
    span: "lg:col-span-2",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Python",
      "Express.js",
      "MongoDB",
      "MySQL",
      "Firebase",
      "Redux",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    title: "AI & Automation",
    icon: Bot,
    color: "#30D158",
    skills: [
      "OpenAI Integration",
      "Microsoft Power Automate",
      "Chatbot Development",
      "Gemini/Bard Integration",
      "AI Model Integration",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: GitBranch,
    color: "#FF9F0A",
    skills: [
      "AWS CDK",
      "Git",
      "Docker (basic)",
      "CI/CD Deployment Pipelines",
    ],
  },
];

const timeline = [
  { year: "2020", label: "Freelance", color: "#FF375F" },
  { year: "2022", label: "Full-Stack", color: "#BF5AF2" },
  { year: "2023", label: "Data Eng", color: "#2997FF" },
  { year: "2026", label: "Senior DE", color: "#0071E3" },
];

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`bento-card p-6 ${group.span || ""}`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${group.color}12` }}
        >
          <group.icon size={20} style={{ color: group.color }} />
        </div>
        <h3 className="text-[15px] font-semibold text-[#F5F5F7]">
          {group.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] bg-white/[0.04] text-[#86868B] hover:text-[#F5F5F7] hover:bg-white/[0.08] transition-all duration-300 font-[family-name:var(--font-jetbrains)]"
          >
            <TechIcon name={skill} size={12} />
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="section-divider" />

      <div className="max-w-[1120px] mx-auto px-6 pt-28">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-label font-[family-name:var(--font-jetbrains)]">
            Expertise
          </span>
          <h2 className="heading-lg text-[#F5F5F7] mt-4">
            Skills &amp; Technologies
          </h2>
          <p className="text-[#86868B] mt-4 max-w-[520px] mx-auto text-[16px] leading-relaxed">
            A cross-functional skill set spanning data engineering, cloud
            platforms, analytics, and full-stack development.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="flex items-center justify-center gap-0 overflow-x-auto pb-4">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-[13px] font-bold text-white"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 25px ${item.color}30`,
                    }}
                  >
                    &apos;{item.year.slice(-2)}
                  </div>
                  <span className="text-[12px] text-[#86868B] mt-3 font-[family-name:var(--font-jetbrains)]">
                    {item.label}
                  </span>
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] mx-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
