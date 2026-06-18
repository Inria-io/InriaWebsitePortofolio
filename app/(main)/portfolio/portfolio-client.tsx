"use client";

import React, { useState, useMemo } from "react";
import { Search, Tag } from "lucide-react";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";

interface PortfolioClientProps {
  initialProjects: Project[];
}

export function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    initialProjects.forEach((project) => {
      project.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [initialProjects]);

  // Filter projects based on search query and selected tag
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag
        ? project.tags.includes(selectedTag)
        : true;

      return matchesSearch && matchesTag;
    });
  }, [initialProjects, searchQuery, selectedTag]);

  return (
    <div className="space-y-10">
      
      {/* Search & Filter bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Search */}
        <div className="md:col-span-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, description..."
            className="w-full p-4 pl-12 font-sans font-semibold border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-neo focus:translate-y-[-2px] focus:shadow-neo-lg focus:outline-none focus:bg-neo-yellow/10 transition-all"
          />
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
        </div>

        {/* Tags quick filter */}
        <div className="md:col-span-6 flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1.5 font-space font-extrabold text-xs uppercase bg-white dark:bg-zinc-900 border-2 border-black dark:border-white px-2 py-1.5 shadow-neo-sm text-black dark:text-white shrink-0">
            <Tag className="w-3.5 h-3.5" />
            <span>Tags:</span>
          </div>
          
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 font-space font-extrabold uppercase text-xs neo-border shadow-neo-sm transition-all cursor-pointer ${
              selectedTag === null
                ? "bg-neo-yellow text-black -translate-x-0.5 -translate-y-0.5"
                : "bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-100 hover:text-black"
            }`}
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1.5 font-space font-extrabold uppercase text-xs neo-border shadow-neo-sm transition-all cursor-pointer ${
                selectedTag === tag
                  ? "bg-neo-blue text-black -translate-x-0.5 -translate-y-0.5"
                  : "bg-white dark:bg-zinc-900 text-black dark:text-white hover:bg-zinc-100 hover:text-black"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center neo-border bg-white dark:bg-zinc-900 shadow-neo font-space font-black uppercase text-xl text-zinc-500">
          No projects match your query. Try clearing filters!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
