import { useEffect, useState } from "react";

import styles from "./Currency.module.scss";

type CurrencyProps = {
  total: number;
  setTotal: (newTotal: number) => void;
};

type CurrencySelectorProps = {
  label?: string;
  slots: number;
  count: number;
  adjustCount: (difference: number) => void;
};

const HANDFULS_PER_BAG = 10;
const BAGS_PER_CHEST = 10;
const HANDFULS_PER_CHEST = HANDFULS_PER_BAG * BAGS_PER_CHEST;

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  label,
  slots,
  count,
  adjustCount,
}) => {
  const onClick = (newCount: number) => {
    const difference = newCount - count;
    const adjustment = difference === 0 ? -1 : difference;
    adjustCount(adjustment);
  };

  return (
    <div>
      {label && (
        <span>
          {label} ({count}):{" "}
        </span>
      )}
      <button
        className={styles.currencySelectorButtonMinus}
        onClick={() => onClick(count - 1)}
      >
        -
      </button>
      {Array.from({ length: slots }).map((_, index) => (
        <button
          key={index}
          className={`
            ${styles.currencySelectorButton} 
            ${index < count && styles.active}
          `}
          onClick={() => onClick(index + 1)}
        >
          {index < count ? "X" : "_"}
        </button>
      ))}
      <button
        className={styles.currencySelectorButtonPlus}
        onClick={() => onClick(count + 1)}
      >
        +
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

export const Currency: React.FC<CurrencyProps> = ({ total, setTotal }) => {
  const [handfuls, setHandfuls] = useState(0);
  const [bags, setBags] = useState(0);
  const [chests, setChests] = useState(0);

  const handleAdjustHandfuls = (difference: number) => {
    setTotal(total + difference);
  };

  const handleAdjustBags = (difference: number) => {
    setTotal(total + difference * HANDFULS_PER_BAG);
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
        adjustCount={handleAdjustHandfuls}
      />
      <CurrencySelector
        label="bags"
        slots={BAGS_PER_CHEST - 1}
        count={bags}
        adjustCount={handleAdjustBags}
      />
      chests: {chests}
      <br />
      total: {total}
    </div>
  );
};
