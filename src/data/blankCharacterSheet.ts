import { CharacterSheet } from "@/types/daggerheart/character-sheet";

export const blankCharacterSheet: CharacterSheet = Object.freeze({
  traits: {
    agility: "",
    strength: "",
    finesse: "",
    instinct: "",
    presence: "",
    knowledge: "",
  },
});
