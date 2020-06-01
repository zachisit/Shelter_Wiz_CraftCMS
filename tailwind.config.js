const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    fontFamily: {
      'body': ['Roboto', 'sans-serif']
    },
    backgroundColor: {
      darkPurple:'#2C2A4A',
      lightPurple:'#907AD6',
      lightBlue:'#7FDEFF'
    },
    extend: {
      colors: {
        darkPurple:'#2C2A4A',
        lightPurple:'#907AD6',
        lightBlue:'#7FDEFF',
        ctaSecondary:'#5a5a5a'
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
