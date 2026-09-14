interface GameToolbarProps {
    canRestart: boolean;
    canUndo: boolean;
    canGetHints: boolean;
    onRestart: () => void;
    onUndo: () => void;
    onToggleHints: () => void;
};

export function GameToolbar({
    canRestart,
    canUndo,
    canGetHints,
    onRestart,
    onUndo,
    onToggleHints,
}: GameToolbarProps) {
    return (
        <div className="game-toolbar game-actions">
            <button
                type="button"
                onClick={onRestart}
                disabled={!canRestart}
            >
                Restart
            </button>

            <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
            >
                Undo
            </button>

            <button
                type="button"
                onClick={onToggleHints}
                disabled={!canGetHints}
            >
                Hint
            </button>
        </div>
    );
}