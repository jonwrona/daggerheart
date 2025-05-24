"use client";
import { useReducer, useState, useEffect, useRef } from "react";
import { CharacterSheetMenu } from "./components/character-sheet-menu/CharacterSheetMenu";
import { DiceRoll } from "./components/dice-roll/DiceRoll";
import { RollLog, RollLogProvider } from "./components/roll-log/RollLog";
import { CharacterTraits } from "./components/character-traits/CharacterTraits";
import { Currency } from "./components/currency/Currency";
import type {
  CharacterSheet,
  TraitModifier,
  Traits,
} from "@/types/daggerheart/character-sheet";
import { blankCharacterSheet } from "@/data/blankCharacterSheet";
import styles from "./page.module.scss";
import { saveJSONToFile } from "@/utils/jsonFileManagement";
import { FileSelector } from "@/components/file-selector/FileSelector";

const reducer = (state: CharacterSheet, updated: Partial<CharacterSheet>) => {
  return { ...state, ...updated };
};

const LOCAL_STORAGE_KEY = "characterSheet";

const CharacterSheet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, blankCharacterSheet);
  const fileSelectorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        dispatch(JSON.parse(stored));
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoading]);

  const setTrait = (trait: keyof Traits, newModifier: TraitModifier) => {
    dispatch({
      traits: {
        ...state.traits,
        [trait]: newModifier,
      },
    });
  };

  const setCurrency = (newCurrency: number) => {
    dispatch({
      currency: Math.max(0, newCurrency),
    });
  };

  const handleSave = () => {
    saveJSONToFile(state);
  };

  const handleOpen = () => {
    fileSelectorRef.current?.click();
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <RollLogProvider>
      <div className={`${styles.wrapper}`}>
        <CharacterSheetMenu handleSave={handleSave} handleOpen={handleOpen} />
        <div className={`${styles.grid}`}>
          <CharacterTraits traits={state.traits} setTrait={setTrait} />
          <DiceRoll>1d4</DiceRoll>
          <Currency total={state.currency} setTotal={setCurrency} />
        </div>
        <div>
          <code style={{ whiteSpace: "pre" }}>
            {JSON.stringify(state, null, 2)}
          </code>
        </div>
      </div>
      <RollLog />
      <FileSelector inputRef={fileSelectorRef} handleLoad={dispatch} />
    </RollLogProvider>
  );
};

export default CharacterSheet;
