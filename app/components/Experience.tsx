"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface Job {
  company: string;
  url?: string;
  roles: { title: string; period: string }[];
  achievements: string[];
  skills: string[];
}

const jobs: Job[] = [
  {
    company: "Folio3 Software",
    url: "https://folio3.com",
    roles: [
      { title: "Senior Data Engineer", period: "Jan 2026 - Present" },
      { title: "Data Engineer", period: "Aug 2023 - Dec 2025" },
    ],
    achievements: [
      "Built ETL pipelines with Azure Data Factory + PySpark in Databricks handling large data volumes daily",
      "Implemented Medallion Architecture (Raw to Bronze to Silver to Gold) using Delta Tables in Databricks",
      "Created views in Azure SQL Data Warehouse powering Power BI reports",
      "Developed DAX-driven reports in Power BI and Excel for data analysis",
      "Pulled data from Dynamics 365 Finance & Operations via pipelines into Fabric environment",
      "Utilized deployment pipelines to promote resources across workspaces/environments",
    ],
    skills: ["Microsoft Fabric", "Azure Data Factory", "Databricks", "Power BI", "PySpark", "SQL"],
  },
  {
    company: "Connect4Healing, Inc.",
    roles: [{ title: "Frontend Developer", period: "Sep 2023 - Jan 2024" }],
    achievements: [
      "Built HIPAA-compliant telehealth UI with React + Material-UI",
      "Integrated FullCalendar.io for appointment scheduling",
      "Implemented Vonage API for real-time video conferencing",
      "AWS backend integration with .NET Framework APIs",
    ],
    skills: ["React", "Material-UI", "Firebase", "AWS", "Vonage"],
  },
  {
    company: "PrivacyLabs",
    roles: [{ title: "Full-Stack Developer", period: "Jan 2022 - Sep 2023" }],
    achievements: [
      "Led MVP development for privacy-focused web apps (React.js + Node.js)",
      "Implemented GDPR-aligned data encryption and security protocols",
      "Achieved 30% reduction in load times through code refactoring",
      "Collaborated with UI/UX designers to ship interactive features",
    ],
    skills: ["React.js", "Node.js", "GDPR", "Encryption"],
  },
  {
    company: "Aciano Technologies",
    roles: [{ title: "Software Engineer", period: "Jan 2022 - Jun 2022" }],
    achievements: [
      "Transformed Figma designs into React Native mobile app",
      "Integrated Redux Persist for state management",
      "REST API integration and optimization",
    ],
    skills: ["React Native", "Redux", "REST APIs"],
  },
  {
    company: "Worktrim",
    roles: [{ title: "Frontend Engineer", period: "Feb 2021 - Apr 2021" }],
    achievements: [
      "Built React.js components from Figma designs using Material-UI v4",
      "Implemented JWT/Bearer auth with Formik + Yup form validation",
    ],
    skills: ["React.js", "Material-UI", "JWT", "Formik"],
  },
  {
    company: "Freelance",
    roles: [{ title: "Web Developer", period: "Jan 2020 - Jan 2021" }],
    achievements: [
      "Early freelance work building React applications for international clients on Upwork and Fiverr",
    ],
    skills: ["React", "JavaScript", "HTML/CSS"],
  },
];

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              <span className="text-primary font-mono text-xl mr-2">02.</span>
              Where I've Worked
            </h2>
            <div className="h-px flex-1 bg-slate-700/50 max-w-xs" />
          </div>

          {/* Tabs Layout */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Tab List */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l-2 border-slate-700/50 -mb-px md:mb-0">
              {jobs.map((job, index) => (
                <button
                  key={job.company}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-5 py-3 text-sm font-mono whitespace-nowrap text-left transition-all ${
                    activeTab === index
                      ? "text-primary bg-slate-800/30"
                      : "text-muted hover:text-slate-100 hover:bg-slate-800/20"
                  }`}
                >
                  {/* Active indicator */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-0.5 md:w-0.5 bg-primary transition-all ${
                      activeTab === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {job.company}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-[400px]">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: activeTab === index ? 1 : 0,
                    y: activeTab === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${activeTab === index ? "block" : "hidden"}`}
                >
                  {/* Role Title */}
                  {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className={roleIndex > 0 ? "mt-6" : ""}>
                      <h3 className="text-lg font-medium text-slate-100">
                        {role.title}
                        <span className="text-primary">
                          {" @ "}
                          {job.url ? (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline inline-flex items-center gap-1"
                            >
                              {job.company}
                              <ExternalLink size={14} />
                            </a>
                          ) : (
                            job.company
                          )}
                        </span>
                      </h3>
                      <p className="text-sm font-mono text-muted mt-1">
                        {role.period}
                      </p>
                    </div>
                  ))}

                  {/* Achievements */}
                  <ul className="mt-6 space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex gap-3 text-muted text-sm leading-relaxed">
                        <span className="text-primary mt-1.5 flex-shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                            <path d="M0 4L4 0L8 4L4 8L0 4Z" />
                          </svg>
                        </span>
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
