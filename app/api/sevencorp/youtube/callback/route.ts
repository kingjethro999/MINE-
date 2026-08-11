import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.SEVENCORP_BACKEND_URL ?? "http://100.58.214.89:4000").replace(/\/$/, "");
const APP_URL = (process.env.SEVENCORP_APP_URL ?? "https://7corp.vercel.app").replace(/\/$/, "");

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code") ?? "";
  const state = url.searchParams.get("state") ?? "";

  if (!code) {
    return NextResponse.redirect(`${APP_URL}/app/automation?linked=error&reason=missing_code`);
  }

  try {
    const target = new URL(`${BACKEND_URL}/api/accounts/youtube/callback`);
    target.searchParams.set("code", code);
    target.searchParams.set("state", state);

    const res = await fetch(target, { redirect: "manual" });
    const location = res.headers.get("location");

    const linked = location ? (location.includes("linked=1") ? "1" : "error") : "error";

    return NextResponse.redirect(`${APP_URL}/app/automation?linked=${linked}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.redirect(`${APP_URL}/app/automation?linked=error&reason=${encodeURIComponent(message)}`);
  }
}
