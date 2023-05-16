const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      backgroundImage: {
        'table-bg': "url('/brand/SVGs/table-bg-15.svg')",
      },
      keyframes: {
        'pulsing-bg': {
          '0%, 100%': { backgroundColor: 'rgb(255,255,255,0.5)' },
          '50%': { backgroundColor: 'rgb(0,0,0,0)' },
        },
      },
      animation: {
        'pulsing-bg': 'pulsing-bg 3s ease-in-out infinite',
      },
    },
  },
  daisyui: {
    themes: [
      {
        theme: {
          'base-100': '#181a1b',
          primary: '#21af34',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#e11d48',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
