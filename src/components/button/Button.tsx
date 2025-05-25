import styles from "./Button.module.scss";
import { CSSPropertiesWithVariables } from "@/types/types";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSPropertiesWithVariables;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  style,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
