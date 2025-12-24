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
            start: "top 40%",
            end: "bottom -40%",
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
            <h2 className="font-display text-2xl tracking-widest text-cyan-400">
              ABOUT
            </h2>
            <div className="mt-2 h-px w-16 bg-cyan-400/40" />
            <p className="mt-6 max-w-sm font-mono text-lg uppercase tracking-wider text-gray-500 pl-4 border-l-4 border-cyan-400/30">
              Systems over shortcuts
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6 text-base leading-relaxed text-gray-400">
            <p className="scatter-line">
              As a software developer with a passion for building systems that
              are understandable, reliable, and easy to evolve, I enjoy working
              close to the fundamentals — clean architecture, well-structured
              data, and interfaces that respect the user. I believe that
              maintainability matters more than short-term wins, and that
              investing time upfront in a well-designed system will lead to
              long-term success.
            </p>

            <p className="scatter-line">
              With experience in both front-end and back-end development, I have
              a deep understanding of the entire web development stack. I
              believe that the best systems are built by developers who are
              knowledgeable about every layer of the stack, from the user
              interface to the database and server. By working closely with
              designers, product managers, and other stakeholders, I can ensure
              that the systems I build are both technically sound and aligned
              with the needs of the business.
            </p>

            <p className="scatter-line border-l border-cyan-400/30 pl-4 text-gray-300">
              Whether working on a new feature, debugging an issue, or
              optimizing system performance, I bring a full-stack perspective to
              every task. This allows me to quickly identify potential solutions
              and to evaluate them in terms of their impact on the overall
              system. By considering the system as a whole, I can ensure that
              the solutions I develop are both effective and efficient.
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
