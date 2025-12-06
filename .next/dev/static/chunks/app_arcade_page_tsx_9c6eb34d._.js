(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/arcade/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArcadePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ArcadePage() {
    _s();
    const [mouse, setMouse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0.5,
        y: 0.5
    });
    const [particles, setParticles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const driftRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArcadePage.useEffect": ()=>{
            setParticles(Array.from({
                length: 36
            }).map({
                "ArcadePage.useEffect": (_, i)=>({
                        id: i,
                        x: Math.random(),
                        y: Math.random(),
                        size: 4 + Math.random() * 8,
                        speed: 4 + Math.random() * 6,
                        hue: 140 + Math.random() * 160
                    })
            }["ArcadePage.useEffect"]));
        }
    }["ArcadePage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArcadePage.useEffect": ()=>{
            const onMove = {
                "ArcadePage.useEffect.onMove": (e)=>{
                    const x = e.clientX / window.innerWidth;
                    const y = e.clientY / window.innerHeight;
                    setMouse({
                        x,
                        y
                    });
                }
            }["ArcadePage.useEffect.onMove"];
            window.addEventListener("pointermove", onMove);
            return ({
                "ArcadePage.useEffect": ()=>window.removeEventListener("pointermove", onMove)
            })["ArcadePage.useEffect"];
        }
    }["ArcadePage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArcadePage.useEffect": ()=>{
            if (driftRef.current) cancelAnimationFrame(driftRef.current);
            let t = 0;
            const drift = {
                "ArcadePage.useEffect.drift": ()=>{
                    t += 0.002;
                    if (!window.matchMedia("(pointer:fine)").matches) {
                        const x = 0.5 + Math.cos(t) * 0.08;
                        const y = 0.5 + Math.sin(t * 1.2) * 0.08;
                        setMouse({
                            x,
                            y
                        });
                    }
                    driftRef.current = requestAnimationFrame(drift);
                }
            }["ArcadePage.useEffect.drift"];
            drift();
            return ({
                "ArcadePage.useEffect": ()=>{
                    if (driftRef.current) cancelAnimationFrame(driftRef.current);
                }
            })["ArcadePage.useEffect"];
        }
    }["ArcadePage.useEffect"], []);
    const coreOffset = (factor)=>({
            x: (mouse.x - 0.5) * factor,
            y: (mouse.y - 0.5) * factor
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative max-w-6xl mx-auto px-4 pb-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex items-center justify-between py-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs uppercase tracking-[0.3em] text-green-300 mb-2",
                                    children: "Playground"
                                }, void 0, false, {
                                    fileName: "[project]/app/arcade/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-5xl font-bold",
                                    children: "Sentient Node"
                                }, void 0, false, {
                                    fileName: "[project]/app/arcade/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-1 max-w-xl",
                                    children: "Interfață vie: plasmă digitală, halo de date, reacție la mișcare. Fără reguli, doar vibrație."
                                }, void 0, false, {
                                    fileName: "[project]/app/arcade/page.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/arcade/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "text-xs text-gray-400 hover:text-white underline",
                            children: "Back home"
                        }, void 0, false, {
                            fileName: "[project]/app/arcade/page.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/arcade/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#050505] via-[#0b1a1a] to-[#050505] shadow-[0_20px_120px_rgba(0,255,170,0.15)]",
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-[70vh] min-h-[480px] w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,170,0.06),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.08),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_45%)]"
                            }, void 0, false, {
                                fileName: "[project]/app/arcade/page.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "absolute inset-10 rounded-[40px] border border-white/5 bg-white/5 backdrop-blur-xl overflow-hidden",
                                style: {
                                    boxShadow: "0 0 120px rgba(0,255,170,0.08)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                        ref: canvasRef,
                                        className: "hidden"
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0",
                                        children: particles.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                className: "absolute rounded-full",
                                                style: {
                                                    width: p.size,
                                                    height: p.size,
                                                    background: `radial-gradient(circle, hsla(${p.hue},80%,70%,0.9) 0%, rgba(0,0,0,0) 70%)`,
                                                    top: `${p.y * 100}%`,
                                                    left: `${p.x * 100}%`,
                                                    filter: "blur(0.5px)"
                                                },
                                                animate: {
                                                    y: [
                                                        "0%",
                                                        "-8%",
                                                        "0%"
                                                    ],
                                                    x: [
                                                        "0%",
                                                        "4%",
                                                        "0%"
                                                    ],
                                                    opacity: [
                                                        0.3,
                                                        0.8,
                                                        0.3
                                                    ]
                                                },
                                                transition: {
                                                    duration: 6 + p.speed * 0.2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: p.id * 0.1
                                                }
                                            }, p.id, false, {
                                                fileName: "[project]/app/arcade/page.tsx",
                                                lineNumber: 89,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute inset-0",
                                        style: {
                                            background: "radial-gradient(circle at 50% 50%, rgba(0,255,170,0.06), rgba(0,0,0,0))"
                                        },
                                        animate: {
                                            opacity: [
                                                0.4,
                                                0.7,
                                                0.4
                                            ]
                                        },
                                        transition: {
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute inset-0",
                                        style: {
                                            background: `radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(59,130,246,0.12), transparent 45%)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute left-1/2 top-1/2 h-64 w-64 md:h-80 md:w-80 rounded-[35%] bg-gradient-to-br from-emerald-300/60 via-cyan-200/50 to-purple-300/50 mix-blend-screen",
                                        animate: {
                                            borderRadius: [
                                                "35%",
                                                "45%",
                                                "32%",
                                                "40%",
                                                "35%"
                                            ],
                                            rotate: [
                                                0,
                                                6,
                                                -4,
                                                0
                                            ],
                                            scale: [
                                                1,
                                                1.05,
                                                1.02,
                                                1
                                            ]
                                        },
                                        transition: {
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        style: {
                                            x: coreOffset(30).x,
                                            y: coreOffset(30).y,
                                            filter: "blur(6px)",
                                            transform: "translate(-50%, -50%)",
                                            boxShadow: "0 0 80px rgba(0,255,170,0.35)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute left-1/2 top-1/2 h-40 w-40 md:h-56 md:w-56 rounded-full",
                                        animate: {
                                            rotate: 360
                                        },
                                        transition: {
                                            duration: 24,
                                            repeat: Infinity,
                                            ease: "linear"
                                        },
                                        style: {
                                            transform: "translate(-50%, -50%)",
                                            background: "conic-gradient(from 0deg, rgba(0,255,170,0.3), rgba(147,51,234,0.2), rgba(59,130,246,0.25), rgba(0,255,170,0.3))",
                                            mixBlendMode: "screen",
                                            filter: "blur(1px)",
                                            opacity: 0.8
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute left-1/2 top-1/2 h-28 w-28 md:h-36 md:w-36 rounded-[28%] border border-white/30",
                                        animate: {
                                            rotate: [
                                                -6,
                                                6,
                                                -3,
                                                0
                                            ],
                                            scale: [
                                                1,
                                                1.08,
                                                1
                                            ],
                                            opacity: [
                                                0.9,
                                                0.6,
                                                0.9
                                            ]
                                        },
                                        transition: {
                                            duration: 10,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        style: {
                                            transform: "translate(-50%, -50%)",
                                            boxShadow: "0 0 60px rgba(255,255,255,0.08)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute left-1/2 top-1/2 h-44 w-44 md:h-56 md:w-56 rounded-full",
                                        animate: {
                                            scale: [
                                                1,
                                                1.12,
                                                1
                                            ]
                                        },
                                        transition: {
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        style: {
                                            transform: "translate(-50%, -50%)",
                                            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%)",
                                            maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
                                            mixBlendMode: "screen"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "absolute left-1/2 top-1/2 h-96 w-96 md:h-[28rem] md:w-[28rem] rounded-full",
                                        animate: {
                                            scale: [
                                                1,
                                                1.05,
                                                0.98,
                                                1
                                            ],
                                            opacity: [
                                                0.6,
                                                0.35,
                                                0.6
                                            ]
                                        },
                                        transition: {
                                            duration: 12,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        },
                                        style: {
                                            transform: "translate(-50%, -50%)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            boxShadow: "0 0 120px rgba(59,130,246,0.15)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/arcade/page.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-x-10 bottom-10 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-4 pointer-events-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/app/arcade/page.tsx",
                                                lineNumber: 199,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Signal coherent. Entity observing."
                                            }, void 0, false, {
                                                fileName: "[project]/app/arcade/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 uppercase tracking-[0.3em] text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Hover"
                                            }, void 0, false, {
                                                fileName: "[project]/app/arcade/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "——"
                                            }, void 0, false, {
                                                fileName: "[project]/app/arcade/page.tsx",
                                                lineNumber: 204,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/app/arcade/page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/arcade/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/arcade/page.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/arcade/page.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/arcade/page.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/arcade/page.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/arcade/page.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(ArcadePage, "B6Yq0QRY+icDzlJMrK3pBmFYCus=");
_c = ArcadePage;
var _c;
__turbopack_context__.k.register(_c, "ArcadePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_arcade_page_tsx_9c6eb34d._.js.map