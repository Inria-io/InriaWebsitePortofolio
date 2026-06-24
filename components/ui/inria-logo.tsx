import React from "react";

interface InriaLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  iconColor?: string;
  textColor?: string;
}

export function InriaLogo({
  className = "",
  iconColor,
  textColor,
  ...props
}: InriaLogoProps) {
  return (
    <img
      src="/logo no background.png"
      alt="Inria Logo"
      className={`object-contain dark:brightness-0 dark:invert ${className}`}
      {...props}
    />
  );
}
