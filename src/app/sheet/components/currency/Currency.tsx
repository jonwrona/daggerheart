import { useEffect, useState } from "react";

import styles from "./Currency.module.scss";

type CurrencyProps = {
  total: number;
  setTotal: (newTotal: number) => void;
};

type CurrencySelectorProps = {
  slots?: number;
  count: number;
  adjustCount: (difference: number) => void;
};

const HANDFULS_PER_BAG = 10;
const BAGS_PER_CHEST = 10;
const HANDFULS_PER_CHEST = HANDFULS_PER_BAG * BAGS_PER_CHEST;

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  slots = 10,
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
    console.log("TOTAL UPDATED, RECALCULATING");
    const { handfuls, bags, chests } = calculateCurrencyBreakdown(total);
    setHandfuls(handfuls);
    setBags(bags);
    setChests(chests);
  }, [total]);

  return (
    <div className={styles.currency}>
      <CurrencySelector
        slots={10}
        count={handfuls}
        adjustCount={handleAdjustHandfuls}
      />
      <CurrencySelector
        slots={10}
        count={bags}
        adjustCount={handleAdjustBags}
      />
      handfuls: {handfuls}, bags: {bags}, chests: {chests}
    </div>
  );
};

// 457
// 4 chests
// 5 bags
// 7 handfuls
