"use server";

export async function sendMail(email: string) {
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
      subject: "Test mail",
      htmlContent: `<p>Hello</p>`,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return { success: false, error };
  }

  return { success: true };
}
