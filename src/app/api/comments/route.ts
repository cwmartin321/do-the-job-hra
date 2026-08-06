import { NextResponse } from "next/server";
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
    const comments = await redis.lrange(`slide:${slideId}:comments`, 0, -1);
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

    await redis.rpush(`slide:${slideId}:comments`, comment);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis write error:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
