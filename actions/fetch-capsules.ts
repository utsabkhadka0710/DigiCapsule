import { capsule, capsuleFiles, user } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { getSession } from "@/lib/helper/get-session";
import { and, eq } from "drizzle-orm";
import { stat } from "fs";

export const GetUserCapsulesAction = async () => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to fetch capsules.",
      session: null,
    };
  }

  try {
    const userCapsules = await db
      .select({
        id: capsule.id,
        status: capsule.status,
        createdAt: capsule.createdAt,
        title: capsule.title,
        category: capsule.category,
        unlockAt: capsule.unlockAt,
        hint: capsule.hint,
        userId: capsule.userId,
        updatedAt: capsule.updatedAt,
      })
      .from(capsule)
      .where(eq(capsule.userId, session.user.id));

    return {
      success: true,
      data: userCapsules,
      session,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user capsules.";
    console.error(message);

    return {
      success: false,
      message: "Failed to fetch user capsules",
      session,
    };
  }
};

export const GetCapsuleFromId = async ({
  capsuleId,
}: {
  capsuleId: string;
}) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to fetch capsules.",
    };
  }

  try {
    const fetchedCapsule = await db
      .select()
      .from(capsule)
      .where(
        and(eq(capsule.id, capsuleId), eq(capsule.userId, session.user.id)),
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

export const GetCapsuleFiles = async ({ capsuleId }: { capsuleId: string }) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to fetch capsule files.",
    };
  }

  try {
    const fetchedCapsuleFiles = await db
      .select()
      .from(capsuleFiles)
      .where(eq(capsuleFiles.capsuleId, capsuleId));

    return {
      success: true,
      data: fetchedCapsuleFiles,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch capsule files.";
    console.error(message);

    return {
      success: false,
      message: "Failed to fetch capsule files",
    };
  }
};
