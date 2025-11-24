import { useState, useEffect } from "react";

function useGameSettings() {
  const defaultSettings = {
    difficulty: "medium",
    gridSize: 4,
    timerEnabled: true,
    soundEnabled: false,
  };

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("puzzleSettings");
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // збереження в localStorage
  useEffect(() => {
    localStorage.setItem("puzzleSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}

export default useGameSettings;
