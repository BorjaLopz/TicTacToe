import { useState } from "react";
import Tablero from "./Tablero";
import { Player } from "../utils/enum";
import NewGameButton from "./NewGameButton";
import StartScreen from "../screen/StartScreen";
import GameScreen from "../screen/GameScreen";

type GameStatus = "INIT" | "PLAYING";

function Orquestador() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.P1);
  const [board, setBoard] = useState<Array<Player | null>>(Array(9).fill(null));

  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const [gameStatus, setGameStatus] = useState<GameStatus>("INIT");

  const checkWinner = (board: Array<Player | null>) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line };
      }
    }

    // Comprobar empate
    if (board.every((cell) => cell !== null)) {
      return { winner: null, line: null, tie: true };
    }

    return { winner: null, line: null };
  };

  const handleChangePlayer = () => {
    setCurrentPlayer(currentPlayer === Player.P1 ? Player.P2 : Player.P1);
  };

  const handleOnCellClick = (position: number) => {
    // si ya hay ganador, no hacer nada
    if (board[position] === null && !winner) {
      const newBoard = [...board];
      newBoard[position] = currentPlayer;
      setBoard(newBoard);

      // comprobar ganador después de actualizar tablero
      const result = checkWinner(newBoard);
      console.log("Este es el result: ", result);
      if (result.winner !== null) {
        setWinner(result.winner);
        setWinningLine(result.line ?? null);
      } else if (result.tie) {
        setWinner(null); // empate
        setWinningLine(null);
      } else {
        handleChangePlayer();
      }
    }
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(Player.P1);
    setWinner(null);
    setWinningLine(null);
  };

  if (gameStatus === "INIT") {
    return <StartScreen onStart={() => setGameStatus("PLAYING")} />;
  }

  if (gameStatus === "PLAYING") {
    return (
      <GameScreen
        board={board}
        currentPlayer={currentPlayer}
        onCellClick={handleOnCellClick}
        onReset={handleResetGame}
        winningLine={winningLine}
      />
    );
  }
}

export default Orquestador;
