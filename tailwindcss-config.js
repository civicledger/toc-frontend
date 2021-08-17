module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transformOrigin: {
        0: '0%',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  plugins: [require('@tailwindcss/forms')],
};
