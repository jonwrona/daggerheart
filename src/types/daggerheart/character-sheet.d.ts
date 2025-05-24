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
  traits: Traits;
  currency: number;
};
