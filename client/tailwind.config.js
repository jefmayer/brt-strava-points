/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
     './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'black': '#000',
        'red': {
          100: '#fdd1d2',
          200: '#fca3a5',
          300: '#fa7479',
          400: '#f9464c',
          500: '#f7181f',
          600: '#c61319',
          700: '#940e13',
          800: '#630a0c',
          900: '#310506',
        },
        'orange': '#f65210',
        'white': '#fff',
        'neutral': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        'lightblue': {
          100: '#f6fbfb',
          200: '#edf7f7',
          300: '#e4f3f3',
          400: '#d2ebeb',
          500: '#c8e6e7',
          600: '#bfe2e3',
          700: '#b6dedf',
          800: '#addadb',
          900: '#a4d6d7',
        },
      },
    },
  },
  plugins: [],  
}
