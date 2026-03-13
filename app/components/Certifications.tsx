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
    <section className="relative py-28 sm:py-36">
      <div className="section-divider" />

      <div className="max-w-[1120px] mx-auto px-6 pt-28">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label font-[family-name:var(--font-jetbrains)]">
            Credentials
          </span>
          <h2 className="heading-lg text-[#F5F5F7] mt-4">
            Certifications
          </h2>
        </motion.div>

        {/* Featured Active Certs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {activeCerts.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bento-card p-6 overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2997FF]/30 to-transparent" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-[radial-gradient(ellipse,rgba(41,151,255,0.06)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-1.5 mb-4">
                  <ShieldCheck size={14} className="text-[#30D158]" />
                  <span className="text-[10px] text-[#30D158] font-semibold uppercase tracking-[0.15em]">
                    Active
                  </span>
                </div>

                <h3 className="text-[16px] font-semibold text-[#F5F5F7] leading-snug mb-4">
                  {cert.name}
                </h3>

                <div className="flex items-center gap-2.5 mb-3">
                  <IssuerIcon issuer={cert.issuer} size={22} />
                  <span className="text-[14px] text-[#86868B] font-medium">
                    {cert.issuer}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#48484A] font-[family-name:var(--font-jetbrains)]">
                  <Calendar size={10} />
                  <span>{cert.date}</span>
                  {cert.expires && (
                    <>
                      <span className="text-[#2C2C2E]">·</span>
                      <span>Expires {cert.expires}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Certs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherCerts.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                <IssuerIcon issuer={cert.issuer} size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[14px] font-medium text-[#D1D1D6] leading-snug">
                  {cert.name}
                </h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[12px] text-[#48484A]">{cert.issuer}</span>
                  <span className="text-[#2C2C2E]">·</span>
                  <span className="text-[11px] text-[#48484A] font-[family-name:var(--font-jetbrains)]">
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
