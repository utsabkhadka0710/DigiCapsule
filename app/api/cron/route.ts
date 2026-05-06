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

  result.forEach(async (capsule) => {
    const accessLink = `${process.env.NEXT_PUBLIC_BASE_URL}/capsule/${capsule.id}?key=${capsule.accessKey}`;

    await sendMail(
      capsule.email!,
      "capsule-unlock",
      accessLink,
      capsule.creatorName!,
    );
  });

  return NextResponse.json({
    message: "Capsules unlocked successfully",
  });
}
