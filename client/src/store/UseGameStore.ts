import { create } from "zustand";
import type { GameSession, Player } from "../types/gameTypes";

export const useGameStore = create<GameSession>()((set) => ({
    players: [],
    setPlayers: (players: Player[]) => set({ players }),
    addPlayer: (player: Player) => {
        set(({ players }) => ({ players: [...players, player] }));
    },
    managerSocketId: null,
    setManagerSocketId: (managerSocketId: string) => set({ managerSocketId }),
}));
