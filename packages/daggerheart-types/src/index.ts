// This file is auto-generated. Do not edit manually.
// Run `npm run sync-types` to update from source files.

// === Character Sheet Types ===
export type TraitModifier = number | "" | "-";
export type Traits = {
  agility: TraitModifier;
  strength: TraitModifier;
  finesse: TraitModifier;
  instinct: TraitModifier;
  presence: TraitModifier;
  knowledge: TraitModifier;
};
export type Hitpoints = {
  marked: number;
  slots: number;
};
export type Stress = {
  marked: number;
  slots: number;
};
export type Armor = {
  marked: number;
  score: number;
  thresholds: Thresholds;
};
export type Experience = {
  descriptor: string;
  modifier: number;
};
export type Questions = {
  question: string;
  answer: string;
};
export interface Advancement {}
export interface AdvancementTier2 extends Advancement {}
export interface AdvancementTier3 extends Advancement {}
export interface AdvancementTier4 extends Advancement {}
export type CharacterSheet = {
  name: string;
  level: Level;
  traits: Traits;
  currency: number;
  hope: number;
  evasion: number;
  armor: Armor;
  hitpoints: Hitpoints;
  stress: Stress;
  primaryWeapon?: Extract<ItemWeapon, { slot: "primary" }>;
  secondaryWeapon?: Extract<ItemWeapon, { slot: "secondary" }>;
  equippedArmor?: ItemArmor;
  inventory: Item[];
  class?: Class;
  ancestry?: Ancestry;
  community?: Community;
  experience: Experience[];
  characterDescription: {
    clothes: string;
    eyes: string;
    body: string;
    skin: string;
    attitude: string;
    other: string;
  };
  backgroundQuestions: Questions[];
  connections: Questions[];
  advancements: Advancement[];
};

// === Game System Types ===
export type CardType = "ability" | "spell" | "grimoire";
export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Domain =
  | "arcana"
  | "blade"
  | "bone"
  | "codex"
  | "grace"
  | "midnight"
  | "sage"
  | "splendor"
  | "valor";
export type Trait =
  | "agility"
  | "strength"
  | "finesse"
  | "instinct"
  | "presence"
  | "knowledge";
export type Range = "melee" | "very close" | "close" | "far" | "very far";
export type DamageType = "physical" | "magic";
export type Burden = "one-handed" | "two-handed";
export interface Feature {
  name: string;
  description: string;
  charges?: number;
}
export interface DomainCard {
  name: string;
  level: number;
  domain: Domain;
  type: CardType;
  recallCost: number;
  feature: string;
}
export interface Class {
  name: string;
  domains: Domain[];
  subclasses: Subclass[];
  startingEvasionScore: number;
  startingHitPoints: number;
  items: string[];
  hopeFeature: Feature | Feature[];
  classFeature: Feature | Feature[];
}
export interface Subclass {
  name: string;
  foundationFeature: Feature | Feature[];
  specializationFeature: Feature | Feature[];
  masteryFeature: Feature | Feature[];
}
export type Ancestry = {
  name: string;
  features: Feature | Feature[];
};
export type Community = {
  name: string;
  features: Feature | Feature[];
};
export interface Item {
  name: string;
  feature?: Feature | Feature[];
}
export interface ItemWeapon extends Item {
  type: "primary" | "secondary";
  trait: Trait;
  range: Range;
  damage: `${number}d${number}`;
  damageType: DamageType;
  burden: Burden;
}
export type Thresholds = {
  major: number;
  severe: number;
};
export interface ItemArmor extends Item {
  baseThresholds: Thresholds;
  baseScore: number;
}

// === Constants ===
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
