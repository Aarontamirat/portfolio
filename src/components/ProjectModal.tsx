"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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

    document.body.style.overflow = "hidden";

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      panelRef.current,
      { y: 80, opacity: 0, rotateX: 12 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.6,
        ease: "power4.out",
      }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-terminal border border-[rgba(31,208,224,0.35)] shadow-[0_0_60px_rgba(31,208,224,0.35)] bg-black/90 p-6 perspective-1200"
      >
        {/* OS Header */}
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2">
          <span className="font-mono text-xs text-cyan-400 headerFlicker">
            SYSTEM://PROJECT_VIEW
          </span>

          <button
            onClick={onClose}
            className="font-mono text-sm text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Preview */}
        <div className="relative mb-6 h-56 overflow-hidden rounded-md">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-display text-white mb-2">
          {project.title}
        </h3>

        <p className="text-sm md:text-lg font-mono text-gray-400 leading-relaxed">
          {project.longDescription || project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-sm bg-cyan-500/10 px-2 py-1 text-xs md:text-base tracking-wider font-mono text-cyan-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="mt-8 flex justify-end gap-3">
          <button className="rounded-sm border border-white/10 px-4 py-2 font-mono text-xs text-gray-300 hover:border-cyan-400 hover:text-white">
            VIEW CODE
          </button>
          <button className="rounded-sm bg-cyan-500/20 px-4 py-2 font-mono text-xs text-cyan-300 hover:bg-cyan-500/30">
            LIVE DEMO
          </button>
        </div> */}

        {/* Decorative scan line */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-cyan-500/20 animate-pulse" />
      </div>
    </div>
  );
}
