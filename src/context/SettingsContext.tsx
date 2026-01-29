import React, { createContext } from "react";
import type { Settings } from "../components/Settings/types";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultSettings: Settings = {
  mode: "pvp",
  match: 1,
  board: "3",
  player1Symbol: "X",
  player2Symbol: "O",
  borderColor: "#000000",
  backgroundColor: "#ffffff",
  xColor: "#ff0000",
  oColor: "#0000ff",
  xBoardColor: "#ff0000",
  oBoardColor: "#0000ff",
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
