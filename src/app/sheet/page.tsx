"use client";
import { CharacterSheetMenu } from "./components/CharacterSheetMenu";
import styles from "./page.module.scss";

const CharacterSheet = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <CharacterSheetMenu />
      <div className={`${styles.grid}`}></div>
    </div>
  );
};

export default CharacterSheet;
