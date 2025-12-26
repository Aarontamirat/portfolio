"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";

interface CyberMiniGameProps {
  onWin: () => void;
}

type Packet = {
  x: number;
  y: number;
  size: number;
  speed: number;
  caught: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
};

export default function CyberMiniGame({ onWin }: CyberMiniGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef(0);
  const scoreGoal = 15;
  const maxActivePackets = 4;
  const catchSound = new Howl({ src: ["/sounds/catch.mp3"] });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth * 0.9;
    canvas.height = 500;

    let animationFrameId: number;
    let trayX = canvas.width / 2;
    let trayGlow = 0;
    let dragging = false;

    const activePackets: Packet[] = [];
    const particles: Particle[] = [];

    /* --------------------------------------------
       POINTER EVENTS (MOUSE + TOUCH)
    --------------------------------------------- */
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;

      const rect = canvas.getBoundingClientRect();
      trayX = e.clientX - rect.left;

      trayX = Math.max(50, Math.min(canvas.width - 50, trayX));
    };

    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      canvas.releasePointerCapture(e.pointerId);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    /* --------------------------------------------
       GAME LOGIC
    --------------------------------------------- */
    function spawnPacket() {
      if (activePackets.length < maxActivePackets) {
        activePackets.push({
          x: Math.random() * canvas.width,
          y: -30,
          size: 30,
          speed: 2 + Math.random() * 3,
          caught: false,
        });
      }
    }

    function spawnParticles(x: number, y: number) {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 1.2) * 5,
          alpha: 1,
          size: 3 + Math.random() * 2,
        });
      }
    }

    function drawBackground() {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#0ff";
      ctx.lineWidth = 0.3;

      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      for (let j = 0; j < canvas.height; j += 50) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }
    }

    function draw() {
      drawBackground();

      // Packets
      activePackets.forEach((p) => {
        ctx.fillStyle = "#0f0";
        ctx.shadowColor = "#0f0";
        ctx.shadowBlur = 6;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.fillStyle = `rgba(25,255,230,${p.alpha})`;
          ctx.shadowBlur = 10;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      // Tray
      ctx.fillStyle = "#ff0";
      ctx.shadowColor = "#ff0";
      ctx.shadowBlur = trayGlow;
      ctx.fillRect(trayX - 50, canvas.height - 20, 100, 10);

      // Score
      ctx.fillStyle = "#0ff";
      ctx.shadowBlur = 0;
      ctx.font = "20px monospace";
      ctx.fillText(`Score: ${scoreRef.current}/${scoreGoal}`, 20, 30);
    }

    function update() {
      spawnPacket();

      activePackets.forEach((p) => {
        p.y += p.speed;

        if (
          !p.caught &&
          p.y + p.size >= canvas.height - 20 &&
          p.x + p.size >= trayX - 50 &&
          p.x <= trayX + 50
        ) {
          scoreRef.current += 1;
          catchSound.play();
          p.caught = true;
          spawnParticles(p.x + p.size / 2, p.y + p.size / 2);
          trayGlow = 20;
        }
      });

      for (let i = activePackets.length - 1; i >= 0; i--) {
        if (activePackets[i].y > canvas.height + 50) {
          activePackets.splice(i, 1);
        }
      }

      trayGlow *= 0.85;

      if (scoreRef.current >= scoreGoal) {
        onWin();
        return;
      }

      draw();
      animationFrameId = requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [onWin, catchSound]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-cyan-400 mt-8 rounded-lg"
      style={{
        touchAction: "none", // REQUIRED for mobile dragging
      }}
    />
  );
}
