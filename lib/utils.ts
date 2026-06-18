import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const NEO_COLORS = [
  "bg-neo-yellow",
  "bg-neo-orange",
  "bg-neo-blue",
  "bg-neo-green",
  "bg-neo-pink",
  "bg-neo-purple",
];

export function getRandomNeoColor(index?: number): string {
  if (index !== undefined) {
    return NEO_COLORS[index % NEO_COLORS.length];
  }
  const randomIndex = Math.floor(Math.random() * NEO_COLORS.length);
  return NEO_COLORS[randomIndex];
}
