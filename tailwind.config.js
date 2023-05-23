const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  daisyui: {
    themes: [
      {
        light: {
          'base-100': '#fafafa',
          'base-200': '#ebebeb',
          primary: '#21af34',
          secondary: '#178626',
          accent: '#101010',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#e11d48',
        },
        dark: {
          'base-100': '#181a1b',
          'base-200': '#141516',
          primary: '#23bd38',
          accent: '#101010',
          secondary: '#1c9b2d',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#e11d48',
        },
      },
    ],
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
