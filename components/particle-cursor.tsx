"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function ParticleCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let mouseY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
    let glowX = mouseX;
    let glowY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;

    const render = () => {
      // Easing function for smooth trailing glow
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;

      glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1] hidden md:block"
      style={{
        marginTop: "-250px",
        marginLeft: "-250px",
        background: resolvedTheme === "dark" 
          ? "radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 60%)" 
          : "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 60%)",
      }}
    />
  );
}
