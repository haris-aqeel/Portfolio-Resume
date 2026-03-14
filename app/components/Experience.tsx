"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Calendar, Briefcase, ArrowRight } from "lucide-react";
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
    company: "Folio3 Software", location: "Karachi, Pakistan", type: "On-site",
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
    skills: ["Microsoft Fabric", "Azure Data Factory", "Azure Databricks", "Power BI", "PySpark", "SQL", "Google BigQuery", "Looker Studio"],
  },
  {
    company: "FlipIQ", location: "United States · Remote", type: "Contract",
    roles: [{ title: "Full-Stack Developer", period: "2024 – 2025" }],
    achievements: ["Full-stack development of web application features", "End-to-end implementation from frontend UI to backend services"],
    skills: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    company: "Connect4Healing, Inc.", location: "United States · Remote", type: "Contract",
    roles: [{ title: "Frontend Developer", period: "Sep 2023 – Jan 2024" }],
    achievements: ["Built HIPAA-compliant telehealth UI with React + Material-UI", "Integrated FullCalendar.io for appointment scheduling", "Implemented Vonage API for real-time video conferencing", "AWS backend integration (.NET Framework APIs)", "Firebase real-time database, SendGrid & Twilio notifications"],
    skills: ["React", "MUI", "Firebase", "AWS", "Vonage"],
  },
  {
    company: "PrivacyLabs", location: "Remote", type: "Freelance",
    roles: [{ title: "Full-Stack Developer", period: "Jan 2022 – Sep 2023" }],
    achievements: ["Led MVP development for privacy-focused web apps (React.js + Node.js)", "Implemented GDPR-aligned data encryption and security protocols", "Achieved 30% reduction in load times through code refactoring", "Collaborated with UI/UX designers to ship interactive features"],
    skills: ["React.js", "Node.js", "GDPR", "Encryption"],
  },
  {
    company: "Aciano Technologies", location: "Karachi", type: "Part-time",
    roles: [{ title: "Software Engineer", period: "Jan 2022 – Jun 2022" }],
    achievements: ["Transformed Figma designs into React Native mobile app", "Integrated Redux Persist for state management", "REST API integration"],
    skills: ["React Native", "Redux", "REST APIs"],
  },
  {
    company: "Worktrim", location: "United States · Remote", type: "Contract",
    roles: [{ title: "Frontend Engineer", period: "Feb 2021 – Apr 2021" }],
    achievements: ["React.js components from Figma designs (Material-UI v4)", "JWT/Bearer auth, Formik + Yup form validation"],
    skills: ["React.js", "Material-UI", "JWT", "Formik"],
  },
  {
    company: "Upwork", location: "Remote · Worldwide", type: "Freelance",
    roles: [{ title: "Full-Stack Developer", period: "Jan 2020 – Present" }],
    achievements: [
      "Top Rated Plus freelancer with 100% Job Success Score across 47+ projects",
      "Built AI map-based recommendation platform with Next.js, Supabase, and OpenAI API",
      "Redeveloped Old West Temecula travel site in Next.js with Turbopack and Vercel",
      "Automated email follow-ups using Power Automate, Zapier, and ChatGPT API",
      "Delivered full-stack web apps for clients in healthcare, real estate, SaaS, and e-commerce",
      "Long-term contracts including $25K+ engagement (817 hrs) for a React-based platform",
    ],
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Python", "AWS", "Firebase"],
  },
];

function JobCard({ job, index }: { job: Job; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-white/[0.06] last:border-0 py-8 first:pt-0 group"
    >
      <div className="flex items-start gap-4">
        <CompanyLogo company={job.company} size={48} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[18px] font-bold text-white">{job.company}</h3>
              <div className="flex items-center gap-2 mt-1 text-[13px] text-[#9AA0A6]">
                <MapPin size={12} />
                <span>{job.location}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium premium-tag">{job.type}</span>
              </div>
            </div>
            <ArrowRight size={18} className="text-[#9AA0A6] opacity-0 group-hover:opacity-100 group-hover:text-[#FFA000] transition-all mt-1 shrink-0" />
          </div>

          {job.roles.map((role) => (
            <div key={role.period} className="flex items-center gap-2 mt-3 text-[14px]">
              <Briefcase size={13} className="text-[#FFA000]" />
              <span className="text-white font-semibold">{role.title}</span>
              <span className="text-[#9AA0A6] text-[12px] flex items-center gap-1">
                <Calendar size={10} />
                {role.period}
              </span>
            </div>
          ))}

          <ul className="mt-4 space-y-2">
            {job.achievements.map((a, i) => (
              <li key={i} className="text-[14px] text-[#9AA0A6] flex items-start gap-2.5 leading-relaxed">
                <span className="mt-2 flex-shrink-0 w-[5px] h-[5px] rounded-full bg-[#FFA000]/50" />
                {a}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {job.skills.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] text-[11px] text-[#9AA0A6] font-[family-name:var(--font-jetbrains)] hover:bg-white/[0.08] hover:text-white transition-all">
                <TechIcon name={s} size={10} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative pt-28 sm:pt-36 pb-12 sm:pb-16">
      <div className="section-divider" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-28">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <span className="section-label font-[family-name:var(--font-jetbrains)]">Career</span>
          <h2 className="heading-lg mt-4 max-w-[600px]">
            From freelance frontend to{" "}
            <span className="gradient-text">senior data engineering.</span>
          </h2>
        </motion.div>

        <div className="max-w-[820px]">
          {jobs.map((job, i) => (
            <JobCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
