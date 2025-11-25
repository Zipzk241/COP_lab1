import { create } from "zustand";

const useGameStore = create((set, get) => ({
  isGameActive: false,
  currentMoves: 0,
  currentTime: 0,
  isPaused: false,

  startGame: () =>
    set({
      isGameActive: true,
      currentMoves: 0,
      currentTime: 0,
      isPaused: false,
    }),

  incrementMoves: () =>
    set((state) => ({
      currentMoves: state.currentMoves + 1,
    })),

  setTime: (time) => set({ currentTime: time }),

  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),

  endGame: () => set({ isGameActive: false }),

  resetGame: () =>
    set({
      isGameActive: false,
      currentMoves: 0,
      currentTime: 0,
      isPaused: false,
    }),
}));

export default useGameStore;
