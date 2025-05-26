export type CardType = "ability" | "spell" | "grimoire";
export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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
  // cooldown?
}

export interface DomainCard {
  name: string;
  level: number;
  domain: string;
  type: CardType;
  recallCost: number;
  feature: string; // feature description
}

export interface Class {
  name: string;
  domains: string[];
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
