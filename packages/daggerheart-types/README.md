# Daggerheart Types

TypeScript type definitions for the Daggerheart tabletop RPG system.

## Installation

```bash
# Install from GitHub Packages
npm install @jonwrona/daggerheart-types

# Or add to package.json
{
  "dependencies": {
    "@jonwrona/daggerheart-types": "^1.0.0"
  }
}
```

### GitHub Packages Setup

To install from GitHub Packages, you'll need to configure npm to use GitHub's registry for this package. Create or update your `.npmrc` file:

```
@your-username:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Or authenticate with:

```bash
npm login --scope=@your-username --registry=https://npm.pkg.github.com
```

## Usage

```typescript
import {
  CharacterSheet,
  Traits,
  DomainCard,
  Class,
  Ancestry,
} from "@your-username/daggerheart-types";

// Create a character
const character: CharacterSheet = {
  name: "Thorin Ironforge",
  traits: {
    agility: 1,
    strength: 3,
    finesse: 0,
    instinct: 2,
    presence: 1,
    knowledge: 2,
  },
  currency: 150,
};

// Use domain cards
const fireballCard: DomainCard = {
  id: "spell-fireball",
  name: "Fireball",
  level: 3,
  domain: "arcana",
  type: "spell",
  recallCost: 2,
  feature: "Deal 2d8 fire damage to target",
};
```

## Available Types

### Character Sheet

- `CharacterSheet` - Complete character data structure
- `Traits` - Character ability scores
- `TraitModifier` - Valid modifier values

### Game System

- `DomainCard` - Spell/ability/grimoire cards
- `Class` - Character classes
- `Subclass` - Class specializations
- `Ancestry` - Character ancestries
- `Community` - Character communities
- `Feature` - Game features and abilities

## Development

This package is automatically generated from the main Daggerheart Tools repository. Types are located in `src/types/daggerheart/` in the main codebase.

## License

MIT License - see the main repository for details.
