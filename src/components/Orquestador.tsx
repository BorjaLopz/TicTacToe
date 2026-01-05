import { useState } from "react";
import { Player } from "../utils/enum";
import StartScreen from "../screen/StartScreen";
import GameScreen from "../screen/GameScreen";
import type { GameStatus } from "../utils/types";
import ClassicGameScreen from "../screen/ClassicGameScreen";

function Orquestador() {
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.P1);
  const [board, setBoard] = useState<Array<Player | null>>(Array(9).fill(null));

  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const [playerMoves, setPlayerMoves] = useState<{ [key in Player]: number[] }>(
    {
      [Player.P1]: [],
      [Player.P2]: [],
    }
  );

  const [highlightedCells, setHighlightedCells] = useState<{
    [key in Player]: number | null;
  }>({
    [Player.P1]: null,
    [Player.P2]: null,
  });

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
      if (result.winner !== null) {
        setWinner(result.winner);
        setWinningLine(result.line ?? null);
      } else if (result.tie) {
        setWinner(null); // empate
        // setWinningLine([20, 20, 20]);
        setWinningLine(null);
      } else {
        handleChangePlayer();
      }
    }
  };

  const handleOnCellClickClassic = (position: number) => {
    if (board[position] !== null || winner) return;

    const newBoard = [...board];
    const moves = { ...playerMoves };
    const highlighted = { ...highlightedCells };

    const currentMoves = moves[currentPlayer];

    // Colocamos la ficha
    newBoard[position] = currentPlayer;
    currentMoves.push(position);

    // Si tiene 3 fichas, la primera ficha empieza a parpadear
    highlighted[currentPlayer] =
      currentMoves.length === 3 ? currentMoves[0] : null;

    // Si ya hay más de 3 fichas, borramos la primera
    if (currentMoves.length > 3) {
      const removed = currentMoves.shift()!;
      newBoard[removed] = null;

      // Actualizamos highlight a la nueva primera ficha (si queda 3)
      highlighted[currentPlayer] =
        currentMoves.length === 3 ? currentMoves[0] : null;
    }

    moves[currentPlayer] = currentMoves;

    setBoard(newBoard);
    setPlayerMoves(moves);
    console.log("highlighted: ", highlighted);
    setHighlightedCells(highlighted);

    // Cambiamos turno
    handleChangePlayer();

    // Comprobamos ganador
    const result = checkWinner(newBoard);
    if (result.winner !== null) {
      setWinner(result.winner);
      setWinningLine(result.line ?? null);
    } else if (result.tie) {
      setWinner(null);
      setWinningLine(null);
    }
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(Player.P1);
    setWinner(null);
    setWinningLine(null);
  };

  const handleOnInitGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(Player.P1);
    setWinner(null);
    setWinningLine(null);

    setGameStatus("INIT");
  };

  const handleStartGame = (gameMode: GameStatus) => {
    setGameStatus(gameMode);
  };

  if (gameStatus === "INIT") {
    return (
      <>
        <StartScreen onStart={handleStartGame} />
      </>
    );
  }

  if (gameStatus === "NORMAL") {
    return (
      <GameScreen
        board={board}
        currentPlayer={currentPlayer}
        onCellClick={handleOnCellClick}
        onReset={handleResetGame}
        onInit={handleOnInitGame}
        winningLine={winningLine}
        winner={winner}
        gameStatus={gameStatus}
      />
    );
  }

  if (gameStatus === "CLASICA") {
    return (
      <ClassicGameScreen
        board={board}
        currentPlayer={currentPlayer}
        onCellClick={handleOnCellClickClassic}
        onReset={handleResetGame}
        onInit={handleOnInitGame}
        winningLine={winningLine}
        winner={winner}
        gameStatus={gameStatus}
        highlightedCell={highlightedCells}
      />
    );
  }
}

export default Orquestador;
