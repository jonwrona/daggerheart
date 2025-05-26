"use client";
import { useContext } from "react";
import { SettingsContext } from "@/components/settings-context/SettingsContext";
import { Menu } from "@/components/menu/Menu";
import { RadioGroup } from "./components/radio-group/RadioGroup";
import type { Settings } from "@/types/settings";

import styles from "./page.module.scss";

const Settings = () => {
  const { settings, settingsDispatch } = useContext(SettingsContext);

  return (
    <>
      <Menu />
      <main className={styles.main}>
        <h1>Settings</h1>
        <h5>Theme</h5>
        <RadioGroup
          value={settings.theme}
          options={[
            { label: "Use browser setting", value: "browser" },
            { label: "Light mode", value: "light" },
            { label: "Dark mode", value: "dark" },
          ]}
          onChange={(value) =>
            settingsDispatch({ theme: value as Settings["theme"] })
          }
        />
        <div>
          <code style={{ whiteSpace: "pre" }}>
            {JSON.stringify(settings, null, 2)}
          </code>
        </div>
      </main>
    </>
  );
};

export default Settings;
