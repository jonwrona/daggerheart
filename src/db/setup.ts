import IndexedDb from "./IndexedDb";
import { STORES } from ".";

const setup = async (): Promise<IndexedDb> => {
  const indexedDb = new IndexedDb("data");

  console.log(Object.values(STORES));

  await indexedDb.createObjectStore(Object.values(STORES));

  return indexedDb;
};

export default setup;
