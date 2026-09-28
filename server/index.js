import { server } from "./server.js";
import { initSocket } from "./sockets/socket.js";

const { PORT } = process.env;

initSocket(server);

server.listen(PORT, (err) => {
    if (err) return console.error(err.message);
    console.log("Listening on port " + PORT);
});
