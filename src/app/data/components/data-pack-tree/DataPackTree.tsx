"use client";
import { useContext } from "react";
import { Button } from "@/components/button/Button";
import { DataContext, ACTIONS } from "@/components/data-context/DataContext";
import styles from "./DataPackTree.module.scss";

interface DataPackTreeProps {}

export const DataPackTree: React.FC<DataPackTreeProps> = ({}) => {
  const { dispatch } = useContext(DataContext);
  const createDataPack = () => {
    dispatch(ACTIONS.NEW_DATA_PACK);
  };

  return (
    <div className={styles.container}>
      <Button onClick={createDataPack}>NEW DATA CONTEXT</Button>
    </div>
  );
};
