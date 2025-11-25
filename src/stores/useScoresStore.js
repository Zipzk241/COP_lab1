import { create } from "zustand";
import { persist } from "zustand/middleware";

const useScoresStore = create(
  persist(
    (set, get) => ({
      scores: [], 
      addScore: (scoreData) =>
        set((state) => ({
          scores: [
            ...state.scores,
            {
              ...scoreData,
              id: Date.now(),
              date: new Date().toISOString(),
            },
          ],
        })),

      getTopScores: (limit = 10) => {
        const scores = get().scores;
        return scores
          .sort((a, b) => a.moves - b.moves || a.time.localeCompare(b.time))
          .slice(0, limit);
      },

      getUserScores: (userId) => {
        const scores = get().scores;
        return scores.filter((score) => score.userId === userId);
      },

      getUserBestScore: (userId) => {
        const userScores = get().getUserScores(userId);
        if (userScores.length === 0) return null;
        return userScores.reduce((best, current) =>
          current.moves < best.moves ? current : best
        );
      },

      clearScores: () => set({ scores: [] }),
      getScoresByDifficulty: (difficulty) => {
        const scores = get().scores;
        return scores.filter((score) => score.difficulty === difficulty);
      },
    }),
    {
      name: "puzzle-scores",
      version: 1,
    }
  )
);

export default useScoresStore;
