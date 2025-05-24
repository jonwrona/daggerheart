"use client";
import {
  createContext,
  useState,
  useEffect,
  useReducer,
  type Dispatch,
} from "react";
import type { Settings } from "@/types/settings";
import { defaultSettings, LOCAL_STORAGE_KEY } from "@/data/defaultSettings";

interface SettingsProviderProps {
  children: React.ReactNode;
}

interface SettingsContextType {
  settings: Settings;
  settingsDispatch: Dispatch<Partial<Settings>>;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  settingsDispatch: () => {},
});

const reducer = (state: Settings, updated: Partial<Settings>) => {
  return { ...state, ...updated };
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, defaultSettings);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        dispatch(JSON.parse(stored));
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoading]);

  return (
    <SettingsContext.Provider
      value={{ settings: state, settingsDispatch: dispatch }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
