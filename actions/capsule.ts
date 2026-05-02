"use server";

import { capsule, capsuleFiles } from "@/lib/database/schema";
import { db } from "@/lib/db-edge";
import { getSession } from "@/lib/helper/get-session";
import { ServerCapsuleSchema } from "@/lib/validators/capsules";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export async function CreateCapsuleAction(data: unknown) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You need to be logged in to create a capsule.",
    };
  }

  try {
    const validateFormFields = ServerCapsuleSchema.parse(data);

    const { files, ...capsuleData } = validateFormFields;

    const createdCapsule = await db
      .insert(capsule)
      .values({
        ...capsuleData,
        userId: session.user.id,
      })
      .returning({ id: capsule.id });

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

    return {
      success: true,
      message: "Capsule created successfully.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create a capsule.";
    console.error(message);

    return {
      success: false,
      message: "Failed to create a capsule",
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
    await db
      .delete(capsule)
      .where(
        and(eq(capsule.id, capsuleId), eq(capsule.userId, session.user.id)),
      );

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
