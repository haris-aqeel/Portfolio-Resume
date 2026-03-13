"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Database, BarChart3, Cloud, Code2, Bot, GitBranch, ArrowRight } from "lucide-react";
import { TechIcon } from "./TechIcon";

interface SkillGroup {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
  description: string;
}

const skillGroups: SkillGroup[] = [
  { title: "Data Engineering", icon: Database, color: "#FFA000", description: "Design and build scalable data pipelines and lakehouse architectures", skills: ["Azure Data Factory", "Azure Databricks", "PySpark", "Microsoft Fabric", "Delta Lake", "Medallion Architecture", "ETL/ELT Pipelines", "Azure SQL Data Warehouse", "Google BigQuery", "Looker Studio", "Data Modeling"] },
  { title: "Analytics & BI", icon: BarChart3, color: "#4285F4", description: "Transform raw data into actionable business intelligence", skills: ["Power BI", "DAX", "Excel", "Data Visualization", "Dynamics 365 F&O"] },
  { title: "Cloud Platforms", icon: Cloud, color: "#34A853", description: "Build and deploy on enterprise cloud infrastructure", skills: ["Microsoft Azure", "AWS (Amplify, Lambda, S3, CloudFront, Cognito)", "Google Cloud Platform", "Serverless Architecture", "Vercel"] },
  { title: "Full-Stack (Prior)", icon: Code2, color: "#EA4335", description: "End-to-end web application development experience", skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "Express.js", "MongoDB", "MySQL", "Firebase", "Redux", "REST APIs", "GraphQL"] },
  { title: "AI & Automation", icon: Bot, color: "#AB47BC", description: "Integrate AI models and automate workflows", skills: ["OpenAI Integration", "Microsoft Power Automate", "Chatbot Development", "Gemini/Bard Integration", "AI Model Integration"] },
  { title: "DevOps & Tools", icon: GitBranch, color: "#FF7043", description: "CI/CD and infrastructure tooling", skills: ["AWS CDK", "Git", "Docker (basic)", "CI/CD Deployment Pipelines"] },
];

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="relative section-light py-28 sm:py-36">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="section-label font-[family-name:var(--font-jetbrains)]">Expertise</span>
          <h2 className="heading-lg mt-4" style={{ color: "#1B1B1F" }}>Skills &amp; Technologies</h2>
          <p className="text-[#5F6368] mt-4 max-w-[540px] mx-auto text-[16px] leading-relaxed">
            Easily integrate your data stack with platforms and tools I work with every day.
          </p>
        </motion.div>

        {/* Firebase-style list layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border-b border-[#E8EAED] py-6 group cursor-default"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${group.color}15` }}>
                    <group.icon size={20} style={{ color: group.color }} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold" style={{ color: "#1B1B1F" }}>{group.title}</h3>
                    <p className="text-[13px] text-[#5F6368]">{group.description}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-[#9AA0A6] group-hover:text-[#FFA000] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>

              <div className="flex flex-wrap gap-2 pl-[52px]">
                {group.skills.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] bg-[#F1F3F4] text-[#5F6368] font-[family-name:var(--font-jetbrains)] hover:bg-[#E8EAED] hover:text-[#1B1B1F] transition-all">
                    <TechIcon name={skill} size={11} />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
