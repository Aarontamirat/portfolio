"use client";
import { useEffect, useRef } from "react";

export default function CyberScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    let timeout: NodeJS.Timeout;
    let lastScroll = window.scrollY;

    const updateThumb = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      const thumbHeight = Math.max(window.innerHeight * 0.12, 70);
      const maxTop = window.innerHeight - thumbHeight - 20;
      const top = scrollPercent * maxTop;

      // Detect scroll direction
      const direction = scrollTop > lastScroll ? "down" : "up";
      lastScroll = scrollTop;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${top}px)`;

      thumb.dataset.direction = direction;
      thumb.classList.add("moving");

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        thumb.classList.remove("moving");
        thumb.dataset.direction = "idle";
      }, 140);
    };

    updateThumb();
    window.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    return () => {
      window.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  return (
    <div className="cyber-scrollbar">
      <div ref={thumbRef} className="cyber-thumb" data-direction="idle" />
    </div>
  );
}
