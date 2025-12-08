import { NextResponse } from "next/server";

import { deleteWriteup, getWriteupBySlug, upsertWriteup } from "@/app/lib/writeups";
import type { WriteUp } from "@/app/blog/writeups";

const API_KEY = process.env.BLOG_API_KEY || process.env.NEXT_PUBLIC_BLOG_KEY;
const isProd = process.env.NODE_ENV === "production";

function requireAuth(req: Request) {
  if (!API_KEY) return !isProd;
  const headerKey = req.headers.get("x-api-key");
  return headerKey === API_KEY;
}

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const writeup = await getWriteupBySlug(params.slug);
  if (!writeup) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: writeup });
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  if (!requireAuth(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = (await request.json()) as WriteUp;
    const merged: WriteUp = { ...body, slug: params.slug };
    const saved = await upsertWriteup(merged);
    return NextResponse.json({ ok: true, data: saved });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Nu am putut salva" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  if (!requireAuth(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    await deleteWriteup(params.slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Nu am putut sterge" }, { status: 500 });
  }
}
