"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Smile, ClipboardList, Headphones, Award, Users, BookOpen } from "lucide-react";
import { SkillsBackground } from "./bg-animations";
import { createClient } from "@/lib/supabase/client";

export function Stats() {
  const [projectCount, setProjectCount] = useState<number | null>(null);
  const [certCount, setCertCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const supabase = createClient();

        // Fetch exact count of projects
        const { count: pCount, error: pError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true });

        if (!pError && pCount !== null) {
          setProjectCount(pCount);
        }

        // Fetch exact count of certificates
        const { count: cCount, error: cError } = await supabase
          .from("certificates")
          .select("*", { count: "exact", head: true });

        if (!cError && cCount !== null) {
          setCertCount(cCount);
        }
      } catch (err) {
        console.error("Failed to fetch stats counts from Supabase:", err);
      }
    }

    fetchCounts();
  }, []);

  const stats = [
    { value: "10 +", label: "People Collaborated", icon: Users, color: "bg-neo-yellow" },
    { value: projectCount !== null ? `${projectCount}` : "100 +", label: "Projects", icon: ClipboardList, color: "bg-neo-blue" },
    { value: "2 +", label: "Years Of Learning", icon: BookOpen, color: "bg-neo-pink" },
    { value: certCount !== null ? `${certCount}` : "7", label: "Certification", icon: Award, color: "bg-neo-green" },
  ];

  return (
    <section className="w-full pt-4 pb-4 md:pt-6 md:pb-6 bg-transparent dark:bg-zinc-950 transition-colors duration-200 relative overflow-hidden">
      <SkillsBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading — same style as Skills Index */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neo-yellow text-black neo-border shadow-neo flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h2 className="font-space font-black text-3xl md:text-5xl uppercase tracking-tight">
              STATS
            </h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col items-center justify-center bg-white dark:bg-zinc-900 border-4 border-black dark:border-zinc-700 shadow-neo p-8 md:p-10 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200"
              >
                {/* Icon */}
                <div className={`p-3 ${stat.color} border-2 border-black mb-4`}>
                  <Icon className="w-6 h-6 text-black" />
                </div>

                {/* Value */}
                <span className="font-space font-black text-3xl md:text-4xl text-black dark:text-white mb-1">
                  {stat.value}
                </span>

                {/* Label */}
                <span className="font-space font-extrabold text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-center">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
