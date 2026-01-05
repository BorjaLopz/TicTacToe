import { Player } from "../utils/enum";
import Casilla from "./Casilla";
import { useRef, useState, useEffect } from "react";

type TableroProps = {
  board: Array<Player | null>;
  currentPlayer: Player;
  onCellClick: (position: number) => void;
  winningLine: number[] | null;
};

function Tablero({
  currentPlayer,
  board,
  onCellClick,
  winningLine,
}: TableroProps) {
  // Referencia al contenedor del grid para medir posiciones relativas
  const gridRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (winningLine && gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const cells = gridRef.current.querySelectorAll(".casilla-item");

      const startCell = cells[winningLine[0]].getBoundingClientRect();
      const endCell = cells[winningLine[2]].getBoundingClientRect();

      const x1 = startCell.left + startCell.width / 2 - gridRect.left;
      const y1 = startCell.top + startCell.height / 2 - gridRect.top;
      const x2 = endCell.left + endCell.width / 2 - gridRect.left;
      const y2 = endCell.top + endCell.height / 2 - gridRect.top;

      const dx = x2 - x1;
      const dy = y2 - y1;

      // 1. Calculamos la distancia real entre centros
      const distanceBetweenCenters = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // 2. Definimos cuánto queremos que sobresalga (puedes ajustar este número)
      // Usar el ancho de una celda es una buena medida
      const extension = startCell.width * 0.2;

      // 3. La nueva longitud será la distancia original + extension por ambos lados
      const totalLength = distanceBetweenCenters + extension * 2;

      setLineStyle({
        position: "absolute",
        // 4. Desplazamos el inicio hacia atrás usando la función trigonométrica del ángulo
        // para que el retroceso sea preciso en diagonales, horizontales y verticales
        left: `${x1 - Math.cos((angle * Math.PI) / 180) * extension}px`,
        top: `${y1 - Math.sin((angle * Math.PI) / 180) * extension}px`,
        width: `${totalLength}px`,
        height: "8px", // Un poquito más gruesa para que luzca mejor
        backgroundColor: "#000000",
        borderRadius: "9999px",
        transform: `rotate(${angle}deg)`,
        transformOrigin: "center left", // Importante: rota desde la nueva punta izquierda
        pointerEvents: "none",
        zIndex: 20,
        boxShadow: "0 0 10px rgba(250, 204, 21, 0.5)", // Efecto de brillo opcional
      });
    }
  }, [winningLine]);

  return (
    // Envolvemos en un contenedor flex para centrar contenido
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="mb-6 text-2xl font-bold text-gray-700 no-select">
        Turno de{" "}
        <span
          className={
            currentPlayer === Player.P1 ? "text-blue-500" : "text-red-500"
          }
        >
          {currentPlayer === Player.P1 ? "X" : "O"}
        </span>
      </h2>

      {/* Contenedor del tablero con sombra y padding balanceado */}
      <div className="relative aspect-square w-72 sm:w-96 bg-blue-100 rounded-2xl p-3 shadow-xl border-4 border-blue-200">
        <div
          ref={gridRef}
          className="relative grid grid-cols-3 grid-rows-3 gap-3 w-full h-full"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
          }}
        >
          {board.map((_, index) => (
            <Casilla
              key={index}
              position={index}
              onCellClick={onCellClick}
              value={board[index]}
            />
          ))}

          {winningLine && (
            <div
              style={lineStyle}
              className="transition-all duration-300 ease-out"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tablero;
