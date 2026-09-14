import type { BoardSize, BoardMatrix } from "../types/game";
import type { CSSVariable } from "../types/ui";

const CSS_CELL_BASE = "board-cell";

interface BoardProps {
    boardSize: BoardSize;
    boardState: BoardMatrix;
};

export function Board({
    boardSize,
    boardState,
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

                    const cellClasses = [
                        CSS_CELL_BASE,
                        isDark
                            ? `${CSS_CELL_BASE}--dark`
                            : `${CSS_CELL_BASE}--light`,
                        cellValue ? `${CSS_CELL_BASE}--visited` : '',
                    ].filter(Boolean).join(' ');

                    return (
                        <button
                            key={`cell-${rowIndex}-${columnIndex}`}
                            type="button"
                            className={cellClasses}
                        >
                            <span>{cellValue ?? ''}</span>
                        </button>
                    );
                })
            )}
        </div>
    );
}