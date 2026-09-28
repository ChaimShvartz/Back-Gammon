import { create } from "zustand";

interface Game {
    players: Player[];
    addPlayer: (player: Player) => void;
    setPlayers: (players: Player[]) => void;
    managerSocketId: string | null;
    setManagerSocketId: (managerSocketId: string) => void;
}

interface Player {
    name: string;
    color: string;
}

export const useGameStore = create<Game>()((set) => ({
    players: [],
    setPlayers: (players: Player[]) => set({ players }),
    addPlayer: (player: Player) => {
        set(({ players }) => ({ players: [...players, player] }));
    },
    managerSocketId: null,
    setManagerSocketId: (managerSocketId: string) => set({ managerSocketId }),
}));
