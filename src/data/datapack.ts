import type IndexedDb from "@/db/IndexedDb";
import type { UUID } from "crypto";
import type { DataPackDB, DomainCardDB, AncestryDB } from "@/db";

// Type for import/export data entries that have _type metadata
type ImportDataEntry =
  | ({ _type: "data_packs" } & Omit<DataPackDB, "_type">)
  | ({ _type: "domain_cards" } & Omit<DomainCardDB, "_type">)
  | ({ _type: "ancestries" } & Omit<AncestryDB, "_type">);

type ImportData = ImportDataEntry[];

export const createDataPack = async (
  db: IndexedDb,
  name: string = "New data pack"
) => {
  console.log(name);
  const result = await db.putValue("data_packs", { name });
  return result;
};

export const getDataPackData = async (
  db: IndexedDb,
  dataPackID: UUID
): Promise<ImportData | undefined> => {
  const dataPack = await db.getValue("data_packs", dataPackID);
  const domainCards = await db.getAllValueByIndex(
    "domain_cards",
    "byDataPackUUID",
    dataPackID
  );
  const ancestries = await db.getAllValueByIndex(
    "ancestries",
    "byDataPackUUID",
    dataPackID
  );

  if (!dataPack) {
    console.error("No current datapack");
    return;
  }

  // Add _type metadata for export/import
  const dataPackWithType = { ...dataPack, _type: "data_packs" as const };
  const domainCardsWithType = domainCards.map((card) => ({
    ...card,
    _type: "domain_cards" as const,
  }));
  const ancestriesWithType = ancestries.map((ancestry) => ({
    ...ancestry,
    _type: "ancestries" as const,
  }));

  return [dataPackWithType, ...domainCardsWithType, ...ancestriesWithType];
};

export const importDataPackData = async (
  db: IndexedDb,
  dataPackData: ImportData
) => {
  for (const entry of dataPackData) {
    const { _type, ...data } = entry;
    await db.putValue(_type, data);
  }
};
