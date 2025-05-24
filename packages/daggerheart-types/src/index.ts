// This file is auto-generated. Do not edit manually.
// Run `npm run sync-types` to update from source files.

// === Character Sheet Types ===
export type TraitModifier = number | "" | "-" | "+";
export type Traits = {
  agility: TraitModifier;
  strength: TraitModifier;
  finesse: TraitModifier;
  instinct: TraitModifier;
  presence: TraitModifier;
  knowledge: TraitModifier;
};
export type CharacterSheet = {
  name: string;
  traits: Traits;
  currency: number;
};

// === Game System Types ===
type CardType = "ability" | "spell" | "grimoire";
type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type Domain =
  | "arcana"
  | "blade"
  | "bone"
  | "codex"
  | "grace"
  | "midnight"
  | "sage"
  | "splendor"
  | "valor";
type Trait =
  | "agility"
  | "strength"
  | "finesse"
  | "instinct"
  | "presence"
  | "knowledge";
type Range = "melee" | "very close" | "close" | "far" | "very far";
type DamageType = "physical" | "magic";
type Burden = "one-handed" | "two-handed";
export interface DomainCard {
  name: string;
  level: number;
  domain: Domain;
  type: CardType;
  recallCost: number;
  feature: string; // feature description
}
export interface Class {
  name: string;
  domains: Domain[];
  subclasses: Subclass[];
  startingEvasionScore: number;
  startingHitPoints: number;
  items: string[]; // class items
  hopeFeature: Feature | Feature[]; // hope feature description
  classFeature: Feature | Feature[]; // class feature(s) description
}
export interface Subclass {
  name: string;
  foundationFeature: Feature | Feature[]; // foundation feature description
  specializationFeature: Feature | Feature[]; // specialization feature description
  masteryFeature: Feature | Feature[]; // mastery feature description
}
export interface Feature {
  name: string;
  description: string;
  charges?: number;
  // cooldown?
}
export interface Ancestry {
  id: string;
  name: string;
  features: Feature | Feature[];
}
export interface Community {
  id: string;
  name: string;
  features: Feature | Feature[];
}
export interface Weapon {
  name: string;
  type: "primary" | "secondary";
  trait: Trait;
  range: Range;
  damage: `${number}d${number}`;
  damageType: DamageType;
  burden: Burden;
  feature?: Feature | Feature[];
}
export interface Armor {
  name: string;
  baseThresholdMajor: number;
  baseThresholdSevere: number;
  baseScore: number;
  feature?: Feature | Feature[];
}

// === Package Metadata ===
export const PACKAGE_VERSION = require('../package.json').version;