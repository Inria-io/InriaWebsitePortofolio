"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/icons";
import { Project } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRandomNeoColor } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Use index to assign a stable but varied color to the card details or badges
  const bgColors = ["bg-neo-blue/20", "bg-neo-pink/20", "bg-neo-green/20", "bg-neo-yellow/20", "bg-neo-purple/20"];
  const cardAccentBg = bgColors[index % bgColors.length];

  return (
    <Card
      interactive
      className="flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-900 border-4 border-black hover:translate-y-[-6px] shadow-neo duration-300"
    >
      {/* Project Image Placeholder / Visual */}
      <div className={`w-full h-48 border-b-4 border-black relative ${cardAccentBg} flex items-center justify-center p-4 overflow-hidden group`}>
        {project.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image_url}
            alt={project.title}
            className="object-cover object-top w-full h-full neo-border shadow-neo-sm group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center font-space p-6">
            <span className="font-black text-2xl uppercase tracking-tighter text-black/80 dark:text-white/80 bg-white dark:bg-zinc-950 px-3 py-1.5 border-2 border-black shadow-neo-sm">
              {project.title.substring(0, 3)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tIdx) => (
              <Badge key={tIdx} variant={getRandomNeoColor(tIdx).replace("bg-neo-", "") as any}>
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="font-space font-black text-xl md:text-2xl uppercase text-black dark:text-white leading-tight hover:text-neo-blue dark:hover:text-neo-blue transition-colors hover:underline">
            <Link href={`/portfolio/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="font-sans font-semibold text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <Link href={`/portfolio/${project.slug}`} className="group inline-flex items-center gap-1.5 font-space font-extrabold uppercase text-xs hover:text-neo-blue transition-colors">
            Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white hover:bg-neo-yellow text-black border-2 border-black shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-neo-sm transition-all"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white hover:bg-neo-blue text-black border-2 border-black shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-neo active:translate-x-0 active:translate-y-0 active:shadow-neo-sm transition-all"
                aria-label="Live Site"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
