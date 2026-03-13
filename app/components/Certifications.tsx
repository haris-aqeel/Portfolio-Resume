"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Calendar } from "lucide-react";
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
    name: "Networking Academy Learn-A-Thon 2021 & 2022",
    issuer: "Cisco",
    date: "2021\u20132022",
  },
];

const activeCerts = certs.filter((c) => c.active);
const otherCerts = certs.filter((c) => !c.active);

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-[family-name:var(--font-jetbrains)] text-[#6366f1] tracking-wider uppercase">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Certifications & <span className="gradient-text">Badges</span>
          </h2>
        </motion.div>

        {/* ── Featured: Active Certifications ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {activeCerts.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-5 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/5 via-zinc-900 to-zinc-900 overflow-hidden transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              {/* Subtle top glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              {/* Active badge */}
              <div className="flex items-center gap-1.5 mb-3">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">
                  Active Certification
                </span>
              </div>

              {/* Cert name */}
              <h3 className="text-base font-bold text-zinc-100 leading-snug mb-3">
                {cert.name}
              </h3>

              {/* Issuer */}
              <div className="flex items-center gap-2 mb-3">
                <IssuerIcon issuer={cert.issuer} size={20} />
                <span className="text-sm text-zinc-400 font-medium">
                  {cert.issuer}
                </span>
              </div>

              {/* Date info */}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-[family-name:var(--font-jetbrains)]">
                <Calendar size={10} />
                <span>{cert.date}</span>
                {cert.expires && (
                  <>
                    <span className="text-zinc-700">&middot;</span>
                    <span>Expires {cert.expires}</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Other Certifications ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherCerts.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <IssuerIcon issuer={cert.issuer} size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-zinc-200 leading-snug">
                  {cert.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-500">{cert.issuer}</span>
                  <span className="text-zinc-700">&middot;</span>
                  <span className="text-[11px] text-zinc-600 font-[family-name:var(--font-jetbrains)]">
                    {cert.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
