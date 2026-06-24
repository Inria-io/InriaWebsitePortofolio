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
    <>
      <img
        src="/logo no background.png"
        alt="Inria Logo"
        className={`object-contain dark:hidden ${className}`}
        {...props}
      />
      <img
        src="/logo-dark-mode.png"
        alt="Inria Logo"
        className={`object-contain hidden dark:block ${className}`}
        {...props}
      />
    </>
  );
}
