"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, MapPin } from "lucide-react";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Section Header */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="text-primary font-mono text-sm mb-4"
          >
            {"What's Next?"}
          </motion.p>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h2>

          <p className="text-lg text-muted leading-relaxed mb-10">
            {"I'm"} currently open to new opportunities in data engineering, consulting, and full-time roles. Whether you have a question, want to discuss a project, or just want to say hi, {"I'll"} do my best to get back to you!
          </p>

          {/* CTA Button */}
          <a
            href="mailto:haris@placeholder.com"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-black text-sm font-semibold rounded-full transition-all"
          >
            Say Hello
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Alternative Contact Options */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/haris-aqeel/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm text-muted hover:text-white border border-border hover:border-primary/30 rounded-full transition-all hover:bg-surface"
            >
              LinkedIn
            </a>
            <a
              href="https://www.upwork.com/freelancers/~placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm text-muted hover:text-white border border-border hover:border-primary/30 rounded-full transition-all hover:bg-surface"
            >
              Upwork
            </a>
            <a
              href="https://github.com/haris-aqeel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm text-muted hover:text-white border border-border hover:border-primary/30 rounded-full transition-all hover:bg-surface"
            >
              GitHub
            </a>
          </div>

          {/* Location Badge */}
          <div className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>Based in Karachi, Pakistan</span>
            <span className="text-border">|</span>
            <span>Open to Remote</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
