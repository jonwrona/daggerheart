import IndexedDb from ".";

const setup = async (): Promise<IndexedDb> => {
  const indexedDb = new IndexedDb("data");

  await indexedDb.createObjectStore([
    "characters",
    "datapacks",
    "domains",
    "domain_cards",
  ]);

  return indexedDb;
};

export default setup;
