import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from "react";
import { socket } from "../services/socket";
import type { Socket } from "socket.io-client";

interface SocketContextType {
    isConnected: boolean;
    socket: Socket;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: PropsWithChildren) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ isConnected, socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const UseSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("Provider is missing");
    return context;
};
