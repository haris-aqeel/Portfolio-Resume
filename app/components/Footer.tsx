"use client";

import { Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#27272A]/40 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#D4A853] to-[#B8922E] flex items-center justify-center text-[9px] font-bold text-[#09090B]">
              HA
            </div>
            <span className="text-xs text-[#52525B]">
              &copy; 2026 Haris Aqeel
            </span>
          </div>

          <p className="text-[11px] text-[#3F3F46] font-[family-name:var(--font-jetbrains)]">
            Built with Next.js &middot; Deployed on Vercel
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/haris-aqeel/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#52525B] hover:text-[#D4A853] hover:bg-[#18181B] transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:haris@placeholder.com"
              className="p-2 rounded-lg text-[#52525B] hover:text-[#D4A853] hover:bg-[#18181B] transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#52525B] hover:text-[#D4A853] hover:bg-[#18181B] transition-all duration-300"
              aria-label="Upwork"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
