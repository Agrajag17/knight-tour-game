type CellValue = number | null;

export type BoardMatrix = CellValue[][];

export type BoardSize = {
    rows: number;
    columns: number;
};

export type Position = {
    x: number;
    y: number;
}

export type GameState = {
    boardSize: BoardSize;
    boardState: BoardMatrix;
    moveHistory: Position[];
    showHints: boolean;
}

export type GameAction =
    | {
        type: 'move';
        toPosition: Position;
    }
    | {
        type: 'restart';
        boardSize: BoardSize;
    }
    | {
        type: 'undoLastMove';
    }
    | {
        type: 'toggleHints';
    };

export type GameStatus =
    | 'idle'
    | 'won'
    | 'stuck'
    | 'playing';