import type IndexedDb from "@/db/IndexedDb";
import { STORES } from "@/db";
import { UUID } from "crypto";

export const createDataPack = async (
  db: IndexedDb,
  name: string = "New data pack"
) => {
  console.log(name);
  const result = await db.putValue(STORES.DATA_PACKS, { name });
  return result;
};
