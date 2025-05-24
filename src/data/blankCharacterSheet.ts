import {
  CharacterSheet,
  TraitModifier,
} from "@/types/daggerheart/character-sheet";
import { BASE_STRESS, UNARMORED } from "@/types/daggerheart/constants";

export const blankCharacterSheet: CharacterSheet = Object.freeze({
  name: "",
  level: 1,
  traits: {
    agility: "" as TraitModifier,
    strength: "" as TraitModifier,
    finesse: "" as TraitModifier,
    instinct: "" as TraitModifier,
    presence: "" as TraitModifier,
    knowledge: "" as TraitModifier,
  },
  currency: 1, // start with a handful of gold
  hope: 2, // start with 2 hope
  evasion: 0, // base depends on class
  armor: UNARMORED(1), // base depends on armor
  hitpoints: { marked: 0, slots: 0 }, // base depends on class
  stress: { marked: 0, slots: BASE_STRESS },
  experience: [],
  characterDescription: {
    clothes: "",
    eyes: "",
    body: "",
    skin: "",
    attitude: "",
    other: "",
  },
  backgroundQuestions: [],
  connections: [],
  advancements: [],
});
