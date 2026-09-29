import { useLocation } from "react-router-dom";
import type { GameState } from "../types/gameTypes";

const GamePage = () => {
    const location = useLocation();
    const game: GameState = location.state.dataGame;

    return (
        <>
            <div>GamePage</div>
        </>
    );
};

export default GamePage;
