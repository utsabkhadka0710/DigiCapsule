import crypto from "crypto";

const algorithm = "aes-256-gcm";

const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (encryptedText: string): string => {
  const [ivHex, authTagHex, encryptedHex] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const deCipher = crypto.createDecipheriv(algorithm, key, iv);

  deCipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    deCipher.update(encrypted),
    deCipher.final(),
  ]);

  return decrypted.toString("utf8");
};
