"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, GraduationCap, Briefcase, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AboutBackground } from "./bg-animations";

export function AboutPreview() {
  const cardsInfo = [
    {
      title: "Experience",
      description: "Active developer since 2024",
      icon: <Briefcase className="w-8 h-8 text-black" />,
      color: "bg-neo-blue",
    },
    {
      title: "Education",
      description: "Informatics Student, Class of 2027",
      icon: <GraduationCap className="w-8 h-8 text-black" />,
      color: "bg-neo-green",
    },
    {
      title: "Passions",
      description: "Tech, Cybersecurity, AI & Entrepreneurship",
      icon: <Heart className="w-8 h-8 text-black" />,
      color: "bg-neo-pink",
    },
  ];

  return (
    <section className="w-full pt-12 pb-2 md:pt-16 md:pb-4 bg-transparent dark:bg-zinc-950 transition-colors duration-200 relative overflow-hidden">
      <AboutBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-neo-orange text-black neo-border shadow-neo flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <h2 className="font-space font-black text-3xl md:text-5xl uppercase tracking-tight">
            WHO IS INRIA?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Polaroid Image Box with smooth hover slide-up and active click scale down */}
          <div className="lg:col-span-5 flex justify-center py-6">
            <motion.div
              initial={{ rotate: -3, y: 0 }}
              whileHover={{
                y: -16,
                rotate: 1,
                scale: 1.03,
              }}
              whileTap={{
                y: -6,
                scale: 0.98,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-72 md:w-80 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] p-4 transition-shadow duration-300"
            >
              <div className="w-full h-72 bg-zinc-200 border-4 border-black relative overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Foto%20preuni.jpeg"
                  alt="Inria's Portrait"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover grayscale contrast-[1.15] hover:grayscale-0 transition-all duration-300 select-none"
                />
              </div>
              <div className="pt-6 pb-2 text-center select-none">
                <span className="font-space font-black text-xl uppercase tracking-wide text-black block">
                  INRIA_2026.PNG
                </span>
              </div>
            </motion.div>
          </div>

          {/* Intro text & Cards grid */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <p className="font-sans font-semibold text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              I'm Inria Altje Kalalo, an IT student from Indonesia with a deep passion for building technology that matters. I specialize in full-stack development, mobile apps, cybersecurity, and AI, creating products with purpose.
            </p>

            {/* Sub-cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {cardsInfo.map((card, index) => (
                <Card
                  key={index}
                  bg={card.color}
                  className="flex flex-col items-start gap-4 cursor-default p-5 shadow-neo hover:translate-y-[-2px] transition-transform"
                >
                  <div className="p-2.5 bg-white border-2 border-black rounded-none">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-space font-black text-lg text-black uppercase leading-tight">
                      {card.title}
                    </h3>
                    <p className="font-sans font-bold text-xs text-zinc-800 mt-1 leading-snug">
                      {card.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <div className="pt-4 self-start">
              <Link href="/about">
                <Button variant="purple" className="flex items-center gap-2">
                  Read My Full Story
                  <ArrowRight className="w-5 h-5 text-black" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
