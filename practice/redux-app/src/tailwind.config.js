/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./*.{js,ts,jsx,tsx}', './pages/*.{js, tx, jsx, tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'], // Custom sans-serif font stack
      },
      colors: {
        // Define your custom color palette here
      },
      screens: {
        // Custom breakpoints for responsive design
        xxs: '320px', // iPhone 5/SE
        xs: '360px', // iPhone 6/7/8
        sm: '425px', // iPhone X/11/12
        md: '768px', // iPad
        lg: '1024px', // iPad Pro
        xl: '1280px', // Laptop
        '2xl': '1440px', // Large laptop
        '3xl': '1600px', // Small laptop
        '4xl': '1800px', // Medium laptop
        '5xl': '2000px', // Large laptop
        '6xl': '3840px', // Desktop
        '7xl': '4096px', // 4K monitors
      },
    },
  },
  plugins: [],
};