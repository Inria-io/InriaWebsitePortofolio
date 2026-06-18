"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Load Cloudflare Turnstile Script
  useEffect(() => {
    setIsMounted(true);

    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Initialize Cloudflare Turnstile Widget
  useEffect(() => {
    if (!isMounted) return;

    let checkInterval: NodeJS.Timeout;

    const initTurnstile = () => {
      if (turnstileRef.current && (window as any).turnstile) {
        try {
          // Clean container first
          turnstileRef.current.innerHTML = "";
          const id = (window as any).turnstile.render(turnstileRef.current, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
            theme: "light",
          });
          widgetIdRef.current = id;
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
        return true;
      }
      return false;
    };

    // Try initializing immediately
    const success = initTurnstile();
    if (!success) {
      // Poll if script isn't fully ready yet
      checkInterval = setInterval(() => {
        if (initTurnstile()) {
          clearInterval(checkInterval);
        }
      }, 100);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (widgetIdRef.current && (window as any).turnstile) {
        try {
          (window as any).turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [isMounted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const form = e.target as HTMLFormElement;
    const formFields = new FormData(form);
    const token = formFields.get("cf-turnstile-response") as string;

    if (!token) {
      setStatus("error");
      setErrorMessage("Please complete the 'Are you human?' verification check.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        if ((window as any).turnstile && widgetIdRef.current) {
          (window as any).turnstile.reset(widgetIdRef.current);
        }
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
      if ((window as any).turnstile && widgetIdRef.current) {
        (window as any).turnstile.reset(widgetIdRef.current);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {status === "success" ? (
        <div className="p-6 bg-neo-green text-black border-4 border-black shadow-neo-lg text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-white border-4 border-black rounded-none flex items-center justify-center mx-auto shadow-neo">
            <CheckCircle2 className="w-8 h-8 text-black fill-neo-green" />
          </div>
          <h3 className="font-space font-black text-2xl uppercase">MESSAGE SENT!</h3>
          <p className="font-sans font-bold text-sm">
            Thank you for reaching out! I've received your message and will get back to you as soon as possible.
          </p>
          <Button variant="outline" size="sm" onClick={() => setStatus("idle")} className="mt-4">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-4 bg-neo-pink text-black border-3 border-black shadow-neo flex items-center gap-3 font-sans font-bold text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="font-space font-extrabold uppercase text-sm text-black dark:text-white">
              YOUR NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              disabled={status === "loading"}
              className="w-full p-4 font-sans font-semibold border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-neo hover:translate-y-[-1px] transition-all focus:translate-y-[-2px] focus:shadow-neo-lg focus:outline-none focus:bg-neo-yellow/10 disabled:opacity-50"
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="font-space font-extrabold uppercase text-sm text-black dark:text-white">
              YOUR EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={status === "loading"}
              className="w-full p-4 font-sans font-semibold border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-neo hover:translate-y-[-1px] transition-all focus:translate-y-[-2px] focus:shadow-neo-lg focus:outline-none focus:bg-neo-blue/10 disabled:opacity-50"
              required
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="message" className="font-space font-extrabold uppercase text-sm text-black dark:text-white">
              YOUR MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              disabled={status === "loading"}
              rows={5}
              className="w-full p-4 font-sans font-semibold border-4 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 shadow-neo hover:translate-y-[-1px] transition-all focus:translate-y-[-2px] focus:shadow-neo-lg focus:outline-none focus:bg-neo-pink/10 disabled:opacity-50 resize-y"
              required
            />
          </div>

          {/* Cloudflare Turnstile Verification Widget */}
          {isMounted && (
            <div className="flex justify-start py-2 select-none">
              <div
                ref={turnstileRef}
                className="cf-turnstile"
              />
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={status === "loading"}
            className="w-full py-4 flex items-center justify-center gap-2"
          >
            {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
            <Send className="w-5 h-5 text-black" />
          </Button>
        </form>
      )}
    </div>
  );
}
