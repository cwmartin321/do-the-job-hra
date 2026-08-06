import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slideId = searchParams.get("slideId");

  if (!slideId) {
    return NextResponse.json({ error: "Missing slideId" }, { status: 400 });
  }

  try {
    const comments = await redis.lrange(`presentation:slide:${slideId}:comments`, 0, -1);
    return NextResponse.json({ comments: comments || [] });
  } catch (error) {
    console.error("Redis fetch error:", error);
    // Return empty fallback gracefully if credentials are missing
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

    await redis.rpush(`presentation:slide:${slideId}:comments`, comment);
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

    await redis.lrem(`presentation:slide:${slideId}:comments`, 0, comment);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis delete error:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
