

function YellowButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-400 text-neutral-800 font-bold px-4 py-2 rounded-lg text-sm hover:bg-yellow-500 transition"
    >
      {children}
    </button>
  );
}

export {YellowButton};