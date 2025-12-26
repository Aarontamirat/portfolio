"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CVAccess() {
  const signalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  // Signal oscillation
  useEffect(() => {
    if (!signalRef.current) return;

    gsap.to(signalRef.current, {
      x: 220,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  // Mouse control
  useEffect(() => {
    const container = containerRef.current;
    if (!container || unlocked) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      gsap.to(signalRef.current, { x, duration: 0.15 });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [unlocked]);

  // Progress check loop
  useEffect(() => {
    if (unlocked) return;

    const interval = setInterval(() => {
      const signal = signalRef.current;
      const container = containerRef.current;
      if (!signal || !container) return;

      const signalRect = signal.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const center = containerRect.left + containerRect.width / 2;

      const distance = Math.abs(
        signalRect.left + signalRect.width / 2 - center
      );

      if (distance < 30) {
        setProgress((p) => {
          const next = Math.min(p + 1, 100);
          if (next === 100) setUnlocked(true);
          return next;
        });
      } else {
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [unlocked]);

  // Unlock animation
  useEffect(() => {
    if (!unlocked) return;

    const tl = gsap.timeline();

    tl.set(".cv-download", {
      opacity: 0,
      y: 40,
      scale: 0.85,
      filter: "blur(12px)",
    });

    tl.to(".cv-download", {
      opacity: 1,
      y: 0,
      scale: 1.05,
      filter: "blur(0px)",
      duration: 0.6,
      ease: "expo.out",
    });

    tl.to(".cv-download", {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    // glow pulse
    tl.fromTo(
      ".cv-download a",
      { boxShadow: "0 0 0px #0ff" },
      {
        boxShadow: "0 0 30px #0ff",
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      },
      "-=0.3"
    );
  }, [unlocked]);

  return (
    <section id="cv" className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-xl px-4 text-center">
        <h2 className="font-display text-xl md:text-2xl tracking-widest text-cyan-400">
          CV ACCESS
        </h2>

        {!unlocked && (
          <>
            <p className="mt-4 text-xs md:text-lg text-gray-400">
              Stabilize the signal to unlock download
            </p>

            <div
              ref={containerRef}
              className="relative mt-10 h-6 w-full overflow-hidden rounded bg-white/10"
            >
              {/* Target zone */}
              <div className="absolute left-1/2 top-0 h-full w-20 -translate-x-1/2 bg-cyan-400/20" />

              {/* Signal */}
              <div
                ref={signalRef}
                className="absolute left-1/2 top-1/2 h-5 w-6 -translate-y-1/2 -translate-x-1/2 rounded bg-cyan-400 shadow-[0_0_12px_#0ff]"
              />
            </div>

            <div className="mt-4 h-1 w-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all"
                style={{
                  width: `${progress}%`,
                  boxShadow: progress > 50 ? "0 0 12px #0ff" : "none",
                }}
              />
            </div>
          </>
        )}

        {unlocked && (
          <div className="mt-10 space-y-6 text-center">
            <p className="text-xs tracking-widest text-cyan-400">
              SIGNAL STABILIZED
            </p>

            <div className="cv-download">
              <a
                href="/cv/Aaron_Tamirat_CV.pdf"
                download
                className="neon-border px-8 py-3 text-sm font-mono text-cyan-400 hover:bg-cyan-400/10"
              >
                DOWNLOAD CV
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
