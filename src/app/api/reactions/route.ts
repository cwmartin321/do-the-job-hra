import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slideId = searchParams.get("slideId");

  if (!slideId) {
    return NextResponse.json({ error: "Missing slideId" }, { status: 400 });
  }

  try {
    const reactions = await redis.hgetall(`presentation:slide:${slideId}:reactions:v2`);
    return NextResponse.json({ 
      reactions: {
        question: Number(reactions?.question) || 0,
      } 
    });
  } catch (error) {
    console.error("Redis fetch error:", error);
    return NextResponse.json({ reactions: { question: 0 } });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slideId, type, increment = 1 } = body;

    if (!slideId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await redis.hincrby(`presentation:slide:${slideId}:reactions:v2`, type, increment);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Redis write error:", error);
    return NextResponse.json({ error: "Failed to increment reaction" }, { status: 500 });
  }
}
