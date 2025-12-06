"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

export default function StatusHUD() {
  const [uptime, setUptime] = useState("0s");
  const [buildHash] = useState<string>(
    process.env.NEXT_PUBLIC_BUILD_ID?.toUpperCase() || "DEV-LOCAL"
  );

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setUptime(formatDuration(Date.now() - start)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-3 left-3 z-40 hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/70 backdrop-blur-lg text-[10px] font-mono text-gray-200 shadow-lg"
    >
      <span className="relative flex items-center gap-1 text-green-400">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        LIVE
      </span>
      <span className="h-3 w-[1px] bg-white/10" />
      <span className="text-gray-400">Uptime {uptime}</span>
      <span className="h-3 w-[1px] bg-white/10" />
      <span className="text-gray-500">Build #{buildHash}</span>
    </motion.div>
  );
}
