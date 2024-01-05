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
        'brt-black': '#2d2d2d',
        'brt-dark-blue': '#2a4967',
        'brt-light-blue': '#a4d6d7',
        'brt-med-blue': '#5a97ae',
        'brt-red': '#f7181f',
        'white': '#fff',
      },
    },
  },
  plugins: [],  
}
