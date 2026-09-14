import "./App.scss";

import { DEFAULT_BOARD_SIZE, createEmptyBoard } from "./utils/board";

import { Board } from "./components/Board";

function App() {

    return (
        <main className="knight-tour-game">
            <h1>Knight's Tour</h1>

            <Board
                boardSize={DEFAULT_BOARD_SIZE}
                boardState={createEmptyBoard(DEFAULT_BOARD_SIZE)}
            />
        </main>
    );
}

export default App;