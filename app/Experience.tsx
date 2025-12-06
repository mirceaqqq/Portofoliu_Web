"use client";

import { motion } from "framer-motion";
import { Trophy, ShieldAlert, GraduationCap, Target } from "lucide-react";

const milestones = [
  {
    year: "2024 - 2025",
    title: "Active CTF Player (National)",
    description: "Regular placements on national leaderboards. Comfortable solving under pressure with small, focused teams.",
    subItems: ["USV CTF 2024 & 2025", "CyberMan 2024", "Cronos CTF"],
    icon: Trophy,
    color: "text-yellow-400",
    tech: ["CTF", "Pwn", "Crypto","Web","OSINT","Forensics"]
  },
  {
    year: "2024",
    title: "CyDEx 2024 & CyberMan 2023",
    description: "Large-scale blue-team exercises with live incident triage.",
    icon: ShieldAlert,
    color: "text-red-400",
    tech: ["Blue Team", "Incident Response", "Network Defense","TCP/IP","Kernel"]
  },
  {
    year: "2022 - Present",
    title: "Military Technical Academy",
    description: "B.Eng. Computer Science (expected 2026).",
    icon: GraduationCap,
    color: "text-green-400",
    tech: ["Engineering", "Discipline"]
  },
  {
    year: "2023-Present",
    title: "Coding Teacher Algorithmics",
    description: "Teaching programming fundamentals and problem-solving to high-school students and kids in Python and Scratch.",
    icon: Target,
    color: "text-purple-400",
    tech: ["Python", "Problem Solving", "Teaching"]
  }
];

export default function Experience() {
  return (
    <section className="py-24 md:py-32 px-4 max-w-6xl mx-auto">
      <div className="mb-14 md:mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">Mission Timeline</h2>
        <p className="text-gray-400 text-sm md:text-base">Education and field experience across cybersecurity competitions and defense exercises.</p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-green-500/0 via-green-500/50 to-green-500/0"></div>

        <div className="space-y-14 md:space-y-24">
          {milestones.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden md:block w-5/12" />

              <div className="w-12 h-12 bg-black border border-gray-700 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,255,0,0.2)] mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>

              <div className="w-full md:w-5/12 md:pl-8">
                <div className="bg-[#0f0f0f] border border-white/10 p-5 md:p-6 rounded-2xl hover:border-green-500/30 transition-colors relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 blur transition duration-500"></div>
                  
                  <div className="relative bg-[#0f0f0f] rounded-xl p-2">
                    <span className="text-xs font-mono text-gray-500 mb-2 block">{item.year}</span>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    {item.subItems && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {item.subItems.map(sub => (
                                <span key={sub} className="text-xs text-white bg-green-500/10 px-2 py-1 rounded border border-green-500/20">{sub}</span>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded border border-white/5 text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
