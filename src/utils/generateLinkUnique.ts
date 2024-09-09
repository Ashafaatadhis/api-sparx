import crypto from "crypto";

export default function generateLinkUnique(length: number = 32): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomBytes(1)[0] % charactersLength;
    result += characters[randomIndex];
  }

  return result;
}
