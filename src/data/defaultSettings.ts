import type { Settings } from "@/types/settings";

export const defaultSettings: Settings = Object.freeze({
  theme: "browser",
});

export const LOCAL_STORAGE_KEY = "settings";
