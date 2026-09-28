import { useGameStore } from "../store/UseGameStore";

const GamePage = () => {
    const game = useGameStore(state => state.game)
    console.log(game);
    
    return <div>GamePage</div>;
};

export default GamePage;
