"use client";
import { useContext, useEffect, use } from "react";
import { DataPackContext } from "../components/data-pack-context/DataPackContext";
import { UUID } from "crypto";
import { DatabaseContext } from "@/components/database-context/DatabaseContext";

export default function DataLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: UUID }>;
}>) {
  const { id } = use(params);
  const db = useContext(DatabaseContext);
  const { setDataPack, dataPack } = useContext(DataPackContext);

  useEffect(() => {
    (async () => {
      if (db) {
        const dataPack = await db.getValue("data_packs", id);
        if (dataPack) setDataPack(dataPack);
      }
    })();
  }, [db, setDataPack, id]);

  return (
    <>
      <h1>{dataPack?.name || "Loading..."}</h1>
      <div>{children}</div>
    </>
  );
}
