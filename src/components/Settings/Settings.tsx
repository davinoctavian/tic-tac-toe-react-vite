import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { getContrastColor } from "../../utils/colorUtils";
import "./Settings.css";

export default function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const labelColor = getContrastColor(settings.backgroundColor);

  return (
    <div className="settings">
      <h3 style={{ color: labelColor }}>Settings</h3>
      <label style={{ color: labelColor }}>
        Match
        <input
          name="match"
          type="number"
          min="1"
          max="100"
          value={settings.match ?? 1}
          onChange={(e) => {
            let val = parseInt(e.target.value, 10);

            if (isNaN(val)) val = 1;
            if (val < 1) val = 1;
            if (val > 100) val = 100;

            setSettings({ ...settings, match: val });
          }}
        ></input>
      </label>
      <label style={{ color: labelColor }}>
        Player 1 Symbol:
        <select
          name="player1Symbol"
          value={settings.player1Symbol ?? ""}
          onChange={(e) =>
            setSettings({
              ...settings,
              player1Symbol:
                e.target.value === ""
                  ? undefined
                  : (e.target.value as "X" | "O"),
            })
          }
        >
          <option value="X" disabled={settings.player2Symbol === "X"}>
            X
          </option>
          <option value="O" disabled={settings.player2Symbol === "O"}>
            O
          </option>
          <option value="">Clear</option>
        </select>
      </label>
      <label style={{ color: labelColor }}>
        Player 2 Symbol:
        <select
          name="player2Symbol"
          value={settings.player2Symbol ?? ""}
          onChange={(e) =>
            setSettings({
              ...settings,
              player2Symbol:
                e.target.value === ""
                  ? undefined
                  : (e.target.value as "X" | "O"),
            })
          }
        >
          <option value="X" disabled={settings.player1Symbol === "X"}>
            X
          </option>
          <option value="O" disabled={settings.player1Symbol === "O"}>
            O
          </option>
          <option value="">Clear</option>
        </select>
      </label>
      <label style={{ color: labelColor }}>
        Border Color:
        <input
          type="color"
          value={settings.borderColor}
          onChange={(e) =>
            setSettings({ ...settings, borderColor: e.target.value })
          }
        />
      </label>
      <label style={{ color: labelColor }}>
        Background Color:
        <input
          type="color"
          value={settings.backgroundColor}
          onChange={(e) =>
            setSettings({ ...settings, backgroundColor: e.target.value })
          }
        />
      </label>
      <label style={{ color: labelColor }}>
        X Color:
        <input
          type="color"
          value={settings.xColor}
          onChange={(e) => setSettings({ ...settings, xColor: e.target.value })}
        />
      </label>
      <label style={{ color: labelColor }}>
        O Color:
        <input
          type="color"
          value={settings.oColor}
          onChange={(e) => setSettings({ ...settings, oColor: e.target.value })}
        />
      </label>
      <label style={{ color: labelColor }}>
        X Score Color:
        <input
          type="color"
          value={settings.xBoardColor}
          onChange={(e) =>
            setSettings({ ...settings, xBoardColor: e.target.value })
          }
        />
      </label>
      <label style={{ color: labelColor }}>
        O Score Color:
        <input
          type="color"
          value={settings.oBoardColor}
          onChange={(e) =>
            setSettings({ ...settings, oBoardColor: e.target.value })
          }
        />
      </label>
    </div>
  );
}
