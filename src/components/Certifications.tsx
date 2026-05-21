"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { ShieldCheck, Award, BadgeCheck, ExternalLink } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    title: "IBM Web Development Fundamentals",
    issuer: "IBM",
    year: "2025",
    badge: "/badges/web-development-fundamentals.png",
    description:
      "Foundational credential covering full web development workflows including frontend, backend, databases, testing, and deployment concepts.",
    skills: ["Frontend", "Backend", "Databases", "Testing", "SDLC"],
    status: "Verified",
    link: "https://www.credly.com/badges/6903c6df-0bd6-4c00-9c50-7381a7ba70a3/public_url",
  },
  {
    title: "JavaScript Essentials",
    issuer: "Cisco",
    year: "2025",
    badge: "/badges/javascript-essentials-1.png",
    description:
      "Core JavaScript programming including functions, logic, debugging, problem-solving, and algorithmic thinking.",
    skills: [
      "JavaScript",
      "Functions",
      "Debugging",
      "Algorithms",
      "Problem Solving",
    ],
    status: "Verified",
    link: "https://www.credly.com/badges/6e93da1f-41f6-4cd8-80bc-a6f648fc0e84/public_url",
  },
  {
    title: "HTML Essentials",
    issuer: "Cisco",
    year: "2025",
    badge: "/badges/html-essentials.png",
    description:
      "HTML5 fundamentals including semantic structure, accessibility, forms, multimedia, and modern web standards.",
    skills: ["HTML5", "Accessibility", "Forms", "Semantic HTML"],
    status: "Verified",
    link: "https://www.credly.com/badges/1946dd93-7697-40e9-a1a2-1f5f5ce4f799/public_url",
  },
  {
    title: "CSS Essentials",
    issuer: "Cisco",
    year: "2025",
    badge: "/badges/css-essentials.png",
    description:
      "CSS fundamentals including responsive layouts, Flexbox, Grid, animations, and UI styling best practices.",
    skills: ["Responsive Design", "Flexbox", "Grid", "Animations"],
    status: "Verified",
    link: "https://www.credly.com/badges/1d4394ca-3f13-476d-86a0-411c44642834/public_url",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".cert-card") as HTMLDivElement[];

      /* =========================================
         HEADING ANIMATION
      ========================================= */

      gsap.from(".cert-heading", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      /* =========================================
         CARD ENTRANCE
      ========================================= */

      gsap.set(cards, {
        opacity: 0,
        y: 50,
        scale: 0.97,
        force3D: true,
      });

      cards.forEach((card, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(card, {
          opacity: 0.3,
          duration: 0.05,
        })
          .to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "expo.out",
          })
          .to(
            card,
            {
              opacity: 0.92,
              duration: 0.04,
              repeat: 1,
              yoyo: true,
            },
            "-=0.5",
          );

        /* =====================================
           FLOATING DRIFT
        ===================================== */

        gsap.to(card, {
          y: -8 * ((index % 3) + 1),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        /* =====================================
           HOVER
        ===================================== */

        const enter = () => {
          cards.forEach((c) => {
            if (c === card) {
              gsap.to(c, {
                y: -8,
                scale: 1.02,
                borderColor: "rgba(34,211,238,0.3)",
                boxShadow: "0 20px 70px rgba(34,211,238,0.12)",
                duration: 0.45,
                ease: "power3.out",
              });
            } else {
              gsap.to(c, {
                opacity: 0.6,
                scale: 0.985,
                duration: 0.45,
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
              duration: 0.5,
              ease: "power3.out",
            });
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        return () => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        };
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative mx-auto max-w-7xl px-4 py-32">
      {/* =========================================
          TRANSITION DIVIDER
      ========================================= */}

      <div className="absolute top-0 left-1/2 h-32 w-px -translate-x-1/2 bg-linear-to-b from-cyan-500/0 via-cyan-400/40 to-transparent" />

      <div className="absolute top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* =========================================
          HEADING
      ========================================= */}

      <div className="cert-heading text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-500/5 px-4 py-2 backdrop-blur-xl">
          <ShieldCheck className="h-4 w-4 text-cyan-300" />

          <span className="text-xs tracking-[0.25em] text-cyan-300">
            VERIFIED_CREDENTIALS
          </span>
        </div>

        <h2 className="text-3xl font-display font-bold text-center text-white neon-text-glow">
          CERTIFICATIONS{" "}
          <span className="text-cyan-400 headerFlicker">//_</span>{" "}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
          Technical certifications validating core competencies in web
          development, frontend engineering, and modern software systems.
        </p>
      </div>

      {/* =========================================
          GRID
      ========================================= */}

      <div className="mx-auto mt-20 grid max-w-5xl gap-6 lg:grid-cols-2">
        {certifications.map((cert, index) => (
          <div
            key={cert.title}
            className="
              cert-card
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/5
              bg-black/30
              backdrop-blur-2xl
              transform-gpu
            ">
            {/* =====================================
                TOP GLOW
            ===================================== */}

            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* =====================================
                GRID BACKGROUND
            ===================================== */}

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* =====================================
                CONTENT
            ===================================== */}

            <div className="relative z-10 p-6">
              {/* =================================
                  TOP ROW
              ================================= */}

              <div className="flex items-start justify-between">
                {/* LEFT ICON */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-500/10">
                  {index % 3 === 0 ? (
                    <Award className="h-7 w-7 text-cyan-300" />
                  ) : index % 3 === 1 ? (
                    <BadgeCheck className="h-7 w-7 text-cyan-300" />
                  ) : (
                    <ShieldCheck className="h-7 w-7 text-cyan-300" />
                  )}
                </div>

                {/* BADGE IMAGE */}
                {cert.badge ? (
                  <div
                    className="
                    relative
                    h-16
                    w-16
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-md
                  ">
                    <Image
                      src={cert.badge}
                      alt={`${cert.title} badge`}
                      fill
                      className="object-contain p-2 opacity-90"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-500/10 px-3 py-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                    <span className="text-[10px] tracking-[0.2em] text-emerald-300">
                      {cert.status}
                    </span>
                  </div>
                )}
              </div>

              {/* =================================
                  TITLE
              ================================= */}

              <div className="mt-8">
                <h3 className="text-xl font-semibold leading-tight text-white">
                  {cert.title}
                </h3>

                <div className="mt-3 flex items-center gap-3 text-sm text-cyan-300">
                  <span>{cert.issuer}</span>

                  <span className="h-1 w-1 rounded-full bg-cyan-400" />

                  <span>{cert.year}</span>
                </div>
              </div>

              {/* DESCRIPTION */}

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {cert.description}
              </p>

              {/* =================================
                  SKILLS
              ================================= */}

              <div className="mt-7 flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-md
                      border
                      border-cyan-400/10
                      bg-cyan-500/10
                      px-3
                      py-1
                      text-xs
                      tracking-wide
                      text-cyan-300
                    ">
                    {skill}
                  </span>
                ))}
              </div>

              {/* =================================
                  FOOTER
              ================================= */}

              <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-5">
                <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-emerald-300">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

                  {cert.status}
                </div>

                {cert.link && (
                  <div className="flex items-center gap-2">
                    <Link href={cert.link} target="_blank" rel="noopener">
                      <span className="text-sm text-cyan-300">
                        Verify Credential
                      </span>
                    </Link>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>

            {/* =====================================
                GLOW
            ===================================== */}

            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
