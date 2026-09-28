import { useNavigate } from "react-router-dom";
import { UseSocketContext } from "../context/SocketContext";
import { useGameStore } from "../store/UseGameStore";
import type { CreateResponse, JoinResponse } from "../types/roomTypes";

const UseRoomSocket = () => {
    const { socket } = UseSocketContext();
    const addPlayer = useGameStore((state) => state.addPlayer);
    const setPlayers = useGameStore((state) => state.setPlayers);
    const setManagerSocketId = useGameStore((state) => state.setManagerSocketId);
    const navigate = useNavigate();

    const handleCreateRes = async (res: CreateResponse) => {
        if (!res.success) return alert(res.error);
        const { name, code } = res;
        addPlayer({ name, color: "white" });
        navigate(`/waiting-room/${code}`);
    };
    const handleJoinRes = async (res: JoinResponse) => {
        if (!res.success) return alert(res.error);
        const { players, code } = res;
        setPlayers(players);
        navigate(`/waiting-room/${code}`);
    };
    const createRoom = (name: string) => {
        socket.emit("room:create", { name }, handleCreateRes);
        if(socket.id) setManagerSocketId(socket.id)
    };
    const joinRoom = (name: string, roomCode: string) => {
        socket.emit("room:join", { name, roomCode }, handleJoinRes);
    };

    return { createRoom, joinRoom };
};

export default UseRoomSocket;
