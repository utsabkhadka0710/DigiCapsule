import { NextRequest, NextResponse } from "next/server";

const checkTime = function (capsuleUnlockTime: Date) {
  const currentDate = new Date();
  const unlockTime = new Date(capsuleUnlockTime);

  if (currentDate >= unlockTime) {
    return true;
  }
};

export async function GET(req: NextRequest) {
  const bearerToken = req.headers.get("Authorization")?.split(" ")[1];

  if (!bearerToken || bearerToken !== process.env.CRON_BEARER_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
