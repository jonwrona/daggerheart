import styles from "./Button.module.scss";
import { CSSPropertiesWithVariables } from "@/types/types";

export const Button = ({
  children,
  className,
  kind = "primary",
  iconOnly = false,
  style,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  kind?: string;
  iconOnly?: boolean;
  style?: CSSPropertiesWithVariables;
  onClick: () => void;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`${styles.button} ${styles[kind]} ${
        iconOnly && styles.icon
      } ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
