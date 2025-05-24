"use client";
import { useContext, useEffect } from "react";
import { SettingsContext } from "@/components/settings-context/SettingsContext";

export const ThemeSetter = () => {
  const {
    settings: { theme },
  } = useContext(SettingsContext);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return null;
};
