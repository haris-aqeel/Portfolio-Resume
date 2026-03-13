"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Calendar } from "lucide-react";
import { IssuerIcon } from "./TechIcon";

interface Cert {
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  active?: boolean;
}

const certs: Cert[] = [
  {
    name: "Fabric Data Engineer Associate",
    issuer: "Microsoft",
    date: "May 2025",
    expires: "May 2026",
    active: true,
  },
  {
    name: "Fabric Analytics Engineer Associate",
    issuer: "Microsoft",
    date: "Dec 2024",
    expires: "Dec 2027",
    active: true,
  },
  {
    name: "Azure Data Fundamentals",
    issuer: "Microsoft",
    date: "May 2024",
    active: true,
  },
  {
    name: "BTA Certified Blockchain Business Foundations",
    issuer: "Blockchain Training Alliance",
    date: "Nov 2021",
  },
  {
    name: "Introduction to Programming Using JavaScript",
    issuer: "Microsoft",
    date: "Dec 2020",
  },
  {
    name: "React.js Essential Training",
    issuer: "LinkedIn",
    date: "Oct 2020",
  },
  {
    name: "Getting Started with Google Kubernetes Engine",
    issuer: "Coursera",
    date: "Aug 2020",
  },
  {
    name: "Networking Academy Learn-A-Thon",
    issuer: "Cisco",
    date: "2021-2022",
  },
];

const activeCerts = certs.filter((c) => c.active);
const otherCerts = certs.filter((c) => !c.active);

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-24 lg:py-32 bg-surface/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-primary font-mono text-sm mb-4">Credentials</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Certifications & Badges
            </h2>
          </div>

          {/* Active Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 max-w-4xl mx-auto">
            {activeCerts.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-primary/30 bg-primary/5 overflow-hidden"
              >
                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

                {/* Active Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Award size={16} className="text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Active
                  </span>
                </div>

                {/* Cert Name */}
                <h3 className="text-base font-semibold text-white leading-snug mb-4">
                  {cert.name}
                </h3>

                {/* Issuer */}
                <div className="flex items-center gap-2 mb-3">
                  <IssuerIcon issuer={cert.issuer} size={18} />
                  <span className="text-sm text-muted">{cert.issuer}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <Calendar size={12} />
                  <span>{cert.date}</span>
                  {cert.expires && (
                    <>
                      <span className="text-border">-</span>
                      <span>{cert.expires}</span>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {otherCerts.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center flex-shrink-0">
                    <IssuerIcon issuer={cert.issuer} size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-white leading-snug line-clamp-2">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-muted mt-1.5 font-mono">
                      {cert.issuer} - {cert.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
