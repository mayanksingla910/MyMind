import { useState } from "react";

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`fixed top-5 bottom-5 left-5 p-4 w-72 bg-gray-100 rounded-xl duration-500 ease-out ${
            open ? "translate-x-0" : "-translate-x-full" } hover:translate-x-0`}>
        <div className="flex justify-between mb-8">
          <p className="text-xl font-bold text-neutral-700" >Menu</p>
          <ToggleSidebar open={open} setOpen={setOpen} />
        </div>
        <div>
          <p>TASKS</p>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  )
}

function ToggleSidebar({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="relative w-8 h-8 flex flex-col justify-center items-center"
    >
      {/* Top bar */}
      <span
        className={`h-1 w-6 bg-zinc-500 rounded-lg transition-all duration-300 
          ${open ? "rotate-45 translate-y-2" : ""}`}
      />
      {/* Middle bar */}
      <span
        className={`h-1 w-6 bg-neutral-500 rounded-lg my-1 transition-all duration-300 
          ${open ? "opacity-0" : ""}`}
      />
      {/* Bottom bar */}
      <span
        className={`h-1 w-6 bg-neutral-500 rounded-lg transition-all duration-300 
          ${open ? "-rotate-45 -translate-y-2" : ""}`}
      />
    </button>
  );
}
    