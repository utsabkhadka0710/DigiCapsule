"use server";

import { capsuleCreationEmailTemplate } from "./email-templates/capsule-creation";
import { capsuleUnlockedEmailTemplate } from "./email-templates/capsule-unlocked";

export async function sendMail(
  email: string,
  reason: "capsule-creation" | "capsule-unlock",
  accessLink: string,
  creatorName: string,
) {
  const htmlContent = reason === "capsule-creation";

  const res = await fetch(process.env.BREVO_API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY as string,
    },
    body: JSON.stringify({
      sender: {
        name: "DigiCapsule",
        email: process.env.SENDER_EMAIL as string,
      },
      to: [{ email }],
      subject: `${htmlContent ? "You have been added to a new capsule!" : "A capsule has been unlocked!"}`,
      htmlContent: `${htmlContent ? capsuleCreationEmailTemplate({ creatorName, accessLink }) : capsuleUnlockedEmailTemplate({ creatorName, accessLink })}`,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return { success: false, error };
  }

  return { success: true };
}
