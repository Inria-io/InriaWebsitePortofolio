import React from "react";
import { MessageSquareCode } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { Stats } from "@/components/sections/stats";
import { ThemAboutMe } from "@/components/sections/them-about-me";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactBackground } from "@/components/sections/bg-animations";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
        <Hero />
        <AboutPreview />
        <Stats />
        <ThemAboutMe />

        {/* Contact Section on Home */}
        <section className="w-full py-16 md:py-24 bg-white dark:bg-zinc-950 transition-colors duration-200 relative overflow-hidden">
          <ContactBackground />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 relative z-10">
            
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-neo-yellow text-black neo-border shadow-neo flex items-center justify-center">
                <MessageSquareCode className="w-6 h-6" />
              </div>
              <h2 className="font-space font-black text-3xl md:text-5xl uppercase tracking-tight text-center">
                LET'S START A PROJECT
              </h2>
              <p className="font-sans font-bold text-zinc-600 dark:text-zinc-400 max-w-lg">
                Have a proposal or just want to chat? Send me a line using the form below. I typically respond within 24 hours.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </div>
  );
}

