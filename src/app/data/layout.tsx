"use client";
import { useContext, useState, useEffect, useMemo, useRef } from "react";
import { redirect, usePathname } from "next/navigation";
import { DataMenu } from "./components/data-menu/DataMenu";
import { DataPackProvider } from "./components/data-pack-context/DataPackContext";
import { DataPackTree } from "./components/data-pack-tree/DataPackTree";
import { DatabaseContext } from "@/components/database-context/DatabaseContext";
import {
  createDataPack,
  getDataPackData,
  importDataPackData,
} from "@/data/datapack";
import { Database } from "@/db";
import type { DataPackDB, DomainCardDB, AncestryDB } from "@/db";
import { StoreValue } from "idb";
import { UUID } from "crypto";
import { FileSelector } from "@/components/file-selector/FileSelector";
import { saveJSONToFile } from "@/utils/jsonFileManagement";

import styles from "./layout.module.scss";

// Type for import data entries that have _type metadata
type ImportDataEntry =
  | ({ _type: "data_packs" } & Omit<DataPackDB, "_type">)
  | ({ _type: "domain_cards" } & Omit<DomainCardDB, "_type">)
  | ({ _type: "ancestries" } & Omit<AncestryDB, "_type">);

type ImportData = ImportDataEntry[];

export default function DataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [pathID] = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts.slice(2);
  }, [pathname]);

  const fileSelectorRef = useRef<HTMLInputElement>(null);

  const db = useContext(DatabaseContext);
  const [dataPacks, setDataPacks] = useState<
    StoreValue<Database, "data_packs">[]
  >([]);

  useEffect(() => {
    (async () => {
      if (db) {
        const packs = await db.getAllValue("data_packs");
        if (packs) setDataPacks(packs);
      }
    })();
  }, [db]);

  const handleNew = async () => {
    const name = prompt(
      "Please enter a name for your datapack",
      "New datapack"
    );
    if (db) {
      const created = await createDataPack(db, name || undefined);
      if (created) {
        setDataPacks([...dataPacks, created]);
        redirect(`/data/${created.uuid}`);
      }
    }
  };

  const handleDelete = async (id: UUID) => {
    const confirmDelete = prompt(
      "Type 'DELETE' to confirm deletion of this data pack."
    );
    if (db && confirmDelete === "DELETE") {
      const deleted = await db.deleteValue("data_packs", id);
      if (deleted) {
        // Remove the deleted data pack from the state
        setDataPacks(dataPacks.filter((pack) => pack.uuid !== id));
        db.deleteValuesByIndex("domain_cards", "byDataPackUUID", id);
        redirect("/data");
      }
    }
  };

  const handleExport = async () => {
    console.log(`Exporting current data pack: ${pathID}`);
    if (db && pathID) {
      const data = await getDataPackData(db, pathID as UUID);
      if (data) saveJSONToFile(data, "test_datapack");
    }
  };

  const handleImport = () => {
    fileSelectorRef.current?.click();
  };
  const handleImportFile = async (data: ImportData) => {
    if (db) {
      await importDataPackData(db, data);
    }
  };

  return (
    <DataPackProvider>
      <DataMenu
        handleNew={handleNew}
        handleExport={handleExport}
        handleImport={handleImport}
      />
      <div className={styles.layout}>
        <DataPackTree dataPacks={dataPacks} handleDelete={handleDelete} />
        <main className={styles.main}>{children}</main>
      </div>
      <FileSelector<ImportData>
        inputRef={fileSelectorRef}
        handleLoad={handleImportFile}
        acceptedExtensions=".json"
        errorMessage="Invalid data pack format."
      />
    </DataPackProvider>
  );
}
