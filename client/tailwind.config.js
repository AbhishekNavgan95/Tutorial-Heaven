/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      danger: "#6a040f",
      "danger-dark": "#6f040f",
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      opec: "rgba( 0, 8, 20, 0.75)",
      night: {
        5: "#0A0B0B",
        25: "#131515",
        50: "#1D2020",
        100: "#272B2B",
        200: "#3A4040",
        300: "#616B6B",
        400: "#7E8B8B",
        500: "#949E9E",
        600: "#949E9E",
        700: "#C9CFCF",
        800: "#DFE2E2",
        900: "#F4F5F5",
      },
      blue: {
        50: "#E8F0F7",
        100: "#CDDFEE",
        200: "#A0C2DF",
        300: "#6EA3CE",
        400: "#4086BF",
        500: "#30638E",
        600: "#275072",
        700: "#1C3B54",
        800: "#132839",
        900: "#09131B",
        950: "#050B0F",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1460px",
        maxContentTab: "650px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
