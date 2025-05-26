"use client";
import { createContext, useState, useEffect } from "react";
import type { StoreValue } from "idb";
import type { Database } from "@/db";
import { UUID } from "crypto";

type DataPack = StoreValue<Database, "data_packs"> | null;

type DataPackContext = {
  dataPack: DataPack;
  setDataPack: (dataPack: DataPack) => void;
};

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const DataPackContext = createContext<DataPackContext>({
  dataPack: null,
  setDataPack: () => {},
});

export const DataPackProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [dataPack, setDataPack] = useState<DataPack>(null);

  return (
    <DataPackContext.Provider value={{ dataPack, setDataPack }}>
      {children}
    </DataPackContext.Provider>
  );
};
