"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, MapPin, ArrowRight } from "lucide-react";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="relative pt-16 sm:pt-20 pb-20 sm:pb-28">
      <div className="section-divider" />

      <div className="max-w-[1120px] mx-auto px-6 pt-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-[640px] mx-auto"
        >
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,160,0,0.06)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A853]" />
                </span>
                <span className="text-[12px] text-[#34A853] font-medium">
                  Available Now
                </span>
              </div>

              <h2 className="heading-lg text-white mb-4">
                Let&apos;s build something<br />
                <span className="gradient-text">great together.</span>
              </h2>

              <p className="text-[16px] text-[#9AA0A6] mb-10 leading-relaxed">
                Open to data engineering contracts, consulting, and full-time
                roles. Let&apos;s talk about your next project.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                <a
                  href="mailto:harisaqeel.2001@gmail.com?subject=Project%20Inquiry&body=Hi%20Haris%2C%0A%0AI%27m%20interested%20in%20discussing%20a%20project.%20Here%20are%20some%20details%3A%0A%0AProject%20Type%3A%20%0ABudget%20Range%3A%20%0ATimeline%3A%20%0ADescription%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!"
                  className="btn-primary group inline-flex items-center gap-2 px-8 py-3.5 text-[15px] w-full sm:w-auto justify-center"
                >
                  <Mail size={16} />
                  Email Me
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/haris-aqeel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 text-[15px] w-full sm:w-auto justify-center"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[14px] text-[#6B6B6F]">
                <MapPin size={14} />
                <span>Karachi, Pakistan</span>
                <span className="text-[#3C3C3F]">&middot;</span>
                <span>Open to remote</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
