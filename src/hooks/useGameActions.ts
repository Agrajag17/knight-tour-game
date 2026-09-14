import { useState } from "react";

import type { BoardSize, BoardMatrix, Position } from "../types/game";

import { createEmptyBoard, updateBoard } from "../utils/board";

import { isKnightMove } from "../utils/knight";

interface UseGameActionsResult {
    boardSize: BoardSize;
    boardState: BoardMatrix;
    startPosition: Position | null;
    currentPosition: Position | null;
    handleCellClick: (position: Position) => void;
};

export function useGameActions(
    initialBoardSize: BoardSize,
): UseGameActionsResult {
    const [board, setBoard] = useState<BoardMatrix>(() => createEmptyBoard(initialBoardSize));
    const [moveHistory, setMoveHistory] = useState<Position[]>([]);

    const step = moveHistory.length;
    const currentPosition = moveHistory[moveHistory.length - 1] ?? null;
    const startPosition = moveHistory[0] ?? null;

    function handleCellClick(position: Position) {
        const nextPosition = position;
        const nextStep = step + 1;

        if (currentPosition === null) {
            setBoard((currentBoard) =>
                updateBoard(currentBoard, nextPosition, nextStep)
            );

            setMoveHistory([nextPosition]);

            return;
        }

        const isVisited =
            board[position.x][position.y] !== null;

        const isValidMove = isKnightMove(currentPosition, nextPosition);

        if (isVisited || !isValidMove) {
            return;
        }

        setBoard((currentBoard) =>
            updateBoard(currentBoard, nextPosition, nextStep)
        );

        setMoveHistory((currentHistory) =>
            [...currentHistory, nextPosition]
        );
    }

    return {
        boardSize: initialBoardSize,
        boardState: board,
        startPosition,
        currentPosition,
        handleCellClick
    };
}