import { createContext, useContext, useId, useState } from "react";
import { DiceRollResult } from "../dice-roll/DiceRoll";
import styles from "./RollLog.module.scss";

export interface RollLogEntry extends DiceRollResult {
  id: string;
}

interface RollLogContextType {
  log: RollLogEntry[];
  addRoll: (roll: RollLogEntry) => void;
}

interface RollLogProviderProps {
  maxLength?: number;
  children: React.ReactNode;
}

const defaultContext: RollLogContextType = {
  log: [],
  addRoll: () => void 0,
};

export const RollLogContext = createContext<RollLogContextType>(defaultContext);

export const RollLogProvider: React.FC<RollLogProviderProps> = ({
  maxLength = 15,
  children,
}) => {
  const [log, setLog] = useState<RollLogEntry[]>([]);

  const addRoll = (roll: RollLogEntry) => {
    setLog((prevLog) => {
      const newLog = [...prevLog, roll];
      return newLog.length > maxLength ? newLog.slice(-maxLength) : newLog;
    });
  };

  return (
    <RollLogContext.Provider value={{ log, addRoll }}>
      {children}
    </RollLogContext.Provider>
  );
};

const RollLogEntry: React.FC<RollLogEntry> = ({
  rollString,
  rolls,
  total,
  modifier,
  finalResult,
}) => {
  const modifierOperator = modifier > 0 ? "+" : "-";
  return (
    <div className={styles.rollEntry}>
      {rollString}: {rolls.length > 1 ? `${rolls.join(" + ")} = ` : ""}
      {modifier ? `${total} ${modifierOperator} ${Math.abs(modifier)} = ` : ""}
      <strong>{finalResult}</strong>
    </div>
  );
};

export const RollLog = () => {
  const { log } = useContext(RollLogContext);

  if (log.length === 0) {
    return null;
  }

  return (
    <div className={styles.rollLog}>
      {log.map((entry) => (
        <RollLogEntry key={entry.id} {...entry} />
      ))}
    </div>
  );
};
