type NewGameButtonProps = {
  onReset: () => void;
};

function NewGameButton({ onReset }: NewGameButtonProps) {
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
      Nueva partida
    </button>
  );
}

export default NewGameButton;
