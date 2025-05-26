"use client";
import { createContext, useState, useEffect } from "react";
import setup from "@/db/setup";
import IndexedDb from "@/db/IndexedDb";

type DatabaseContext = IndexedDb | null;

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export const DatabaseContext = createContext<DatabaseContext>(null);

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({
  children,
}) => {
  const [db, setDB] = useState<IndexedDb | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async () => {
        const db = await setup();
        setDB(db);
      })();
    }
  }, []);

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};
