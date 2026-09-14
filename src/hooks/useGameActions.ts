import { useReducer } from "react";

import type {
    BoardSize,
    BoardMatrix,
    Position,
    GameStatus,
} from "../types/game";

import { getValidMoves } from "../utils/knight";

import { gameReducer, createInitialGameState } from "../reducers/gameReducer";

interface UseGameActionsResult {
    boardSize: BoardSize;
    boardState: BoardMatrix;
    startPosition: Position | null;
    currentPosition: Position | null;
    hintedMoves: Position[];
    gameStatus: GameStatus;
    gameProgress: string;
    handleCellClick: (position: Position) => void;
    startNewGame: (boardSize?: BoardSize) => void;
    undoLastMove: () => void;
    toggleHints: () => void;
};

export function useGameActions(
    initialBoardSize: BoardSize,
): UseGameActionsResult {
    const [gameState, gameDispatch] = useReducer(
        gameReducer,
        initialBoardSize,
        createInitialGameState,
    );

    const {
        boardSize,
        boardState,
        moveHistory,
        showHints,
    } = gameState;

    const totalCells = boardSize.rows * boardSize.columns;
    const step = moveHistory.length;
    const currentPosition = moveHistory[moveHistory.length - 1] ?? null;
    const startPosition = moveHistory[0] ?? null;

    const validMoves = currentPosition === null
        ? []
        : getValidMoves(boardSize, boardState, currentPosition);

    const hintedMoves = showHints ? validMoves : [];

    const gameStatus: GameStatus =
        step === 0
            ? 'idle'
            : step === totalCells
                ? 'won'
                : validMoves.length === 0
                    ? 'stuck'
                    : 'playing';

    const gameProgress = `Step: ${step} / ${totalCells}`;

    function handleCellClick(
        position: Position,
    ) {
        gameDispatch({
            type: 'move',
            toPosition: position
        });
    }

    function startNewGame(
        newBoardSize = boardSize
    ) {
        gameDispatch({
            type: 'restart',
            boardSize: newBoardSize,
        });
    }

    return {
        boardSize,
        boardState,
        startPosition,
        currentPosition,
        hintedMoves,
        gameStatus,
        gameProgress,
        handleCellClick,
        startNewGame,
        undoLastMove: () => gameDispatch({
            type: 'undoLastMove'
        }),
        toggleHints: () => gameDispatch({
            type: 'toggleHints',
        }),
    };
}