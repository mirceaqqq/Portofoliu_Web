"use client";

import { motion } from "framer-motion";
import { Home, User, Code, Mail, Github, Linkedin, FileText } from "lucide-react";

export default function Dock() {
  const scrollTo = (id: string) => {
    if(id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const icons = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "experience", icon: FileText, label: "Timeline" },
    { id: "projects", icon: Code, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
      >
        {icons.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="relative group p-3 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
            
            {/* Tooltip mic deasupra */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}

        <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

        {/* Link-uri Externe */}
        <a href="https://github.com/mirceaqqq" target="_blank" rel="noreferrer" className="p-3 rounded-full hover:bg-white/10 transition-all hover:scale-110">
            <Github className="w-5 h-5 text-gray-400 hover:text-white" aria-label="GitHub profile" />
        </a>
        <a href="https://www.linkedin.com/in/mircea-ivescu-923373225/" target="_blank" rel="noreferrer" className="p-3 rounded-full hover:bg-white/10 transition-all hover:scale-110">
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" aria-label="LinkedIn profile" />
        </a>

      </motion.div>
    </div>
  );
}
