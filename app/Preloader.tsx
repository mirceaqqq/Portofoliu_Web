"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const fullText = "BOOTING PORTFOLIO OS... LOADING SECURE MODULES... READY";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500); // Small pause after the text finishes
      }
    }, 40); // Typing speed

    return () => clearInterval(interval);
  }, [fullText, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-green-500 font-mono text-xl"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div>
        <span className="mr-2">root@arch:~$</span>
        {text}
        <span className="animate-pulse">_</span>
      </div>
    </motion.div>
  );
}
