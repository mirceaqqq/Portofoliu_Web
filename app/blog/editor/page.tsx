"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Clipboard,
  Download,
  Eye,
  FilePlus,
  KeyRound,
  NotebookPen,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Tag,
  Wand2,
  X,
} from "lucide-react";

import { writeups, writeupTemplate, type WriteUp, type WriteUpSection } from "../writeups";

const STORAGE_KEY = "blog-editor-draft";
const AUTH_KEY = "blog-editor-auth";
const isProd = process.env.NODE_ENV === "production";
const PASS = process.env.NEXT_PUBLIC_BLOG_KEY || (isProd ? "" : "htb-admin");
const API_KEY = process.env.NEXT_PUBLIC_BLOG_KEY || (isProd ? "" : "htb-admin");

const emptyDraft = (): WriteUp => ({
  ...writeupTemplate,
  slug: `htb-${Date.now()}`,
  title: "",
  summary: "",
  highlights: [""],
  tags: [],
  skills: [],
  gallery: [],
  external: [],
  sections: [
    {
      title: "Recon",
      summary: "",
      commands: [],
      findings: [],
    },
  ],
});

const toCommaList = (list?: string[]) => (list && list.length > 0 ? list.join(", ") : "");
const parseCommaList = (value: string) =>
  value
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const parseNewLineList = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const parseExternalList = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|").map((p) => p.trim());
      return { label, href };
    });

const serializeDraft = (draft: WriteUp) => JSON.stringify(draft, null, 2);
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function BlogEditorPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState<WriteUp>(emptyDraft());
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [view, setView] = useState<"split" | "compose" | "preview">("split");
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [publishState, setPublishState] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [remoteWriteups, setRemoteWriteups] = useState<WriteUp[]>([]);
  const publishDisabled = !API_KEY;

  // Autosave
  useEffect(() => {
    if (!ready) return;
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft, ready]);

  const refreshRemote = useCallback(async () => {
    try {
      const res = await fetch("/api/writeups");
      const json = await res.json();
      if (json?.data) setRemoteWriteups(json.data as WriteUp[]);
    } catch (err) {
      console.error("Nu am putut incarca lista de writeups", err);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = async () => {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      setAuthed(savedAuth === "ok");
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        try {
          setDraft(JSON.parse(savedDraft) as WriteUp);
        } catch (err) {
          console.error("Cannot parse saved draft", err);
        }
      }
      await refreshRemote();
      setReady(true);
    };
    init();
  }, [refreshRemote]);

  const login = () => {
    if (!PASS) {
      alert("Editor indisponibil in productie. Ruleaza local si seteaza NEXT_PUBLIC_BLOG_KEY.");
      return;
    }
    if (password === PASS) {
      setAuthed(true);
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_KEY, "ok");
      }
    } else {
      alert("Parola gresita. Verifica NEXT_PUBLIC_BLOG_KEY sau incearca 'htb-admin'.");
    }
  };

  const loadTemplate = () => setDraft({ ...writeupTemplate, slug: `htb-${Date.now()}` });
  const loadExisting = (slug: string) => {
    const fromRemote = remoteWriteups.find((w) => w.slug === slug);
    if (fromRemote) {
      setDraft(fromRemote);
      return;
    }
    const found = writeups.find((w) => w.slug === slug);
    if (found) setDraft(found);
  };

  const resetDraft = () => {
    setDraft(emptyDraft());
    setCoverPreview(null);
  };

  const copyJson = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(serializeDraft(draft));
      alert("Copiat in clipboard. Lipeste in app/blog/writeups.ts.");
    } catch {
      alert("Nu am putut copia automat.");
    }
  }, [draft]);

  const copyTs = useCallback(async () => {
    const ts = `// Adauga in app/blog/writeups.ts\n${serializeDraft(draft)}`;
    try {
      await navigator.clipboard.writeText(ts);
      alert("Snippet TypeScript copiat.");
    } catch {
      alert("Nu am putut copia snippet-ul.");
    }
  }, [draft]);

  const downloadJson = useCallback(() => {
    const blob = new Blob([serializeDraft(draft)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${draft.slug || "writeup"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [draft]);

  const publishDraft = useCallback(async () => {
    if (!API_KEY) {
      setPublishState("error");
      alert("Publish dezactivat in productie. Ruleaza local si seteaza NEXT_PUBLIC_BLOG_KEY.");
      setTimeout(() => setPublishState("idle"), 1200);
      return;
    }
    setPublishState("saving");
    try {
      const now = new Date().toISOString();
      const prepared: WriteUp = {
        ...draft,
        release: draft.release || now.slice(0, 10),
        publishedAt: draft.publishedAt || now,
        updatedAt: now,
      };
      const res = await fetch("/api/writeups", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: serializeDraft(prepared),
      });
      if (!res.ok) throw new Error(await res.text());
      await refreshRemote();
      setPublishState("ok");
      setDraft(prepared);
    } catch (err) {
      console.error(err);
      setPublishState("error");
      alert("Nu am putut publica. Verifica serverul sau logs.");
    } finally {
      setTimeout(() => setPublishState("idle"), 1500);
    }
  }, [draft, refreshRemote]);

  const deleteDraft = useCallback(async () => {
    if (!draft.slug) return alert("Seteaza slug-ul inainte sa stergi.");
    const confirmDelete = window.confirm(`Stergi ${draft.slug}?`);
    if (!confirmDelete) return;
    try {
      await fetch(`/api/writeups/${draft.slug}`, {
        method: "DELETE",
        headers: { "x-api-key": API_KEY },
      });
      await refreshRemote();
      setDraft(emptyDraft());
    } catch (err) {
      console.error(err);
      alert("Nu am putut sterge entry-ul.");
    }
  }, [draft.slug, refreshRemote]);

  const updateSection = (idx: number, section: WriteUpSection) => {
    setDraft((prev) => {
      const sections = [...prev.sections];
      sections[idx] = section;
      return { ...prev, sections };
    });
  };

  const importJson = () => {
    try {
      const parsed = JSON.parse(importText) as WriteUp;
      setDraft(parsed);
      setShowImport(false);
      setImportText("");
    } catch {
      alert("Nu am putut parsa JSON-ul. Verifica formatul.");
    }
  };

  const addSection = () => {
    setDraft((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: `Sectiune ${prev.sections.length + 1}`,
          summary: "",
          commands: [],
          findings: [],
          loot: [],
          takeaways: [],
        },
      ],
    }));
  };

  const addDefaultSections = () => {
    setDraft((prev) => ({
      ...prev,
      sections: [
        {
          title: "Recon",
          summary: "Scans, enum si ce indicii ai gasit.",
          commands: [{ label: "nmap", snippet: "nmap -sC -sV -oN scans/box.nmap <ip>" }],
          findings: ["Porturi deschise", "Versiuni si vulnerabilitati"],
        },
        {
          title: "Initial access",
          summary: "Exploit / login / upload.",
          commands: [{ label: "exploit", snippet: "python3 exploit.py <ip>" }],
          findings: [],
        },
        {
          title: "Privilege escalation",
          summary: "Lin/Win privesc, sudo, capabilities, services.",
          commands: [{ label: "linux smart enum", snippet: "linpeas.sh" }],
          findings: [],
        },
        {
          title: "Post-exploitation",
          summary: "Loot, flags, persistenta, cleanup.",
          commands: [],
          loot: [],
          findings: [],
        },
      ],
    }));
  };

  const moveSection = (idx: number, dir: "up" | "down") => {
    setDraft((prev) => {
      const sections = [...prev.sections];
      const targetIdx = dir === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= sections.length) return prev;
      [sections[idx], sections[targetIdx]] = [sections[targetIdx], sections[idx]];
      return { ...prev, sections };
    });
  };

  const removeSection = (idx: number) => {
    setDraft((prev) => ({ ...prev, sections: prev.sections.filter((_, i) => i !== idx) }));
  };

  const addCommandToSection = (idx: number) => {
    const current = draft.sections[idx];
    const commands = current.commands ? [...current.commands] : [];
    commands.push({ label: "", snippet: "" });
    updateSection(idx, { ...current, commands });
  };

  const updateDraftField = <K extends keyof WriteUp>(key: K, value: WriteUp[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const jsonPreview = useMemo(() => serializeDraft(draft), [draft]);
  const formatSaved = `Salvat ${new Date().toLocaleTimeString()}`;

  // Keyboard helpers
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        downloadJson();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        copyJson();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [copyJson, downloadJson]);

  if (!authed) {
    if (!ready) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-sm text-gray-400">Se incarca editorul...</div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <KeyRound className="w-4 h-4" />
            Login editor
          </div>
          <h1 className="text-2xl font-bold mb-4">Admin Blog</h1>
          <p className="text-gray-400 text-sm mb-4">Seteaza parola in <code className="bg-black/40 px-2 py-1 rounded border border-white/10">NEXT_PUBLIC_BLOG_KEY</code> (fallback: <span className="text-white">htb-admin</span>).</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parola"
            className="w-full px-3 py-3 rounded-lg bg-black/50 border border-white/10 outline-none focus:border-green-500"
          />
          <button
            onClick={login}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500/80 text-black font-semibold hover:bg-green-400"
          >
            <BadgeCheck className="w-4 h-4" />
            Intra in editor
          </button>
          <Link href="/blog" className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Inapoi la blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.1),transparent_20%)]" />

      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <header className="pt-8 flex items-center justify-between gap-3">
          <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-4 h-4 text-green-400" />
            Editor HackTheBox
          </div>
        </header>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <span className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-200 flex items-center gap-1">
            <BadgeCheck className="w-3 h-3" />
            {formatSaved}
          </span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Cmd/Ctrl + Shift + C = Copy JSON</span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Cmd/Ctrl + S = Download JSON</span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setView("compose")}
              className={`px-3 py-1 rounded-lg border text-white text-xs ${view === "compose" ? "border-white/60 bg-white/10" : "border-white/10 bg-black/30"}`}
            >
              Compose
            </button>
            <button
              onClick={() => setView("split")}
              className={`px-3 py-1 rounded-lg border text-white text-xs ${view === "split" ? "border-white/60 bg-white/10" : "border-white/10 bg-black/30"}`}
            >
              Split
            </button>
            <button
              onClick={() => setView("preview")}
              className={`px-3 py-1 rounded-lg border text-white text-xs ${view === "preview" ? "border-white/60 bg-white/10" : "border-white/10 bg-black/30"}`}
            >
              Preview
            </button>
          </div>
        </div>

        <section className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-200 text-xs font-mono inline-flex items-center gap-2">
              <NotebookPen className="w-4 h-4" />
              Live editor
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Paste JSON pentru import rapid</span>
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">Copy/Download = snippet gata de lipit</span>
            </div>
            <div className="text-xs text-gray-400">Autosave in localStorage + copy/export instant</div>
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold">Scrie un write-up nou</h1>
          <p className="mt-2 text-gray-300 text-sm max-w-2xl">
            Completeaza campurile, adauga sectiuni si comenzi. Copiaza JSON-ul si lipeste-l in <code className="bg-black/40 px-2 py-1 rounded border border-white/10">app/blog/writeups.ts</code>. Pentru imagini, pune fisierele in <code className="bg-black/40 px-2 py-1 rounded border border-white/10">/public/blog</code> si seteaza path-ul.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={loadTemplate} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">
              <Wand2 className="w-4 h-4" />
              Template fresh
            </button>
            <button onClick={resetDraft} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">
              <RefreshCw className="w-4 h-4" />
              Goleste
            </button>
            <button onClick={copyJson} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/40 text-sm hover:bg-green-500/30">
              <Clipboard className="w-4 h-4" />
              Copy JSON
            </button>
            <button onClick={copyTs} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/40 text-sm hover:bg-green-500/30">
              <Clipboard className="w-4 h-4" />
              Copy TS snippet
            </button>
            <button onClick={downloadJson} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-sm hover:bg-blue-500/30">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={publishDraft}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${
                publishDisabled
                  ? "bg-white/5 border-white/20 text-gray-400 cursor-not-allowed"
                  : publishState === "saving"
                    ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-100"
                    : publishState === "ok"
                      ? "bg-green-500/20 border-green-500/40 text-green-100"
                      : publishState === "error"
                        ? "bg-red-500/20 border-red-500/40 text-red-100"
                        : "bg-white/10 border-white/10"
              } hover:bg-white/15`}
              disabled={publishState === "saving" || publishDisabled}
            >
              <Clipboard className="w-4 h-4" />
              {publishDisabled
                ? "Publish disabled"
                : publishState === "saving"
                  ? "Publishing..."
                  : "Publish to backend"}
            </button>
            <button onClick={deleteDraft} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-sm text-red-100 hover:bg-red-500/30">
              <X className="w-4 h-4" />
              Delete
            </button>
            <button onClick={() => setShowImport(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">
              <Clipboard className="w-4 h-4" />
              Paste JSON
            </button>
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => {
                  loadExisting(e.target.value);
                  e.currentTarget.value = "";
                }}
                defaultValue=""
                className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-sm"
              >
                <option value="" disabled>
                  Incarca din backend/statice
                </option>
                {remoteWriteups.map((item) => (
                  <option key={`remote-${item.slug}`} value={item.slug}>
                    [Backend] {item.title}
                  </option>
                ))}
                {writeups.map((item) => (
                  <option key={`static-${item.slug}`} value={item.slug}>
                    [Static] {item.title}
                  </option>
                ))}
              </select>
              <button onClick={refreshRemote} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">
                Refresh list
              </button>
            </div>
            <button onClick={addDefaultSections} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm hover:bg-white/15">
              <Wand2 className="w-4 h-4" />
              Sectiuni standard
            </button>
          </div>
        </section>

        <div className={`mt-8 grid gap-6 ${view === "split" ? "lg:grid-cols-2" : "grid-cols-1"}`}>
          {view !== "preview" && (
          <section className="p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FilePlus className="w-4 h-4" />
              Date generale
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm text-gray-400">Slug
                <input value={draft.slug} onChange={(e) => updateDraftField("slug", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Titlu
                <input
                  value={draft.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDraft((prev) => {
                      const next = { ...prev, title: value };
                      if (!prev.slug || prev.slug.startsWith("htb-") || prev.slug === slugify(prev.title)) {
                        next.slug = slugify(value) || prev.slug || `htb-${Date.now()}`;
                      }
                      return next;
                    });
                  }}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none"
                />
              </label>
              <label className="text-sm text-gray-400">Target
                <input value={draft.target} onChange={(e) => updateDraftField("target", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Tip
                <select value={draft.type} onChange={(e) => updateDraftField("type", e.target.value as WriteUp["type"])} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none">
                  <option>Machine</option>
                  <option>Challenge</option>
                </select>
              </label>
              <label className="text-sm text-gray-400">Dificultate
                <select value={draft.difficulty} onChange={(e) => updateDraftField("difficulty", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none">
                  {(["Easy", "Medium", "Hard", "Insane"] as const).map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-gray-400">OS (optional)
                <input value={draft.os ?? ""} onChange={(e) => updateDraftField("os", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Status
                <select value={draft.status} onChange={(e) => updateDraftField("status", e.target.value as WriteUp["status"])} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none">
                  <option>Rooted</option>
                  <option>In progress</option>
                  <option>Draft</option>
                </select>
              </label>
              <label className="text-sm text-gray-400">Data (release)
                <input type="date" value={draft.release ?? ""} onChange={(e) => updateDraftField("release", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Time to root
                <input value={draft.timeToRoot ?? ""} onChange={(e) => updateDraftField("timeToRoot", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Cover path (ex: /blog/cover.png)
                <input value={draft.cover ?? ""} onChange={(e) => updateDraftField("cover", e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Cover preview (local file)
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 text-sm"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setCoverPreview(URL.createObjectURL(file));
                    updateDraftField("cover", `/blog/${file.name}`);
                  }}
                />
                {coverPreview && (
                  <div className="mt-2 relative w-full h-24 rounded-lg overflow-hidden border border-white/10">
                    <Image src={coverPreview} alt="preview" fill className="object-cover" sizes="200px" />
                  </div>
                )}
              </label>
              <label className="text-sm text-gray-400 md:col-span-2">Galerie (separate prin virgula)
                <input
                  value={toCommaList(draft.gallery)}
                  onChange={(e) => updateDraftField("gallery", parseCommaList(e.target.value))}
                  placeholder="/blog/s1.png, /blog/s2.png"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none"
                />
              </label>
            </div>

            <label className="text-sm text-gray-400 block">Summary
              <textarea
                value={draft.summary}
                onChange={(e) => updateDraftField("summary", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none min-h-[90px]"
              />
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm text-gray-400">Tags (virgula)
                <input value={toCommaList(draft.tags)} onChange={(e) => updateDraftField("tags", parseCommaList(e.target.value))} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Skills (virgula)
                <input value={toCommaList(draft.skills)} onChange={(e) => updateDraftField("skills", parseCommaList(e.target.value))} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none" />
              </label>
              <label className="text-sm text-gray-400">Highlights (cate o linie)
                <textarea value={(draft.highlights || []).join("\n")} onChange={(e) => updateDraftField("highlights", parseNewLineList(e.target.value))} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none min-h-[80px]" />
              </label>
              <label className="text-sm text-gray-400">Loot global (optional, cate o linie)
                <textarea value={(draft.loot || []).join("\n")} onChange={(e) => updateDraftField("loot", parseNewLineList(e.target.value))} className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none min-h-[80px]" />
              </label>
            </div>

            <label className="text-sm text-gray-400 block">Link-uri externe (label | url pe fiecare linie)
              <textarea
                value={(draft.external || []).map((l) => `${l.label} | ${l.href}`).join("\n")}
                onChange={(e) => updateDraftField("external", parseExternalList(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none min-h-[80px]"
              />
            </label>

            <label className="text-sm text-gray-400 block">Notite generale
              <textarea
                value={draft.notes ?? ""}
                onChange={(e) => updateDraftField("notes", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none min-h-[80px]"
              />
            </label>
          </section>
          )}

          {view !== "compose" && (
          <section className="p-6 rounded-3xl border border-white/10 bg-black/40 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Eye className="w-4 h-4" />
              Preview rapid
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-wrap items-center gap-2 text-xs mb-2">
                <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-200 border border-green-500/20">{draft.difficulty}</span>
                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">{draft.type}</span>
                {draft.os && <span className="px-2 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-100">{draft.os}</span>}
                <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">{draft.status}</span>
                {draft.timeToRoot && <span className="px-2 py-1 rounded-full bg-black/40 border border-white/10 flex items-center gap-1"><Tag className="w-3 h-3" />{draft.timeToRoot}</span>}
              </div>
              <h3 className="text-xl font-bold">{draft.title || "Titlu write-up"}</h3>
              <p className="text-sm text-green-300 font-mono">{draft.target || "Hack The Box"}</p>
              <p className="mt-2 text-gray-300 text-sm leading-relaxed">{draft.summary || "Rezumatul va aparea aici."}</p>
              {draft.cover && (
                <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-white/10">
                  <Image src={coverPreview || draft.cover} alt="cover" fill className="object-cover" sizes="400px" />
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {(draft.tags || []).map((tag) => (
                  <span key={tag} className="px-2 py-1 rounded-full bg-white/10 border border-white/10">{tag}</span>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-200">
                {(draft.highlights || []).filter(Boolean).map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-300 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-xs text-gray-400 mb-1">Sectiuni</div>
                <div className="grid gap-2 text-sm text-gray-200">
                  {draft.sections.map((s) => (
                    <div key={s.title} className="p-2 rounded-lg bg-black/30 border border-white/10">
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-gray-400 text-xs">{s.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 max-h-[420px] overflow-auto space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <CodeIcon />
                JSON ready-to-paste
              </div>
              <pre className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed">{jsonPreview}</pre>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <CodeIcon />
                TypeScript snippet
              </div>
              <pre className="text-xs text-gray-200 whitespace-pre-wrap leading-relaxed">{`// Adauga in writeups.ts\n${jsonPreview}`}</pre>
            </div>
          </section>
          )}
        </div>

        <section className="mt-8 p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="w-4 h-4 text-green-300" />
            Sectiuni & comenzi
          </div>
          <p className="text-gray-400 text-sm">Adauga pasii, comenzile si notitele pentru fiecare etapa. Foloseste sagetile pentru a reordona.</p>

          <div className="space-y-4">
            {draft.sections.map((section, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-[11px] rounded-full bg-white/10 border border-white/10">#{idx + 1}</span>
                    <input
                      value={section.title}
                      onChange={(e) => updateSection(idx, { ...section, title: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none text-sm"
                      placeholder="Titlu sectiune"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveSection(idx, "up")}
                      className="p-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20"
                      disabled={idx === 0}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveSection(idx, "down")}
                      className="p-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20"
                      disabled={idx === draft.sections.length - 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <button onClick={() => removeSection(idx)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <textarea
                  value={section.summary}
                  onChange={(e) => updateSection(idx, { ...section, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 outline-none text-sm"
                  placeholder="Rezumat scurt"
                />

                <label className="text-xs text-gray-400">Findings (cate o linie)
                  <textarea
                    value={(section.findings || []).join("\n")}
                    onChange={(e) => updateSection(idx, { ...section, findings: parseNewLineList(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 outline-none text-sm"
                  />
                </label>

                <label className="text-xs text-gray-400">Loot (optional)
                  <textarea
                    value={(section.loot || []).join("\n")}
                    onChange={(e) => updateSection(idx, { ...section, loot: parseNewLineList(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 outline-none text-sm"
                  />
                </label>

                <label className="text-xs text-gray-400">Takeaways (lessons)
                  <textarea
                    value={(section.takeaways || []).join("\n")}
                    onChange={(e) => updateSection(idx, { ...section, takeaways: parseNewLineList(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 outline-none text-sm"
                  />
                </label>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Commands</span>
                    <button
                      onClick={() => addCommandToSection(idx)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 border border-white/10 text-white"
                    >
                      <PlusIcon />
                      Add command
                    </button>
                  </div>
                  {(section.commands || []).map((cmd, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-2">
                      <input
                        value={cmd.label ?? ""}
                        onChange={(e) => {
                          const commands = [...(section.commands || [])];
                          commands[cIdx] = { ...cmd, label: e.target.value };
                          updateSection(idx, { ...section, commands });
                        }}
                        placeholder="Label (ex: nmap)"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none text-sm"
                      />
                      <textarea
                        value={cmd.snippet}
                        onChange={(e) => {
                          const commands = [...(section.commands || [])];
                          commands[cIdx] = { ...cmd, snippet: e.target.value };
                          updateSection(idx, { ...section, commands });
                        }}
                        placeholder="Comanda / payload"
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 outline-none text-sm"
                      />
                    </div>
                  ))}
                  {(section.commands || []).length === 0 && (
                    <div className="text-xs text-gray-500 px-2">Nu ai comenzi aici inca.</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addSection}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/40 text-green-100 text-sm hover:bg-green-500/30"
          >
            <PlusIcon />
            Adauga sectiune
          </button>
        </section>
      </div>
      {showImport && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4" onClick={() => setShowImport(false)}>
          <div className="w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clipboard className="w-4 h-4" />
                Importa JSON
              </div>
              <button onClick={() => setShowImport(false)} className="p-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20">
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste JSON-ul aici..."
              className="w-full h-64 px-3 py-2 rounded-lg bg-black/50 border border-white/10 outline-none text-sm text-white"
            />
            <div className="mt-3 flex gap-2 justify-end">
              <button onClick={() => setShowImport(false)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">Renunta</button>
              <button onClick={importJson} className="px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/40 text-sm text-green-100 hover:bg-green-500/30">Importa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l6-6-6-6M8 6L2 12l6 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7h14" />
    </svg>
  );
}
