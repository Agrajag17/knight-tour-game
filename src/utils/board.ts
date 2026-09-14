import type { BoardSize, BoardMatrix, Position } from "../types/game";

export const DEFAULT_BOARD_SIZE: BoardSize = { rows: 6, columns: 6 };

export function createEmptyBoard(
    size: BoardSize,
): BoardMatrix {
    return Array.from(
        { length: size.rows },
        () => Array.from(
            { length: size.columns },
            () => null
        )
    );
}

export function updateBoard(
    currentBoard: BoardMatrix,
    position: Position,
    step: number | null,
): BoardMatrix {
    const nextBoard = currentBoard.map(
        (boardRow) => [...boardRow]
    );

    nextBoard[position.x][position.y] = step;

    return nextBoard;
}

export function isBoardCell(
    boardSize: BoardSize,
    position: Position,
): boolean {
    return (
        position.x >= 0 &&
        position.x < boardSize.rows &&
        position.y >= 0 &&
        position.y < boardSize.columns
    );
}

export function isVisitedCell(
    boardState: BoardMatrix,
    position: Position
): boolean {
    return boardState[position.x][position.y] !== null;
}

export const BOARD_SIZES: BoardSize[] = [
    { rows: 5, columns: 5 },
    { rows: 6, columns: 6 },
    { rows: 8, columns: 8 },
    { rows: 10, columns: 10 },
    { rows: 6, columns: 8 },
    { rows: 8, columns: 6 },
    { rows: 8, columns: 10 },
    { rows: 10, columns: 8 },
];

export function getBoardSizeOption(size: BoardSize): string {
    return `${size.rows}x${size.columns}`;
}

export function isCurrentBoardSize(
    boardSize: BoardSize,
    nextBoardSize: BoardSize,
): boolean {
    return (
        boardSize.rows === nextBoardSize.rows &&
        boardSize.columns === nextBoardSize.columns
    );
}