const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    fontFamily:{},
    extend: {
      colors: {
        darkPurple:'#2C2A4A',
        lightPurple:'#907AD6',
        lightBlue:'#7FDEFF'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')({
        layout: 'sidebar',
    })
  ]
}
