/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NotoSans', 'sans-serif', ...fontFamily.sans,]
      },
      backgroundImage: {
        'hero-login': "url('./assets/images/mtn.jpg')"
      }
    },
    colors: {
      primary: '#fabc3c',
      white: '#fffcff'
    }
  },
  plugins: [],
}
