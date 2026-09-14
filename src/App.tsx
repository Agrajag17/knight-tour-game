import "./App.scss";

import { DEFAULT_BOARD_SIZE } from "./utils/board";

import { useGameActions } from "./hooks/useGameActions";
import { useBoardSettings } from "./hooks/useBoardSettings";

import { Board } from "./components/Board";
import { GameToolbar } from "./components/GameToolbar";
import { BoardSettings } from "./components/BoardSettings";
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

    const {
        pendingBoardSize,
        isBoardChangeDisabled,
        setPendingBoardSize,
        applyBoardSize,
    } = useBoardSettings(boardSize);

    function handleBoardSizeChange() {
        applyBoardSize(
            gameStatus === 'playing',
            startNewGame
        );
    }

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

            <BoardSettings
                pendingBoardSize={pendingBoardSize}
                isBoardChangeDisabled={isBoardChangeDisabled}
                onChangePendingSize={setPendingBoardSize}
                onApplyNewSize={handleBoardSizeChange}
            />
        </main>
    );
}

export default App;