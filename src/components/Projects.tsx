"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "ITSM Platform",
    description:
      "Full-featured IT Service Management System with ticketing, project management, and performance modules.",
    tech: ["PHP", "MySQL", "jQuery", "Tailwind CSS"],
    image: "/projects/itsm.jpg",
  },
  {
    title: "Shareholder Voting System",
    description:
      "Weighted voting system with real-time vote aggregation and reporting.",
    tech: ["Next.js", "Prisma", "MySQL", "Tailwind CSS"],
    image: "/projects/voting.png",
  },
  {
    title: "Claim Notifications Platform",
    description:
      "Web application for submitting and managing insurance claims. Includes features such as claim status tracking, payment processing, and automated notifications.",
    tech: ["PHP", "MVC", "PayPal"],
    image: "/projects/claim.png",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray(".project-card") as HTMLDivElement[];

    /* ---------------- SECTION TRANSITION ---------------- */

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 120 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    /* ---------------- CARD REVEAL TIMELINE ---------------- */

    gsap.set(cards, {
      opacity: 0,
      y: 80,
      rotateX: 20,
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });

    /* ---------------- SCROLL DEPTH ---------------- */

    cards.forEach((card, i) => {
      gsap.to(card, {
        z: i * 40,
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    /* ---------------- HOVER FOCUS MODE ---------------- */

    let activeCard: HTMLDivElement | null = null;

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        if (activeCard === card) return;
        activeCard = card;

        gsap.killTweensOf(cards);

        cards.forEach((c) => {
          if (c === card) {
            gsap.to(c, {
              scale: 1.06,
              opacity: 1,
              boxShadow: "0 30px 80px rgba(31,208,224,0.35)",
              duration: 0.35,
              ease: "power3.out",
            });
          } else {
            gsap.to(c, {
              scale: 0.95,
              opacity: 0.45,
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 0.35,
              ease: "power3.out",
            });
          }
        });
      });

      card.addEventListener("mouseleave", () => {
        activeCard = null;

        gsap.killTweensOf(cards);

        gsap.to(cards, {
          scale: 1,
          opacity: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.45,
          ease: "power3.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative px-4 py-28 mx-auto max-w-7xl perspective-1200"
    >
      {/* Section divider glow */}
      <div className="absolute -top-24 left-1/2 h-px w-[60%] -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />

      <h2 className="text-3xl font-display font-bold text-center text-white neon-text-glow">
        SELECTED <span className="text-cyan-400">//_</span> PROJECTS
      </h2>

      <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="project-card relative flex flex-col gap-5 rounded-terminal bg-black/40 border border-white/5 p-6 will-change-transform"
            onClick={() => setActiveProject(project)}
          >
            <div className="relative h-40 overflow-hidden rounded-md">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
            </div>

            <h3 className="text-lg font-display text-white">{project.title}</h3>

            <p className="text-sm font-mono text-gray-400">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-sm bg-cyan-500/10 px-2 py-1 text-xs font-mono text-cyan-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
