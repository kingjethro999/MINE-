import { fetchPopularVideos } from "@/lib/pexels";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const videos = await fetchPopularVideos(20);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Pexels feed error:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
