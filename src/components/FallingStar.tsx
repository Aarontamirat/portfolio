"use client";

import { motion, useScroll, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SEGMENTS = 20; // Number of tail segments

export default function FlowingSnake() {
  const { scrollYProgress } = useScroll();

  const x = useMotionValue(300);
  const y = useMotionValue(300);

  const angle = useRef(Math.random() * Math.PI * 2);
  const lastScroll = useRef(0);

  // Tail segments: each stores {x, y}
  const [trail, setTrail] = useState(Array(SEGMENTS).fill({ x: 300, y: 300 }));

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const delta = v - lastScroll.current;
      lastScroll.current = v;

      if (Math.abs(delta) < 0.0001) return;
      const speed = Math.min(Math.abs(delta) * 4000, 20);

      // Head steering
      angle.current += (Math.random() - 0.5) * 0.35;

      let nextX = x.get() + Math.cos(angle.current) * speed;
      let nextY = y.get() + Math.sin(angle.current) * speed;

      const padding = 80;
      const maxX = window.innerWidth - padding;
      const maxY = window.innerHeight - padding;

      if (nextX < padding || nextX > maxX)
        angle.current = Math.PI - angle.current;
      if (nextY < padding || nextY > maxY) angle.current = -angle.current;

      nextX = Math.max(padding, Math.min(maxX, nextX));
      nextY = Math.max(padding, Math.min(maxY, nextY));

      // Update head
      x.set(nextX);
      y.set(nextY);

      // Update trail
      const newTrail = [...trail];
      newTrail.unshift({ x: nextX, y: nextY }); // Add new head position
      newTrail.pop(); // Remove last segment
      setTrail(newTrail);
    });
  }, [scrollYProgress, x, y, trail]);

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50">
      {trail.map((segment, i) => {
        // Compute rotation toward next segment
        if (i === 0) return null;
        const prev = trail[i - 1];
        const dx = prev.x - segment.x;
        const dy = prev.y - segment.y;
        const theta = Math.atan2(dy, dx) * (180 / Math.PI);

        return (
          <motion.div
            key={i}
            style={{
              x: segment.x,
              y: segment.y,
              rotate: theta,
              opacity: (SEGMENTS - i) / SEGMENTS, // fade out tail
            }}
            className={`
              absolute
              h-0.5
              w-0.5
              rounded-full
              bg-cyan-400
              shadow-[0_0_${8 + i}px_rgba(34,211,238,0.7)]
              after:absolute
              after:top-1/2
              after:right-full
              after:h-px
              after:w-20
              after:-translate-y-1/2
              after:bg-linear-to-l
              after:from-cyan-400/70
              after:to-transparent
            `}
          />
        );
      })}
    </div>
  );
}
