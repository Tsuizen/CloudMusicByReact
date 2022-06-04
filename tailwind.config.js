module.exports = {
  purge: {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [/data-theme$/]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['cmyk', 'dark']
  }
};
