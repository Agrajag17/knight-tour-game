import "./App.scss";

import { DEFAULT_BOARD_SIZE } from "./utils/board";

import { useGameActions } from "./hooks/useGameActions";

import { Board } from "./components/Board";
import { GameToolbar } from "./components/GameToolbar";
import { StatusInfo } from "./components/StatusInfo";

function App() {
    const {
        boardSize,
        boardState,
        startPosition,
        currentPosition,
        hintedMoves,
        gameStatus,
        gameProgress,
        handleCellClick,
        startNewGame,
        undoLastMove,
        toggleHints,
    } = useGameActions(DEFAULT_BOARD_SIZE);

    return (
        <main className="knight-tour-game">
            <h1>Knight's Tour</h1>

            <GameToolbar
                canRestart={gameStatus !== 'idle'}
                onRestart={() => startNewGame()}
                canUndo={gameStatus !== 'idle'}
                onUndo={undoLastMove}
                canGetHints={gameStatus === 'playing'}
                onToggleHints={toggleHints}
            />

            <StatusInfo
                gameStatus={gameStatus}
                gameProgress={gameProgress}
            />

            <Board
                boardSize={boardSize}
                boardState={boardState}
                startPosition={startPosition}
                currentPosition={currentPosition}
                onCellClick={handleCellClick}
                hintedMoves={hintedMoves}
            />
        </main>
    );
}

export default App;