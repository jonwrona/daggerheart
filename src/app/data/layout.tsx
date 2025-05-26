"use client";
import { useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { DataMenu } from "./components/data-menu/DataMenu";
import { DataPackProvider } from "./components/data-pack-context/DataPackContext";
import { DataPackTree } from "./components/data-pack-tree/DataPackTree";
import styles from "./layout.module.scss";
import { DatabaseContext } from "@/components/database-context/DatabaseContext";
import { createDataPack } from "@/data/datapack";
import { Database } from "@/db";
import { StoreValue } from "idb";
import { UUID } from "crypto";

export default function DataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        setDataPacks(dataPacks.filter((pack) => pack.uuid !== id));
      }
    }
  };

  return (
    <DataPackProvider>
      <DataMenu handleNew={handleNew} />
      <h1>Data Packs</h1>
      <div className={styles.layout}>
        <DataPackTree dataPacks={dataPacks} handleDelete={handleDelete} />
        <main className={styles.main}>{children}</main>
      </div>
    </DataPackProvider>
  );
}
