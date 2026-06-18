import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Code } from "lucide-react";
import { GithubIcon as Github } from "@/components/ui/icons";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getRandomNeoColor } from "@/lib/utils";

// Allow fresh database fetch
export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  let project: Project | null = null;
  let isMock = false;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();
    
    if (data) {
      project = data as Project;
    }
  } catch (err) {
    console.error("Failed to load project from Supabase:", err);
  }

  // Fallback mock check to support demo links
  if (!project) {
    const mocks: Record<string, Project> = {
      "fintech-neo-wallet": {
        id: "mock-1",
        created_at: new Date().toISOString(),
        title: "FinTech Neo-Wallet",
        slug: "fintech-neo-wallet",
        description: "A secure, high-speed multi-currency financial dashboard styled with heavy graphic layouts, featuring real-time transaction tracking and analytics.",
        content: `
# FinTech Neo-Wallet

This is a comprehensive, production-grade financial tracker styled with **Neobrutalism UI**. It facilitates transfers, invoice compilation, currency conversion, and charts representation.

### Features
* **Multi-Currency Wallets**: Manage USD, EUR, IDR, and BTC under separate ledgers.
* **Graphical Charts**: Styled using high-contrast lines and grids powered by \`Recharts\`.
* **Instant Payments**: Integration with peer transaction handlers.
* **PDF Invoicing**: One-click custom downloads.

### Core Stack
1. **Next.js 14** (App Router & SSR)
2. **Supabase** (Postgres DB, Session tokens, Row Level Security)
3. **Tailwind CSS** (Bold colors and flat cards configuration)
4. **Recharts** (Custom grid-designed analytics)

---
Developed as a sample showcase of premium dashboard aesthetics.
`,
        tags: ["Next.js", "Supabase", "Tailwind CSS", "Recharts"],
        featured: true,
        github_url: "https://github.com",
        live_url: "https://example.com",
      },
      "cyber-mart-e-commerce": {
        id: "mock-2",
        created_at: new Date().toISOString(),
        title: "Cyber Mart E-Commerce",
        slug: "cyber-mart-e-commerce",
        description: "Striking storefront with full shopping cart capabilities, user authentication, and stripe checkout integration wrapped in visual grid components.",
        content: `
# Cyber Mart E-Commerce

An intense, highly graphical store interface. It skips typical sterile e-commerce styling in favor of bold neon indicators, high-contrast buttons, and retro layouts.

### Main Mechanics
* **Add to Cart & Checkout**: Interactive storage and validation.
* **Stripe Payment Sheet**: Secure transaction triggers.
* **Admin dashboard**: Easily insert new products, change pricing, and check total earnings.
* **Theme Adaptability**: Dark mode and light mode neobrutalist variants.
`,
        tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
        featured: true,
        github_url: "https://github.com",
        live_url: "https://example.com",
      },
      "pixel-drawing-board": {
        id: "mock-3",
        created_at: new Date().toISOString(),
        title: "Pixel Drawing Board",
        slug: "pixel-drawing-board",
        description: "Real-time collaborative canvas where users can draw, export, and chat with peers. Built with heavy visual interfaces and Canvas APIs.",
        content: `
# Pixel Drawing Board

Collaborative visual workspace using HTML5 Canvas and socket handshakes.

### Highlights
* **WebSockets Server**: Coordinates paint updates.
* **Neobrutalist tools selection panel**: Styled to look like retro drawing programs (e.g. MS Paint 95).
`,
        tags: ["TypeScript", "Canvas", "Socket.io", "CSS Grid"],
        featured: false,
        github_url: "https://github.com",
        live_url: "https://example.com",
      },
    };

    if (mocks[slug]) {
      project = mocks[slug];
      isMock = true;
    }
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <Link href="/portfolio" className="inline-flex items-center gap-1.5 font-space font-extrabold uppercase text-sm mb-8 hover:text-neo-blue transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {isMock && (
          <div className="mb-8 p-4 bg-neo-yellow/30 border-2 border-dashed border-black dark:border-white text-xs font-semibold uppercase text-center rounded-none text-black dark:text-white">
            Demo Project Showcase. Create this project in your Supabase database to edit details.
          </div>
        )}

        <div className="space-y-8">
          
          {/* Headline details */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <Badge key={idx} variant={getRandomNeoColor(idx).replace("bg-neo-", "") as any}>
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="flex items-center gap-4 text-sm font-space font-extrabold uppercase text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(project.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Graphical placeholder/cover image */}
          <Card className={`w-full overflow-hidden bg-neo-blue/15 border-4 border-black shadow-neo flex items-center justify-center p-4 ${project.image_url ? 'h-auto' : 'h-80 md:h-96'}`}>
            {project.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-auto object-contain neo-border shadow-neo-sm"
              />
            ) : (
              <div className="flex flex-col items-center text-center max-w-sm font-space">
                <Code className="w-16 h-16 text-black dark:text-white mb-4" />
                <span className="font-black text-2xl uppercase tracking-wider bg-white dark:bg-zinc-900 border-2 border-black dark:border-white px-4 py-2 shadow-neo">
                  PROJECT PREVIEW
                </span>
              </div>
            )}
          </Card>

          {/* Layout Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main content */}
            <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border-4 border-black p-6 md:p-8 shadow-neo">
              <article className="prose dark:prose-invert max-w-none font-sans font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-6">
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => <h1 className="font-space font-black text-3xl uppercase text-black dark:text-white border-b-4 border-black dark:border-zinc-700 pb-2 mt-8 mb-4" {...props} />,
                    h2: ({ ...props }) => <h2 className="font-space font-black text-2xl uppercase text-black dark:text-white mt-6 mb-3" {...props} />,
                    h3: ({ ...props }) => <h3 className="font-space font-black text-xl uppercase text-black dark:text-white mt-4 mb-2" {...props} />,
                    p: ({ ...props }) => <p className="mb-4 text-sm md:text-base" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 pl-2 text-sm md:text-base" {...props} />,
                    li: ({ ...props }) => <li className="marker:text-black dark:marker:text-white" {...props} />,
                    hr: () => <hr className="my-6 border-t-2 border-dashed border-black dark:border-zinc-700" />,
                    code: ({ ...props }) => <code className="bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 border border-black text-xs font-mono" {...props} />,
                  }}
                >
                  {project.content}
                </ReactMarkdown>
              </article>
            </div>

            {/* Links and metadata sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 shadow-neo space-y-6">
                <h3 className="font-space font-black text-xl uppercase text-black dark:text-white border-b-2 border-black pb-2">
                  PROJECT LINKS
                </h3>

                <div className="flex flex-col space-y-4">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="primary" className="w-full flex items-center justify-center gap-2 py-3">
                        <ExternalLink className="w-5 h-5 text-black" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3">
                        <Github className="w-5 h-5" />
                        Repository
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
