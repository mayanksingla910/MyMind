import React, { useState } from "react";

export default function AnimatedRippleButton({ onClick, children }) {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const newRipple = {
      key: Date.now(),
      diameter,
      x: radius,
      y: radius,
    };

    setRipples((oldRipples) => [...oldRipples, newRipple]);

    setTimeout(() => {
      setRipples((oldRipples) => oldRipples.slice(1));
    }, 600);
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        createRipple(e);
        onClick && onClick();
      }}
      className="relative overflow-hidden rounded-full w-7 h-7 bg-transparent hover:bg-gray-300 active:bg-slate-200 transition-colors focus:outline-none flex items-center justify-center"
      aria-label="Edit"
    >
      {ripples.map(({ key, x, y, diameter }) => (
        <span
          key={key}
          style={{
            width: diameter,
            height: diameter,
            left: x - diameter / 2,
            top: y - diameter / 2,
          }}
          className="absolute rounded-full bg-white opacity-30 animate-ripple"
        />
      ))}
      <div className="pointer-events-none">{children}</div>
    </button>
  );
}
