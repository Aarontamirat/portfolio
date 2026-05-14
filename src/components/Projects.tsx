"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Human Resources & Logistics Management System",
    description:
      "Human resources and logistics management system for tracking employees, projects, and deliveries.",
    tech: ["Next.js", "MySQL", "Tailwind CSS"],
    image: "/projects/hrlog.png",
  },
  {
    title: "Shareholder Voting System",
    description:
      "Weighted voting system with real-time vote aggregation and reporting.",
    tech: ["Next.js", "Prisma", "MySQL", "Tailwind CSS"],
    image: "/projects/voting.png",
  },
  {
    title: "ITSM Platform",
    description:
      "Full-featured IT Service Management System with ticketing, project management, and performance modules.",
    tech: ["PHP", "MySQL", "jQuery", "Tailwind CSS"],
    image: "/projects/itsm.jpg",
  },
  {
    title: "Library Management System",
    description:
      "Library management system for tracking books, members, and transactions.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Nest.js"],
    image: "/projects/library.png",
  },
  {
    title: "Leave Management System",
    description:
      "Leave management system for tracking employees' leave requests and approvals.",
    tech: ["React.js", "PostgreSQL", "Tailwind CSS", "Express.js"],
    image: "/projects/leave.png",
  },
  {
    title: "Claim Notifications Platform",
    description:
      "Web application for submitting and managing insurance claims. Includes features such as claim status tracking, payment processing, and automated notifications.",
    tech: ["PHP", "MVC", "PostgreSQL", "Tailwind CSS"],
    image: "/projects/claim.png",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card") as HTMLDivElement[];

      /* ---------------- SECTION REVEAL ---------------- */

      gsap.from(sectionRef.current, {
        autoAlpha: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      /* ---------------- INITIAL CARD STATE ---------------- */

      gsap.set(cards, {
        autoAlpha: 0,
        y: 60,
        rotateX: 12,
        transformPerspective: 1000,
        transformOrigin: "top center",
        force3D: true,
      });

      /* ---------------- CARD REVEAL ---------------- */

      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "transform",
        overwrite: "auto",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      /* ---------------- SUBTLE PARALLAX ---------------- */

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -20 * (i % 3),
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      /* ---------------- HOVER EFFECT ---------------- */

      const enterHandlers: (() => void)[] = [];
      const leaveHandlers: (() => void)[] = [];

      cards.forEach((card) => {
        const enter = () => {
          cards.forEach((c) => {
            if (c === card) {
              gsap.to(c, {
                scale: 1.04,
                boxShadow: "0 30px 80px rgba(31,208,224,0.25)",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            } else {
              gsap.to(c, {
                scale: 0.97,
                opacity: 0.6,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });
        };

        const leave = () => {
          gsap.to(cards, {
            scale: 1,
            opacity: 1,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        enterHandlers.push(enter);
        leaveHandlers.push(leave);
      });

      return () => {
        cards.forEach((card, i) => {
          card.removeEventListener("mouseenter", enterHandlers[i]);
          card.removeEventListener("mouseleave", leaveHandlers[i]);
        });
      };
    }, sectionRef);

    return () => ctx.revert();
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
        SELECTED <span className="text-cyan-400 headerFlicker">//_</span>{" "}
        PROJECTS
      </h2>

      <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            className="project-card relative flex flex-col gap-5 rounded-terminal bg-black/40 border border-white/5 p-6 will-change-transform"
            onClick={() => setActiveProject(project)}
          >
            <div className="relative h-40 overflow-hidden rounded-md">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
            </div>

            <h3 className="text-lg md:text-xl font-display text-white">
              {project.title}
            </h3>

            <p className="text-sm md:text-lg font-mono text-gray-400">
              {project.description}
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-sm bg-cyan-500/10 px-2 py-1 text-xs md:text-base trackinf tracking-wide font-mono text-cyan-300"
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
