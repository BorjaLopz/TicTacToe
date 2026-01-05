import InitGameButton from "../components/InitGameButton";
import NewGameButton from "../components/NewGameButton";
import Tablero from "../components/Tablero";
import { Player } from "../utils/enum";
import type { GameStatus } from "../utils/types";

type ClassicGameScreenProps = {
  board: Array<Player | null>;
  currentPlayer: Player;
  onCellClick: (position: number) => void;
  winningLine: number[] | null;
  onReset: () => void;
  onInit: () => void;
  winner: Player | null;
  gameStatus: GameStatus;
  highlightedCells: { [key in Player]: number | null };
};

function ClassicGameScreen({
  board,
  currentPlayer,
  onCellClick,
  winningLine,
  onReset,
  onInit,
  winner,
  gameStatus,
  highlightedCells,
}: ClassicGameScreenProps) {
  return (
    <>
      <Tablero
        currentPlayer={currentPlayer}
        board={board}
        onCellClick={onCellClick}
        winningLine={winningLine}
        winner={winner}
        gameStatus={gameStatus}
        highlightedCells={highlightedCells}
      />
      <div className="flex items-center justify-center gap-4">
        <InitGameButton onReset={onInit} />
        <NewGameButton onReset={onReset} />
      </div>
    </>
  );
}

export default ClassicGameScreen;
