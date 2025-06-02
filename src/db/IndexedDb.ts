import { type UUID } from "crypto";
import type { IDBPDatabase, StoreNames, StoreValue, IndexNames } from "idb";
import { openDB } from "idb";
import { type Database, setup, ID_KEY } from ".";

class IndexedDb {
  private database: string;
  private db!: IDBPDatabase<Database>;

  constructor(database: string) {
    this.database = database;
  }

  public async connect(): Promise<boolean> {
    try {
      this.db = await openDB<Database>(this.database, 1, {
        upgrade(db: IDBPDatabase<Database>) {
          setup(db);
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async getValue<T extends StoreNames<Database>>(
    tableName: T,
    id: UUID
  ): Promise<StoreValue<Database, T> | undefined> {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    console.log("Get Data ", JSON.stringify(result));
    return result;
  }

  public async getValueByIndex<T extends StoreNames<Database>>(
    tableName: T,
    indexName: IndexNames<Database, T>,
    indexValue: UUID
  ): Promise<StoreValue<Database, T> | undefined> {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const index = store.index(indexName);
    const result = await index.get(IDBKeyRange.only(indexValue));
    console.log("Get Data by Index", JSON.stringify(result));
    return result;
  }

  public async getAllValue<T extends StoreNames<Database>>(
    tableName: T
  ): Promise<StoreValue<Database, T>[]> {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    console.log("Get All Data", JSON.stringify(result));
    return result;
  }

  public async getAllValueByIndex<T extends StoreNames<Database>>(
    tableName: T,
    indexName: IndexNames<Database, T>,
    indexValue: UUID
  ): Promise<StoreValue<Database, T>[]> {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const index = store.index(indexName);
    const result = await index.getAll(IDBKeyRange.only(indexValue));
    console.log("Get All Data by Index", JSON.stringify(result));
    return result;
  }

  public async putValue<T extends StoreNames<Database>>(
    tableName: T,
    value: StoreValue<Database, T>
  ): Promise<StoreValue<Database, T> | undefined> {
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

  public async putBulkValue<T extends StoreNames<Database>>(
    tableName: T,
    values: StoreValue<Database, T>[]
  ): Promise<StoreValue<Database, T>[]> {
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

  public async deleteValue<T extends StoreNames<Database>>(
    tableName: T,
    id: UUID
  ) {
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

  public async deleteValuesByIndex<T extends StoreNames<Database>>(
    tableName: T,
    indexName: IndexNames<Database, T>,
    indexValue: UUID
  ): Promise<UUID[]> {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const index = store.index(indexName);
    const results = await index.getAll(IDBKeyRange.only(indexValue));
    const deletedIds: UUID[] = [];

    for (const result of results) {
      if (result && result.hasOwnProperty(ID_KEY)) {
        await store.delete(result[ID_KEY] as UUID);
        deletedIds.push(result[ID_KEY] as UUID);
      }
    }

    console.log("Deleted Data by Index", deletedIds);
    return deletedIds;
  }
}

export default IndexedDb;
