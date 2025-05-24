import { useEffect, useState } from "react";
import { Icon } from "@/components/icon/Icon";

import styles from "./Currency.module.scss";
import { clamp } from "@/utils/clamp";

type CurrencyProps = {
  total: number;
  setTotal: (newTotal: number) => void;
  max?: number;
};

type CurrencySelectorProps = {
  label?: string;
  slots: number;
  count: number;
  icon: string;
  adjustCount: (difference: number) => void;
};

type CurrencyIncrementButton = {
  label: string;
  icon: string;
  onClick: () => void;
};

const HANDFULS_PER_BAG = 10;
const BAGS_PER_CHEST = 10;
const HANDFULS_PER_CHEST = HANDFULS_PER_BAG * BAGS_PER_CHEST;

const CurrencyIncrementButton: React.FC<CurrencyIncrementButton> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`${styles.currencySelectorButton} ${styles.currencySelectorIncrement}`}
      onClick={onClick}
      aria-label={label}
    >
      <Icon name={icon} filled />
    </button>
  );
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  slots,
  count,
  icon,
  adjustCount,
}) => {
  const onClick = (newCount: number) => {
    const difference = newCount - count;
    const adjustment = difference === 0 ? -1 : difference;
    adjustCount(adjustment);
  };

  return (
    <div className={styles.currencyButtons}>
      <button
        className={`${styles.currencySelectorButton} ${styles.currencySelectorIncrement}`}
        onClick={() => onClick(count - 1)}
        aria-label={`Remove a ${label}`}
      >
        <Icon name={"remove"} filled />
      </button>
      {Array.from({ length: slots }).map((_, index) => (
        <button
          key={index}
          aria-label={`${index + 1} ${label}`}
          title={`${index + 1} ${label}`}
          className={`
            ${styles.currencySelectorButton} 
          `}
          onClick={() => onClick(index + 1)}
          data-active={index < count}
        >
          <Icon name={icon} filled={index < count} />
        </button>
      ))}
      <button
        className={`${styles.currencySelectorButton} ${styles.currencySelectorIncrement}`}
        onClick={() => onClick(count + 1)}
        aria-label={`Add a label`}
      >
        <Icon name={"add"} />
      </button>
    </div>
  );
};

const calculateCurrencyBreakdown = (total: number) => {
  return {
    handfuls: total % HANDFULS_PER_BAG,
    bags: Math.floor((total % HANDFULS_PER_CHEST) / HANDFULS_PER_BAG),
    chests: Math.floor(total / HANDFULS_PER_CHEST),
  };
};

export const Currency: React.FC<CurrencyProps> = ({
  total,
  setTotal,
  max = Number.MAX_SAFE_INTEGER,
}) => {
  const [handfuls, setHandfuls] = useState(0);
  const [bags, setBags] = useState(0);
  const [chests, setChests] = useState(0);

  const handleSetTotal = (newTotal: number): void => {
    setTotal(clamp(newTotal, 0, max));
  };

  const handleAdjustHandfuls = (difference: number): void => {
    handleSetTotal(total + difference);
  };

  const handleAdjustBags = (difference: number): void => {
    handleSetTotal(total + difference * HANDFULS_PER_BAG);
  };

  const handleAdjustChests = (difference: number): void => {
    handleSetTotal(total + difference * HANDFULS_PER_CHEST);
  };

  useEffect(() => {
    const { handfuls, bags, chests } = calculateCurrencyBreakdown(total);
    setHandfuls(handfuls);
    setBags(bags);
    setChests(chests);
  }, [total]);

  return (
    <div className={styles.currency}>
      <CurrencySelector
        label="handfuls"
        slots={HANDFULS_PER_BAG - 1}
        count={handfuls}
        icon="toll"
        adjustCount={handleAdjustHandfuls}
      />
      <CurrencySelector
        label="bags"
        slots={BAGS_PER_CHEST - 1}
        count={bags}
        icon="money_bag"
        adjustCount={handleAdjustBags}
      />
      <div className={`${styles.chests} ${styles.currencyButtons}`}>
        <CurrencyIncrementButton
          onClick={() => handleAdjustChests(-1)}
          label="Remove a chest"
          icon="remove"
        />
        <Icon name="box" className={styles.chestIcon} />
        <div>
          {chests} {chests !== 1 ? "chests" : "chest"}, {total} total
        </div>
        <div style={{ flex: "1 1 0" }} />
        <CurrencyIncrementButton
          onClick={() => handleAdjustChests(1)}
          label="Add a chest"
          icon="add"
        />
      </div>
    </div>
  );
};
