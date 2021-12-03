module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        112: '28rem',
        128: '32rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
