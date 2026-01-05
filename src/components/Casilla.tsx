import { Player } from "../utils/enum";

type CasillaType = {
  position: number;
  onCellClick: (position: number) => void;
  value: Player | null;
};

function Casilla({ position, onCellClick, value }: CasillaType) {
  const isEmpty = value === null;

  return (
    <div
      onClick={() => isEmpty && onCellClick(position)}
      className={`
        casilla-item
        w-full h-full
        flex items-center justify-center
        rounded-xl shadow-sm
        text-4xl sm:text-5xl font-black
        transition-all duration-200 active:scale-95
        ${
          isEmpty
            ? "bg-white hover:bg-gray-50 cursor-pointer"
            : "bg-gray-50 cursor-default"
        }
        ${value === Player.P1 ? "text-blue-500" : "text-red-500"}
      `}
    >
      <span className="select-none">
        {value === Player.P1 ? "X" : value === Player.P2 ? "O" : ""}
      </span>
    </div>
  );
}

export default Casilla;
