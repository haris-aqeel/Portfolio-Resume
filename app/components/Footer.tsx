"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/haris-aqeel",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/haris-aqeel/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:haris@placeholder.com",
    icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-800/50">
      <div className="section-container">
        <div className="flex flex-col items-center gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-muted hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Credit */}
          <a
            href="https://github.com/haris-aqeel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            Designed & Built by Haris Aqeel
          </a>
        </div>
      </div>
    </footer>
  );
}
