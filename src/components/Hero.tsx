"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Text parallax
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.02]);

  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 310]);
  const subtitleScale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const bodyY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bodyScale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 290]);
  const ctaScale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  // Background image parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
        }}
        className="pointer-events-none fixed inset-0 z-0"
      >
        <div className="absolute inset-0">
          <Image
            src="/hero/aaroncoder.jpg" // <-- place your image here
            alt="Developer workspace"
            fill
            priority
            className="
  object-cover
  object-center
  opacity-[0.45]
  scale-105
"
          />
        </div>

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Cyan ambient glow */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.14),transparent_40%)]
          "
        />

        {/* Fade left for text readability */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
from-black/80
via-black/30
to-transparent
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black
            via-transparent
            to-black/20
          "
        />
      </motion.div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_60%)]" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        {/* Name */}
        <motion.h1
          style={{
            y: nameY,
            scale: nameScale,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            font-display
            text-4xl
            tracking-widest
            text-cyan-400
            md:text-7xl
            glitch
            flicker
          "
        >
          AARON TAMIRAT
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{
            y: subtitleY,
            scale: subtitleScale,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="
            mt-4
            font-mono
            text-base
            tracking-wider
            text-gray-300
            md:text-xl
          "
        >
          FULL-STACK DEVELOPER · SYSTEM BUILDER · PROBLEM SOLVER
        </motion.p>

        {/* Divider */}
        <motion.div
          style={{
            y: subtitleY,
            scale: subtitleScale,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="
            hero-divider
            mx-auto
            mt-6
            h-px
            w-24
            origin-left
            bg-cyan-400/40
          "
        />

        {/* Intro */}
        <motion.p
          style={{
            y: bodyY,
            scale: bodyScale,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-sm
            leading-relaxed
            text-gray-400
            md:text-xl
          "
        >
          I architect and build full-stack solutions with 5+ years of experience
          across modern JavaScript and Python ecosystems. I specialize in
          scalable Next.js/React applications, Node.js/Express APIs,
          PostgreSQL/MongoDB databases, and Python/Flask backends—crafting
          systems that balance performance, maintainability, and real-world
          business needs.
        </motion.p>

        {/* CTA */}
        <motion.div
          style={{
            y: ctaY,
            scale: ctaScale,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex justify-center gap-6"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="
              neon-border
              px-6
              py-2
              text-sm
              font-mono
              text-cyan-400
              transition
              hover:bg-cyan-400/10
              buttonFlicker
              md:text-lg
            "
          >
            VIEW PROJECTS
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            className="
              px-6
              py-2
              text-sm
              font-mono
              text-gray-300
              transition
              hover:text-cyan-400
              md:text-lg
            "
          >
            CONTACT
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
