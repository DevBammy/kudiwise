/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './ui/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        yellow: '#FEEDBA',
        blue: '#D6CEFF',
        text: '#242529',
        bg: '#FFF2E9',
        white: '#fafafa',
      },
      boxShadow: {
        shadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        btn: '0px 4px 8px rgba(0, 0, 0, 0.9)',
      },
      fontFamily: {
        big: ['big', 'sans-serif'],
        mid: ['mid', 'sans-serif'],
        reg: ['reg', 'sans-serif'],
        thin: ['thin', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
