"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, ExternalLink, MapPin } from "lucide-react";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 sm:p-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 text-center">
            {/* Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-950 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-emerald-500 font-medium">
                Available Now
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Let&apos;s work{" "}
              <span className="gradient-text">together</span>
            </h2>
            <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
              Open to data engineering contracts, consulting, and full-time
              roles.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <a
                href="mailto:haris@placeholder.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] w-full sm:w-auto justify-center"
              >
                <Mail size={16} />
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/haris-aqeel/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium text-sm transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="https://www.upwork.com/freelancers/~placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-medium text-sm transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <ExternalLink size={16} />
                Upwork
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
              <MapPin size={14} />
              <span>Karachi, Pakistan</span>
              <span className="text-zinc-700">&middot;</span>
              <span>Open to remote</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
