import type IndexedDb from "@/db/IndexedDb";

export const createDataPack = async (
  db: IndexedDb,
  name: string = "New data pack"
) => {
  console.log(name);
  const result = await db.putValue("data_packs", { name });
  return result;
};
