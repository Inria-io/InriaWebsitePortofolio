import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getRandomNeoColor } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getLocalPost(slug: string): Promise<BlogPost | null> {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      id: slug,
      slug,
      title: data.title || "Untitled",
      published_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      created_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      summary: data.summary || "",
      cover_image: data.cover_image || "",
      tags: data.tags || [],
      published: true,
      content,
    };
  } catch (err) {
    console.error(`Error loading local post [${slug}]:`, err);
    return null;
  }
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // 1. Try to read local file
  let post = await getLocalPost(slug);
  let isLocal = true;

  // 2. Try to fetch from Supabase if not found locally
  if (!post) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      
      if (data) {
        post = data as BlogPost;
        isLocal = false;
      }
    } catch (err) {
      console.error(`Failed to load post [${slug}] from database:`, err);
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[#F4F3EF] dark:bg-zinc-950 min-h-screen text-black dark:text-white transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 font-space font-extrabold uppercase text-sm mb-8 hover:text-neo-blue transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Source indicator */}
        <div className="mb-4">
          <span className={`font-space font-black uppercase text-xs border-2 border-black px-2 py-1 shadow-neo-sm ${isLocal ? "bg-neo-yellow text-black" : "bg-neo-green text-black"}`}>
            {isLocal ? "Static Article" : "Live DB Article"}
          </span>
        </div>

        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <Badge key={idx} variant={getRandomNeoColor(idx).replace("bg-neo-", "") as any}>
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-space font-black text-4xl md:text-6xl uppercase tracking-tight leading-tight text-black dark:text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-space font-extrabold uppercase text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>Written by Inria</span>
              </div>
            </div>
          </div>

          {/* Cover Placeholder / Image */}
          {post.cover_image && (
            <Card className="w-full h-80 overflow-hidden border-4 border-black p-0 shadow-neo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </Card>
          )}

          {/* Main Article Body */}
          <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 md:p-10 shadow-neo">
            <div className="prose dark:prose-invert max-w-none font-sans font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-6">
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="font-space font-black text-3xl uppercase text-black dark:text-white border-b-4 border-black dark:border-zinc-700 pb-2 mt-8 mb-4" {...props} />,
                  h2: ({ ...props }) => <h2 className="font-space font-black text-2xl uppercase text-black dark:text-white mt-6 mb-3" {...props} />,
                  h3: ({ ...props }) => <h3 className="font-space font-black text-xl uppercase text-black dark:text-white mt-4 mb-2" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 text-sm md:text-base leading-relaxed" {...props} />,
                  ul: ({ ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 pl-2 text-sm md:text-base" {...props} />,
                  ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 pl-2 text-sm md:text-base" {...props} />,
                  li: ({ ...props }) => <li className="marker:text-black dark:marker:text-white text-zinc-700 dark:text-zinc-300" {...props} />,
                  hr: () => <hr className="my-8 border-t-2 border-dashed border-black dark:border-zinc-700" />,
                  blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-black dark:border-white bg-zinc-50 dark:bg-zinc-800 p-4 font-space font-extrabold italic shadow-neo-sm my-4" {...props} />
                  ),
                  pre: ({ ...props }) => <pre className="bg-zinc-900 text-zinc-100 p-4 border-4 border-black shadow-neo-sm overflow-x-auto text-xs md:text-sm font-mono my-4 rounded-none" {...props} />,
                  code: ({ ...props }) => <code className="bg-zinc-100 dark:bg-zinc-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 border border-black dark:border-zinc-700 text-xs font-mono" {...props} />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </Card>

        </article>

      </div>
    </div>
  );
}
