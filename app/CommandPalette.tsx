"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, User, Code, Mail, FileText, Github, Linkedin } from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const commands = [
    { id: "home", label: "Go Home", icon: Home, action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { id: "about", label: "Go to About", icon: User, action: () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "experience", label: "Go to Experience", icon: FileText, action: () => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "projects", label: "Go to Projects", icon: Code, action: () => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "contact", label: "Go to Contact", icon: Mail, action: () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }) },
    { id: "github", label: "Open GitHub", icon: Github, action: () => window.open("https://github.com/mirceaqq", "_blank") },
    { id: "linkedin", label: "Open LinkedIn", icon: Linkedin, action: () => window.open("https://www.linkedin.com/in/mirceaqq", "_blank") },
    { id: "cv", label: "Request CV (email)", icon: FileText, action: () => window.open("mailto:mircea.ivescu@proton.me?subject=CV%20request", "_self") },
    { id: "email", label: "Copy Email", icon: Mail, action: () => { navigator.clipboard.writeText("mircea.ivescu@proton.me"); alert("Email copied to clipboard."); } },
  ];

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Listen for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center px-4 border-b border-white/10">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Type a command or search..."
              className="w-full py-4 bg-transparent text-white outline-none placeholder-gray-600 font-mono"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <div className="text-xs text-gray-600 border border-white/10 px-2 py-1 rounded">ESC</div>
          </div>

          {/* Results */}
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => { cmd.action(); setIsOpen(false); }}
                  className="w-full flex items-center px-3 py-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                >
                  <cmd.icon className="w-5 h-5 text-gray-500 mr-3 group-hover:text-white transition-colors" />
                  <span className="text-gray-300 group-hover:text-white transition-colors">{cmd.label}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">No commands found.</div>
            )}
          </div>
          
          <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider">
             <span>Arch Portfolio v2.0</span>
             <span>Use arrows to navigate</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
