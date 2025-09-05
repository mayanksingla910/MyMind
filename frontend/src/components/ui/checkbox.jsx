import React from "react";

export default function CustomCheckbox({ checked, onChange, label, id }) {
  return (
    
    <label htmlFor={id} className="flex items-center cursor-pointer gap-2 select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={`w-5 h-5 rounded-[5px] border border-gray-300 flex items-center justify-center transition-colors duration-200
          ${checked ? "bg-yellow-400 border-transparent" : "bg-white"} `}
      >
        <svg
          className={`transition-transform duration-200 ${
            checked ? "scale-100" : "scale-0"
          }`}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <polyline
            points="12 5 7 11 4 8"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
}
