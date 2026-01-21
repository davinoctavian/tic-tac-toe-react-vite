import React, { createContext } from "react";
import type { Settings } from "../components/Settings/types";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultSettings: Settings = {
  borderColor: "#000000",
  backgroundColor: "#ffffff",
  xColor: "#ff0000",
  oColor: "#0000ff",
  xBoardColor: "#ff0000",
  oBoardColor: "#0000ff",
  player1Symbol: undefined,
  player2Symbol: undefined,
};

export const SettingsContext = createContext<{
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useLocalStorage<Settings>(
    "settings",
    defaultSettings,
  );

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
