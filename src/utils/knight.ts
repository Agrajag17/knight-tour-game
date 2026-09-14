import type { Position } from "../types/game";

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