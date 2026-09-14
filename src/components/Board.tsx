import type { BoardMatrix, Position, BoardSize } from "../types/game";
import type { CSSVariable } from "../types/ui";

const CSS_CELL_BASE = "board-cell";

interface BoardProps {
    boardSize: BoardSize;
    boardState: BoardMatrix;
    startPosition: Position | null;
    currentPosition: Position | null;
    hintedMoves: Position[];
    onCellClick: (position: Position) => void;
};

export function Board({
    boardSize,
    boardState,
    startPosition,
    currentPosition,
    hintedMoves,
    onCellClick,
}: BoardProps) {
    const boardStyle: CSSVariable = {
        '--board-rows': boardSize.rows,
        '--board-columns': boardSize.columns,
    };

    return (
        <div className="board-grid" style={boardStyle}>
            {boardState.map((rowValues, rowIndex) =>
                rowValues.map((cellValue, columnIndex) => {
                    const isDark = (rowIndex + columnIndex) % 2 === 1;

                    const isStartingCell =
                        startPosition !== null &&
                        startPosition.x === rowIndex &&
                        startPosition.y === columnIndex;

                    const isCurrentCell =
                        currentPosition !== null &&
                        currentPosition.x === rowIndex &&
                        currentPosition.y === columnIndex;

                    const isHintedCell =
                        hintedMoves.some(
                            (position) =>
                                position.x === rowIndex &&
                                position.y === columnIndex
                        );

                    const cellClasses = [
                        CSS_CELL_BASE,
                        isDark
                            ? `${CSS_CELL_BASE}--dark`
                            : `${CSS_CELL_BASE}--light`,
                        isStartingCell ? `${CSS_CELL_BASE}--start` : '',
                        isCurrentCell ? `${CSS_CELL_BASE}--current` : '',
                        isHintedCell ? `${CSS_CELL_BASE}--hinted` : '',
                        cellValue ? `${CSS_CELL_BASE}--visited` : '',
                    ].filter(Boolean).join(' ');

                    return (
                        <button
                            key={`cell-${rowIndex}-${columnIndex}`}
                            type="button"
                            className={cellClasses}
                            onClick={() => onCellClick(
                                { x: rowIndex, y: columnIndex }
                            )}
                        >
                            <span>{cellValue ?? ''}</span>
                        </button>
                    );
                })
            )}
        </div>
    );
}