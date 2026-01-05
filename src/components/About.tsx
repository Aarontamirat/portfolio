"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const lines = sectionRef.current.querySelectorAll(".scatter-line");

    lines.forEach((line) => {
      const el = line as HTMLElement;
      splitWords(el);

      const words = el.querySelectorAll(".word");

      gsap.fromTo(
        words,
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
        },
        {
          opacity: 0,
          x: () => gsap.utils.random(-80, 80),
          y: () => gsap.utils.random(-60, 60),
          rotate: () => gsap.utils.random(-16, 16),
          scale: 5.5,
          ease: "none",
          stagger: {
            each: 0.02,
            from: "random",
          },
          scrollTrigger: {
            trigger: el,
            start: "top 20%",
            end: "bottom -20%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="flex items-center justify-center"
    >
      <div className="mx-auto w-full max-w-275 px-4 py-24 2xl:max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="font-display text-2xl tracking-widest text-cyan-400 md:text-4xl headerFlicker">
              ABOUT
            </h2>
            <div className="mt-2 h-px w-16 bg-cyan-400/40 logoFlicker" />
            <p className="mt-6 max-w-sm font-mono text-lg md:text-xl uppercase tracking-wider text-gray-500 pl-4 border-l-4 border-cyan-400/30">
              Systems over shortcuts
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6 text-base md:text-xl leading-relaxed text-gray-400">
            <p className="scatter-line">
              As a full-stack developer, I understand how each layer—from
              React/Next.js interfaces to Node.js/Python APIs and
              PostgreSQL/MongoDB data layers—impacts the final product. This
              holistic perspective enables me to build systems that are
              technically robust, scalable, and aligned with business goals. I
              collaborate closely with teams to ensure solutions balance
              performance, maintainability, and stakeholder needs.
            </p>

            <p className="scatter-line">
              With 5+ years of full-stack experience across Next.js, React,
              Node.js, Python, and both SQL/NoSQL databases, I bridge frontend
              interfaces with backend architecture to build cohesive systems. I
              believe understanding every layer—from UI to database—is essential
              for creating scalable, maintainable solutions that meet both
              technical requirements and business objectives.
            </p>

            <p className="scatter-line border-l border-cyan-400/30 pl-4 text-gray-300">
              I apply a full-stack perspective to every task—whether building
              features, debugging, or optimizing performance. Understanding the
              entire system allows me to evaluate solutions holistically,
              ensuring they're both effective and scalable from UI to database.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function splitWords(element: HTMLElement) {
  const words = element.innerText.split(" ");
  element.innerHTML = words
    .map(
      (word) =>
        `<span class="word inline-block will-change-transform">${word}&nbsp;</span>`
    )
    .join("");
}
