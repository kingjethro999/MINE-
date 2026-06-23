import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Mining has been replaced with video watching. Visit /watch." },
    { status: 410 }
  );
}
