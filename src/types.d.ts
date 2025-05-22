import { CSSProperties } from "react";

export interface CSSPropertiesWithVariables extends CSSProperties {
  [key: `--${string}`]: string | number;
}
