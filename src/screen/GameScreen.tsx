import NewGameButton from "../components/NewGameButton";
import Tablero from "../components/Tablero";
import { Player } from "../utils/enum";

type GameScreenProps = {
  board: Array<Player | null>;
  currentPlayer: Player;
  onCellClick: (position: number) => void;
  winningLine: number[] | null;
  onReset: () => void;
};

function GameScreen({
  board,
  currentPlayer,
  onCellClick,
  winningLine,
  onReset,
}: GameScreenProps) {
  return (
    <>
      <Tablero
        currentPlayer={currentPlayer}
        board={board}
        onCellClick={onCellClick}
        winningLine={winningLine}
      />

      <NewGameButton onReset={onReset} />
    </>
  );
}

export default GameScreen;
