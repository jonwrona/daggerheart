import { randomBytes } from "crypto";

export const shortCode = (): string => {
  const crypto = require("crypto");
  const numBytes = 3;
  const hexCode = crypto.randomBytes(numBytes).toString("hex");
  return hexCode;
};
