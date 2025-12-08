"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Flag,
  ListChecks,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Tag,
  Target,
} from "lucide-react";

import { useParams } from "next/navigation";
import type { WriteUp } from "../writeups";

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

export default function WriteUpDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [writeup, setWriteup] = useState<WriteUp | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        const res = await fetch(`/api/writeups/${slug}`);
        if (res.ok) {
          const json = await res.json();
          setWriteup(json.data as WriteUp);
        } else {
          const listRes = await fetch("/api/writeups");
          const listJson = await listRes.json();
          const found = (listJson.data as WriteUp[]).find((w) => w.slug === slug);
          if (found) setWriteup(found);
        }
      } catch (err) {
        console.error("Nu am putut incarca writeup-ul", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading write-up...</div>
      </div>
    );
  }

  if (!writeup) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-lg font-semibold">Write-up not found</div>
          <p className="text-gray-500 text-sm">Verifica slug-ul sau reintoarce-te la lista de articole.</p>
          <div className="flex justify-center gap-3">
            <Link href="/blog" className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">
              Inapoi la blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cover = writeup.cover;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_20%)]" />

      <div className="relative max-w-5xl mx-auto px-4 pb-20">
        <header className="pt-10 flex items-center justify-between gap-4">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Inapoi la blog
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span>Write-up detaliat</span>
          </div>
        </header>

        <section className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f0f0f] via-[#0b1410] to-[#0f0f0f] backdrop-blur shadow-2xl overflow-hidden">
          <div className="relative h-56 md:h-72 w-full">
            {cover ? (
              <Image src={cover} alt={writeup.title} fill className="object-cover" sizes="(min-width: 768px) 900px, 100vw" priority />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${badgeByDifficulty[writeup.difficulty] ?? "bg-white/10"}`}>
                {writeup.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 border border-white/15">
                {writeup.type}
              </span>
              {writeup.os && (
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-100">
                  {writeup.os}
                </span>
              )}
              <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${badgeByStatus[writeup.status] ?? "bg-white/10"}`}>
                {writeup.status}
              </span>
              {writeup.timeToRoot && (
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 border border-white/10 text-gray-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {writeup.timeToRoot}
                </span>
              )}
            </div>
          </div>

          <div className="p-7 md:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
                <ListChecks className="w-3 h-3" />
                {writeup.publishedAt
                  ? `Published ${formatDate(writeup.publishedAt)}`
                  : writeup.release
                    ? `Log ${formatDate(writeup.release)}`
                    : writeup.updatedAt
                      ? `Updated ${formatDate(writeup.updatedAt)}`
                      : "Draft"}
              </span>
              {writeup.updatedAt && writeup.publishedAt && writeup.updatedAt !== writeup.publishedAt && (
                <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Updated {formatDate(writeup.updatedAt)}</span>
              )}
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{writeup.title}</h1>
              <p className="mt-1 text-sm text-green-300 font-mono">{writeup.target}</p>
            </div>

            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{writeup.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <div className="text-gray-400">Skills</div>
                <div className="font-semibold text-white">{writeup.skills.join(", ")}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10 col-span-1 sm:col-span-2">
                <div className="text-gray-400">Tags</div>
                <div className="text-gray-200 flex flex-wrap gap-1 text-xs mt-1">
                  {writeup.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded bg-white/10 border border-white/10 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {writeup.gallery && writeup.gallery.length > 0 && (
          <section className="mt-6 grid sm:grid-cols-2 gap-3">
            {writeup.gallery.map((src) => (
              <div key={src} className="relative w-full h-52 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <Image src={src} alt={writeup.title} fill className="object-cover" sizes="(min-width: 768px) 600px, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ))}
          </section>
        )}

        <section className="mt-6 grid md:grid-cols-2 gap-4">
          {writeup.highlights.map((item) => (
            <div key={item} className="p-4 rounded-2xl border border-white/10 bg-black/30 flex items-start gap-3 text-sm text-gray-200">
              <ShieldCheck className="w-4 h-4 text-green-300 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </section>

        <div className="mt-10 space-y-6">
          {writeup.sections.map((section) => (
            <article key={section.title} className="p-6 rounded-3xl border border-white/10 bg-white/5 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                <div className="text-[11px] text-gray-500 uppercase tracking-wide">Pas</div>
              </div>
              <p className="mt-2 text-gray-300 leading-relaxed">{section.summary}</p>

              {section.findings && section.findings.length > 0 && (
                <div className="mt-4 space-y-2">
                  {section.findings.map((finding) => (
                    <div key={finding} className="flex items-start gap-2 text-sm text-gray-200">
                      <Target className="w-4 h-4 text-blue-300 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.commands && section.commands.length > 0 && (
                <div className="mt-4 grid gap-3">
                  {section.commands.map((cmd, idx) => (
                    <div key={`${cmd.label ?? "cmd"}-${idx}`} className="p-3 rounded-2xl bg-black/40 border border-white/10">
                      <div className="text-xs text-gray-500 flex items-center gap-2 mb-2">
                        <NotebookPen className="w-4 h-4" />
                        {cmd.label ?? "Command"}
                      </div>
                      <pre className="text-sm text-gray-100 whitespace-pre-wrap leading-relaxed">
{cmd.snippet}
                      </pre>
                    </div>
                  ))}
                </div>
              )}

              {section.loot && section.loot.length > 0 && (
                <div className="mt-4 text-sm text-gray-200 flex flex-col gap-1">
                  {section.loot.map((loot) => (
                    <div key={loot} className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-orange-300" />
                      <span>{loot}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.takeaways && section.takeaways.length > 0 && (
                <div className="mt-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <ListChecks className="w-4 h-4" />
                    Lessons learned
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {section.takeaways.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>

        {(writeup.loot || writeup.external || writeup.notes) && (
          <section className="mt-10 grid md:grid-cols-3 gap-4">
            {writeup.loot && (
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Flag className="w-4 h-4 text-orange-300" />
                  Loot & flags
                </div>
                <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                  {writeup.loot.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {writeup.external && (
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <ExternalLink className="w-4 h-4 text-blue-300" />
                  Link-uri
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  {writeup.external.map((link) => (
                    <Link key={link.href} href={link.href} target="_blank" className="text-blue-200 hover:text-blue-100 underline">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {writeup.notes && (
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <NotebookPen className="w-4 h-4 text-green-300" />
                  Notite rapide
                </div>
                <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{writeup.notes}</p>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}
