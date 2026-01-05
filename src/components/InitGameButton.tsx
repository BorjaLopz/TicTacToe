type InitGameButtonProps = {
  onReset: () => void;
};

function InitGameButton({ onReset }: InitGameButtonProps) {
  return (
    <button
      onClick={onReset}
      className="
        mt-6 px-6 py-3
        bg-blue-600 text-white
        rounded-xl font-semibold
        hover:bg-blue-700
        transition
        shadow-md
      "
    >
      Inicio
    </button>
  );
}

export default InitGameButton;
