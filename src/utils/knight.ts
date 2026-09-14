import type { Position, BoardMatrix, BoardSize } from "../types/game";

import { isBoardCell, isVisitedCell } from "./board";

export function isKnightMove(
    fromPosition: Position,
    toPosition: Position,
): boolean {
    const horDistance = Math.abs(fromPosition.x - toPosition.x);
    const verDistance = Math.abs(fromPosition.y - toPosition.y);

    const isLongInRow =
        horDistance === 2 && verDistance === 1;

    const isLongInCol =
        horDistance === 1 && verDistance === 2;

    return isLongInRow || isLongInCol;
}

export function isValidMove(
    boardSize: BoardSize,
    boardState: BoardMatrix,
    fromPosition: Position,
    toPosition: Position,
): boolean {
    if (!isBoardCell(boardSize, toPosition)) {
        return false;
    }

    if (isVisitedCell(boardState, toPosition)) {
        return false;
    }

    return isKnightMove(fromPosition, toPosition);
}

const KNIGHT_OFFSETS: Position[] = [
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: -2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: 2, y: -1 },
    { x: 2, y: 1 },
];

export function getValidMoves(
    boardSize: BoardSize,
    boardState: BoardMatrix,
    fromPosition: Position,
): Position[] {
    return KNIGHT_OFFSETS
        .map((offset) => ({
            x: fromPosition.x + offset.x,
            y: fromPosition.y + offset.y
        }))
        .filter((nextPosition) =>
            isValidMove(
                boardSize,
                boardState,
                fromPosition,
                nextPosition,
            )
        );
}