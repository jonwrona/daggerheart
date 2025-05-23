import { useContext, useMemo } from "react";
import { Icon } from "@/components/icon/Icon";
import { RollLogContext, RollLogEntry } from "../roll-log/RollLog";
import styles from "./DiceRoll.module.scss";

interface DiceRollValues {
  rollString: string;
  numDice: number;
  numSides: number;
  modifier: number;
}

export interface DiceRollResult {
  rollString: string;
  rolls: number[];
  total: number;
  modifier: number;
  finalResult: number;
}

interface DiceRollProps {
  children: string;
  onRoll?: (result: DiceRollResult) => void;
}

export const DiceRoll: React.FC<DiceRollProps> = ({ children, onRoll }) => {
  const { addRoll } = useContext(RollLogContext);

  const diceRollValues = useMemo((): DiceRollValues | Error => {
    const trimmedChildren = children.trim();
    const regex = /^(\d+)d(\d+)([+-]\d+)?$/;
    const match = trimmedChildren.match(regex);

    if (!match) {
      return new Error(`Invalid dice roll format`);
    }

    const [rollStr, diceStr, sidesStr, modifierStr] = match;
    return {
      rollString: rollStr,
      numDice: parseInt(diceStr),
      numSides: parseInt(sidesStr),
      modifier: modifierStr ? parseInt(modifierStr) : 0,
    };
  }, [children]);

  if (diceRollValues instanceof Error) {
    return (
      <span
        className={`${styles.diceRollError}`}
        title={diceRollValues.message}
      >
        {children}
      </span>
    );
  }

  const roll = () => {
    const { rollString, numDice, numSides, modifier } = diceRollValues;
    // Generate random rolls for the dice
    // and calculate the total
    const rolls = Array.from(
      { length: numDice },
      () => Math.floor(Math.random() * numSides) + 1
    );
    const total = rolls.reduce((acc, roll) => acc + roll, 0);
    const finalResult = total + modifier;

    const rollResult: RollLogEntry = {
      id: crypto.randomUUID(),
      rollString,
      rolls,
      total,
      modifier,
      finalResult,
    };

    addRoll(rollResult);
    onRoll?.(rollResult);
  };

  return (
    <a className={`${styles.diceRoll}`} onClick={roll}>
      <Icon
        name="casino"
        variant="outlined"
        size="inherit"
        className={styles.diceRollIcon}
      />
      <span className={`${styles.label}`}>{children}</span>
    </a>
  );
};
