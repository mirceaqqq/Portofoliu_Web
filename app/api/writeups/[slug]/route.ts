import { NextRequest, NextResponse } from "next/server";

import { deleteWriteup, getWriteupBySlug, upsertWriteup } from "@/app/lib/writeups";
import type { WriteUp } from "@/app/blog/writeups";

const API_KEY = process.env.BLOG_API_KEY || process.env.NEXT_PUBLIC_BLOG_KEY;
const isProd = process.env.NODE_ENV === "production";

function requireAuth(req: Request) {
  if (!API_KEY) return !isProd;
  const headerKey = req.headers.get("x-api-key");
  return headerKey === API_KEY;
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const writeup = await getWriteupBySlug(slug);
  if (!writeup) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: writeup });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!requireAuth(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { slug } = await params;
    const body = (await request.json()) as WriteUp;
    const merged: WriteUp = { ...body, slug };
    const saved = await upsertWriteup(merged);
    return NextResponse.json({ ok: true, data: saved });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Nu am putut salva" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!requireAuth(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { slug } = await params;
    await deleteWriteup(slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Nu am putut sterge" }, { status: 500 });
  }
}
