/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors,
    extend: {
      colors: {
        CustomOrange: '#FF8000',
        CustomNavy: '#06092B',
        CustomGray: '#D9D9D9',
        CustomBg: '#F2F2F2',
      },
    },
  },
  plugins: [],
};
