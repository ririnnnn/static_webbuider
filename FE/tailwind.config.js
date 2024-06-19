/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#f5f1ea",
          100: "#e9e0d2",
          200: "#d3bfa5",
          300: "#b69e78",
          400: "#967052",
          500: "#795332",
          600: "#644329",
          700: "#4d321e",
          800: "#352014",
          900: "#1d100b",
        },
        palete: {
          1: "#AD8B73",
          2: "#CEAB93",
          3: "#E3CAA5",
          4: "#FFFBE9",
        },
      },
      boxShadow: {
        right: "4px 0 5px -2px rgba(0, 0, 0, 0.2)",
        "right-md": "6px 0 10px -3px rgba(0, 0, 0, 0.3)",
        "right-lg": "8px 0 15px -4px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
