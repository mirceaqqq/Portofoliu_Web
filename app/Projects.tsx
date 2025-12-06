"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Lock, Cpu } from "lucide-react"; 

const projects = [
  {
    title: "Static Analyzer and Antivirus",
    description: "Static code analyzer and signature-based anti-virus for PE. Features include control-flow graph generation, string extraction, and malware signature matching.",
    tags: ["Python", "Assembly", "Reverse", "Malware analysis"],
    color: "from-slate-950 to-gray-900",
    githubLink: "https://github.com/mirceaqqq/pe_static_analyzer", 
    liveLink: "#",
    image: "/projects/pe.jpg"
  },
  {
    title: "Remote Administration Tool",
    description: "Lightweight RAT for Linux systems with encrypted command-and-control communication, file transfer, and process management capabilities.",
    tags: ["C", "OS", "Linux", "Socket Programming"],
    color: "from-emerald-950 to-teal-950",
    githubLink: "https://github.com/mirceaqqq/Remote_Administration_Tool_PSO",
    liveLink: "#",
    image: "/projects/rat.png"
  },
  {
    title: "AcademEase - Student Management System",
    description: "Desktop application for managing student records, courses, and grades. Built with a focus on usability and data integrity.",
    tags: ["C++", "Qt", "SQL", "GUI"],
    color: "from-blue-950 to-indigo-900",
    githubLink: "https://github.com/mirceaqqq/ProiectPOO_AcademEase_ATM",
    liveLink: "#",
    image: "/projects/academ.png"
  },
  {
    title: "HTB Machines",
    description: "Write-ups and walkthroughs for various Hack The Box machines, focusing on privilege escalation, web exploitation, and network vulnerabilities.",
    tags: ["Pentesting", "Kali", "Security", "Scripting"],
    color: "from-purple-950 to-violet-900",
    githubLink: undefined,
    liveLink: "#",
    image: "/projects/htb.png"
  }
];

const Card = ({ i, title, description, tags, color, githubLink, liveLink, image, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });


  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }} 
        className={`flex flex-col relative -top-[25%] h-[500px] w-[1000px] rounded-3xl p-10 origin-top border border-white/10 bg-gradient-to-br ${color} shadow-2xl overflow-hidden`}
      >
        <div className="flex h-full gap-10 relative z-10">
          <div className="w-[40%] flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-white">{title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-blue-200 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors text-sm font-bold border border-white/10">
                    <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          </div>

          <div className="relative w-[60%] h-full flex items-center justify-center">
            <motion.div 
              className="inline-flex items-center justify-center bg-gradient-to-br from-black/60 via-black/40 to-white/5 p-4 rounded-2xl shadow-2xl border border-white/10"
              style={{ scale: imageScale }}
            >
               {image ? (
                 <img 
                   src={image} 
                   alt={title} 
                   className="max-h-[360px] max-w-full object-contain rounded-xl ring-1 ring-white/15 bg-black/60" 
                 />
               ) : (
                 <div className="text-center p-10">
                     <div className="mb-4 flex justify-center"><Cpu className="w-16 h-16 text-gray-700" /></div>
                     <div className="text-gray-500 font-mono text-sm">SECURE_ARCHIVE_FILE_{i+1}</div>
                 </div>
               )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={container} className="relative mt-[20vh] mb-[50vh] px-4">
        <div className="mb-32 px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Selected academic research and projects builds focused on system security, reliability, and development.
            </p>
        </div>
        
        <div className="max-w-[1200px] mx-auto">
            {projects.map((project, i) => {
                const targetScale = 1 - ( (projects.length - i) * 0.05);
                return (
                    <Card 
                      key={i} 
                      i={i} 
                      {...project} 
                      progress={scrollYProgress} 
                      range={[i * 0.25, 1]} 
                      targetScale={targetScale} 
                    />
                );
            })}
        </div>
    </div>
  );
}
