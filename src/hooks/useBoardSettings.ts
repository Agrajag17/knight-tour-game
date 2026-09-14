import { useState } from "react";

import type { BoardSize } from "../types/game";

import { isCurrentBoardSize } from "../utils/board";

interface UseBoardSettingsResult {
    pendingBoardSize: BoardSize;
    isBoardChangeDisabled: boolean;
    setPendingBoardSize: (size: BoardSize) => void;
    applyBoardSize: (
        isGameInProgress: boolean,
        onApply: (size: BoardSize) => void,
    ) => void
};

export function useBoardSettings(
    boardSize: BoardSize,
): UseBoardSettingsResult {
    const [pendingBoardSize, setPendingBoardSize] =
        useState<BoardSize>(boardSize);

    const isBoardChangeDisabled = isCurrentBoardSize(
        boardSize,
        pendingBoardSize,
    );

    function applyBoardSize(
        isGameInProgress: boolean,
        onApply: (size: BoardSize) => void
    ) {
        if (isBoardChangeDisabled) {
            return;
        }

        if (isGameInProgress) {
            const shouldProceed = window.confirm(
                'Changing the board size will restart the current game. Continue?',
            );

            if (!shouldProceed) {
                return;
            }
        }

        onApply(pendingBoardSize);
    }

    return {
        pendingBoardSize,
        isBoardChangeDisabled,
        setPendingBoardSize,
        applyBoardSize
    };
}