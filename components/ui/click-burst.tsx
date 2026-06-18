"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Global counter to ensure perfectly unique React keys for animated shapes
let globalShapeId = 0;

interface Shape {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  shapeType: "circle" | "square" | "triangle" | "star";
  rotate: number;
  destX: number;
  destY: number;
}

export function ClickBurst({ children }: { children: React.ReactNode }) {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const colors = ["#FF8BFF", "#FFDE4D", "#6BCB77", "#4D96FF", "#FF6B6B"];

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger if clicked element is not a button or link
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest("input")) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newShapes: Shape[] = [];
    const count = 6 + Math.floor(Math.random() * 4); // 6 to 9 shapes

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      const destX = clickX + Math.cos(angle) * distance;
      const destY = clickY + Math.sin(angle) * distance + (30 + Math.random() * 30); // Drift downwards

      newShapes.push({
        id: ++globalShapeId,
        x: clickX,
        y: clickY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 12 + Math.random() * 16, // 12px to 28px
        shapeType: ["circle", "square", "triangle", "star"][
          Math.floor(Math.random() * 4)
        ] as any,
        rotate: Math.random() * 360,
        destX,
        destY,
      });
    }

    setShapes((prev) => [...prev, ...newShapes]);
  };

  // Clean up old shapes
  useEffect(() => {
    if (shapes.length === 0) return;
    const timer = setTimeout(() => {
      setShapes((prev) => prev.slice(8)); // remove oldest ones
    }, 1200);
    return () => clearTimeout(timer);
  }, [shapes]);

  return (
    <div onClick={handleClick} className="relative w-full h-full overflow-hidden">
      {children}
      <AnimatePresence>
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            initial={{
              x: shape.x - shape.size / 2,
              y: shape.y - shape.size / 2,
              scale: 0.1,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: shape.destX - shape.size / 2,
              y: shape.destY - shape.size / 2,
              scale: 1,
              opacity: 0,
              rotate: shape.rotate + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.1, 0.8, 0.3, 1], // easeOutBack-ish
            }}
            className="absolute pointer-events-none z-30"
            style={{
              width: shape.size,
              height: shape.size,
            }}
          >
            {shape.shapeType === "circle" && (
              <div
                className="w-full h-full rounded-full border-2 border-black"
                style={{ backgroundColor: shape.color }}
              />
            )}
            {shape.shapeType === "square" && (
              <div
                className="w-full h-full border-2 border-black"
                style={{ backgroundColor: shape.color }}
              />
            )}
            {shape.shapeType === "triangle" && (
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon
                  points="12,2 2,22 22,22"
                  fill={shape.color}
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            )}
            {shape.shapeType === "star" && (
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon
                  points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"
                  fill={shape.color}
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
