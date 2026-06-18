"use client";

import React from "react";
import Link from "next/link";
import { Hammer, Code, Server, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function SkillsGrid() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-6 h-6 text-black" />,
      color: "bg-neo-yellow",
      skills: [
        { name: "Next.js", level: "Expert" },
        { name: "React", level: "Expert" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "Framer Motion", level: "Advanced" },
        { name: "HTML5/CSS3", level: "Expert" },
      ],
    },
    {
      title: "Backend & Systems",
      icon: <Server className="w-6 h-6 text-black" />,
      color: "bg-neo-blue",
      skills: [
        { name: "Node.js", level: "Advanced" },
        { name: "Supabase", level: "Advanced" },
        { name: "PostgreSQL", level: "Advanced" },
        { name: "REST APIs", level: "Expert" },
        { name: "GraphQL", level: "Intermediate" },
        { name: "Serverless", level: "Advanced" },
      ],
    },
    {
      title: "Tools & Methods",
      icon: <Wrench className="w-6 h-6 text-black" />,
      color: "bg-neo-green",
      skills: [
        { name: "Git & Github", level: "Expert" },
        { name: "Docker", level: "Intermediate" },
        { name: "Vercel / Netlify", level: "Expert" },
        { name: "Figma", level: "Advanced" },
        { name: "CI / CD", level: "Advanced" },
        { name: "Agile (Scrum)", level: "Advanced" },
      ],
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "pink";
      case "Advanced":
        return "orange";
      case "Intermediate":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <section className="w-full py-16 md:py-24 border-b-4 border-black dark:border-white bg-[#6BCB77]/10 dark:bg-zinc-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neo-green text-black neo-border shadow-neo flex items-center justify-center">
              <Hammer className="w-6 h-6" />
            </div>
            <h2 className="font-space font-black text-3xl md:text-5xl uppercase tracking-tight">
              SKILLS INDEX
            </h2>
          </div>
          <Link href="/skills">
            <Button variant="outline" size="sm">
              View All Skills
            </Button>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <Card
              key={idx}
              className="flex flex-col h-full bg-white dark:bg-zinc-900 border-4 border-black hover:translate-y-[-4px] transition-transform duration-200 shadow-neo"
            >
              {/* Category Header */}
              <div className={`flex items-center gap-3 p-4 border-b-4 border-black ${category.color} text-black font-space font-black text-lg uppercase`}>
                <div className="p-1.5 bg-white border-2 border-black">
                  {category.icon}
                </div>
                <span>{category.title}</span>
              </div>

              {/* Skills List */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6 bg-white dark:bg-zinc-900">
                <ul className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="flex items-center justify-between border-b-2 border-dashed border-zinc-200 dark:border-zinc-800 pb-2"
                    >
                      <span className="font-sans font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                        {skill.name}
                      </span>
                      <Badge variant={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
