#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Paths
const sourceDir = path.join(__dirname, "..", "src", "types", "daggerheart");
const targetFile = path.join(
  __dirname,
  "..",
  "packages",
  "daggerheart-types",
  "src",
  "index.ts"
);

// Read the source files
const characterSheetPath = path.join(sourceDir, "character-sheet.d.ts");
const daggerheartPath = path.join(sourceDir, "daggerheart.d.ts");

let output = [];

// Helper function to process TypeScript files
function processTypeFile(filePath, filename) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: ${filename} not found at ${filePath}`);
    return "";
  }

  const content = fs.readFileSync(filePath, "utf8");

  // Remove export/import statements and clean up
  const cleaned = content
    .replace(/^import.*$/gm, "") // Remove import statements
    .replace(/^export\s+/gm, "export ") // Normalize export statements
    .replace(/^\s*$/gm, "") // Remove empty lines
    .split("\n")
    .filter((line) => line.trim()) // Remove empty lines
    .join("\n");

  return cleaned;
}

// Process files
const characterSheetTypes = processTypeFile(
  characterSheetPath,
  "character-sheet.d.ts"
);
const daggerheartTypes = processTypeFile(daggerheartPath, "daggerheart.d.ts");

// Build the output
output.push("// This file is auto-generated. Do not edit manually.");
output.push("// Run `npm run sync-types` to update from source files.");
output.push("");

if (characterSheetTypes) {
  output.push("// === Character Sheet Types ===");
  output.push(characterSheetTypes);
  output.push("");
}

if (daggerheartTypes) {
  output.push("// === Game System Types ===");
  output.push(daggerheartTypes);
  output.push("");
}

// Write the output
const finalContent = output.join("\n");
fs.writeFileSync(targetFile, finalContent);

console.log(`✅ Types synced successfully to ${targetFile}`);
console.log(
  `📦 Generated ${finalContent.split("\n").length} lines from source files`
);
