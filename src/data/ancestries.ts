import { Ancestry } from "../types/daggerheart/daggerheart";
import { shortCode } from "@/utils/shortCode";

const generateAncestryId = (name: string): string => {
  return `happy-little-games--ancestry--${name}`;
};

const generateFeatureId = () => {
  return `happy-little-games--feature--${shortCode()}`;
};

export const ancestries: Ancestry[] = [
  {
    id: generateAncestryId("clank"),
    name: "Clank",
    features: [
      {
        id: generateFeatureId(),
        name: "Purposeful Design",
        description: `Decide who made you and for what purpose. At character creation, choose one of your Experiences that best aligns with this purpose and gain a permanent +1 bonus to it.`,
      },
      {
        id: generateFeatureId(),
        name: "Efficient",
        description: `When you take a short rest, you can choose a long rest move instead of a short rest move.`,
      },
    ],
  },
  // Add more ancestries as needed
];
