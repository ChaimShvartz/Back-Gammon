import { useParams } from "react-router-dom";
import { useGameStore } from "../store/UseGameStore";
import { useEffect } from "react";
import { socket } from "../services/socket";
import UseGameSocket from "../hooks/UseGameSocket";

const WaitingRoomPage = () => {
    const { roomCode } = useParams();
    const players = useGameStore((state) => state.players);
    const addPlayer = useGameStore((state) => state.addPlayer);
    const managerSocketId = useGameStore((state) => state.managerSocketId);
    const { startGame } = UseGameSocket();

    const isCreator = socket.id === managerSocketId;
    useEffect(() => {
        socket.on("room:state", addPlayer);
        return () => {
            socket.off("room:state", addPlayer);
        };
    }, []);

    return (
        <>
            <div>WaitingRoomPage</div>
            {players.map(({ name, color }, idx) => (
                <div key={idx}>
                    <h2>{name}</h2>
                    <h3>{color}</h3>
                </div>
            ))}
            {isCreator &&
                (players.length === 2 ? (
                    <button type="button" onClick={startGame}>
                        Start game
                    </button>
                ) : (
                    <h2>The code to join is: {roomCode}</h2>
                ))}
        </>
    );
};

export default WaitingRoomPage;
