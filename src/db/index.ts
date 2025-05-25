import { UUID } from "crypto";
import { IDBPDatabase, openDB } from "idb";

const ID_KEY = "uuid";

type DBObject = {
  uuid: UUID;
  [key: string]: any;
};

class IndexedDb {
  private database: string;
  private db: any;

  constructor(database: string) {
    this.database = database;
  }

  public async createObjectStore(tableNames: string[]) {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
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
    } catch (error) {
      return false;
    }
  }

  public async getValue(tableName: string, id: UUID) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    console.log("Get Data ", JSON.stringify(result));
    return result;
  }

  public async getAllValue(tableName: string) {
    const tx = this.db.transaction(tableName, "readonly");
    const store = tx.objectStore(tableName);
    const result = await store.getAll();
    console.log("Get All Data", JSON.stringify(result));
    return result;
  }

  public async putValue(tableName: string, value: DBObject) {
    if (!value.hasOwnProperty(ID_KEY)) {
      value[ID_KEY] = crypto.randomUUID() as UUID;
    }
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.put(value);
    console.log("Put Data ", JSON.stringify(result));
    return result;
  }

  public async putBulkValue(tableName: string, values: DBObject[]) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    for (const value of values) {
      const result = await store.put(value);
      console.log("Put Bulk Data ", JSON.stringify(result));
    }
    return this.getAllValue(tableName);
  }

  public async deleteValue(tableName: string, id: UUID) {
    const tx = this.db.transaction(tableName, "readwrite");
    const store = tx.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      console.log("Id not found", id);
      return result;
    }
    await store.delete(id);
    console.log("Deleted Data", id);
    return id;
  }
}

export default IndexedDb;
