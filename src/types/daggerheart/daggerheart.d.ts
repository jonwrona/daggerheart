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

export interface DomainCard {
  id: string;
  name: string;
  level: number;
  domain: Domain;
  type: CardType;
  recallCost: number;
  feature: string; // feature description
}

export interface Class {
  id: string;
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
  id: string;
  name: string;
  foundationFeature: Feature | Feature[]; // foundation feature description
  specializationFeature: Feature | Feature[]; // specialization feature description
  masteryFeature: Feature | Feature[]; // mastery feature description
}

export interface Feature {
  id: string;
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
