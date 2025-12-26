"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Phase = "idle" | "display" | "input" | "success" | "fail";

function generateDump(size: number) {
  return Array.from(
    { length: size },
    () =>
      "0x" +
      Math.floor(Math.random() * 65535)
        .toString(16)
        .toUpperCase()
  );
}

export default function MemoryDump() {
  const panelRef = useRef<HTMLDivElement>(null);
  const dumpRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [level, setLevel] = useState(1);
  const [dump, setDump] = useState<string[]>([]);
  const [input, setInput] = useState("");

  /* ---------- DISPLAY MEMORY ---------- */
  useEffect(() => {
    if (phase !== "display") return;

    const duration = Math.max(0.8, 2.4 - level * 0.2);

    gsap.fromTo(
      dumpRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(dumpRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => setPhase("input"),
            });
          }, duration * 1000);
        },
      }
    );
  }, [phase, level]);

  /* ---------- VERIFY INPUT ---------- */
  function verify() {
    if (input.trim() === dump.join(" ")) {
      setPhase("success");
      setTimeout(() => {
        setLevel((l) => l + 1);
        start();
      }, 1200);
    } else {
      setPhase("fail");
      gsap.fromTo(
        panelRef.current,
        { filter: "brightness(3)" },
        { filter: "brightness(0)", duration: 0.4 }
      );
      setTimeout(() => reset(), 1400);
    }
  }

  function start() {
    const blocks = generateDump(2 + level);
    setDump(blocks);
    setInput("");
    setPhase("display");
  }

  function reset() {
    setLevel(1);
    setInput("");
    setPhase("idle");
  }

  return (
    <div
      ref={panelRef}
      className="relative mx-auto max-w-xl rounded-lg border border-cyan-500/20 bg-black/70 p-6 font-mono text-cyan-400 shadow-[0_0_120px_rgba(34,211,238,0.35)]"
    >
      <div className="mb-4 text-xs opacity-70">MEMORY DUMP v{level}.0</div>

      {/* MEMORY DISPLAY */}
      {phase === "display" && (
        <div ref={dumpRef} className="mb-4 text-lg tracking-widest">
          {dump.join(" ")}
        </div>
      )}

      {/* INPUT PHASE */}
      {phase === "input" && (
        <div className="space-y-3">
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-black/60 border border-cyan-500/30 px-3 py-2 text-cyan-100 outline-none"
            placeholder="RECONSTRUCT MEMORY DUMP"
          />
          <button
            onClick={verify}
            className="w-full border border-cyan-500/30 bg-cyan-500/10 py-2 hover:bg-cyan-500/20"
          >
            VERIFY DUMP
          </button>
        </div>
      )}

      {/* STATES */}
      {phase === "idle" && (
        <button
          onClick={start}
          className="w-full border border-cyan-500/30 bg-cyan-500/10 py-3 hover:bg-cyan-500/20"
        >
          INITIATE MEMORY DUMP
        </button>
      )}

      {phase === "success" && (
        <div className="text-green-400">✔ MEMORY VERIFIED — ACCESS GRANTED</div>
      )}

      {phase === "fail" && (
        <div className="text-red-500">✖ MEMORY CORRUPTED — PURGE EXECUTED</div>
      )}
    </div>
  );
}
