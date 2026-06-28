"use client";

import React, { useEffect, useState, useRef } from "react";
import { MessageCircle, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Testimonial } from "@/lib/types";
import Image from "next/image";
import { BlogBackground } from "./bg-animations";

// Fallback data if Supabase is empty or unavailable
const fallbackTestimonials: Testimonial[] = [
  {
    id: "fallback-1",
    created_at: "",
    name: "Aditya Soleh",
    role: "CEO & Founder Digital Skola",
    quote:
      'Saya sudah berkolaborasi bersama selama kurang lebih 2 tahun, dimana dirinya berperan sebagai salah 1 tutor Data Science di Digital Skola. Sebagai seorang tutor, peran utamanya adalah mengajarkan materi-materi terkait Data Science kepada para "Techies".',
    order_index: 1,
  },
  {
    id: "fallback-2",
    created_at: "",
    name: "Winson Sasongko Purnomo",
    role: "Digital Marketing Manager Cocotel International",
    quote:
      "A perfect example of a skilled Automation Engineer in any IT related fields. Brings all the abilities to the table. Focused, reliable, and goal-oriented, and an outstanding person.",
    order_index: 2,
  },
  {
    id: "fallback-3",
    created_at: "",
    name: "Imam Suprapto",
    role: "Owner Djoyoline Group",
    quote:
      "Saya dengan senang hati merekomendasikan untuk dedikasi luar biasanya di perusahaan kami. Berperan penting dalam menghasilkan beberapa aplikasi inovatif yang telah sangat meningkatkan produktivitas dan efisiensi kami.",
    order_index: 3,
  },
];

const CARD_COLORS = ["bg-neo-yellow", "bg-neo-blue", "bg-neo-pink", "bg-neo-green"];

export function ThemAboutMe() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("order_index", { ascending: true });

        if (!error && data && data.length > 0) {
          setTestimonials(data as Testimonial[]);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    }

    fetchTestimonials();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = window.innerWidth >= 768 ? 32 : 24; // md:gap-8 vs gap-6
        scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.getBoundingClientRect().width;
        const gap = window.innerWidth >= 768 ? 32 : 24;
        scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="w-full pt-4 pb-12 md:pt-6 md:pb-16 border-b-4 border-black dark:border-white bg-transparent dark:bg-zinc-950 transition-colors duration-200 relative overflow-hidden">
      <BlogBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading — same style as Skills Index */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neo-pink text-black neo-border shadow-neo flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h2 className="font-space font-black text-3xl md:text-5xl uppercase tracking-tight">
              THEM ABOUT ME
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="p-3 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 hover:bg-neo-yellow dark:hover:bg-neo-yellow dark:hover:text-black transition-all cursor-pointer flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-white dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 hover:bg-neo-yellow dark:hover:bg-neo-yellow dark:hover:text-black transition-all cursor-pointer flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Cards Slider Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory gap-6 md:gap-8 pb-4"
        >
          {testimonials.map((testimonial, idx) => {
            const accentColor = CARD_COLORS[idx % CARD_COLORS.length];
            const initials = testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={testimonial.id}
                className="snap-start w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)] shrink-0 relative flex flex-col justify-between bg-white dark:bg-zinc-900 border-4 border-black dark:border-zinc-700 shadow-neo p-6 md:p-8 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <div
                    className={`inline-flex p-2 ${accentColor} border-2 border-black`}
                  >
                    <Quote className="w-5 h-5 text-black" />
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-sans font-semibold text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed italic mb-6 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="w-full h-1 bg-black dark:bg-zinc-700 mb-4" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar — photo or initials */}
                  {testimonial.avatar_url ? (
                    <div className="relative w-16 h-16 md:w-20 md:h-20 border-2 border-black overflow-hidden rounded-full flex-shrink-0 shadow-neo-sm">
                      <Image
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 80px"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 ${accentColor} border-2 border-black flex items-center justify-center font-space font-black text-lg md:text-xl text-black rounded-full flex-shrink-0 shadow-neo-sm`}
                    >
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="font-space font-black text-sm uppercase text-black dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="font-sans font-semibold text-xs text-zinc-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
