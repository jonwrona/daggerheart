import { randomBytes } from "crypto";

export const shortCode = (): string => {
  const numBytes = 3;
  const hexCode = randomBytes(numBytes).toString("hex");
  return hexCode;
};
