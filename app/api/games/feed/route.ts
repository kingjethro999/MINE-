import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://gamemonetize.com/feed.php?format=0&num=50&page=1", { next: { revalidate: 3600 } });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
