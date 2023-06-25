/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          "base-100": "#ffffff",
          "base-200": "#eeeeee",
          "base-300": "#dddddd",
          primary: "#21af34",
          secondary: "#178626",
          accent: "#202020",
          info: "#0564b1",
          warning: "#ac6200",
          error: "#ac0009",
        },
        dark: {
          "base-100": "#181a1b",
          "base-200": "#101112",
          "base-300": "#0f0f0f",
          primary: "#23bd38",
          secondary: "#1c9b2d",
          accent: "#707070",
          info: "#0564b1",
          warning: "#ac6200",
          error: "#ac0025",
        },
      },
    ],
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
}
