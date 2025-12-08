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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

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
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$blog$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/blog/writeups.ts [app-route] (ecmascript)");
;
;
;
const storePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "data", "writeups.json");
async function readFromDisk() {
    try {
        const raw = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(storePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch  {
        // If file missing or invalid, just return empty array
        return [];
    }
}
async function saveToDisk(entries) {
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(storePath);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].mkdir(dir, {
        recursive: true
    });
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(storePath, JSON.stringify(entries, null, 2), "utf-8");
}
async function getAllWriteups() {
    const dynamicEntries = await readFromDisk();
    // Merge: prefer dynamic entries when slugs collide
    const mergedMap = new Map();
    for (const item of __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$blog$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeups"])mergedMap.set(item.slug, item);
    for (const item of dynamicEntries)mergedMap.set(item.slug, item);
    return Array.from(mergedMap.values()).sort((a, b)=>{
        const aDate = a.publishedAt || a.release || a.updatedAt || a.createdAt || "";
        const bDate = b.publishedAt || b.release || b.updatedAt || b.createdAt || "";
        return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
}
async function upsertWriteup(entry) {
    const now = new Date().toISOString();
    const list = await readFromDisk();
    const idx = list.findIndex((i)=>i.slug === entry.slug);
    const next = {
        ...entry,
        createdAt: entry.createdAt || list[idx]?.createdAt || now,
        updatedAt: now,
        publishedAt: entry.status === "Draft" ? entry.publishedAt : entry.publishedAt || now
    };
    if (idx >= 0) {
        list[idx] = next;
    } else {
        list.push(next);
    }
    await saveToDisk(list);
    return next;
}
async function deleteWriteup(slug) {
    const list = await readFromDisk();
    const filtered = list.filter((item)=>item.slug !== slug);
    await saveToDisk(filtered);
}
async function getWriteupBySlug(slug) {
    const all = await getAllWriteups();
    return all.find((item)=>item.slug === slug);
}
}),
"[project]/app/api/writeups/[slug]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/writeups.ts [app-route] (ecmascript)");
;
;
const API_KEY = process.env.BLOG_API_KEY || process.env.NEXT_PUBLIC_BLOG_KEY;
function requireAuth(req) {
    if (!API_KEY) return true;
    const headerKey = req.headers.get("x-api-key");
    return headerKey === API_KEY;
}
async function GET(_, { params }) {
    const writeup = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWriteupBySlug"])(params.slug);
    if (!writeup) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Not found"
    }, {
        status: 404
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        data: writeup
    });
}
async function PUT(request, { params }) {
    if (!requireAuth(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "unauthorized"
    }, {
        status: 401
    });
    try {
        const body = await request.json();
        const merged = {
            ...body,
            slug: params.slug
        };
        const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertWriteup"])(merged);
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
async function DELETE(request, { params }) {
    if (!requireAuth(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "unauthorized"
    }, {
        status: 401
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$writeups$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteWriteup"])(params.slug);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (err) {
        console.error(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Nu am putut sterge"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__add61c83._.js.map