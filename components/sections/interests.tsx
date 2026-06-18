"use client";

import React, { useEffect, useState } from "react";
import {
  Compass,
  Monitor,
  Database,
  GitBranch,
  Lightbulb,
  Puzzle,
  Bot,
  Cloud,
  Brain,
  Rocket,
  Music,
  Network,
  Shield,
  Star,
  Code,
  Cpu,
  Globe,
  Layers,
  Zap,
  Camera,
  Gamepad2,
  Palette,
  Wrench,
  BookOpen,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Interest } from "@/lib/types";

// Map icon names (from Supabase) to actual Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  Database,
  GitBranch,
  Lightbulb,
  Puzzle,
  Bot,
  Cloud,
  Brain,
  Rocket,
  Music,
  Network,
  Shield,
  Star,
  Code,
  Cpu,
  Globe,
  Layers,
  Zap,
  Camera,
  Gamepad2,
  Palette,
  Wrench,
  BookOpen,
  Heart,
};

// Fallback data if Supabase is empty
const fallbackInterests: Interest[] = [
  { id: "f1", created_at: "", name: "Technology", icon_name: "Monitor", color: "bg-neo-yellow", order_index: 1 },
  { id: "f2", created_at: "", name: "Data", icon_name: "Database", color: "bg-neo-blue", order_index: 2 },
  { id: "f3", created_at: "", name: "Agile-Development", icon_name: "GitBranch", color: "bg-neo-pink", order_index: 3 },
  { id: "f4", created_at: "", name: "Creativity", icon_name: "Lightbulb", color: "bg-neo-green", order_index: 4 },
  { id: "f5", created_at: "", name: "Problem Solving", icon_name: "Puzzle", color: "bg-neo-blue", order_index: 5 },
  { id: "f6", created_at: "", name: "Automation", icon_name: "Bot", color: "bg-neo-yellow", order_index: 6 },
  { id: "f7", created_at: "", name: "Cloud Computing", icon_name: "Cloud", color: "bg-neo-green", order_index: 7 },
  { id: "f8", created_at: "", name: "Machine Learning", icon_name: "Brain", color: "bg-neo-pink", order_index: 8 },
  { id: "f9", created_at: "", name: "Innovation", icon_name: "Rocket", color: "bg-neo-yellow", order_index: 9 },
  { id: "f10", created_at: "", name: "Music/Sound Detection", icon_name: "Music", color: "bg-neo-pink", order_index: 10 },
  { id: "f11", created_at: "", name: "Networking", icon_name: "Network", color: "bg-neo-green", order_index: 11 },
  { id: "f12", created_at: "", name: "Security", icon_name: "Shield", color: "bg-neo-blue", order_index: 12 },
];

export function Interests() {
  const [interests, setInterests] = useState<Interest[]>(fallbackInterests);

  useEffect(() => {
    async function fetchInterests() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("interests")
          .select("*")
          .order("order_index", { ascending: true });

        if (!error && data && data.length > 0) {
          setInterests(data as Interest[]);
        }
      } catch (err) {
        console.error("Failed to fetch interests:", err);
      }
    }

    fetchInterests();
  }, []);

  return (
    <div className="space-y-8">
      {/* Section Heading — same style as Skills Index */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-neo-green text-black neo-border shadow-neo flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="font-space font-black text-2xl md:text-3xl uppercase tracking-tight">
            INTERESTS
          </h2>
        </div>
      </div>

      {/* Grid — auto-adapts to any number of items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {interests.map((interest) => {
          const Icon = ICON_MAP[interest.icon_name] || Star;
          return (
            <div
              key={interest.id}
              className="group flex items-center gap-3 p-4 md:p-5 bg-white dark:bg-zinc-900 border-4 border-black dark:border-zinc-700 shadow-neo-sm hover:shadow-neo hover:-translate-y-1 transition-all duration-200 cursor-default"
            >
              <div
                className={`p-2 ${interest.color} border-2 border-black flex items-center justify-center group-hover:rotate-12 transition-transform duration-200`}
              >
                <Icon className="w-5 h-5 text-black" />
              </div>
              <span className="font-space font-black text-xs md:text-sm uppercase text-black dark:text-white leading-tight">
                {interest.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
