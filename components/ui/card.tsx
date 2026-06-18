import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  bg?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, bg, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "neo-border p-6 shadow-neo rounded-none text-black dark:text-white transition-all duration-200",
          bg || "bg-white dark:bg-zinc-900",
          interactive &&
            "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-neo-sm cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
