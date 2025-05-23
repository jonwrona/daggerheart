import type {
  Traits,
  TraitModifier,
} from "@/types/daggerheart/character-sheet";
import { useState } from "react";
import styles from "./CharacterTraits.module.scss";

interface CharacterTraitProps {
  trait:
    | "Agility"
    | "Strength"
    | "Finesse"
    | "Instinct"
    | "Presence"
    | "Knowledge";
  exampleActions: string[];
  modifier: TraitModifier;
  setTrait?: (value: TraitModifier) => void;
}

const CharacterTrait: React.FC<CharacterTraitProps> = ({
  trait,
  exampleActions,
  modifier,
  setTrait,
}) => {
  const [editing] = useState(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (
      event.target.value === "" ||
      event.target.value === "-" ||
      event.target.value === "+"
    ) {
      setTrait?.(event.target.value);
    } else if (!isNaN(newValue)) {
      setTrait?.(newValue);
    }
  };

  return (
    <div className={styles.characterTrait}>
      <div className={styles.label}>{trait}</div>
      {editing && setTrait ? (
        <input value={modifier} onChange={onChange} />
      ) : (
        modifier
      )}
      <div className={styles.examples}>{exampleActions.join("\n")}</div>
    </div>
  );
};

interface CharacterTraitsProps {
  traits: Traits;
  setTrait: (trait: keyof Traits, modifier: TraitModifier) => void;
}

export const CharacterTraits: React.FC<CharacterTraitsProps> = ({
  traits,
  setTrait,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.characterTraits}>
        <CharacterTrait
          trait="Agility"
          exampleActions={["Sprint", "Leap", "Maneuver"]}
          modifier={traits.agility}
          setTrait={(value) => setTrait("agility", value)}
        />
        <CharacterTrait
          trait="Strength"
          exampleActions={["Lift", "Smash", "Grapple"]}
          modifier={traits.strength}
          setTrait={(value) => setTrait("strength", value)}
        />
        <CharacterTrait
          trait="Finesse"
          exampleActions={["Control", "Hide", "Tinker"]}
          modifier={traits.finesse}
          setTrait={(value) => setTrait("finesse", value)}
        />
        <CharacterTrait
          trait="Instinct"
          exampleActions={["Perceive", "Sense", "Navigate"]}
          modifier={traits.instinct}
          setTrait={(value) => setTrait("instinct", value)}
        />
        <CharacterTrait
          trait="Presence"
          exampleActions={["Charm", "Perform", "Deceive"]}
          modifier={traits.presence}
          setTrait={(value) => setTrait("presence", value)}
        />
        <CharacterTrait
          trait="Knowledge"
          exampleActions={["Recall", "Analyze", "Comprehend"]}
          modifier={traits.knowledge}
          setTrait={(value) => setTrait("knowledge", value)}
        />
      </div>
    </div>
  );
};
