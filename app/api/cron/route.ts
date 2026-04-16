import { capsule } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { and, eq, lte } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!bearerToken || bearerToken !== process.env.CRON_BEARER_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const result = await db
    .update(capsule)
    .set({ status: "unlocked" })
    .where(
      and(eq(capsule.status, "locked"), lte(capsule.unlockAt, new Date())),
    );

  return NextResponse.json({
    message: "Capsules unlocked successfully",
    updatedCount: result.rowCount,
  });
}
