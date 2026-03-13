"use client";

import { Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-[9px] font-bold text-white">
              HA
            </div>
            <span className="text-xs text-zinc-600">
              &copy; 2026 Haris Aqeel
            </span>
          </div>

          <p className="text-[11px] text-zinc-700 font-[family-name:var(--font-jetbrains)]">
            Built with Next.js &middot; Deployed on Vercel
          </p>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/haris-aqeel/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:haris@placeholder.com"
              className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-300 transition-colors"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-300 transition-colors"
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
