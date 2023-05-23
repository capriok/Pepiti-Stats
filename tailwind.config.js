const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 5s linear infinite',
        marquee2: 'marquee2 5s linear infinite',
        'pulsing-bg': 'pulsing-bg 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        theme: {
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
      },
    ],
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
