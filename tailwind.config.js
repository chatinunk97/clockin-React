/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: { "360px": "360px" },
      colors: { primaryGreen: "#5db075" },
    },
  },
  plugins: [],
};
