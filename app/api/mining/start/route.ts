import { auth } from "@/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData().catch(() => new FormData());
  const autoDays = formData.get("autoDays");

  // Prevent multiple active sessions
  const existing = await prisma.miningSession.findFirst({
    where: { userId: session.user.id, endedAt: null }
  });

  if (!existing) {
    await prisma.miningSession.create({
      data: {
        userId: session.user.id,
        autoMine: !!autoDays,
        autoDays: autoDays ? parseInt(autoDays as string) : null
      }
    });
  }

  redirect("/mine");
}
