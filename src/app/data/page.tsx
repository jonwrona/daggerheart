import { DataMenu } from "./components/data-menu/DataMenu";
import { DataPackTree } from "./components/data-pack-tree/DataPackTree";
import styles from "./page.module.scss";

export const metadata = {
  title: "Manage your data | Daggerheart",
};

const Data = () => {
  return (
    <>
      <DataMenu />
      <div className={styles.layout}>
        <DataPackTree />
        <main className={styles.main}></main>
      </div>
    </>
  );
};

export default Data;
