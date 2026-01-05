type StartScreenProps = {
  onStart: () => void;
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

        <button
          onClick={onStart}
          className="mt-4 px-8 py-3 rounded-xl bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
        >
          Empezar partida
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
