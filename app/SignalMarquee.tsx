"use client";

import { motion } from "framer-motion";

const signals = [
  "ARCH//KERNEL 6.X",
  "REVERSE ENGINEERING",
  "DFIR",
  "CRYPTOGRAPHY",
  "PWN // CTF",
  "AI + SECURITY",
  "RESILIENCE",
  "TRUSTED SYSTEMS",
  "LOW LATENCY"
];

export default function SignalMarquee() {
  return (
    <div className="relative mt-10 md:mt-0 mb-10 md:mb-0">
      <div className="overflow-hidden rounded-full border border-white/10 bg-black/60 backdrop-blur-sm shadow-inner shadow-green-500/10">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" aria-hidden />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" aria-hidden />
        <motion.div
          className="flex gap-6 whitespace-nowrap px-6 py-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-green-200"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          {Array.from({ length: 2 }).map((_, loopIdx) => (
            <div key={loopIdx} className="flex gap-6">
              {signals.map((item) => (
                <span key={`${loopIdx}-${item}`} className="flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-green-500/60" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
