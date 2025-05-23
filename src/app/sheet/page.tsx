"use client";
import { useReducer } from "react";
import { CharacterSheetMenu } from "./components/character-sheet-menu/CharacterSheetMenu";
import { DiceRoll } from "./components/dice-roll/DiceRoll";
import { RollLog, RollLogProvider } from "./components/roll-log/RollLog";
import { CharacterTraits } from "./components/character-traits/CharacterTraits";
import type {
  CharacterSheet,
  TraitModifier,
  Traits,
} from "@/types/daggerheart/character-sheet";
import { blankCharacterSheet } from "@/data/blankCharacterSheet";
import styles from "./page.module.scss";

const reducer = (state: CharacterSheet, updated: Partial<CharacterSheet>) => {
  return { ...state, ...updated };
};

const CharacterSheet = () => {
  const [state, dispatch] = useReducer(reducer, blankCharacterSheet);

  const setTrait = (trait: keyof Traits, newModifier: TraitModifier) => {
    dispatch({
      traits: {
        ...state.traits,
        [trait]: newModifier,
      },
    });
  };

  return (
    <RollLogProvider>
      <div className={`${styles.wrapper}`}>
        <CharacterSheetMenu />
        <div className={`${styles.grid}`}>
          <CharacterTraits traits={state.traits} setTrait={setTrait} />
          <DiceRoll>1d4</DiceRoll>
        </div>
        <div>
          <code style={{ whiteSpace: "pre" }}>
            {JSON.stringify(state, null, 2)}
          </code>
        </div>
      </div>
      <RollLog />
    </RollLogProvider>
  );
};

export default CharacterSheet;
