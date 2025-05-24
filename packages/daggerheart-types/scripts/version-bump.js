#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const versionType = process.argv[2] || "patch";
const packageJsonPath = path.join(__dirname, "..", "package.json");

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const currentVersion = packageJson.version;

// Parse version
const [major, minor, patch] = currentVersion.split(".").map(Number);

// Calculate new version
let newVersion;
switch (versionType) {
  case "major":
    newVersion = `${major + 1}.0.0`;
    break;
  case "minor":
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case "patch":
  default:
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

console.log(`Version bumped from ${currentVersion} to ${newVersion}`);

// Export for GitHub Actions
console.log(`::set-output name=new_version::${newVersion}`);
