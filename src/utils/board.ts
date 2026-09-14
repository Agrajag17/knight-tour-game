import type { BoardSize, BoardMatrix } from "../types/game";

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