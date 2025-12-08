"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ListChecks, NotebookPen, Search, ShieldCheck, Sparkles, Tag, Target } from "lucide-react";

import { writeups as staticWriteups } from "./writeups";

const badgeByDifficulty: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-300 border border-green-500/30",
  Medium: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30",
  Hard: "bg-orange-500/10 text-orange-200 border border-orange-500/30",
  Insane: "bg-red-500/10 text-red-200 border border-red-500/30",
};

const badgeByStatus: Record<string, string> = {
  Rooted: "bg-emerald-600/15 text-emerald-200 border border-emerald-500/40",
  "In progress": "bg-blue-600/15 text-blue-200 border border-blue-500/40",
  Draft: "bg-gray-600/20 text-gray-200 border border-gray-500/40",
};

const formatDate = (value?: string) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const filteredAndSorted = (
  data: typeof staticWriteups,
  search: string,
  typeFilter: "All" | "Machine" | "Challenge",
  difficulty: "All" | string,
) => {
  const normalized = search.toLowerCase();

  const dateValue = (val?: string) => {
    if (!val) return 0;
    const ts = new Date(val).getTime();
    return Number.isNaN(ts) ? 0 : ts;
  };

  const sorted = [...data].sort((a, b) => {
    const aDate = dateValue(a.publishedAt || a.release || a.updatedAt || a.createdAt);
    const bDate = dateValue(b.publishedAt || b.release || b.updatedAt || b.createdAt);
    return bDate - aDate;
  });

  return sorted.filter((item) => {
    const matchesSearch =
      !normalized ||
      item.title.toLowerCase().includes(normalized) ||
      item.target.toLowerCase().includes(normalized) ||
      item.tags.some((t) => t.toLowerCase().includes(normalized)) ||
      item.summary.toLowerCase().includes(normalized);

    const matchesType = typeFilter === "All" || item.type === typeFilter;
    const matchesDifficulty = difficulty === "All" || item.difficulty === difficulty;

    return matchesSearch && matchesType && matchesDifficulty;
  });
};

export default function BlogPage() {
  const [data, setData] = useState(staticWriteups);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Machine" | "Challenge">("All");
  const [difficultyFilter, setDifficultyFilter] = useState<"All" | string>("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/writeups");
        const json = await res.json();
        if (json?.data) setData(json.data);
      } catch (err) {
        console.error("Nu am putut incarca writeups dinamice", err);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => filteredAndSorted(data, search, typeFilter, difficultyFilter), [data, search, typeFilter, difficultyFilter]);

  const totalWriteups = data.length;
  const machineCount = data.filter((w) => w.type === "Machine").length;
  const challengeCount = data.filter((w) => w.type === "Challenge").length;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.1),transparent_20%)]" />

      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <header className="pt-10 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Back to main site
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span>HackTheBox write-ups hub</span>
          </div>
        </header>

        <section className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-200 text-xs font-mono">
                <NotebookPen className="w-4 h-4" />
                Write-ups board
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                Blog  
              </h1>
              <p className="mt-3 text-gray-300 max-w-2xl">
                Notite, payloaduri si flaguri intr-un singur loc             </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-gray-400">Total</div>
                <div className="text-2xl font-bold">{totalWriteups}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-gray-400">Machines</div>
                <div className="text-2xl font-bold text-green-300">{machineCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-gray-400">Challenges</div>
                <div className="text-2xl font-bold text-blue-300">{challengeCount}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl bg-black/40 border border-white/10">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cauta dupa masina, tag, vulnerabilitate..."
                className="w-full bg-transparent outline-none text-sm placeholder:text-gray-600"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Machine", "Challenge"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTypeFilter(item as "All" | "Machine" | "Challenge")}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                    typeFilter === item ? "border-white/50 bg-white/10" : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  {item}
                </button>
              ))}

              {["All", "Easy", "Medium", "Hard", "Insane"].map((item) => (
                <button
                  key={item}
                  onClick={() => setDifficultyFilter(item)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                    difficultyFilter === item ? "border-white/50 bg-white/10" : "border-white/10 text-gray-400 hover:border-white/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-6">
          {filtered.map((item) => (
            <motion.article
              key={item.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f0f0f] via-[#0a0a0a] to-[#0f1f1a] backdrop-blur shadow-2xl"
            >
              <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              <div className="relative p-6 md:p-8 flex flex-col gap-5 md:flex-row md:items-center">
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${badgeByDifficulty[item.difficulty] ?? "bg-white/10"}`}>
                      {item.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 border border-white/15">
                      {item.type}
                    </span>
                    {item.os && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-100">
                        {item.os}
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${badgeByStatus[item.status] ?? "bg-white/10"}`}>
                      {item.status}
                    </span>
                    {item.timeToRoot && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/40 border border-white/10 text-gray-200 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timeToRoot}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1">
                      <ListChecks className="w-3 h-3" />
                      {item.publishedAt
                        ? `Published ${formatDate(item.publishedAt)}`
                        : item.release
                          ? `Log ${formatDate(item.release)}`
                          : item.updatedAt
                            ? `Updated ${formatDate(item.updatedAt)}`
                            : "Draft"}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{item.title}</h2>
                    <p className="mt-1 text-sm text-green-300 font-mono">{item.target}</p>
                    <p className="mt-3 text-gray-300 leading-relaxed max-w-3xl line-clamp-3">{item.summary}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
                    {item.highlights.slice(0, 3).map((highlight) => (
                      <div key={highlight} className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-white/5">
                        <ShieldCheck className="w-4 h-4 text-green-300 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-gray-200 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/blog/${item.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-100 text-sm font-semibold transition"
                    >
                      <Target className="w-4 h-4" />
                      Citeste write-up
                    </Link>
                    <Link
                      href={`/blog/${item.slug}#template`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition"
                    >
                      <NotebookPen className="w-4 h-4" />
                      Deschide structura
                    </Link>
                  </div>
                </div>

                <div className="relative w-full md:w-64 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-black/60 to-green-500/10 shadow-lg">
                  {item.cover ? (
                    <Image src={item.cover} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="256px" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-xs text-gray-500">Fara cover</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </motion.article>
          ))}

          {filtered.length === 0 && (
            <div className="p-10 text-center rounded-3xl border border-white/10 bg-black/30">
              <p className="text-gray-400">Niciun write-up publicat momentan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
