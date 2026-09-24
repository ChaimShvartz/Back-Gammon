import { Server } from "socket.io";
import server from "../server.js";
import createRoomHandler from "../roomHandler.js";

const io = new Server(server, { cors: true });

io.on("connection", (socket) => {
    createRoomHandler(io, socket);
});
