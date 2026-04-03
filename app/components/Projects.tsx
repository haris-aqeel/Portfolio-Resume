"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink } from "lucide-react";
import { TechIcon } from "./TechIcon";
import Image from "next/image";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  skills: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: "Enterprise Fabric Data Platform",
    category: "Data Engineering",
    description:
      "Designed and implemented end-to-end Microsoft Fabric data platform for enterprise client. Built Medallion Architecture (Bronze/Silver/Gold) over OneLake, ADF pipelines integrating Dynamics 365 F&O and Google Analytics via BigQuery, Power BI semantic models with Direct Lake mode, and Azure DevOps deployment pipelines across Dev/Test/Prod workspaces.",
    image: "/images/adf_pipeline_final.png",
    color: "#FFA000",
    skills: ["Microsoft Fabric", "ADF", "Power BI", "D365 F&O", "BigQuery", "Medallion Architecture", "Azure DevOps"],
  },
  {
    title: "Email Automation",
    category: "AI · Data",
    description:
      "Automated email follow-up system using Power Automate and ChatGPT API. Triggers on new emails, analyzes response delays, and drafts personalized follow-ups via AWS Lambda and Zapier.",
    image: "/images/image9_zapier_flow.png",
    color: "#EA4335",
    skills: ["Power Automate", "ChatGPT API", "AWS Lambda", "Zapier"],
  },
  {
    title: "10recs",
    category: "Full-Stack · AI",
    description:
      "AI map-based recommendation platform integrating Google Maps, Google Places API, and OpenAI API. Built with Next.js, Supabase for real-time backend, and Clerk for authentication.",
    image: "/images/image7_dubai_map.png",
    color: "#4285F4",
    skills: ["Next.js", "Supabase", "Google Maps API", "OpenAI API"],
    link: "https://10recs.com",
  },
  {
    title: "Summit Navigator",
    category: "Full-Stack · Real-Time",
    description:
      "Live traffic information platform for Cajon Pass featuring real-time camera feeds, interactive Google Maps with traffic overlays, road alerts & hazard reporting, nearby gas stations and restaurants with ratings — all with auto-refreshing live data.",
    image: "/images/image10_cajonpass2.png",
    color: "#34A853",
    skills: ["Next.js", "Google Maps API", "Google Places API", "Vercel"],
    link: "https://summitnavigator.vercel.app/",
  },
  {
    title: "PrivacyLabs",
    category: "Web Design",
    description:
      "Privacy-focused web application with GDPR-aligned data encryption and security protocols. Led full MVP development from scratch.",
    image: "/images/image2_privacylabs.png",
    color: "#34A853",
    skills: ["React.js", "Node.js", "GDPR", "Encryption"],
    link: "https://privacylabs.ai/",
  },
  {
    title: "Eshterakat",
    category: "Web Development",
    description:
      "Full-stack web development project delivering a polished, responsive platform with modern UI/UX and robust backend integration.",
    image: "/images/image3_eshterakat.png",
    color: "#4285F4",
    skills: ["React", "TypeScript", "Node.js"],
    link: "https://www.eshterakaat.com/",
  },
  {
    title: "Mijulo",
    category: "SaaS Product",
    description:
      "SaaS product development initiative — built the core product features, user flows, and scalable frontend architecture.",
    image: "/images/image4_mijulo.png",
    color: "#FFA000",
    skills: ["React", "GraphQL", "TypeScript"],
    link: "https://www.mijulo.com/",
  },
  {
    title: "AI Recipe Creator",
    category: "Marketing & AI",
    description:
      "AI-powered recipe generation application combining marketing strategy with intelligent content creation.",
    image: "/images/image5_recipesai.png",
    color: "#EA4335",
    skills: ["React", "AI/ML", "Node.js"],
    link: "https://recipes.ai/",
  },
  {
    title: "Notch",
    category: "Development",
    description:
      "Development project focused on delivering a clean, performant application with attention to detail and user experience.",
    image: "/images/image6_notch.png",
    color: "#9C27B0",
    skills: ["React", "JavaScript", "REST APIs"],
    link: "https://notchhub.vercel.app/",
  },
  {
    title: "Old West Temecula",
    category: "Frontend",
    description:
      "Fully responsive travel website built with Next.js and Turbopack. Sleek UI with optimized images, CMS integration, Resend for emails, SEO audit, and Vercel deployment.",
    image: "/images/image8_oldwest.png",
    color: "#FFA000",
    skills: ["Next.js", "Vercel", "Responsive Design", "SEO"],
    link: "https://www.oldwesttemecula.com/",
  },
];

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="section-divider" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-28">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label font-[family-name:var(--font-jetbrains)]">
            Projects
          </span>
          <h2 className="heading-lg mt-4 max-w-[600px]">
            Things I&apos;ve{" "}
            <span className="gradient-text">built.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="bento-card group cursor-pointer overflow-hidden block"
            >
              {/* Image with hover overlay */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay with description */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1F] via-[#1B1B1F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <p className="text-[13px] text-[#E8EAED] leading-[1.7] mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-white font-[family-name:var(--font-jetbrains)]"
                      >
                        <TechIcon name={s} size={9} />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title bar below image */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-bold text-white">
                    {project.title}
                  </h3>
                  <span
                    className="text-[11px] font-medium uppercase tracking-wider font-[family-name:var(--font-jetbrains)]"
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </span>
                </div>
                <ExternalLink
                  size={16}
                  className="text-[#9AA0A6] opacity-0 group-hover:opacity-100 group-hover:text-[#FFA000] transition-all"
                />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-[14px] text-[#9AA0A6] mt-10"
        >
          ...and <span className="text-white font-semibold">40+ more</span> delivered to clients worldwide.
        </motion.p>
      </div>
    </section>
  );
}
