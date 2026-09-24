import { createServer } from "http";

const { PORT } = process.env;
const server = createServer();

server.listen(PORT, (err) => {
    if (err) return console.error(err.message);
    console.log("Listening on port " + PORT);
});

export default server;
