import { Server, Socket } from "socket.io";
import repo from "../../repositories/roomsRepo.js";
import {
    getBeginnerTurn,
    getInitialGame,
} from "../../services/gameServices.js";
import { asyncHandler } from "./utils.js";

export const createGameHandler = (
    /**@type {Server}  */ io,
    /**@type {Socket} */ socket,
) => {
    const handleStartGame = () => {
        const { roomCode, id } = socket;
        const room = repo.getById(roomCode);
        if (!room) throw new Error("Room not found");
        const { players, ownerSocketId, status } = room;
        if (players.length !== 2)
            throw new Error("Room must be with 2 players for starting");
        if (id !== ownerSocketId) throw new Error("You are not owner");
        if (status !== "waiting")
            throw new Error("Room must be with 'waiting' status for starting");
        const initialGame = getInitialGame();
        const { beginner, dice } = getBeginnerTurn();

        const {game} = repo.updateRoom({
            status: "playing",
            game: {
                ...initialGame,
                currentPlayer: beginner,
                dice,
                remainingDice: dice,
                status: "waiting-for-move",
            },
        });
        const {status: _status, ...rest} = game

        io.to(roomCode).emit("game:state", {...rest});
    };
    socket.on("game:start", asyncHandler(handleStartGame));
};
