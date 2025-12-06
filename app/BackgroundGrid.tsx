"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * (prefersReducedMotion ? 1 : 1.5);
      canvas.height = window.innerHeight * (prefersReducedMotion ? 1 : 1.5);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      if (!ctx || !canvas) return;
      t += prefersReducedMotion ? 0.001 : 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#03080c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const spacing = prefersReducedMotion ? 120 : 80;
      const offset = (Math.sin(t) * spacing) / 4;
      ctx.strokeStyle = "rgba(0,255,170,0.06)";
      ctx.lineWidth = 1;

      // Diagonal lines
      for (let x = -canvas.height; x < canvas.width + canvas.height; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x - canvas.height + offset, canvas.height);
        ctx.stroke();
      }
      for (let x = 0; x < canvas.width + canvas.height; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x - offset, 0);
        ctx.lineTo(x + canvas.height - offset, canvas.height);
        ctx.stroke();
      }

      // Glitch pulse
      if (!prefersReducedMotion && Math.random() < 0.01) {
        ctx.fillStyle = "rgba(147,51,234,0.08)";
        const gx = Math.random() * canvas.width;
        const gy = Math.random() * canvas.height;
        const gw = 120 + Math.random() * 160;
        const gh = 20 + Math.random() * 30;
        ctx.fillRect(gx - gw / 2, gy - gh / 2, gw, gh);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  const gradientBlobs = (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <motion.div
        className="absolute w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-emerald-500/10 blur-[120px] rounded-full"
        animate={{ x: ["-10%", "10%", "-8%"], y: ["-5%", "5%", "-4%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] max-w-[700px] max-h-[700px] bg-purple-500/10 blur-[130px] rounded-full"
        animate={{ x: ["5%", "-5%", "6%"], y: ["0%", "-8%", "4%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <>
        <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-blue-950/20 via-black to-emerald-900/15" />
        {gradientBlobs}
      </>
    );
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
      />
      {gradientBlobs}
    </>
  );
}
