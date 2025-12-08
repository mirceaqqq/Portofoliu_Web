import { NextResponse } from "next/server";

import { upsertWriteup, getAllWriteups } from "@/app/lib/writeups";
import type { WriteUp } from "@/app/blog/writeups";

const API_KEY = process.env.BLOG_API_KEY || process.env.NEXT_PUBLIC_BLOG_KEY;
const isProd = process.env.NODE_ENV === "production";

function requireAuth(req: Request) {
  if (!API_KEY) return !isProd; // allow in dev if no key is set, block in prod
  const headerKey = req.headers.get("x-api-key");
  return headerKey === API_KEY;
}

export async function GET() {
  const data = await getAllWriteups();
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  if (!requireAuth(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as WriteUp;
    if (!body || !body.slug || !body.title) {
      return NextResponse.json({ error: "slug si title sunt obligatorii" }, { status: 400 });
    }
    const prepared: WriteUp = {
      highlights: [],
      sections: [],
      tags: [],
      skills: [],
      status: "Draft",
      type: "Machine",
      difficulty: "Easy",
      target: body.title,
      summary: body.summary || "",
      ...body,
    };
    const saved = await upsertWriteup(prepared);
    return NextResponse.json({ ok: true, data: saved });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Nu am putut salva" }, { status: 500 });
  }
}
