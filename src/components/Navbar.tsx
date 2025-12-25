"use client";

import Link from "next/link";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-40 w-full bg-black/60 backdrop-blur-xs border-b border-white/10">
      <div className="mx-auto flex h-14 max-w-275 items-center justify-between px-4 2xl:max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-base md:text-lg tracking-widest text-cyan-400 logoFlicker"
        >
          &gt; AARON
        </Link>

        {/* Links */}
        <ul className="flex gap-6 md:gap-10 tracking-wider text-sm md:text-lg font-mono text-gray-300">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition hover:text-cyan-400 flicker"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Divider */}
      <div className="hero-divider mx-auto h-px bg-cyan-400/40" />
    </nav>
  );
}
