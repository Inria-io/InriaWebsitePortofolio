"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { InriaLogo } from "@/components/ui/inria-logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-950 border-b-4 border-black dark:border-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center transition-transform hover:scale-105 duration-200">
          <InriaLogo className="h-40 md:h-44 w-auto -my-16" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-space font-extrabold uppercase px-3 py-2 border-2 transition-all duration-150 ${
                isActive(link.href)
                  ? "bg-neo-blue text-black border-black shadow-neo-sm -translate-x-0.5 -translate-y-0.5"
                  : "border-transparent text-black dark:text-white hover:border-black dark:hover:border-white hover:bg-neo-yellow hover:text-black hover:shadow-neo-sm hover:-translate-x-0.5 hover:-translate-y-0.5"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Action Buttons */}
        <div className="flex items-center space-x-3 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            className="p-2 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black dark:border-white bg-white dark:bg-zinc-950 p-6 space-y-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-space font-extrabold uppercase p-3 border-3 text-center transition-all ${
                  isActive(link.href)
                    ? "bg-neo-blue text-black border-black shadow-neo"
                    : "bg-white dark:bg-zinc-900 border-black dark:border-white text-black dark:text-white hover:bg-neo-yellow hover:text-black hover:shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5"
                }`}
              >
                {link.name}
              </Link>
            ))}

          </nav>
        </div>
      )}
    </header>
  );
}
