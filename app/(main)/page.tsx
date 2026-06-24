import React from "react";
import Link from "next/link";
import { MessageSquareCode, Mail } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { Stats } from "@/components/sections/stats";
import { ThemAboutMe } from "@/components/sections/them-about-me";
import { TypeRacer } from "@/components/sections/type-racer";
import { ContactBackground } from "@/components/sections/bg-animations";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
        <Hero />
        <AboutPreview />
        <Stats />
        <ThemAboutMe />
        <TypeRacer />

        {/* Contact Section on Home */}
        <section className="w-full py-20 bg-white dark:bg-zinc-950 transition-colors duration-200 relative overflow-hidden">
          <ContactBackground />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            
            <div className="bg-[#F4F3EF] dark:bg-zinc-900 border-4 border-black p-8 md:p-12 shadow-neo max-w-2xl mx-auto space-y-6">
              <div className="inline-flex p-3 bg-neo-yellow text-black border-2 border-black shadow-neo-sm">
                <MessageSquareCode className="w-6 h-6" />
              </div>
              
              <h2 className="font-space font-black text-2xl md:text-4xl uppercase tracking-tight text-black dark:text-white">
                LET'S START A PROJECT
              </h2>
              
              <p className="font-sans font-semibold text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-sm md:text-base">
                Have a proposal, a project idea, or just want to chat? Send me a message and I'll get back to you within 24 hours.
              </p>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-space font-black uppercase text-sm md:text-base bg-neo-yellow text-black border-4 border-black px-6 py-4 shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo-lg active:translate-x-0 active:translate-y-0 active:shadow-neo transition-all"
                >
                  <Mail className="w-5 h-5" />
                  SEND A DIGITAL INQUIRY
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
  );
}

