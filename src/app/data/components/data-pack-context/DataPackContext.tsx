"use client";
import { createContext, useState } from "react";
import type { DataPackDB } from "@/db";

type DataPackContext = {
  dataPack: DataPackDB | null;
  setDataPack: (dataPack: DataPackDB) => void;
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
  const [dataPack, setDataPack] = useState<DataPackDB | null>(null);

  return (
    <DataPackContext.Provider value={{ dataPack, setDataPack }}>
      {children}
    </DataPackContext.Provider>
  );
};
