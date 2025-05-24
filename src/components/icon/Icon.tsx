import React from "react";

import { CSSPropertiesWithVariables } from "@/types/react";

import "material-symbols";
import styles from "./Icon.module.scss";

interface IconProps {
  /** The name of the Material symbol (e.g., 'home', 'search', 'favorite') */
  name: string;
  /** Fill icon */
  filled?: boolean;
  /** Size of the icon in pixels */
  size?: number | string;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size,
  filled = false,
  className = "",
  style = {},
}) => {
  const iconStyles: CSSPropertiesWithVariables = {
    "--size": size ? (typeof size === "string" ? size : `${size}px`) : "",
    "--font-settings": `'FILL' ${
      filled ? 1 : 0
    }, 'wght' 400, 'GRAD' 0, 'opsz' 48`,
  };

  return (
    <span
      className={`material-symbols-outlined ${styles.icon} ${className}`}
      style={{ ...iconStyles, ...style }}
    >
      {name}
    </span>
  );
};
