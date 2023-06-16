const { blackA, mauve, violet } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yeseva: ["var(--font-yeseva-one)", "cursive"],
        merri: ["var(--font-merri)", "serif"],
        ubuntu: ["var(--font-ubuntu)", "sans-serif"],
      },
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        accent: "#EA580C",
        primary: "#B78570",
        bg: "#FFF6F1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
