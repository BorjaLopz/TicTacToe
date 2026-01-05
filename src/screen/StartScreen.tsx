import type { GameStatus } from "../utils/types";

type StartScreenProps = {
  onStart: (mode: GameStatus) => void;
};

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide">
          TIC TAC TOE
        </h1>

        <div className="flex gap-6 text-6xl font-bold">
          <span className="text-blue-500">X</span>
          <span className="text-red-500">O</span>
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => onStart("NORMAL")}
            className="mt-4 px-8 py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            <span className="text-green-500 font-bold uppercase">normal</span>
          </button>

          <button
            onClick={() => onStart("CLASICA")}
            className="mt-4 px-8 py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            <span className="text-orange-500 font-bold uppercase">clasica</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
