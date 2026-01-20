import React, { createContext, useState } from "react";
import type { Settings } from "../Components/Settings/types";

const defaultSettings: Settings = {
  borderColor: "#000000",
  backgroundColor: "#ffffff",
  xColor: "#ff0000",
  oColor: "#0000ff",
  xBoardColor: "#f0f0f0",
  oBoardColor: "#e0e0e0",
  player1Symbol: "X",
  player2Symbol: "O",
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
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
