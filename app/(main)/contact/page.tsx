"use client";

import React, { useState } from "react";
import { MessageSquareCode, Mail, MapPin, ArrowUpRight, Copy, Check } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, InstagramIcon as Instagram } from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { ContactBackground } from "@/components/sections/bg-animations";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("inriakalalo37@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: "Github",
      value: "Inria-io",
      href: "https://github.com/Inria-io",
      icon: <Github className="w-8 h-8 text-black" />,
      color: "bg-neo-yellow",
    },
    {
      name: "LinkedIn",
      value: "Inria Altje Kalalo",
      href: "https://www.linkedin.com/in/inriaaltjekalalo/",
      icon: <Linkedin className="w-8 h-8 text-black" />,
      color: "bg-neo-blue",
    },
    {
      name: "Instagram",
      value: "@inriakalalo",
      href: "https://www.instagram.com/inriakalalo?igsh=MTMwaHpwazB5dHp5cA%3D%3D&utm_source=qr",
      icon: <Instagram className="w-8 h-8 text-black" />,
      color: "bg-neo-pink",
    },
  ];

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200 relative overflow-hidden">
      <ContactBackground />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="p-3 bg-neo-yellow text-black neo-border shadow-neo flex items-center justify-center">
            <MessageSquareCode className="w-8 h-8" />
          </div>
          <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight">
            GET IN TOUCH
          </h1>
          <p className="font-sans font-semibold text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
            Have a project in mind, a business inquiry, or just want to connect? Reach out directly via the email and social platforms below.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          {/* Email Card (Spans full columns on larger screens) */}
          <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-neo hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200 md:col-span-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 border-3 border-black bg-neo-green text-black shadow-neo-sm">
                <Mail className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="font-space font-black text-xs text-zinc-500 uppercase tracking-wider block">
                  Email Me Directly
                </span>
                <a
                  href="mailto:inriakalalo37@gmail.com"
                  className="font-space font-black text-lg md:text-2xl text-black dark:text-white hover:text-neo-blue transition-colors break-all"
                >
                  inriakalalo37@gmail.com
                </a>
              </div>
            </div>

            {/* Copy Email Button */}
            <button
              onClick={copyEmail}
              className="w-full md:w-auto px-5 py-3 border-2 border-black font-space font-extrabold uppercase text-sm bg-neo-yellow text-black shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  COPIED!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  COPY EMAIL
                </>
              )}
            </button>
          </Card>

          {/* Location Card */}
          <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-neo hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200 flex items-center gap-5">
            <div className="p-4 border-3 border-black bg-neo-orange text-black shadow-neo-sm">
              <MapPin className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="font-space font-black text-xs text-zinc-500 uppercase tracking-wider block">
                My Location
              </span>
              <span className="font-space font-black text-base md:text-lg text-black dark:text-white block">
                Jakarta, Indonesia
              </span>
            </div>
          </Card>

          {/* Prompt card */}
          <Card className="border-4 border-black bg-neo-yellow text-black p-6 md:p-8 shadow-neo hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200 flex flex-col justify-center">
            <h3 className="font-space font-black text-lg uppercase mb-1">
              Response Time
            </h3>
            <p className="font-sans font-bold text-sm leading-relaxed">
              I read and reply to emails regularly. You can expect a response within 24 hours on business days!
            </p>
          </Card>

        </div>

        {/* Social Platforms Heading */}
        <div className="border-t-4 border-black pt-12 mt-16 mb-8">
          <h2 className="font-space font-black text-2xl md:text-3xl uppercase tracking-tight text-center md:text-left">
            SOCIAL NETWORKS
          </h2>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-neo-lg transition-all duration-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 border-2 border-black ${social.color} shadow-neo-sm`}>
                    {social.icon}
                  </div>
                  <div>
                    <span className="font-space font-black text-xs text-zinc-500 uppercase block">
                      {social.name}
                    </span>
                    <span className="font-space font-extrabold text-sm text-black dark:text-white">
                      {social.value}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-150" />
              </Card>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
