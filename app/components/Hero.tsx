"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/haris-aqeel",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/haris-aqeel/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:haris@placeholder.com",
    icon: Mail,
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="section-container w-full py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column - Fixed Navigation Hint */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col justify-between">
            <div>
              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100"
              >
                Haris Aqeel
              </motion.h1>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl font-medium text-primary mt-3"
              >
                Senior Data Engineer
              </motion.h2>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base text-muted mt-4 max-w-sm leading-relaxed"
              >
                I build scalable data platforms and pipelines that transform raw data into actionable insights.
              </motion.p>

              {/* Navigation Links */}
              <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden lg:flex flex-col gap-3 mt-12"
              >
                {[
                  { label: "ABOUT", href: "#about" },
                  { label: "EXPERIENCE", href: "#experience" },
                  { label: "SKILLS", href: "#skills" },
                  { label: "TESTIMONIALS", href: "#testimonials" },
                  { label: "CONTACT", href: "#contact" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-4 text-xs font-medium tracking-widest text-muted hover:text-slate-100 transition-colors"
                  >
                    <span className="h-px w-8 bg-muted group-hover:w-16 group-hover:bg-slate-100 transition-all duration-300" />
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-5 mt-8 lg:mt-0"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={22} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Bio Content */}
          <div className="lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-muted leading-relaxed"
            >
              <p>
                {"I'm"} a developer passionate about crafting robust, scalable data infrastructure that blends thoughtful architecture with engineering excellence. My favorite work lies at the intersection of data engineering and software development, creating systems that not only perform well but are meticulously built for maintainability and growth.
              </p>

              <p>
                Currently, {"I'm"} a Senior Data Engineer at{" "}
                <a
                  href="https://folio3.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-100 hover:text-primary transition-colors font-medium"
                >
                  Folio3 Software
                </a>
                , specializing in the Microsoft ecosystem. I build end-to-end data platforms using{" "}
                <span className="text-slate-100">Microsoft Fabric</span>,{" "}
                <span className="text-slate-100">Azure Databricks</span>, and{" "}
                <span className="text-slate-100">Power BI</span> — from lakehouse architecture and real-time pipelines to governed semantic layers.
              </p>

              <p>
                In the past, {"I've"} had the opportunity to develop software across a variety of settings — from{" "}
                <span className="text-slate-100">early-stage startups</span> and{" "}
                <span className="text-slate-100">freelance consulting</span> to{" "}
                <span className="text-slate-100">enterprise organizations</span>.
                My journey started in frontend development with React and TypeScript, which continues to shape how I approach data systems today — with clean architecture, testability, and user-centric thinking.
              </p>

              <p>
                When {"I'm"} not building data pipelines, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
              </p>
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 group"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                <span className="text-sm text-muted group-hover:text-slate-100 transition-colors">
                  Available for new opportunities
                </span>
                <ExternalLink size={14} className="text-muted group-hover:text-primary transition-colors" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
