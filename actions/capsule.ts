"use server";

import { capsule, capsuleFiles, user } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { getSession } from "@/lib/helper/get-session";
import { ServerCapsuleSchema } from "@/lib/validators/capsules";
import { revalidatePath } from "next/cache";
import { eq, and, sql } from "drizzle-orm";
import { sendMail } from "@/lib/mailer";

const CAPSULE_LIMITS = {
  free: 4,
  basic: 8,
  premium: 12,
} as const;

export async function CreateCapsuleAction(data: unknown) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to create a capsule.",
    };
  }

  const bytes = crypto.getRandomValues(new Uint8Array(32));

  const accessKey = Array.from(bytes, (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");

  try {
    const validateFormFields = ServerCapsuleSchema.parse(data);

    const { files, ...capsuleData } = validateFormFields;

    const userRecord = await db
      .select({
        currentPlan: user.currentPlan,
        capsulesCount: user.capsulesCount,
      })
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    if (!userRecord.length) {
      return {
        success: false,
        message: "Unable to verify your account plan.",
      };
    }

    const currentPlan = userRecord[0].currentPlan;
    const currentLimit = CAPSULE_LIMITS[currentPlan];

    if (userRecord[0].capsulesCount >= currentLimit) {
      return {
        success: false,
        message: `You have reached your ${currentPlan} plan limit of ${currentLimit} capsules. Upgrade your plan to create more.`,
      };
    }

    const createdCapsule = await db
      .insert(capsule)
      .values({
        ...capsuleData,
        userId: session.user.id,
        creatorName: session.user.name || "Someone",
        accessKey,
      })
      .returning({
        id: capsule.id,
        email: capsule.recipientEmail,
        creatorName: capsule.creatorName,
      });

    await db
      .update(user)
      .set({
        capsulesCount: sql`${user.capsulesCount} + 1`,
      })
      .where(eq(user.id, session.user.id));

    if (files && files.length > 0) {
      await db.insert(capsuleFiles).values(
        files.map((file) => ({
          capsuleId: createdCapsule[0].id,
          url: file.url,
          publicId: file.publicId,
          fileType: file.fileType,
        })),
      );
    }

    revalidatePath("/dashboard");

    const accessLink = `${process.env.NEXT_PUBLIC_BASE_URL}/capsule/${createdCapsule[0].id}?key=${accessKey}`;

    await sendMail(
      createdCapsule[0].email!,
      "capsule-creation",
      accessLink,
      createdCapsule[0].creatorName || "Someone",
    );

    return {
      success: true,
      message: "Capsule created successfully.",
    };
  } catch (error) {
    const message =
      error instanceof Error && error.message === "capsule_limit_reached"
        ? "You have reached your capsule limit for this plan. Upgrade to create more."
        : error instanceof Error
          ? error.message
          : "Failed to create a capsule.";
    console.error(message);

    return {
      success: false,
      message,
    };
  }
}

export async function DeleteCapsuleAction(capsuleId: string) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to delete a capsule.",
    };
  }

  try {
    const deletedCapsule = await db
      .delete(capsule)
      .where(
        and(eq(capsule.id, capsuleId), eq(capsule.userId, session.user.id)),
      )
      .returning({
        id: capsule.id,
        userId: capsule.userId,
      });

    if (!deletedCapsule.length) {
      return {
        success: false,
        message: "Capsule not found or already deleted.",
      };
    }

    await db
      .update(user)
      .set({
        capsulesCount: sql`GREATEST(${user.capsulesCount} - 1, 0)`,
      })
      .where(eq(user.id, session.user.id));

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Capsule deleted successfully.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete the capsule.";
    console.error(message);

    return {
      success: false,
      message: "Failed to delete the capsule",
    };
  }
}
