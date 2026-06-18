"use client";

import React from "react";
import { MessageSquareCode, Mail, MapPin } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, InstagramIcon as Instagram } from "@/components/ui/icons";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactBackground } from "@/components/sections/bg-animations";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-black" />,
      label: "EMAIL ME",
      value: "inriakalalo37@gmail.com",
      href: "mailto:inriakalalo37@gmail.com",
      color: "bg-neo-yellow",
    },
    {
      icon: <MapPin className="w-5 h-5 text-black" />,
      label: "MY OFFICE",
      value: "Sudirman, Jakarta, Indonesia",
      color: "bg-neo-green",
    },
  ];

  const socialChannels = [
    { name: "Github", href: "https://github.com/Inria-io", icon: <Github className="w-6 h-6" />, color: "hover:bg-neo-yellow" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/inriaaltjekalalo/", icon: <Linkedin className="w-6 h-6" />, color: "hover:bg-neo-blue" },
    { name: "Instagram", href: "https://www.instagram.com/inriakalalo?igsh=MTMwaHpwazB5dHp5cA%3D%3D&utm_source=qr", icon: <Instagram className="w-6 h-6 text-black dark:text-white dark:hover:text-black" />, color: "hover:bg-neo-pink" },
  ];

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200 relative overflow-hidden">
      <ContactBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-neo-yellow text-black neo-border shadow-neo flex items-center justify-center">
            <MessageSquareCode className="w-8 h-8" />
          </div>
          <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight">
            CONTACT ME
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info cards and socials sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-space font-black text-2xl uppercase tracking-tight">
              GET IN TOUCH DIRECTLY
            </h2>
            <p className="font-sans font-semibold text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If you have any contract offers, project proposals, or just want to chat about web technology, don't hesitate to reach out!
            </p>

            {/* Info lists */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <Card
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border-4 border-black shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-neo-sm duration-200"
                >
                  <div className={`p-3 border-2 border-black ${info.color} text-black`}>
                    {info.icon}
                  </div>
                  <div>
                    <span className="font-space font-black text-xs text-zinc-500 uppercase block leading-none mb-1">
                      {info.label}
                    </span>
                    {info.href ? (
                      <a href={info.href} className="font-space font-extrabold text-sm md:text-base text-black dark:text-white hover:text-neo-blue transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <span className="font-space font-extrabold text-sm md:text-base text-black dark:text-white">
                        {info.value}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Social box */}
            <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo space-y-4">
              <h3 className="font-space font-black text-lg uppercase border-b-2 border-black pb-2">
                SOCIAL PLATFORMS
              </h3>
              <div className="flex gap-4">
                {socialChannels.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black shadow-neo-sm hover:-translate-y-1 hover:shadow-neo transition-all duration-200 flex items-center justify-center rounded-none ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border-4 border-black p-6 md:p-8 shadow-neo">
            <h2 className="font-space font-black text-2xl uppercase tracking-tight mb-6">
              SEND A DIGITAL INQUIRY
            </h2>
            <ContactForm />
          </div>

        </div>

      </div>
    </div>
  );
}
