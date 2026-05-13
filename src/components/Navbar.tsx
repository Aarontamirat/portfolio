"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 750);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        z-50
        w-full
        bg-transparent backdrop-blur-0 border-white/10 
        transition-all
        duration-500
        ${
          scrolled
            ? "bg-black/50 backdrop-blur-md border-white/10 shadow-[0_0_30px_rgba(0,255,255,0.05)]"
            : "bg-transparent border-transparent"
        }
      `}
    >
      <div className="mx-auto flex h-14 max-w-275 items-center justify-between px-4 2xl:max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="
            font-display
            text-base
            tracking-widest
            text-cyan-400
            logoFlicker
            md:text-lg
          "
        >
          &gt; AARON
        </Link>

        {/* Links */}
        <ul
          className="
            flex
            gap-6
            font-mono
            text-sm
            tracking-wider
            text-gray-300
            md:gap-10
            md:text-lg
          "
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="
                  flicker
                  transition
                  duration-300
                  hover:text-cyan-400
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Animated divider */}
      {/* <div
        className={`
          hero-divider
          mx-auto
          h-px
          bg-cyan-400/40
          transition-all
          duration-500
          ${scrolled ? "opacity-100" : "opacity-0"}
        `}
      /> */}
    </nav>
  );
}
