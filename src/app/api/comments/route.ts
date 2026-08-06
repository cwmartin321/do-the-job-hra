import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisFetch(command: string[]) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) throw new Error("Missing Upstash config");
  const res = await fetch(UPSTASH_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store"
  });
  if (!res.ok) throw new Error(`Upstash error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  if (data.error) throw new Error(`Upstash error: ${data.error}`);
  return data.result;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slideId = searchParams.get("slideId");

  if (!slideId) {
    return NextResponse.json({ error: "Missing slideId" }, { status: 400 });
  }

  try {
    const comments = await redisFetch(["LRANGE", `presentation:slide:${slideId}:comments`, "0", "-1"]);
    return NextResponse.json({ comments: comments || [] });
  } catch (error) {
    console.error("Redis fetch error:", error);
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slideId, comment } = body;

    if (!slideId || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await redisFetch(["RPUSH", `presentation:slide:${slideId}:comments`, comment]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis write error:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { slideId, comment } = body;

    if (!slideId || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await redisFetch(["LREM", `presentation:slide:${slideId}:comments`, "0", comment]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis delete error:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
