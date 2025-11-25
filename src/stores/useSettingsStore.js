import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create(
  persist(
    (set, get) => ({
      settings: {
        difficulty: "medium",
        gridSize: 4,
        timerEnabled: true,
        soundEnabled: false,
      },

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      resetSettings: () =>
        set({
          settings: {
            difficulty: "medium",
            gridSize: 4,
            timerEnabled: true,
            soundEnabled: false,
          },
        }),

      getGridSize: () => get().settings.gridSize,
      getDifficulty: () => get().settings.difficulty,
      isSoundEnabled: () => get().settings.soundEnabled,
    }),
    {
      name: "puzzle-settings", 
      version: 1,
    }
  )
);

export default useSettingsStore;
