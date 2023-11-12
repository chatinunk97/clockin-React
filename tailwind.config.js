/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: { "360px": "360px" },
      colors: {
        primaryGreen: "#5db075",
        inputGray: "#f6f6f6",
        azure: {
          50: "#f4f6fb",
          100: "#e8ebf6",
          200: "#ccd6eb",
          300: "#9fb4da",
          400: "#6b8cc5",
          500: "#486eaf",
          600: "#3b5da0",
          700: "#2d4577",
          800: "#283c64",
          900: "#263454",
          950: "#192238",
        },
      },
    },
  },
  // Apply to all tailwind
  // plugins: [require("daisyui")],
};
