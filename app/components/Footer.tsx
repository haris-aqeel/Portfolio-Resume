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
    <footer className="py-10 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2.5 rounded-full bg-surface border border-border hover:border-primary/30 text-muted hover:text-primary transition-all"
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
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Designed & Built by Haris Aqeel
          </a>
        </div>
      </div>
    </footer>
  );
}
