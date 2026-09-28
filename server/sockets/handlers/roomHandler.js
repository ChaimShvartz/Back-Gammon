import { generateId } from "../../services/roomServices.js";
import repo from "../../repositories/roomsRepo.js";
import { Server, Socket } from "socket.io";

export const createRoomHandler = (
    /**@type {Server} */ io,
    /**@type {Socket} */ socket,
) => {
    const asyncHandler = (handler) => async (payload, cb) => {
        try {
            await handler(payload, cb);
        } catch ({ message }) {
            return cb({
                success: false,
                error: message,
            });
        }
    };
    const handleCreateRoom = ({ name }, callback) => {
        const { roomCode, id: socketId } = socket;
        if (!name && name.length > 20)
            throw new Error("Name is missing or too long");
        if (roomCode) throw new Error("You already in room");

        const id = generateId(repo.getAllIds());
        socket.join(id);
        socket.roomCode = id;
        const room = {
            id,
            status: "waiting",
            ownerSocketId: socketId,
            players: [{ socketId, name, color: "white" }],
            game: null,
            rematchAcceptedBy: [],
        };

        repo.addRoom(id, room);
        callback({
            success: true,
            name,
            code: id,
        });
    };

    const handleJoinRoom = ({ name, roomCode }, callback) => {
        const { roomCode: oldRoomCode, id: socketId } = socket;
        if (!name && name.length > 20)
            throw new Error("Name is missing or too long");
        if (oldRoomCode) throw new Error("You already in room");

        const room = repo.getById(roomCode);
        if (!room) throw new Error("Room code is missing or invalid");
        const { players, ownerSocketId } = room;
        if (players.length > 1) throw new Error("The room is full");

        socket.join(roomCode);
        socket.roomCode = roomCode;
        players.push({ socketId, name, color: "black" });
        callback({
            success: true,
            code: roomCode,
            players: players.map(({ name, color }) => ({
                name,
                color,
            })),
        });
        socket.to(roomCode).emit("room:state", {
            name,
            color: "black",
        });
    };

    const handleLeaveRoom = (reason, callback) => {
        const { roomCode } = socket;
        const { players } = repo.getById(roomCode);
        const opponent = players.find((p) => p.socketId !== socket.id);
        const opponentSocket = io.sockets.sockets.get(opponent.id);
        opponentSocket.roomCode = null;
        socket.roomCode = null;
        repo.remove(roomCode);
        socket.to(roomCode).emit("room:closed", reason);
    };

    socket.on("room:create", asyncHandler(handleCreateRoom));
    socket.on("room:join", asyncHandler(handleJoinRoom));
    socket.on("room:leave", asyncHandler(handleLeaveRoom));
};
