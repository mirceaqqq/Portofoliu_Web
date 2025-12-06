"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useLayoutEffect } from "react";
import { Github, Linkedin } from "lucide-react";

import Projects from "./Projects";
import About from "./About";
import Experience from "./Experience";
import ContactTerminal from "./ContactTerminal";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import CommandPalette from "./CommandPalette";
import Dock from "./Dock";
import BackgroundGrid from "./BackgroundGrid";
// Signal marquee removed for a cleaner intro

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

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
            <div className="fixed top-4 right-4 z-50 px-3 py-2 text-xs font-semibold text-white bg-white/10 border border-white/30 rounded-full shadow-lg backdrop-blur hover:bg-white/20 transition">
              CMD/CTRL + K
            </div>

            {/* Animated background */}
            <BackgroundGrid />
            <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Hero */}
            <main id="home" className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center border-b border-white/5">
              <div className="text-center px-4">
                <motion.div 
                  initial={prefersReducedMotion ? { opacity: 0 } : { scale: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0.4 : 0.6, ease: "easeOut" }}
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
                  transition={{ delay: prefersReducedMotion ? 0.4 : 1 }}
                  className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl mx-auto font-mono leading-relaxed"
                >
                  Building secure and intelligent systems that connect performance, resilience, and research. 
                  <br />
                  <span className="text-white">Computer Engineering student</span> passionate about <span className="text-green-400">security, AI, and software innovation</span>. 
                  <br />
                </motion.p>

              </div>
              {!prefersReducedMotion && (
                <motion.div 
                    className="absolute bottom-10 flex flex-col items-center gap-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                >
                    <span className="text-[10px] uppercase tracking-widest text-gray-700">Explore</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-gray-500"></div>
                </motion.div>
              )}
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
                <div className="mx-auto mb-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" />
                <p className="text-gray-600 text-sm font-mono">
                   sudo reboot system © 2025 -- Mircea Ivescu
                </p>
                <div className="mt-3 flex items-center justify-center gap-4 text-gray-500">
                  <a href="https://github.com/mirceaqqq" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:text-white hover:bg-white/5 transition">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/mircea-ivescu-923373225/" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:text-white hover:bg-white/5 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
