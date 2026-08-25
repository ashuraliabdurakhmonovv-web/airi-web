/** @format */

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import logo from "@/public/logoWhite.svg";
import { useLocale } from "@/i18n";
import { motion, AnimatePresence } from "motion/react";

/**
 * Neural Network Background Animation
 * Draws moving particles (neurons) and connecting lines (synapses)
 */
const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 150;
    const mouse = { x: 0, y: 0, radius: 100 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.5)"; // Blue-500 with opacity
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
};

export default function InstituteLoader() {
  const { t } = useLocale();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8fafc] overflow-hidden">
      {/* AI Animated Background */}
      <NeuralNetworkBackground />

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center">
        {/* Logo with Glow and Pulse */}
        <div className="relative w-32 h-32 mb-8">
          {/* Animated Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-blue-400 rounded-full blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full">
            <Image
              src={logo}
              alt="AIRI Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              priority
            />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center">
          {/* SEO: yuklanish ekrani <h1> bo'lmaydi — app/loading.tsx dagi izohga qarang. */}
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            {t.loading.title}
          </p>

          {/* Neural Pulse Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: ["#3b82f6", "#60a5fa", "#3b82f6"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative AI Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
