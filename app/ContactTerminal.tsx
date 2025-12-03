"use client";

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactTerminal() {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [history, setHistory] = useState([
    { type: "info", content: "Initializing secure connection..." },
    { type: "info", content: "Route locked: Mircea's inbox [encrypted]" },
    { type: "success", content: "To send a message, type: email <your_message>" },
    { type: "warning", content: "Example: email Let's build something secure together." },
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // EmailJS credentials
  const SERVICE_ID = "service_ioghxac";
  const TEMPLATE_ID = "template_x2tldoy";
  const PUBLIC_KEY = "kLCzTKUFnSVmwTUfw";

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim();
    const newHistory = [...history, { type: "command", content: `guest@portfolio:~$ ${command}` }];
    setHistory(newHistory);
    setInput("");

    if (command.startsWith("email ")) {
      const message = command.replace("email ", "");
      
      if (message.length < 5) {
        setHistory(prev => [...prev, { type: "error", content: "Error: Message too short. Add a sentence or two about what you need." }]);
        return;
      }

      setIsSending(true);
      setHistory(prev => [...prev, { type: "info", content: ">> Establishing secure connection..." }]);

      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          { message: message, from_name: "Guest User" },
          PUBLIC_KEY
        );
        setHistory(prev => [...prev, { type: "success", content: ">> [200 OK] Message sent. I will reply soon." }]);
      } catch (error) {
        setHistory(prev => [...prev, { type: "error", content: ">> [500 Error] Connection failed. Try again later." }]);
        console.error(error);
      } finally {
        setIsSending(false);
      }

    } else if (command === "clear") {
      setHistory([]);
    } else if (command === "help") {
      setHistory(prev => [...prev, { type: "info", content: "Commands: email <msg>, clear, help" }]);
    } else {
      setHistory(prev => [...prev, { type: "error", content: `zsh: command not found: ${command.split(' ')[0]}` }]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto" onClick={() => inputRef.current?.focus()}>
      <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm h-[400px] flex flex-col relative">
        {/* Loading overlay for sending */}
        {isSending && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 backdrop-blur-sm">
                <span className="text-green-500 animate-pulse">TRANSMITTING DATA...</span>
            </div>
        )}

        <div className="bg-[#1a1a1a] px-4 py-2 flex gap-2 border-b border-gray-800 items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-gray-500 text-xs">sh @ guest</span>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar cursor-text font-bold">
          {history.map((line, i) => (
            <div key={i} className={`mb-1 break-words ${
              line.type === "command" ? "text-white" : 
              line.type === "error" ? "text-red-500" : 
              line.type === "success" ? "text-green-400" : 
              line.type === "warning" ? "text-yellow-400" : "text-gray-500"
            }`}>
              {line.type === "command" ? "" : "➜ "} {line.content}
            </div>
          ))}

          <form onSubmit={handleCommand} className="flex items-center text-white mt-2">
             <span className="text-purple-500 mr-2">➜</span>
             <span className="text-blue-400 mr-2">~</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-gray-100 focus:ring-0 placeholder-gray-700"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}
