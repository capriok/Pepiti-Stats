/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          "base-100": "#fafafa",
          "base-200": "#e0e0e0",
          primary: "#21af34",
          secondary: "#178626",
          accent: "#202020",
          info: "#005fac",
          warning: "#ac6200",
          error: "#ac0025",
        },
        dark: {
          "base-100": "#181818",
          "base-200": "#151515",
          primary: "#23bd38",
          secondary: "#1c9b2d",
          accent: "#707070",
          info: "#005fac",
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
