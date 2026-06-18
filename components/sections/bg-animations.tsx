"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// 1. About Page Background: Slowly rotating organic abstract geometric rings & shapes
export function AboutBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let shapes: any[] = [];
    const isDark = resolvedTheme === "dark";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      init();
    };

    const init = () => {
      shapes = [];
      const count = 15;
      for (let i = 0; i < count; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 40 + 20,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.005,
          color: isDark 
            ? ["255, 139, 255", "107, 203, 119", "77, 150, 255"][i % 3] // Pink, Green, Blue
            : ["255, 139, 255", "77, 150, 255", "255, 107, 107"][i % 3], // Color in light mode too!
          type: i % 3, // 0: circle, 1: dashed ring, 2: square
          opacity: isDark ? Math.random() * 0.25 + 0.45 : Math.random() * 0.2 + 0.35,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDarkNow = resolvedTheme === "dark";

      shapes.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;
        s.angle += s.spinSpeed;

        // Wrap around
        if (s.x < -s.radius * 2) s.x = canvas.width + s.radius * 2;
        if (s.x > canvas.width + s.radius * 2) s.x = -s.radius * 2;
        if (s.y < -s.radius * 2) s.y = canvas.height + s.radius * 2;
        if (s.y > canvas.height + s.radius * 2) s.y = -s.radius * 2;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.strokeStyle = `rgba(${s.color}, ${s.opacity})`;
        ctx.lineWidth = 1.5;

        if (s.type === 0) {
          // Normal circle
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.type === 1) {
          // Dashed ring
          ctx.beginPath();
          ctx.setLineDash([4, 6]);
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Square outline
          ctx.beginPath();
          ctx.rect(-s.radius, -s.radius, s.radius * 2, s.radius * 2);
          ctx.stroke();
        }
        ctx.restore();
      });

      id = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
      style={{ opacity: resolvedTheme === "dark" ? 0.8 : 0.6 }}
    />
  );
}

// 2. Skills Page Background: Slow falling/drifting code character rains
export function SkillsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let characters: any[] = [];
    const codeSymbols = ["{", "}", "<", ">", "[", "]", "const", "let", "function", "=>", "import", "async", "await", "UI", "DB", "API", "&&", "||", "++"];
    const isDark = resolvedTheme === "dark";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      init();
    };

    const init = () => {
      characters = [];
      const count = 35;
      for (let i = 0; i < count; i++) {
        characters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          text: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
          speedY: Math.random() * 0.15 + 0.05, // Slow fall
          speedX: (Math.random() - 0.5) * 0.05, // Slight sway
          fontSize: Math.floor(Math.random() * 8) + 11, // 11px to 18px
          color: isDark 
            ? ["107, 203, 119", "77, 150, 255", "255, 139, 255"][i % 3] // Green, Blue, Pink
            : ["77, 150, 255", "0, 0, 0", "255, 107, 107"][i % 3],
          opacity: Math.random() * 0.3 + 0.4,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "bold 12px monospace";

      characters.forEach((c) => {
        c.y += c.speedY;
        c.x += c.speedX;

        // Reset if bottom reached
        if (c.y > canvas.height + 20) {
          c.y = -20;
          c.x = Math.random() * canvas.width;
          c.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        }
        if (c.x < -40) c.x = canvas.width + 40;
        if (c.x > canvas.width + 40) c.x = -40;

        ctx.fillStyle = `rgba(${c.color === "0, 0, 0" ? "0, 0, 0" : c.color}, ${c.opacity})`;
        ctx.font = `bold ${c.fontSize}px var(--font-space), monospace`;
        ctx.fillText(c.text, c.x, c.y);
      });

      id = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
      style={{ opacity: resolvedTheme === "dark" ? 0.75 : 0.45 }}
    />
  );
}

// 3. Portfolio Page Background: Thin, slow-drifting mock layouts / blueprint rectangles
export function PortfolioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let frames: any[] = [];
    const isDark = resolvedTheme === "dark";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      init();
    };

    const init = () => {
      frames = [];
      const count = 12;
      for (let i = 0; i < count; i++) {
        frames.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          w: Math.random() * 100 + 60,
          h: Math.random() * 80 + 50,
          speedX: (Math.random() - 0.5) * 0.08,
          speedY: (Math.random() - 0.5) * 0.08,
          opacity: Math.random() * 0.2 + 0.4,
          color: isDark 
            ? ["255, 255, 255", "255, 139, 255", "77, 150, 255"][i % 3] 
            : ["0, 0, 0", "77, 150, 255", "255, 107, 107"][i % 3],
          hasInnerGrid: i % 2 === 0,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frames.forEach((f) => {
        f.x += f.speedX;
        f.y += f.speedY;

        // Wrap around
        if (f.x < -f.w) f.x = canvas.width;
        if (f.x > canvas.width) f.x = -f.w;
        if (f.y < -f.h) f.y = canvas.height;
        if (f.y > canvas.height) f.y = -f.h;

        ctx.strokeStyle = `rgba(${f.color}, ${f.opacity})`;
        ctx.lineWidth = 1;

        // Draw outer frame rectangle
        ctx.strokeRect(f.x, f.y, f.w, f.h);

        // Draw inner layouts (mock wireframes)
        if (f.hasInnerGrid) {
          // Draw horizontal header line
          ctx.beginPath();
          ctx.moveTo(f.x, f.y + 12);
          ctx.lineTo(f.x + f.w, f.y + 12);
          ctx.stroke();

          // Draw vertical divider
          ctx.beginPath();
          ctx.moveTo(f.x + f.w * 0.3, f.y + 12);
          ctx.lineTo(f.x + f.w * 0.3, f.y + f.h);
          ctx.stroke();
        } else {
          // Draw diagonal crossing lines (classic wireframe placeholder)
          ctx.beginPath();
          ctx.moveTo(f.x, f.y);
          ctx.lineTo(f.x + f.w, f.y + f.h);
          ctx.moveTo(f.x + f.w, f.y);
          ctx.lineTo(f.x, f.y + f.h);
          ctx.stroke();
        }
      });

      id = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
      style={{ opacity: resolvedTheme === "dark" ? 0.75 : 0.45 }}
    />
  );
}

// 4. Blog Page Background: Floating typography/letters and quotation marks
export function BlogBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let letters: any[] = [];
    const charList = ["A", "B", "C", "d", "e", "f", "P", "S", "T", "O", '"', "'", "✎", "⌘", "✍", "H", "W"];
    const isDark = resolvedTheme === "dark";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      init();
    };

    const init = () => {
      letters = [];
      const count = 25;
      for (let i = 0; i < count; i++) {
        letters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          text: charList[Math.floor(Math.random() * charList.length)],
          speedX: (Math.random() - 0.5) * 0.08,
          speedY: (Math.random() - 0.5) * 0.08,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.003,
          fontSize: Math.floor(Math.random() * 12) + 16, // 16px to 28px
          opacity: Math.random() * 0.2 + 0.4,
          color: isDark 
            ? ["255, 255, 255", "255, 139, 255", "107, 203, 119"][i % 3] 
            : ["0, 0, 0", "255, 107, 107", "77, 150, 255"][i % 3],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      letters.forEach((l) => {
        l.x += l.speedX;
        l.y += l.speedY;
        l.angle += l.spinSpeed;

        // Wrap around
        if (l.x < -40) l.x = canvas.width + 40;
        if (l.x > canvas.width + 40) l.x = -40;
        if (l.y < -40) l.y = canvas.height + 40;
        if (l.y > canvas.height + 40) l.y = -40;

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        ctx.fillStyle = `rgba(${l.color}, ${l.opacity})`;
        ctx.font = `black ${l.fontSize}px var(--font-space), sans-serif`;
        ctx.fillText(l.text, 0, 0);
        ctx.restore();
      });

      id = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(id);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
      style={{ opacity: resolvedTheme === "dark" ? 0.75 : 0.45 }}
    />
  );
}

// 5. Contact Page Background: Expanding communication ripples / radar waves
export function ContactBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let ripples: any[] = [];
    const maxRadius = 220;
    const isDark = resolvedTheme === "dark";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    // Periodically release ripples from random centers
    let rippleTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDarkNow = resolvedTheme === "dark";
      const color = isDarkNow ? "107, 203, 119" : "77, 150, 255"; // Green for dark, Blue for light

      rippleTimer++;
      if (rippleTimer % 180 === 0) {
        ripples.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: Math.random() * 120 + 100,
          opacity: 0.6,
          speed: Math.random() * 0.4 + 0.3,
        });
      }

      ripples.forEach((r, idx) => {
        r.radius += r.speed;
        r.opacity = Math.max(0, 0.6 * (1 - r.radius / r.maxRadius));

        // Draw concentric ripple rings
        ctx.strokeStyle = `rgba(${color}, ${r.opacity})`;
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.setLineDash([6, 8]);
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]); // Reset

        // Remove dead ripples
        if (r.radius >= r.maxRadius) {
          ripples.splice(idx, 1);
        }
      });

      id = requestAnimationFrame(animate);
    };

    // Click triggers custom ripple
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: 280,
        opacity: 0.8,
        speed: 1.2,
      });
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("click", onClick);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
      cancelAnimationFrame(id);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0 transition-opacity duration-300"
      style={{ opacity: resolvedTheme === "dark" ? 0.8 : 0.6 }}
    />
  );
}
