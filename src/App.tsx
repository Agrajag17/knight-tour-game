import "./App.scss";

import { DEFAULT_BOARD_SIZE } from "./utils/board";

import { useGameActions } from "./hooks/useGameActions";

import { Board } from "./components/Board";

function App() {
    const {
        boardSize,
        boardState,
        startPosition,
        currentPosition,
        handleCellClick,
    } = useGameActions(DEFAULT_BOARD_SIZE);

    return (
        <main className="knight-tour-game">
            <h1>Knight's Tour</h1>

            <Board
                boardSize={boardSize}
                boardState={boardState}
                startPosition={startPosition}
                currentPosition={currentPosition}
                onCellClick={handleCellClick}
            />
        </main>
    );
}

export default App;