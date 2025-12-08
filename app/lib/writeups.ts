import { writeups as staticWriteups, type WriteUp } from "../blog/writeups";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || "writeups";

const supabaseEnabled = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY;

// In-memory fallback for local/dev when no Supabase is configured.
let memoryStore: WriteUp[] = [];

const sortWriteups = (list: WriteUp[]) =>
  [...list].sort((a, b) => {
    const aDate = a.publishedAt || a.release || a.updatedAt || a.createdAt || "";
    const bDate = b.publishedAt || b.release || b.updatedAt || b.createdAt || "";
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!supabaseEnabled) throw new Error("Supabase not configured");
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase request failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

async function readStore(): Promise<WriteUp[]> {
  if (supabaseEnabled) {
    return supabaseRequest<WriteUp[]>(`${SUPABASE_TABLE}?select=*`);
  }
  return memoryStore;
}

async function upsertStore(entry: WriteUp): Promise<WriteUp> {
  if (supabaseEnabled) {
    const [saved] = await supabaseRequest<WriteUp[]>(`${SUPABASE_TABLE}`, {
      method: "POST",
      body: JSON.stringify([entry]),
      headers: { Prefer: "resolution=merge-duplicates" },
    });
    return saved ?? entry;
  }
  const idx = memoryStore.findIndex((i) => i.slug === entry.slug);
  if (idx >= 0) memoryStore[idx] = entry;
  else memoryStore.push(entry);
  return entry;
}

async function deleteFromStore(slug: string) {
  if (supabaseEnabled) {
    await supabaseRequest(`${SUPABASE_TABLE}?slug=eq.${encodeURIComponent(slug)}`, { method: "DELETE" });
    return;
  }
  memoryStore = memoryStore.filter((item) => item.slug !== slug);
}

export async function getAllWriteups(): Promise<WriteUp[]> {
  const dynamicEntries = await readStore();
  const mergedMap = new Map<string, WriteUp>();
  for (const item of staticWriteups) mergedMap.set(item.slug, item);
  for (const item of dynamicEntries) mergedMap.set(item.slug, item);
  return sortWriteups(Array.from(mergedMap.values()));
}

export async function upsertWriteup(entry: WriteUp) {
  const now = new Date().toISOString();
  const existing = (await readStore()).find((i) => i.slug === entry.slug);
  const next: WriteUp = {
    ...entry,
    createdAt: entry.createdAt || existing?.createdAt || now,
    updatedAt: now,
    publishedAt: entry.status === "Draft" ? entry.publishedAt : entry.publishedAt || now,
  };
  const saved = await upsertStore(next);
  return saved;
}

export async function deleteWriteup(slug: string) {
  await deleteFromStore(slug);
}

export async function getWriteupBySlug(slug: string): Promise<WriteUp | undefined> {
  const all = await getAllWriteups();
  return all.find((item) => item.slug === slug);
}
