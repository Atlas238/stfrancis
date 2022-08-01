/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [{
      mytheme: {
        primary: "#E4E0D9",
        secondary: "#8F8884",
        accent: "#B4975A",
        neutral: "#fafafa",
        "base-100": "#E4E0D9",
      },
      fontFamily: {
        sans: ['Spectral SC'],
        body: ['Spectral SC']
      },
      extend: 
      {
        colors: {
          'sfgold': 'B4975A',
          'bluegray': '7C7E7F',
        },
      }
    }],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark"
  }
}

