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
