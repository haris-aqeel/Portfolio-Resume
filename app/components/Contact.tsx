"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, ExternalLink, MapPin } from "lucide-react";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-divider mb-24" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-8 sm:p-12 rounded-2xl premium-card text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(212,168,83,0.06)_0%,transparent_70%)] pointer-events-none" />

            {/* Status */}
            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#27272A] bg-[#09090B] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="text-xs text-[#10B981] font-medium tracking-wide">
                Available Now
              </span>
            </div>

            <h2 className="relative text-2xl sm:text-3xl font-bold mb-3 font-[family-name:var(--font-playfair)]">
              Let&apos;s work{" "}
              <span className="gradient-text">together</span>
            </h2>
            <p className="relative text-sm text-[#71717A] mb-8 max-w-md mx-auto leading-relaxed">
              Open to data engineering contracts, consulting, and full-time
              roles.
            </p>

            {/* Buttons */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <a
                href="mailto:haris@placeholder.com"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm w-full sm:w-auto justify-center"
              >
                <Mail size={16} />
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/haris-aqeel/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm w-full sm:w-auto justify-center"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="https://www.upwork.com/freelancers/~placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm w-full sm:w-auto justify-center"
              >
                <ExternalLink size={16} />
                Upwork
              </a>
            </div>

            {/* Location */}
            <div className="relative flex items-center justify-center gap-2 text-sm text-[#71717A]">
              <MapPin size={14} />
              <span>Karachi, Pakistan</span>
              <span className="text-[#3F3F46]">&middot;</span>
              <span>Open to remote</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
