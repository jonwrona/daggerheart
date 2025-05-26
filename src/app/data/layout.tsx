import { DataMenu } from "./components/data-menu/DataMenu";
import { DataPackProvider } from "./components/data-pack-context/DataPackContext";
import { DataPackTree } from "./components/data-pack-tree/DataPackTree";
import styles from "./layout.module.scss";

// export const metadata = {
// title: "Manage your data | Daggerheart",
// };

export default function DataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataPackProvider>
      <DataMenu />
      <div className={styles.layout}>
        <DataPackTree />
        <main className={styles.main}>{children}</main>
      </div>
    </DataPackProvider>
  );
}
