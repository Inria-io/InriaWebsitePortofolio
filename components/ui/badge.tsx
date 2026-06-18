import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "yellow" | "orange" | "blue" | "green" | "pink" | "purple" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "yellow",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-block px-3 py-1 text-xs font-space font-extrabold uppercase neo-border-sm shadow-neo-sm select-none text-black";

  const variants = {
    yellow: "bg-neo-yellow",
    orange: "bg-neo-orange",
    blue: "bg-neo-blue",
    green: "bg-neo-green",
    pink: "bg-neo-pink",
    purple: "bg-neo-purple",
    outline: "bg-white dark:bg-zinc-800 dark:text-white",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
