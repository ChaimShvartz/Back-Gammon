import { UseSocketContext } from "../context/SocketContext";
import type { StartGameResponse } from "../types/gameTypes";

const UseGameSocket = () => {
    const { socket } = UseSocketContext();
    const startGame = () =>
        socket.emit("game:start", null, (res: StartGameResponse) =>
            alert(res.error),
        );
    return { startGame };
};

export default UseGameSocket;
