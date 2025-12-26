"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MAX_INTEGRITY = 100;

export default function FirewallBreach() {
  const barRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const [integrity, setIntegrity] = useState(MAX_INTEGRITY);
  const [locked, setLocked] = useState(false);

  const barX = useRef(0);
  const dir = useRef(1);

  /* ---------------- SIGNAL LOOP ---------------- */

  useEffect(() => {
    let raf: number;

    const loop = () => {
      if (!barRef.current || locked) return;

      barX.current += dir.current * 6;
      if (barX.current > 260 || barX.current < 0) dir.current *= -1;

      gsap.set(barRef.current, { x: barX.current });

      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(raf);
  }, [locked]);

  /* ---------------- TARGET FLICKER ---------------- */

  useEffect(() => {
    if (!targetRef.current || locked) return;

    gsap.to(targetRef.current, {
      left: () => gsap.utils.random(40, 240),
      opacity: () => gsap.utils.random(0.3, 1),
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }, [locked]);

  /* ---------------- INPUT ---------------- */

  useEffect(() => {
    const attempt = () => {
      if (locked || !barRef.current || !targetRef.current) return;

      const bar = barRef.current.getBoundingClientRect();
      const target = targetRef.current.getBoundingClientRect();

      const overlap = bar.left < target.right && bar.right > target.left;

      if (overlap) {
        success();
      } else {
        failure();
      }
    };

    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") attempt();
    });

    window.addEventListener("click", attempt);

    return () => {
      window.removeEventListener("keydown", attempt);
      window.removeEventListener("click", attempt);
    };
  }, [locked]);

  /* ---------------- RESULTS ---------------- */

  function log(text: string) {
    if (!logRef.current) return;
    const line = document.createElement("div");
    line.textContent = text;
    logRef.current.prepend(line);
  }

  function success() {
    log("> PACKET ACCEPTED");
    setIntegrity((v) => {
      const next = Math.max(0, v - 20);
      if (next === 0) lockSystem();
      return next;
    });

    gsap.fromTo(
      targetRef.current,
      { boxShadow: "0 0 40px rgba(34,211,238,1)" },
      { boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.3 }
    );
  }

  function failure() {
    log("> PACKET REJECTED");
    setIntegrity((v) => Math.min(100, v + 5));

    gsap.fromTo(
      document.body,
      { backgroundColor: "#300" },
      { backgroundColor: "#000", duration: 0.15 }
    );
  }

  function lockSystem() {
    log("> FIREWALL BREACHED ✓");
    setLocked(true);
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-24 font-mono text-cyan-400">
      <h2 className="mb-6 text-center text-xl text-cyan-300">
        FIREWALL BREACH
      </h2>

      {/* UI */}
      <div className="relative h-24 border border-cyan-500/30 bg-black overflow-hidden">
        <div
          ref={targetRef}
          className="absolute top-0 h-full w-10 bg-cyan-500/20"
        />
        <div ref={barRef} className="absolute top-0 h-full w-2 bg-cyan-400" />
      </div>

      {/* STATUS */}
      <p className="mt-4 text-sm">INTEGRITY: {integrity}%</p>

      {/* LOG */}
      <div
        ref={logRef}
        className="mt-4 h-32 overflow-hidden text-xs space-y-1"
      />

      {locked && <p className="mt-4 text-green-400">ACCESS GRANTED</p>}
    </section>
  );
}
