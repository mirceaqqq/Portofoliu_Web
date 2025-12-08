module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/blog/writeups.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "writeupTemplate",
    ()=>writeupTemplate,
    "writeups",
    ()=>writeups
]);
const writeups = [];
const writeupTemplate = {
    slug: "htb-machine-slug",
    title: "Descriptive title",
    target: "Hack The Box: Machine name",
    type: "Machine",
    difficulty: "Easy",
    os: "Linux",
    status: "Draft",
    release: new Date().toISOString().slice(0, 10),
    timeToRoot: "",
    cover: "/blog/cover.png",
    gallery: [
        "/blog/screenshot1.png"
    ],
    skills: [
        "enum",
        "exploit"
    ],
    tags: [
        "tag1",
        "tag2"
    ],
    summary: "One-liner of the path to root.",
    highlights: [
        "Key thing 1",
        "Key thing 2"
    ],
    sections: [
        {
            title: "Recon",
            summary: "What you saw and why it matters.",
            commands: [
                {
                    label: "Scan",
                    snippet: "nmap -sC -sV -oN scans/name.nmap <ip>"
                }
            ],
            findings: [
                "service detail"
            ]
        }
    ],
    loot: [
        "user flag",
        "root flag"
    ],
    external: [
        {
            label: "HTB link",
            href: "https://app.hackthebox.com"
        }
    ]
};
}),
"[project]/app/lib/writeups.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteWriteup",
    ()=>deleteWriteup,
    "getAllWriteups",
    ()=>getAllWriteups,
    "getWriteupBySlug",
    ()=>getWriteupBySlug,
    "upsertWriteup",
    ()=>upsertWriteup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$blog$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/blog/writeups.ts [app-route] (ecmascript)");
;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || "writeups";
const supabaseEnabled = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY;
// In-memory fallback for local/dev when no Supabase is configured.
let memoryStore = [];
const sortWriteups = (list)=>[
        ...list
    ].sort((a, b)=>{
        const aDate = a.publishedAt || a.release || a.updatedAt || a.createdAt || "";
        const bDate = b.publishedAt || b.release || b.updatedAt || b.createdAt || "";
        return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
async function supabaseRequest(path, init = {}) {
    if (!supabaseEnabled) throw new Error("Supabase not configured");
    const url = `${SUPABASE_URL}/rest/v1/${path}`;
    const res = await fetch(url, {
        ...init,
        headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
            ...init.headers || {}
        },
        cache: "no-store"
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Supabase request failed: ${res.status} ${text}`);
    }
    return res.json();
}
async function readStore() {
    if (supabaseEnabled) {
        return supabaseRequest(`${SUPABASE_TABLE}?select=*`);
    }
    return memoryStore;
}
async function upsertStore(entry) {
    if (supabaseEnabled) {
        const [saved] = await supabaseRequest(`${SUPABASE_TABLE}`, {
            method: "POST",
            body: JSON.stringify([
                entry
            ]),
            headers: {
                Prefer: "resolution=merge-duplicates"
            }
        });
        return saved ?? entry;
    }
    const idx = memoryStore.findIndex((i)=>i.slug === entry.slug);
    if (idx >= 0) memoryStore[idx] = entry;
    else memoryStore.push(entry);
    return entry;
}
async function deleteFromStore(slug) {
    if (supabaseEnabled) {
        await supabaseRequest(`${SUPABASE_TABLE}?slug=eq.${encodeURIComponent(slug)}`, {
            method: "DELETE"
        });
        return;
    }
    memoryStore = memoryStore.filter((item)=>item.slug !== slug);
}
async function getAllWriteups() {
    const dynamicEntries = await readStore();
    const mergedMap = new Map();
    for (const item of __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$blog$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeups"])mergedMap.set(item.slug, item);
    for (const item of dynamicEntries)mergedMap.set(item.slug, item);
    return sortWriteups(Array.from(mergedMap.values()));
}
async function upsertWriteup(entry) {
    const now = new Date().toISOString();
    const existing = (await readStore()).find((i)=>i.slug === entry.slug);
    const next = {
        ...entry,
        createdAt: entry.createdAt || existing?.createdAt || now,
        updatedAt: now,
        publishedAt: entry.status === "Draft" ? entry.publishedAt : entry.publishedAt || now
    };
    const saved = await upsertStore(next);
    return saved;
}
async function deleteWriteup(slug) {
    await deleteFromStore(slug);
}
async function getWriteupBySlug(slug) {
    const all = await getAllWriteups();
    return all.find((item)=>item.slug === slug);
}
}),
"[project]/app/api/writeups/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/writeups.ts [app-route] (ecmascript)");
;
;
const API_KEY = process.env.BLOG_API_KEY || process.env.NEXT_PUBLIC_BLOG_KEY;
const isProd = ("TURBOPACK compile-time value", "development") === "production";
function requireAuth(req) {
    if (!API_KEY) return !isProd; // allow in dev if no key is set, block in prod
    const headerKey = req.headers.get("x-api-key");
    return headerKey === API_KEY;
}
async function GET() {
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllWriteups"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        data
    });
}
async function POST(request) {
    if (!requireAuth(request)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "unauthorized"
        }, {
            status: 401
        });
    }
    try {
        const body = await request.json();
        if (!body || !body.slug || !body.title) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "slug si title sunt obligatorii"
            }, {
                status: 400
            });
        }
        const prepared = {
            highlights: [],
            sections: [],
            tags: [],
            skills: [],
            status: "Draft",
            type: "Machine",
            difficulty: "Easy",
            target: body.title,
            summary: body.summary || "",
            ...body
        };
        const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertWriteup"])(prepared);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            data: saved
        });
    } catch (err) {
        console.error(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Nu am putut salva"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3c0d7502._.js.map