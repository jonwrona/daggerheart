import {
  CharacterSheet,
  TraitModifier,
} from "@/types/daggerheart/character-sheet";

export const blankCharacterSheet: CharacterSheet = Object.freeze({
  traits: {
    agility: "" as TraitModifier,
    strength: "" as TraitModifier,
    finesse: "" as TraitModifier,
    instinct: "" as TraitModifier,
    presence: "" as TraitModifier,
    knowledge: "" as TraitModifier,
  },
  currency: 0,
});
