"use client";
import { useState } from "react";
import { CharacterSheetMenu } from "./components/character-sheet-menu/CharacterSheetMenu";
import { DiceRoll } from "./components/dice-roll/DiceRoll";
import { MarkdownField } from "./components/markdown-field/MarkdownField";
import { RollLog, RollLogProvider } from "./components/roll-log/RollLog";
import styles from "./page.module.scss";

const CharacterSheet = () => {
  const [markdownTest, setMarkdownTest] = useState<string>(`
# Character Name

This is a test character sheet.

## Attributes
- Strength: 10
- Dexterity: 12
- Constitution: 14
- Intelligence: 16
- Wisdom: 18
- Charisma: 20

This is what a dice roller looks like <roll:2d6+8> inline.
        `);

  return (
    <RollLogProvider>
      <div className={`${styles.wrapper}`}>
        <CharacterSheetMenu />
        <div className={`${styles.grid}`}>
          <DiceRoll>1d4</DiceRoll>
          <MarkdownField
            markdown={markdownTest}
            setMarkdown={setMarkdownTest}
          />
        </div>
      </div>
      <RollLog />
    </RollLogProvider>
  );
};

export default CharacterSheet;
