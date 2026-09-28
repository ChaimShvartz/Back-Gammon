import { Server } from "socket.io";
import { createRoomHandler } from "./handlers/roomHandler.js";

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
        console.log(`${GREEN}Server connected to socket(${socket.id})${RESET}`);
        socket.on("disconnect",  () =>
            console.log(`${RED}Server disconnected to socket(${socket.id})${RESET}`)
        );
        createRoomHandler(io, socket);
    });
};
