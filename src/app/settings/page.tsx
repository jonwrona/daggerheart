"use client";
import { useContext } from "react";
import { SettingsContext } from "@/components/settings-context/SettingsContext";
import { Menu } from "@/components/menu/Menu";
import { RadioGroup } from "./components/radio-group/RadioGroup";
import type { Settings } from "@/types/settings";

const Settings = () => {
  const { settings, settingsDispatch } = useContext(SettingsContext);

  return (
    <>
      <Menu />
      <h1>Settings</h1>
      <h2>Theme</h2>
      <RadioGroup
        value={settings.theme}
        options={[
          { label: "Use browser setting", value: "browser" },
          { label: "Light mode", value: "light" },
          { label: "Dark mode", value: "dark" },
          { label: "Custom theme", value: "custom", disabled: true },
        ]}
        onChange={(value) => settingsDispatch({ theme: value })}
      />
      <code style={{ whiteSpace: "pre" }}>
        {JSON.stringify(settings, null, 2)}
      </code>
    </>
  );
};

export default Settings;
