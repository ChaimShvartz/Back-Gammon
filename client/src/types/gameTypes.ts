export type StartGameResponse = { success: false; error: string };

export interface Player {
    name: string;
    color: string;
}

export interface GameSession {
    players: Player[];
    addPlayer: (player: Player) => void;
    setPlayers: (players: Player[]) => void;
    managerSocketId: string | null;
    setManagerSocketId: (managerSocketId: string) => void;
}

type Color = "white" | "black";

export interface GameState {
    board: { color: Color | null; checkers: number }[];
    currentPlayer: Color;
    dice: number[];
    remainingDice: number[];
    bar: { white: number; black: number };
    borneOff: { white: number; black: number };
    winner: null | Color;
}
