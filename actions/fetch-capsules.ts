import { capsule } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { checkSession } from "@/lib/helper/check-session";
import { and, eq, SQLWrapper } from "drizzle-orm";

export const GetUserCapsulesAction = async () => {
  try {
    const session = await checkSession(
      "You need to be logged in to fetch capsules.",
    );

    const userCapsules = await db
      .select()
      .from(capsule)
      .where(eq(capsule.userId, session.user.id));

    return {
      success: true,
      data: userCapsules,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user capsules.";
    console.error(message);

    return {
      success: false,
      message: "Failed to fetch user capsules",
    };
  }
};

export const GetCapsuleFromId = async ({
  capsuleId,
}: {
  capsuleId: SQLWrapper;
}) => {
  try {
    const session = await checkSession(
      "You need to be logged in to fetch capsules.",
    );

    const fetchedCapsule = await db
      .select()
      .from(capsule)
      .where(
        and(eq(capsuleId, capsule.id), eq(capsule.userId, session.user.id)),
      );

    return {
      success: true,
      data: fetchedCapsule,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user capsules.";
    console.log(message);

    return {
      success: false,
      message: "Failed to fetch capsule",
    };
  }
};
