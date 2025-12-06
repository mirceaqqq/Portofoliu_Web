"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useLayoutEffect } from "react";

import Projects from "./Projects";
import About from "./About";
import Experience from "./Experience";
import ContactTerminal from "./ContactTerminal";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import CommandPalette from "./CommandPalette";
import Dock from "./Dock";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const resetTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // Remove any autofocus that could pull focus down the page
      document.querySelectorAll("[autofocus]").forEach((el) => {
        el.removeAttribute("autofocus");
      });
      (document.activeElement as HTMLElement | null)?.blur?.();
    };

    window.history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    // Hammer the scroll position a few times to defeat any late focus/anchor jumps
    resetTop();
    requestAnimationFrame(resetTop);
    setTimeout(resetTop, 50);
    setTimeout(resetTop, 200);
    setTimeout(resetTop, 500);

    const onShow = () => resetTop();
    window.addEventListener("pageshow", onShow);
    window.onbeforeunload = resetTop;

    return () => {
      window.removeEventListener("pageshow", onShow);
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
  };


  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="loader" onComplete={handlePreloaderComplete} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-black min-h-screen w-full text-white md:cursor-none"
          >
            {/* Navigation & quick tools */}
            <CommandPalette />
            <Dock />

            {/* Power user hint */}
            <div className="fixed top-5 right-5 z-50 hidden md:block opacity-30 hover:opacity-100 transition-opacity text-[10px] text-gray-500 font-mono px-2 py-1 rounded bg-black/50 border border-white/10">
                CMD/CTRL + K
            </div>

            {/* Animated background (noise + gradients) */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"
                  animate={{ x: mousePosition.x / 50, y: mousePosition.y / 50 }}
                />
                <div 
                  className="absolute w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]"
                  style={{ left: mousePosition.x - 300, top: mousePosition.y - 300 }}
                />
            </div>

            {/* Hero */}
            <main id="home" className="relative z-10 h-screen w-full flex flex-col items-center justify-center border-b border-white/5">
              <div className="text-center px-4">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                  className="inline-block mb-6 px-4 py-1 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-sm"
                >
                  <span className="text-green-400 text-xs font-mono tracking-widest animate-pulse">● CLEARANCE: GRANTED</span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-[7rem] font-bold tracking-tighter leading-tight md:leading-none mix-blend-difference mb-6">
                  SECURITY &
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                    SOFTWARE ENGINEER
                  </span>
                </h1>
                
 <motion.p 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={{ delay: 1 }}
  className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-mono leading-relaxed"
>
  Building secure and intelligent systems that connect performance, resilience, and research. 
  <br />
  <span className="text-white">Computer Engineering student</span> passionate about <span className="text-green-400">security, AI, and software innovation</span>. 
  <br />
</motion.p>

              </div>
              
              <motion.div 
                  className="absolute bottom-10 flex flex-col items-center gap-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
              >
                  <span className="text-[10px] uppercase tracking-widest text-gray-700">Explore</span>
                  <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-gray-500"></div>
              </motion.div>
            </main>

            {/* Main content */}
            <div className="relative z-10 space-y-32 pb-40">
              <div id="about"><About /></div>
              <div id="experience"><Experience /></div>
              <div id="projects"><Projects /></div>
              <div id="contact"><ContactTerminal /></div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 py-10 border-t border-white/10 text-center mb-20">
                <p className="text-gray-600 text-sm font-mono">
                   sudo reboot system © 2025 -- Mircea Ivescu
                </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
