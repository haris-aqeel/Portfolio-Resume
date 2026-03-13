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
  { name: "Fabric Data Engineer Associate", issuer: "Microsoft", date: "May 2025", expires: "May 2026", active: true },
  { name: "Fabric Analytics Engineer Associate", issuer: "Microsoft", date: "Dec 2024", expires: "Dec 2027", active: true },
  { name: "Azure Data Fundamentals", issuer: "Microsoft", date: "May 2024", active: true },
  { name: "BTA Certified Blockchain Business Foundations", issuer: "Blockchain Training Alliance", date: "Nov 2021" },
  { name: "Introduction to Programming Using JavaScript", issuer: "Microsoft", date: "Dec 2020" },
  { name: "React.js Essential Training", issuer: "LinkedIn", date: "Oct 2020" },
  { name: "Getting Started with Google Kubernetes Engine", issuer: "Coursera", date: "Aug 2020" },
  { name: "Networking Academy Learn-A-Thon 2021 & 2022", issuer: "Cisco", date: "2021\u20132022" },
];

const activeCerts = certs.filter((c) => c.active);
const otherCerts = certs.filter((c) => !c.active);

export default function Certifications() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-28 sm:py-36">
      <div className="section-divider" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-28">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <span className="section-label font-[family-name:var(--font-jetbrains)]">Credentials</span>
          <h2 className="heading-lg mt-4">Certifications</h2>
        </motion.div>

        {/* Active certs - featured */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {activeCerts.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="warm-glass p-6"
            >
              <div className="flex items-center gap-1.5 mb-4">
                <ShieldCheck size={15} className="text-[#34A853]" />
                <span className="text-[10px] text-[#34A853] font-bold uppercase tracking-[0.15em]">Active</span>
              </div>
              <h3 className="text-[16px] font-bold text-white leading-snug mb-4">{cert.name}</h3>
              <div className="flex items-center gap-2.5 mb-3">
                <IssuerIcon issuer={cert.issuer} size={22} />
                <span className="text-[14px] text-[#9AA0A6] font-medium">{cert.issuer}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#6B6B6F] font-[family-name:var(--font-jetbrains)]">
                <Calendar size={10} />
                <span>{cert.date}</span>
                {cert.expires && (
                  <>
                    <span className="text-[#3C3C3F]">·</span>
                    <span>Expires {cert.expires}</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other certs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {otherCerts.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                <IssuerIcon issuer={cert.issuer} size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[14px] font-semibold text-[#E8EAED] leading-snug">{cert.name}</h4>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[12px] text-[#6B6B6F]">{cert.issuer}</span>
                  <span className="text-[#3C3C3F]">·</span>
                  <span className="text-[11px] text-[#6B6B6F] font-[family-name:var(--font-jetbrains)]">{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
