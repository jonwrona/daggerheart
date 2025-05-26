"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { Button } from "@/components/button/Button";
import { DatabaseContext } from "@/components/database-context/DatabaseContext";
import { DataPackContext } from "../data-pack-context/DataPackContext";

import { createDataPack } from "@/data/datapack";
import { Database, STORES } from "@/db";
import { StoreValue } from "idb";
import { UUID } from "crypto";

import styles from "./DataPackTree.module.scss";

const dataPackPages = [
  { slug: "domains", label: "Domains" },
  { slug: "ancestries", label: "Ancestries" },
  { slug: "communities", label: "Communities" },
];

const DataPackNavigation = ({
  id,
  name,
  currentPage,
}: {
  id: UUID;
  name: string;
  currentPage: string;
}) => {
  return (
    <div className={styles.dataPackNavigation}>
      <Link
        href={`/data/${id}`}
        className={styles.name}
        data-active={!currentPage}
      >
        {name}
      </Link>
      {dataPackPages.map(({ slug, label }) => (
        <Link
          key={`${id}_${slug}`}
          className={styles.pageLink}
          href={`/data/${id}/${slug}`}
          data-active={currentPage === slug}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export const DataPackTree = () => {
  const pathname = usePathname();
  const db = useContext(DatabaseContext);
  const [dataPacks, setDataPacks] = useState<
    StoreValue<Database, "data_packs">[]
  >([]);

  const [pathID, pathPage] = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts.slice(2);
  }, [pathname]);

  useEffect(() => {
    (async () => {
      const packs = await fetchDataPacks();
      packs && setDataPacks(packs);
    })();
  }, [db]);

  const fetchDataPacks = async () => {
    if (db) {
      const packs = await db.getAllValue(STORES.DATA_PACKS);
      return packs;
    }
  };

  const handleCreate = async () => {
    let name = prompt(
      "Please enter a name for your datapack",
      "New datapack name"
    );
    if (db) {
      const created = await createDataPack(db, name || undefined);
      setDataPacks([...dataPacks, created]);
      redirect(`/data/${created.uuid}`);
    }
  };

  const handleDelete = async (uuid: UUID) => {};

  return (
    <div className={styles.container}>
      <Button onClick={handleCreate} disabled={!db}>
        New Datapack
      </Button>
      {dataPacks
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ uuid, name }) =>
          uuid === pathID ? (
            <DataPackNavigation
              key={uuid}
              id={uuid}
              name={name}
              currentPage={pathPage}
            />
          ) : (
            <Link key={uuid} href={`/data/${uuid}`} className={styles.dataPack}>
              {name}
            </Link>
          )
        )}
    </div>
  );
};
