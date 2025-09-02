import { useState } from "react";

export default function ToggleSidebar({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="relative w-8 h-8 flex flex-col justify-center items-center"
    >
      {/* Top bar */}
      <span
        className={`h-1 w-5 bg-zinc-500 rounded-lg transition-all duration-300 
          ${open ? "rotate-45 translate-y-2" : ""}`}
      />
      {/* Middle bar */}
      <span
        className={`h-1 w-5 bg-neutral-500 rounded-lg my-1 transition-all duration-300 
          ${open ? "opacity-0" : ""}`}
      />
      {/* Bottom bar */}
      <span
        className={`h-1 w-5 bg-neutral-500 rounded-lg transition-all duration-300 
          ${open ? "-rotate-45 -translate-y-2" : ""}`}
      />
    </button>
  );
}