import { type UUID } from "crypto";
import type { IDBPDatabase, StoreNames, StoreValue } from "idb";
import { openDB } from "idb";
import { type Database } from ".";

const ID_KEY = "uuid";

class IndexedDb {
  private database: string;
  private db!: IDBPDatabase<Database>;

  constructor(database: string) {
    this.database = database;
  }

  public async createObjectStore(tableNames: StoreNames<Database>[]) {
    try {
      this.db = await openDB<Database>(this.database, 1, {
        upgrade(db: IDBPDatabase<Database>) {
          for (const tableName of tableNames) {
            if (db.objectStoreNames.contains(tableName)) {
              continue;
            }
            db.createObjectStore(tableName, {
              autoIncrement: false,
              keyPath: ID_KEY,
            });
          }
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async getValue(
    tableName: StoreNames<Database>,
    id: UUID
  ): Promise<StoreValue<Database, StoreNames<Database>> | undefined> {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    console.log("Get Data ", JSON.stringify(result));
    return result;
  }

  public async getAllValue(
    tableName: StoreNames<Database>
  ): Promise<StoreValue<Database, StoreNames<Database>>[]> {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    console.log("Get All Data", JSON.stringify(result));
    return result;
  }

  public async putValue(
    tableName: StoreNames<Database>,
    value: StoreValue<Database, StoreNames<Database>>
  ): Promise<StoreValue<Database, StoreNames<Database>> | undefined> {
    console.log("Putting value", value);
    if (!value.hasOwnProperty(ID_KEY)) {
      value[ID_KEY] = crypto.randomUUID() as UUID;
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    const storeValue = store.get(result);
    return storeValue;
  }

  public async putBulkValue(
    tableName: StoreNames<Database>,
    values: StoreValue<Database, StoreNames<Database>>[]
  ): Promise<StoreValue<Database, StoreNames<Database>>[]> {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    for (const value of values) {
      if (!value.hasOwnProperty(ID_KEY)) {
        value[ID_KEY] = crypto.randomUUID() as UUID;
      }
      const result = await store.put(value);
      console.log("Put Bulk Data ", JSON.stringify(result));
    }
    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: StoreNames<Database>, id: UUID) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log(`ID ${id} not found in table ${tableName}`);
      return result;
    }
    await store.delete(id);
    console.log("Deleted Data", id);
    return id;
  }
}

export default IndexedDb;
