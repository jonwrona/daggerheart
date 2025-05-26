import styles from "./Button.module.scss";
import { CSSPropertiesWithVariables } from "@/types/types";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSPropertiesWithVariables;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  style,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
