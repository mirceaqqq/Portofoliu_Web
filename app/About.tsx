"use client";

import { motion } from "framer-motion";

const BentoItem = ({ children, className, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-white mb-4">Profile</h2>
        <p className="text-gray-400">Technical capabilities and background check.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[600px]">
      
        {/* Portrait and intro */}
        <BentoItem className="md:col-span-2 md:row-span-2 flex flex-col justify-between overflow-hidden relative" delay={0.1}>
          <div className="flex gap-6 items-start z-10">
             {/* Update /public/mircea.jpg to swap the portrait */}
             <div className="w-24 h-24 min-w-[6rem] rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-lg bg-gray-800">
                <img src="/mircea.jpg" alt="Ivescu Mircea" className="w-full h-full object-cover" />
             </div>
             
             <div>
                <h3 className="text-2xl font-bold text-white mb-1">Ivescu Mircea</h3>
                <div className="text-xs font-mono text-green-400 mb-3">Computer Engineering Cadet @ MTA "Ferdinand I"</div>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Pairing military-grade discipline with deep systems knowledge. I design reliable software, break it to map the failure modes, and harden it again. 
                  Experienced in <strong>Reverse Engineering</strong>, <strong>OS Design</strong>, and <strong>Cryptography</strong>.
                </p>
             </div>
          </div>
          
          <div className="mt-4 flex gap-4 z-10 pt-4 border-t border-white/10">
             <div>
                <div className="text-xl font-bold text-white">4th</div>
                <div className="text-[10px] text-gray-500 uppercase">Year Student</div>
             </div>
             <div>
                <div className="text-xl font-bold text-green-400">Top 10%</div>
                <div className="text-[10px] text-gray-500 uppercase">CTF Rank</div>
             </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] pointer-events-none"></div>
        </BentoItem>

        {/* Low-level & security */}
        <BentoItem className="md:col-span-1 md:row-span-1" delay={0.2}>
          <h4 className="text-lg font-bold text-gray-200 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Security Ops
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Kali Linux", "Reverse Engineering", "Assembly (x86/64)","Digital Forensics", "Cryptography", "Network Forensics", "Wireshark"].map(t => (
              <span key={t} className="bg-red-900/20 text-red-200 text-[10px] px-2 py-1 rounded border border-red-500/20">{t}</span>
            ))}
          </div>
        </BentoItem>

        {/* Core engineering */}
        <BentoItem className="md:col-span-1 md:row-span-1" delay={0.3}>
          <h4 className="text-lg font-bold text-gray-200 mb-2">Core Engineering</h4>
           <div className="flex flex-wrap gap-2">
            {["C/C++", "Python", "Java", "OS Architecture", "Microprocessors", "SQL","C#/.NET"].map(t => (
              <span key={t} className="bg-blue-900/20 text-blue-200 text-[10px] px-2 py-1 rounded border border-blue-500/20">{t}</span>
            ))}
          </div>
        </BentoItem>

        {/* Full stack / modern web */}
        <BentoItem className="md:col-span-2 md:row-span-1 flex flex-col justify-center" delay={0.4}>
           <h4 className="text-lg font-bold text-gray-200 mb-2">Modern Stack</h4>
           <p className="text-gray-500 text-xs mb-2">Building tools and dashboards that keep security teams in the loop.</p>
           <div className="flex flex-wrap gap-2">
             {["React", "Next.js", "Tailwind CSS", "Data Science (AI)", "Git", "Linux Automation"].map(t => (
               <span key={t} className="bg-white/10 text-white text-xs px-2 py-1 rounded border border-white/10">{t}</span>
             ))}
           </div>
        </BentoItem>
      </div>
    </section>
  );
}
