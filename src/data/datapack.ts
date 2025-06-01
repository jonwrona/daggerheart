import type IndexedDb from "@/db/IndexedDb";
import type { UUID } from "crypto";

export const createDataPack = async (
  db: IndexedDb,
  name: string = "New data pack"
) => {
  console.log(name);
  const result = await db.putValue("data_packs", { name });
  return result;
};

export const getDataPackData = async (db: IndexedDb, dataPackID: UUID) => {
  const dataPack = (await db.getValue("data_packs", dataPackID)) as any;
  const domainCards = (await db.getAllValueByIndex(
    "domain_cards",
    "byDataPackUUID",
    dataPackID
  )) as any;

  if (!dataPack) {
    console.error("No current datapack");
    return;
  }

  dataPack._type = "data_packs";
  domainCards.forEach(
    (value: Record<string, any>) => (value._type = "domain_cards")
  );

  return [dataPack, ...domainCards];
};

export const importDataPackData = async (
  db: IndexedDb,
  dataPackData: Array<any>
) => {
  for (const entry of dataPackData) {
    const type = entry._type;
    delete entry._type;
    db.putValue(type, entry);
  }
};
