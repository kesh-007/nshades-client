/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    gradientColorStops: {
      'blue-pink': ['#3490dc', '#f06595'],
      'red':['#3490dc'],
    },
    fontFamily: {
      'sans': ['Open Sans', 'sans-serif'],
    },

    extend: {},
  },
  plugins: [],
}
