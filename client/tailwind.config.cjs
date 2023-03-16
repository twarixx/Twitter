/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        twitter: {
          primary: '#67e8f9',
          secondary: '#0891b2',
          text: '#e5e5e5',
          text_secondary: '#57534e',
        }
      }
    },
  },
  plugins: [],
}
