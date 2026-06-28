"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCw, Keyboard, ShieldAlert, Award, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_SENTENCES = [
  "git commit -m \"feat: build secure and scalable applications\"",
  "INRIA.IO: Turning ideas into real, usable technology.",
  "Always sanitize inputs to prevent cross-site scripting attacks.",
  "const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;",
  "artificial intelligence and cybersecurity are the future of tech.",
  "neobrutalism design uses high contrast colors and thick borders.",
  "export default function InriaPortfolio() { return <Developer /> }",
  "A security-first mindset is essential when shipping production code."
];

const GAME_DURATION = 30; // seconds

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

const getKeyColor = (key: string) => {
  const blueKeys = ["Q", "T", "U", "O", "D", "G", "J", "L", "C", "B", "M"];
  const pinkKeys = ["W", "Y", "P", "S", "H", "K", "X", "N"];
  const greenKeys = ["E", "I", "A", "F", "Z", "V"];

  if (blueKeys.includes(key)) return "bg-neo-blue text-black";
  if (pinkKeys.includes(key)) return "bg-neo-pink text-black";
  if (greenKeys.includes(key)) return "bg-neo-green text-black";
  return "bg-neo-yellow text-black";
};

export function TypeRacer() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "finished">("idle");
  const [sentence, setSentence] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [typoCount, setTypoCount] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [shouldShake, setShouldShake] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [capsLockActive, setCapsLockActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Global Keyboard Event Listeners for Visual Keycap Press Animations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (key === " ") key = "SPACE";

      // Sync Caps Lock state
      setCapsLockActive(e.getModifierState("CapsLock"));

      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });

      // Handle Tab key to reset/restart the game when input is focused
      if (key === "TAB" && document.activeElement === inputRef.current) {
        e.preventDefault();
        startGame();
      }

      // Prevent page scrolling when space is pressed and input is not focused
      if (key === "SPACE" && gameState === "playing") {
        if (document.activeElement !== inputRef.current) {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (key === " ") key = "SPACE";

      setCapsLockActive(e.getModifierState("CapsLock"));

      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Initialize a random sentence
  const selectRandomSentence = () => {
    const currentIndex = SAMPLE_SENTENCES.indexOf(sentence);
    let nextIndex = Math.floor(Math.random() * SAMPLE_SENTENCES.length);
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * SAMPLE_SENTENCES.length);
    }
    setSentence(SAMPLE_SENTENCES[nextIndex]);
  };

  // Start the game
  const startGame = () => {
    selectRandomSentence();
    setInputVal("");
    setTimeLeft(GAME_DURATION);
    setWpm(0);
    setAccuracy(100);
    setTypoCount(0);
    setTotalTyped(0);
    setGameState("playing");
    startTimeRef.current = Date.now();

    // Focus synchronously so that virtual keyboards trigger immediately on mobile devices
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // End the game
  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState("finished");
  };

  // Handle countdown timer
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Handle typing input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Disable input if finished or idle
    if (gameState !== "playing") return;

    // Check if user completed the sentence
    if (val === sentence) {
      // Calculate final stats for this sentence and pick a new one
      setTotalTyped((prev) => prev + sentence.length);
      selectRandomSentence();
      setInputVal("");
      return;
    }

    // Detect typo
    const targetSubstring = sentence.substring(0, val.length);
    if (val !== targetSubstring) {
      setTypoCount((prev) => prev + 1);
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 300);
    }

    setInputVal(val);
  };

  // Handle virtual keyboard clicking
  const handleKeyVirtualPress = (char: string) => {
    if (gameState !== "playing") {
      if (char === "ENTER") {
        startGame();
      }
      return;
    }

    // Add visual press effect for special keys
    if (char === "BACKSPACE" || char === "CAPSLOCK" || char === "ENTER" || char === "SPACE") {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.add(char);
        return next;
      });
      setTimeout(() => {
        setPressedKeys((prev) => {
          const next = new Set(prev);
          next.delete(char);
          return next;
        });
      }, 150);
    }

    if (char === "BACKSPACE") {
      setInputVal((prev) => prev.slice(0, -1));
      inputRef.current?.focus();
      return;
    }

    if (char === "CAPSLOCK") {
      setCapsLockActive((prev) => !prev);
      inputRef.current?.focus();
      return;
    }

    if (char === "ENTER") {
      // Enter is visual or can act as submit/reset, just focus for now
      inputRef.current?.focus();
      return;
    }

    let nextChar = char;
    if (char === "SPACE") {
      nextChar = " ";
    }

    // Match case with the current character of the target sentence
    const currentPosition = inputVal.length;
    const expectedChar = sentence[currentPosition];

    let typedChar = nextChar;
    if (expectedChar && expectedChar.toUpperCase() === nextChar.toUpperCase()) {
      typedChar = expectedChar;
    } else {
      typedChar = nextChar.length === 1 ? nextChar.toLowerCase() : nextChar;
    }

    const newVal = inputVal + typedChar;

    // Trigger completion check
    if (newVal === sentence) {
      setTotalTyped((prev) => prev + sentence.length);
      selectRandomSentence();
      setInputVal("");
      return;
    }

    // Detect typo
    const targetSubstring = sentence.substring(0, newVal.length);
    if (newVal !== targetSubstring) {
      setTypoCount((prev) => prev + 1);
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 300);
    }

    setInputVal(newVal);

    // Keep input focused
    inputRef.current?.focus();
  };


  // Calculate live WPM and Accuracy
  useEffect(() => {
    if (gameState !== "playing" || timeLeft === GAME_DURATION) return;

    const timeElapsed = (Date.now() - startTimeRef.current) / 1000; // in seconds
    const minutesElapsed = timeElapsed / 60;

    const charsTyped = totalTyped + inputVal.length;
    if (charsTyped === 0) return;

    // WPM = (Total correct characters / 5) / minutes
    const calculatedWpm = Math.round((charsTyped / 5) / minutesElapsed);
    setWpm(calculatedWpm);

    // Accuracy = ((Total typed - typos) / Total typed) * 100
    const calculatedAccuracy = Math.max(0, Math.round(((charsTyped - typoCount) / charsTyped) * 100));
    setAccuracy(calculatedAccuracy);
  }, [inputVal, totalTyped, timeLeft, typoCount, gameState]);

  // Synchronize keycap lighting with actual input changes (works on mobile too!)
  useEffect(() => {
    if (inputVal.length === 0 || gameState !== "playing") return;

    // Get the last typed character
    let lastChar = inputVal[inputVal.length - 1].toUpperCase();
    if (lastChar === " ") lastChar = "SPACE";

    // Trigger visual press effect for this keycap
    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.add(lastChar);
      return next;
    });

    const timeout = setTimeout(() => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(lastChar);
        return next;
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [inputVal, gameState]);

  // Determine Rank Name and Color
  const getRank = (finalWpm: number) => {
    if (finalWpm >= 85) return { name: "INRIA HACKER MODE 💻", color: "bg-neo-pink text-black" };
    if (finalWpm >= 60) return { name: "SENIOR CODER 🚀", color: "bg-neo-green text-black" };
    if (finalWpm >= 40) return { name: "FULL-STACK JUNIOR ☕", color: "bg-neo-blue text-black" };
    return { name: "SCRIPT KIDDIE 🐣", color: "bg-neo-yellow text-black" };
  };

  const rank = getRank(wpm);

  // Render character by character highlighting
  const renderSentenceHighlighting = () => {
    return sentence.split("").map((char, index) => {
      let colorClass = "text-zinc-400 dark:text-zinc-500";
      let bgClass = "";

      if (index < inputVal.length) {
        if (char === inputVal[index]) {
          colorClass = "text-neo-green font-bold dark:text-emerald-400";
        } else {
          colorClass = "text-white";
          bgClass = "bg-red-500 neo-border-xs px-0.5";
        }
      } else if (index === inputVal.length && gameState === "playing") {
        bgClass = "bg-neo-yellow/30 border-b-2 border-black dark:border-white animate-pulse";
      }

      return (
        <span key={index} className={`${colorClass} ${bgClass} transition-colors duration-75`}>
          {char}
        </span>
      );
    });
  };

  return (
    <section className="w-full py-16 bg-transparent dark:bg-zinc-950 transition-colors duration-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="flex flex-col items-center space-y-4 mb-10 text-center">
          <div className="p-3 bg-neo-pink text-black neo-border shadow-neo flex items-center justify-center">
            <Keyboard className="w-6 h-6" />
          </div>
          <h2 className="font-space font-black text-3xl md:text-5xl uppercase tracking-tight">
            NEO_TYPER.EXE
          </h2>
          <p className="font-sans font-bold text-zinc-600 dark:text-zinc-400 max-w-lg">
            Show off your speed typing skills. Complete the technical and security phrases before the timer runs out!
          </p>
        </div>

        <Card className="border-4 border-black bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-neo max-w-3xl mx-auto relative">

          {/* Top Info Bar */}
          <div className="grid grid-cols-3 gap-4 mb-8 border-b-4 border-black pb-6 text-center font-space font-black uppercase text-sm md:text-base">
            <div className="p-2 bg-neo-blue text-black border-2 border-black shadow-neo-sm">
              <span className="text-xs block text-zinc-600 font-bold">WPM</span>
              <span className="text-xl md:text-2xl">{wpm}</span>
            </div>
            <div className="p-2 bg-neo-green text-black border-2 border-black shadow-neo-sm">
              <span className="text-xs block text-zinc-600 font-bold">ACCURACY</span>
              <span className="text-xl md:text-2xl">{accuracy}%</span>
            </div>
            <div className="p-2 bg-neo-orange text-black border-2 border-black shadow-neo-sm">
              <span className="text-xs block text-zinc-600 font-bold">TIME LEFT</span>
              <span className="text-xl md:text-2xl text-red-600">{timeLeft}s</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {gameState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-8 space-y-6"
              >
                <div className="inline-block p-4 rounded-full bg-neo-yellow/20 border-2 border-black dark:border-white mb-2">
                  <Play className="w-12 h-12 text-neo-orange animate-bounce" />
                </div>
                <h3 className="font-space font-black text-xl md:text-2xl uppercase">
                  Ready to test your fingers?
                </h3>
                <p className="font-sans font-semibold text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                  Click the button below to start. A sequence of programming, AI, and cybersecurity strings will appear.
                </p>
                <Button
                  onClick={startGame}
                  className="font-space font-black uppercase px-6 py-6 text-lg bg-neo-green text-black border-3 border-black shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none duration-150 rounded-none"
                >
                  Start Typing Challenge
                </Button>
              </motion.div>
            )}

            {gameState === "finished" && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 space-y-6"
              >
                <div className="inline-block p-4 bg-neo-pink text-black border-3 border-black shadow-neo">
                  <Award className="w-12 h-12" />
                </div>

                <h3 className="font-space font-black text-2xl md:text-3xl uppercase">
                  Time's Up! Challenge Complete!
                </h3>

                {/* Rank Badge */}
                <div className="flex justify-center">
                  <div className={`px-4 py-2 border-2 border-black font-space font-black uppercase text-sm md:text-base shadow-neo-sm flex items-center gap-2 ${rank.color}`}>
                    <Sparkles className="w-4 h-4 text-black" />
                    {rank.name}
                  </div>
                </div>

                {/* Final Stats Grid */}
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto font-space font-black uppercase text-sm">
                  <div className="p-4 bg-white dark:bg-zinc-800 border-2 border-black shadow-neo-sm">
                    <span className="text-zinc-500 block text-xs">Final Speed</span>
                    <span className="text-xl md:text-2xl text-neo-blue">{wpm} WPM</span>
                  </div>
                  <div className="p-4 bg-white dark:bg-zinc-800 border-2 border-black shadow-neo-sm">
                    <span className="text-zinc-500 block text-xs">Typos Count</span>
                    <span className="text-xl md:text-2xl text-red-500">{typoCount}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={startGame}
                    className="font-space font-black uppercase px-6 py-5 bg-neo-green text-black border-3 border-black shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none duration-150 rounded-none"
                  >
                    Play Again
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Always mounted to allow synchronous focus on mobile devices, preventing keyboard block */}
          <div className={gameState === "playing" ? "block space-y-8 mt-4" : "hidden"}>
            {/* Sentence Display */}
            <motion.div
              animate={shouldShake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="p-6 bg-zinc-50 dark:bg-zinc-800 border-3 border-black font-mono text-base md:text-lg lg:text-xl leading-relaxed select-none break-all"
            >
              {renderSentenceHighlighting()}
            </motion.div>

            {/* Input Area */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                placeholder="Start typing the phrase above exactly..."
                className="w-full p-4 font-mono text-sm md:text-base border-4 border-black bg-white dark:bg-zinc-850 text-black dark:text-white shadow-neo focus:outline-none focus:ring-0 focus:border-neo-pink transition-all placeholder:text-zinc-400"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />

              {/* Floating Keyboard Hint */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 font-space font-black text-xs text-zinc-400">
                <span>PRESS TAB TO RESET</span>
                <RotateCw className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Reset button under input */}
            <div className="flex justify-end">
              <Button
                onClick={startGame}
                variant="outline"
                className="font-space font-extrabold uppercase border-2 border-black shadow-neo-sm hover:translate-y-0.5 hover:shadow-none duration-100 flex items-center gap-2 text-xs py-1"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Reset Challenge
              </Button>
            </div>

            {/* Interactive Neobrutalist Mechanical Keyboard */}
            <div className="p-4 bg-zinc-100 dark:bg-zinc-950 border-4 border-black shadow-neo rounded-none space-y-2 mt-4 max-w-2xl mx-auto">
              {/* Row 1: Q-P + Backspace */}
              <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2">
                {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => {
                  const isPressed = pressedKeys.has(key);
                  const baseColor = getKeyColor(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeyVirtualPress(key)}
                      className={`w-7 h-7 sm:w-10 sm:h-10 border-2 border-black flex items-center justify-center font-space font-black text-xs sm:text-sm rounded-none transition-all duration-75 select-none active:bg-white active:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${isPressed
                        ? "bg-white text-black translate-x-[3px] translate-y-[3px] shadow-none"
                        : `${baseColor} shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] cursor-pointer hover:-translate-y-0.5 hover:shadow-[2px_3px_0px_0px_#000] dark:hover:shadow-[2px_3px_0px_0px_#fff]`
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
                {/* Backspace Key */}
                <button
                  type="button"
                  onClick={() => handleKeyVirtualPress("BACKSPACE")}
                  className={`h-7 sm:h-10 px-2 sm:px-3 border-2 border-black flex items-center justify-center font-space font-black text-[10px] sm:text-xs uppercase rounded-none transition-all duration-75 select-none active:bg-white active:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${pressedKeys.has("BACKSPACE")
                    ? "bg-white text-black translate-x-[3px] translate-y-[3px] shadow-none"
                    : "bg-neo-pink text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] cursor-pointer hover:-translate-y-0.5 hover:shadow-[2px_3px_0px_0px_#000] dark:hover:shadow-[2px_3px_0px_0px_#fff]"
                  }`}
                >
                  ⌫
                </button>
              </div>

              {/* Row 2: Caps Lock + A-L + Enter */}
              <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2">
                {/* Caps Lock Key */}
                <button
                  type="button"
                  onClick={() => handleKeyVirtualPress("CAPSLOCK")}
                  className={`h-7 sm:h-10 px-2 sm:px-3 border-2 border-black flex items-center justify-center gap-1 font-space font-black text-[9px] sm:text-xs uppercase rounded-none transition-all duration-75 select-none active:bg-white active:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${pressedKeys.has("CAPSLOCK") || capsLockActive
                    ? "bg-white text-black translate-x-[3px] translate-y-[3px] shadow-none"
                    : "bg-neo-yellow text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] cursor-pointer hover:-translate-y-0.5 hover:shadow-[2px_3px_0px_0px_#000] dark:hover:shadow-[2px_3px_0px_0px_#fff]"
                  }`}
                >
                  Caps
                  <span className={`w-1.5 h-1.5 rounded-full border border-black ${capsLockActive ? "bg-red-500 animate-pulse" : "bg-zinc-400"}`} />
                </button>

                {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => {
                  const isPressed = pressedKeys.has(key);
                  const baseColor = getKeyColor(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeyVirtualPress(key)}
                      className={`w-7 h-7 sm:w-10 sm:h-10 border-2 border-black flex items-center justify-center font-space font-black text-xs sm:text-sm rounded-none transition-all duration-75 select-none active:bg-white active:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${isPressed
                        ? "bg-white text-black translate-x-[3px] translate-y-[3px] shadow-none"
                        : `${baseColor} shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] cursor-pointer hover:-translate-y-0.5 hover:shadow-[2px_3px_0px_0px_#000] dark:hover:shadow-[2px_3px_0px_0px_#fff]`
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}

                {/* Enter Key */}
                <button
                  type="button"
                  onClick={() => handleKeyVirtualPress("ENTER")}
                  className={`h-7 sm:h-10 px-2 sm:px-3 border-2 border-black flex items-center justify-center font-space font-black text-[10px] sm:text-xs uppercase rounded-none transition-all duration-75 select-none active:bg-white active:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${pressedKeys.has("ENTER")
                    ? "bg-white text-black translate-x-[3px] translate-y-[3px] shadow-none"
                    : "bg-neo-blue text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] cursor-pointer hover:-translate-y-0.5 hover:shadow-[2px_3px_0px_0px_#000] dark:hover:shadow-[2px_3px_0px_0px_#fff]"
                  }`}
                >
                  ⏎
                </button>
              </div>

              {/* Row 3: Z-M */}
              <div className="flex justify-center gap-1 sm:gap-1.5 md:gap-2">
                {["Z", "X", "C", "V", "B", "N", "M"].map((key) => {
                  const isPressed = pressedKeys.has(key);
                  const baseColor = getKeyColor(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeyVirtualPress(key)}
                      className={`w-7 h-7 sm:w-10 sm:h-10 border-2 border-black flex items-center justify-center font-space font-black text-xs sm:text-sm rounded-none transition-all duration-75 select-none active:bg-white active:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${isPressed
                        ? "bg-white text-black translate-x-[3px] translate-y-[3px] shadow-none"
                        : `${baseColor} shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] cursor-pointer hover:-translate-y-0.5 hover:shadow-[2px_3px_0px_0px_#000] dark:hover:shadow-[2px_3px_0px_0px_#fff]`
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>

              {/* Spacebar Row */}
              <div className="flex justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleKeyVirtualPress("SPACE")}
                  className={`h-7 sm:h-10 w-40 sm:w-60 border-2 border-black flex items-center justify-center font-space font-black text-xs uppercase rounded-none transition-all duration-75 select-none active:bg-white active:text-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${pressedKeys.has("SPACE")
                    ? "bg-white text-black translate-x-[3px] translate-y-[3px] shadow-none"
                    : "bg-neo-orange text-black shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_#fff] cursor-pointer hover:-translate-y-0.5 hover:shadow-[2px_3px_0px_0px_#000] dark:hover:shadow-[2px_3px_0px_0px_#fff]"
                  }`}
                >
                  SPACEBAR
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
