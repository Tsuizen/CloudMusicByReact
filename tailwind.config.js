module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [/data-theme$/]
    }
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['cmyk', 'dark']
  }
};
