"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CyberMiniGame from "./CyberMiniGame";

gsap.registerPlugin(ScrollTrigger);

type Particle = {
  top: number;
  left: number;
  size: number;
  speed: number;
  depth: number;
};

export default function CVDownload() {
  const [stage, setStage] = useState<"confirm" | "game" | "download">(
    "confirm"
  );
  const [particles, setParticles] = useState<Particle[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<HTMLSpanElement[]>([]);

  /* --------------------------------------------
     Generate particles ONCE
  --------------------------------------------- */
  useEffect(() => {
    const stars: Particle[] = Array.from({ length: 80 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 0.6,
      speed: Math.random() * 6 + 4,
      depth: Math.random() * 1600 + 400,
    }));
    setParticles(stars);
  }, []);

  /* --------------------------------------------
     REAL 3D STARFIELD MOTION
  --------------------------------------------- */
  useLayoutEffect(() => {
    if (!particles.length) return;

    const ctx = gsap.context(() => {
      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const p = particles[i];

        gsap.set(el, {
          x: gsap.utils.random(-600, 600),
          y: gsap.utils.random(-600, 600),
          z: -p.depth,
          opacity: gsap.utils.random(0.2, 0.7),
          force3D: true,
        });

        gsap.to(el, {
          z: 600,
          opacity: 1,
          duration: p.speed,
          ease: "none",
          repeat: -1,
          onRepeat: () => {
            gsap.set(el, {
              x: gsap.utils.random(-600, 600),
              y: gsap.utils.random(-600, 600),
              z: -p.depth,
              opacity: gsap.utils.random(0.2, 0.7),
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [particles]);

  /* --------------------------------------------
     PARALLAX SCROLL DEPTH
  --------------------------------------------- */
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    gsap.to(bgRef.current, {
      y: 140,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(contentRef.current, {
      z: 220,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "top 30%",
        scrub: true,
      },
    });
  }, []);

  /* --------------------------------------------
     STAGE TRANSITIONS
  --------------------------------------------- */
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    if (stage === "confirm") {
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0, rotateX: 25 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "expo.out",
        }
      );
    }

    if (stage === "download" && downloadRef.current) {
      gsap.fromTo(
        downloadRef.current,
        { scale: 0, rotateY: 120, opacity: 0 },
        {
          scale: 1,
          rotateY: 0,
          opacity: 1,
          duration: 1.4,
          ease: "elastic.out(1, 0.5)",
        }
      );

      gsap.to(downloadRef.current, {
        boxShadow: "0 0 6px #0ff, 0 0 14px #0ff",
        repeat: -1,
        yoyo: true,
        duration: 2,
      });
    }
  }, [stage]);

  /* --------------------------------------------
     RENDER
  --------------------------------------------- */
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center text-cyan-400 font-mono overflow-hidden"
      style={{ perspective: "2200px" }}
    >
      {/* STARFIELD */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        {particles.map((p, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) particleRefs.current[i] = el;
            }}
            className="absolute rounded-full bg-cyan-300"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* UI */}
      <div
        ref={contentRef}
        className="relative z-10 text-center space-y-8"
        style={{ transformStyle: "preserve-3d" }}
      >
        {stage === "confirm" && (
          <>
            <h2 className="text-3xl tracking-widest uppercase">
              Download My CV?
            </h2>
            <button
              onClick={() => setStage("game")}
              className="px-5 py-2 rounded-xl border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-transform hover:scale-110"
            >
              Yes
            </button>
          </>
        )}

        {stage === "game" && (
          <CyberMiniGame onWin={() => setStage("download")} />
        )}

        {stage === "download" && (
          <div
            ref={downloadRef}
            className="px-5 py-2 rounded-xl cursor-pointer select-none bg-cyan-400 text-black font-bold"
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/cv/Aaron_Tamirat_CV.pdf";
              link.download = "Aaron_Tamirat_CV.pdf";
              link.click();
            }}
          >
            DOWNLOAD CV
          </div>
        )}
      </div>
    </div>
  );
}
