"use client";

import { Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-[6px] bg-[#0071E3] flex items-center justify-center text-[8px] font-bold text-white">
              HA
            </div>
            <span className="text-[12px] text-[#48484A]">
              &copy; 2026 Haris Aqeel
            </span>
          </div>

          <p className="text-[11px] text-[#2C2C2E] font-[family-name:var(--font-jetbrains)]">
            Built with Next.js &middot; Deployed on Vercel
          </p>

          <div className="flex items-center gap-1">
            {[
              { href: "https://www.linkedin.com/in/haris-aqeel/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:haris@placeholder.com", icon: Mail, label: "Email" },
              { href: "https://www.upwork.com/freelancers/~placeholder", icon: ExternalLink, label: "Upwork" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2.5 rounded-xl text-[#48484A] hover:text-[#F5F5F7] hover:bg-white/[0.04] transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
