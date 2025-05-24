import { createContext, useContext, useMemo, useState } from "react";
import { DiceRollResult } from "../dice-roll/DiceRoll";
import styles from "./RollLog.module.scss";
import { CSSPropertiesWithVariables } from "@/types/types";

export interface RollLogEntry extends DiceRollResult {
  id: string;
  style?: CSSPropertiesWithVariables;
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
  maxLength = 100,
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
  style,
}) => {
  const modifierOperator = modifier > 0 ? "+" : "-";
  return (
    <div className={styles.rollEntry} style={style}>
      <div className={styles.rollEntryContent}>
        <strong>{rollString}:</strong>{" "}
        {rolls.length > 1 ? `${rolls.join(" + ")} = ` : ""}
        {modifier
          ? `${total} ${modifierOperator} ${Math.abs(modifier)} = `
          : ""}
        <strong className={styles.result}>{finalResult}</strong>
      </div>
    </div>
  );
};

interface RollLogProps {
  maxLength?: number;
}

export const RollLog: React.FC<RollLogProps> = ({ maxLength = 5 }) => {
  const { log } = useContext(RollLogContext);

  const trimmedLog = useMemo(() => {
    return log.slice(-maxLength);
  }, [log, maxLength]);

  if (trimmedLog.length === 0) {
    return null;
  }

  return (
    <div className={styles.rollLog}>
      {trimmedLog.map((entry, index) => (
        <RollLogEntry
          key={entry.id}
          {...entry}
          style={{
            "--roll-entry-index": index + 1,
            "--roll-entry-count": trimmedLog.length,
          }}
        />
      ))}
    </div>
  );
};
