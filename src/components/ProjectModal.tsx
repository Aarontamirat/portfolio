"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import Image from "next/image";

type Project = {
  title: string;
  description: string;
  tech: string[];
  image: string;
  longDescription?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel) return;

    /* =========================================
       LOCK BODY SCROLL
    ========================================= */

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* =========================================
       OPEN ANIMATION
    ========================================= */

    const tl = gsap.timeline();

    tl.fromTo(
      overlay,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      },
    );

    tl.fromTo(
      panel,
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      },
      "-=0.1",
    );

    /* =========================================
       ESC KEY CLOSE
    ========================================= */

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    /* =========================================
       CLEANUP
    ========================================= */

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project]);

  /* =========================================
     CLOSE WITH ANIMATION
  ========================================= */

  const handleClose = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;

    if (!overlay || !panel) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(panel, {
      opacity: 0,
      y: 30,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.inOut",
    });

    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      "-=0.15",
    );
  };

  if (!project) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/75
        p-4
        backdrop-blur-md
      "
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-4xl
          overflow-hidden
          rounded-3xl
          border
          border-cyan-400/20
          bg-[#050505]/95
          shadow-[0_0_80px_rgba(34,211,238,0.12)]
          backdrop-blur-2xl
        "
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <span className="font-mono text-base text-cyan-400 headerFlicker">
              SYSTEM://PROJECT_VIEW
            </span>
          </div>

          <button
            onClick={handleClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-gray-400
              transition-all
              duration-300
              hover:bg-white/10
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        {/* =====================================
            CONTENT SCROLLER
        ===================================== */}

        <div className="max-h-[85vh] overflow-y-auto">
          {/* ===================================
              IMAGE
          =================================== */}

          <div className="relative h-[260px] w-full md:h-[420px]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover opacity-80"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/20 to-transparent" />
          </div>

          {/* ===================================
              BODY
          =================================== */}

          <div className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-display text-white mb-2">
              {project.title}
            </h3>

            <p className="mt-6 text-sm leading-relaxed text-gray-400 md:text-lg">
              {project.longDescription || project.description}
            </p>

            {/* ===============================
                TECH STACK
            =============================== */}

            <div className="mt-8 flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="
                    rounded-lg
                    border
                    border-cyan-400/10
                    bg-cyan-500/10
                    px-4
                    py-2
                    text-xs
                    tracking-wide
                    text-cyan-300
                    backdrop-blur-md
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================
            SCAN LINE
        ===================================== */}

        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-cyan-400/10 animate-pulse" />
      </div>
    </div>,
    document.body,
  );
}
