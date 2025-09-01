/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        codeNext: ['"Code Next"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

