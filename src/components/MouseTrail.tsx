"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SEGMENTS = 40;
const FOLLOW_SPEED = 1.6;

/**
 * A component that renders a mouse trail effect
 * @returns {JSX.Element} A JSX element representing the mouse trail
 */
export default function MouseSnake() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  useEffect(() => {
    // Disable on mobile / touch
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;

    if (isTouchDevice) return;

    if (!containerRef.current) return;

    // Initialize container opacity to 0
    gsap.set(containerRef.current, { opacity: 0 });

    // Set initial mouse position to center of screen
    mouse.current.x = window.innerWidth / 2;
    mouse.current.y = window.innerHeight / 2;

    // Create an array of positions for the mouse trail
    const positions = Array.from({ length: SEGMENTS }, () => ({
      x: mouse.current.x,
      y: mouse.current.y,
    }));

    /**
     * Handle mouse move event
     * @param {MouseEvent} e The mouse move event
     */
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Fade in container only on first mouse move
      if (!hasMoved.current && containerRef.current) {
        hasMoved.current = true;
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouse);

    /**
     * Update mouse trail positions on each tick
     */
    const tick = () => {
      positions[0].x += (mouse.current.x - positions[0].x) * FOLLOW_SPEED;
      positions[0].y += (mouse.current.y - positions[0].y) * FOLLOW_SPEED;

      for (let i = 1; i < SEGMENTS; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.35;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.35;
      }

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
    };

    // Add the tick function to the GSAP ticker
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      gsap.ticker.remove(tick);
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
            shadow-[0_0_16px_8px_rgba(24,211,238,0.4)]
          "
          style={{ opacity: (SEGMENTS - i) / SEGMENTS }}
        />
      ))}
    </div>
  );
}
