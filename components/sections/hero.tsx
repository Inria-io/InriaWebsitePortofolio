"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Coffee, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpaceParticles } from "./space-particles";
import { ClickBurst } from "@/components/ui/click-burst";

// Helper component for digital text scrambling effect on load
function ScrambledText({ text, delay = 0, start = true }: { text: string; delay?: number; start?: boolean }) {
  const chars = "!@#$%^&*()_+{}:<>?/[]=-";

  // Deterministic initialization based on character index (NOT random) to prevent hydration mismatch
  const [displayText, setDisplayText] = useState(() =>
    text
      .split("")
      .map((char, i) => (char === " " ? " " : chars[i % chars.length]))
      .join("")
  );

  useEffect(() => {
    if (!start) return;

    let index = 0;
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < index) return text[i];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        // Speed up the reveal step for longer texts so they resolve quickly and look smoother
        const step = text.length > 10 ? 0.75 : 0.35;
        index += step;
        if (index >= text.length + 1) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);
    };

    const timer = setTimeout(() => {
      startScramble();
    }, delay);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, start]);

  return <span>{displayText}</span>;
}

export function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // If the preloader has already finished or is not active
      if ((window as any).preloaderFinished) {
        setPreloaderDone(true);
        return;
      }

      const handlePreloaderFinished = () => {
        setPreloaderDone(true);
      };

      window.addEventListener("preloaderFinished", handlePreloaderFinished);
      return () => {
        window.removeEventListener("preloaderFinished", handlePreloaderFinished);
      };
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate normalized cursor coordinates (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOverlayOpen(false);
      }
    };
    if (isOverlayOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOverlayOpen]);

  return (
    <section className="w-full relative overflow-hidden pt-16 md:pt-24 pb-0 bg-[#FFDE4D]/10 dark:bg-zinc-950 transition-colors duration-200">
      {/* SpaceX-style Particle Background */}
      <SpaceParticles />

      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Click Burst Effect overlaying Hero Content */}
      <ClickBurst>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Hero Text Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-neo-pink text-black font-space font-extrabold uppercase neo-border shadow-neo-sm"
              >
                <Sparkles className="w-4 h-4 text-black fill-black" />
                <span>Available for Hire</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-space font-black text-5xl md:text-7xl uppercase leading-none tracking-tight text-black dark:text-white"
              >
                HI, I'M <span className="bg-neo-yellow dark:text-black px-2 inline-block rotate-[-1deg] neo-border shadow-neo"><ScrambledText text="INRIA" delay={200} start={preloaderDone} /></span>
                <br />
                <span className="text-neo-blue dark:text-neo-blue"><ScrambledText text="TECH ENTREPRENEUR" delay={400} start={preloaderDone} /></span> & DEVELOPER.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-sans font-semibold text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed"
              >
                Developer by skill, entrepreneur by mindset. I build full-stack apps, mobile products, and secure systems — with the long game of building my own tech company.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link href="/portfolio">
                  <Button variant="primary" className="flex items-center gap-2">
                    View My Work
                    <ArrowRight className="w-5 h-5 text-black" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Hero Graphic Column - Interactive 3D Astronaut-style Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={preloaderDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 flex justify-center items-center py-8"
              style={{ perspective: "1200px" }}
            >
              <div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setCoords({ x: 0, y: 0 });
                }}
                onClick={() => setIsOverlayOpen(true)}
                className="relative w-96 h-96 flex items-center justify-center cursor-pointer select-none"
              >
                {/* 1. BACK CARD: System Config Box */}
                <motion.div
                  animate={{
                    rotateX: coords.y * -15,
                    rotateY: coords.x * 15,
                    x: coords.x * -15 - 45,
                    y: isHovered ? coords.y * -15 - 25 : [-25, -30, -25],
                    rotate: -4,
                  }}
                  transition={{
                    y: isHovered ? { type: "spring", stiffness: 300, damping: 25 } : { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    default: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                  className="absolute w-[320px] h-[320px] bg-neo-green neo-border shadow-neo rounded-none p-5 flex flex-col justify-between text-black z-10 opacity-70 dark:opacity-80"
                >
                  <div className="flex justify-between items-start">
                    <Code2 className="w-8 h-8" />
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-red-500 rounded-full border border-black" />
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full border border-black" />
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <p className="font-space font-black text-xl uppercase">SYSTEM.CONFIG</p>
                    <div className="font-mono text-xs space-y-0.5 bg-white/70 p-2.5 border border-black">
                      <p className="text-purple-700">&gt; npm run dev</p>
                      <p className="text-green-700">✓ Compiled successfully</p>
                      <p className="text-zinc-600">⚡ Ready on port 3000</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-black text-xs font-space font-extrabold uppercase">
                    <div className="flex items-center gap-1">
                      <Coffee className="w-4 h-4" />
                      <span>Coffee</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span>Quality</span>
                    </div>
                  </div>
                </motion.div>

                {/* 2. FRONT CARD: User Photo Frame (Astronaut Placeholder) */}
                <motion.div
                  animate={{
                    rotateX: coords.y * -30,
                    rotateY: coords.x * 30,
                    x: coords.x * 20 + 25,
                    // When not hovered, floats with a slightly different frequency to the background card
                    y: isHovered ? coords.y * 20 + 25 : [25, 15, 25],
                    rotate: 2,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    y: isHovered ? { type: "spring", stiffness: 300, damping: 20 } : { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                    default: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="absolute w-[280px] h-[280px] md:w-[330px] md:h-[330px] bg-white dark:bg-zinc-800 border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,139,255,1)] dark:shadow-[8px_8px_0px_0px_rgba(107,203,119,1)] rounded-none overflow-hidden z-20 flex items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/foto-aku.jpeg"
                    alt="Inria's Portrait"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-300 select-none"
                  />

                  {/* Overlapping Badge inside frame */}
                  <div className="absolute bottom-2 right-2 bg-black text-white dark:bg-white dark:text-black font-mono text-[9px] px-2 py-0.5 border border-black uppercase font-bold tracking-wider">
                    OS_INRIA.IMG
                  </div>
                </motion.div>

                {/* 3. FLOATING BADGES / STICKERS */}
                {/* Hello Badge (Bottom Left of photo) */}
                <motion.div
                  animate={{
                    rotateX: coords.y * -40,
                    rotateY: coords.x * 40,
                    x: coords.x * 35 - 75,
                    y: isHovered ? coords.y * 35 + 115 : [115, 120, 115],
                    rotate: -8,
                  }}
                  transition={{
                    y: isHovered ? { type: "spring", stiffness: 300, damping: 15 } : { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
                    default: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className="absolute bg-neo-pink text-black font-space font-black uppercase text-xs px-3 py-1 border-2 border-black shadow-neo-sm z-30 pointer-events-none"
                >
                  HELLO! ✦
                </motion.div>

                {/* Star Sticker (Top Right of photo) */}
                <motion.div
                  animate={{
                    rotateX: coords.y * -40,
                    rotateY: coords.x * 40,
                    x: coords.x * 45 + 135,
                    y: isHovered ? coords.y * 45 - 120 : [-120, -115, -120],
                    rotate: 12,
                  }}
                  transition={{
                    y: isHovered ? { type: "spring", stiffness: 300, damping: 15 } : { repeat: Infinity, duration: 3.8, ease: "easeInOut" },
                    default: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className="absolute bg-neo-yellow text-black font-space font-black uppercase text-xs px-2.5 py-0.5 border-2 border-black shadow-neo-sm z-30 pointer-events-none flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>CREATOR</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </ClickBurst>

      {/* Marquee Strip */}
      <div className="w-full bg-black dark:bg-white text-white dark:text-black py-4 border-t-4 border-b-4 border-black dark:border-white mt-16 overflow-hidden flex whitespace-nowrap select-none font-space font-black text-xl md:text-2xl uppercase tracking-wider">
        <div className="flex animate-marquee shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 fill-current text-neo-yellow dark:text-neo-pink" />
                <span>Future Founder</span>
              </span>
              <span className="mx-4">✦</span>
              <span className="mx-4 text-neo-blue dark:text-neo-blue">Cybersecurity</span>
              <span className="mx-4">✦</span>
              <span className="mx-4">AI Explorer</span>
              <span className="mx-4">✦</span>
              <span className="mx-4 text-neo-pink dark:text-neo-pink">Full-Stack Dev</span>
              <span className="mx-4">✦</span>
              <span className="mx-4">Turning Code Into Business</span>
              <span className="mx-4">✦</span>
              <span className="mx-4 text-neo-yellow dark:text-neo-pink">Build Fast, Ship Faster</span>
              <span className="mx-4">✦</span>
              <span className="mx-4">Security First Mindset</span>
              <span className="mx-4">✦</span>
              <span className="mx-4 text-neo-green dark:text-neo-green">Turning Ideas Into Products</span>
              <span className="mx-4">✦</span>
              <span className="mx-4">Code with Purpose</span>
              <span className="mx-4">✦</span>
              <span className="mx-4 text-neo-yellow dark:text-neo-pink">Always Learning</span>
              <span className="mx-4">✦</span>
              <span className="mx-4">Dream Big, Build Bigger</span>
              <span className="mx-4">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Full-Screen Pop-Out Overlay showing background removed portrait with poster decorations */}
      {isOverlayOpen && (
        <motion.div
          key="hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOverlayOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md cursor-pointer p-4"
        >
          {/* Close instruction badge */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOverlayOpen(false);
            }}
            className="absolute top-6 right-6 bg-neo-yellow text-black font-space font-black uppercase text-sm border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-[100] cursor-pointer hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            CLOSE [X]
          </button>

          {/* Content Poster Layout */}
          <motion.div
            key="hero-overlay-content"
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full h-[85vh] flex flex-col items-center justify-center pointer-events-auto select-none"
          >

            {/* Rotating Neobrutalist backing graphic */}
            <motion.div
              key="hero-overlay-backing"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                scale: { type: "spring", stiffness: 100, damping: 20 },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
              className="absolute w-80 h-80 md:w-[480px] md:h-[480px] rounded-full border-8 border-black bg-neo-pink shadow-[12px_12px_0px_0px_rgba(255,222,77,1)] flex items-center justify-center z-0 pointer-events-none"
            >
              {/* Internal graphic grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000018_2px,transparent_2px),linear-gradient(to_bottom,#00000018_2px,transparent_2px)] bg-[size:24px_24px] rounded-full" />
              <div className="absolute w-[80%] h-[80%] rounded-full border-4 border-dashed border-black/40" />
            </motion.div>

            {/* Character cutout with heavy flat shadow */}
            <motion.img
              key="hero-overlay-cutout"
              initial={{ opacity: 0, y: 150, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 150, damping: 18, delay: 0.1 }
              }}
              src="/foto-aku-removebg-preview.png"
              alt="Inria Portrait Cutout"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onClick={() => setIsOverlayOpen(false)}
              className="h-[75vh] max-h-[620px] object-contain relative z-10 filter drop-shadow-[10px_10px_0px_rgba(0,0,0,1)] cursor-zoom-out pointer-events-auto"
            />

            {/* Floating Name Badge */}
            <motion.div
              key="hero-overlay-name-badge"
              initial={{ opacity: 0, scale: 0, rotate: -20 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: -220,
                y: -120,
                rotate: -8,
                transition: { delay: 0.25, type: "spring", stiffness: 200, damping: 15 }
              }}
              className="absolute bg-neo-yellow text-black font-space font-black uppercase text-sm md:text-2xl border-4 border-black px-4 py-2.5 shadow-neo z-20 hidden sm:block"
            >
              Inria Altje Kalalo
            </motion.div>

            {/* Floating Job Title Badge */}
            <motion.div
              key="hero-overlay-job-badge"
              initial={{ opacity: 0, scale: 0, rotate: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 140,
                y: 80,
                rotate: 6,
                transition: { delay: 0.3, type: "spring", stiffness: 200, damping: 15 }
              }}
              className="absolute bg-neo-green text-black font-space font-black uppercase text-xs md:text-lg border-4 border-black px-4 py-2 shadow-neo z-20 hidden sm:block"
            >
              Software Engineer
            </motion.div>

            {/* Mobile text overlays (shown only on mobile since offsets hide on small screens) */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 items-center sm:hidden z-25 pointer-events-none">
              <div className="bg-neo-yellow text-black font-space font-black uppercase text-xs border-2 border-black px-3 py-1 shadow-neo">
                Inria Altje Kalalo
              </div>
              <div className="bg-neo-green text-black font-space font-black uppercase text-[10px] border-2 border-black px-3 py-1 shadow-neo">
                Software Engineer
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

