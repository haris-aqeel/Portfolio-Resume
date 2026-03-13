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
import { useRef } from "react";
import { TechIcon } from "./TechIcon";

interface SkillGroup {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Data Engineering",
    icon: Database,
    color: "#6366f1",
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
    color: "#22d3ee",
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
    color: "#a78bfa",
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
    color: "#f472b6",
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
    color: "#34d399",
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
    color: "#fb923c",
    skills: [
      "AWS CDK",
      "Git",
      "Docker (basic)",
      "CI/CD Deployment Pipelines",
    ],
  },
];

const timeline = [
  { year: "2020", label: "Freelance Frontend", color: "#f472b6" },
  { year: "2022", label: "Full-Stack", color: "#a78bfa" },
  { year: "2023", label: "Data Engineering", color: "#22d3ee" },
  { year: "2026", label: "Senior DE", color: "#6366f1" },
];

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-5 rounded-xl border border-[#222222] bg-[#111111] card-hover"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${group.color}15` }}
        >
          <group.icon size={18} style={{ color: group.color }} />
        </div>
        <h3 className="text-sm font-semibold text-[#f4f4f5]">{group.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-[#1a1a1a] border border-[#222222] text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#333] transition-colors duration-200 font-[family-name:var(--font-jetbrains)]"
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
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-[family-name:var(--font-jetbrains)] text-[#6366f1] tracking-wider uppercase">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-[#71717a] mt-3 max-w-xl mx-auto text-sm">
            A cross-functional skill set spanning data engineering, cloud
            platforms, analytics, and full-stack development.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-center text-sm font-semibold text-[#71717a] mb-8">
            Timeline of My Tech Evolution
          </h3>
          <div
            ref={scrollRef}
            className="flex items-center justify-center gap-0 overflow-x-auto pb-4"
          >
            {timeline.map((item, i) => (
              <div key={item.year} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.year.slice(-2)}
                  </div>
                  <span className="text-[11px] text-[#71717a] mt-2 font-[family-name:var(--font-jetbrains)]">
                    {item.year}
                  </span>
                  <span className="text-[10px] text-[#a1a1aa] mt-0.5 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                {i < timeline.length - 1 && (
                  <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-[#222222] via-[#333333] to-[#222222] mx-3" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
