import {
  Item,
  ItemWeapon,
  Thresholds,
  Level,
  Ancestry,
  Community,
} from "./daggerheart";

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

// TODO set up advancements for levelling up
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
  evasion: number; // base depends on class
  armor: Armor; // base depends on armor
  hitpoints: Hitpoints; // base depends on class
  stress: Stress;
  // equipment
  primaryWeapon?: Extract<ItemWeapon, { slot: "primary" }>;
  secondaryWeapon?: Extract<ItemWeapon, { slot: "secondary" }>;
  equippedArmor?: ItemArmor;
  inventory: Item[];
  //
  class?: Class;
  ancestry?: Ancestry;
  community?: Community;
  experience: Experience[];
  // background
  characterDescription: {
    clothes: string;
    eyes: string;
    body: string;
    skin: string;
    attitude: string;
    other: string;
  };
  backgroundQuestions: BackgroundQuestions[];
  connections: Questions[];
  // TODO: leveling up
  advancements: Advancement[];
};
