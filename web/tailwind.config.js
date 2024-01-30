/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif']
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ]
}
