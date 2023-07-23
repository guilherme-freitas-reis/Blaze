/* eslint-disable @typescript-eslint/ban-ts-comment */
import crypto from "crypto";
import { env } from "process";

interface EncryptProps {
  data: string;
}

interface DecryptProps {
  encryptedData: string;
}

export function encrypt({ data }: EncryptProps) {
  const iv = crypto.randomBytes(16);
  const key = crypto
    .createHash("sha256")
    .update(env.CRYPTO_SECRET as string)
    .digest("base64")
    .substr(0, 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt({ encryptedData }: DecryptProps) {
  const textParts = encryptedData.split(":");

  // @ts-ignore
  const iv = Buffer.from(textParts.shift(), "hex");

  const encryptedResult = Buffer.from(textParts.join(":"), "hex");
  const key = crypto
    .createHash("sha256")
    .update(env.CRYPTO_SECRET as string)
    .digest("base64")
    .substr(0, 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  const decrypted = decipher.update(encryptedResult);
  const decryptedText = Buffer.concat([decrypted, decipher.final()]);
  return decryptedText.toString();
}
