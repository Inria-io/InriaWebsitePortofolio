import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BookOpen, Calendar, ArrowRight, Tag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogBackground } from "@/components/sections/bg-animations";
import { formatDate, getRandomNeoColor } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface ExtendedBlogPost extends BlogPost {
  isLocal?: boolean;
}

async function getLocalPosts(): Promise<ExtendedBlogPost[]> {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    const filenames = fs.readdirSync(postsDirectory);
    return filenames
      .filter((filename) => filename.endsWith(".mdx") || filename.endsWith(".md"))
      .map((filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return {
          id: filename.replace(/\.mdx?$/, ""),
          slug: filename.replace(/\.mdx?$/, ""),
          title: data.title || "Untitled",
          published_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          created_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
          summary: data.summary || "",
          cover_image: data.cover_image || "",
          tags: data.tags || [],
          published: true,
          content: "",
          isLocal: true,
        };
      });
  } catch (err) {
    console.error("Error reading local posts:", err);
    return [];
  }
}

export default async function BlogPage() {
  let dbPosts: BlogPost[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (data) dbPosts = data as BlogPost[];
  } catch (err) {
    console.error("Failed to load blog posts from Supabase in BlogPage:", err);
  }

  const localPosts = await getLocalPosts();
  const allPosts: ExtendedBlogPost[] = [...localPosts, ...dbPosts].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200 relative overflow-hidden">
      <BlogBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neo-yellow text-black neo-border shadow-neo flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight">
              THE BLOG
            </h1>
          </div>
          <p className="font-sans font-bold text-zinc-600 dark:text-zinc-400 max-w-sm md:text-right">
            Articles on frontend development, UI trends, styling techniques, and software lessons.
          </p>
        </div>

        {/* Database Sync Notice */}
        {dbPosts.length === 0 && (
          <div className="mb-8 p-4 bg-neo-blue/20 border-2 border-dashed border-black dark:border-white text-xs font-semibold uppercase text-center rounded-none text-black dark:text-white">
            Displaying local static posts. Connect your Supabase database and add blog entries via Supabase Dashboard to populate live content.
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, idx) => {
            const labelColor = post.isLocal ? "bg-neo-yellow" : "bg-neo-green";
            const labelText = post.isLocal ? "STATIC MDX" : "LIVE DB";

            return (
              <Card
                key={post.slug}
                interactive
                className="flex flex-col h-full bg-white dark:bg-zinc-900 border-4 border-black hover:translate-y-[-6px] shadow-neo overflow-hidden duration-300"
              >
                {/* Visual Cover Header */}
                <div className="w-full h-12 border-b-4 border-black bg-zinc-100 dark:bg-zinc-800 flex items-center justify-between px-4">
                  <span className={`font-space font-extrabold uppercase text-[10px] ${labelColor} text-black border-2 border-black px-1.5 py-0.5 shadow-neo-sm`}>
                    {labelText}
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full border border-black" />
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full border border-black" />
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-space font-extrabold uppercase text-zinc-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(post.published_at)}</span>
                    </div>

                    <h2 className="font-space font-black text-xl md:text-2xl uppercase text-black dark:text-white leading-tight line-clamp-2 hover:text-neo-blue transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="font-sans font-semibold text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Footer tags & read link */}
                  <div className="pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag, tIdx) => (
                        <Badge key={tIdx} variant={getRandomNeoColor(tIdx + idx).replace("bg-neo-", "") as any}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-center gap-1.5 font-space font-extrabold uppercase text-xs hover:text-neo-blue transition-colors"
                    >
                      Read Post
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
