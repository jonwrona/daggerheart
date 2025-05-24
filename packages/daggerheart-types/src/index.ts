// Re-export all types from the main source directory
export * from "../../../src/types/daggerheart/character-sheet";
export * from "../../../src/types/daggerheart/daggerheart";

// Also add version info
export const PACKAGE_VERSION = require("../package.json").version;
