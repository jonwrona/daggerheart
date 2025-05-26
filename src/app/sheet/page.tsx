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
import { blankCharacterSheet } from "@/data/characterSheet";
import styles from "./page.module.scss";
import { saveJSONToFile } from "@/utils/jsonFileManagement";
import { FileSelector } from "@/components/file-selector/FileSelector";
import { AutoWidthInput } from "@/components/auto-width-input/AutoWidthInput";
import slugify from "slugify";

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

  const setName = (newName: string) => {
    dispatch({ name: newName });
  };

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

  const generateFilename = () =>
    `${slugify(state.name, { lower: true, strict: true })}.character`;

  const handleSave = () => {
    saveJSONToFile(state, generateFilename());
  };

  const handleOpen = () => {
    fileSelectorRef.current?.click();
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <RollLogProvider>
      <CharacterSheetMenu handleSave={handleSave} handleOpen={handleOpen} />
      <div className={styles.sheet}>
        <AutoWidthInput
          placeholder="Character Name"
          className={styles.name}
          value={state.name}
          setValue={setName}
          maxLength={50}
        />
        <CharacterTraits traits={state.traits} setTrait={setTrait} />
        <h1>
          <DiceRoll>1d4</DiceRoll>
        </h1>
        <Currency total={state.currency} setTotal={setCurrency} max={999} />
      </div>
      <RollLog />
      <FileSelector inputRef={fileSelectorRef} handleLoad={dispatch} />
    </RollLogProvider>
  );
};

export default CharacterSheet;
