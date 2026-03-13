"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
          <p className="text-primary font-mono text-sm mb-4">
            05. What's Next?
          </p>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-6">
            Get In Touch
          </h2>

          <p className="text-muted leading-relaxed mb-10">
            {"I'm"} currently open to new opportunities in data engineering, consulting, and full-time roles. Whether you have a question, want to discuss a project, or just want to say hi, {"I'll"} do my best to get back to you!
          </p>

          {/* CTA Button */}
          <a
            href="mailto:haris@placeholder.com"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            Say Hello
          </a>

          {/* Alternative Contact Options */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/haris-aqeel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://www.upwork.com/freelancers/~placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              Upwork
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="https://github.com/haris-aqeel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Location Badge */}
          <p className="mt-8 text-xs text-muted-foreground font-mono">
            Based in Karachi, Pakistan · Open to Remote
          </p>
        </motion.div>
      </div>
    </section>
  );
}
