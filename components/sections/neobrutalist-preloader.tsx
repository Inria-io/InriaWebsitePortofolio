"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Global variable in JS memory to check if preloader has run
let hasPreloadedGlobal = false;

export function NeobrutalistPreloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Random word cycle to show tech-y portfolio keywords
  const keywords = ["CREATING", "CODING", "DESIGNING", "LAUNCHING"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    if (hasPreloadedGlobal) {
      if (typeof window !== "undefined") {
        (window as any).preloaderFinished = true;
      }
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    // Increment loading progress
    const duration = 1200; // 1.2 seconds loading
    const intervalTime = 15;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      // Cycle keywords
      if (currentStep % Math.floor(steps / keywords.length) === 0) {
        setWordIndex((prev) => (prev + 1) % keywords.length);
      }

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setVisible(false);
          hasPreloadedGlobal = true;
          if (typeof window !== "undefined") {
            (window as any).preloaderFinished = true;
            window.dispatchEvent(new Event("preloaderFinished"));
          }
          document.body.style.overflow = "";
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(progressInterval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || hasPreloadedGlobal) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFDE4D] dark:bg-zinc-950 select-none"
        >
          {/* Main Loader Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-[90%] max-w-lg bg-white dark:bg-zinc-900 border-4 md:border-8 border-black text-black dark:text-white p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden"
          >
            {/* Corner Decorative Dots */}
            <div className="absolute top-2 right-2 flex gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-black" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-black" />
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
            </div>

            <div className="space-y-6">
              <div className="font-space font-black text-3xl md:text-4xl uppercase tracking-tighter border-b-4 border-black dark:border-white pb-4">
                SYSTEM: INITIALIZE
              </div>

              {/* Keyword Scrambling Panel */}
              <div className="bg-zinc-100 dark:bg-zinc-800 border-4 border-black p-4 font-mono text-sm md:text-base flex justify-between items-center">
                <span className="text-neo-pink font-extrabold uppercase">
                  &gt; {keywords[wordIndex]}...
                </span>
                <span className="font-black text-neo-blue dark:text-neo-yellow">{progress}%</span>
              </div>

              {/* Progress Bar Container */}
              <div className="border-4 border-black w-full h-8 bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                <motion.div
                  className="h-full bg-neo-green border-r-4 border-black"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-2">
                <span>PORTFOLIO_OS_v1.0.3</span>
                <span>© {new Date().getFullYear()}</span>
              </div>
            </div>
          </motion.div>

          {/* Large Background Word (Decorative Neobrutalist style) */}
          <div className="absolute bottom-10 left-10 font-space font-black text-8xl md:text-9xl text-black/5 dark:text-white/5 uppercase pointer-events-none select-none">
            INRIA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
