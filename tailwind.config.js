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
        josefin: ["var(--font-josefin)", "sans-serif"],
        merri: ["var(--font-merri)", "serif"],
        ubuntu: ["var(--font-ubuntu)", "sans-serif"],
      },
      colors: {
        // accent: "#88063d",
        // primary: "#ea5d68",
        // secondary: "#fbb1d0",
        // bg: "#fdd3e5",
        //--------------------------------
        // accent: "#fb7185",
        // primary: "#7dd3fc",
        // secondary: "#ffffff",
        // bg: "#f3f9fc",
        //---------------------------------
        accent: "#E52B50",
        primary: "#4685ff",
        secondary: "#f2f2f2",
        bg: "#ffffff",
        //--------------------------------
        // accent: "#8dcb76",
        // primary: "#b7cb76",
        // secondary: "#f3f9f0",
        // bg: "#ffffff",
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
