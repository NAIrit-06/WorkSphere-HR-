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
        brand: {
          navy: '#1B365D',
          teal: '#00A896',
          lightBg: '#F9F8F3',
          navyDark: '#11223C',
          tealLight: '#E6F6F5',
          slate: '#475569',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}