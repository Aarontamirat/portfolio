"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "Next.js",
    description: "Server-rendered React apps",
    icon: "/nextjs.svg",
    level: 5,
  },
  {
    name: "React",
    description: "UI building with React",
    icon: "/React.svg",
    level: 5,
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript for safety",
    icon: "/TypeScript.svg",
    level: 4,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    icon: "/Tailwind CSS.svg",
    level: 4,
  },
  {
    name: "PHP",
    description: "Backend scripting language",
    icon: "/PHP.svg",
    level: 4,
  },
  {
    name: "PostgreSQL",
    description: "Relational database management",
    icon: "/PostgreSQL.svg",
    level: 3,
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray(".skill-card") as HTMLDivElement[];

    // ---------------- Canvas Particle Setup ----------------
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let particles: {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      alpha: number;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = sectionRef.current!.offsetWidth;
      canvas.height = sectionRef.current!.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const createParticles = (count = 60) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.8 + 0.2,
        });
      }
    };

    createParticles();

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31, 208, 224,${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // ---------------- Entrance Animation ----------------
    gsap.set(cards, {
      opacity: 0,
      y: 80,
      rotateX: 15,
      transformStyle: "preserve-3d",
      transformPerspective: 1000,
    });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // ---------------- Scroll Tilt ----------------
    cards.forEach((card) => {
      gsap.to(card, {
        rotateX: -5,
        rotateY: 5,
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

    // ---------------- Mouse 3D Parallax ----------------
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);

        const rotateY = offsetX * 0.05;
        const rotateX = -offsetY * 0.05;

        const dist = Math.sqrt(offsetX ** 2 + offsetY ** 2);
        const intensity = Math.min(1, 1 - dist / 300);

        gsap.to(card, {
          rotateX,
          rotateY,
          scale: 1 + intensity * 0.05,
          boxShadow: `0 20px 40px rgba(31, 208, 224,${0.2 + intensity * 0.3})`,
          duration: 0.2,
          ease: "power3.out",
        });
      });
    };

    const handleMouseLeave = () => {
      cards.forEach((card) => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: 0.5,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative px-4 py-16 sm:py-24 mx-auto max-w-7xl 2xl:px-0 perspective-1000 overflow-hidden"
    >
      {/* ---------------- Particle Canvas ---------------- */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      <h2 className="text-3xl font-display font-bold text-center text-white neon-text-glow mb-12">
        MY <span className="text-cyan-400">//_</span> TECH STACK
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="skill-card flex flex-col gap-4 p-6 bg-black/30 border border-[rgba(255,255,255,0.06)] rounded-terminal will-change-transform transition-transform duration-300 cursor-pointer"
          >
            <img src={skill.icon} alt={skill.name} className="w-12 h-12" />
            <p className="text-lg md:text-2xl font-display text-white">
              {skill.name}
            </p>
            <p className="text-sm md:text-lg font-mono text-gray-400">
              {skill.description}
            </p>

            {/* Neon Signal Bars */}
            <div className="mt-4 flex gap-1 flicker">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-4 rounded-sm transition-all duration-500 ${
                    idx < skill.level
                      ? "bg-cyan-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse"
                      : "bg-white/10"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
