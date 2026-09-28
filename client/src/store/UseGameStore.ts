import { create } from "zustand";

type Color = "white" | "black";
interface Game {
    players: Player[];
    addPlayer: (player: Player) => void;
    setPlayers: (players: Player[]) => void;
    managerSocketId: string | null;
    setManagerSocketId: (managerSocketId: string) => void;
    game: null | {
        board: { color: Color | null; checkers: number }[];
        currentPlayer: Color;
        dice: number[];
        remainingDice: number[];
        bar: { white: number; black: number };
        borneOff: { white: number; black: number };
        winner: null | Color;
    };
    setGame: (game: Game["game"]) => void;
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
    game: null,
    setGame: (game: Game["game"]) => set({ game }),
}));
