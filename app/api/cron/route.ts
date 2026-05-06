import { capsule } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { sendMail } from "@/lib/mailer";
import { and, eq, lte } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!bearerToken || bearerToken !== process.env.CRON_BEARER_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .update(capsule)
    .set({ status: "unlocked" })
    .returning({
      id: capsule.id,
      email: capsule.recipientEmail,
      accessKey: capsule.accessKey,
      creatorName: capsule.creatorName,
    })
    .where(
      and(eq(capsule.status, "locked"), lte(capsule.unlockAt, new Date())),
    );

  for (const capsuleItem of result) {
    if (!capsuleItem.email) continue;

    const accessLink = `${process.env.NEXT_PUBLIC_BASE_URL}/capsule/${capsuleItem.id}?key=${capsuleItem.accessKey}`;

    await sendMail(
      capsuleItem.email,
      "capsule-unlock",
      accessLink,
      capsuleItem.creatorName ?? "Someone",
    );
  }

  return NextResponse.json({
    message: "Capsules unlocked successfully",
  });
}
