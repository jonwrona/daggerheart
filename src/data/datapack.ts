import { DataPack } from "@/types/daggerheart/data";

export const createDataPack = (name: string): DataPack => {
  return {
    id: crypto.randomUUID(),
    name: name,
    data: {},
  };
};
