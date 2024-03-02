import { AES, enc } from "crypto-ts";

// const key = "snipersnevermisstheirtarget";
const key = "snipersnevermisstheirtarget";

// encryption
export function Encrypt(text: string | string[]) {
  const encryptedText = AES.encrypt(text as string, key).toString();

  // Replace '/' with another character (e.g., '-')
  const sanitizedText = encryptedText.replace(/\//g, "-");
  return sanitizedText;
}

// decryption
export function Decrypt(text: string | string[]) {
  // Replace the character back to '/'
  const sanitizedText = (text as string).replace(/-/g, "/");
  return AES.decrypt(sanitizedText, key).toString(enc.Utf8);
}