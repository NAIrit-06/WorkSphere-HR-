/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navyPrimary: '#1B365D',   // Navy Identity directly matching logo aesthetics
        mintTeal: '#00A896',      // Vibrant Mint Teal Context
        offWhite: '#F9F8F3',      // Off-White background texture matching WorkSphere image palette
      },
    },
  },
  plugins: [],
}