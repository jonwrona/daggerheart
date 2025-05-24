import { Armor } from "./character-sheet";

export const MAX_ARMOR = 12;
export const MAX_HOPE = 12;
export const BASE_STRESS = 6;

export const UNARMORED = (level: number = 1): Armor => ({
  marked: 0,
  score: 0,
  thresholds: {
    major: level * 1,
    severe: level * 2,
  },
});
