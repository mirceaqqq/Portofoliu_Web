"use client"; // Obligatoriu pentru că folosim animații și hook-uri

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efect simplu de urmărire a mouse-ului pentru background
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  // Varianta pentru animația textului (apare de jos în sus)
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Întârziere între elemente
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96] // Efect cinematic
      }
    })
  };

  return (
    <main className="relative h-screen w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background subtil care se mișcă după mouse */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/10 pointer-events-none"
        animate={{
          x: mousePosition.x / 50,
          y: mousePosition.y / 50
        }}
      />

      {/* Cercul strălucitor din spatele textului (Glow effect) */}
      <div 
        className="absolute w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
      />

      <div className="z-10 text-center px-4">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="text-gray-400 mb-4 tracking-[0.3em] uppercase text-sm font-bold"
        >
          Portofoliu &bull; 2025
        </motion.p>

        {/* Titlu animat pe bucăți */}
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-tight">
          <motion.span custom={1} variants={textVariant} initial="hidden" animate="visible" className="block">
            CREATIVE
          </motion.span>
          <motion.span custom={2} variants={textVariant} initial="hidden" animate="visible" className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            ENGINEER
          </motion.span>
        </h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12"
        >
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300">
            Vezi Proiectele Mele
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </motion.div>

    </main>
  );
}