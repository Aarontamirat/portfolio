"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (!sectionRef.current || !panelRef.current) return;

    const panel = panelRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        once: true,
      },
    });

    /* HARD POWER OFF*/
    tl.set(panel, {
      opacity: 0,
      scale: 1,
      filter: "brightness(0)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    });

    /* ELECTRICAL CHAOS PHASE*/
    for (let i = 0; i < 18; i++) {
      tl.to(panel, {
        opacity: gsap.utils.random(0.05, 1),
        filter: `brightness(${gsap.utils.random(0.2, 3.5)})`,
        boxShadow: `0 0 ${gsap.utils.random(
          20,
          180
        )}px rgba(34,211,238,${gsap.utils.random(0.1, 0.7)})`,
        duration: gsap.utils.random(0.05, 0.18),
        ease: "none",
      });

      // occasional full blackout
      if (Math.random() > 0.65) {
        tl.to(panel, {
          opacity: 0,
          filter: "brightness(0)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          duration: gsap.utils.random(0.04, 0.1),
          ease: "none",
        });
      }
    }

    /* FINAL POWER LOCK */
    tl.to(panel, {
      opacity: 1,
      scale: 1,
      filter: "brightness(1)",
      boxShadow: "0 0 140px rgba(34,211,238,0.35)",
      duration: 0.9,
      ease: "power3.out",
    });
  }, []);

  // KeyStroke Animation
  useEffect(() => {
    const inputs = gsap.utils.toArray<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea"
    );

    inputs.forEach((el) => {
      el.addEventListener("keydown", () => {
        gsap.fromTo(
          el,
          {
            boxShadow: "0 0 0 rgba(34,211,238,0)",
          },
          {
            boxShadow: "0 0 40px rgba(34,211,238,0.6)",
            duration: 0.08,
            yoyo: true,
            repeat: 1,
            ease: "none",
          }
        );
      });
    });

    return () => {
      inputs.forEach((el) => {
        el.replaceWith(el.cloneNode(true));
      });
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;

    // check if phone is valid
    if (form.phone.value && !/^\d{10}$/.test(form.phone.value)) {
      setStatus("idle");
      return alert("Invalid phone number");
    }

    // check if email is valid
    if (form.email.value && !/^\S+@\S+\.\S+$/.test(form.email.value)) {
      setStatus("idle");
      return alert("Invalid email");
    }

    const data = Object.fromEntries(new FormData(form));

    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setStatus("sent");
    form.reset();
  }

  // Success Animation
  useEffect(() => {
    if (status !== "sent") return;

    const lines = [
      "> ENCRYPTING PAYLOAD...",
      "> CONFIRMING HANDSHAKE...",
      "> TRANSMITTING DATA STREAM...",
      "> ACCEPTING PACKETS...",
      "> LOCKING CHANNEL...",
      "> ASSEMBLING PACKETS...",
      "> TRANSMISSION EXECUTED SUCCESSFULLY ✓",
    ];

    const container = document.getElementById("terminal-output");
    if (!container) return;

    container.innerHTML = "";

    const tl = gsap.timeline();

    lines.forEach((text, i) => {
      const line = document.createElement("div");
      line.textContent = text;
      line.style.opacity = "0";
      container.appendChild(line);

      tl.to(line, {
        opacity: 1,
        duration: gsap.utils.random(0.6, 1),
        ease: "none",
      }).to(
        line,
        {
          textShadow: "0 0 12px rgba(34,211,238,0.8)",
          duration: gsap.utils.random(0.5, 0.7),
        },
        "-=0.1"
      );
    });

    tl.to(panelRef.current, {
      boxShadow: "0 0 220px rgba(34,211,238,0.45)",
      duration: 0.6,
      ease: "power3.out",
    });
  }, [status]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-4 py-32 mx-auto max-w-5xl"
    >
      <h2 className="mb-12 text-center text-3xl font-display text-white neon-text-glow">
        CONTACT <span className="text-cyan-400 headerFlicker">//_</span>{" "}
        TERMINAL
      </h2>

      <div
        ref={panelRef}
        className="relative rounded-lg border border-cyan-500/20 bg-black/60 p-8 shadow-[0_0_120px_rgba(34,211,238,0.35)] overflow-hidden animate-[pulse_6s_ease-in-out_infinite]"
      >
        {/* Scanline */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[100%_4px]" />

        {/* Terminal Header */}
        <p className="mb-6 font-mono text-xs md:text-lg text-cyan-400">
          &gt;// SECURE CHANNEL INITIALIZED
        </p>

        {status === "sent" && (
          <div
            id="terminal-output"
            className="space-y-2 font-mono text-xs md:text-base text-cyan-400"
          />
        )}

        {status !== "sent" && (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 font-mono text-sm md:text-base tracking-wide"
          >
            <Input label="NAME" name="name" type="text" />
            <Input label="EMAIL" name="email" type="email" />
            <InputOptional label="PHONE" name="phone" type="tel" />
            <Textarea label="MESSAGE" name="message" />

            <button
              type="submit"
              disabled={status !== "idle"}
              className="
              mt-5
              w-full
              md:text-lg
              border
              border-cyan-500/30
              bg-cyan-500/10
              py-3
              text-cyan-300
              transition
              hover:bg-cyan-500/20
              disabled:opacity-50
            "
            >
              {status === "idle" && "EXECUTE TRANSMISSION"}
              {status === "sending" && "TRANSMITTING..."}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- INPUT COMPONENTS ---------- */

function Input({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs md:text-base text-cyan-400">
        {label}
      </span>
      <input
        required
        name={name}
        type={type}
        className="
          w-full
          bg-black/60
          border
          border-cyan-500/20
          px-3
          py-2
          text-cyan-100
          outline-none
          focus:border-cyan-400 caret-cyan-400
        "
      />
    </label>
  );
}

function InputOptional({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs md:text-base text-cyan-400">
        {label}
      </span>
      <input
        name={name}
        type={type}
        className="
          w-full
          bg-black/60
          border
          border-cyan-500/20
          px-3
          py-2
          text-cyan-100
          outline-none
          focus:border-cyan-400 caret-cyan-400
        "
        placeholder="You can skip me hehe...  But don't you dare the rest :("
      />
    </label>
  );
}

function Textarea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs md:text-base text-cyan-400">
        {label}
      </span>
      <textarea
        required
        name={name}
        rows={5}
        className="
          w-full
          bg-black/60
          border
          border-cyan-500/20
          px-3
          py-2
          text-cyan-100
          outline-none
          focus:border-cyan-400 caret-cyan-400
        "
      />
    </label>
  );
}
