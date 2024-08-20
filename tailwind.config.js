/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand": {
          'purple': "#A48BF4",
          'gray': {
            DEFAULT: "#738296",
            100: "#F8FAFC",
          }
        }
      }
    },
  },
  plugins: [],
}

