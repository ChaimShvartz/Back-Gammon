import { BrowserRouter, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import WaitingRoomPage from "./pages/WaitingRoomPage";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
    return (
        <SocketProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LobbyPage />} />
                    <Route
                        path="/waiting-room/:roomCode"
                        element={<WaitingRoomPage />}
                    />
                </Routes>
            </BrowserRouter>
        </SocketProvider>
    );
};

export default App;
