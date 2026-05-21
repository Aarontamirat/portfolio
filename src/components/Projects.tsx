"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectModal from "./ProjectModal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "HR & Logistics Management Platform",
    category: "Enterprise System",
    description:
      "Centralized platform for managing employees, logistics operations, project assignments, and delivery workflows.",
    challenge:
      "Designed scalable data structures and operational workflows for workforce and logistics coordination.",
    tech: ["Next.js", "MySQL", "Tailwind CSS"],
    image: "/projects/hrlog.png",
  },
  {
    title: "Shareholder Voting System",
    category: "Voting & Governance",
    description:
      "Weighted voting system with real-time vote aggregation, attendance tracking, and shareholder-based vote weighting.",
    challenge:
      "Implemented secure weighted calculations and real-time reporting logic.",
    tech: ["Next.js", "Prisma", "MySQL", "Tailwind CSS"],
    image: "/projects/voting.png",
  },
  {
    title: "IT Service Management Platform",
    category: "Enterprise ITSM",
    description:
      "Comprehensive IT service management platform with ticketing, project management, performance monitoring, and workflow handling.",
    challenge:
      "Built a modular architecture supporting multiple enterprise service flows.",
    tech: ["PHP", "MySQL", "jQuery", "Tailwind CSS"],
    image: "/projects/itsm.jpg",
  },
  {
    title: "Library Management System",
    category: "Management Platform",
    description:
      "System for tracking books, memberships, lending activity, and library operations.",
    challenge:
      "Designed efficient relational structures for transaction-heavy operations.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS", "Nest.js"],
    image: "/projects/library.png",
  },
  {
    title: "Leave Management System",
    category: "HR Automation",
    description:
      "Employee leave request and approval system with workflow automation and administrative oversight.",
    challenge: "Created approval flows and permission-based request handling.",
    tech: ["React.js", "PostgreSQL", "Tailwind CSS", "Express.js"],
    image: "/projects/leave.png",
  },
  {
    title: "Insurance Claim Notifications Platform",
    category: "Insurance Technology",
    description:
      "Claims submission and notification platform with status tracking, automated updates, and payment workflows.",
    challenge:
      "Designed secure notification and claim lifecycle management processes.",
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

      /* ==========================
         HEADING REVEAL
      ========================== */

      gsap.from(".projects-heading", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      /* ==========================
         CARD INITIAL STATE
      ========================== */

      gsap.set(cards, {
        opacity: 0,
        y: 45,
        scale: 0.97,
        force3D: true,
      });

      /* ==========================
         CARD REVEAL
      ========================== */

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      /* ==========================
         SUBTLE FLOATING EFFECT
      ========================== */

      cards.forEach((card, i) => {
        gsap.to(card, {
          y: -8 * ((i % 2) + 1),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /* ==========================
         HOVER EFFECTS
      ========================== */

      const cleanups: (() => void)[] = [];

      cards.forEach((card) => {
        const enter = () => {
          cards.forEach((c) => {
            if (c === card) {
              gsap.to(c, {
                y: -8,
                scale: 1.02,
                borderColor: "rgba(34,211,238,0.2)",
                boxShadow: "0 18px 60px rgba(34,211,238,0.12)",
                duration: 0.35,
                ease: "power3.out",
              });
            } else {
              gsap.to(c, {
                scale: 0.985,
                opacity: 0.72,
                duration: 0.35,
                ease: "power3.out",
              });
            }
          });
        };

        const leave = () => {
          cards.forEach((c) => {
            gsap.to(c, {
              y: 0,
              scale: 1,
              opacity: 1,
              borderColor: "rgba(255,255,255,0.05)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 0.4,
              ease: "power3.out",
            });
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        });
      });

      ScrollTrigger.refresh();

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative mx-auto max-w-7xl px-4 py-32">
      {/* Divider */}
      <div className="absolute -top-24 left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Heading */}

      <div className="projects-heading text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-500/5 px-4 py-2 backdrop-blur-xl">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

          <span className="text-xs tracking-[0.25em] text-cyan-300">
            SELECTED_WORK
          </span>
        </div>

        <h2 className="text-center font-display text-3xl font-bold text-white neon-text-glow">
          FEATURED <span className="text-cyan-400 headerFlicker">//_</span>{" "}
          PROJECTS
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
          Selected systems and applications focused on solving operational,
          enterprise, and business workflow challenges.
        </p>
      </div>

      {/* Projects Grid */}

      <div className="mt-20 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.title}
            onClick={() => setActiveProject(project)}
            className="
              project-card
              group
              relative
              flex
              h-full
              cursor-pointer
              flex-col
              overflow-hidden
              rounded-3xl
              border border-white/5
              bg-black/30
              backdrop-blur-2xl
              transition-all duration-500
            ">
            {/* Top glow */}

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Image */}

            <div className="relative h-56 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute left-5 top-5 rounded-full border border-cyan-400/20 bg-black/60 px-3 py-1 backdrop-blur-md">
                <span className="text-xs tracking-wide text-cyan-300">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold leading-tight text-white">
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {project.description}
              </p>

              {/* Engineering focus */}

              <div className="mt-5 rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                  Engineering Focus
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {project.challenge}
                </p>
              </div>

              {/* Tech stack */}

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="
                      rounded-md
                      border border-cyan-500/10
                      bg-cyan-500/10
                      px-3 py-1
                      text-xs
                      tracking-wide
                      text-cyan-300
                    ">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer */}

              <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                <span className="text-sm text-gray-400">View Details</span>

                <span className="text-cyan-300 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>

            {/* Bottom glow */}

            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-80" />
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
