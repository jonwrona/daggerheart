"use client";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DataPackDB } from "@/db";
import { UUID } from "crypto";

import styles from "./DataPackTree.module.scss";
import { Icon } from "@/components/icon/Icon";
import { Button } from "@/components/button/Button";

const dataPackPages = [
  { slug: "domains", label: "Domains" },
  { slug: "ancestries", label: "Ancestries" },
  { slug: "communities", label: "Communities" },
];

const DataPackNavigation = ({
  id,
  name,
  currentPage,
  handleDelete,
}: {
  id: UUID;
  name: string;
  currentPage: string;
  handleDelete: () => void;
}) => {
  return (
    <div className={styles.dataPackNavigation}>
      <div className={styles.dataPackName}>
        <Link
          href={`/data/${id}`}
          className={styles.name}
          data-active={!currentPage}
        >
          {name}
        </Link>
        <Button iconOnly kind="ghost" onClick={handleDelete}>
          <Icon name="delete" size="1rem" />
        </Button>
      </div>
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

export const DataPackTree = ({
  dataPacks,
  handleDelete,
}: {
  dataPacks: DataPackDB[];
  handleDelete: (id: UUID) => void;
}) => {
  const pathname = usePathname();

  const [pathID, pathPage] = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts.slice(2);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <Link href="/data" className={styles.title}>
        <h1>Data packs</h1>
      </Link>
      {dataPacks?.length ? (
        dataPacks
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ uuid, name }) =>
            uuid === pathID ? (
              <DataPackNavigation
                key={uuid}
                id={uuid}
                name={name}
                currentPage={pathPage}
                handleDelete={() => handleDelete(uuid)}
              />
            ) : (
              <Link
                key={uuid}
                href={`/data/${uuid}`}
                className={styles.dataPack}
              >
                {name}
              </Link>
            )
          )
      ) : (
        <p>No data packs</p>
      )}
    </div>
  );
};
