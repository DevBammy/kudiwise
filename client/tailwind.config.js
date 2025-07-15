/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        yellow: '#FFB970',
        blue: '#B3AED7',
        text: '#36344A',
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
