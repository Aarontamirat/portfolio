"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SEGMENTS = 1;
const FOLLOW_SPEED = 0.15;

export default function MouseSnake() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Keep hidden until first mouse move
    gsap.set(containerRef.current, { opacity: 0 });

    // Initialize mouse at center
    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;

    const positions = Array.from({ length: SEGMENTS }, () => ({
      x: mouse.current.x,
      y: mouse.current.y,
    }));

    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Fade in ONLY on first movement
      if (!hasMoved.current && containerRef.current) {
        hasMoved.current = true;

        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 3.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouse);

    gsap.ticker.add(() => {
      // Head follows mouse
      positions[0].x += (mouse.current.x - positions[0].x) * FOLLOW_SPEED;
      positions[0].y += (mouse.current.y - positions[0].y) * FOLLOW_SPEED;

      // Body follows smoothly
      for (let i = 1; i < SEGMENTS; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.35;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.35;
      }

      // Apply transforms
      positions.forEach((pos, i) => {
        const prev = positions[i - 1] || pos;
        const angle =
          Math.atan2(prev.y - pos.y, prev.x - pos.x) * (180 / Math.PI);

        gsap.set(dotsRef.current[i], {
          x: pos.x,
          y: pos.y,
          rotate: angle,
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 opacity-0"
    >
      {Array.from({ length: SEGMENTS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          className="
            absolute
            rounded-full
            bg-transparent
            -translate-x-1/2
            -translate-y-1/2
            shadow-[0_0_20px_12px_rgba(24,211,238,0.6)]
          "
          style={{
            opacity: (SEGMENTS - i) / SEGMENTS,
          }}
        />
      ))}
    </div>
  );
}
