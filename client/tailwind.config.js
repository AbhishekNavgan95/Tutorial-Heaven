/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      danger : "#8e0200",
      "danger-dark" : "#6a0100",
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      opec: "rgba( 0, 8, 20, 0.75)",
      night: {
        5: "#F4F5F5",
        25: "#DFE2E2",
        50: "#C9CFCF",
        100: "#949E9E",
        200: "#949E9E",
        300: "#7E8B8B",
        400: "#616B6B",
        500: "#3A4040",
        600: "#272B2B",
        700: "#1D2020",
        800: "#131515",
        900: "#0A0B0B",
      },
      blue: {
        5: "#F1F1F9",
        25: "#A9A9DB",
        50: "#8C8CCF",
        100: "#7E7EC9",
        200: "#6F6FC3",
        300: "#5252B7",
        400: "#42429E",
        500: "#363681",
        600: "#2A2A65",
        700: "#18183A",
        800: "#0C0C1D",
        900: "#06060F",
      },
    },
    extend: {
      minHeight: {
        "screen-h": "calc(100vh - 4rem)",
      },
    },
    maxWidth: {
      maxContent: "1260px",
      maxContentTab: "650px",
    },
  },
  plugins: [],
};
