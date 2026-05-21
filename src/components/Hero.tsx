"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* ================= PARALLAX ================= */

  const nameY = useTransform(scrollYProgress, [0, 1], [0, 320]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [1, 0.06]);

  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 310]);
  const subtitleScale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const bodyY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bodyScale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 290]);
  const ctaScale = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.22]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ================= BACKGROUND ================= */}

      <motion.div
        style={
          mounted
            ? {
                y: imageY,
                scale: imageScale,
              }
            : undefined
        }
        className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src="/hero/aaronss.jpg"
            alt="Aaron Tamirat workspace"
            fill
            priority
            className="object-cover object-center scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-black/75" />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.12))]
          "
        />

        <div
          className="
            absolute inset-0
            bg-linear-to-r
            from-black
            via-black/70
            to-transparent
          "
        />

        <div
          className="
            absolute inset-0
            bg-linear-to-t
            from-black
            via-transparent
            to-black/20
          "
        />
      </motion.div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_60%)]" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Identity Label */}

        <motion.div
          style={
            mounted
              ? {
                  y: bodyY,
                  scale: bodyScale,
                }
              : undefined
          }
          initial={false}
          animate={{ opacity: 1 }}
          className="
            mx-auto mb-6 inline-flex
            items-center gap-2
            rounded-full
            border border-cyan-400/15
            bg-cyan-500/5
            px-4 py-2
            backdrop-blur-md
          ">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

          <span className="text-xs tracking-[0.25em] text-cyan-300">
            FULL_STACK_ENGINEER
          </span>
        </motion.div>

        {/* Name */}

        <motion.h1
          style={
            mounted
              ? {
                  y: nameY,
                  scale: nameScale,
                }
              : undefined
          }
          initial={false}
          animate={{ opacity: 1 }}
          className="
            font-display
            text-4xl
            tracking-[0.15em]
            text-cyan-400
            md:text-7xl
            glitch
            flicker
          ">
          AARON TAMIRAT
        </motion.h1>

        {/* Role */}

        <motion.h2
          style={
            mounted
              ? {
                  y: subtitleY,
                  scale: subtitleScale,
                }
              : undefined
          }
          initial={false}
          animate={{ opacity: 1 }}
          className="
            mt-5
            text-lg
            font-medium
            tracking-wide
            text-gray-200
            md:text-2xl
          ">
          Full-Stack Developer & Systems Engineer
        </motion.h2>

        {/* Trust Line */}

        <motion.p
          style={
            mounted
              ? {
                  y: subtitleY,
                  scale: subtitleScale,
                }
              : undefined
          }
          initial={false}
          animate={{ opacity: 1 }}
          className="
            mt-4
            text-sm
            tracking-[0.2em]
            text-cyan-300/80
            uppercase
            md:text-base
          ">
          WEB APPLICATIONS · INFRASTRUCTURE · DATABASES · AUTOMATION
        </motion.p>

        {/* Divider */}

        <motion.div
          style={
            mounted
              ? {
                  y: bodyY,
                  scale: bodyScale,
                }
              : undefined
          }
          initial={false}
          className="
            mx-auto
            mt-7
            h-px
            w-28
            bg-cyan-400/40
          "
        />

        {/* Intro */}

        <motion.p
          style={
            mounted
              ? {
                  y: bodyY,
                  scale: bodyScale,
                }
              : undefined
          }
          initial={false}
          animate={{ opacity: 1 }}
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-base
            leading-8
            text-gray-300
            md:text-xl
          ">
          I build scalable web applications, backend systems, and infrastructure
          solutions that solve real business problems. Specialized in modern
          full-stack development, databases, server administration, and
          performance-focused architecture.
        </motion.p>

        {/* Credibility */}

        <motion.div
          style={
            mounted
              ? {
                  y: bodyY,
                  scale: bodyScale,
                }
              : undefined
          }
          initial={false}
          animate={{ opacity: 1 }}
          className="
            mt-8
            flex flex-wrap
            items-center
            justify-center
            gap-4
            text-sm
            text-gray-400
          ">
          <span>5+ Years Experience</span>
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          <span>Full-Stack Development</span>
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          <span>System Administration</span>
        </motion.div>

        {/* CTA */}

        <motion.div
          style={
            mounted
              ? {
                  y: ctaY,
                  scale: ctaScale,
                }
              : undefined
          }
          initial={false}
          animate={{ opacity: 1 }}
          className="
            mt-12
            flex flex-wrap
            justify-center
            gap-4
          ">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="
              neon-border
              bg-cyan-500/10
              px-7
              py-3
              text-sm
              font-medium
              tracking-wide
              text-cyan-300
              transition
              hover:bg-cyan-500/20
              md:text-base
            ">
            VIEW PROJECTS
          </motion.a>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="
              border border-cyan-500/20
              bg-black/30
              px-7
              py-3
              text-sm
              font-medium
              tracking-wide
              text-white
              transition
              hover:border-cyan-400
              hover:bg-cyan-500/10
              md:text-base
            ">
            VIEW RESUME
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            className="
              px-7
              py-3
              text-sm
              font-medium
              text-gray-300
              transition
              hover:text-cyan-400
              md:text-base
            ">
            CONTACT
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
