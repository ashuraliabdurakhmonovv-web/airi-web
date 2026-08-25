/** @format */

"use client";

import { useEffect, useRef } from "react";
import HeroContent from "./hero-content";

function InteractiveNeuralLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      phase: number;
    };

    const particles: Particle[] = [];
    const particleCount = 95;
    const connectDistance = 150;
    const mouseConnectDistance = 230;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;

      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: Math.random() * 1.7 + 0.7,
          alpha: Math.random() * 0.45 + 0.18,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      alpha: number,
      strong = false,
    ) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);

      gradient.addColorStop(
        0,
        strong
          ? `rgba(84, 162, 255, ${alpha})`
          : `rgba(84, 162, 255, ${alpha * 0.65})`,
      );

      gradient.addColorStop(
        1,
        strong
          ? `rgba(45, 212, 191, ${alpha})`
          : `rgba(167, 139, 250, ${alpha * 0.55})`,
      );

      ctx.strokeStyle = gradient;
      ctx.lineWidth = strong ? 1.15 : 0.65;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

        const pulse = 0.55 + Math.sin(time * 0.001 + particle.phase) * 0.45;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius + pulse * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 235, 255, ${particle.alpha + pulse * 0.2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(84, 162, 255, ${0.025 + pulse * 0.035})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];

          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            const alpha = (1 - distance / connectDistance) * 0.12;
            drawLine(first.x, first.y, second.x, second.y, alpha);
          }
        }
      }

      const mouse = mouseRef.current;

      if (mouse.active) {
        for (const particle of particles) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseConnectDistance) {
            const alpha = (1 - distance / mouseConnectDistance) * 0.52;
            drawLine(particle.x, particle.y, mouse.x, mouse.y, alpha, true);

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(84, 162, 255, ${alpha * 0.45})`;
            ctx.fill();
          }
        }

        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180,
        );

        glow.addColorStop(0, "rgba(84, 162, 255, 0.14)");
        glow.addColorStop(0.45, "rgba(45, 212, 191, 0.055)");
        glow.addColorStop(1, "rgba(84, 162, 255, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      resize();
      createParticles();
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-4 h-full w-full opacity-80"
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Video layer */}

      {/*
        `preload="metadata"` — `/ishlab-chiqarish/` dagi hero bilan bir xil:
        brauzerga butun faylni oldindan bufferlamaslikni aytadi. Video 45%
        shaffoflik ostidagi fon, shuning uchun uni birinchi ekran bilan
        poygaga qo'yish shart emas.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-45 select-none"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark cinematic overlay */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-r from-black via-black/68 to-black/35" />
      <div className="pointer-events-none absolute inset-0 z-2 bg-[radial-gradient(circle_at_65%_45%,rgba(84,162,255,0.16),transparent_34%),radial-gradient(circle_at_20%_75%,rgba(45,212,191,0.11),transparent_28%)]" />

      {/* Soft grid layer */}
      <div className="pointer-events-none absolute inset-0 z-3 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[96px_96px] opacity-35" />

      {/* Premium glow accents */}
      <div className="pointer-events-none absolute -right-32 top-20 z-3 h-112 w-md rounded-full bg-[#54a2ff]/14 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 z-3 h-96 w-[24rem] rounded-full bg-[#2dd4bf]/10 blur-[140px]" />

      {/* Mouse interactive neural layer */}
      <InteractiveNeuralLayer />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <HeroContent />
      </div>
    </section>
  );
}
