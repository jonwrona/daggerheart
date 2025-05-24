export const clamp = (num: number, min: number, max: number): number => {
  if (min > max) {
    throw new Error("clampNum error: min value must be less than max value");
  }
  return Math.max(min, Math.min(max, num));
};
