import type { GameState, GameAction, BoardSize } from "../types/game";

import { updateBoard, createEmptyBoard } from "../utils/board";
import { isValidMove } from "../utils/knight";

export function gameReducer(
    state: GameState,
    action: GameAction,
): GameState {
    switch (action.type) {
        case 'move': {
            const { toPosition } = action;

            const currentPosition =
                state.moveHistory[state.moveHistory.length - 1] ?? null;

            if (
                currentPosition !== null &&
                !isValidMove(
                    state.boardSize,
                    state.boardState,
                    currentPosition,
                    toPosition
                )
            ) {
                return state;
            }

            const nextStep = state.moveHistory.length + 1;

            return {
                ...state,
                boardState: updateBoard(
                    state.boardState,
                    toPosition,
                    nextStep,
                ),
                moveHistory: [...state.moveHistory, toPosition],
                showHints: false,
            };
        }

        case 'restart':
            return createInitialGameState(action.boardSize);

        case 'undoLastMove':
            if (state.moveHistory.length < 1) {
                return state;
            }

            const lastMove = state.moveHistory[state.moveHistory.length - 1];

            return {
                ...state,
                boardState: updateBoard(
                    state.boardState,
                    lastMove,
                    null
                ),
                moveHistory: state.moveHistory.slice(0, -1),
                showHints: false,
            };

        case 'toggleHints':
            return {
                ...state,
                showHints: !state.showHints,
            };

        default:
            return state;
    }
}

export function createInitialGameState(
    boardSize: BoardSize
): GameState {
    return {
        boardSize,
        boardState: createEmptyBoard(boardSize),
        moveHistory: [],
        showHints: false,
    };
}