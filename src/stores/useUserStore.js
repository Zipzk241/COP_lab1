import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      users: {}, 
      currentUserId: null,
      setCurrentUser: (userId) => {
        set({ currentUserId: userId });
        const users = get().users;
        if (!users[userId]) {
          set((state) => ({
            users: {
              ...state.users,
              [userId]: {
                gamesStarted: 0,
                gamesWon: 0,
                totalMoves: 0,
                lastPlayed: null,
              },
            },
          }));
        }
      },

      updateUserStats: (userId, updates) =>
        set((state) => ({
          users: {
            ...state.users,
            [userId]: {
              ...state.users[userId],
              ...updates,
              lastPlayed: new Date().toISOString(),
            },
          },
        })),

      registerGameStart: (userId) => {
        const user = get().users[userId];
        if (user) {
          get().updateUserStats(userId, {
            gamesStarted: user.gamesStarted + 1,
          });
        }
      },

      registerWin: (userId, moves) => {
        const user = get().users[userId];
        if (user) {
          get().updateUserStats(userId, {
            gamesWon: user.gamesWon + 1,
            totalMoves: user.totalMoves + moves,
          });
        }
      },

      addMoves: (userId, moves) => {
        const user = get().users[userId];
        if (user) {
          get().updateUserStats(userId, {
            totalMoves: user.totalMoves + moves,
          });
        }
      },

      getUserData: (userId) => get().users[userId] || null,
      getCurrentUserStats: () => {
        const userId = get().currentUserId;
        return userId ? get().getUserData(userId) : null;
      },
    }),
    {
      name: "puzzle-users",
      version: 1,
    }
  )
);

export default useUserStore;
