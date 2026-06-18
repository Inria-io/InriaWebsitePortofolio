import React from "react";
import { FolderGit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { PortfolioClient } from "./portfolio-client";
import { PortfolioBackground } from "@/components/sections/bg-animations";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  let dbProjects: Project[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) dbProjects = data as Project[];
  } catch (err) {
    console.error("Failed to load projects from Supabase in PortfolioPage:", err);
  }

  // Fallback showcase projects if DB is empty
  const mockProjects: Project[] = [
    {
      id: "mock-1",
      created_at: new Date().toISOString(),
      title: "FinTech Neo-Wallet",
      slug: "fintech-neo-wallet",
      description: "A secure, high-speed multi-currency financial dashboard styled with heavy graphic layouts, featuring real-time transaction tracking and analytics.",
      content: "",
      tags: ["Next.js", "Supabase", "Tailwind CSS", "Recharts"],
      featured: true,
      github_url: "https://github.com",
      live_url: "https://example.com",
    },
    {
      id: "mock-2",
      created_at: new Date().toISOString(),
      title: "Cyber Mart E-Commerce",
      slug: "cyber-mart-e-commerce",
      description: "Striking storefront with full shopping cart capabilities, user authentication, and stripe checkout integration wrapped in visual grid components.",
      content: "",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      featured: true,
      github_url: "https://github.com",
      live_url: "https://example.com",
    },
    {
      id: "mock-3",
      created_at: new Date().toISOString(),
      title: "Pixel Drawing Board",
      slug: "pixel-drawing-board",
      description: "Real-time collaborative canvas where users can draw, export, and chat with peers. Built with heavy visual interfaces and Canvas APIs.",
      content: "",
      tags: ["TypeScript", "Canvas", "Socket.io", "CSS Grid"],
      featured: false,
      github_url: "https://github.com",
      live_url: "https://example.com",
    },
  ];

  const initialProjects = dbProjects.length > 0 ? dbProjects : mockProjects;

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200 relative overflow-hidden">
      <PortfolioBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neo-pink text-black neo-border shadow-neo flex items-center justify-center">
              <FolderGit className="w-8 h-8" />
            </div>
            <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight">
              PORTFOLIO
            </h1>
          </div>
          <p className="font-sans font-bold text-zinc-600 dark:text-zinc-400 max-w-md md:text-right">
            A gallery of websites, tools, and digital solutions I have built. Use search or filter tags to refine.
          </p>
        </div>

        {dbProjects.length === 0 && (
          <div className="mb-8 p-4 bg-neo-yellow/30 border-2 border-dashed border-black dark:border-white text-xs font-semibold uppercase text-center rounded-none text-black dark:text-white">
            Showing showcase projects. Configure Supabase database & add projects to see live entries.
          </div>
        )}

        {/* Client Interactive Area */}
        <PortfolioClient initialProjects={initialProjects} />

      </div>
    </div>
  );
}
