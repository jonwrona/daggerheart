import React from "react";

import { CSSPropertiesWithVariables } from "@/types";

import "material-icons/iconfont/filled.css";
import "material-icons/iconfont/outlined.css";
import styles from "./Icon.module.scss";

interface IconProps {
  /** The name of the Material Icon (e.g., 'home', 'search', 'favorite') */
  name: string;
  /** Icon variant - outlined, filled, rounded, sharp, or two-tone */
  variant?: "outlined" | "filled";
  /** Size of the icon in pixels */
  size?: number | string;
  /** Color of the icon */
  color?: string;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
  name,
  variant = "filled",
  size = 24,
  color,
  className = "",
  style = {},
}) => {
  // Map variant to the corresponding Material Icons font family
  const getFontFamily = (variant: string) => {
    switch (variant) {
      case "outlined":
        return "Material Icons Outlined";
      default:
        return "Material Icons";
    }
  };

  const iconStyles: CSSPropertiesWithVariables = {
    "--font-family": getFontFamily(variant),
    "--font-size": typeof size === "number" ? `${size}px` : size,
    "--color": color || "inherit",
    ...style,
  };

  return (
    <span className={`${styles.icon} ${className}`} style={iconStyles}>
      {name}
    </span>
  );
};
