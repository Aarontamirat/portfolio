"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TARGET_TIME = 5000; // ms to stabilize

export default function SignalNoise() {
  const waveRef = useRef<HTMLPreElement>(null);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const stabilityRef = useRef(20);

  const [stability, setStability] = useState(20);
  const [status, setStatus] = useState<"idle" | "stabilizing" | "locked">(
    "idle"
  );

  /* ---------------- WAVE GENERATION ---------------- */

  function generateWave(intensity: number) {
    const chars = ["~", "^", "-", "_"];
    const chaos = Math.max(1, Math.floor(intensity / 12));
    let wave = "";

    for (let i = 0; i < 42; i++) {
      wave += chars[Math.floor(Math.random() * chaos)];
    }

    return wave;
  }

  /* ---------------- INPUT HANDLING ---------------- */

  function handleMove(x: number, y: number) {
    const now = performance.now();
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const dt = now - lastPos.current.t || 16;

    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    lastPos.current = { x, y, t: now };

    if (speed < 0.25) {
      stabilityRef.current += 1.8;
    } else if (speed < 0.6) {
      stabilityRef.current += 0.6;
    } else {
      stabilityRef.current -= 2.4;
    }

    stabilityRef.current = gsap.utils.clamp(0, 100, stabilityRef.current);

    setStability(Math.round(stabilityRef.current));

    if (stabilityRef.current >= 100 && status !== "locked") {
      setStatus("locked");
    } else if (status === "idle") {
      setStatus("stabilizing");
    }
  }

  /* ---------------- EFFECT LOOP ---------------- */

  useEffect(() => {
    const el = waveRef.current;
    if (!el) return;

    const tick = () => {
      el.textContent = generateWave(100 - stabilityRef.current);

      gsap.to(el, {
        textShadow: `0 0 ${20 + stabilityRef.current}px rgba(34,211,238,${
          stabilityRef.current / 120
        })`,
        duration: 0.2,
      });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  /* ---------------- EVENT LISTENERS ---------------- */

  useEffect(() => {
    const move = (e: MouseEvent) => handleMove(e.clientX, e.clientY);

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [status]);

  return (
    <section className="relative mx-auto mt-32 max-w-3xl rounded-terminal border border-cyan-500/20 bg-black/70 p-8 font-mono text-cyan-400 shadow-[0_0_120px_rgba(34,211,238,0.25)]">
      <p className="mb-3 text-xs">&gt; SIGNAL CHANNEL OPEN</p>

      <pre ref={waveRef} className="mb-6 select-none text-lg tracking-widest">
        ~~~~~~~^^^^~~~^^~^^~~~~~^^~~~
      </pre>

      <div className="mb-4 flex items-center justify-between text-xs">
        <span>STABILITY</span>
        <span>{stability}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded bg-cyan-500/10">
        <div
          className="h-full bg-cyan-400 transition-all"
          style={{ width: `${stability}%` }}
        />
      </div>

      <p className="mt-4 text-xs">
        {status === "idle" && "> MOVE CURSOR TO STABILIZE SIGNAL"}
        {status === "stabilizing" && "> COMPENSATING NOISE..."}
        {status === "locked" && "> SIGNAL LOCKED — CHANNEL STABLE ✓"}
      </p>
    </section>
  );
}
