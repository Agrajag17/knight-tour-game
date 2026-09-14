import type { GameStatus } from "../types/game";

interface StatusInfoProps {
    gameStatus: GameStatus;
    gameProgress: string;
};

export function StatusInfo({
    gameStatus,
    gameProgress,
}: StatusInfoProps) {
    return (
        <div className={`game-status game-status--${gameStatus}`}>
            <p>{getStatusMessage(gameStatus, gameProgress)}</p>
        </div>
    );
}

function getStatusMessage(status: GameStatus, progress: string): string {
    switch (status) {
        case 'idle':
            return 'Choose a starting cell.';
        case 'playing':
            return progress;
        case 'won':
            return 'Success! The board is complete.';
        case 'stuck':
            return 'No valid moves left. The knight is stuck.';
        default:
            return '';
    }
}