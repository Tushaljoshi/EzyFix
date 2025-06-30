/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#3BB5FF", // for primary CTA buttons etc.
      },
    },
  },
  plugins: [],
}  

