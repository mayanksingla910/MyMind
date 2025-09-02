import { tv } from "tailwind-variants";

const button = tv({
  base: "font-bold rounded-lg transition text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-70",
  variants: {
    variant: {
      yellow: "bg-yellow-400 text-neutral-800 hover:bg-yellow-500",
      red: "bg-red-500 text-white hover:bg-red-600",
      gray: "bg-gray-200 text-black hover:bg-gray-300",
      outline: "bg-transparent text-neutral-800 border border-neutral-200 hover:bg-neutral-200",
    },
    size: {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    },
  },
  defaultVariants: {
    variant: "yellow",
    size: "md",
  },
});

export function Button({ variant, size, className, ...props }) {
  return <button className={button({ variant, size, className })} {...props} />;
}
