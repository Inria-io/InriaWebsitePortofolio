"use client";

import React, { useState, useEffect } from "react";
import { Hammer, Code, Server, Wrench, Terminal } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { SkillsBackground } from "@/components/sections/bg-animations";
import { Skill, SoftSkill } from "@/lib/types";

const fallbackCategories = [
  {
    title: "Frontend Engineering",
    color: "bg-neo-yellow",
    icon: <Code className="w-6 h-6 text-black" />,
    skills: [
      { name: "Next.js 14+", level: "Expert", percentage: 95 },
      { name: "React / React Native", level: "Expert", percentage: 95 },
      { name: "TypeScript", level: "Advanced", percentage: 88 },
      { name: "Tailwind CSS", level: "Expert", percentage: 98 },
      { name: "Framer Motion", level: "Advanced", percentage: 85 },
      { name: "Redux / Zustand", level: "Advanced", percentage: 85 },
      { name: "HTML5 & CSS3", level: "Expert", percentage: 99 },
    ],
  },
  {
    title: "Backend & Systems",
    color: "bg-neo-blue",
    icon: <Server className="w-6 h-6 text-black" />,
    skills: [
      { name: "Node.js (Express/Nest)", level: "Advanced", percentage: 85 },
      { name: "Supabase & Postgres", level: "Advanced", percentage: 90 },
      { name: "REST & GraphQL APIs", level: "Expert", percentage: 92 },
      { name: "MongoDB & Prisma", level: "Advanced", percentage: 80 },
      { name: "Serverless (AWS/Vercel)", level: "Advanced", percentage: 82 },
      { name: "Docker Containers", level: "Intermediate", percentage: 70 },
    ],
  },
  {
    title: "Tools & Professional workflows",
    color: "bg-neo-green",
    icon: <Wrench className="w-6 h-6 text-black" />,
    skills: [
      { name: "Git & Collaborative GitHub", level: "Expert", percentage: 95 },
      { name: "Figma UI/UX Prototyping", level: "Advanced", percentage: 80 },
      { name: "Jest / Cypress Testing", level: "Intermediate", percentage: 75 },
      { name: "CI/CD (Github Actions)", level: "Advanced", percentage: 85 },
      { name: "Vercel / AWS Amplify", level: "Expert", percentage: 90 },
      { name: "Agile / Scrum Methodologies", level: "Advanced", percentage: 85 },
    ],
  },
];

const fallbackSoftSkills = [
  {
    title: "Technical Communication",
    description: "Write clear docs, present to stakeholders, explain tradeoffs simply",
  },
  {
    title: "Problem Solving",
    description: "Debug complex systems, break problems into solvable parts",
  },
  {
    title: "Cross-Team Collaboration",
    description: "Work effectively with design, product, and ops teams",
  },
  {
    title: "Time Management",
    description: "Deliver features on schedule, balance multiple workstreams",
  },
  {
    title: "Mentorship",
    description: "Onboard junior devs, conduct code reviews, share knowledge",
  },
  {
    title: "Adaptability",
    description: "Learn new stacks quickly, thrive in ambiguous situations",
  },
];

const CATEGORY_ORDER = ["Frontend Engineering", "Backend & Systems", "Tools & Professional workflows"];

const CATEGORY_MAP: Record<string, { color: string; icon: React.ReactNode }> = {
  "Frontend Engineering": {
    color: "bg-neo-yellow",
    icon: <Code className="w-6 h-6 text-black" />,
  },
  "Backend & Systems": {
    color: "bg-neo-blue",
    icon: <Server className="w-6 h-6 text-black" />,
  },
  "Tools & Professional workflows": {
    color: "bg-neo-green",
    icon: <Wrench className="w-6 h-6 text-black" />,
  },
};

function getSkillIconUrl(name: string): string | null {
  const normalized = name.toLowerCase();
  
  // Frontend
  if (normalized.includes("next.js") || normalized.includes("nextjs")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
  if (normalized.includes("react")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (normalized.includes("typescript")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  if (normalized.includes("tailwindcss") || normalized.includes("tailwind")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  if (normalized.includes("framer motion")) 
    return "https://cdn.jsdelivr.net/npm/simple-icons@11.13.0/icons/framermotion.svg";
  if (normalized.includes("redux") || normalized.includes("zustand")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg";
  if (normalized.includes("html")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
  if (normalized.includes("css")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  if (normalized.includes("javascript") || normalized.includes("js")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";

  // Backend
  if (normalized.includes("node.js") || normalized.includes("nodejs") || normalized.includes("express") || normalized.includes("nest")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
  if (normalized.includes("supabase")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg";
  if (normalized.includes("postgres")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
  if (normalized.includes("mongodb")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
  if (normalized.includes("prisma")) 
    return "https://cdn.jsdelivr.net/npm/simple-icons@11.13.0/icons/prisma.svg";
  if (normalized.includes("graphql")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg";
  if (normalized.includes("rest") || normalized.includes("api")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg";
  if (normalized.includes("aws") || normalized.includes("amplify")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
  if (normalized.includes("docker")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg";

  // Tools
  if (normalized.includes("git")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
  if (normalized.includes("figma")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg";
  if (normalized.includes("jest")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg";
  if (normalized.includes("cypress")) 
    return "https://cdn.jsdelivr.net/npm/simple-icons@11.13.0/icons/cypress.svg";
  if (normalized.includes("github") || normalized.includes("ci/cd")) 
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
  if (normalized.includes("vercel")) 
    return "https://cdn.jsdelivr.net/npm/simple-icons@11.13.0/icons/vercel.svg";

  return null;
}

function getBadgeVariant(level: string): "pink" | "orange" | "blue" | "outline" {
  const normalized = level.toLowerCase().trim();
  if (normalized.includes("expert")) return "orange";
  if (normalized.includes("advanced")) return "pink";
  if (normalized.includes("intermediate")) return "blue";
  return "outline";
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient();
        
        // Fetch technical skills
        const { data: skillsData, error: skillsError } = await supabase
          .from("skills")
          .select("*")
          .order("order_index", { ascending: true });

        if (skillsError) {
          console.error("Failed to fetch technical skills:", skillsError);
        } else if (skillsData && skillsData.length > 0) {
          setSkills(skillsData as Skill[]);
        }

        // Fetch soft skills
        const { data: softData, error: softError } = await supabase
          .from("soft_skills")
          .select("*")
          .order("order_index", { ascending: true });

        if (softError) {
          console.error("Failed to fetch soft skills:", softError);
        } else if (softData && softData.length > 0) {
          setSoftSkills(softData as SoftSkill[]);
        }
      } catch (err) {
        console.error("Failed to fetch skills from Supabase:", err);
      }
    }

    fetchData();
  }, []);

  // Format skills dynamically grouped by category
  const renderedCategories = CATEGORY_ORDER.map((catName) => {
    const catSkills = skills.filter((s) => s.category === catName);
    const mapInfo = CATEGORY_MAP[catName] || {
      color: "bg-neo-pink",
      icon: <Code className="w-6 h-6 text-black" />,
    };

    return {
      title: catName,
      color: mapInfo.color,
      icon: mapInfo.icon,
      skills: catSkills.length > 0 
        ? catSkills.map((s) => ({ name: s.name, level: s.level, percentage: s.percentage }))
        : fallbackCategories.find((c) => c.title === catName)?.skills || [],
    };
  });

  const renderedSoftSkills = softSkills.length > 0 
    ? softSkills.map((s) => ({ title: s.title, description: s.description }))
    : fallbackSoftSkills;

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200 relative overflow-hidden">
      <SkillsBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 
        {/* Heading */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-neo-green text-black neo-border shadow-neo flex items-center justify-center">
            <Hammer className="w-8 h-8" />
          </div>
          <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight">
            MY SKILLS
          </h1>
        </div>
 
        {/* Categories Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {renderedCategories.map((category, index) => (
            <Card
              key={index}
              className="col-span-12 md:col-span-12 lg:col-span-4 flex flex-col h-full bg-white dark:bg-zinc-900 border-4 border-black hover:translate-y-[-4px] transition-transform duration-200 shadow-neo"
            >
              {/* Category Header */}
              <div className={`flex items-center gap-3 p-4 border-b-4 border-black ${category.color} text-black font-space font-black text-lg uppercase`}>
                <div className="p-1.5 bg-white border-2 border-black">
                  {category.icon}
                </div>
                <span>{category.title}</span>
              </div>
 
              {/* Skills and Progress */}
              <div className="p-6 space-y-6 flex-grow bg-white dark:bg-zinc-900">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex items-center justify-between font-sans font-bold text-sm">
                      <div className="flex items-center gap-2.5">
                        {getSkillIconUrl(skill.name) ? (
                          <div className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center p-0.5 shadow-neo-sm shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={getSkillIconUrl(skill.name)!} 
                              alt={skill.name} 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-white dark:bg-zinc-800 border-2 border-black flex items-center justify-center text-[9px] font-space font-black text-black dark:text-white shadow-neo-sm shrink-0">
                            {skill.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span className="text-zinc-800 dark:text-zinc-200">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeVariant(skill.level)}>
                          {skill.level}
                        </Badge>
                        <span className="text-zinc-500 text-xs">{skill.percentage}%</span>
                      </div>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 border-2 border-black shadow-neo-sm overflow-hidden">
                      <div
                        className={`h-full ${category.color} border-r-2 border-black`}
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
 
        {/* Soft Skills Section */}
        <div className="mt-12 p-6 md:p-8 bg-neo-yellow border-4 border-black shadow-neo">
          <h3 className="font-space font-black text-xl md:text-2xl uppercase tracking-tight text-black mb-2">
            SOFT SKILLS
          </h3>
          <div className="w-full h-1 bg-black mb-6" />
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderedSoftSkills.map((soft, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-4 border-2 border-black shadow-neo-sm hover:-translate-y-0.5 hover:shadow-neo transition-all duration-200"
              >
                <h4 className="font-space font-black text-xs md:text-sm uppercase text-black dark:text-white mb-1.5 leading-tight">
                  {soft.title}
                </h4>
                <p className="font-sans font-semibold text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                  {soft.description}
                </p>
              </div>
            ))}
          </div>
        </div>
 
        {/* Legend */}
        <div className="mt-12 p-6 bg-white dark:bg-zinc-900 border-4 border-black shadow-neo">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-6 h-6 text-black dark:text-white" />
            <h3 className="font-space font-black text-xl uppercase leading-none">PROFICIENCY METRIC</h3>
          </div>
          <p className="font-sans font-bold text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            Proficiencies are evaluated based on production deployments, project complexity, and direct software application lifecycle management.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="orange">Expert</Badge>
              <span className="font-sans font-semibold text-xs text-zinc-500">90% - 100% (High Autonomy & Mastery)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="pink">Advanced</Badge>
              <span className="font-sans font-semibold text-xs text-zinc-500">80% - 89% (High competence & architecture knowledge)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="blue">Intermediate</Badge>
              <span className="font-sans font-semibold text-xs text-zinc-500">70% - 79% (Capable, code-assisted or simple deployments)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Learning / Beginner</Badge>
              <span className="font-sans font-semibold text-xs text-zinc-500">Below 70% (Basic understanding or currently learning)</span>
            </div>
          </div>
        </div>
 
      </div>
    </div>
  );
}
