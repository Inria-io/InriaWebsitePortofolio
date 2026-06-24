import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, InstagramIcon as Instagram } from "@/components/ui/icons";
import { InriaLogo } from "@/components/ui/inria-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Github", icon: <Github className="w-5 h-5" />, href: "https://github.com/Inria-io" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/inriaaltjekalalo/" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/inriakalalo?igsh=MTMwaHpwazB5dHp5cA%3D%3D&utm_source=qr" },
    { name: "Email", icon: <Mail className="w-5 h-5" />, href: "mailto:inriakalalo37@gmail.com" },
  ];

  return (
    <footer className="w-full bg-white dark:bg-zinc-950 border-t-4 border-black dark:border-white transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link href="/" className="group flex items-center transition-transform hover:scale-105 duration-200">
            <InriaLogo className="h-36 md:h-40 w-auto -my-14" />
          </Link>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-sans font-medium text-center md:text-left">
            Turning ideas into real, usable technology.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white hover:bg-neo-yellow dark:bg-zinc-900 dark:hover:bg-neo-yellow text-black dark:text-white dark:hover:text-black neo-border shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-sm transition-all duration-150"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right font-space font-extrabold text-sm uppercase">
          <div className="bg-neo-green px-3 py-1 neo-border shadow-neo text-black inline-block">
            © 2026 Inria Kalalo. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
