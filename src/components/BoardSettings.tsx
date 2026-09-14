import Select from "react-select";

import type { BoardSize } from "../types/game";

import {
    BOARD_SIZES,
    getBoardSizeOption,
} from "../utils/board";

type BoardSizeOption = {
    value: string;
    label: string;
    size: BoardSize;
};

interface BoardSettingsProps {
    pendingBoardSize: BoardSize;
    isBoardChangeDisabled: boolean;
    onChangePendingSize: (size: BoardSize) => void;
    onApplyNewSize: () => void;
};

export function BoardSettings({
    pendingBoardSize,
    isBoardChangeDisabled,
    onChangePendingSize,
    onApplyNewSize
}: BoardSettingsProps) {
    const boardSizeOptions: BoardSizeOption[] = BOARD_SIZES.map((size) => {
        const value = getBoardSizeOption(size);

        return {
            value,
            label: value,
            size,
        };
    });

    const selectedBoardSizeOption =
        boardSizeOptions.find(
            (option) =>
                option.value === getBoardSizeOption(pendingBoardSize)
        ) ?? null;

    return (
        <>
            <div className="game-toolbar board-settings">
                <label
                    htmlFor="select-board-size"
                >
                    Board Size
                </label>

                <Select<BoardSizeOption>
                    inputId="select-board-size"
                    className="board-size-select"
                    classNamePrefix="react-select"
                    isSearchable={false}
                    options={boardSizeOptions}
                    value={selectedBoardSizeOption}
                    onChange={(option) => {
                        if (option) {
                            onChangePendingSize(option.size);
                        }
                    }}
                />

                <button
                    type="button"
                    onClick={onApplyNewSize}
                    disabled={isBoardChangeDisabled}
                >
                    Apply
                </button>
            </div>
        </>
    );
}