"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { CompanyLogo, TechIcon } from "./TechIcon";

interface Job {
  company: string;
  location: string;
  type: string;
  roles: { title: string; period: string }[];
  achievements: string[];
  skills: string[];
}

const jobs: Job[] = [
  {
    company: "Folio3 Software",
    location: "Karachi, Pakistan",
    type: "On-site",
    roles: [
      { title: "Senior Data Engineer", period: "Jan 2026 – Present" },
      { title: "Data Engineer", period: "Aug 2023 – Dec 2025" },
    ],
    achievements: [
      "Built ETL pipelines with Azure Data Factory + PySpark in Databricks handling large data volumes daily",
      "Implemented Medallion Architecture (Raw → Bronze → Silver → Gold) using Delta Tables in Databricks",
      "Created views in Azure SQL Data Warehouse powering Power BI reports",
      "Developed DAX-driven reports in Power BI and Excel for data analysis",
      "Pulled data from Dynamics 365 Finance & Operations via pipelines into Fabric environment",
      "Utilized deployment pipelines to promote resources across workspaces/environments",
    ],
    skills: [
      "Microsoft Fabric",
      "Azure Data Factory",
      "Azure Databricks",
      "Power BI",
      "PySpark",
      "SQL",
      "Google BigQuery",
      "Looker Studio",
    ],
  },
  {
    company: "Connect4Healing, Inc.",
    location: "United States · Remote",
    type: "Contract",
    roles: [{ title: "Frontend Developer", period: "Sep 2023 – Jan 2024" }],
    achievements: [
      "Built HIPAA-compliant telehealth UI with React + Material-UI",
      "Integrated FullCalendar.io for appointment scheduling",
      "Implemented Vonage API for real-time video conferencing",
      "AWS backend integration (.NET Framework APIs)",
      "Firebase real-time database, SendGrid & Twilio notifications",
    ],
    skills: ["React", "MUI", "Firebase", "AWS", "Vonage"],
  },
  {
    company: "PrivacyLabs",
    location: "Remote",
    type: "Freelance",
    roles: [
      { title: "Full-Stack Developer", period: "Jan 2022 – Sep 2023" },
    ],
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
    location: "Karachi",
    type: "Part-time",
    roles: [{ title: "Software Engineer", period: "Jan 2022 – Jun 2022" }],
    achievements: [
      "Transformed Figma designs into React Native mobile app",
      "Integrated Redux Persist for state management",
      "REST API integration",
    ],
    skills: ["React Native", "Redux", "REST APIs"],
  },
  {
    company: "Worktrim",
    location: "United States · Remote",
    type: "Contract",
    roles: [{ title: "Frontend Engineer", period: "Feb 2021 – Apr 2021" }],
    achievements: [
      "React.js components from Figma designs (Material-UI v4)",
      "JWT/Bearer auth, Formik + Yup form validation",
    ],
    skills: ["React.js", "Material-UI", "JWT", "Formik"],
  },
  {
    company: "Upwork / Fiverr",
    location: "Freelance",
    type: "Freelance",
    roles: [
      {
        title: "Web Developer / Frontend Developer",
        period: "Jan 2020 – Jan 2021",
      },
    ],
    achievements: [
      "Early freelance work building React applications for international clients",
    ],
    skills: ["React", "JavaScript", "HTML/CSS"],
  },
];

function TimelineCard({ job, index }: { job: Job; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-6 md:gap-0">
      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-10">
        <div className="w-3 h-3 rounded-full bg-[#0071E3] ring-[6px] ring-black shadow-[0_0_15px_rgba(0,113,227,0.4)]" />
      </div>

      {/* Mobile dot */}
      <div className="md:hidden flex-shrink-0 mt-8">
        <div className="w-3 h-3 rounded-full bg-[#0071E3] ring-4 ring-black" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`flex-1 md:w-[calc(50%-2rem)] ${
          isLeft ? "md:mr-auto md:pr-14" : "md:ml-auto md:pl-14"
        }`}
      >
        <div className="bento-card p-6">
          {/* Company Header */}
          <div className="flex items-center gap-3 mb-4">
            <CompanyLogo company={job.company} size={44} />
            <div>
              <h3 className="text-[17px] font-semibold text-[#F5F5F7]">
                {job.company}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-[12px] text-[#86868B]">
                <MapPin size={11} />
                <span>{job.location}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[10px] font-medium text-[#86868B]">
                  {job.type}
                </span>
              </div>
            </div>
          </div>

          {/* Roles */}
          {job.roles.map((role) => (
            <div
              key={role.period}
              className="flex items-center gap-2 mb-2 text-[14px]"
            >
              <Briefcase size={13} className="text-[#2997FF]" />
              <span className="text-[#F5F5F7] font-medium">{role.title}</span>
              <span className="text-[#86868B] text-[12px] flex items-center gap-1">
                <Calendar size={10} />
                {role.period}
              </span>
            </div>
          ))}

          {/* Achievements */}
          <ul className="mt-4 space-y-2">
            {job.achievements.map((a, i) => (
              <li
                key={i}
                className="text-[14px] text-[#86868B] flex items-start gap-2.5 leading-relaxed"
              >
                <span className="mt-2 flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#2997FF]/50" />
                {a}
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {job.skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] text-[#86868B] font-[family-name:var(--font-jetbrains)] hover:bg-white/[0.08] hover:text-[#F5F5F7] transition-all duration-200"
              >
                <TechIcon name={s} size={10} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative py-28 sm:py-36">
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
            Career
          </span>
          <h2 className="heading-lg text-[#F5F5F7] mt-4">
            Work Experience
          </h2>
          <p className="text-[#86868B] mt-4 max-w-[520px] mx-auto text-[16px] leading-relaxed">
            From freelance frontend to senior data engineering — a journey across
            startups, enterprises, and everything in between.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0071E3]/40 via-white/[0.06] to-transparent" />
          <div className="md:hidden absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-[#0071E3]/40 via-white/[0.06] to-transparent" />

          <div className="space-y-6 md:space-y-10">
            {jobs.map((job, i) => (
              <TimelineCard key={job.company} job={job} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
